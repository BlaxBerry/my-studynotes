---
prev: false
next: false
---

# Git 相关

![](/images/git.webp)

## 简介

Git 是一个分布式版本控制系统。用于跟踪文件的变化并协调多人合作开发，可以记录文件的每一个版本方便回溯和恢复文件。通过创建不同的分支来支持并行开发，可以在不同分支上进行独立的工作，并在合适的时候将分支合并回主分支

## 安装

> 本文为 Mac 环境

::: code-group

```shell [Homebrew]
brew install git
```

:::

## 设置

只能在 git 仓库内使用

:::code-group

```shell [Global]
git config --global --list

git config --global user.name "xxxx"
git config --global user.email xxxx
```

```shell [Local]
git config --local --list

git config --local user.name "xxxx"
git config --local user.email xxxx
```

:::

```shell
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
core.ignorecase=true
core.precomposeunicode=true
remote.origin.url=https://github.com/账户名/仓库名.git
remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
branch.main.remote=origin
branch.main.merge=refs/heads/main
```

## 推荐

### 分支命名规范

可参考的分支规范

develop
feature
feature/[username]/[dosomething]
test
release : 预发布
master :
hotfix : 线上 Bug 紧急处理
hotfix/[username]/[dosomething]

---

### 提交信息规范

可参考的

fix: Bug 修复
feat: 新功能开发
docs: 不影响代码含义的修改，文档的修改
style: 不影响代码含义的修改，空格、格式设置、缺失分号..
refactor: 重构
pref: 性能优化的代码修改
test: 测试的添加、修改
chore: 核心辅助、依赖库的修改
revert: 回滚到上一个版本
delete: 删除了某些东西
modify: 小修改
build: webpack、npm 等构建配置
ci: 自动化流程的配置

## Submodules or Subtrees

团队中一般都会有公共的代码库，submodule 和 subtrees 可以让我们在不同项目中使用这些公共的代码，避免因拷贝产生重复代码，甚至导致相同代码出现不同修改产生多个版本。

区别:

subtree 和 submodule 的目的都是用于 git 子仓库管理，二者的主要区别在于，subtree 属于拷贝子仓库，而 submodule 属于引用子仓库。

使用:

关于实践，官方文档写的已经非常清楚了，我这里直接放上链接：

submodule: https://git-scm.com/book/en/v2/Git-Tools-Submodules

subtree: https://einverne.github.io/post/2020/04/git-subtree-usage.html

## Monorepo
