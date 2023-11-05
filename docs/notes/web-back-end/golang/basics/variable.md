# Golang 变量

## var 关键字

```go
// 写法一: 指定类型并赋值
var 变量 类型 = 值

// 写法二: 仅指定类型 ( 根据指定类型自动赋值该类型数据的默认值 )
var 变量 类型

// 写法三: 仅赋值 ( 根据值自动推断类型 )
var 变量 = 值
```

:::details 例子：

```go
package main

import "fmt"

func main() {
	var a int = 999		//[!code focus]
	fmt.Println(a)		//[!code focus]// 999

	var b int			//[!code focus]
	fmt.Println(b)		//[!code focus]// 0

	var c = 999			//[!code focus]
	fmt.Println(c)		//[!code focus]// 999
}
```

:::

---

### 批量声明

`var`代码块

```go
var (
	变量 类型 = 值
	变量 类型
	变量 = 值
)
```

```go
var 变量, 变量, 变量 类型
```

```go
var 变量1, 变量2, 变量3 = 值1, 值2, 值3
```

:::details 例子：

```go
package main

import "fmt"

var (					  //[!code focus]
	a int = 999			  //[!code focus]
	b int				  //[!code focus]
	c = 999				  //[!code focus]
)

func main() {
	fmt.Println(a, b, c)  //[!code focus]// 999 0 999
}
```

:::

::: details 例子： 变量值交换

```go
package main

import "fmt"

var (						//[!code focus]
	a int = 10				//[!code focus]
	b int = 20				//[!code focus]
)							//[!code focus]

func main() {
	var c int = a			//[!code focus]
	a = b					//[!code focus]
	b = c					//[!code focus]

	fmt.Printf(
		"a: %v\nb: %v\n",
		a,					// a: 20
		b,					// b: 10
	)
}
```

:::

---

### 全局跨包变量

首字母大写、定义在函数外部的变量可被其他包访问，小写字母开头的变量仅限当前包内使用

详见 [Golang 包、模块](./pkg-module.md)

## 简短变量

简短变量的定义可省略`var`关键字，用`:=`定义

简短变量的定义简写只能在函数内部

```go
func 函数() {
	变量 := 值
	变量, 变量 := 值
}
```

## 重新赋值

:::code-group

```go [var 关键字]
func 函数() {
	var 变量 类型 = 值
	变量 = 新值
}
```

```go [简短变量]
func 函数() {
	变量 := 值
	变量 := 新值
}
```

:::

:::details 例子：
:::code-group

```go [var 关键字]
package main

import "fmt"

var a = 1			//[!code focus]

func main() {
	a = 2			//[!code focus]
	a = 3			//[!code focus]

	fmt.Println(a)  // 3
}
```

```go [简短变量]
package main

import "fmt"

func main() {
	a := 1			//[!code focus]
	a = 2			//[!code focus]
	a = 3			//[!code focus]
	fmt.Println(a)	// 3
}
```

:::

:::details 例子：

> 函数用参数进行除法运算，作为分母的参数为 0 时返回错误对象

调用函数后将返回值重新赋值给变量`res`、`err`

```go
package main

import (
	"errors"
	"fmt"
)

func fff(a, b int) (int, error) {
	if  == 0 {
		return 0, errors.New("【错误信息】")
	}
	return a / b, nil
}

func main() {
	res, err := fff(4,2)					//[!code focus]
	fmt.Println(res, err)					//[!code focus]// 2 <nil>

	res, err = fff(4,0)						//[!code focus]
	fmt.Println(res, err)					//[!code focus]// 0 【错误信息】
}
```

:::
