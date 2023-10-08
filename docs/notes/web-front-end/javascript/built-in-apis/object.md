# JS Object

https://mp.weixin.qq.com/s/n5zp9ExnEb6SYcgEjtWDMA

## Object.assign

- 合并多个对象
- 拷贝一个对象 ( 将对象合并至一个空对象中 )

::: code-group

```js [合并]
const 合并后的对象 = Object.assign(目标对象, 源对象, 源对象...)
```

```js [拷贝]
const 拷贝后的对象 = Object.assign({}, 对象);
```

:::

::: details `目标对象`为`{}`时意为将`源对象`合并成一个新对象

```js{0}
const a = { a: 1 };
const b = { b: 2 };

const ab = Object.assign({}, a, b);

console.log(ab); // { a: 1, b: 2 }
```

:::
::: details `目标对象`为指定的某对象时会将`源对象`合并至该对象中

```js{0}
const a = { a: 1 };
const b = { b: 2 };

const ab = Object.assign(a, b);

console.log(a);  // { a: 1, b: 2 }
console.log(ab); // { a: 1, b: 2 }
```

:::
::: details `源对象`中重复的键值对会覆盖前面的

```js{0}
const a = { a: 1 };
const b = { a: 111 };

const ab = Object.assign({}, a, b);

console.log(ab); // { a: 111 }
```

:::
::: details 合并后的新对象不受`源对象`变更的影响

但若目标对象不为空对象`{}`，目标对象的变更会影响合并后的对象

::: code-group

```js [目标对象为 { }]
const a = { a: 1 };
const b = { b: 2 };

const ab = Object.assign({}, a, b);

// a, b 的变化不影响合并后生成的 ab
a.a = 11;
b.b = 22;

console.log(a); // { a: 11 }
console.log(b); // { b: 22 }
console.log(a); // { a: 1, b: 2 }
```

```js{0} [目标对象不为 { }]
const a = { a: 1 };
const b = { b: 2 };
const c = { c: 3 };

const abc = Object.assign(a, b, c);

// b, c 的变化不影响合并后生成的 abc
b.b = 22;
c.c = 33;
console.log(abc); // { a: 1, b: 2, c: 3 }

// a 的变化会影响合并后生成的 abc
a.a = 1111;
console.log(a);   // { a: 1111, b: 2, c: 3 }
console.log(abc); // { a: 1111, b: 2, c: 3 }

// a 的变化会影响合并后生成的 abc
a.a = 9999;
console.log(a);   // { a: 9999, b: 2, c: 3 }
console.log(abc); // { a: 9999, b: 2, c: 3 }
```

:::
::: details 也可用于拷贝一个对象

```js{0}
const a = { a: 1 };
const b = { b: 2 };

const aCopied = Object.assign({}, a); // a 变化不影响 aCopied
const bCopied = Object.assign(b);     // b 变化会影响 bCopied

a.a = 11;
console.log(aCopied); // { a: 1 }

b.b = 22;
console.log(bCopied); // { b: 22 }

```

:::

::: tip
建议使用[`...`扩展运算符](../ecma-script/operators.md#展开) 简化写法

同样，合并后的对象不会受`源对象`变更的影响

```js
const a = { a: 1 };
const b = { b: 2 };

const ab = { ...a, ...b }; // [!code hl]

a.a = 11;
b.b = 22;

console.log(a); // { a: 11 }
console.log(b); // { b: 22 }
console.log(ab); // { a: 1, b: 2 }
```

:::

## Object.entries()

遍历对象的键值对

```ts
const strictObjectEntries = <T extends Record<string, any>>(
  object: T
): [keyof T, T[keyof T]][] => Object.entries(object);
```

## Object.keys()

遍历对象的键，然后

## Object.values()

遍历对象的值，然后

https://mp.weixin.qq.com/s/n5zp9ExnEb6SYcgEjtWDMA
