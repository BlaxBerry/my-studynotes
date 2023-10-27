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

## 常用命令

### git branch

查看所有分支列表

```shell
git branch
```

::: details `git branch -D <BRANCH>`
删除某分支
:::

可参考的分支规范

- `develop`
- `feature`
  - `feature/<USER_NAME>/<SOMETHING>`
- `test`
- `release` : 预发布
- `master` :
- `hotfix` : 线上 Bug 紧急处理
  - `hotfix/<USER_NAME>/<SOMETHING>`

---

### git checkout

```shell
git checkout <BRANCH>
```

::: details `git checkout -b <BRANCH>`
新建并立刻跳转至某分支
:::

---

### git commit

可参考的提交信息规范

- fix: Bug 修复
- feat: 新功能开发
- docs: 不影响代码含义的修改，文档的修改
- style: 不影响代码含义的修改，空格、格式设置、缺失分号..
- refactor: 重构
- pref: 性能优化的代码修改
- test: 测试的添加、修改
- chore: 核心辅助、依赖库的修改
- revert: 回滚到上一个版本
- delete: 删除了某些东西
- modify: 小修改
- build: webpack、npm 等构建配置
- ci: 自动化流程的配置

---

### git stash

https://juejin.cn/post/6844904085716467720

https://developer.aliyun.com/article/1201539

用于将保存在缓存区的内容进行缓存，不计入 commit 提交

正在 A 分支进行开发时，B 分支出现 Bug 需要紧急修改，此时需要切换分支进行处理，但是切换前不想将 A 分支开发到一半的内容 commit 提交。此时就可使用`git stash`将开发到一半的内容进行缓存在需要时再恢复，从而减少不必要的垃圾 commit 记录

:::details `git stash list`
展示缓存列表
:::

:::details `git stash save <MESSAGE>`
储存缓存
:::

:::details `git stash pop stash <STASH ID>`
恢复缓存

命令执行后会删除怼用的记录
:::

---

### git show

查看修改内容 diff

```shell
git show <COMMIT_ID>
```

---

### git add

```shell
git add <SOMETHING>
git add .
```

---

### git status

查看 Git 管理的目录下工作区、暂存区的状态

---

### git reset

```shell
git reset --hard <COMMIT_ID>
```

---

### git cherry-pick

```shell
git reset --hard <COMMIT_ID>
git cherry-pick <COMMIT_ID>
```

## Submodules or Subtrees

团队中一般都会有公共的代码库，submodule 和 subtrees 可以让我们在不同项目中使用这些公共的代码，避免因拷贝产生重复代码，甚至导致相同代码出现不同修改产生多个版本。

区别:

subtree 和 submodule 的目的都是用于 git 子仓库管理，二者的主要区别在于，subtree 属于拷贝子仓库，而 submodule 属于引用子仓库。

使用:

关于实践，官方文档写的已经非常清楚了，我这里直接放上链接：

submodule: https://git-scm.com/book/en/v2/Git-Tools-Submodules

subtree: https://einverne.github.io/post/2020/04/git-subtree-usage.html
