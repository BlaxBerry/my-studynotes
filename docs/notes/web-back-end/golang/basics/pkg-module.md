# Golang 包、模块

## 简介

Golang 利用包、模块来组织管理代码，并采用 [Go Modules 模式](./go-modules.md) 来管理包的依赖关系

## 包

Golang 的包 ( pkg / package ) 即逻辑代码 ( 项目功能 )

- 一般建议包名与文件名相同，作为可执行文件的主包一般命名为`main` ( 即`main.go`文件 )
- 包的逻辑可以写在一个文件里，也可将逻辑拆分写为多个文件
- 包中成员拆分到多个文件中时，文件的`package`名要相同表明属于同一个包
- `package`定义当前包名 ( 指明当前文件内成员所属的包 )
- `import`导入当前包中所依赖的其他包
- 包中成员名首字母大写的对外公开可被其他包引用，小写的为当前包的私有成员

```go
package 包名

import (
    "依赖包名"
    "模块名/包名"
    别名 "依赖包名"
)

// 成员
// 成员
```

:::details 例子：

`main`包内导入并使用内置包`fmt`、`math/rand`

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	fmt.Println(rand.Int())
}
```

执行`main`包打印一个随机整数

```shell
% go run main.go
5577006791947779410
```

:::

## 模块

Golang 的模块 ( module ) 是多个包的集合 ( 项目目录 )

- 模块目录下必须有一个[`go.mod`](./go-modules.md#go-mod-文件)文件记录当前模块的信息，否则报错
- 模块需要一个主包`main`作为可执行文件 ( 即`main.go`文件 )

:::code-group

```shell [模块目录]
[模块]
|- 包.go
|- [子目录]
    |- 包.go
    |- 包.go
|- ...
|- main.go
|- go.mod
```

```go [go.mod]
module 模块名

go GO的版本

require (
    使用的第三方包
)
```

:::

<details class="details custom-block">
  <summary>例子：</summary>

模块名为`demo`，其中`basics`包将功能细分为`a.go`、`b.go`两个文件中，然后在主包`main.go`中导入`basics`包并使用其中的公有成员

:::code-group

```shell [目录]
demo
|- basics
    |- a.go
    |- b.go
|- main.go
|- go.mod
```

```go [go.mod]
module demo

go 1.18
```

```go [main.go]
package main

import (
	"demo/basics"
	"fmt"
)

func main() {
	fmt.Println(basics.A())
	fmt.Println(basics.B())
}
```

```go [basics/a.go]
package basics

// public
func A() string {
	return a()
}

// private
func a() string {
	return "a"
}
```

```go [basics/b.go]
package basics

// public
func B() string {
	return b()
}

// private
func b() string {
	return "b"
}
```

:::

```shell
% go run main.go
a
b
```

</details>

## 多模块工作区

> Golang v1.18 新增功能

多模块工作区 ( workspaces ) 用于本地开发时一个目录下包含多个项目的场景

- 多模块工作区目录下必须有一个`go.work`文件，否则各个模块的引用会报错
- 多模块工作区下的各个模块目录中必须有一个[`go.mod`](./go-modules.md#go-mod-文件)文件，否则无法使用该模块
- `go.work`文件仅在本地开发时使用，不需要提交

:::code-group

```shell [多模块工作区目录]
[多模块工作区]
|- [模块]
|- [模块]
|- ...
|- go.work
```

```go [go.work]
go GO的版本

use (
	./模块名
	./模块名
)
```

:::

:::details 例子：

`demo`目录下有两个模块`aa`、`bb`

```shell
demo
|- aa
    |- main.go
    |- go.mod
|- bb
    |- main.go
    |- go.mod
```

将`demo`目录初始化为多模块工作区

```shell
cd demo
go work init ./aa ./bb
```

命令执行后`demo`目录下生成一个`go.work`文件

```go
go 1.18

use (
	./aa
	./bb
)
```

:::
