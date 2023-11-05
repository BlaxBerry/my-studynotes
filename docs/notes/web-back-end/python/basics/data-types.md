# Python 数据类型

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

:::details 拼接、重复、长度、成员判断

```py
# 拼接
字符串 + 字符串

# 重复
字符串 * 次数

# 长度
len(字符串)

# 成员判断
字符串 in 字符串
字符串 not in 字符串
```

:::details 例子：

```py
# 拼接
print("abc" + "def")  # abcdef

# 重复
print("a" * 3)        # aaa
```

:::

:::details 索引`str[index]`、切片`str[start:end:step]`

```py
s = "abcdefg"


print(s[0])      # "a"
print(s[1])      # "b"
print(s[-1])     # "g"
print(s[999])    //[!code error]# IndexError: string index out of range

print(s[:])      # "abcdefg"
print(s[2:])     # "cdefg"
print(s[:2])     # "ab"
print(s[1:-1:2]) # "bdf"
print(s[::2])    # "aceg"
print(s[1::2])   # "bdf"
```

:::

:::details 插值`f"{v}"`

```py
字符串 = f"字符串{表达式}字符串"
```

| 占位符写法                     | 含义                                             |
| ------------------------------ | ------------------------------------------------ |
| `f"{数值变量:.2f}"`            | 保留小数点后两位，自动四舍五入                   |
| `f"{数值变量:.0f}"`            | 小数点后不保留，自动四舍五入                     |
| `f"{数值变量:,}"`              | 变量值用`,`分割为 3 个一组                       |
| `f"{数值变量:一个字符>个数d}"` | 变量左侧字符数不够【个数】时自动补上【一个字符】 |
| `f"{数值变量:0>个数d}"`        | 变量左侧字符数不够【个数】时自动补上`0`          |
| `f"{数值变量:>个数d}"`         | 变量左侧字符数不够【个数】时自动补上空格         |

:::details 例子：

```py
x = 1
y = 2

print(f"{x} + {y} = {x+y}") # "1 + 2 = 3"


a = 1
b = 3.1415
c = 9.999

print(f"{a:.2f}")               # "1.00"
print(f"{b:.2f}  {c:.2f}")      # "3.14  10.00"
print(f"{b:.0f}  {c:.0f}")      # "3  10"
print(f"{10000000:,}")          # 10,000,000
print(f"{a:0>2d}  {a:0<3d}")    # "01  100"
print(f"{a:>4d}  {a:<4d}")      # "    1  1    "
print(f"{1000:x>4d} {10:x<4d}") # "1000  10xx"
```

:::

:::details 转义字符

| 转义字符        | 例子                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------- |
| `\字符`         | `"\n"` ( 换行 )<br/> `"\t"` ( 横向制表符 )<br/> `"\\"` ( 反斜杠`"\"` )<br/> `"\'"` ( 单引号`"'"` ) |
| `\八进制数值`   | `"\141\142\143"` ( `"abc"` )                                                                       |
| `\十六进制数值` | `"\x61\x62\x63"` ( `"abc"` )                                                                       |
| `\uUnicode编码` | `"\u00A5"` ( `"¥"` )<br/> `"\u4f60\u597d"` ( `"你好"` )<br/> `"\u3041\u3042"` ( `"ぁあ"` )         |

:::

---

### bool

布尔型

```py
True
False
```

---

### list

列表

```py
列表 = []
列表 = [元素]
列表 = [元素, 元素]
```

:::details 拼接、重复、长度、成员判断

```py
# 拼接
列表1 + 列表2

# 重复
列表 * 次数

# 长度
len(列表)

# 成员判断
元素 in 列表
元素 not in 列表
```

:::details 例子：

```py
# 拼接
l1 = [1, 2]
l2 = [3, 4]
print(l1 + l2)      # [1, 2, 3, 4]

# 重复
l = [1, 2]
print(l * 3)        # [1, 2, 1, 2, 1, 2]

# 长度
print(len([]))      # 0
print(len([1, 2]))  # 2

# 成员判断
print(1 in l)       # True
print(99 in l)      # False
print(1 not in l)   # False
print(99 not in l)  # True
```

:::

:::details 索引`list[index]`、切片`list[start:end:step]`

> 索引从`0`开始<br/>
> 切片区间前闭后开 ( 不包含结束位置元素 )

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


