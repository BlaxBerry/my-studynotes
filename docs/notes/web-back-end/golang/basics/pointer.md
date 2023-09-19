# Golang 指针 ( Pointer )

## 简介

指针允许你直接或间接地引用和修改变量的值，以及在函数之间传递数据的引用

```go
&变量		// 指向该变量的内存地址
*内存地址	// 向该变量的内存地址中存储的值
```

## 指针变量

指针变量用于存储内存地址

一个指针变量可以指向另一个变量的内存地址，允许对该变量进行间接操作

```go
var b = &a		// b 指向 a 变量的内存地址
var data = *b	// data 指向 a 变量的内存地址中存储的数据
```

::: details 例子：
::: code-group

```go [代码]
package main

import "fmt"

func main() { // [!code focus]
	var a int = 10  // [!code focus]

	var b = &a  // [!code focus]
	fmt.Printf("%v %T %v\n", b, b, *b)

	*b += 10  // [!code focus]
	fmt.Printf("%v %T %v\n", b, b, *b)
	fmt.Println(a)
} // [!code focus]
```

```shell [编译执行结果]
0xc0000b2008 *int 10
0xc0000b2008 *int 20

20
```

:::

::: details 例子：
::: code-group

```go [代码]
package main

import "fmt"

func main() { // [!code focus]
	var ( // [!code focus]
		a int  = 10 // [!code focus]
		b *int = &a // [!code focus]
		c *int = &a // [!code focus]
	) // [!code focus]

	*b += 10 // [!code focus]
	*c += 10 // [!code focus]
	*c += 10 // [!code focus]

	fmt.Printf(
		"b: %v %v\nc: %v %v\n",
		b, *b,
		c, *c,
	)
	fmt.Printf("a: %v\n", a)
} // [!code focus]
```

```shell [编译执行结果]
b: 0xc00001a080 40
c: 0xc00001a080 40
a: 40
```

:::

## 指针类型

指针类型描述了指针所指向的数据类型

```go
*数据类型
```

不同类型的指针不能互相赋值，即使它们都指向相同大小的数据

::: details 例子：
::: code-group

```go [代码]
package main

import "fmt"

func main() { // [!code focus]
	var ( // [!code focus]
		a int     = 10 // [!code focus]
		b float64 = 10.00 // [!code focus]
	) // [!code focus]

	var ( // [!code focus]
		pa *int     = &a // [!code focus]
		pb *float64 = &b // [!code focus]
	) // [!code focus]

	fmt.Println(pa, *pa, a)
	fmt.Println(pb, *pb, b)
} // [!code focus]
```

```go [编译执行结果]
0xc0000b2008 10 10
0xc0000b2010 10 10
```

:::

## 指针函数

指针函数是一个返回指针的函数，返回指针类型的值

用于创建新的数据结构实例、在函数内部分配内存等

::: details 例子：
::: code-group

```go [代码]
package main

import "fmt"

func main() { // [!code focus]
	res := doSomething() // [!code focus]
	fmt.Println(res, *res)
} // [!code focus]

func doSomething() *int { // [!code focus]
	x := 100 // [!code focus]
	return &x // 返回一个指向整数的指针 // [!code focus]
} // [!code focus]
```

```go [编译执行结果]
0xc00001a080 100
```

:::
