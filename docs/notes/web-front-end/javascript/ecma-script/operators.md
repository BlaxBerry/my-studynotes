# JS 运算符

```js
var a = null;
var b;
a == b; // true
a == null; // true
b == null; // true
a == false; // false
b == false; // false
a == ""; // false
b == ""; // false
a == 0; // false
b == 0; // false
```

### 空值判断 ( ?? )

> null 判断运算符( Nullish Coalescing Operator )

仅在运算符左侧为`null`、`undefined`时才返回右侧内容

除此以外直接返回左侧内容

```ts
null ?? "xxx"; // "xxx"
undefined ?? "xxx"; // "xxx"
```

> 如下：

```ts
0 ?? "xxx"; // 0
false ?? "xxx"; // false
```

### 链判断 ( ?. )

> 链判断运算符（ Optional Chaining Operator ）

> 如下：

::: code-group

```js [数组元素]
a?.[x];

// 等同于
a == null ? undefined : a[x];
```

```js [对象属性]
a?.b;

// 等同于
a == null ? undefined : a.b;
```

```js [对象方法]
a?.b();

// 等同于
a == null ? undefined : a.b();
```

```js [函数]
a?.();

// 等同于
a == null ? undefined : a();
```

:::

::: tip 逻辑短路

`?.`运算符本质上相当于一种短路机制，即只要不满足条件就不再往下执行

```js
a?.[++x];

// 等同于
a == null ? undefined : a[++x];
```

:::

::: details 不能用于构造函数

```js
new a?.(); // [!code error] // 报错
new a?.b(); // [!code error] // 报错
```

:::

::: details 不能用于模板字符串

```js
a?.`{b}`; // [!code error] // 报错
a?.b`{c}`; // [!code error] // 报错
```

:::

::: details 不能用于`super`

```js
super?.(); // [!code error] // 报错
super?.foo; // [!code error] // 报错
```

:::

::: details 不能用于赋值运算

```js
a?.b = c; // [!code error] // 报错
```

:::

## 展开 ( ... )

> 展开语法 ( Spread Syntax )

展开数组、对象、字符串

```js
const 对象 = {
  ...对象,
  ...(条件 ? {} : {}),
};
```
