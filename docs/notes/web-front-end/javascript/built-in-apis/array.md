# JS Array

https://mp.weixin.qq.com/s/rexo9j0h2DfxA_SaBJwjMg

https://www.xiaohongshu.com/explore/64b7908e000000001e01ae69

## 常用方法

### new Array()

创建一个数组

```js
const 数组 = new Array(元素个数);
```

::: details 例子：

```js{0}
new Array(3);                       // [empty × 3]
[...new Array(3)];                  // [undefined, undefined, undefined]
[...new Array(3)].map(() => "xxx"); // ["xxx", "xxx", "xxx"]

new Array("xxx");                   // ["xxx"]
new Array(1, 2, 3);                 // [1, 2, 3]
```

:::

::: tip
更建议使用`[]`创建数组，来提高效率
:::

---

### at()

---

### split()

---

### reduce()

https://www.xiaohongshu.com/explore/64a4d756000000002f02b10e

---

### splice()

> 会修改原数组

- 剔除
- 替换/修改
- 截取 ( 剔除/修改/替换 的返回值 )

::: code-group

```js [剔除]
// 修改原数组，从中剔除元素
数组.splice(开始下标, 个数);
```

```js [替换]
// 修改原数组，从中替换元素
数组.splice(下标, 个数, 新元素);
```

```js [截取]
// 返回值为所有被剔除元素
const 数组 = 数组.splice(开始下标, 个数);
// 返回值为所有被替换元素
const 数组 = 数组.splice(开始下标, 个数, 新元素);
```

:::

::: details 例子

```js
const list = [
  { id: 11, name: "A" },
  { id: 22, name: "B" },
  { id: 33, name: "C" },
];
```

::: code-group

```js [剔除]
// 删除 id 为 22 的对象

const index = list.findIndex((item) => item.id === 22);
list.splice(index, 1);

console.log(list);
/*
[
  { id: 11, name: "A" },
  { id: 33, name: "C" },
];
*/
```

```js [替换]
// 替换 id 为 22 的对象为字符串 xxx

const index = list.findIndex((item) => item.id === 22);
list.splice(index, 1, "xxx");

console.log(list);
/*
[
  { id: 11, name: "A" },
  "xxx",
  { id: 33, name: "C" },
];
*/
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
