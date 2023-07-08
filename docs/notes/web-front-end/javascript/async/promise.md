# JS Promise

## 简介

Promise 是 JavaScript 中解决异步编程的一种方案，由 ES6 提出

可替代以往回调函数和事件的方式来处理异步任务，并有效解决回调函数深层嵌套时的回调地狱

> 如下：多用于处理不希望出现代码阻塞的耗时任务

::: details 例：Promise 处理 Node.js 文件读取

```js{4-9}
const fs = require("fs");

function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

readFileAsync("路径/文件名.后缀名").then(
  (result) => console.log(result),
  (result) => console.log(result.message)
);
```

:::

::: details 例：Promise 封装 AJAX 请求

```js{5-14}
const url = "https://autumnfish.cn/api/joke";
const button = document.querySelector(".request-button");

function requestData(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.readyState == 4 && xhr.status == 200) resolve(xhr.response);
      else reject("出错了");
    };
    xhr.open("get", url);
    xhr.send(null);
  });
}

button.addEventListener("click", () =>
  requestData(url).then(
    (data) => console.log("成功了", data),
    (reason) => console.log("失败了", reason)
  )
);
```

:::

::: tip 基本使用

- [Promise 是个对象（构造函数）](#promise-对象)可简单理解为一个包裹异步任务的容器<br/>
- 调用该构造函数后其处理的异步任务会返回为一个[Promise 实例](#promise-实例)<br/>
- 该实例可通过链式调用指定 API 来对应处理异步任务所处的不同进程状态与执行结果<br/>

:::

## Promise 对象

Promise 对象是个构造函数，调用后可生成一个 [Promise 实例](#promise-实例)

该构造函数接收一个 [executor 执行器函数](#executor-执行器函数) 做参数用来定义要执行的异步任务

::: code-group

```js [方便理解的假代码]
const Promise实例 = new Promise(executor执行器函数);

function executor执行器函数(resolve, reject) {
  // 耗时的异步任务...
  if (异步任务成功条件) resolve(异步任务成功结果);
  else reject(异步任务失败理由);
}
```

```js [开发时的标准写法]
const Promise实例 = new Promise((resolve, reject) => {
  // 耗时的异步任务...
  if (异步任务成功条件) resolve(异步任务成功结果);
  else reject(异步任务失败理由);
});
```

:::

::: tip Promise 对象上的方法：

- [Promise.resolve()](#promise-resolve)
- [Promise.reject()](#promise-reject)
- [Promise.all()](#promise-all)
- [Promise.race()](#promise-race)
- [Promise.any()](#promise-any)
- [Promise.try()](#promise-try)

:::

---

### executor 执行器函数

executor 执行器函数是调用 [Promise 对象（构造函数）](#promise-对象)创建 Promise 实例时必须传入的参数

即，**executor 执行器函数体就是由 Promise 处理的异步任务**

::: code-group

```ts [TS类型<Badge>方便理解版</Badge>]
executor(
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void
): void
```

```ts [TS类型<Badge>完整版</Badge>]
interface PromiseConstructor {
  // ...
  new <T>(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ) => void
  ): Promise<T>;
}
```

:::

接收两个函数作为参数 ( 由 JS 提供不用自己部署 )，调用时会修改 Promise 异步任务的状态

异步任务成功时需调用第一个参数，失败时需调用第二个参数

::: details 第一个函数参数`resolve()`

- 调用 executor 执行器函数的第一个函数参数会使异步任务状态变为成功
  > `pending` → `fulfilled` ( resolved )
- 若异步任务成功时有结果，可在调用时作为参数导出供外部获取<br/>
  结果的获取详见实例方法[`then()`](#then)
- 作用等价于 Promise 对象方法[`Promise.resolve()`](#promise-resolve)

```js
const Promise实例 = new Promise((resolve) => resolve());
const Promise实例 = new Promise((resolve) => resolve(成功结果));

// 等价于
const Promise实例 = Promise.resolve();
const Promise实例 = Promise.resolve(成功结果);
```

:::

::: details 第二个函数参数`reject()`

- 调用 executor 执行器函数的第二个函数参数会使异步任务状态变为失败
  > `pending` → `rejected`
- 若异步任务失败时有原因（错误信息），可在调用时作为参数导出供外部获取<br/>
  结果的获取详见实例方法[`then()`](#then)、[`catch()`](#catch)

- 作用等价于 Promise 对象方法[`Promise.reject()`](#promise-reject)

```js
const Promise实例 = new Promise((resolve, reject) => reject());
const Promise实例 = new Promise((resolve, reject) => reject(失败原因));

// 等价于
const Promise实例 = Promise.reject();
const Promise实例 = Promise.reject(失败原因);
```

::: danger 报错 UnhandledPromiseRejection

executor 执行器函数内直接调用`reject()`会报错没有捕获异常 Promise Rejection

```js
const promiseInstance = new Promise((resolve, reject) => reject()); // [!code error]
// [UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "undefined".] { code: 'ERR_UNHANDLED_REJECTION' }
const promiseInstance = new Promise((resolve, reject) => reject("出错了")); // [!code error]
// [UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "xxx".] { code: 'ERR_UNHANDLED_REJECTION'}

const Promise实例 = Promise.reject(); // 不报错
const Promise实例 = Promise.reject("出错了"); // 不报错
```

解决方法如报错信息所写的两个方法：

- **方法一**：使用[`try...catch...`](../ecma-script/error-exception.md#trycatch)+[`await...await...`](async-await.md)
- **方法二**：使用 Promise 实例方法[`catch()`](#catch)

::: code-group

```js [方法一]
async function getPromiseInstance() {
  return new Promise((resolve, reject) => reject());
}

try {
  const promiseInstance = await getPromiseInstance();
} catch {
  /* 错误捕获与处理 */
}
```

```js [方法二]
const promiseInstance = new Promise((resolve, reject) => reject());

promiseInstance.catch(() => {
  /* 错误捕获与处理 */
});
```

:::

::: details 执行时机

executor 执行器函数在调用`new Promise()`时会立即执行

即，Promise 处理的异步在调用构造函数时会立即执行

[详见下文](#promise-执行时机)

::: code-group

```js [例一]
console.log(111);

const promiseInstance = new Promise((resolve) => {
  console.log(222);

  setTimeout(() => {
    console.log(333);
    resolve();
    console.log(444);
  }, 4000);

  console.log(555);
});

console.log("xxx");

/*
  111   ← 全局作用域
  222   ← 构造函数立即执行，按序执行
  555   ← 构造函数立即执行，按序执行
  xxx   ← 全局作用域，立即按序执行
  // 等待 4s 后继续打印下文
  333   ← 构造函数立即执行，异步按序执行
  444   ← 构造函数立即执行，异步按序执行
*/
```

```js{14-21} [例二<Badge>升级版</Badge>]
console.log(111);

const promiseInstance = new Promise((resolve) => {
  console.log(222);

  setTimeout(() => {
    console.log(333);
    resolve();
    console.log(444);
  }, 4000);

  console.log(555);
})
  .then(() => {
    console.log(666);
    setTimeout(() => console.log(777), 2000);
  })
  .then(() => {
    console.log(888);
    setTimeout(() => console.log(999), 2000);
  })

console.log('xxx');

/*
  111   ← 全局作用域，立即按序执行
  222   ← 构造函数，立即按序执行
  555   ← 构造函数，立即按序执行
  xxx   ← 全局作用域，立即按序执行
  // 等待 4s 后继续打印下文
  333   ← 构造函数，异步定时器按序执行
  444   ← 构造函数，异步定时器按序执行
  666   ← 实例方法链式调用，立即按序执行
  888   ← 实例方法链式调用，立即按序执行
  // 等待 2s 后继续打印下文
  777   ← 实例方法链式调用，异步定时器按序执行
  999   ← 实例方法链式调用，异步定时器按序执行
*/
```

:::

### Promise.resolve()

用于生成一个成功状态的 Promise 实例

等价于 [executor 执行器函数](#executor-执行器函数) 中调用第一个函数参数 **`resolve()`**

```js
const 成功状态的Promise实例 = Promise.resolve(异步成功时的返回值);

// 等价于
const 成功状态的Promise实例 = new Promise((resolve) =>
  resolve(异步成功时的返回值)
);
```

> 如下：使用例子

::: details 例：直接创建一个成功状态的 Promise 实例并使用

```js
const promiseInstance = Promise.resolve("xxxx");

promiseInstance.then((res) => {
  console.log(res); // xxxx
});
```

:::

::: details 例：在自定义异步处理函数中根据异步处理返回不同状态的 Promise 实例

```js{0}
getPromiseInstance()
  .then(result => {/**/})
  .catch(error => {/**/})

async function getPromiseInstance() {
  try {
    const result = await callAsyncAPI();
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
}
```

:::

---

### Promise.reject()

用于生成一个失败状态的 Promise 实例

等价于 [executor 执行器函数](#executor-执行器函数) 中调用第二个函数参数 **`reject()`**

```js
const 失败状态的Promise实例 = Promise.reject(异步失败时的返回值);

// 等价于
const 失败状态的Promise实例 = new Promise((resolve, reject) =>
  reject(异步失败时的返回值)
);
```

> 如下：使用例子

::: details 例：直接创建一个失败状态的 Promise 实例并使用

```js
const promiseInstance = Promise.reject("xxxx");

promiseInstance.catch((reason) => {
  console.log(reason); // xxxx
});
```

:::

::: details 例：在自定义异步处理函数中根据异步处理返回不同状态的 Promise 实例

```js{0}
getPromiseInstance()
  .then(result => {/**/})
  .catch(error => {/**/})

async function getPromiseInstance() {
  try {
    const result = await callAsyncAPI();
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
}
```

:::

---

### Promise.all()

用于处理一组 Promise 任务序列

参数接收一个 Promise 任务数组，返回值为一个新的 [Promise 实例](#promise-实例)

```js
const promise实例 = Promise.all([
  promise任务1, promise任务2, promise任务3,...
])
```

::: tip 必须全部成功最后才算成功

- **序列中异步任务全部执行成功时**：
  - 等所有任务完成后返回一个成功状态的 Promise 实例
  - 实例结果为包含所有异步任务返回值的数组
- **序列中异步任务有执行失败的时**：
  - 在遇到执行失败的任务时立即返回一个失败状态的 Promise 实例
  - 实例结果为序列中第一个失败任务返回值

::: code-group

```js [全部成功<Badge>Resolved</Badge>]
const a = Promise.resolve("aa");
const b = Promise.resolve("bb");
const c = Promise.resolve("cc");
const d = new Promise((resolve) => setTimeout(() => resolve("dd"), 4000));

Promise.all([a, b, c, d])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// 等待 4s 后打印
// [ 'aa', 'bb', 'cc', 'dd' ]
```

```js [出现一个失败的<Badge type="danger">Rejected</Badge>]
const a = Promise.resolve("aa");
const b = Promise.resolve("bb");
const c = Promise.reject("cc");
const d = Promise.resolve("dd");

Promise.all([a, b, c, d])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// cc
```

```js [出现多个失败的<Badge type="danger">Rejected</Badge>]
const a = Promise.resolve("aa");
const b = Promise.reject("bb");
const c = Promise.reject("cc");
const d = Promise.resolve("dd");

Promise.all([a, b, c, d])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// bb
```

:::

---

### Promise.any()

用于处理一组 Promise 任务序列

参数接收一个 Promise 任务数组，返回值为一个新的 [Promise 实例](#promise-实例)

```js
const promise实例 = Promise.any([
  promise任务1, promise任务2, promise任务3,...
])
```

::: tip 只要有一个成功就算成功

- **序列中异步任务有执行成功的时**：
  - 在遇到执行成功的任务时立即返回一个成功状态的 Promise 实例
  - 实例结果为序列中第一个成功任务返回值
- **序列中异步任务全部执行失败时**：
  - 如果所有任务都失败时返回一个失败状态的 Promise 实例
  - 实例结果为 AggregateError 类型的错误

::: code-group

```js [出现一个成功的<Badge>Resolved</Badge>]
const a = Promise.reject("aa");
const b = Promise.reject("bb");
const c = Promise.resolve("cc");
const d = Promise.reject("dd");

Promise.any([a, b, c, d])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// cc
```

```js [全部失败<Badge type="danger">Rejected</Badge>]
const a = Promise.reject("aa");
const b = Promise.reject("bb");
const c = Promise.reject("cc");
const d = Promise.reject("dd");

Promise.any([a, b, c, d])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// [AggregateError: All promises were rejected]
```

:::

::: details 例：执行异步任务时必须等待指定时间后才执行

比如可用于模块的自定义延迟导入

> 如下：React 组件懒加载自定义延迟 3s，[详见`React.lazy()`](../../react/built-in-apis/methods.md#lazy)

```js
import React from "react";

const lazyComponent = React.lazy(() =>
  Promise.all([
    import("组件路径"),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]).then(([moduleExports]) => moduleExports)
);
```

:::

---

### Promise.race()

用于处理一组 Promise 任务序列

参数接收一个 Promise 任务数组，返回值为一个新的 [Promise 实例](#promise-实例)

```js
const promise实例 = Promise.race([
  promise任务1, promise任务2, promise任务3,...
])
```

::: tip 谁先完成就用谁

返回值 Promise 实例的状态取决于参数序列中第一个完成的异步任务

- **第一个完成的异步任务为 resolved 时**：返回值 Promise 实例状态为 resolved
- **第一个完成的异步任务为 rejected 时**：返回值 Promise 实例状态为 rejected

::: code-group

```js [全部成功<Badge>Resolved</Badge>]
const a = new Promise((resolve) => setTimeout(() => resolve("aa"), 4000));
const b = new Promise((resolve) => setTimeout(() => resolve("bb"), 3000));
const c = new Promise((resolve) => setTimeout(() => resolve("cc"), 2000));
const d = new Promise((resolve) => setTimeout(() => resolve("dd"), 1000));

Promise.race([a, b, c, d]).then((res) => console.log(res));
// 1s 后打印："dd"
```

```js [全部失败<Badge type="danger">Resolved</Badge>]
const a = new Promise((_, reject) => setTimeout(() => reject("aa"), 4000));
const b = new Promise((_, reject) => setTimeout(() => reject("bb"), 3000));
const c = new Promise((_, reject) => setTimeout(() => reject("cc"), 2000));
const d = new Promise((_, reject) => setTimeout(() => reject("dd"), 1000));

Promise.race([a, b, c, d]).catch((err) => console.log(err));
// 1s 后打印："dd"
```

```js [有成功也有失败]
const a = new Promise((resolve) => setTimeout(() => resolve("aa"), 4000));
const b = new Promise((_, reject) => setTimeout(() => reject("bb"), 3000));
const c = new Promise((_, reject) => setTimeout(() => reject("cc"), 2000));
const d = new Promise((resolve) => setTimeout(() => resolve("dd"), 1000));

Promise.race([a, b, c, d])
  .then((res) => console.log(`resolved ${res}`))
  .catch((err) => console.log(`rejected ${err}`));
// 1s 后打印："resolved dd"
```

```js [有成功也有失败]
const a = new Promise((resolve) => setTimeout(() => resolve("aa"), 4000));
const b = new Promise((resolve) => setTimeout(() => resolve("bb"), 3000));
const c = new Promise((resolve) => setTimeout(() => resolve("cc"), 2000));
const d = new Promise((_, reject) => setTimeout(() => reject("dd"), 1000));

Promise.race([a, b, c, d])
  .then((res) => console.log("resolved", res))
  .catch((err) => console.log("rejected", err));
// 1s 后打印："rejected dd"
```

:::

::: details 例：执行异步任务时只要超过指定时间就立刻结束执行

比如可用于网络请求

> 如下：超过 3s 就立刻结束异步任务的执行，并报错

::: code-group

```js [多个任务]
const p1 = new Promise((resolve) => setTimeout(() => resolve("p1"), 4000));
const p2 = new Promise((resolve) => setTimeout(() => resolve("p2"), 5000));

Promise.race([
  p1,
  p2,
  new Promise((_, reject) => setTimeout(() => reject("超时了"), 3000)),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); // 3s后打印："超时了"
```

```js [一个任务]
const p = new Promise((resolve) => setTimeout(() => resolve("p1"), 4000));

Promise.race([
  p1,
  new Promise((_, reject) => setTimeout(() => reject("超时了"), 3000)),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); // 3s后打印："超时了"
```

:::

---

### Promise.allSettled() <Badge type="danger" text="FIXME"/>

用于处理一组 Promise 任务序列

参数接收一个 Promise 任务数组，返回值为一个包含所有异步任务状态和结果的对象数组

无论序列中异步任务结果是否成功，执行不会中途失败

```js{0}
const a = Promise.resolve("aa");
const b = Promise.reject("bb");
const c = Promise.resolve("bb");
const d = Promise.reject("dd");

Promise.allSettled([a, b, c, d])
  .then((res) => console.log(res))

/*
[
  { status: 'fulfilled', value: 'aa' },
  { status: 'rejected', reason: 'bb' },
  { status: 'fulfilled', value: 'bb' },
  { status: 'rejected', reason: 'dd' }
]
*/
```

---

### Promise.try() <Badge type="danger" text="FIXME"/>

## Promise 实例

**Promise 实例可理解为就是由 Promise 处理的异步任务**

::: tip Promise 实例有三种方式生成：

1. 实例化构造函数 [new Promise()](#promise-对象)
2. 通过[`Promise.resolve()`](#promise-resolve)
3. 通过[`Promise.reject()`](#promise-reject)

:::

Promise 实例上定义的方法可对该异步任务所处的不同[执行状态](#promise-执行状态)、[处理结果](#promise-执行结果)进行对应处理。各个实例方法的返回值为一个新的 Promise 实例，因此方法返回值仍可使用 Promise 实例原型上的方法（ [链式调用](#链式调用) ）

::: tip Promise 实例上的方法：

- [then()](#then)
- [catch()](#catch)
- [finally()](#finally)

:::

---

### then()

> Promise 实例上的方法
>
> 定义在原型对象上`Promise.prototype.then()`

`then()`方法会在 Promise 实例状态改变时自动调用执行

`then()`方法需要接收两个可选的回调函数作为参数，返回值为一个新的 Promise 实例

::: code-group

```ts [TS类型<Badge>方便理解版</Badge>]
then<T, K>(
    onfulfilled?:
      | ((value: T) => T | PromiseLike<T>)
      | undefined,
    onrejected?:
      | ((reason: any) => K | PromiseLike<K>)
      | undefined
): Promise<T | K>;
```

```ts [TS类型<Badge>完整版</Badge>]
interface Promise<T> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
}
```

:::

::: details 两个回调函数的执行时机：

`then()`方法的两个回调函数参数分别在 Promise 处理的异步任务**成功、失败**时自动执行：

- **异步成功时**：第一个回调函数
- **异步失败时**：第二个回调函数 ( 等价于实例方法[`catch()`](#catch) )

```js
const doSomethingAsync = (condition) => {
  return new Promise((resolve, reject) => {
    if (condition) resolve();
    else reject();
  });
};
const succeed = () => console.log("任务成功了");
const fail = () => console.log("任务失败了");

doSomethingAsync(true).then(succeed, fail); // [!code hl]
// 任务成功了
doSomethingAsync(true).then(succeed, undefined); // [!code hl]
// 任务成功了
doSomethingAsync(false).then(succeed, fail); // [!code hl]
// 任务失败了
doSomethingAsync(false).then(undefined, fail); // [!code hl]
// 任务失败了
```

:::

::: details 两个回调函数接收的参数：

- 第一个回调函数：获取 Promise 处理的异步成功时的结果
- 第一个回调函数：获取 Promise 处理的异步失败时的结果

::: code-group

```js [第一个回调函数]
const promiseInstance = Promise.resolve(100);

promiseInstance.then((res) => {
  console.log(res); // 100
});
```

```js [第二个回调函数]
const promiseInstance = Promise.reject(100);

promiseInstance.then(undefined, (reason) => {
  console.log(reason.message); // 100
});
```

:::

::: details 两个回调函数的返回值与链式调用：

- 第一个回调函数：
  - 返回值需通过`return`返回，供链式调用时后面使用的实例方法`then()`的第一个回调函数获取
  - 若不返回，则链式调用时后面无法获取
- 第一个回调函数：
  - 返回值需通过`throw`抛出错误对象，供链式调用时后面使用的实例方法`then()`的第二个回调函数获取
  - 若不抛出错误，则链式调用时后无法获取

::: code-group

```js [第一个回调函数]
const promiseInstance = Promise.resolve(100);

promiseInstance
  .then((res) => {
    console.log(res); // 100
    return (res += 1);
  })
  .then((res) => {
    console.log(res); // 101
    return (res += 10);
  })
  .then((res) => {
    console.log(res); // 111
  })
  .then((res) => {
    console.log(res); // undefined
  })
  .then((res) => {
    console.log(res); // undefined
  });
```

```js [第二个回调函数]
const promiseInstance = Promise.reject("aaa");

promiseInstance
  .then(undefined, (reason) => {
    console.log(reason); // "aaa"
    throw new Error("bbb"); // [!code hl]
  })
  .then(undefined, (reason) => {
    console.log(reason.message); // "bbb"
    throw new Error("ccc"); // [!code hl]
  })
  .then(undefined, (reason) => {
    console.log(reason.message); // "ccc"
  })
  .then(undefined, (reason) => {
    console.log(reason.message); // [!code hl] // 没有捕获到错误，不打印
  });
```

:::

---

### catch()

> Promise 实例上的方法
>
> 定义在原型对象上 `Promise.prototype.catch()`

`catch()`方法会在 Promise 实例状态失败自动调用执行

作用等价于实例方法[`then()`](#then)的第二个回调函数参数

`catch()`方法接收一个回调函数做作为参数，返回值为一个新的 Promise 实例

::: code-group

```ts [TS类型<Badge>方便理解版</Badge>]
catch<T>(
  onrejected?:
    | ((reason: any) => T | PromiseLike<T>)
    | undefined
): Promise<T>;
```

```ts [TS类型<Badge>完整版</Badge>]
interface Promise<T> {
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
}
```

:::

::: details 回调函数接收的参数：

`catch()`方法接收的回调函数的参数为 Promise 实例失败的原因

```js
const promiseInstance = Promise.reject("xxxx");

promiseInstance.catch((reason) => {
  console.log(reason); // "xxxx"
});
```

:::

::: details 回调函数的返回值与链式调用：
`catch()`方法接收的回调函数返回值需通过`throw`抛出错误对象对象，来供链式调用时后面继续使用的实例方法`catch()`获取

若不抛出错误，则链式调用时后面实例方法无法获取

```js
const promiseInstance = Promise.reject("aaa");

promiseInstance
  .catch((reason) => {
    console.log(reason); // "aaa"
    throw new Error("bbb"); // [!code hl]
  })
  .catch((reason) => {
    console.log(reason.message); // "bbb"
    throw new Error("ccc"); // [!code hl]
  })
  .catch((reason) => {
    console.log(reason.message); // [!code hl] // "ccc"
  })
  .catch((reason) => {
    console.log(reason.message); // [!code hl] // 没有捕获到错误，不打印
  });
```

:::

---

### finally()

> Promise 实例上的方法
>
> 定义在原型对象上 `Promise.prototype.finally()`

`finally()`方法会在 Promise 实例的所有[`then()`](#then)、[`catch()`](#catch)方法结束自动调用执行

用于在 Promise 处理的异步任务的最后执行某固定处理

`finally()`方法需要接收一个回调函数做参数，返回值为一个新的 Promise 实例

::: code-group

```ts [TS类型<Badge>方便理解版</Badge>]
finally(
  onfinally?: (() => void) ｜ undefined
): Promise;
```

```ts [TS类型<Badge>完整版</Badge>]
interface Promise<T> {
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
```

:::

```js{0}
Promise实例
  .then(res => {/**/})
  .catch(err => {/**/})
  .finally(() => {/**/})
```

---

### 链式调用

链式调用是指 Promise 实例在调用其实例方法后可继续调用实例方法

因为 Promise 实例方法的返回值是个新的 Promise 实例，所以返回值任可使用实例原型上的方法

Promise 实例方法的链式调可通过[`async...await...`](#async-await)转为同步执行

::: code-group

```js{0} [链式调用]
Promise实例
  .then((result) => {/* 处理 */})
  .then((result) => {/* 处理 */})
  .catch((reason) =>{/* 处理 */})
  .catch((reason) =>{/* 处理 */})
  .finally(() =>{/* 处理 */})
```

```js [async...await...]
async function doSomething() {
  try {
    const result = await 获取Promise实例的函数;
    /* 同步处理 */
    /* 同步处理 */
  } catch (error) {
    /* 处理 */
  }
}
```

:::

::: details `then()`的链式调用

详见上文实例方法[`then()`](#then)

::: code-group

```js{0} [使用]
成功的Promise实例
  .then((res) => {
    return 返回值;
  })
  .then((res) => {
    console.log(res); // 上一个 then() 的返回值
    return 返回值;
  })
  .then((res) => {
    console.log(res); // 上一个 then() 的返回值
  })
  .then((res) => {
    console.log(res); // undefined
  })
```

```js [例子]
Promise.resolve(1)
  .then((res) => {
    console.log(res); // 1
    return (res += 1);
  })
  .then((res) => {
    console.log(res); // 2
    return (res += 1);
  })
  .then((res) => {
    console.log(res); // 3
  })
  .then((res) => {
    console.log(res); // [!code hl] // undefined
  });
```

:::

::: details `catch()`的链式调用

详见上文实例方法[`catch()`](#catch)

::: code-group

```js{0} [使用]
失败的Promise实例
  .catch((err) => {
    console.log(err); // 异常
    throw new Error("错误信息");
  })
  .catch((err) => {
    console.log(err); // 上一 catch() 抛出的异常
    throw new Error("错误信息");
  })
  .catch((err) => {
    console.log(err);  // 上一 catch() 抛出的异常
  })
  .catch((err) => {
    console.log(err); // [!code hl] // 因为没有捕获到任何错误异常，不打印
  });
```

```js [例子]
Promise.reject("xxx")
  .catch((err) => {
    console.log(1, err); // "xxx"
    throw new Error("aaa");
  })
  .catch((err) => {
    console.log(1, err.message); // "aaa"
    throw new Error("bbb");
  })
  .catch((err) => {
    console.log(1, err.message); // "bbb"
  })
  .catch((err) => {
    console.log(1, err.message); // [!code hl] // 因为没有捕获到任何错误异常，不打印
  });
```

:::

## Promise 执行状态

Promise 处理的异步任务所处的进程状态，即[Promise 实例](#promise-实例)的状态

::: details Promise 的 3 种执行状态：

Promise 处理的异步任务只有 3 种执行状态，同时只能处于一种状态

|   执行状态    |          含义          |
| :-----------: | :--------------------: |
|  **pending**  | 进行中（默认初始状态） |
| **fulfilled** |      异步处理成功      |
| **rejected**  |      异步处理失败      |

:::

::: details Promise 的 2 种状态变化：

随着异步任务的执行 Promise 状态只会改变一次：**要不成功、要不失败**

|       执行状态的变化        |     含义      |
| :-------------------------: | :-----------: |
| **pending** → **fulfilled** | 进行中 → 成功 |
| **pending** → **rejected**  | 进行中 → 失败 |

:::

::: tip Promise 状态改变的方法：

<details class="details custom-block">
  <summary>变为成功状态</summary>

1. 调用 Promise 对象方法[`Promise.resolve()`](#promise-resolve)

```js
const succeedPromiseInstance = Promise.resolve();
```

2. 调用构造函数中 [Executor 执行器函数](#executor-执行器函数) 的第一个参数`resolve()`

```js
const succeedPromiseInstance = new Promise((resolve) => resolve());
```

</details>
<details class="details custom-block">
  <summary>变为失败状态 </summary>

1. 调用 Promise 对象方法[`Promise.reject()`](#promise-reject)

```js
const failedPromiseInstance = Promise.reject();
```

2. 调用构造函数中 [Executor 执行器函数](#executor-执行器函数) 的第二个参数`reject()`

```js
const failedPromiseInstance = new Promise((resolve, reject) => reject());
```

3. 构造函数中 [Executor 执行器函数](#executor-执行器函数) 内`throw`抛出一个错误对象

```js
const failedPromiseInstance = new Promise((resolve, reject) => {
  throw new Error();
});
```

4. Promise 实例方法[`then()`](#then)第二个参数内`throw`抛出一个错误对象

```js
const newFailedPromiseInstance = promiseInstance.then(undefined, (err) => {
  throw new Error();
});
```

5. Promise 实例方法[`catch()`](#then)内`throw`抛出一个错误对象

```js
const newFailedPromiseInstance = promiseInstance.catch((err) => {
  throw new Error();
});
```

</details>

:::

## Promise 执行时机

::: details new Promise()
`new Promise()`创建 Promise 任务时，其内逻辑会作为同步直接执行
::: code-group

```js [例一]
console.log(111);

new Promise((_, __) => console.log(222));

console.log(333);

// 111
// 222 Promise 构造函数内容同步立刻执行
// 333
```

```js [例二<Badge>定时器</Badge>]
console.log(111);

setTimeout(() => console.log(222), 0); // [!code hl]
setTimeout(() => console.log(333), 1000); // [!code hl]

new Promise((_, __) => console.log(444));

console.log(555);

// 111
// 444 Promise 构造函数内容同步立刻执行
// 555
// 222 计时器异步延迟执行
// 333 计时器异步延迟执行
```

:::

::: details Promise.resolve()
`Promise.resolve()`创建 Promise 任务时，实例方法`then()`内逻辑在所有同步任务结束后立刻执行
::: code-group

```js [例一]
console.log(111);

Promise.resolve().then(() => console.log(222));

console.log(333);

// 111
// 333
// 222 Promise 实例方法在所有同步任务结束后立刻执行
```

```js [例二<Badge>定时器</Badge>]
console.log(111);

setTimeout(() => console.log(222), 0); // [!code hl]
setTimeout(() => console.log(333), 1000); // [!code hl]

Promise.resolve().then(() => console.log(444));

console.log(555);

// 111
// 555
// 444 Promise 实例方法在所有同步任务结束后立刻执行
// 222 计时器异步延迟执行
// 333 计时器异步延迟执行
```

:::

::: details Promise.reject()
`Promise.reject()`创建 Promise 任务时，实例方法`catch()`内逻辑在所有同步任务结束后立刻执行
::: code-group

```js [例一]
console.log(111);

Promise.reject().catch(() => console.log(222));

console.log(333);

// 111
// 333
// 222 Promise 实例方法在所有同步任务结束后立刻执行
```

```js [例二<Badge>定时器</Badge>]
console.log(111);

setTimeout(() => console.log(222), 0); // [!code hl]
setTimeout(() => console.log(333), 1000); // [!code hl]

Promise.reject().catch(() => console.log(444));

console.log(555);

// 111
// 555
// 444 Promise 实例方法在所有同步任务结束后立刻执行
// 222 计时器异步延迟执行
// 333 计时器异步延迟执行
```

:::

## Promise 执行结果

Promise 任务执行结果的接收与处理时机取决于调用实例方法[`then()`](#then)、[`catch()`](#catch)

在 Promise 实例方法[链式调用](#链式调用)时，后续实例方法的参数会接收前一个实例方法返回的成功结果/抛出的失败错误

::: code-group

```js{0} [返回成功状态的实例]
// 1. 调用构造函数中 resolve()
const 成功状态的Promise实例 = new Promise((resolve) =>
  resolve(异步成功时的结果)
);

// 2. 调用 Promise.resolve()
const 成功状态的Promise实例 = Promise.resolve(异步成功时的结果);

// 3. 链式调用 Promise 实例 then() 时 return
Promise实例
  .then((res) => 异步成功时的结果)
  .then((res) => 异步成功时的结果)
  .then((res) => 异步成功时的结果);
```

```js{0} [返回成功失败的实例]
// 1. 调用构造函数中 reject()
const 失败状态的Promise实例 = new Promise((resolve, reject) =>
  reject(异步失败时的原因)
);

// 2. 调用 Promise.reject()
const 失败状态的Promise实例 = Promise.reject(异步失败时的原因);

// 3. 链式调用 Promise 实例 catch() 第二个参数时 throw Error
Promise实例
  .catch((error) => throw new Error(异步失败时的原因))
  .catch((error) => throw new Error(异步失败时的原因))
  .catch((error) => throw new Error(异步失败时的原因))

// 4. 链式调用 Promise 实例 then() 第二个参数时 throw Error
Promise实例
  .then(undefined, (error) => throw new Error(异步失败时的原因))
  .then(undefined, (error) => throw new Error(异步失败时的原因))
  .then(undefined, (error) => throw new Error(异步失败时的原因));
```

:::

## Promise 执行中止

详见 [AbortController](../web-apis/AbortController.md)

> 如下：预计耗时 4s 的 Promise 异步任务在 2s 时中止

```js{1-2,7-14}
const abortController = new AbortController();
setTimeout(() => abortController.abort(), 2000);

new Promise((resolve, reject) => {
  const timer = setTimeout(() => resolve("promise succeed"), 4000);

  abortController.signal.addEventListener(
    "abort",
    () => {
      clearTimeout(timer);
      reject("promise stopped");
    },
    { once: true }
  );
})
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
```

## 自定义 Promise

### PromiseLike 类型

> TS 内置类型，是 ES5 标准库中的一个 interface 接口，可理解为 ES6 正式提出 Promise 前的类似功能的实现

`PromiseLike`类型如其名，与`Promise`类型类似，可链式调用实例原型上的[`then()`](#then)方法，但没有[`catch()`](#catch)、[`finally()`](#finally)方法，异步任务失败的捕获只能通过`then()`方法的第二个参数

```ts
interface PromiseLike<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): PromiseLike<TResult1 | TResult2>;
}
```

### 手写 Promise

::: code-group

```js [定义]
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    const self = this;
    self.status = PENDING;
    self.data = undefined;
    self.callbacks = [];

    // 实现 Promise构造函数在调用时立即执行
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }

    function resolve(value) {
      if (self.status !== PENDING) return;
      self.status = RESOLVED;
      self.data = value;
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach((callback) => {
            callback.onResolved(value);
          });
        });
      }
    }
    function reject(reason) {
      if (self.status !== PENDING) return;
      self.status = REJECTED;
      self.data = reason;
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach((callback) => {
            callback.onRejected(value);
          });
        });
      }
    }
  }

  // Promise.prototype.then
  then(onResolved, onRejected) {
    const self = this;

    onResolved =
      typeof onResolved === "function" ? onResolved : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    return new MyPromise((resolve, reject) => {
      if (self.status === PENDING) {
        self.callbacks.push({
          onResolved(value) {
            handle(onResolved);
          },
          onRejected(reason) {
            handle(onRejected);
          },
        });
      } else if (self.status === RESOLVED) {
        setTimeout(() => handle(onResolved));
      } else if (self.status === REJECTED) {
        setTimeout(() => handle(onRejected));
      }

      function handle(callback) {
        try {
          const result = callback(self.data);
          if (result instanceof MyPromise) result.then(resolve, reject);
          else resolve(result);
        } catch (error) {
          reject(error);
        }
      }
    });
  }

  // Promise.prototype.catch
  catch(onRejected) {
    const self = this;
    return self.then(undefined, onRejected);
  }

  // Promise.then
  static resolve = function (value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) value.then(resolve, reject);
      else resolve(value);
    });
  };

  // Promise.reject
  static reject = function (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  };

  // Promise.all
  static all = function (promises) {
    const values = new Array(promises.length);
    let resolveCount = 0;
    return new MyPromise((resolve, reject) => {
      promises.forEach((p, i) => {
        MyPromise.resolve(p).then(
          (value) => {
            resolveCount++;
            values[i] = value;
            if (resolveCount === promises.length) resolve(values);
          },
          (reason) => reject(reason)
        );
      });
    });
  };

  // Promise.race
  // static race = function (promises) {
  //   return new MyPromise((resolve, reject) => {
  //     promises.forEach((p, i) => {
  //       MyPromise.resolve(p).then(
  //         (value) => resolve(value),
  //         (reason) => reject(reason)
  //       );
  //     });
  //   });
  // };

  // 在指定时间后才执行的 Promise.resolve
  // static resolveDelay = function (value, time) {
  //   return new MyPromise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (value instanceof MyPromise) value.then(resolve, reject);
  //       else resolve(value);
  //     }, time);
  //   });
  // };

  // 在指定时间后才执行的 Promise.reject
  // static rejectDelay = function (reason, time) {
  //   return new MyPromise((resolve, reject) => {
  //     setTimeout(() => {
  //       reject(reason);
  //     }, time);
  //   });
  // };
}
```

```js [调用]
function doSomethingAsync(condition) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if (condition) resolve("成功");
      else reject("失败");
    }, 2000);
  });
}

const p = doSomethingAsync(false)
  .then((resolve) => console.log(resolve))
  .catch((error) => console.log(error));
```

:::

## async...await...

::: tip 使用

- `async`定义函数
- `await`命令获取 Promise 实例返回值

:::

### async 函数

async 函数返回一个 Promise 对象

::: code-group

```js [写法一<Badge>普通函数</Badge>]
async function 函数(): Promise<函数返回值> {
  const 返回值 = await 异步函数();
  const 返回值 = await 异步函数();
  // return 返回值;
}

// 函数无返回值
async function 函数(): Promise<void> {}
```

```ts [写法二<Badge>箭头函数</Badge>]
const 函数 = async (): Promise<函数返回值> => {
  const 返回值 = await 异步函数();
  const 返回值 = await 异步函数();
  // return 返回值;
};

// 函数无返回值
const 函数 = async (): Promise<void> => {};
```

:::

---

### await 命令 <Badge type='danger'>FIXME</Badge>

::: code-group

```js [例子]
async function doSomething() {
  const a = await asyncFunction("aaa", 1000);
  const b = await asyncFunction("bbb", 2000);
  const c = await asyncFunction("ccc", 3000);
  console.log(a, b, c);
}

doSomething();
// 6s 后打印: "aaa" "bbb" "ccc"

function asyncFunction(result, delay) {
  return new Promise((resolve) => setTimeout(() => resolve(result), delay));
}
```

:::

---

### 顶层 await <Badge type='danger'>FIXME</Badge>

（ top-level await )
