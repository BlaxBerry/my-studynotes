# Git 常用命令

## git stash

https://juejin.cn/post/6844904085716467720

https://developer.aliyun.com/article/1201539

用于将保存在缓存区的内容进行缓存，不计入 commit 提交

::: tip 使用场景：

正在 A 分支进行开发时，B 分支出现 Bug 需要紧急修改，此时需要切换分支进行处理，但是切换前不想将 A 分支开发到一半的内容 commit 提交<br/>
此时就可使用`git stash`将开发到一半的内容进行缓存在需要时再恢复，从而减少不必要的垃圾 commit 记录

:::

### git stash save "MESSAGE"

储存缓存

---

### git stash list

展示缓存列表

---

### git stash pop stash \<STASH ID>

恢复缓存

命令执行后会删除怼用的记录
