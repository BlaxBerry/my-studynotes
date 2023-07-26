# TS 字面量类型

## 简介

TypeScript 中字面量不仅可以表示值，还可以表示类型

::: tip TS 中的字面量类型

- [字符串字面量类型](#字符串字面量类型)
- [数字字面量类型](#数字字面量类型)
- [布尔字面量类型](#布尔字面量类型)
- [模板字面量类型](#模板字面量类型)

:::

## 字符串字面量类型

字符串字面量类型即为一个具体的字符串

::: code-group

```ts [写法一]
type 自定义类型名 = "字符串";

let 变量: 自定义类型名;
```

```ts [写法二]
let 变量: "字符串";
```

:::

::: details 例：定义单个字面量类型

```ts
let data: "XXX";

data = "XXX";
data = "hello"; // [!code error]
data = 123; // [!code error]
```

:::

::: details 例：将多个字面量类型组合成一个联合类型

```ts
type MyType = "A" | "B" | "C";
let data: MyType;

data = "A";
data = "B";
data = "C";
data = "XXX"; // [!code error]
```

:::

::: tip 内置字符串操作工具类型 ( Intrinsic String Manipulation Types )

- [Uppercase\<StringType>](./utility-types.md#uppercase-string)
- [Lowercase\<StringType>](./utility-types.md#lowercase-string)
- [Capitalize\<StringType>](./utility-types.md#capitalize-string)
- [Uncapitalize\<StringType>](./utility-types.md#uncapitalize-string)

:::

## 数字字面量类型

数字字面量类型即为一个具体的数值

::: code-group

```ts [写法一]
type 自定义类型名 = 具体数值;

let 变量: 自定义类型名;
```

```ts [写法二]
let 变量: 具体数值;
```

:::

::: details 例：将多个字面量类型组合成一个联合类型

```ts
type MyType = 1 | 2 | 3;
let data: MyType;

data = 1;
data = 2;
data = 3;
data = "XXX"; // [!code error]
```

:::

## 布尔字面量类型

布尔字面量类型即为具体的布尔值`true`或`false`

::: code-group

```ts [写法一]
type 自定义类型名 = 具体的布尔值;

let 变量: 自定义类型名;
```

```ts [写法二]
let 变量: 具体的布尔值;
```

:::

::: details 例：联合类型`true｜false`与基础类型`boolean`

二者是等同的

```ts
let a: boolean = true;
let b = true;
let c = false;

b = a;
a = c;
```

:::

## 模板字面量类型

相当于 JavaScript 的模版字面量

```ts
type 自定义类型名 = `字符串字面量${类型}字符串字面量`;
```

::: details 例子：

```ts
type Position = "top" | "bottom" | "left" | "right";

type CSSPadding = `padding-${Position}`;
type CSSMargin = `margin-${Position}`;

let padding: CSSPadding;
let margin: CSSMargin;

padding = "padding-top";
padding = "padding-bottom";
padding = "padding-left";
padding = "padding-right";
margin = "margin-top";
margin = "margin-bottom";
margin = "margin-left";
margin = "margin-right";
```

:::

::: details 例子：

```ts
const left = "left";
const right = "right";

type CSSPaddingLeft = `padding-${typeof left}`;
type CSSPaddingRight = `padding-${typeof right}`;

let paddingLeft: CSSPaddingLeft = "padding-left";
let paddingRight: CSSPaddingRight = "padding-right";
```

:::

::: warning 能插入的类型仅限：

`string`、`number`、`bigint`、`boolean`、`null`、`undefined`、这些类型的联合类型

```ts{0}
type T1 = `__${null}__`; // "__null__"
type T2 = `__${undefined}__`; // "__undefined__"
type T3 = `__${string}__`; // `__${string}__`
type T4 = `__${number}__`; // `__${number}__`
type T5 = `__${boolean}__`; // "__false__" | "__true__"
type T6 = `__${bigint}__`; // `__${bigint}__`
type T7 = `__${any} __`; // `__${any} __`
type T8 = `__${never} __`; // never
type T9 = `__${null | undefined | string | number | boolean | bigint}__`; // `__${string}__` | `__${number}__` | `__${bigint}__`

type T10 = `__${unknown} __`; // [!code error]
type T11 = `__${symbol} __`; // [!code error]
type T12 = `__${any[]} `; // [!code error]
type T13 = `__${object} __`; // [!code error]
type T14 = `__${{}} __`; // [!code error]
```

:::
