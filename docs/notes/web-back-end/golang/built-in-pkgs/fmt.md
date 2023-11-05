# Golang 内置包 fmt

## 简介

`fmt`包实现了格式化的标准输入输出

```go
import "fmt"
```

## 常用函数

### fmt.Print()

终端输出一行信息

若想换行需拼接转义字符`\n`

```go
fmt.Print(数据)
```

:::details 例子：

```go
package main

import "fmt"            // [!code focus]

func main(){
    fmt.Print("111")    // [!code focus]
	fmt.Print("222")    // [!code focus]
}


// 111222
```

:::

### fmt.Println()

终端输出一行信息

在结尾自动换行

```go
fmt.Println(数据)
```

:::details 例子：

```go
package main

import "fmt"            // [!code focus]

func main(){
    fmt.Println("111")    // [!code focus]
	fmt.Println("222")    // [!code focus]
}


// 111
// 222
```

:::

---

### fmt.Printf()

终端输出一行格式化的信息

若想换行需拼接转义字符`\n`

拼接多个数据参数时，与格式字符顺序对应

```go
fmt.Printf("%格式字符", 数据)
fmt.Printf("%格式字符\n", 数据)
fmt.Printf("%格式字符1 %格式字符2 %格式字符3", 数据1, 数据2, 数据3)
```

:::details 例子：

```go
package main

import "fmt"                  // [!code focus]

var data int = 999            // [!code focus]

func main(){
    fmt.Printf("%v", data)    // [!code focus]
    fmt.Printf("%T", data)    // [!code focus]
	fmt.Printf("%c", data)    // [!code focus]// 999intϧ

    fmt.Printf("%v\n", data)  // [!code focus]// 999
    fmt.Printf("%T\n", data)  // [!code focus]// int
	fmt.Printf("%c\n", data)  // [!code focus]// ϧ

    fmt.Printf(               // [!code focus]
       "Value:\t%v\nType:\t%T\nCode:\t%c\n", // [!code focus]
        data, data, data,     // [!code focus]
    )                         // [!code focus]
    // [!code focus]// value:   999
    // [!code focus]// Type:    int
    // [!code focus]// Code:    ϧ
}
```

:::

---

### fmt.Sprintln()

:::details 例子：

```go
package main

import "fmt"    // [!code focus]

func main(){
    // [!code focus]
	// [!code focus]
}
```

:::

---

### fmt.Fprintln()

:::details 例子：

```go
package main

import "fmt"    // [!code focus]

func main(){
    // [!code focus]
	// [!code focus]
}
```

## :::

### fmt.Errorf()

:::details 例子：

```go
package main

import "fmt"    // [!code focus]

func main(){
    // [!code focus]
	// [!code focus]
}
```

:::
