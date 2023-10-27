# Python 数据类型

## 类型查看

### type()

```py
type(数据)
```

:::details 例子：

```py{0}
print(type(""))         # <class 'str'>
print(type(0))          # <class 'int'>
print(type(0.0))        # <class 'float'>
print(type(True))       # <class 'bool'>
print(type(None))       # <class 'NoneType'>
print(type([]))         # <class 'list'>
print(type(()))         # <class 'tuple'>
print(type({}))         # <class 'dict'>
print(type(range(10)))  # <class 'range'>

def func():
    pass

print(type(func))       # <class 'function'>
```

:::

## 常见数据类型

### int

整数型

:::tip 整数型支持:

- 十进制: ( 如: `100` )
- 二进制: ( 如: `0b100`，十进制是 4 )
- 八进制: ( 如: `0o100`，十进制是 64 )
- 十六进制: ( 如: `0x100`，十进制是 256 )

:::

---

### float

浮点型 ( 小数型 )

:::tip 浮点型支持:

- 数学写法: ( 如: `123.456` )
- 科学计数法: ( 如: `1.23456e2` )

:::

---

### str

字符串型

字符串型为单引号、双引号括起来的任意文本

---

### bool

布尔型

布尔型只有`True`、`False`

---

### list

列表

```py
列表 = []
列表 = [元素]
列表 = [元素, 元素]
```

:::details 拼接

```py
l1 = [1, 2]
l2 = [3, 4]

print(l1 + l2)  # [1, 2, 3, 4]
```

:::

:::details 重复

```py
l = [1, 2]

print(l * 3)  # [1, 2, 1, 2, 1, 2]
```

:::

:::details 长度`len()`

```py
print(len([]))      # 0
print(len([1, 2]))  # 2
```

:::

:::details 成员判断`in`、`not in`

