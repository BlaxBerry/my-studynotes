# Go 相关

![](/images/golang.webp)

## 安装

> 本文为 Mac 环境下使用[asdf](../../dev-tools/asdf/index.md)

```shell
# 1.
asdf plugin add golang https://github.com/asdf-community/asdf-golang.git
# 2.
asdf install golang 1.18
# 3.
asdf global golang 1.18
# 4.
asdf reshim golang

# 5. 查看版本
go version
```

> 如下；本文使用 Go v1.18

```shell
% go version
go version go1.18 darwin/amd64
```
