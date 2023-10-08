# Github

## 身份验证（ Access Token ）

::: danger

```shell
% git push
Username for 'https://github.com': // [!code error]
Password for 'https:/用户名@github.com': // [!code error]
remote: Support for password authentication was removed on August 13, 2021. // [!code error]
remote: Please see https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls for information on currently recommended modes of authentication. // [!code error]
fatal: Authentication failed for 'https://github.com/用户名/仓库名.git/' // [!code error]
```

为了安全的目的，密码身份验证登陆已经不支持

应该使用 Personal Access Token ( 个人访问令牌 ) 来代替密码
:::

生成：

1. 登陆 Github →
2. 打开`Settings` →
3. 打开`Developer settings` →
4. 打开`Personal access tokens` →
5. 生成`Generate new token`

使用:
::: code-group

```shell{2} [方法一]
# 一劳永逸
% git remote set-url origin https://<ACCESS_TOKEN>@github.com/<USER_NAME>/<REPO_NAME>.git
% git push
```

```shell{2-4} [方法二]
# 每次提交都要验证
% git push
Username for 'https://github.com': 用户名
Password for 'https:/用户名@github.com': <ACCESS_TOKEN>
```

:::

身份验证成功后有可查看

```shell
% git config --local --list
remote.origin.url=https://<ACCESS_TOKEN>@github.com/<USER_NAME>/<REPO_NAME>.git
remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
branch.main.remote=origin
branch.main.merge=refs/heads/main
```
