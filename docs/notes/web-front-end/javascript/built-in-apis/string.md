# JS String

## length

```js
const lastElement = list[list.length - 1];
```

## repeat()

```js
const 新字符串 = "字符串".repeat(重复次数);
```

::: details 例子：

```js{0}
const str = "ABC";

console.log(str.repeat(3)); // "ABCABCABC"
console.log(str.repeat(0)); // ""
console.log(str);           // "ABC"
```

:::

## slice()

## split()

```js
const 数组 = "字符串".split("间隔字符");
```

::: details 例子：

```js{0}
"1,2,3".split(",");   // ["1", "2", "3"]
"1, 2, 3".split(","); // ["1", " 2", " 3"]
```

:::
