# TS 模版文字类型

```ts
type A<T> = T;
type B = A<"XXX">;

// 等价于：
// type B = "XXX"
```

## intrinsic
