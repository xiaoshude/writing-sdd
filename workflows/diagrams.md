# /writing.diagrams

为文章生成配图。

## 用法

```
/writing.diagrams [文章目录]
```

## 前置条件

- 文章内容已存在（`初稿.md` 或 `润色版.md`）

## 执行步骤

### Step 1: 分析文章结构

读取文章，识别需要可视化的内容：

| 内容类型 | 推荐图表类型 |
|----------|--------------|
| 概念对比 | 左右对比图 |
| 流程/阶段 | 垂直/水平流程图 |
| 多个要点 | 卡片网格 |
| 命令/代码流 | 代码块 + 输出框 |
| 层级/原则 | 架构图 |

### Step 2: 规划配图清单

输出表格：

```markdown
| # | 位置 | 名称 | 类型 | 描述 |
|---|------|------|------|------|
| 1 | Section A 结尾 | xxx | comparison | ... |
| 2 | Section B 开头 | xxx | flow | ... |
```

### Step 3: 生成 HTML 图表

使用中性灰配色方案：

```css
:root {
  --bg: #fff;
  --module-bg: #f8f9fa;
  --border: #dee2e6;
  --text-primary: #495057;
  --text-secondary: #868e96;
  --highlight: #495057;
  --arrow-color: #ced4da;
}
```

设计规则：
- 外层容器：直角（`border-radius: 0`）
- 内部元素：圆角（`border-radius: 8px`）
- 宽度：720-780px
- 强调：仅关键节点使用深色填充
- 字体：系统字体，小号（10-13px）

文件命名：
```
images/
├── 01-xxx.html
├── 02-xxx.html
└── download-all.html
```

### Step 4: HTML → PNG 转换

有两种方式，根据场景选择：

#### 方式 A：自动截图（推荐，用于自动化管线）

使用 `scripts/html-to-png.js` 通过 Chrome CDP (9224) 自动截图：

```bash
# 转换整个目录
node skills/writing-sdd/scripts/html-to-png.js images/

# 转换单个文件
node skills/writing-sdd/scripts/html-to-png.js images/01-comparison.html

# 自定义参数
node skills/writing-sdd/scripts/html-to-png.js images/ --width 780 --scale 2 --port 9224
```

输出 PNG 在同目录下，与 HTML 同名（`01-xxx.html` → `01-xxx.png`）。

要求：Chrome Headless 在 9224 端口运行（由 `com.fjywan.wxpay-dual-browser-start` 保活）。

#### 方式 B：手动下载（备用）

生成 `download-all.html`，在浏览器中打开后点击「下载全部」：

```html
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<button onclick="downloadAll()">下载全部 (N)</button>
```

### Step 5: 嵌入 Markdown

在对应位置插入：

```html
<!-- Figure N: 标题 -->
<figure>
  <img src="./images/0N-xxx.png" alt="描述" />
  <figcaption>图注文字</figcaption>
</figure>
```

## 图表类型参考

### 对比图 (comparison)
```
┌─────────────────────────────────────────┐
│ TITLE                                   │
│  ┌───────────┐    →    ┌───────────┐   │
│  │  Left     │         │  Right    │   │
│  │  Panel    │         │  Panel    │   │
│  └───────────┘         └───────────┘   │
│  [Legend]                               │
└─────────────────────────────────────────┘
```
用途：前后对比、传统 vs 新方案、A vs B

### 垂直流程图 (vertical-flow)
```
┌─────────────────────────────────────────┐
│  ┌───────────────────────────────┐     │
│  │ Stage 1                       │     │
│  └───────────────────────────────┘     │
│              ↓                          │
│  ┌───────────────────────────────┐     │
│  │ Stage 2 (highlighted)         │     │
│  └───────────────────────────────┘     │
│              ↓                          │
│  ┌───────────────────────────────┐     │
│  │ Stage 3                       │     │
│  └───────────────────────────────┘     │
└─────────────────────────────────────────┘
```
用途：工作流、流水线、流程

### 卡片网格 (card-grid)
```
┌─────────────────────────────────────────┐
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │  Item   │ │  Item   │ │  Item   │   │
│  │   1     │ │   2     │ │   3     │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                  ↓                      │
│         ┌─────────────┐                 │
│         │  Conclusion │                 │
│         └─────────────┘                 │
└─────────────────────────────────────────┘
```
用途：功能特性、原则、趋势

### 水平流程图 (horizontal-flow)
```
┌─────────────────────────────────────────┐
│  ┌─────┐   ┌─────┐   ┌─────┐           │
│  │ Cmd │ → │ Cmd │ → │ Cmd │           │
│  ├─────┤   ├─────┤   ├─────┤           │
│  │Output│  │Output│  │Output│          │
│  └─────┘   └─────┘   └─────┘           │
└─────────────────────────────────────────┘
```
用途：CLI 工作流、构建流水线、数据流

## 输出示例

```markdown
✅ 配图生成完成

📊 生成了 5 张图表：
1. 01-power-inversion.html - 权力反转对比图
2. 02-sdd-workflow.html - SDD 工作流
3. 03-template-structure.html - 模板结构
4. 04-gate-checklist.html - 审查关卡
5. 05-feedback-loop.html - 反馈循环

📁 文件位置：images/
📥 批量下载：images/download-all.html

📋 下一步：
1. 在浏览器打开 download-all.html
2. 点击「下载全部」导出 PNG
3. 将 PNG 放入 images/ 目录
4. 更新 Markdown 中的 <figure> 标签
```

## 检查清单

- [ ] 配图数量与文章结构匹配
- [ ] 配色克制（≤2 个强调点）
- [ ] 外层直角、内层圆角
- [ ] 批量下载页面导出正常
- [ ] Markdown 中图片路径正确
- [ ] figcaption 描述清晰
