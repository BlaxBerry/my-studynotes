# Golang 数据类型

Go 是个强类型语言，需要指定类型

## 基本数据类型

又称为值类型

基本数据类型都有其对应的指针类型`*基本数据类型`

---

### 整数型

Go 的整数类型默认为`int`类型

整数型数据在定义时若不赋值则使用默认保留值`0`

| 有符号整数类型 |                     范围                      |
| :------------: | :-------------------------------------------: |
|     `int8`     |                 `-128`～`127`                 |
|    `int16`     |               `-32768`～`32767`               |
|    `int32`     |          `-2147483648`～`2147483647`          |
|    `int64`     | `-9223372036854775808`～`9223372036854775807` |

| 无符号整数类型 |            范围             |
| :------------: | :-------------------------: |
|    `uint8`     |         `0`～`255`          |
|    `uint16`    |        `0`～`65535`         |
|    `uint32`    |      `0`～`4294967295`      |
|    `uint64`    | `0`～`18446744073709551615` |

| 其他整数类型 |           范围            |
| :----------: | :-----------------------: |
|    `int`     |  等价于 `int32`or`int64`  |
|    `uint`    | 等价于 `uint32`or`uint64` |
|    `rune`    |      等价于 `int32`       |
|    `byte`    |      等价于 `uint8`       |

---

### 浮点型

浮点型数据在定义时若不赋值则使用默认保留值`0`

| 浮点类型  |           范围            |
| :-------: | :-----------------------: |
| `float32` |  `-3.403E38`～`3.403E38`  |
| `float64` | `-1.798E308`～`1.798E308` |

---

### 布尔型 ( bool )

布尔型数据在定义时若不赋值则使用默认保留值`false`

| 布尔型  | 含义 |
| :-----: | :--: |
| `true`  |  真  |
| `false` |  假  |

---

### 字符型 ( byte )

赋值使用数值或单引号包裹的字符

字符型数据在定义时若不赋值则使用默认保留值`0`

字母、符号等字符值对应 ASCII 码，范围等价于`uint8` ( `0`～`255` )

汉字、假名等字符集对应的 Unicode 编码值已超过了 ASCII 码的范围，可使用`int`/`rune`

::: details 例子：

::: code-group

```go{7-11} [代码]
package main

import "fmt"

func main() {
	var (
		aa byte = 'a'
		bb byte = 250
		cc byte = '@'
		dd int  = 'あ'
		ff int  = '嗨'
	)
	fmt.Printf(
		"aa: %v,%c\nbb: %v,%c\ncc: %v,%c\ndd: %v,%c\nff: %v,%c\n",
		aa, aa,
		bb, bb,
		cc, cc,
		dd, dd,
		ff, ff,
	)
}
```

```shell [编译执行结果]
aa: 97,a
bb: 250,ú
cc: 64,@
dd: 12354,あ
ff: 21992,嗨
```

:::

转义字符`\`

| 转义字符 |      含义      | Unicode 编码值 |
| :------: | :------------: | :------------: |
|   `\n`   |      换行      |    `\u000a`    |
|   `\t`   | 制表符 ( Tab ) |    `\u0009`    |
|   `\'`   |     单引号     |    `\u0022`    |
|   `\"`   |     双引号     |    `\u0027`    |
|   `\\`   |     反斜杠     |    `\u005c`    |

---

### 字符串 ( string )

一串字符组成的固定长度的字符序列

字符串数据在定义时若不赋值使用默认保留值空字符串`""`

## 复杂数据类型

---

### 结构体 ( Struct )

::: code-group

```go [代码]

```

```shell [编译执行结果]

```

:::

---

### 接口 ( Interface )

::: code-group

```go [代码]

```

```shell [编译执行结果]

```

:::

---

### 数组

::: code-group

```go [代码]

```

```shell [编译执行结果]

```

:::

---

### map

::: code-group

```go [代码]

```

```shell [编译执行结果]

```

:::

### 管道 ( Channel )

::: code-group

```go [代码]

```

```shell [编译执行结果]

```

:::

---

### 指针类型 ( Pointer )

指针类型是指针变量的数据类型

详见 [指针](./pointer.md)

---

### 切片 ( Slice )

详见

## 类型转换

不同类型数据直接的转换只能通过显示转换 ( 强制转换 )

### T(t)

将当前类型`t`转为指定类型`T`

```go
目标类型(当前类型)
```

::: details 例子：

::: code-group

