# Git 常用命令

![](/images/git.webp)

## git branch

查看所有分支列表

```shell
git branch
```

```shell
% git branch
* 分支名    # 当前工作区所属的分支
  分支名
  分支名
```

### git branch -D [branch]

删除指定的分支

```shell
git branch -D 分支名
```

## git checkout

切换到指定分支

```shell
git checkout 分支名
```

### git checkout -b

切换并创建一个新分支

```shell
git checkout -b 分支名
```

## git add

```shell
git add .
```

## git stash

缓存 Git 缓存区内容，不计入 commit 提交记录

用于在切换分支进行紧急修改时避免产生无用的垃圾 commit 提交记录

https://juejin.cn/post/6844904085716467720

https://developer.aliyun.com/article/1201539

### git stash list

展示缓存列表

```shell
git stash list
```

---

### git stash save [message]

向缓存列表储存当前缓存区中的内容

```shell
git stash save 信息名
```

---

### git stash pop [stash{id}]

从缓存列表中恢复指定缓存，并删除该记录

```shell
git stash pop stash{id}
```

## git commit

### git commit -m [message]

```shell
git commit -m "提交信息"
```

## git status

## git log

### git log --oneline

```shell
git log --oneline
```

## git show

## git rebase

### git rebase -i HEAD~n

合并从当前 commit 提交记录往前指定个数的 commit 提交记录

https://blog.csdn.net/qq_14993591/article/details/133028476

## git reset

## git cherry-pick

```

```

## git revert
