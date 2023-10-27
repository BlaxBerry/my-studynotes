# Python List

## 增加、插入

---

### append()

在列表尾部添加元素

```py
items = ['Python', 'Java', 'Go', 'Kotlin']

items.append('Swift')
print(items)    # ['Python', 'Java', 'Go', 'Kotlin', 'Swift']
```

---

### insert()

使用 insert 方法在列表指定索引位置插入元素

```py
items = ['Python', 'Java', 'Go', 'Kotlin']

items.insert(2, 'SQL')
print(items)    # ['Python', 'Java', 'SQL', 'Go', 'Kotlin', 'Swift']
```

## 删除、清空

---

### pop()

删除指定索引位置的元素

```py
items = ["Python", "Java", "Go", "Kotlin"]

print(items.pop(0))                 # "Python"
print(items.pop(len(items) - 1))    # "Kotlin"

print(items)  # ['SQL', 'Go', 'Kotlin']

```

---

### del 关键字

跟使用 pop 方法指定索引删除元素没有实质性的区别，但后者会返回删除的元素

```py
items = ['Python', 'Java', 'Go', 'Kotlin']

del items[1]
print(items)    # ['Python', 'Go', 'Kotlin']
```

---

### clear()

清空列表中的元素

```py
items = ['Python', 'Java', 'Go', 'Kotlin']

items.clear()
print(items)    # []
```

---

### remove()

删除指定的元素

```py
items = ['Python', 'Java', 'Go', 'Kotlin']

items.remove('Java')
print(items)    # ['Python', 'SQL', 'Go', 'Kotlin', 'Swift']
```

如果要删除的元素并不在列表中，会引发 ValueError 异常

## 元素位置、出现次数

### index()

查找元素的索引位置

```py
items = ['Python', 'Java', 'Java', 'Go', 'Kotlin', 'Python']

print(items.index('Python'))       # 0
print(items.index('Python', 2))    # 5

# 注意：虽然列表中有'Java'，但是从索引为3这个位置开始后面是没有'Java'的
print(items.index('Java', 3))      # ValueError: 'Java' is not in list
```

---

### counts()

查找元素出现的次数

```py
items = ['Python', 'Java', 'Java', 'Go', 'Kotlin', 'Python']

print(items.count('Python'))    # 2
print(items.count('Go'))        # 1
print(items.count('Swfit'))     # 0
```

## 排序、反转

### sort()

排序

```py
items = ['Python', 'Java', 'Go', 'Kotlin', 'Python']

items.sort()
print(items)    # ['Go', 'Java', 'Kotlin', 'Python', 'Python']
```

---

### reverse()

反转

```py
items = ['Python', 'Java', 'Go', 'Kotlin', 'Python']

items.reverse()
print(items)    # ['Python', 'Python', 'Kotlin', 'Java', 'Go']
```
