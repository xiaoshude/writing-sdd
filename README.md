# Writing SDD - Agent Skill

基于 SDD（规范驱动开发）理念的写作自动化系统。

## 安装

将 `skills/writing-sdd/` 目录复制到你的项目中，或添加到支持 Agent Skills 的工具中。

### 支持的工具

- ✅ Cursor
- ✅ Claude
- ✅ VS Code (with Copilot)
- ✅ GitHub Copilot
- ✅ OpenAI Codex

## 快速开始

```bash
# 1. 创建新文章
/writing.new "我的文章主题"

# 2. 完善规格
/writing.spec

# 3. 生成大纲
/writing.plan

# 4. 生成初稿
/writing.draft

# 5. 审查润色
/writing.review
/writing.polish

# 6. 适配发布
/writing.adapt --to wechat
/writing.publish --platform blog
```

## 目录结构

```
writing-sdd/
├── SKILL.md                  # Agent Skill 入口文件
├── README.md                 # 本文件
├── constitution.md           # 写作宪法（8 条原则）
├── templates/
│   ├── spec.md               # 选题规格模板
│   └── review-checklist.md   # 审查清单模板
├── workflows/
│   ├── new.md                # 创建新文章
│   ├── spec.md               # 完善规格
│   ├── plan.md               # 生成大纲
│   ├── draft.md              # 生成初稿
│   ├── review.md             # 审查流水线
│   ├── polish.md             # 润色
│   ├── adapt.md              # 平台适配
│   └── publish.md            # 发布存档
└── examples/
    └── prompt-article/       # 完整示例
```

## 核心理念

| 理念 | 说明 |
|------|------|
| **规范优先** | `spec.md` 是文章的事实来源 |
| **模板约束** | 结构化模板提升输出质量 |
| **阶段关卡** | 每阶段有明确审查标准 |
| **资产沉淀** | 经验可复用 |

## 写作宪法

8 条不可违背的写作原则：

1. **真诚原则** — 不夸大、不制造焦虑
2. **读者优先** — 始终考虑读者需求
3. **一文一点** — 每篇只讲一个核心观点
4. **口语化表达** — 像朋友聊天一样写作
5. **去 AI 味** — 禁用高频 AI 词汇
6. **素材可追溯** — 每个观点有来源
7. **多平台适配** — 一鱼多吃、因地制宜
8. **迭代沉淀** — 每次写作积累经验

## 工作流

```
素材收集 → 初稿 → 润色 → 审查 → 待发布 → 已发布
                    ↑           |
                    └───────────┘ (审查未通过)
```

## 适配平台

| 平台 | 字数 | 风格 |
|------|------|------|
| 技术博客 | 3000+ | 深度、完整 |
| 公众号 | ~2000 | 精简、有节奏 |
| 小红书 | ~500 | 口语、接地气 |

## 示例

查看 `examples/prompt-article/` 了解完整的写作流程示例。

## 相关资源

- [Agent Skills 规范](https://agentskills.io) - 本 skill 遵循的标准
- [GitHub Spec-Kit](https://github.com/github/spec-kit) - SDD 方法论的开源实现

## 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0.0 | 2026-01-06 | 初版发布 |