print(l[0])         # 0
print(l[1])         # 1
print(l[-1])        # 4
print(l[999])       // [!code error]# IndexError: list index out of range

print(l[:])         # [0, 1, 2, 3, 4]
print(l[2:])        # [2, 3, 4]
print(l[:2])        # [0, 1]
print(l[1:-1:2])    # [1, 3]
print(l[::2])       # [0, 2, 4]
print(l[1::2])      # [1, 3]
```

:::

:::details 列表生成式

性能优于`for`循环+`append()`方法向空列表中追加元素的方式

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

:::details 解包/拆包 ( unpacking )

```py
列表 = [元素1, 元素2, 元素3]

# 拆解全部
print(*列表) # 元素1 元素2 元素3

# 元素与接收变量个数一一对应
变量1, 变量2, 变量3 = 列表

# 元素与接收变量个数不对应
*变量1, 变量2, 变量3 = 列表
变量1, *变量2, 变量3 = 列表
*变量1, 变量2, *变量3 = 列表
*变量1, 变量2 = 列表
变量1, *变量2 = 列表
```

:::details 例子：

```py
l = [1, 2, 3, 4]    //[!code focus]
print(type(l))      # <class 'list'>

print(*l)           //[!code focus]# 1 2 3 4

a, b, c, d = l      //[!code focus]
print(a, b, c)      # 1 2 3 4

a, b = [1, 2, 3]    // [!code error]# ValueError: too many values to unpack (expected 2)
a, b, c = [1, 2]    // [!code error]# ValueError: not enough values to unpack (expected 3, got 2)

a, *b = l           //[!code focus]
print(b)            # [2, 3, 4]
print(type(b))      # <class 'list'>
print(*b)           # 2, 3, 4
print(a)            # 1

*a, b = l           //[!code focus]
print(a)            # [1, 2, 3]
print(*a)           # 1 2 3
print(type(a))      # <class 'list'>
print(b)            # 4

a, *b, c = l        //[!code focus]
print(b)            # [2, 3]
print(type(b))      # <class 'list'>
print(*b)           # 2, 3
print(a)            # 1
print(c)            # 4

a, *b, c, d, e = l //[!code focus]
print(b)            # []
print(type(b))      # <class 'list'>
print(*b)           #
print(a)            # 1
print(c)            # 2
print(d)            # 3
```

:::

:::details 压包`zip()`

```py
zip(可迭代对象, 可迭代对象, 可迭代对象)
```

:::details 例子：

```py
a = ["a", "b", "c"]
b = [1, 2, 3]

z = zip(a, b)

print(z)        # <zip object at 0x100428440>
print(type(z))  # <class 'zip'>


for e in z:
    print(e)

# ('a', 1)
# ('b', 2)
# ('c', 3)


for e in zip("abc", [1, 2, 3], (3, 4, 5), range(6, 10)):
    print(e)

# ('a', 1, 3, 6)
# ('b', 2, 4, 7)
# ('c', 3, 5, 8)
```

:::

---

### tuple

元组

```py
元组 = ()
元组 = (元素, )
元组 = (元素, 元素)
元组 = 元素, 元素   # 装包
```

元组是不可变类型，一旦定义其中元素不能变动，故没有增删改查操作

:::details 拼接、重复、长度、成员判断、索引、切片

等同于 [列表](#list)

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

:::details 装包 ( packing )

即将多个值装入一个元组

```py
元组 = 值, 值, 值   # (值, 值, 值)
```

::: details 例子：

```py
t = 1, 10, 100

print(t)            # (1, 10, 100)
print(type(t))      # <class 'tuple'>


t2 = (1, 10, 100)

print(t2, type(t2)) # (1, 2, 3) <class 'tuple'>
print(t1 == t2)     # True
```

:::

:::details 解包/拆包 ( unpacking )

```py
元组 = (元素1, 元素2, 元素3)

# 拆解全部
print(*元组) # 元素1 元素2 元素3

# 元素与接收变量个数一一对应
变量1, 变量2, 变量3 = 元组

# 元素与接收变量个数不对应
*变量1, 变量2, 变量3 = 元组
变量1, *变量2, 变量3 = 元组
*变量1, 变量2, *变量3 = 元组
*变量1, 变量2 = 元组
变量1, *变量2 = 元组
```

:::details 例子：

```py
t = 1, 2, 3, 4      //[!code focus]
print(type(t))      # <class 'tuple'>

