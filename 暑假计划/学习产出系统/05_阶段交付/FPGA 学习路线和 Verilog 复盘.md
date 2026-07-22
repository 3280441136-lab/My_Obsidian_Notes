---
title: FPGA 学习路线和 Verilog 复盘
created: 2026-07-22
updated: 2026-07-22
status: draft
type: deliverable
tags:
  - 学习产出
---

# FPGA 学习路线和 Verilog 复盘

## 目标

从“会写一点 Verilog 语法”转向“知道代码对应什么硬件结构”。

## 路线草案

1. 数字逻辑回炉：组合逻辑、时序逻辑、触发器、计数器、状态机。
2. Verilog 基础：module、端口、wire/reg、assign、always、阻塞/非阻塞。
3. 验证习惯：testbench、波形、边界条件。
4. 工程模块：计数器、分频/使能、按键消抖、UART、FIFO/RAM。
5. 竞赛接口入口：VGA/HDMI、摄像头、以太网、AXI4-Stream、跨时钟域。

## 后续需要补充

- [ ] 每个模块的输入、输出、内部状态、时序关系。
- [ ] 每个关键模块至少一份波形或仿真说明。
- [ ] 每个常见坑配一个错误例子。
