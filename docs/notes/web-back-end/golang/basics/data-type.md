# Golang 数据类型

## 基本数据类型

### 整数型

整数型的变量未赋值时默认值为`0`

整数型可细分为下列类型

| 类型名             | 默认值 | 范围                                          | 长度  |
| ------------------ | ------ | --------------------------------------------- | ----- |
| int8               | `0`    | `-128`~`127`                                  | 8bit  |
| int16              | `0`    | `-128`~`127`                                  | 16bit |
| int32 / int / rune | `0`    | `-2147483648`～`2147483647`                   | 32bit |
| int64 / int        | `0`    | `-9223372036854775808`～`9223372036854775807` | 64bit |
| uint8 / byte       | `0`    | `0`～`255`                                    | 8bit  |
| uint16             | `0`    | `0`～`65535`                                  | 16bit |
| uint32 / uint      | `0`    | `0`～`4294967295`                             | 32bit |
| uint64 / uint      | `0`    | `0`～`18446744073709551615`                   | 64bit |

一般整数类型常用`int`，会自动根据系统区分 32 / 64 位

```go
var 变量 int = 值
var 变量 int
```

---

### 浮点型

浮点型的变量未赋值时默认值为`0`

浮点型可细分为下列类型

| 类型名  | 默认值 | 范围                      | 长度  |
| ------- | ------ | ------------------------- | ----- |
| float32 | `0`    | `-3.403E38`～`3.403E38`   | 32bit |
| float64 | `0`    | `-1.798E308`～`1.798E308` | 64bit |

```go
var 变量 float64 = 值
var 变量 float64
```

---

### string

**双引号**包裹的字符

字符串类型的变量未赋值时默认值为`""`

```go
var 变量 string = "值"
var 变量 string
```

:::details 拼接、长度

```go
// 拼接
"字符串" + "字符串"

// 长度
len("字符串")
```

:::details 例子：

```go
package main

import "fmt"

func main() {
	s := "hello" + " " + "world"    //[!code focus]

	fmt.Println(s)          //[!code focus]// hello world
	fmt.Println(len(s))     //[!code focus]// 11
}
```

:::

:::details 转义字符

| 转义字符  | 含义       |
| --------- | ---------- |
| `"\n"`    | 换行       |
| `"\t" `   | 横向制表符 |
| `"\r" `   | 回车       |
| `"\\'"`   | 单引号     |
| `"\\\\" ` | 反斜线     |

:::

:::details 格式字符`%`

多与[`fmt.Printf()`](../built-in-pkgs/fmt.md#fmt-printf)一起使用

| 格式字符 | 含义                             | 例子                       |
| -------- | -------------------------------- | -------------------------- |
| `%v`     | 数据的值                         | `fmt.Printf("%v", 1+2)`    |
| `%T`     | 数据的类型                       | `fmt.Printf("%T", 999)`    |
| `%.2f`   | 浮点型数据保留小数点后两位       | `fmt.Printf("%.2f", 10.0)` |
| `%c`     | byte 类型数据对应的 Unicode 码值 | `fmt.Printf("%c", 64)`     |

:::

---

### byte

**单引号**包裹字符、0 ～ 255 范围的整数型 详见 [整数型](#整数型)

字符类型的变量未赋值时默认值为`0`

```go
var 变量 byte = '值'
var 变量 byte

var 变量 int = '值'
var 变量 unit8 = '值'
```

:::details 例子：

```go
package main

import "fmt"

var (                   //[!code focus]
	a byte = 'a'        //[!code focus]
	b byte = 97         //[!code focus]
	c byte = '@'        //[!code focus]
	d int  = 'あ'       //[!code focus]
	e int  = '嗨'       //[!code focus]
)                       //[!code focus]

func main() {
	fmt.Printf(         //[!code focus]
		"a %v %T\nb %v %T\nc %v %T\nd %v %T\ne %v %T\n", //[!code focus]
		a, a,           //[!code focus]// a 97 uint8
		b, b,           //[!code focus]// b 97 uint8
		c, c,           //[!code focus]// c 64 uint8
		d, d,           //[!code focus]// d 12354 int
		e, e,           //[!code focus]// e 21992 int
	)                   //[!code focus]

	fmt.Println(a == b) //[!code focus]// true
}
```

:::

---

### bool

布尔值只有`true`、`false`

布尔类型的变量未赋值时默认值为`false`

```go
var 变量 bool = true
var 变量 bool = false
var 变量 bool
```

---

### nil

## 复杂数据类型

### 指针类型

详见 [指针 ( Pointer )](pointer.md)

:::code-group

```go [写法一]
*数据类型
```

```go [写法二]
var 变量 = new(数据类型)
```

:::

---

### 数组

> Golang 的数组 ( Array ) 相当于其他语言中的元组 ( Tuple )

---

### 切片

> Golang 的切片 ( Slice ) 相当于其他语言中的数组 ( Array )

---

### struct

Golang 的结构体( Struct ) 相当于其他语言中的对象 ( Object )

---

### interface

接口

---

### map

集合

## 自定义类型

```go
type 自定义类型名 类型
```

:::details 例子：

```go
package main

import "fmt"

type I int						//[!code focus]
type S string					//[!code focus]
type F func(m string) string	//[!code focus]
type Person struct {			//[!code focus]
	name S						//[!code focus]
	age  I						//[!code focus]
	say  F						//[!code focus]
}								//[!code focus]

func main() {
	andy := Person{name: "Andy", age: 28}	//[!code focus]

	tom := Person{						//[!code focus]
		name: "Tom",					//[!code focus]
		age:  16,						//[!code focus]
		say: func(m string) string {	//[!code focus]
			return m					//[!code focus]
		}}								//[!code focus]


	fmt.Println(andy)					//[!code focus]// {Andy 28 <nil>}

	fmt.Println(tom.say("hello"))		//[!code focus]// hello
}
```

:::

## 类型查看

### fmt.Printf()

```go
fmt.Printf("%T", 数据)
```

---

### reflect.TypeOf()

```go
import "reflect"

reflect.TypeOf(数据)
```

---

### switch...

只能用于 interface 类型的变量

```go
var v = interface{}("hello")

switch v.(type) {
    case string:
        // ...
    case int:
        // ...
    default:
        // ...
}
```

## 类型转换

## 泛型
