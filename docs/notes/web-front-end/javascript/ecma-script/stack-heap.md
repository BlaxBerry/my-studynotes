# JS 栈、堆

https://vue3js.cn/interview/JavaScript/copy.html#二、浅拷贝

## 栈 ( Stack )

## 堆 ( Heap )

深拷贝方法：https://mp.weixin.qq.com/s/NSNh9HHFZ3hEFPAxkY_F7Q

数组 []

不影响原数组

```js
const list = [1, 2, 3];

const list_new = [...list]; // [!code hl]

list_new.push(4);

console.log(list); // [ 1, 2, 3 ]
console.log(list_new); // [ 1, 2, 3, 4 ]
```
