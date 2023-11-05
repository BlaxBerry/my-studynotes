---
prev: false
next: false
---

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

> 如下：本文使用 Golang v1.20

```shell
% go version
go version go1.20 darwin/arm64
```

## 项目结构

:::code-group

```shell [普通小项目目录结构]
[项目目录]
|- main.go
|- go.mod
|- ...
```

```shell [大项目目录结构]
[项目目录]
|- cmd
    |- [子项目]
        |- main.go
|- internal
|- pkg
|- scripts
|- api
|- assets
|- build
|- configs
|- deployments
|- docs
|- examples
|- init
|- test
|- third_party
|- tool
|- Makefile
|- go.mod
|- README.md
|- README_es.md
|- ...
```

:::

## 程序执行

Golang 是个编译型静态语言，文件需要先编译后才能执行

::: details 方法一：`go build`

::: code-group

```shell [执行命令]
% go build 文件名.go
% ./文件同名二进制文件
```

```shell [目录结构]
|- 文件名.go
|- 同名二进制文件
```

先编译目标文件生成二进制可执行文件，然后在执行该文件

目标文件的依赖包全部打包编译，生成的二进制文件在无 Golang 的环境中也可执行

:::

::: details 方法二：`go run` <Badge>推荐</Badge>

```shell
% go run 文件名.go
```

编译并执行目标文件

要编译并执行的文件为`main.go`时命令可简写为`go run .`

编译步骤在底层执行，命令必须在 Golang 的环境中执行

:::code-group

```shell [执行命令]
cd [项目目录]/cmd/[子项目目录]
go run .
```

```shell [目录结构]
[项目目录]
|- cmd
    |- [子项目目录]
        |- main.go
|- ...
|- go.mod
```

:::

## 代码注释

为了风格的统一建议全部使用单行注释

:::code-group

```go [单行注释]
// 一行注释
// 一行注释
// 一行注释
```

```go [多行注释 <Badge type="warning">不推荐</Badge>]
/*
一行注释
一行注释
*/
```

:::

## 代码格式化

Golang 制定了统一的官方代码风格

使用 gofmt 代码格式化工具

---

### gofmt

```shell
gofmt [flags] [path ...]
```

:::details `[flags]`参数

```shell
% gofmt --help

usage: gofmt [flags] [path ...]
  -cpuprofile string
        write cpu profile to this file
  -d    display diffs instead of rewriting files
  -e    report all errors (not just the first 10 on different lines)
  -l    list files whose formatting differs from gofmt's
  -r string
        rewrite rule (e.g., 'a[b:len(a)] -> a[b:]')
  -s    simplify code
  -w    write result to (source) file instead of stdout
```

> 比如:

```shell
gofmt -s -w 文件.go
```

:::

:::details VSCode 设置

:::code-group

```json [.vscode/settings.json]
{
  "[go]": {
    "editor.defaultFormatter": "golang.go",
    "editor.insertSpaces": true,
    "editor.formatOnSave": true
  },
  "go.formatTool": "gofmt",
  "go.formatFlags": ["-s", "-w"]
}
```

> 前提：安装 Go 插件以及插件所需的依赖包

:::
