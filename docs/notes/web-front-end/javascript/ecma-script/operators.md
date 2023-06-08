# JavaScript 运算符

### ??

> null 判断运算符( Nullish Coalescing Operator )

仅在运算符左侧为`null`、`undefined`时才返回右侧内容

除此以外直接返回左侧内容

```ts
null ?? "xxx"; // "xxx"
undefined ?? "xxx"; // "xxx"
```

```ts
0 ?? "xxx"; // 0
false ?? "xxx"; // false
```

### ?.

> 链判断运算符（ Optional Chaining Operator ）