print(*t)           //[!code focus]# 1 2 3 4

a, b, c, d = t      //[!code focus]
print(a, b, c, d)   # 1 2 3 4

a, b = 1, 2, 3      //[!code error]# ValueError: too many values to unpack (expected 2)
a, b, c = 1, 2      //[!code error]# ValueError: not enough values to unpack (expected 3, got 2)

a, *b = t           //[!code focus]
print(b)            # [2, 3, 4]
print(type(b))      # <class 'list'>
print(*b)           # 2, 3, 4
print(a)            # 1

*a, b = t           //[!code focus]
print(a)            # [1, 2, 3]
print(*a)           # 1 2 3
print(type(a))      # <class 'list'>
print(b)            # 4

a, *b, c = t        //[!code focus]
print(b)            # [2, 3]
print(type(b))      # <class 'list'>
print(*b)           # 2, 3
print(a)            # 1
print(c)            # 4

a, *b, c, d, e = t  //[!code focus]
print(b)            # []
print(type(b))      # <class 'list'>
print(*b)           #
print(a)            # 1
print(c)            # 2
print(d)            # 3
```

:::

:::details 变量值交换

实际是利用元组的拆解包

```py
a = 1
b = 2

a, b = b, a

print(a)  # 2
print(b)  # 1
```

:::

---

### range

范围

> 区间前闭后开 ( 不包含结束位置的数值 )

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


log(range(10))              //[!code focus]
# range(0, 10)
# 0 1 2 3 4 5 6 7 8 9 %

log(range(1, 10))           //[!code focus]
# range(1, 10)
# 1 2 3 4 5 6 7 8 9 %

log(range(10, 1))           //[!code focus]
# range(10, 1)

log(range(1, 10, 2))        //[!code focus]
# range(1, 10, 2)
# 1 3 5 7 9 %

log(range(10, 1, -1))       // [!code focus]# 倒叙范围需要加上 -1 的步长
# range(10, 1, -1)
# 10 9 8 7 6 5 4 3 2 %
```

:::

:::details 长度、成员判断、索引、切片

