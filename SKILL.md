---
name: writing-sdd
description: 规范驱动的内容创作系统，用于技术博客和公众号写作，含配图生成
version: 1.1.0
tags: [writing, content, blog, sdd, diagrams, chinese]
triggers:
  - 写文章
  - 创建新文章
  - 生成配图
  - 为文章配图
---

# Writing SDD

基于 SDD（规范驱动开发）理念的写作自动化系统。

## 核心理念

| 理念 | 说明 |
|------|------|
| **规范优先** | `spec.md` 是文章的事实来源，正文是规范的表达 |
| **模板约束** | 使用结构化模板提升 LLM 输出质量 |
| **阶段关卡** | 每个阶段有明确的审查标准 |
| **资产沉淀** | 每次写作都是经验积累的机会 |

## 工作流

```
素材收集 → 初稿 → 润色 → 配图 → 审查 → 待发布 → 已发布
                           ↑              |
                           └──────────────┘ (审查未通过)
```

## 可用命令

### 写作流程

| 命令 | 作用 | 详细说明 |
|------|------|----------|
| `/writing.new [主题]` | 创建新文章项目 | [workflows/new.md](workflows/new.md) |
| `/writing.spec [目录]` | 检查/完善选题规格 | [workflows/spec.md](workflows/spec.md) |
| `/writing.plan [目录]` | 生成文章大纲 | [workflows/plan.md](workflows/plan.md) |
| `/writing.draft [目录]` | 生成初稿 | [workflows/draft.md](workflows/draft.md) |
| `/writing.review [目录]` | 运行审查流水线 | [workflows/review.md](workflows/review.md) |
| `/writing.polish [目录]` | 润色初稿 | [workflows/polish.md](workflows/polish.md) |
| `/writing.humanize [文件]` | AI 去痕处理 | [references/humanizer.md](references/humanizer.md) |

### 配图与发布

| 命令 | 作用 | 详细说明 |
|------|------|----------|
| `/writing.diagrams [目录]` | 生成文章配图 | [workflows/diagrams.md](workflows/diagrams.md) |
| `/writing.adapt [目录] --to [平台]` | 适配不同平台 | [workflows/adapt.md](workflows/adapt.md) |
| `/writing.publish [目录]` | 标记发布并存档 | [workflows/publish.md](workflows/publish.md) |

## 核心文件

| 文件 | 作用 |
|------|------|
| [constitution.md](constitution.md) | 写作宪法 - 8 条不可违背的原则 |
| [templates/spec.md](templates/spec.md) | 选题规格模板 |
| [templates/review-checklist.md](templates/review-checklist.md) | 审查清单模板（5 个 Gate） |
| [references/humanizer.md](references/humanizer.md) | AI 去痕参考指南 |

## 配图资源

| 文件 | 作用 |
|------|------|
| [scripts/html-to-png.js](scripts/html-to-png.js) | HTML → PNG 自动截图（Chrome CDP） |
| [assets/base-styles.css](assets/base-styles.css) | 图表基础样式 |
| [assets/color-schemes.css](assets/color-schemes.css) | 配色方案 |
| [references/diagram-types.md](references/diagram-types.md) | 图表类型参考 |
| [templates/download-template.html](templates/download-template.html) | 批量下载模板（手动备用） |

## 写作宪法摘要

1. **真诚原则** — 不夸大、不制造焦虑
2. **读者优先** — 始终考虑读者需求
3. **一文一点** — 每篇只讲一个核心观点
4. **口语化表达** — 像朋友聊天一样写作
5. **去 AI 味** — 禁用高频 AI 词汇
6. **素材可追溯** — 每个观点有来源
7. **多平台适配** — 一鱼多吃、因地制宜
8. **迭代沉淀** — 每次写作积累经验

## 示例

查看 [examples/prompt-article/](examples/prompt-article/) 了解完整的写作流程示例。

## 快速开始

```bash
# 1. 创建新文章
/writing.new "我的文章主题"

# 2. 完善规格
/writing.spec

# 3. 生成初稿
/writing.draft

# 4. 审查润色
/writing.review
/writing.polish

# 5. 生成配图
/writing.diagrams

# 6. 适配发布
/writing.adapt --to wechat
/writing.publish --platform blog
```

## 配图类型

| 类型 | 用途 | 示例 |
|------|------|------|
| `comparison` | 概念对比 | 传统 vs SDD |
| `vertical-flow` | 流程阶段 | 工作流 |
| `horizontal-flow` | 命令流 | CLI pipeline |
| `card-grid` | 多要点 | 原则列表 |
| `architecture` | 层级结构 | 系统架构 |

## 适配平台

| 平台 | 字数 | 风格 |
|------|------|------|
| 技术博客 | 3000+ | 深度、完整 |
| 公众号 | ~2000 | 精简、有节奏 |
| 小红书 | ~500 | 口语、接地气 |

## 相关资源

- [GitHub Spec-Kit](https://github.com/github/spec-kit) - SDD 方法论的开源实现
- [Agent Skills 规范](https://agentskills.io) - 本 skill 遵循的标准
