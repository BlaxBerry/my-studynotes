# TS 高级类型

https://www.tslang.cn/docs/handbook/advanced-types.html

https://vue3js.cn/interview/typescript/high%20type.html#%E4%BA%8C%E3%80%81%E6%9C%89%E5%93%AA%E4%BA%9B

https://mp.weixin.qq.com/s/KDE8B0ylT4OpdqoVymisFA

## 联合类型

联合类型 ( Union Types ) 是通过`|`连接多个类型后返回一个新类型

返回的类型只要符合了连接的多个类型中任意一个即可

```ts
type 自定义类型名 = 类型A | 类型B | 类型C;
```

::: warning `any`、`unknown`

- 任何类型联合`any`类型后都为`any`
- 任何类型联合`unknown`类型后都为`unknown`

```ts
type T = 任何类型 | any; // any
type T = 任何类型 | unknown; // unknown
```

:::

```ts
const arrA = ["a", "b", "c"];
type itemA = (typeof arrA)[number]; // string

const arrB = ["a", "b", "c"] as const;
type itemB = (typeof arrB)[number]; // "a" | "b" | "c"
```

## 交叉类型

交叉类型 ( Intersection Types ) 是通过`&`连接多个类型后返回一个新类型

返回的类型必须同时符合连接的多个类型

```ts
type 自定义类型名 = 类型A & 类型B & 类型B;
```

::: warning `any`、`null`、`undefined`

任何类型交叉`any`、`null`、`undefined`类型后都为`never`

```ts
type T1 = 任何类型 & any; // never
type T2 = 任何类型 & null; // never
type T3 = 任何类型 & undefined; // never
```

:::

::: warning 交叉多个无相同成员的联合类型

始终返回`never`

```ts
type A = 1 | 2;
type B = "A" | "B";

type T = A & B; // never
```

:::

## 索引访问类型

索引签名参数类型不能为文本类型或泛型类型，请考虑改用映射的对象类型

```ts
type MyType = {
  [key in "a" | "b" | "c"]: boolean;
};
```

https://mp.weixin.qq.com/s/KDE8B0ylT4OpdqoVymisFA

索引访问类型 ( Indexed Access Types ) 用于获取对象、数组、元组类型中指定成员的类型

按需会结合`keyof`、`typeof`一同使用

::: code-group

```ts [对象类型]
// 通过字面量获取指定属性值的类型
const 自定义类型名 = 对象类型["属性名"];
const 自定义类型名 = 对象类型["属性名" | "属性名"];

// 通过 keyof 获取所有属性值的类型 ( 返回一个联合类型 )
const 自定义类型名 = 对象类型[keyof 该对象类型];
```

```ts [数组类型]
// 一个指定元素的类型
const 自定义类型名 = 数组类型[元素下标];

// 多个指定元素的类型
const 自定义类型名 = 数组类型[元素下标 | 元素下标];
```

```ts [元组类型]
// 一个指定元素的类型
const 自定义类型名 = 元组类型[元素下标];

// 多个指定元素的类型
const 自定义类型名 = 元组类型[元素下标 | 元素下标];
```

:::

::: details 例子：

::: code-group

```ts{3-6} [对象类型]
type MyObj = { a: string; b: number };

type A = MyObj["a"];
type B = MyObj["b"];
type K = MyObj["a" | "b"];
type KK = MyObj[keyof MyObj];

// 等价于：
// type A = string;
// type B = number;
// type K = string | number;
// type KK = string | number;
```

```ts{5-8} [数组类型]
const array = [1, 2, "3", "4"];

type MyArray = typeof array;

type A = MyArray[0];
type B = MyArray[2];
type C = MyArray[0 | 1 | 2];
type D = MyArray[999];

// 等价于：
// type A = string | number;
// type B = string | number;
// type C = string | number;
// type D = string | number;
```

```ts{3-6} [元组类型]
type MyTuple = [1, '2', number, string, null];

type A = MyTuple[0];
type B = MyTuple[1];
type C = MyTuple[2];
type D = MyTuple[2 | 3 | 4];

// 等价于：
// type A = 1;
// type B = "2";
// type C = number;
// type D =string | number | null;
```

:::

## 映射类型

https://segmentfault.com/a/1190000041715281

映射类型 ( Mapped Types ) 是指基于某个类型派生创建一个新类型，多用于复杂类型的复用

按需会结合[类型操作](./types-manipulation.md)中所有语法以及对象类型中[属性修饰符](./ts-object.md#属性修饰符)

::: details 自定义映射类型

> 如下：一些自定义工具类

```ts
type ValueOf<T> = T[keyof T];
// type V = ValueOf<typeof { a: 1, b: '2' }>;
// 等价于：type V = number | string;

type NullAble<T> = T | null;
// type T = NullAble<number | string>;
// 等价于：type T = string | number | null

type NullAbleValue<T> = {
  [K in keyof T]: T[K] | null;
};
// type A = NullAbleValue<{ a: string; b: number }>;
// 等价于：type A = { a: string | null; b: number | null};
```

:::

::: details 内置工具类型

详见 [内置工具类型 ( Utility Types )](./utility-types.html)

:::

## 条件类型

https://mp.weixin.qq.com/s/KDE8B0ylT4OpdqoVymisFA

条件类型 ( Conditional Type )

类似 JS 的三元运算符号，使用`extends`关键字来约束类型

https://www.typescriptlang.org/docs/handbook/2/conditional-types.html

```ts
type 自定义类型名 = T extends P ？A : B
```

::: details 例子：

`NonNullable`的条件类型取一个类型`<T>`并检查它是否扩展了`null`或`undefined`，如果扩展了则结果类型为`never`否则为类型`<T>`

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```

:::
