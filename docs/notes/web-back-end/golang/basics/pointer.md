# Golang 指针

## 简介

Golang 指针 ( Pointer ) 即某指定变量的内存地址

---

### 取址、取值

```go
// 获取指针 ( 获取一个变量的内存地址并存入变量 )
const 指针 = &变量

// 获取指针的值 ( 获取该指针指向的数据的值 )
var 值 = *指针
```

---

### 指针类型

```go
*指针指向的数据的类型
```

## 值传递、引用传递

- **值传递 ( 值拷贝 )**：开辟新内存空间**存放原本数据值的拷贝副本**，不影响原本数据
- **引用传递**：开辟新内存空间**存放原本数据的内存地址**，会影响到原本数据

> 如下：以函数为例

:::code-group

```go [值传递]
func 函数(参数 参数类型) {
	// 参数++
}

var 数据 类型
函数(数据)


// ↑ 调用函数后数据值不改变
// 调用函数时传递的实参：原数据值的拷贝副本
// 函数接收形参的类型：原数据值的类型
// 函数内部对形参的使用：参数
```

```go [引用传递]
func 函数(参数 *参数类型) {
	// *参数++
}

var 数据 类型
函数(&数据)


// ↑ 调用函数后数据值改变
// 调用函数时传递的实参：原数据的内存地址
// 函数接收形参的类型：原数据值的指针类型
// 函数内部对形参的使用：参数所指内存地址中存储的数据值
```

:::

:::details 例子：分析说明

> 如下：变量`num`值在函数`fff`调用后还是原值`1`

```go
package main

import "fmt"

func fff(num int) {		//[!code focus]
	num++				//[!code focus]
}						//[!code focus]

func main() {
	var num = 1			//[!code focus]
	fmt.Println(num)	// 1

	fff(num)			//[!code focus]
	fff(num)			//[!code focus]
	fmt.Println(num) 	// 1
}
```

因为函数调用时传入的是变量`num`的副本

即定义的变量`num`的地址和函数调用时其使用的参数`num`的内存地址不同

> 如下：利用`&变量`验证原值变量与函数形参的内存地址不同

```go
package main

import "fmt"

func fff(num int) {		//[!code focus]
	num++				//[!code focus]
	fmt.Println(&num)	//[!code focus]
}						//[!code focus]

func main() {
	var num = 1			//[!code focus]
	fmt.Println(&num)	//[!code focus]// 0x14000122018

	fff(num)			//[!code focus]// 0x14000122030
	fff(num)			//[!code focus]// 0x14000122008
}
```

想要修改到原数据的值：

- 调用函数时传递的实参：原数据值的副本 → 原数据的内存地址
- 函数接收形参的类型：原数据值的类型 → 原数据值的指针类型
- 函数内部对形参的使用：参数 → 参数的内存地址

```go
func 函数(
	参数 参数类型			//[!code --]
	参数 *参数类型		    //[!code ++]
) {
	参数++				   //[!code --]
	*参数++				   //[!code ++]
}

函数(数据)				   //[!code --]
函数(&数据)				   //[!code ++]
```

> 如下：变量`num`值在函数`fff`调用后改变了

```go
package main

import "fmt"

func fff(num *int) {	//[!code focus]
	*num++				//[!code focus]
}						//[!code focus]

func main() {
	var num = 1			//[!code focus]
	fmt.Println(num)	// 1

	fff(&num)			//[!code focus]
	fff(&num)			//[!code focus]
	fmt.Println(num) 	// 3
}
```

:::
