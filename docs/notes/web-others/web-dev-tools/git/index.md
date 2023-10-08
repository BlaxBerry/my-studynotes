# Git 相关

![](/images/git.webp)

## 简介

Git 是一个分布式版本控制系统

用于跟踪文件的变化并协调多人合作开发，可以记录文件的每一个版本，方便回溯和恢复文件

通过创建不同的分支来支持并行开发，可以在不同分支上进行独立的工作，并在合适的时候将分支合并回主分支

## 安装

::: code-group

```shell [Mac]
brew install git
```

:::

## 设置

只能在 git 仓库内使用

::: code-group

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