```go{6-7,10-11} [代码]
package main

import "fmt"

func main() {
	var a int = 1
	aa := float32(a)
	fmt.Printf("a: %T\naa: %T\n", a, aa)

	var b byte
	bb := string(b)
	fmt.Printf("b: %T\nbb: %T\n", b, bb)
}
```

```shell [编译执行结果]
a: int
aa: float32
b: uint8
bb: string
```

:::

---

### fmt.Sprintf()

将其他类型转为字符串型

使用内置包`fmt`下的`Sprintf()`函数

```go
package 当前文件所属包名

import "fmt"

var 字符串型 = fmt.Sprintf("%d", 整数型)
var 字符串型 = fmt.Sprintf("%f", 浮点型)
var 字符串型 = fmt.Sprintf("%t", 布尔型)
var 字符串型 = fmt.Sprintf("%c", 字符型)
```

::: details 例子：

::: code-group

```go{7-10,12-15} [代码]
package main

import "fmt"

func main() {
	var (
		a int     = 10
		b float32 = 1.00
		c bool    = false
		d byte    = '@'
	)
	aa := fmt.Sprintf("%d", a)
	bb := fmt.Sprintf("%f", b)
	cc := fmt.Sprintf("%t", c)
	dd := fmt.Sprintf("%c", d)

	fmt.Printf("a: %T,%v\naa: %T,%v\n", a, a, aa, aa)
	fmt.Printf("b: %T,%v\nbb: %T,%v\n", b, b, bb, bb)
	fmt.Printf("c: %T,%v\ncc: %T,%v\n", c, c, cc, cc)
	fmt.Printf("d: %T,%v\ndd: %T,%v\n", d, d, dd, dd)
}
```

```shell [编译执行结果]
a: int,10
aa: string,10
b: float32,1
bb: string,1.000000
c: bool,false
cc: string,false
d: uint8,64
dd: string,@
```

:::

---

### strconv.FormatXxxx()

> 太过麻烦不常用，推荐[`fmt.Sprintf()`](#fmt-sprintf)

将其他类型转为字符串型

使用字符串转换内置包`strconv`下的`Format`转换函数

```go
package 当前文件所属包名

import "strconv"

var 字符串型 = strconv.FormatInt(int64类型, 进制)
var 字符串型 = strconv.FormatFloat(float64类型, 'f', 小数点后保留位数, float的范围)
var 字符串型 = strconv.FormatBool(bool类型)
```

::: details 例子：

::: code-group

```go{10-12,15-17} [代码]
package main

import (
	"fmt"
	"strconv"
)

func main() {
	var (
		a int     = 10
		b float32 = 1.00
		c bool    = false
	)

	aa := strconv.FormatInt(int64(a), 10)
	bb := strconv.FormatFloat(float64(b), 'f', 2, 64)
	cc := strconv.FormatBool(c)

	fmt.Printf("a: %T,%v\naa: %T,%v\n", a, a, aa, aa)
	fmt.Printf("b: %T,%v\nbb: %T,%v\n", b, b, bb, bb)
	fmt.Printf("c: %T,%v\ncc: %T,%v\n", c, c, cc, cc)
}
```

```shell [编译执行结果]
a: int,10
aa: string,10
b: float32,1
bb: string,1.00
c: bool,false
cc: string,false
```

:::

---

### strconv.ParseXxxx()

将字符串型转为其他类型

使用字符串转换内置包`strconv`下的`Parse`转换函数

若字符串的值不属于转换类型的值，则转换后使用该类型的默认值

```go
package 当前文件所属包名

import "strconv"

var 布尔型, err = strconv.ParseBool(布尔值的字符串型)
var 整数型, err = strconv.ParseInt(整数值的字符串型, 进制, int的范围)
var 浮点数型, err = strconv.ParseFloat(浮点数值的字符串型, float的范围)
```

::: details 例子：

::: code-group

```go{10-12,15-17} [代码]
package main

import (
	"fmt"
	"strconv"
)

func main() {
	var (
		a string = "true"
		b string = "100"
		c string = "1.00"
	)

	aa, _ := strconv.ParseBool(a)
	bb, _ := strconv.ParseInt(b, 10, 64)
	cc, _ := strconv.ParseFloat(c, 64)

	fmt.Printf("a: %T,%v\naa: %T,%v\n", a, a, aa, aa)
	fmt.Printf("b: %T,%v\nbb: %T,%v\n", b, b, bb, bb)
	fmt.Printf("c: %T,%v\ncc: %T,%v\n", c, c, cc, cc)
}
```

```shell [编译执行结果]
a: string,true
aa: bool,true
b: string,100
bb: int64,100
c: string,1.00
cc: float64,1
```

:::
