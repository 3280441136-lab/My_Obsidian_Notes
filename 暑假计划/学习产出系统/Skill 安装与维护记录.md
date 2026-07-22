---
title: Skill 安装与维护记录
created: 2026-07-22
updated: 2026-07-22
status: active
type: reference
tags:
  - Skill
  - Codex
  - Claudian
  - 学习产出
---

# Skill 安装与维护记录

## 1. 已安装的 Skill

| Skill | 使用场景 | 安装位置 |
|---|---|---|
| `$obsidian-learning-output-organizer` | 在 Claudian / Obsidian 内整理学习计划、XMind、方法论、模板、索引和阶段交付物 | `C:\Users\DongXinRui\.codex\skills\obsidian-learning-output-organizer` |
| `$engineering-study-cycle` | 在 GPT Codex App 或 Claudian 中进行一次完整学习闭环：讲解、单题追问、费曼复述、最小实验、输出到 Obsidian | `C:\Users\DongXinRui\.codex\skills\engineering-study-cycle` |

两个 Skill 都已通过 `quick_validate.py` 校验。

## 2. 什么时候调用哪个

### 调用 `$obsidian-learning-output-organizer`

适合说：

> 用 `$obsidian-learning-output-organizer` 帮我把今天 FPGA 学习产出整理进 Obsidian，并更新总控台。

它更像“资料管理员 + Obsidian 整理员”。重点是文件、链接、模板、索引、维护。

### 调用 `$engineering-study-cycle`

适合说：

> 用 `$engineering-study-cycle` 带我学 Verilog 非阻塞赋值，先讲 20% 重点，然后一次问我一个问题，最后生成知识卡片。

它更像“学习教练”。重点是理解、追问、验证、复述和单次学习输出。

## 3. 更新原则

以后如果学习流程变了，不要直接散改很多笔记，优先按这个顺序维护：

1. 修改 Skill 的 `SKILL.md`，让 AI 的行为先变稳定；
2. 修改 Skill 的 `references/`，补充模板或流程细节；
3. 再更新本 Obsidian 工作区的模板；
4. 最后更新已有交付物。

## 4. 版本维护建议

每次改 Skill 后，在这里追加一条记录：

```markdown
### YYYY-MM-DD 更新
- 修改对象：
- 修改原因：
- 影响的学习流程：
- 是否重新验证：
```

## 5. 当前初始化记录

### 2026-07-22 初始化

- 创建 `$obsidian-learning-output-organizer`。
- 创建 `$engineering-study-cycle`。
- 从 `米醋2026安路FPGA竞赛培训思维导图.xmind` 提取脑图提纲。
- 根据暑假计划、资料补充和方法论原始笔记，生成学习产出系统初版。
