# Python 流程控制

Python 不同于 C++、Java 等编程语言，不使用花括号来构造代码块，而是使用了缩进的方式来表示代码的层次结构

## 分支

### if...

```py
if 条件:
    # ...
```

---

### if...else...

```py
if 条件:
    # ...
else:
    # ...
```

---

### if...elif...

```py
if 条件:
    # ...
elif 条件:
    # ...
```

---

### if...elif...else...

```py
if 条件:
    # ...
elif 条件:
    # ...
else:
    # ...
```

:::details 例子：判断输入值所属范围

> 根据输入的小数值划分成绩所属范围

```py
score = float(input("请输入成绩: "))

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
elif score >= 60:
    print("D")
else:
    print("把你家长叫来")
```

:::

## 循环

### for...in...

```py
for 变量 in 可迭代对象:
    # ...
```

---

### for...in...else...

```py
for 变量 in 可迭代对象:
    # ...
else:
    # ...
```

:::details 例子：打印九九乘法表

```py
for x in range(1, 10):
    for y in range(1, x + 1):
        print(f"{x}*{y}={x * y}", end="\t")
    print()

"""
1*1=1
2*1=2   2*2=4
3*1=3   3*2=6   3*3=9
4*1=4   4*2=8   4*3=12  4*4=16
5*1=5   5*2=10  5*3=15  5*4=20  5*5=25
6*1=6   6*2=12  6*3=18  6*4=24  6*5=30  6*6=36
7*1=7   7*2=14  7*3=21  7*4=28  7*5=35  7*6=42  7*7=49
8*1=8   8*2=16  8*3=24  8*4=32  8*5=40  8*6=48  8*7=56  8*8=64
9*1=9   9*2=18  9*3=27  9*4=36  9*5=45  9*6=54  9*7=63  9*8=72  9*9=81
"""
```

:::

:::details 例子：斐波那契数列

> 生成一个长度为 10 的斐波那契数列

```py
l = []


def getFib():
    a, b = 0, 1

    for _ in range(10):
        a, b = b, a + b
        l.append(a)


getFib()
print(l)    # [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

:::

---

### while...

:::details 例子：猜数字

> 猜测 1 ～ 5 内一个随机整数，直至猜对为止否则提示继续

```py
from random import randint


num = randint(1, 5)

while True:
    input_num = int(input("请猜测："))

    if input_num == num:
        print("猜对了！")
        break

```

:::

---

### break 关键字

用于提前结束当前的循环

---

### continue 关键字

用于放弃本次循环后续的代码直接进入下一轮循环
