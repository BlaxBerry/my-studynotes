# Go 相关

![](/images/golang.webp)

## 安装

> 本文为 Mac 环境下使用 [asdf](../../dev-tools/asdf/index.md)

```shell
# 1.
asdf plugin add golang https://github.com/asdf-community/asdf-golang.git
# 2.
asdf install golang 版本
# 3.
asdf global golang 版本
# 4.
asdf reshim golang
# 5. 查看版本
go version
```

> 如下：本文使用 Go v1.18

```shell
% go version
go version go1.18 darwin/amd64
```

```shell
% go env GOPATH
/Users/用户/.asdf/installs/golang/1.18/packages
```

```shell
% go env GOROOT
/Users/用户/.asdf/installs/golang/1.18/go
```

## 编译与执行

Go 是个编译型静态语言，文件需要先编译后才能执行

::: details 方法一：`go build`

::: code-group

```shell [命令]
% go build 文件名.go
% ./文件同名二进制文件
```

```shell [目录]
|- 文件名.go
|- 同名二进制文件
```

先手动编译，然后手动执行在命令执行目录下生成同名二进制文件

目标文件的依赖包全部打包编译，生成的二进制文件在无 GO 的环境中也可执行

:::

::: details 方法二：`go run`

```shell
% go run 文件名.go
```

像运行脚本一样直接执行，编译步骤在底层执行

仅编译执行目标文件的源代码，执行命令的环境中必须有 GO 否则无法执行

:::

## 注释

::: code-group

```go [行注释]
// 行注释
// 行注释
// 行注释
```

```go [块注释]
/* 块注释 */
```

:::

## 格式化

```shell
gofmt -w 目标文件.go
```

<br/>

中文网：http://c.biancheng.net/golang/syntax/
