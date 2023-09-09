# JS Object

https://mp.weixin.qq.com/s/n5zp9ExnEb6SYcgEjtWDMA

### Object.entries()

```ts
const strictObjectEntries = <T extends Record<string, any>>(
  object: T
): [keyof T, T[keyof T]][] => {
  return Object.entries(object);
};
```

### Object.keys()

### Object.values()

https://mp.weixin.qq.com/s/n5zp9ExnEb6SYcgEjtWDMA
