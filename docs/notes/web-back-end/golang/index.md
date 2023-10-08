# Go 相关

![](/images/golang.webp)

## 安装

> 本文为 Mac 环境下使用 [asdf](../../web-others/web-dev-tools/asdf/index.md)

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

## 目录结构

### GOPATH <Badge type="warning">弃用</Badge>

> Golang 旧版本的约定

所有项目与包都存放于`GOPATH`工作目录下

```shell
|- [GOPATH]
    |- bin # 存放编译后生成的二进制可执行文件
    |- pkg # 存放编译后的中间文件
    |- src # 存放项目源码
        |- GO项目
        |- GO项目
        |- ...
```

::: code-group

```shell [获取 GOPATH]
% go env GOPATH
/Users/用户/.asdf/installs/golang/1.18/packages
```

:::

---

### Go Modules

> 默认的项目存放位置与依赖包的管理方式

不再依靠`GOPATH`目录，可在任何目录下创建项目

通过`go mod`相关命令管理项目与其依赖包

```shell
|- [任意位置]
    |- GO项目
        |- 自定义功能包
            |- 细分的功能.go
            |- 细分的功能.go
            |- ...
        |- ...
        |- main.go
        |- go.mod
        |- go.sum
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

## 格式化

```shell
gofmt -w 目标文件.go
```

<br/>

中文网：http://c.biancheng.net/golang/syntax/

Go 语言常用内置包简介： http://c.biancheng.net/view/4306.html