详见 [成员运算符](./operator.md#成员运算符)

```py{0}
l = [1, 2, 3]

print(1 in l)       # True
print(99 in l)      # False
print(1 not in l)   # False
print(99 not in l)  # True
```

:::

::: details 索引`list[index]`

```py
l = [0, 1, 2, 3, 4]

print(l[0])   # 0
print(l[1])   # 1
print(l[-1])  # 4
print(l[999])  // [!code error] # IndexError: list index out of range
```

:::

:::details 切片`list[start:end:step]`

> 切片前面闭区间后面开区间

```py{0}
列表[:]               # 列表[0] ～
列表[start:]          # 列表[start] ~
列表[:end]            # 列表[0] ～ 列表[end-1]
列表[start:end]       # 列表[start] ～ 列表[end-1]

列表[start:end:step]  # 间隔步长：step & 列表[start]～列表[end-1]
列表[::step]          # 间隔步长：step & 列表[0]
列表[start::step]     # 间隔步长：step & 列表[start]~
```

:::details 例子：

```py
l = [0, 1, 2, 3, 4]


print(l[:])         # [0, 1, 2, 3, 4]
print(l[2:])        # [2, 3, 4]
print(l[:2])        # [0, 1]

print(l[1:-1:2])    # [1, 3]
print(l[::2])       # [0, 2, 4]
print(l[1::2])      # [1, 3]
```

:::

:::details 列表生成式

性能优于上面使用 for 循环和 append 方法向空列表中追加元素的方式

强烈建议用生成式语法来创建列表

```py
列表 = [ 元素 for in 范围/列表]
列表 = [ 元素 for in 范围/列表 if 条件]
```

:::details 例子：

```py
# 由1～10的数字构成的列表
l1 = [e for e in range(1, 11)]
print(l1)  # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 由1～10中偶数数字构成的列表
l2 = [e for e in range(1, 11) if e % 2 == 0]
print(l2)  # [2, 4, 6, 8, 10]

# 由个两个字符串中字符的笛卡尔积构成的列表
l3 = [x + y for x in ["1", "2", "3"] for y in ["a", "b", "c"]]
print(l3)  # ['1a', '1b', '1c', '2a', '2b', '2c', '3a', '3b', '3c']
```

:::

:::details 解包 ( unpack )

::: code-group

```py [个数对应]
l = [1, 2, 3]
print(type(l))  # <class 'list'>

a, b, c = l
print(a, b, c)  # 1 2 3

a, b = [1, 2, 3] // [!code error]
// [!code error]# ValueError: too many values to unpack (expected 2)

a, b, c = [1, 2] // [!code error]
// [!code error]# ValueError: not enough values to unpack (expected 3, got 2)

```

```py{0} [个数省略<Badge>常用</Badge>]
l = [1, 2, 3, 4]   //[!code focus]
print(type(l))  # <class 'list'>

a, *b = l       //[!code focus]
print(b)        # [2, 3, 4]
print(type(b))  # <class 'list'>
print(*b)       # 2, 3, 4
print(a)        # 1

*a, b = l       //[!code focus]
print(a)        # [1, 2, 3]
print(*a)       # 1 2 3
print(type(a))  # <class 'list'>
print(b)        # 4

a, *b, c = l    //[!code focus]
print(b)        # [2, 3]
print(type(b))  # <class 'list'>
print(*b)       # 2, 3
print(a)        # 1
print(c)        # 4

a, *b, c, d, e = l   //[!code focus]
print(b)        # []
print(type(b))  # <class 'list'>
print(*b)       #
print(a)        # 1
print(c)        # 2
print(d)        # 3
```

:::

---

### tuple

元组

元组是不可变类型，一旦定义其中的元素不能再添加・删除・修改

```py
元组 = ()
元组 = (元素, )
元组 = (元素, 元素)
元组 = 元素, 元素      # 打包
```

```py
t1 = (1, 2, 3)
t2 = 1, 2, 3         # 打包

print(t1, type(t1))  # (1, 2, 3) <class 'tuple'>
print(t2, type(t2))  # (1, 2, 3) <class 'tuple'>
print(t1 == t2)      # True

```

:::details 打包

```py
a = 1, 10, 100

print(a)         # (1, 10, 100)
print(type(a))   # <class 'tuple'>
```

:::

:::details 解包 ( unpack )

::: code-group

```py [个数对应]
t = 1, 2, 3
print(type(t))  # <class 'tuple'>

a, b, c = t
print(a, b, c)  # 1 2 3

a, b = 1, 2, 3 // [!code error]
// [!code error]# ValueError: too many values to unpack (expected 2)

a, b, c = 1, 2 // [!code error]
// [!code error]# ValueError: not enough values to unpack (expected 3, got 2)

```

```py{0} [个数省略<Badge>常用</Badge>]
t = 1, 2, 3, 4  //[!code focus]
print(type(t))  # <class 'tuple'>

a, *b = t       //[!code focus]
print(b)        # [2, 3, 4]
print(type(b))  # <class 'list'>
print(*b)       # 2, 3, 4
print(a)        # 1

*a, b = t       //[!code focus]
print(a)        # [1, 2, 3]
print(*a)       # 1 2 3
print(type(a))  # <class 'list'>
print(b)        # 4

a, *b, c = t    //[!code focus]
print(b)        # [2, 3]
print(type(b))  # <class 'list'>
print(*b)       # 2, 3
print(a)        # 1
print(c)        # 4

a, *b, c, d, e = t   //[!code focus]
print(b)        # []
print(type(b))  # <class 'list'>
print(*b)       #
print(a)        # 1
print(c)        # 2
print(d)        # 3
```

:::

:::details 变量值交换

实际是利用元组解包

```py
a = 1
b = 2

a, b = b, a

print(a)  # 2
print(b)  # 1
```

:::

因为元组是不可变数据，故没有增删改吃操作

拼接、重复、长度、成员判断、索引、切片 等同于 [列表](#list)

:::details 例子：

```py
# 元组拼接
t1 = (1, 2)
t2 = (3, 4)
print(t1 + t2)          # (1, 2, 3, 4)

# 元组元素重复
print((1,) * 3)         # (1, 1, 1)

# 元组长度
print(len((1,)))        # 1
print(len(()))          # 0

# 元组成员判断
print(1 in (1,))        # True
print(999 not in (1,))  # True


t = (1, 2, 3)

# 元组索引
print(t[0])             # 1
print(t[99])            //[!code error]# IndexError: tuple index out of range

# 元组切片
print(t[:])             # (1, 2, 3)
print(t[1:])            # (2, 3)
print(t[:5])            # (1, 2, 3)
print(t[1::2])          # (2,)
print(t[:11:2])         # (1, 3)
```

:::

---

### dict

字典

```py
字典 = {}
字典 = {"键": 值}
字典 = {"键": 值, "键": 值}
```

:::details 解包 ( unpack )

```py

```

:::

---

### range

范围

> 前面闭区间后面开区间

```py
range(end)              # 0 ~ end ( 不包含 end )
range(start, end)       # start ~ end ( 不包含 end )
range(start, end, step) # step; 步长
```

:::details 例子：

```py
def log(r):                //[!code focus]
    print(r, type(r))      //[!code focus]
    for n in r:            //[!code focus]
        print(n, end=" ")  //[!code focus]


log(range(10))      //[!code focus]
# range(0, 10)
# 0 1 2 3 4 5 6 7 8 9 %

log(range(1, 10))  //[!code focus]
# range(1, 10)
# 1 2 3 4 5 6 7 8 9 %

log(range(10, 1))  //[!code focus]
# range(10, 1)

log(range(1, 10, 2))  //[!code focus]
# range(1, 10, 2)
# 1 3 5 7 9 %

log(range(10, 1, -1))  // [!code focus] # 倒叙范围需要加上 -1 的步长
# range(10, 1, -1)
# 10 9 8 7 6 5 4 3 2 %
```

:::

:::details 解包 ( unpack )

```py
r = range(1, 5) //[!code focus]
print(type(r))  # <class 'range'>

a, *b = r       //[!code focus]
print(b)        # [2, 3, 4]
print(type(b))  # <class 'list'>
print(*b)       # 2, 3, 4
print(a)        # 1

*a, b = r       //[!code focus]
print(a)        # [1, 2, 3]
print(*a)       # 1 2 3
print(type(a))  # <class 'list'>
print(b)        # 4

a, *b, c = r    //[!code focus]
print(b)        # [2, 3]
print(type(b))  # <class 'list'>
print(*b)       # 2, 3
print(a)        # 1
print(c)        # 4

a, *b, c, d, e = r   //[!code focus]
print(b)        # []
print(type(b))  # <class 'list'>
print(*b)       #
print(a)        # 1
print(c)        # 2
print(d)        # 3
```

:::

长度、成员判断、索引、切片 等同于 [列表](#int)

:::details 例子：

```py
r = range(1, 11)

# 范围长度
print(len(r))   # 10

# 范围成员判断
print(1 in r)   # True
print(999 in r) # False

# 范围索引
print(r[0])     # 1
print(r[99])    //[!code error] # IndexError: range object index out of range

# 范围切片
print(r[:])     # range(1, 11)
print(r[1:])    # range(2, 11)
print(r[:5])    # range(1, 6)
print(r[1::2])  # range(2, 11, 2)
print(r[:11:2]) # range(1, 11, 2)
```

:::

---

### NoneType

`None`空值的类型

```py
None
```

> `None`可以作为变量初始值、函数参数默认值等

```py
n = None

print(type(n))  # <class 'NoneType'>
print(bool(n))  # False


def func1():
    pass


def func2():
    return None


print(func1())  # None
print(func2())  # None

```

## 类型转换

Python 的内置函数

---

### int()

将一个数值或字符串转换成[整数](#int)

可以指定进制

```py

```

---

### float()

将一个字符串转换成[浮点数](#float)

```py

```

---

### str()

将指定的对象转换成[字符串](#str)

可以指定编码

```py

```

---

### chr()

将整数转换成该编码对应的字符串（一个字符）

可以指定编码

```py

```

---

### ord()

将字符串（一个字符）转换成对应的编码（整数）

可以指定编码

```py

```

---

### bool()

将数据转换为对应[布尔值](#bool)

```py{0}
print(bool(-1))     # True
print(bool("0"))    # True
print(bool(" "))    # True

print(bool(0))      # False
print(bool(""))     # False

print(bool(()))     # False
print(bool(()))     # False
print(bool({}))     # False

print(bool(None))   # False

```

---

### list()

将一个可遍历对象转换为[列表](#list)

```py
print(list((1, 2, 3)))          # [1, 2, 3]
print(list(range(1,4)))         # [1, 2, 3]

print(list("123"))              # ['1', '2', '3']
print(list({"a": 1, "b": 2}))   # ['a', 'b']
```

---

### tuple()

将一个可遍历对象转换为[元组](#tuple)

```py
print(tuple([1, 2, 3]))         # (1, 2, 3)
print(tuple(range(1, 4)))       # (1, 2, 3)

print(tuple("123"))             # ('1', '2', '3')
print(tuple({"a": 1, "b": 2}))  # ('a', 'b')

```
