# Python 静态类型

## 简介

Python 是个动态类型语言 ( dynamic Typing )

但是也支持静态类型 ( Static Typing )

## 类型注解

### 变量、类中成员

> 设计文档: [PEP-526](https://peps.python.org/pep-0526/)

使用冒号`:`加类型名

```py
变量名: 类型 = 值

class 类名:
    属性: 类型
```

:::details 例子：

```py
# 变量
name: str = "python"
version: float = 3.10

# 类中成员
class Person:
    name: str
    age: int
    pass
```

:::

---

### 函数

> 设计文档: [PEP-3107](https://peps.python.org/pep-3107/)

- 函数参数：使用冒号`:`加类型名
- 函数返回值：使用箭头`->`加类型名

```py
def 函数名(参数: 参数类型) -> 返回值类型:
    return 返回值
```

:::details 例子：

```py
# 函数参数
def greet(name: str):
    pass

# 函数返回值
def getBoolean() -> bool:
    return True
```

:::

## 复合类型

### typing 模块

内置模块，可从中导入更多结构更复杂的类型

```py
from typing import (
    Union,
    Literal,
    Optional,
    Tuple,
    TypedDict,
    Callable
)
```

---

### dataclasses 模块

> 规划文档: [PEP-557](https://peps.python.org/pep-0557/)

dataclasses 模块极大简化了定义新数据类型的代码

```py
from dataclasses import dataclass

@dataclass
class Point2D:
    x: int = 1
    y: int = 1


# 等价的传统 class 写法
class Point2D:
    def __init__(self, x=1, y=1):
        self.x = x
        self.y = y
```

使用`@dataclass`后，数据类型定义从过程式简化为声明式-代码中描述 class 名，字段名，字段类型即可，无须写冗长的 **init**函数，也无须重复写 `self.<attr> = <attr_value>`

## 静态类型检查

https://zhuanlan.zhihu.com/p/391135016

可使用静态类型检查器： mypy

```shell
source .venv/bin/active
pip install mypy // [!code focus]
```

把 mypy 执行配置到 git hook 或者 CI job 中
