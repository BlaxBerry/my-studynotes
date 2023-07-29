# TS 元组类型 ( Tuple )

TypeScript 元组是表示具有已知数量和类型的数组的类型。元组的每个元素的类型是固定的，并且在数组中的位置也是固定的。

以下是一个示例，展示了如何声明和使用元组类型：

```typescript
// 声明一个元组类型
let tuple: [string, number, boolean];

// 初始化元组
tuple = ["hello", 42, true];

// 访问元组元素
console.log(tuple[0]); // 输出: 'hello'
console.log(tuple[1]); // 输出: 42
console.log(tuple[2]); // 输出: true

// 修改元组元素
tuple[0] = "world";
tuple[1] = 100;
tuple[2] = false;

// 错误示例：元组长度和类型不匹配
tuple = ["hello", 42]; // 报错
tuple = [true, "world", 100]; // 报错
```

需要注意的是，元组长度和元素类型在声明时是固定的，不能在后续修改。如果尝试将错误类型的值赋给元组元素或者将不符合声明长度的数组赋给元组，TypeScript 编译器会报错。

可理解为限定了元素长度与类型的数组类型

```ts
type 自定义类型名 = [元素类型];
```
