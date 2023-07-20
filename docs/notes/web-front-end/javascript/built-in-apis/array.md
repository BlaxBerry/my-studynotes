# JS Array

https://mp.weixin.qq.com/s/rexo9j0h2DfxA_SaBJwjMg

### new Array()

```js
new Array(3);
// [empty × 3]

[...new Array(3)];
// [undefined, undefined, undefined]

const array = [...new Array(3)].map(() => "xxx");
// ["xxx", "xxx", "xxx"]
```
