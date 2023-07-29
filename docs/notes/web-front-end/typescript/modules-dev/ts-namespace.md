# TS 命名空间

命名空间 ( Namespace ) 用于避免命名冲突

命名空间内可包含类、接口、函数、以及其他命名空间

使用`namespace`定义命名空间，命名空间内成员通过`export`到处供外部访问获取

```ts
namespace 自定义命名空间名 {
    export 成员;
    export 成员;
    export 成员;
}
```
