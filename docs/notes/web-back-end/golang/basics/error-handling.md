# Golang 错误处理

## panic 捕获

### defer + recover

类似`try..catch...`的异常捕获

```go
package main

import "fmt"

func fff(a, b int) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
		}
	}()

	fmt.Println(a / b)
}


func main() {
	fff(1, 0)
}
```

## 自定义错误

### errors.New()

```go
package main

import (
	"errors"
	"fmt"
)

func fff(a, b int) (err error) {
	if b == 0 {
		return errors.New("xxx")
	} else {
		fmt.Println(a / b)
		return nil
	}
}

func main() {
	if err := fff(1, 0); err != nil {
		fmt.Println(err)
	}
}
```
