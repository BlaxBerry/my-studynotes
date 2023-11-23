# Golang 函数

https://www.bilibili.com/video/BV1tP4y1v7kW?p=58&vd_source=8960252a3845b76b699282b11f36ab5c

## 定义与使用

:::code-group

```go [无参数、返回值]
func 函数名() {
	// ...
}

函数名()
```

```go [有参数、返回值]
func 函数名(形参列表) (返回值类型列表)  {
	// ...
	return 返回值, 返回值
}

函数返回值, 函数返回值 := 函数名(实参, 实参)
```

:::

:::details 全局跨包函数

首字母大写的函数可被其他包访问，小写字母开头的函数仅限当前包内使用

详见 [Golang 包、模块](./pkg-module.md)

:::

---

### 参数

- 参数不是必须，若有参数需指明类型
- 有多个参数时需分别指定类型，若类型相同可在最后简写
- 参数个数不固定时以切片形式接收

:::code-group

```go [无参数]
func 函数名() {
	// ...
}

函数名()
```

```go [固定参数]
// 一个参数
func 函数名(参数 类型) {
	// ...
}

// 多个参数，不同类型
func 函数名(参数 类型, 参数 类型) {
	// ...
}

// 多个参数，相同类型
func 函数名(参数, 参数 类型) {
	// ...
}


函数名(参数)
函数名(参数, 参数)
```

```go [不定参数]
func 函数名(参数 ...类型) {
	// ...
}

函数名(参数)
函数名(参数, 参数)
函数名(参数, 参数, 参数)
```

:::

:::details 例子:

:::code-group

```go [固定参数]
package main

import "fmt"

func fff(a, b int) {	//[!code focus]
	fmt.Println(a + b)	//[!code focus]
}						//[!code focus]

func main() {
	fff(1, 2)			//[!code focus]// 3
	fff(2, 2)			//[!code focus]// 4
}
```

```go [不定参数]
package main

import "fmt"

func fff(params ...int) {	//[!code focus]
	fmt.Println(params)		//[!code focus]
}							//[!code focus]

func main() {
	fff()        			//[!code focus]// []
	fff(1)       			//[!code focus]// [1]
	fff(1, 2)    			//[!code focus]// [1, 2]
	fff(1, 2, 3) 			//[!code focus]// [1, 2, 3]
}
```

:::

---

### 返回值

- 返回值不是必须，若有返回值需指明返回值类型
- 有多个返回值时返回值类型需要用小括号包裹
- 函数一般会在返回值的最后返回一个错误对象用于异常处理

:::code-group

```go [单一返回值]
func 函数名() 返回值的类型 {
	// ...
}

返回值 := 函数()
```

```go [多个返回值]
func 函数名() (返回值1的类型, 返回值2的类型) {
	// ...
}

返回值1, 返回值2 := 函数()
返回值1 := 函数()
_, 返回值2 := 函数()
```

:::

:::details 例子：对函数返回值进行错误判断

> 函数用参数进行除法运算，作为分母的参数为 0 时返回错误对象

```go
package main

import (
	"errors"
	"fmt"
)

func fff(a, b int) (int, error) {			//[!code focus]
	if b == 0 {								//[!code focus]
		return 0, errors.New("【错误信息】")  //[!code focus]
	}										//[!code focus]
	return a/b, nil							//[!code focus]
}											//[!code focus]

func main() {
	res, err := fff(4,2)					//[!code focus]
	fmt.Println(res, err)					//[!code focus]// 2 <nil>

	res, err = fff(4,0)						//[!code focus]
	fmt.Println(res, err)					//[!code focus]// 0 【错误信息】
}
```

:::

## 其他函数

---

### main 函数

- `main`函数是 Golang 程序的入口，程序都是从`main`函数开始执行
- 一个程序只能包含一个`main`函数
- 没有参数名，也没有返回类型

```go
package 包名

import "依赖包"

func main() {
	// ...
}
```

---

### init 函数

- 非必需，只能定义在包级别下
- 当包初始化时自动调用执行，在入口函数`main`函数之前执行
- 可用于初始化包的全局变量等操作

```go
package 包名

import "依赖包"

func init() {
	// ...
}
```

<details class="details custom-block">
  <summary>例子：</summary>
  
:::code-group

```shell [模块目录结构]
demo
|- main.go
|- subpkg
	|- init.go
	|- a.go
	|- b.go
|- go.mod
```

```go [demo/main.go]
package main

import (
	"fmt"
	"demo/subpkg"
)

func init() {					//[!code focus]
	fmt.Println("初始化主包")     //[!code focus]
}

func main() {					//[!code focus]
	fmt.Println("执行入口函数")	  //[!code focus]
	subpkg.A()					//[!code focus]
	subpkg.B()					//[!code focus]
}								//[!code focus]
```

