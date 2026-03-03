#!/usr/bin/env node

/**
 * HTML -> PNG via Chrome CDP (port 9224)
 *
 * Zero dependencies - uses Node.js 22 built-in WebSocket + fetch.
 *
 * Usage:
 *   node html-to-png.js <file.html|directory> [--width 780] [--scale 2] [--port 9224]
 *
 * Single file:  outputs file.png alongside file.html
 * Directory:    converts all .html files (skips download-*.html)
 */

const fs = require('fs');
const path = require('path');

const DEFAULT_WIDTH = 780;
const DEFAULT_SCALE = 2;
const DEFAULT_PORT = 9224;

function parseArgs(argv) {
  const args = { targets: [] };
  let i = 2;
  while (i < argv.length) {
    if (argv[i] === '--width') { args.width = parseInt(argv[++i], 10); }
    else if (argv[i] === '--scale') { args.scale = parseInt(argv[++i], 10); }
    else if (argv[i] === '--port') { args.port = parseInt(argv[++i], 10); }
    else { args.targets.push(argv[i]); }
    i++;
  }
  return args;
}

function resolveHtmlFiles(targets) {
  const files = [];
  for (const target of targets) {
    const abs = path.resolve(target);
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) {
      const entries = fs.readdirSync(abs)
        .filter(f => f.endsWith('.html') && !f.startsWith('download-'))
        .sort();
      files.push(...entries.map(f => path.join(abs, f)));
    } else if (stat.isFile() && abs.endsWith('.html')) {
      files.push(abs);
    }
  }
  return files;
}

function cdpSession(ws) {
  let msgId = 1;
  const pending = new Map();
  const eventListeners = new Map();

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    }
    if (msg.method) {
      const cbs = eventListeners.get(msg.method) || [];
      cbs.forEach(cb => cb(msg.params));
    }
  });

  return {
    send(method, params = {}) {
      const id = msgId++;
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          pending.delete(id);
          reject(new Error(`Timeout: ${method}`));
        }, 30000);
        pending.set(id, {
          resolve: (v) => { clearTimeout(timer); resolve(v); },
          reject: (e) => { clearTimeout(timer); reject(e); },
        });
        ws.send(JSON.stringify({ id, method, params }));
      });
    },
    once(eventName, timeout = 30000) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(`Timeout waiting: ${eventName}`)), timeout);
        const handler = (params) => {
          clearTimeout(timer);
          const arr = eventListeners.get(eventName) || [];
          const idx = arr.indexOf(handler);
          if (idx >= 0) arr.splice(idx, 1);
          resolve(params);
        };
        if (!eventListeners.has(eventName)) eventListeners.set(eventName, []);
        eventListeners.get(eventName).push(handler);
      });
    },
  };
}

async function screenshotFile(session, htmlPath, width, scale) {
  const fileUrl = `file://${htmlPath}`;
  const pngPath = htmlPath.replace(/\.html$/, '.png');

  await session.send('Page.enable');

  await session.send('Emulation.setDeviceMetricsOverride', {
    width,
    height: 2000,
    deviceScaleFactor: scale,
    mobile: false,
  });

  const loadPromise = session.once('Page.loadEventFired', 15000);
  await session.send('Page.navigate', { url: fileUrl });
  await loadPromise;

  // Let CSS/fonts settle
  await new Promise(r => setTimeout(r, 500));

  // Measure actual content bounds with padding for absolute-positioned titles
  const { result } = await session.send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('.container') || document.body;
      const rect = el.getBoundingClientRect();
      const pad = 16;
      return JSON.stringify({
        x: Math.max(0, rect.x - pad),
        y: Math.max(0, rect.y - pad),
        w: rect.width + pad * 2,
        h: rect.height + pad * 2,
      });
    })()`,
    returnByValue: true,
  });
  const box = JSON.parse(result.value);

  const { data } = await session.send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: box.x, y: box.y, width: box.w, height: box.h, scale: 1 },
  });

  fs.writeFileSync(pngPath, Buffer.from(data, 'base64'));
  return pngPath;
}

async function openTab(port) {
  const resp = await fetch(`http://localhost:${port}/json/new?about:blank`, { method: 'PUT' });
  const info = await resp.json();

  const ws = new WebSocket(info.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve);
    ws.addEventListener('error', reject);
  });

  return { ws, id: info.id };
}

async function closeTab(port, tabId) {
  try { await fetch(`http://localhost:${port}/json/close/${tabId}`); } catch (_) {}
}

async function main() {
  const args = parseArgs(process.argv);
  const width = args.width || DEFAULT_WIDTH;
  const scale = args.scale || DEFAULT_SCALE;
  const port = args.port || DEFAULT_PORT;

  if (args.targets.length === 0) {
    console.error('Usage: html-to-png.js <file.html|directory> [--width 780] [--scale 2] [--port 9224]');
    process.exit(1);
  }

  const files = resolveHtmlFiles(args.targets);
  if (files.length === 0) {
    console.error('No .html files found');
    process.exit(1);
  }

  console.log(`Converting ${files.length} file(s) via CDP on port ${port}`);

  const { ws, id: tabId } = await openTab(port);
  const session = cdpSession(ws);
  const results = [];

  for (const file of files) {
    const name = path.basename(file);
    try {
      const png = await screenshotFile(session, file, width, scale);
      const kb = (fs.statSync(png).size / 1024).toFixed(1);
      console.log(`  OK  ${name} -> ${path.basename(png)} (${kb} KB)`);
      results.push({ file: name, png: path.basename(png), ok: true });
    } catch (err) {
      console.error(`  FAIL  ${name}: ${err.message}`);
      results.push({ file: name, ok: false, error: err.message });
    }
  }

  ws.close();
  await closeTab(port, tabId);

  const ok = results.filter(r => r.ok).length;
  const fail = results.filter(r => !r.ok).length;
  console.log(`\nDone: ${ok} succeeded, ${fail} failed`);

  if (process.env.JSON_OUTPUT) {
    console.log(JSON.stringify(results, null, 2));
  }

  process.exit(fail > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
