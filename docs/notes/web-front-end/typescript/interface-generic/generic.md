# TS 泛型 ( Generic )

```ts
type A<T> = T;
type B = A<"XXX">;

// 等价于：
// type B = "XXX"
```
