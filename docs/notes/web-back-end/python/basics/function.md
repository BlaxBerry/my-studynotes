# Python 函数

## 参数

```py
def 函数名(形参):
    pass


函数名(实参)
函数名(实参, 实参)
```

### 不定形参 \*

形参借助`*`元组解包

```py
def 函数名(*行参):
    pass


函数名(实参, 实参)
```

```py
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

---

### 关键字形参 \*\*

形参借助`**`字典解包

```py
def 函数名(**行参):
    pass


函数名(实参=值, 实参=值)
```

```py
def func(**kw):
    print(kw)
    # print(type(kw))  # <class 'dict'>


func(a=1)
# {'a': 1}

func(a=1, b=2, c=3)
# {'a': 1, 'b': 2, 'c': 3}

func()
# {}
```

---

### 实参解包

:::code-group

```py [元组]

```

```py [字典]
d = {"a": 1, "b": 2, "c": 3}


def func(a, b, c):
    print(a)
    print(b)
    print(c)


func(**d)
# 1
# 2
# 3

# 相当于：
func(a=1, b=2, c=3)
# 1
# 2
# 3
```

:::
