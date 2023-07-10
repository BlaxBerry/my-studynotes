# TS 实用工具类型 ( Utility Types )

## 简介

TypeScript 内置提供了很多全局的实用程序类型，可以方便地处理一些常见的类型转换

实用工具类型需通过 [泛型](generic.md) 接收某类型对其处理后作为一个新类型返回

https://www.typescriptlang.org/docs/handbook/utility-types.html

## Record<K, V>

返回一个对象类型，其属性类型为接收的`<K>`其属性值类型为接收的`<V>`

可用于将一个类型上的属性映射到另一个类型并指定新的值类型

::: code-group

```ts [使用]
type 自定义类型名 = Record<属性的类型｜"属性名", 值的类型>;

// 等价于
/*
type 自定义类型名 = {
  属性的类型作为属性名: 值的类型;
  属性名: 值的类型;
};
*/
```

```ts [TS类型<Badge>完整版</Badge>]
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

:::

::: details 例子：

::: code-group

```ts [例一 <Badge>字面量+联合类型</Badge>]
type T = Record<"a" | "b", string | number>;

// 等价于：
/*
type T = {
  a: string | number;
  b: string | number;
};
*/
```

```ts [例三 <Badge>类型别名</Badge>]
type DataKeys = "a" | "b";
type DataValues = string | number;

type T = Record<DataKeys, DataValues>;

// 等价于：
/*
type T = {
  a: string | number;
  b: string | number;
};
*/
```

```ts [例三 <Badge>复杂对象类型</Badge>]
const data = {
  a: 1,
  b: "2",
};

type Data = typeof data;
type DataKeys = keyof Data;
type DataValues = Data[DataKeys];

type T = Record<DataKeys | "c" | "d", DataValues | null>;

// 等价于：
/*
type T = {
  a: DataValues | null;
  b: DataValues | null;
  c: DataValues | null;
  d: DataValues | null;
};
*/
```

:::

## Partial\<T>

返回一个对象类型，将接收的`<T>`对象类型中的所有属性变为**可选**

[`Required<T>`](#required-t)的反义

::: code-group

```ts{1-4} [使用]
type 自定义类型名 = Partial<{
  属性A: 类型;
  属性B: 类型A | 类型B;
}>;

// 等价于：
/*
type 自定义类型名 = {
  属性A?: 类型 | undefined;
  属性B?: 类型A | 类型B | undefined;
};
*/
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

:::

## Required\<T>

返回一个对象类型，将接收的`<T>`对象类型中的所有属性变为**必须**

