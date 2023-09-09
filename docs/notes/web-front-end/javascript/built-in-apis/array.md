# JS Array

https://mp.weixin.qq.com/s/rexo9j0h2DfxA_SaBJwjMg

https://www.xiaohongshu.com/explore/64b7908e000000001e01ae69

## 常用方法

### new Array()

```js
new Array(3);
// [empty × 3]

[...new Array(3)];
// [undefined, undefined, undefined]

const array = [...new Array(3)].map(() => "xxx");
// ["xxx", "xxx", "xxx"]
```

---

### split()

---

### reduce()

https://www.xiaohongshu.com/explore/64a4d756000000002f02b10e

---

### splice()

> 会修改原数组

- 剔除
- 修改 / 替换
- 截取 ( 剔除/修改/替换出的返回值 )

```js
// 剔除
数组.splice(开始下标, 个数);
// 替换
数组.splice(下标, 个数, 新元素);
// 截取 ( 剔除出的返回值 )
const 被剔除元素组成的数组 = 数组.splice(开始下标, 个数);
const 被替换元素组成的数组 = 数组.splice(开始下标, 个数, 新元素);
```

::: details 例子

```js
const list = [
  { id: 11, name: "A" },
  { id: 22, name: "B" },
  { id: 33, name: "C" },
  { id: 44, name: "D" },
];
```

::: code-group

```js [剔除]
// 删除 id 为 22 的对象

const newList = [...list];
const index = list.findIndex((item) => item.id === 22);
newList.splice(index, 1);

console.log(newList);
// [
//     { id: 11, name: 'A' },
//     { id: 33, name: 'C' }
// ]
```

:::

---

### slice()

---

### find()

```ts
const 目标元素 = 数组.find((数组元素) => /* 查找条件 */);
```

::: details 例子：

```js{0}
const list = [
  { id: 11, name: "A" },
  { id: 22, name: "B" },
  { id: 33, name: "C" },
];

const find = (key, value) => {
  list.find((item) => item[key] === value);
};

console.log(find("id", 11));      // { id: 11, name: 'A' }
console.log(find("id", 22));      // { id: 22, name: 'B' }
console.log(find("name", "A"));   // { id: 11, name: 'A' }
console.log(find("id", 9999));    // undefined
console.log(find("name", "xxx")); // undefined
```

:::

---

### findIndex()

---

### indexOf()

---

### map()

> 不修改原数组，而是返回修改后的新数组

修改数组

若指定不回调函数的返回值，则返回的新数组中该元素为`undefined`

```js
const 新数组 = 数组.map(数组元素 => /* 基于原数组元素的心元素 */);
```

::: details 例子

```js
const list = [
  { id: 11, name: "A" },
  { id: 22, name: "B" },
  { id: 33, name: "C" },
];

// 更新 id 为 22 的对象的 name 为 xxx
const newList = list.map((item) => {
  if (item.id == 22)
    return {
      ...item,
      name: "xxx",
    };
  return item;
});

console.log(newList);
// [
//     { id: 11, name: 'A' },
//     { id: 22, name: 'xxx' },
//     { id: 33, name: 'C' }
// ]
```

:::

---

### filter()

> 不修改原数组，而是返回修改后的新数组

过滤数组

## 常见例子

### 对象数组操作

::: details 替换 / 修改 / 更新

- [`map()`](#map)
- [`splice()`](#splice)

```js
const list = [
  { id: 11, name: "A" },
  { id: 22, name: "B" },
  { id: 33, name: "C" },
];

// 更新 id 为 22 的对象的 name 为 xxx
```

::: code-group

```js [方法一]
const newList = list.map((item) => {
  if (item.id === 22)
    return {
      ...item,
      name: "xxx",
    };
  else return item;
});

console.log(newList);
// [
//     { id: 11, name: 'A' },
//     { id: 22, name: 'xxx' },
//     { id: 33, name: 'C' }
// ]
```

```js [方法二]
const newList = [...list]; // splice 会修改原数组
const index = list.findIndex((item) => item.id === 22);
const target = list.find((item) => item.id === 22);

newList.splice(index, 1, {
  ...target,
  name: "xxx",
});

console.log(newList);
// [
//     { id: 11, name: 'A' },
//     { id: 22, name: 'xxx' },
//     { id: 33, name: 'C' }
// ]
```

:::
