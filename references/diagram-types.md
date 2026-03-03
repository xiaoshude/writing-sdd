# Diagram Types Reference

## Comparison Diagram

Side-by-side comparison of two concepts.

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

Use case: Before/After, Traditional/New, A vs B

---

## Vertical Flow

Sequential stages from top to bottom.

```
┌─────────────────────────────────────────┐
│ TITLE                                   │
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

Use case: Workflow, Pipeline, Process

---

## Card Grid

Multiple parallel items.

```
┌─────────────────────────────────────────┐
│ TITLE                                   │
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

Use case: Features, Principles, Trends

---

## Horizontal Flow

Command or code pipeline.

```
┌─────────────────────────────────────────┐
│ TITLE                                   │
│  ┌─────┐   ┌─────┐   ┌─────┐           │
│  │ Cmd │ → │ Cmd │ → │ Cmd │           │
│  ├─────┤   ├─────┤   ├─────┤           │
│  │Output│  │Output│  │Output│          │
│  │ Box  │  │ Box  │  │ Box  │          │
│  └─────┘   └─────┘   └─────┘           │
│  [Time comparison bar]                  │
└─────────────────────────────────────────┘
```

Use case: CLI workflow, Build pipeline, Data flow

---

## Architecture Diagram

Layered or hierarchical structure.

```
┌─────────────────────────────────────────┐
│ TITLE                                   │
│  ┌─────┐ ┌─────┐ ┌─────┐ (row 1)       │
│  └─────┘ └─────┘ └─────┘               │
│  ┌─────┐ ┌─────┐ ┌─────┐ (row 2)       │
│  └─────┘ └─────┘ └─────┘               │
│  ┌─────┐ ┌─────┐ ┌─────┐ (row 3)       │
│  └─────┘ └─────┘ └─────┘               │
│  [Philosophy bar]                       │
└─────────────────────────────────────────┘
```

Use case: Laws, Principles, Layers, Components

