# Python String 常用方法

## 大小写、格式化、去空白

### upper()

字符串所有字母转为大写

返回一个新字符串，不影响原字符串

```py
s = "abcd"

s1 = s.upper()

print(s1)   # "ABCD"
print(s)    # "abcd"
```

---

### lower()

字符串所有字母转为小写

返回一个新字符串，不影响原字符串

```py
s = "ABCD"

s1 = s.upper()

print(s1)   # "abcd"
print(s)    # "ABCD"
```

---

### capitalize()

字符串首字母转为大写

返回一个新字符串，不影响原字符串

```py
s = "abcd, efg"

s1 = s.capitalize()

print(s1)   # "Abcd, efg"
print(s)    # "abcd, efg"
```

---

### title()

字符串中每个单词首字母转为大写

返回一个新字符串，不影响原字符串

```py
s = "abcd, efg"

s1 = s.title()

print(s1)   # "Abcd, Efg"
print(s)    # "abcd, efg"
```

---

### center()

---

### ljust()

---

### rjust()

---

### zfill()

---

### strip()

去除字符串左右两侧空白字符

返回一个新字符串，不影响原字符串

```py
s = "  xxx  "

s1 = s.strip()

print(s1)   # "xxx"
print(s)    # "  xxx  "
```

---

### lstrip()

去除字符串左侧空白字符

返回一个新字符串，不影响原字符串

```py
s = "  xxx  "

s1 = s.lstrip()

print(s1)   # "xxx  "
print(s)    # "  xxx  "
```

---

### rstrip()

去除字符串右侧空白字符

返回一个新字符串，不影响原字符串

```py
s = "  xxx  "

s1 = s.rstrip()

print(s1)   # "  xxx"
print(s)    # "  xxx  "
```

## 编码、解码

### encode()

返回一个新字符串，不影响原字符串

```py
s = "你好"

print(s.encode())           # b'\xe4\xbd\xa0\xe5\xa5\xbd'
print(s.encode("utf-8"))    # b'\xe4\xbd\xa0\xe5\xa5\xbd'
print(s.encode("gbk"))      # b'\xc4\xe3\xba\xc3'
```

---

### decode()

编码和解码的方式不一致，会导致乱码问题或引发 UnicodeDecodeError

返回一个新字符串，不影响原字符串

```py
s = "你好"

a = s.encode()
b = s.encode("utf-8")
c = s.encode("gbk")

print(a.decode())         # "你好"
print(b.decode("utf-8"))  # "你好"
print(c.decode("gbk"))    # "你好"

print(c.decode())         //[!code error]# UnicodeDecodeError: 'utf-8' codec can't decode byte 0xc4 in position 0: invalid continuation byte
```

## 拆分、合并

### split()

将字符串按指定间隔字符拆分为一个字符串列表，默认间隔字符为空格

返回一个列表，不影响原字符串

```py
字符串列表 = 字符串.split()
字符串列表 = 字符串.split(" ")
字符串列表 = 字符串.split("间隔字符")
```

```py
s1 = "1 2 3 4"

print(s1.split())     # ['1', '2', '3', '4']

s2 = "1xx2xx3"

print(s2.split())     # ['1xx2xx3']
print(s2.split("xx")) # ['1', '2', '3']
print(s2.split("2"))  # ['1xx', 'xx3']
```

---

### join()

用指定字符将字符串列表中的所有元素间隔转换为一个字符串

返回一个新字符串，不影响原字符串

```py
字符串列表 = ["字符串", "字符串"]
字符串 = "间隔字符".join(字符串列表)  //[!code focus]
```

```py
l = ["1", "2", "3"]

print(",".join(l))   # "1,2,3"
print("---".join(l)) # "1---2---3"
print("".join(l))    # "123"

print(l)             # ["1", "2", "3"]
```

## 替换

### replace()

返回一个新字符串，不影响原字符串

```py
# 替换全部
字符串 = 字符串.replace("目标字符串", "新字符串")

# 从左到右替换指定次数
字符串 = 字符串.replace("目标字符串", "新字符串", 替换次数)
```

```py
s = "abc123abc"

print(s.replace("abc", "xxx"))      # xxx123xxx
print(s.replace("abc", "xxx", 1))   # xxx123abc
```
