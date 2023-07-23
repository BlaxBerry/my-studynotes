# TS 泛型 ( Generic )

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
