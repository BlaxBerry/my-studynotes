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

**executor 执行器函数体就是由 Promise 处理的异步任务**

**executor 执行器函数在调用`new Promise()`时会立即执行**

需要接收两个函数作为参数 ( 由 JS 提供不用自己部署 )，调用时会修改 Promise 异步任务的状态

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

::: details 第一个函数参数`resolve()`

- 调用 executor 执行器函数的第一个函数参数会使异步任务状态变为成功
  > `pending` → `fulfilled` ( resolved )
- 若异步任务成功时有结果，可在调用时作为参数导出供外部获取<br/>
  结果的获取详见实例方法 [then()](#then)
- 作用等价于 Promise 对象方法 [Promise.resolve()](#promise-resolve)

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
  结果的获取详见实例方法 [then()](#then)、[catch()](#catch)

- 作用等价于 Promise 对象方法 [Promise.reject()](#promise-reject)

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
- **方法二**：使用 Promsie 实例方法[`catch()`](#catch)

::: code-group

```js [方法一]
async function getPromsieInstance() {
  return new Promise((resolve, reject) => reject());
}

try {
  const promiseInstance = await getPromsieInstance();
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

即异步任务成功时需调用第一个参数，失败时需调用第二个参数

### Promise.resolve()

用于生成一个成功状态的 Promise 实例

等价于 [executor 执行器函数](#executor-执行器函数) 的第一个函数参数 **`resolve()`**

```js
const 成功状态的Promise实例 = Promise.resolve(异步成功时的返回值);
// 等价于
const 成功状态的Promise实例 = new Promise((resolve) =>
  resolve(异步成功时的返回值)
);
```

---

### Promise.reject()

用于生成一个失败状态的 Promise 实例

等价于 [executor 执行器函数](#executor-执行器函数) 的第二个函数参数 **`reject()`**

```js
const 失败状态的Promise实例 = Promise.reject(异步失败时的返回值);
// 等价于
const 失败状态的Promise实例 = new Promise((resolve, reject) =>
  reject(异步失败时的返回值)
);
```

---

### Promise.all()

---

### Promise.race()

---

### Promise.any()

ES2021 引入

参数：

参数接收一组 Promise 实例（ 异步任务 ）

返回值：

返回一个新的 Promise 实例，可使用[实例原型上的方法](#promise-实例)

返回值状态：

参数中 Promise 实例只要有一个变为了 fulfilled，则返回的 Promise 实例为 fulfilled

参数中 Promise 实例只有全变为 rejected 时返回的 Promise 实例才为 rejected

```js
const Promise实例 = Promise.any(Promise实例1, Promise实例2, Promise实例3);
```

---

### Promise.try()

## Promise 实例

**Promise 实例可理解为就是由 Promise 处理的异步任务**

::: tip Promise 实例有三种方式生成：

1. 实例化构造函数 [new Promise()](#promise-对象)
2. 通过 [Promise.resolve()](#promise-resolve)
3. 通过 [Promise.reject()](#promise-reject)

:::

Promise 实例上定义的方法可对该异步任务所处的不同[执行状态](#promise-执行状态)、[处理结果](#promise-执行结果)进行对应处理。各个实例方法的返回值为一个新的 Promise 实例，因此方法返回值仍可使用 Promise 实例原型上的方法（ [链式调用](#链式调用) ）

::: tip Promise 实例上的方法：

- [then()](#then)
- [catch()](#catch)
- [finally()](#finally)

:::

---

### then() <Badge type="danger" text="FIXME" />

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

::: details 两个回调函数参数的执行时机：

`then()`方法的两个回调函数参数分别在 Promise 处理的异步任务**成功、失败**时自动执行：

- **异步成功时**：第一个回调函数
- **异步失败时**：第二个回调函数

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

::: details 两个回调函数参数接收的参数：

:::

---

### catch()

> Promise 实例上的方法
>
> 定义在原型对象上 `Promise.prototype.catch()`

`catch()`方法会在 Promise 实例状态失败自动调用执行

作用等价于 [then()](#then) 方法的第二个回调函数参数

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

```ts{0}
const promiseInstance = new Promise((_, reject) => {
  reject(new Error("111"));
});

promiseInstance
  .catch<Promise<Error>>((error: Error) => {
    console.log(error.message);
    throw new Error("222");
  })
  .catch<Promise<Error>>((error: Error) => {
    console.log(error.message);
    throw new Error("333");
  })
  .catch<void>((error) => {
    console.log(error.message);
  });
```

---

### finally()

> Promise 实例上的方法
>
> 定义在原型对象上 `Promise.prototype.finally()`

`finally()`方法会在 Promise 实例的所有[then()](#then)、[catch()](#catch)方法结束自动调用执行

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

因为 Promise 实例方法的返回值是个新的 Promise 实例

所以返回值任可使用实例原型上的方法

## Promise 执行状态

即 Promise 所处理的异步任务（[Promise 实例](#promise-实例)）所处的进程状态

Promise 处理的异步任务只有 3 种执行状态，同时只能处于一种状态

|   执行状态    |          含义          |
| :-----------: | :--------------------: |
|  **pending**  | 进行中（默认初始状态） |
| **fulfilled** |      异步处理成功      |
| **rejected**  |      异步处理失败      |

随着异步任务的执行 Promise 状态只会改变一次：**要不成功、要不失败**

|       执行状态的变化        |     含义      |
| :-------------------------: | :-----------: |
| **pending** → **fulfilled** | 进行中 → 成功 |
| **pending** → **rejected**  | 进行中 → 失败 |

::: tip 改变 Promise 状态（获取对应状态的 Promise 实例）的方法：

<details class="details custom-block">
  <summary>变为成功状态 ( 获取成功状态的实例 )</summary>

1. 调用 [Promise.resolve()](#promise-resolve)

```js
const succeedPromiseInstance = Promise.resolve();
```

2. 调用 [Executor 执行器函数](#executor-执行器函数) 的第一个参数`resolve()`

```js
const succeedPromiseInstance = new Promise((resolve) => resolve());
```

</details>
<details class="details custom-block">
  <summary>变为失败状态 ( 获取失败状态的实例 )</summary>

1. 调用 [Promise.reject()](#promise-reject)

```js
const failedPromiseInstance = Promise.reject();
```

2. 调用 [Executor 执行器函数](#executor-执行器函数) 的第二个参数`reject()`

```js
const failedPromiseInstance = new Promise((resolve, reject) => reject());
```

3. [Executor 执行器函数](#executor-执行器函数) 内`throw`一个错误对象

```js
const failedPromiseInstance = new Promise((resolve, reject) => {
  throw new Error();
});
```

</details>

:::

::: danger 报错 UnhandledPromiseRejection

**executor 执行器函数内直接调用`reject()`或`throw`错误对象时**，会报错没有捕获异常 Promise Rejection

```js
new Promise((resolve, reject) => reject()); // [!code error]
// [UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "undefined".] { code: 'ERR_UNHANDLED_REJECTION' }

new Promise(() => { throw new Error()}); // [!code error]
// throw new Error()
          ^
Promise.reject(); // 不报错
```

解决方法如报错信息所写的两个方法：

- **方法一**：使用[`try...catch...`](../ecma-script/error-exception.md#trycatch)+[`await...await...`](async-await.md)
- **方法二**：使用 Promsie 实例方法[`catch()`](#catch)

::: code-group

```js [方法一]
async function doSomethingAsync() {
  return new Promise((resolve, reject) => reject());
}

try {
  await doSomethingAsync();
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

```js [方法三<Badge>不常用</Badge>]
const promiseInstance = new Promise((resolve, reject) => reject());

promiseInstance.then(undefined, () => {
  /* 错误捕获与处理 */
});
```

:::

## Promise 执行结果

变成 Promise 实例[链式调用](#链式调用)时后续实例方法的参数

```js
const 成功状态的Promise实例 = new Promise((resolve) =>
  resolve(异步成功时的结果)
);
const 成功状态的Promise实例 = Promise.resolve(异步成功时的结果);

const 失败状态的Promise实例 = new Promise((resolve, reject) =>
  reject(异步失败时的原因)
);
const 失败状态的Promise实例 = Promise.reject(异步失败时的原因);
```

## Promise 执行中断

详见 [AbortController](../web-apis/AbortController.md)

## Promise 转同步执行

详见 [async...await...](./async-await.md)

## 自定义 Promise

### PromiseLike 类型

> TS 内置类型，是 ES5 标准库中的一个 interface 接口，可理解为 ES6 正式提出 Promise 前的类似功能的实现

`PromiseLike`类型如其名，与`Promise`类型类似，可链式调用实例原型上的[then()](#then)方法，但没有[catch()](#catch)、[finally()](#finally)方法，异步任务失败的捕获只能通过`then()`方法的第二个参数

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