等同于 [列表](#list)

```py
r = range(1, 11)

# 范围长度
print(len(r))       # 10

# 范围成员判断
print(1 in r)       # True
print(999 in r)     # False
print(1 not in r)   # False
print(999 not in r) # True

# 范围索引
print(r[0])         # 1
print(r[99])        //[!code error]# IndexError: range object index out of range

# 范围切片
print(r[:])         # range(1, 11)
print(r[1:])        # range(2, 11)
print(r[:5])        # range(1, 6)
print(r[1::2])      # range(2, 11, 2)
print(r[:11:2])     # range(1, 11, 2)
```

:::

:::details 解包/拆包 ( unpacking )

```py
范围 = range(start:end:step)

# 拆解全部
print(*范围)

# 元素与接收变量个数一一对应
变量1, 变量2 = 范围

# 元素与接收变量个数不对应
*变量1, 变量2 = 范围
变量1, *变量2 = 范围
```

:::details 例子：

```py
r = range(1, 5)         //[!code focus]
print(type(r))          # <class 'range'>

print(*r)               //[!code focus]# 1 2 3 4

a, b, c, d = range(1, 5) //[!code focus]
print(a, b, c, d)       # 1 2 3 4

a, b, c = range(1, 3)   //[!code error]# ValueError: not enough values to unpack (expected 3, got 2)
a, b = range(1, 4)      //[!code error]# ValueError: too many values to unpack (expected 2)

a, *b = r               //[!code focus]
print(b)                # [2, 3, 4]
print(type(b))          # <class 'list'>
print(*b)               # 2, 3, 4
print(a)                # 1

*a, b = r               //[!code focus]
print(a)                # [1, 2, 3]
print(*a)               # 1 2 3
print(type(a))          # <class 'list'>
print(b)                # 4

a, *b, c = r            //[!code focus]
print(b)                # [2, 3]
print(type(b))          # <class 'list'>
print(*b)               # 2, 3
print(a)                # 1
print(c)                # 4

a, *b, c, d, e = r      //[!code focus]
print(b)                # []
print(type(b))          # <class 'list'>
print(*b)               #
print(a)                # 1
print(c)                # 2
print(d)                # 3
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

:::details 键值对个数、成员判断、索引查询、新增修改

```py
# 键值对个数
len(字典)

# 成员判断
键名 in 字典
键名 not in 字典

# 索引查询
值 = 字典["键名"]

# 值修改・键值对新增
字典["键名"] = 值
```

:::details 例子：

```py
d = {"a": 1, "b": 2, "c": 3}


# 键值对个数
print(len(d))           # 3
print(len({}))          # 0

# 成员判断
print("a" in d)         # True
print("xx" in d)        # False
print("a" not in d)     # False
print("xx" not in d)    # True

# 索引查询
print(d["a"])           # 1
print(d["xx"])          //[!code error]# KeyError: 'xx'
print(d.get("a"))       # 1
print(d.get("xxx"))     # None

# 修改
d["a"] = 100
print(d)                # {'a': 100, 'b': 2, 'c': 3}

# 新增
d["xx"] = 4
print(d)                # {'a': 100, 'b': 2, 'c': 3, 'xx': 4}
```

:::

:::details 字典生成式

```py
d = {"a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 6}

d2 = {k: v for k, v in d.items() if v % 2 == 0}

print(d2)   # {'b': 2, 'd': 4, 'f': 6}
```

:::

:::details 解包/拆包 ( unpacking )

```py
字典 = {"键1": 值1, "键2": 值2}

# 元素与接收变量个数一一对应
键1, 键2 = 字典

# 将键 key 拆分出来
*字典       # 键1, 键2

# 将键值对拆分为关键字参数形式
**字典      # 键1=值1, 键2=值2
```

:::details 例子：

```py
d = {"a": 1, "b": 2, "c": 3}    //[!code focus]

a, b, c = d         //[!code focus]
print(a, b, c)      # a b c

a, b = d            //[!code error]# ValueError: too many values to unpack (expected 2)
a, b, c = {"a": 1}  //[!code error]# ValueError: not enough values to unpack (expected 3, got 1)

a, *b = d           //[!code focus]
print(a)            # a
print(b)            # ['b', 'c']


print(*d)           //[!code focus]# a b c
print(dict(**d))    //[!code focus]# {"a": 1, "b": 2, "c": 3}


def func(a, b, c):  //[!code focus]
    print(a, b, c)  //[!code focus]


func(**d)           //[!code focus]# 1 2 3
# 等同于：
func(a=1, b=2, c=3) //[!code focus]# 1 2 3
```

:::

---

### NoneType

`None`空值的类型

```py
None
```

:::details `None`可以作为变量初始值、函数参数默认值

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

:::

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
print(str()) # ""
```

---

### chr()

将整数转换成该编码对应的字符串（一个字符）

可以指定编码

```py
print(ord("a"))     # 97
print(chr(97))      //[!code focus]# "a"

print(ord("あ"))    # 12354
print(chr(12354))   //[!code focus]# "あ"

print(ord("你"))    # 20320
print(chr(20320))   //[!code focus]# "你"
```

---

### ord()

将字符串（一个字符）转换成对应的编码（整数）

可以指定编码

```py
print(ord("a"))     //[!code focus]# 97
print(chr(97))      # "a"

print(ord("あ"))    //[!code focus]# 12354
print(chr(12354))   # "あ"

print(ord("你"))    //[!code focus]# 20320
print(chr(20320))   # "你"
```

---

### bool()

将数据转换为对应[布尔值](#bool)

```py{0}
print(bool())       # False

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

将一个可迭代对象转换为[列表](#list)

```py
print(list())                   # []
print(list((1, 2, 3)))          # [1, 2, 3]
print(list(range(1,4)))         # [1, 2, 3]

print(list("123"))              # ['1', '2', '3']
print(list({"a": 1, "b": 2}))   # ['a', 'b']
```

---

### tuple()

将一个可迭代对象转换为[元组](#tuple)

```py
print(tuple())                  # ()
print(tuple([1, 2, 3]))         # (1, 2, 3)
print(tuple(range(1, 4)))       # (1, 2, 3)

print(tuple("123"))             # ('1', '2', '3')
print(tuple({"a": 1, "b": 2}))  # ('a', 'b')

```

---

### dict()

将关键字参数转换为[字典](#dict)

```py
print(dict())           # {}
print(dict(a=1))        # {"a": 1}
print(dict(a=1, b=2))   # {"a": 1, "b": 2}


d = {"a": 1, "b": 2}
print(dict(**d))        # {"a": 1, "b": 2}
```
