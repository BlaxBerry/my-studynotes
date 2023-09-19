# TS 枚举类型 ( Enum )

可以遍历

```ts
enum Status {
  "not_started",
  "progress",
  "completed",
  "failed",
}

console.log(Object.values(Status));
```

TS Enum の問題点と代替手段：
https://typescriptbook.jp/reference/values-types-variables/enum/enum-problems-and-alternatives-to-enums
