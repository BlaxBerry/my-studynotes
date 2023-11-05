# Golang 流程控制

## 分支

### if...

:::code-group

```go [写法一]
if 条件 {
    // ...
}
```

```go [写法二]
if 变量 := 表达式; 条件 {
    // ...
}
```

:::

:::details 例子：对函数返回值进行错误判断

如下，使用两种写法<br/>
第二种写法的变量不是初次定义而是重新赋值所以没用`:=`

```go
package main

import (
	"errors"
	"fmt"
)

func fff(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("分母不能为 0")
	}
	return a / b, nil
}

func main() {
	res, err := fff(4, 2)	//[!code focus]
	if err != nil {			//[!code focus]
		fmt.Println(err)	//[!code focus]
	}						//[!code focus]

	if _, err = fff(4, 0); err != nil {	//[!code focus]
		fmt.Println(err)	 			//[!code focus]
	}									//[!code focus]
}
```

:::

---

### if...else...

:::code-group

```go [写法一]
if 条件 {
    // ...
} else {
    // ...
}
```

```go [写法二]
if 变量 := 表达式; 条件 {
    // ...
} else {
    // ...
}
```

:::

:::details 例子：判断奇偶数

```go
package main

import "fmt"

func fff(num int) {         //[!code focus]
	if num % 2 == 0 {         //[!code focus]
		fmt.Println("偶数")  //[!code focus]
	} else {                //[!code focus]
		fmt.Println("奇数")  //[!code focus]
	}                       //[!code focus]
}                           //[!code focus]

func main() {
	fff(2)                  //[!code focus]// 偶数
	fff(3)                  //[!code focus]// 奇数
}
```

:::

---

### if...else if...

:::code-group

```go [写法一]
if 条件 {
    // ...
} else if 条件 {
    // ...
}
```

```go [写法二]
if 变量 := 表达式; 条件 {
    // ...
} else if 条件 {
    // ...
}
```

:::

---

### if...else if...else...

:::code-group

```go [写法一]
if 条件 {
    // ...
} else if 条件{
    // ...
} else if 条件{
    // ...
} else {
    // ...
}
```

```go [写法二]
if 变量 := 表达式; 条件 {
    // ...
} else if 条件{
    // ...
} else if 条件{
    // ...
} else {
    // ...
}
```

:::

---

### switch...case...

:::code-group

```go [写法一]
switch 表达式返回值 {
case 值:
    // ...
case 值, 值, 值:
    // ...
default:
    // ...
}
```

```go [写法二]
switch 变量 := 表达式; {
case 条件:
    // ...
case 条件:
    // ...
default:
    // ...
}
```

```go [写法三]
switch {
case 条件:
    // ...
case 条件:
        // ...
}
```

:::

---

### fallthrough 关键字

穿透`switch...case...`

```go
switch 表达式返回值 {
    case 值:
        // ...
    case 值:
        // ...
        fallthrough
    case 值:
        // ...
    default:
        // ...
}
```

---

### goto 关键字

无条件跳转到某一行

容易造成逻辑混乱，不建议使用

:::details 例子：

```go
package main

import "fmt"

func main() {
	fmt.Println(1)  //[!code focus]
	fmt.Println(2)  //[!code focus]
	goto xxx        //[!code focus]
	fmt.Println(3)  //[!code focus]
	fmt.Println(4)  //[!code focus]
xxx:                //[!code focus]
	fmt.Println(5)  //[!code focus]
	fmt.Println(6)  //[!code focus]
}

// 1
// 2
// 5
// 6
```

:::

## 循环

### for...

:::code-group

```go [写法一]
for 变量 := 表达式; 条件; 变量迭代 {
    // ...
}
```

```go [写法一]
变量 := 表达式;

for 条件 {
    // ...
    变量迭代
}
```

:::

:::details 例子：

:::code-group

```go []
package main

import "fmt"

func main() {
	for i := 0; i <= 5; i++ {   //[!code focus]
		fmt.Println(i)          //[!code focus]
	}
}

// 0
// 1
// 2
// 3
// 4
// 5
```

```go [写法二]
package main

import "fmt"

func main() {
	var i = 0            //[!code focus]

	for i <= 5 {         //[!code focus]
		fmt.Println(i)   //[!code focus]
		i++              //[!code focus]
	}                    //[!code focus]
}

// 0
// 1
// 2
// 3
// 4
// 5
```

:::

:::details 例子：打印九九乘法表

