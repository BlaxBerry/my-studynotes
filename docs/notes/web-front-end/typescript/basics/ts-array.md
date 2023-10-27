# TS 数组类型 ( Array )

两种写法：

::: code-group

```ts [写法一]
type 自定义类型名 = 元素类型[];
```

```ts [写法二<Badge>泛型</Badge>]
type 自定义类型名 = Array<原始类型>;
```

:::

```ts
const arrA = ["a", "b", "c"];
type itemA = (typeof arrA)[number]; // string

const arrB = ["a", "b", "c"] as const;
type itemB = (typeof arrB)[number]; // "a" | "b" | "c"
```