```go [demo/subpkg/init.go]
package apis

import "fmt"

var (						//[!code focus]
	XX int					//[!code focus]
	YY string				//[!code focus]
)							//[!code focus]

func init() {				//[!code focus]
	XX = 999				//[!code focus]
	YY = "yyy"				//[!code focus]
	fmt.Println("初始化子包") //[!code focus]
}							//[!code focus]
```

```go [demo/subpkg/a.go]
package apis

import "fmt"

func A() {					   	   //[!code focus]
	fmt.Println("执行子包成员 A")	 //[!code focus]
}  								   //[!code focus]
```

```go [demo/subpkg/b.go]
package apis

import "fmt"

func B() {					   	   //[!code focus]
	fmt.Println("执行子包成员 B")	 //[!code focus]
	fmt.Println(XX, YY)	   		   //[!code focus]
}  								   //[!code focus]
```

:::

:::code-group

```shell [执行结果]
% go run main.go

初始化子包
初始化主包
执行入口函数
执行子包成员 A
执行子包成员 B
999 yyy
```

:::

</details>

---

### 匿名函数

```go
var 函数名 = func(形参列表) (返回值类型列表)  {
	// ...
	return 返回值, 返回值
}

函数名(实参, 实参)
```

:::details 例子:

```go
package main

import "fmt"

var getString = func() string {	//[!code focus]
	return "xxx"				//[!code focus]
}								//[!code focus]

func main() {
	res := getString()			//[!code focus]
	fmt.Println(res)			//[!code focus]// xxx
}
```

:::

---

### 立即执行函数

```go
func(形参列表) (返回值类型列表) {
	// ...
}(实参, 实参)
```

:::details 例子:

:::code-group

```go [例一]
package main

import "fmt"

func main() {
	func() {				//[!code focus]
		fmt.Println("xxxx")	//[!code focus]
	}()						//[!code focus]
}
```

```go [例二]
package main

import "fmt"

func main() {
	res := func() string {	//[!code focus]
		return "xxx"		//[!code focus]
	}()						//[!code focus]

	fmt.Println(res)		//[!code focus]//xxx
}
```

:::

---

### 回调函数

:::details 例子：

```go
package main

import "fmt"

var fff = func(f func(m string)) {
	message := "hello"
	f(message)
}

func main() {
	fff(func(m string) {
		fmt.Println(m)
	})
}
```

:::

---

### 指针函数

详见 [Golang 指针](./pointer.md)

:::code-group

```go [无返回值]
package main

import "fmt"

func fff(p *int) {		//[!code focus]
	*p += 1				//[!code focus]
}						//[!code focus]

func main() {
	var num int = 1		//[!code focus]

	fff(&num)			//[!code focus]// ← 1+1
	fff(&num)			//[!code focus]// ← 1+1
	fmt.Println(num)	// 3
}
```

```go [返回数据类型]
package main

import "fmt"

func fff(p *int) int {	//[!code focus]
	*p += 1				//[!code focus]
	return *p			//[!code focus]
}						//[!code focus]

func main() {
	var num int = 1		//[!code focus]

	res := fff(&num)	//[!code focus]
	fmt.Println(res) 	// 2

	res = fff(&num)		//[!code focus]
	fmt.Println(res) 	// 3

	res = fff(&num)		//[!code focus]
	fmt.Println(res) 	// 4
}
```

```go [返回指针类型]
package main

import "fmt"

func fff(p *int) *int {	//[!code focus]
	*p += 1				//[!code focus]
	return p			//[!code focus]
}						//[!code focus]

func main() {
	var num int = 1		//[!code focus]

	p := fff(&num)		//[!code focus]
	fmt.Println(p, *p)	// 0x140000aa008 2

	p = fff(&num)		//[!code focus]
	fmt.Println(p, *p)	// 0x140000aa008 3

	p = fff(&num)		//[!code focus]
	fmt.Println(p, *p)	// 0x140000aa008 4
}
```

```go [返回多个值]
package main

import "fmt"

func fff(p *int) (*int, int) {
	*p += 1
	return p, *p
}

func main() {
	var num int = 1

	p, d := fff(&num)
	fmt.Println(d, p) // 0x140000aa008 2

	p, d = fff(&num)
	fmt.Println(d, p) // 0x140000aa008 3

	p, d = fff(&num)
	fmt.Println(d, p) // 0x140000aa008 4
}
```

:::

## defer

`defer`关键字后的语句不会立即执行

```go
package main

import "fmt"

func fff() {
	fmt.Println(1)
	defer fmt.Println(22)
	defer fmt.Println(33)
	defer fmt.Println(44)
	fmt.Println(5)

}
func main() {
	fff()
}


// 1
// 5
// 44
// 33
// 22
```
