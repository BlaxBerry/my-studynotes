# Golang 变量、常量

## 变量声明

变量定义时可指定类型，也可通过值进行类型判断

变量的定义可理解为在内存中为该变量开辟一个空间存储其值

变量名采用驼峰命名法，大写字母开头的变量可被其他包访问，小写字母开头的变量仅限当前包内使用

---

### 使用 var 关键字

```go
var 变量 类型 = 值

var 变量 类型

var 变量 = 值
```

::: details 写法一：指定类型并赋值

::: code-group

```go [代码]

```

```shell [编译执行结果]

```

:::

::: details 写法二：仅指定类型

根据指定类型自动赋值默认值 ( 零值 )

各类型的默认值详见 [数据类型](./data-type.md)

::: code-group

```go{5-9} [代码]
package main

import "fmt"

var (
	aa int
	bb string
	cc bool
)

func main() {
	fmt.Printf("aa: %v\nbb: %v\ncc: %v\n", aa, bb, cc)
}
```

```shell [编译执行结果]
aa: 0
bb:
cc: false
```

:::

::: details 写法三：仅赋值

根据值自动进行类型推断

::: code-group

```go [代码]

```

```shell [编译执行结果]

```

:::

---

### 多变量声明

```go
var 变量A, 变量B AB相同的类型

var 变量A, 变量B = A的值, B的值
```

多个变量逐一定义太麻烦，建议使用一次性声明的方式

```go
var (
    变量 类型
    变量 类型
    变量 类型 = 值
    变量 类型 = 值
)
```

::: details 例子：

::: code-group

```go{5-9} [代码]
package main

import "fmt"

var (
	aa int
	bb string
	cc bool
)

func main() {
	fmt.Printf("aa: %v\nbb: %v\ncc: %v\n", aa, bb, cc)
}
```

```shell [编译执行结果]
aa: 100
bb: hello
cc: true
```

:::

---

### 省略 var 关键字

仅限函数内，可省略`var`关键字

根据值自动进行类型推断

```go
package 包名

func 函数() {
    变量 := 值
    // var 变量 类型 = 值
}
```
