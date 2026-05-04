---
version: V1.0
updated: 2026-05-04
author: RUI
---

# Git 与版本控制

## 目录

- [GitHub 登录凭证](Git与版本控制.md#github-登录凭证)
- [HTTPS 和 SSH 的区别](Git与版本控制.md#https-和-ssh-的区别)
- [SSH Key 配置](Git与版本控制.md#ssh-key-配置)
- [仓库克隆与远程地址](Git与版本控制.md#仓库克隆与远程地址)
- [终端环境](Git与版本控制.md#终端环境)
- [cd 与基本命令](Git与版本控制.md#cd-与基本命令)
- [Git 常用主线流程](Git与版本控制.md#git-常用主线流程)
- [最重要的习惯](Git与版本控制.md#最重要的习惯)

---

## GitHub 登录凭证

Obsidian Git 弹出：

```text
Username for 'https://github.com':
Password:
```

应填写：

```text
Username: GitHub 用户名，不带 @
Password: GitHub Personal Access Token，不是 GitHub 登录密码
```

GitHub 个人信息里：

```text
大字：显示名
小字：@用户名
```

用户名填小字那一行，但不要带 `@`。

---

## HTTPS 和 SSH 的区别

HTTPS 和 SSH 都是本地 Git 与 GitHub 云端仓库沟通的方式。

```text
HTTPS = 用户名 + token
SSH   = 本机私钥 + GitHub 公钥
```

简单记：

```text
HTTPS 认 token
SSH 认 key
最终权限都认 GitHub 账号
```

---

## SSH Key 配置

SSH Key 分两部分：

```text
私钥：留在自己电脑上，不能泄露
公钥：添加到 GitHub
```

换电脑通常要重新配置 SSH key。

推荐做法：

```text
每台电脑生成自己的 SSH key
把每台电脑的公钥添加到 GitHub
```

### 新仓库默认用 SSH

在 GitHub 新建仓库后：

```text
Code -> SSH -> 复制 git@github.com:用户名/仓库名.git
```

然后克隆：

```bash
git clone git@github.com:用户名/仓库名.git
```

不要复制 HTTPS 地址：

```text
https://github.com/用户名/仓库名.git
```

### 已有仓库改成 SSH

查看当前远程地址：

```bash
git remote -v
```

把 HTTPS 改成 SSH：

```bash
git remote set-url origin git@github.com:用户名/仓库名.git
```

每个本地仓库都要各自改一次，但只需要改一次。

---

## 仓库克隆与远程地址

可以发两种地址：

```text
HTTPS:
https://github.com/用户名/仓库名.git

SSH:
git@github.com:用户名/仓库名.git
```

权限规则：

```text
public 仓库：任何人都能 clone
private 仓库：必须给队友权限
能 clone 不代表能 push
有 Write 权限才能 push
```

你负责给仓库权限，队友负责配置自己的 SSH key。

---

## 终端环境

终端是输入命令的窗口。

```text
cmd         Windows 老命令行
PowerShell  Windows 新命令行
Git Bash    安装 Git 后附带的类 Linux 命令行
```

Git 命令大多在哪个里面都能用。

检查 Git 是否可用：

```bash
git --version
```

---

## cd 与基本命令

`cd` 是 `change directory`，意思是切换当前文件夹。

```bash
cd 文件夹名    # 进入某个文件夹
cd ..         # 回到上一级
pwd           # 显示当前位置
ls            # 查看当前文件夹内容
```

---

## Git 常用主线流程

日常最常用流程：

```bash
git status
git add .
git commit -m "说明这次改了什么"
git push
```

含义：

```text
git status  查看当前状态
git add .   把修改加入暂存区
git commit  提交到本地仓库
git push    推送到 GitHub
```

从 GitHub 拉取更新：

```bash
git pull
```

查看修改内容：

```bash
git diff
```

查看提交历史：

```bash
git log --oneline
```

---

## 最重要的习惯

每次操作前先看状态：

```bash
git status
```

它会告诉你：

```text
当前在哪个分支
哪些文件改了
哪些文件还没提交
本地是否领先或落后 GitHub
```

---

## 相关笔记

- [[开发工具与AI/AI辅助开发]] — AI 工具在开发中的使用
- [[../Home]] — 返回总索引