[`Partial<T>`](#partial-t)的反义

::: code-group

```ts{1-4} [使用]
type 自定义类型名 = {
  属性A?: 类型 | undefined;
  属性B?: 类型A | 类型B | undefined;
};

// 等价于：
/*
type 自定义类型名 = Partial<{
  属性A: 类型;
  属性B: 类型A | 类型B;
}>;
*/
/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

:::

## Readonly\<T>

返回一个对象类型，将接收的`<T>`类型中的所有属性变为**仅可读**

::: code-group

```ts [使用]
type 自定义类型名 = Readonly<{
  属性A: 类型;
  属性B: 类型;
}>;

// 等价于
/*
type 自定义类型名 = {
  readonly 属性A: 类型;
  readonly 属性B: 类型;
}
*/
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

:::

## Pick\<T, K>

返回一个对象类型，从接收的`<T>`对象类型中**选取一个 / 一组属性**

[`Omit<T, K>`](#omit-t-k)的反义

::: code-group

```ts [使用]
type 自定义类型名 = Pick<
  {
    属性A: 类型;
    属性B: 类型;
    属性C: 类型;
  },
  "属性A" | "属性B"
>;

// 等价于
/*
type 自定义类型名 = {
  属性A: 类型;
  属性B: 类型;
};
*/
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

:::

## Omit\<T, K>

返回一个对象类型，从接收的`<T>`对象类型中**剔除一个 / 一组属性**

[`Pick<T, K>`](#pick-t-k)的反义

::: code-group

```ts [使用]
type 自定义类型名 = Omit<
  {
    属性A: 类型;
    属性B: 类型;
    属性C: 类型;
  },
  "属性A" | "属性B"
>;

// 等价于
/*
type 自定义类型名 = {
  属性C: 类型;
};
*/
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

:::

## Exclude\<Union, T>

从`<Union>`接收的 **[联合类型](../common-types/advanced-types.md#联合类型) 中剔除一个 / 一组成员**`<T>`后作为一个新类型返回

::: code-group

```ts [剔除部分的成员]
type 自定义类型名 = Exclude<类型A | 类型B | 类型C | 类型D, 类型A | 类型B>;

// 等价于：（返回剩余的）
// type 自定义类型名 = 类型C | 类型D;
type 自定义类型名 = Exclude<类型A | 类型B, 类型C | 类型D>;

// 等价于：（返回原本的联合类型）
// type 自定义类型名 = 类型A | 类型B;
type 自定义类型名 = Exclude<类型A | 类型B, 类型A | 类型B>;

// 等价于：（返回 never）
// type 自定义类型名 = never;
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

:::

::: details 例子：

```ts{3-5}
type Union = "1" | "2" | "3";

type A = Exclude<Union, "1">;
type B = Exclude<Union, "888" | "999">;
type B = Exclude<Union, "1" | "2" | "3">;

// 等价于：
// type A = "2" | "3";
// type B = "1" | "2" | "3";
// type C = never;
```

:::

## Extract\<Union, T>

从`<Union>`接收的 **[联合类型](../common-types/advanced-types.md#联合类型) 中获取一个 / 一组成员**`<T>`后作为一个新类型返回

::: code-group

```ts [获取部分成员]
type 自定义类型名 = Extract<类型A | 类型B | 类型C, 类型A | 类型B>;

// 等价于：（仅返回要获取的）
// type 自定义类型名 = 类型A | 类型B;
type 自定义类型名 = Extract<类型A | 类型B, 类型A | 类型B>;

// 等价于：（返回原本的联合类型）
// type 自定义类型名 = 类型A | 类型B;
type 自定义类型名 = Extract<类型A | 类型B, 类型C | 类型D>;

// 等价于：（返回 never）
// type 自定义类型名 = never;
/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;
```

:::

::: details 例子：

```ts{3-5}
type Union = "1" | "2" | "3";

type A = Extract<Union, "1">;
type B = Extract<Union, "1" | "2" | "3">;
type C = Extract<Union, "888" | "999">;

// 等价于：
// type A = "1"
// type B = "1" | "2" | "3"
// type C = never
```

:::

## NonNullable\<T>

从`<T>`接收的类型中剔除所有`null`和`undefined`后作为一个新类型返回

::: code-group

```ts [使用]
type 自定义类型名 = NonNullable<类型A | 类型B | null | undefined>;

// 等价于：
// type 自定义类型名 = 类型A | 类型B;
/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T & {};
```

:::

::: details 例子：

```ts
type T = NonNullable<number | string | null | undefined | never>;
// 等价于：
// type T = string | number
```

:::

## Parameters\<Function>

将`<Function>`接收的函数类型的**所有参数的类型作为一个元组类型**返回

:::code-group

```ts [函数有参数]
type 自定义类型名 = Parameters<(参数A: 类型A, 参数B: 类型B) => 函数返回值类型>;

// 相当于：
// type 自定义类型名 = [类型A, 类型B];
```

```ts [函数无参数]
type 自定义类型名 = Parameters<() => 函数返回值类型>;

// 相当于：
// type 自定义类型名 = [];
```

```ts [TS类型<Badge>完整版</Badge>]
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

:::

::: tip any

```ts
// 类型参数为 any：
type 自定义类型名 = Parameters<any>;
// unknown[];

// 类型参数接收的函数参数及返回值类型都为 any：
type 自定义类型名 = Parameters<(...args: any) => any>;
// any;
```

:::

::: details 例子：

```ts
function FunA(a: string, b: number, c?: string) {}
function FunB() {}

type A = Parameters<typeof FunA>;
type B = Parameters<typeof FunB>;
type C = Parameters<(...args: any) => any>;
type D = Parameters<any>;

//　等价于：
// type A = [a: string, b: number, c?: string | undefined];
// type B = [];
// type C = any;
// type D = unknown[];
```

:::

## ReturnType\<Function>

将`<Function>`接收的函数类型的**返回值的类型**返回

:::code-group

```ts [使用]
type 自定义类型名 = ReturnType<() => 函数返回值类型>;

// 相当于：
// type 自定义类型名 = 函数返回值类型;
```

```ts [TS类型<Badge>完整版</Badge>]
/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

:::

::: tip any

```ts
// 类型参数接收 any：
type T = ReturnType<any>;
// any
```

:::

::: details 例子：

```ts
function FunA(param: string | number) {
  return params;
}
function FunB() {
  return;
}
function FunC() {}

type A = ReturnType<typeof FunA>;
type B = ReturnType<typeof FunB>;
type C = ReturnType<typeof FunC>;

// 等价于：
// type A = string | number
// type B = void
// type C = void
```

:::

## Awaited\<T>

::: code-group

```ts [使用]
/**
 * Recursively unwraps the "awaited type" of a type. Non-promise "thenables" should resolve to `never`. This emulates the behavior of `await`.
 */
type Awaited<T> = T extends null | undefined
  ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
  : T extends object & { then(onfulfilled: infer F, ...args: infer _): any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
  ? F extends (value: infer V, ...args: infer _) => any // if the argument to `then` is callable, extracts the first argument
    ? Awaited<V> // recursively unwrap the value
    : never // the argument to `then` was not callable
  : T; // non-object or non-thenable
```

:::

## Uppercase\<String> <Badge>字符串类型</Badge>

将`<String>`接收的字符串中的**每个字符转换为大写**后作为一个新类型返回

::: code-group

```ts [使用]
type 自定义类型名 = Uppercase<字符串类型 | "字符串">;
/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;
```

:::

::: details 例：以字符串`"hello world"`为例

::: code-group

```ts [例一]
type Str = "hello world";
type UpperStr = Uppercase<Str>; // [!code hl]

// 等价于：
// type UpperStr = "HELLO WORLD"
type Str<T extends string> = `xx-${Uppercase<T>}`;
type UpperStr = Str<"hello world">; // [!code hl]

// 等价于：
// type UpperStr = "xx-HELLO WORLD"
```

:::

## Lowercase\<String> <Badge>字符串类型</Badge>

将`<String>`接收的字符串中的**每个字符转换为小写**后作为一个新类型返回

::: code-group

```ts [使用]
type 自定义类型名 = Lowercase<字符串类型 | "字符串">;
/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;
```

:::

::: details 例：以字符串`"HELLO WORLD"`为例

::: code-group

```ts [例一]
type Str = "HELLO WORLD";
type LowerStr = Lowercase<Str>; // [!code hl]

// 等价于：
// type LowerStr = "hello world"
type Str<T extends string> = `xx-${Lowercase<T>}`;
type LowerStr = Str<"HELLO WORLD">; // [!code hl]

// 等价于：
// type LowerStr = "xx-hello world"
```

:::

## Capitalize\<String> <Badge>字符串类型</Badge>

将`<String>`接收的字符串中的**第一个字符转换为大写**后作为一个新类型返回

::: code-group

```ts [使用]
type 自定义类型名 = Capitalize<字符串类型 | "字符串">;
/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;
```

:::

::: details 例：以字符串`"hello world"`为例

```ts
type Str = "hello world";
type CapitalizedStr = Capitalize<Str>; // [!code hl]

// 等价于：
// type CapitalizedStr = "Hello world"
```

:::

## Uncapitalize\<String> <Badge>字符串类型</Badge>

将`<String>`接收的字符串中的**第一个字符转换为小写**后作为一个新类型返回

::: code-group

```ts [使用]
type 自定义类型名 = Uncapitalize<字符串类型 | "字符串">;
/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;
```

:::

::: details 例：以字符串`"HELLO WORLD"`为例

```ts
type Str = "HELLO WORLD";
type UnCapitalizedStr = Uncapitalize<Str>; // [!code hl]

// 等价于：
// type UnCapitalizedStr = "hELLO WORLD"
```

:::
