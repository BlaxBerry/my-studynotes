# TS 泛型 ( Generic )

## 简介

::: tip 命名参照：

- `<K>`: ( Key ) 对象键的类型
- `<V>`: ( Value ) 对象值的类型
- `<E>`: ( Element ) 元素的类型

:::

## 泛型约束

### extends

https://static.kancloud.cn/cyyspring/tyscript/2686237

---

### inter

https://www.bilibili.com/video/BV1qv4y1P7D2/?spm_id_from=333.337.search-card.all.click

## 常见用法

### 函数泛型

::: code-group

```ts [普通函数]
// 定义
function myFunction<T>(params: T): T {
  return params;
}

// 使用
const a = myFunction<string>("xxx");
const b = myFunction<number>(111);
```

```ts [箭头函数]
// 定义
const doSomething = <T>(params: T): T => {
  return params;
};

// 使用
const a = doSomething<string>("xxx");
const b = doSomething<number>(111);
```

:::

---

### 接口泛型

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

---

### 类泛型

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

---

### 组件泛型

::: code-group

```tsx [React 函数组件]
interface Props<T> {
  固定类型的属性: 类型;
  不定类型的属性: T;
}

// 定义
function 子组件<T>(props: Props<T>) {
  return <></>;
}

// 使用
function 父组件() {
  return (
    <>
      <子组件<类型> {...props} />
      <子组件<类型> {...props} />
    </>
  );
}
```

```tsx [React.meo() 记忆组件]
import React from "react";

interface Props<T> {
  固定类型的属性: 类型;
  不定类型的属性: T;
}

// 定义
function 子组件<T>({ data }: Props<T>) {
  return <></>;
}
const 子组件Memorized = React.memo(子组件); // [!code --]
const memoWithGeneric: <T>(component: T) => T = React.memo; // [!code ++]
const 子组件Memorized = memoWithGeneric(子组件); // [!code ++]

// 使用
function 父组件() {
  return (
    <>
      <子组件Memorized<类型> {...props} />
      <子组件Memorized<类型> {...props} />
    </>
  );
}
```

:::

::: details 例子：React 函数组件

```tsx
import { memo } from "react";

function Child<T>(props: {
  data: T;
}) {
  console.log(props.data);
  return null;
}
const memoWithGeneric: <T>(component: T) => T = memo;
const ChildMemo = memoWithGeneric(Child);

function Father() {
  return (
    <>
      <Child<number> data={100} />
      <Child<{ name: string; age: number }>
        data={{ name: "xxx", age: 100 }}
      />

      <ChildMemo<number> data={100} />
      <ChildMemo<{ name: string; age: number }>
        data={{ name: "xxx", age: 100 }}
      />
  );
}
```

:::
