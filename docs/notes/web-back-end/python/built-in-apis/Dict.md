# Python Dict 常用方法

## 查询

---

### get()

查询字典中指定键的值

不同于索引查询，查询的键不存在时`get()`不报错而是返回`None`

```py
值 = 字典.get(键名)
值 = 字典.get(键名, 不存在时的默认值)
```

```py
d = {"a": 1, "b": 2, "c": 3}


print(d.get("a"))         # 1
print(d.get("xxx"))       # None
print(d.get("xxx", 999))  # 999
```

:::details 例子：计算字符串中各个字符的出现次数

利用字典与字典`get()`方法设置的默认值

```py
s = "aabbxxxaabbxxx"

d = {}

for c in s:
    d[c] = d.get(c, 0) + 1  //[!code hl]


print(d)    # {'a': 4, 'b': 4, 'x': 6}
```

:::

---

### keys()

查询字典中所有的键

```py
d = {"a": 1, "b": 2, "c": 3}

ks = d.keys()

print(ks)       # dict_keys(['a', 'b', 'c'])
print(type(ks)) # <class 'dict_keys'>
print(*ks)      # a b c
```

---

### values()

获取字典中所有的值

```py
d = {"a": 1, "b": 2, "c": 3}

vs = d.values()

print(vs)       # dict_values([1, 2, 3])
print(type(vs)) # <class 'dict_values'>
print(*vs)      # 1 2 3
```

---

### items()

获取字典中所有的键值对

```py
d = {"a": 1, "b": 2, "c": 3}

kvs = d.items()

print(kvs)        # dict_values([1, 2, 3])
print(type(kvs))  # <class 'dict_values'>
print(*kvs)       # 1 2 3
```

```py
d = {"a": 1, "b": 2, "c": 3}


for k, v in d.items():
    print(f"{k}: {v}")

# a: 1
# b: 2
# c: 3
```

## 删除

### pop()

```py
# 使用pop方法通过键删除对应的键值对并返回该值
stu1 = students.pop(1002)
print(stu1)             # {'name': '白元芳', 'sex': True, 'age': 23, 'place': '河北保定'}
print(len(students))    # 2
# stu2 = students.pop(1005)    # KeyError: 1005
stu2 = students.pop(1005, {})
print(stu2)             # {}
```

---

### del 关键字

---

### popitem()

### setdefault()

```py
# 如果这个键在字典中存在，setdefault返回原来与这个键对应的值
# 如果这个键在字典中不存在，向字典中添加键值对，返回第二个参数的值，默认为None
result = students.setdefault(1005, {'name': '方启鹤', 'sex': True})
print(result)        # {'name': '方启鹤', 'sex': True}
print(students)      # {1001: {...}, 1005: {...}}
```

---

### update()

```py
# 使用update更新字典元素，相同的键会用新值覆盖掉旧值，不同的键会添加到字典中
others = {
    1005: {'name': '乔峰', 'sex': True, 'age': 32, 'place': '北京大兴'},
    1010: {'name': '王语嫣', 'sex': False, 'age': 19},
    1008: {'name': '钟灵', 'sex': False}
}
students.update(others)
print(students)      # {1001: {...}, 1005: {...}, 1010: {...}, 1008: {...}}
```
