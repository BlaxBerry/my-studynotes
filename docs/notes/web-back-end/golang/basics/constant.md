# Golang 常量

## const 关键字

```go
// 写法一: 指定类型并赋值
const 常量 类型 = 值

// 写法二: 仅赋值 ( 根据值自动推断类型 )
const 常量 = 值
```

---

### 批量声明

:::code-group

```go [var 常量代码块]
const (
    常量 类型 = 值
    常量 = 值
)
```

:::

:::details 例子：

```go
package main

import "fmt"

const (                //[!code focus]
	a int = 999        //[!code focus]
	b     = 999        //[!code focus]
)                      //[!code focus]

func main() {
	fmt.Println(a, b)  //[!code focus]// 999 0 999
}
```

:::

---

### 全局跨包常量

首字母大写、定义在函数外部的常量可被其他包访问，小写字母开头的常量仅限当前包内使用

详见 [Golang 包、模块](./pkg-module.md)

## iota

`iota`是`const`常量代码块的索引计数器

- `const`常量代码块中每增加一行`iota`值 +1
- `iota`起始值为`0`
- 给常量赋值`iota`之后的每行默认为上一行的递增值

:::code-group

```go [例子一]
const (
    常量 = iota     // ← 0
    常量            // ← 1
    常量            // ← 2
    常量            // ← 3
)
```

```go [例子二]
const (
	常量 = 值
	常量 = 值
	常量 = iota     // ← 2
	常量            // ← 3
	常量            // ← 4
    常量 = 值
	常量 = 值
    常量 = iota     // ← 7  此处为重复赋值为 iota
	常量            // ← 8
	常量            // ← 9
)
```

```go [例子三]
const (
    常量 = iota         // ← 0
	常量                // ← 1
	常量 = iota * 10    // ← 20 ( 2 * 10 )
	常量                // ← 30 ( 3 * 10 )
	常量                // ← 40 ( 4 * 10 )
	常量 = iota         // ← 5
    常量                // ← 6
    常量                // ← 7
    常量 = iota * 100   // ← 800 ( 8 * 100 )
    常量                // ← 900 ( 9 * 100 )
    常量                // ← 1000 ( 10 * 100 )
)
```

:::
