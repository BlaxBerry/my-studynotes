# TS 泛型 ( Generic )

TypeScript 支持泛型，它允许我们编写可以重用的代码组件，同时可以适用于多种类型。

在 TypeScript 中，可以使用泛型来指定某个类型在编译时是未知的。通过使用泛型，可以在不同的地方使用相同的代码，但传入不同的类型作为参数。这样可以增加代码的灵活性和重用性。

泛型可以应用于函数、接口和类。以下是一些示例：

1. 函数泛型：

```typescript
function identity<T>(arg: T): T {
  return arg;
}
let output = identity<string>("Hello Generics");
```

2. 接口泛型：

```typescript
interface CustomArray<T> {
  length: number;
  push(item: T): void;
  getItem(index: number): T;
}
let arr: CustomArray<number> = {
  length: 0,
  push(item: number) {
    // 添加元素到数组
  },
  getItem(index: number) {
    // 获取指定索引处的元素
    return null;
  },
};
```

3. 类泛型：

```typescript
class Queue<T> {
  items: T[] = [];

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }
}

const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue()); // 1
```

通过使用泛型，可以实现更灵活和可重用的代码，同时提高类型安全性。

Inter:
https://www.bilibili.com/video/BV1qv4y1P7D2/?spm_id_from=333.337.search-card.all.click

使用时尽量命名为一些可懂的，比如：

- `<K>`: Key 对象键的类型
- `<V>`: Value 对象值的类型
- `<E>`: Element 元素的类型

### 函数

::: code-group

```ts [普通函数]
function myFunction<T>(params: T): T {
  return params;
}

const a = myFunction<string>("xxx");
const b = myFunction<number>(111);
```

```ts [箭头函数]
const doSomething = <T>(params: T): T => {
  return params;
};

const a = doSomething<string>("xxx");
const b = doSomething<number>(111);
```

:::

---

### 泛型接口

## 泛型约束

### extends

https://static.kancloud.cn/cyyspring/tyscript/2686237
