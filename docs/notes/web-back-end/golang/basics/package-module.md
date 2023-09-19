# Golang 包、模块

## 简介

https://blog.framinal.life/entry/2021/04/11/013819?amp=1

## 目录结构

```shell
|- GO工作区
    |- src
        |- GO项目
        |- GO项目
            |- go.mod
            |- main.go
            |- 自定义包
                |- 细分的功能.go
                |- 细分的功能.go
                |- ...
            |- ...
```

## 包 ( package )

```shell
|- 项目
    |- 自定义包
        |- 细分的功能.go
        |- 细分的功能.go
        |- ...
    |- go.mod
    |- main.go
```

包名尽量与目录一致

`main`函数是当前文件所属的包的入口函数，

`main`函数所在包建议命名为`main`包

```go
package 当前文件所属的包的名

import "引入的包的名"

func main() {
	// ...
}
```

---

### 导入导出

自定义包名从`$GOPATH/src/`开始 ( 当前项目目录开始 )

导入多个包

```go
package 当前文件所属的包的名

import (
    "引入的包的名"
    "引入的包的名"

    "项目名/引入的包的名"

    别名 "引入的包的名"
    别名 "项目名/引入的包的名"
)
```

大写字母开头的成员可被其他包访问，小写字母开头的成员仅限当前包内使用

::: details 例子：

::: code-group

```shell [目录]
|- demo
    |- my_utils
        |- variables.go
        |- functions.go
    |- main.go
    |- go.mod
```

```go [main.go]
package main

import (
	"fmt"
	"demo/my_utils"
)

func main() {
	var sum = my_utils.GetSum(my_utils.A, my_utils.B)
	fmt.Println(sum)
}
```

```go [my_utils/variables.go]
package my_utils

var (
	A int = 100
	B int = 200
)
```

```go [my_utils/functions.go]
package my_utils

func GetSum(a, b int) int {
	return a + b
}
```

:::

## 模块 ( Module )

go mod init "xxx"

go mod tidy

go get xxxx
