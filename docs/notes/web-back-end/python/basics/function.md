# Python 函数

## 参数

### 解包

:::code-group

```py [元组]
def func(*args):
    print(args)
    print(*args)
    # print(type(args))  # <class 'tuple'>


func(1, 2)
# (1, 2)
# 1 2

func(1, 2, 3, 4)
# (1, 2, 3, 4)
# 1 2 3 4

func()
# ()
#
```

:::