```go
import "fmt"

func main() {
	for x := 1; x <= 9; x++ {                       //[!code focus]
		for y := 1; y < x + 1; y++ {                  //[!code focus]
			fmt.Printf("%v*%v=%v\t", x, y, x*y)     //[!code focus]
		}                                           //[!code focus]
		fmt.Println()                               //[!code focus]
	}                                               //[!code focus]
}

// 1*1=1
// 2*1=2   2*2=4
// 3*1=3   3*2=6   3*3=9
// 4*1=4   4*2=8   4*3=12  4*4=16
// 5*1=5   5*2=10  5*3=15  5*4=20  5*5=25
// 6*1=6   6*2=12  6*3=18  6*4=24  6*5=30  6*6=36
// 7*1=7   7*2=14  7*3=21  7*4=28  7*5=35  7*6=42  7*7=49
// 8*1=8   8*2=16  8*3=24  8*4=32  8*5=40  8*6=48  8*7=56  8*8=64
// 9*1=9   9*2=18  9*3=27  9*4=36  9*5=45  9*6=54  9*7=63  9*8=72  9*9=81
```

:::

---

### range 关键字

用于在`for`循环中遍历数组、切片、集合、通道

:::code-group

```go [数组、切片、字符串]
for 索引, 元素 := range 数据 {
    // ...
}

for 索引 := range 数据 {
    // ...
}

for _, 元素 := range 数据 {
    // ...
}
```

```go [集合]
for 键, 值 := range 数据 {
    // ...
}

for 键 := range 数据 {
    // ...
}

for _, 值 := range 数据 {
    // ...
}
```

:::

:::details 例子：

:::code-group

```go [数组]
package main

import "fmt"

func main() {
	var arr = []string{"a", "b", "c"} //[!code focus]

	for index, element := range arr { //[!code focus]
		fmt.Println(index, element)   //[!code focus]
	}                                 //[!code focus]
}

// 0 a
// 1 b
// 2 c
```

```go [集合]
package main

import "fmt"

func main() {
	var m = map[string]int{"a": 1, "b": 2, "c": 3}  //[!code focus]

	for key, value := range m {                     //[!code focus]
		fmt.Println(key, value)                     //[!code focus]
	}                                               //[!code focus]
}

// a 1
// b 2
// c 3
```

:::

---

### break 关键字

用于提前结束当前的循环

:::details 例子：

结束的是`break`所在的那一层循环，若只有一层循环则直接结束

:::code-group

```go [一层循环]
package main

import "fmt"

func main() {
	for i := 1; i <= 10; i++ {  //[!code focus]
		if i == 2 || i == 3 {   //[!code focus]
			break               //[!code focus]
		}                       //[!code focus]
		fmt.Println(i)          //[!code focus]
	}                           //[!code focus]
}

// 1
```

```go [多层循环]
package main

import "fmt"

func main() {
	for x := 1; x <= 3; x++ {       //[!code focus]
		for y := 1; y <= 3; y++ {   //[!code focus]
			if y == 2 || y == 3 {   //[!code focus]
				break               //[!code focus]
			}                       //[!code focus]
			fmt.Print(y)            //[!code focus]
		}                           //[!code focus]
		fmt.Println()               //[!code focus]
	}                               //[!code focus]
}


// 1
// 1
// 1
```

:::

---

### continue 关键字

用于放弃本次循环后续的代码直接进入下一轮循环

:::details 例子：

:::code-group

```go [一层循环]
package main

import "fmt"

func main() {
	for i := 1; i <= 5; i++ {   //[!code focus]
		if i == 2 || i == 3 {   //[!code focus]
			continue            //[!code focus]
		}                       //[!code focus]
		fmt.Println(i)          //[!code focus]
	}                           //[!code focus]
}

// 1
// 4
// 5
```

```go [多层循环]
package main

import "fmt"

func main() {
	for x := 1; x <= 3; x++ {       //[!code focus]
		for y := 1; y <= 5; y++ {   //[!code focus]
			if y == 2 || y == 3 {   //[!code focus]
				continue            //[!code focus]
			}                       //[!code focus]
			fmt.Print(y)            //[!code focus]
		}                           //[!code focus]
		fmt.Println()               //[!code focus]
	}                               //[!code focus]
}


// 145
// 145
// 145
```

:::

---

### return 关键字

结束当前函数

:::tip `return`vs`break `

- 多层循环中的`break`只会结束最近一层，后续循环还会执行
- `return`则是直接结束当前函数，后续代码一律不再执行

:::
