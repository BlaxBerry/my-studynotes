# Promise

## 简介

Promise 是 JavaScript 中解决异步编程的一种方案，由 ES6 提出

可替代以往回调函数和事件的异步任务处理方式，可有效解决回调深层嵌套时的回调地狱问题

::: tip

- [Promise 是个对象（构造函数）](#promise-对象)可简单理解为一个包裹异步任务的容器<br/>
- 调用该构造函数后其处理的异步任务会返回为一个[Promise 实例](#promise-实例)<br/>
- 该实例可通过链式调用指定 API 来对应处理异步任务所处的不同进程状态与执行结果<br/>

:::

> 如下：多用于不希望出现代码阻塞的耗时任务的处理

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

## Promise 实例

Promise 实例通过调用 [Promise 对象（构造函数）](#promise-对象)生成

**可理解为就是一个 Promise 处理异步操作**

该异步任务由 Promise 对象的 [executor 执行器函数](#executor-执行器函数) 定义，并通过 Promise 实例（原型）上的方法可对异步任务的不同的[执行状态](#执行状态)、[处理结果](#执行结果)进行对应处理

::: tip Promise 实例上的方法：

- [then()](#then)
- [catch()](#catch)
- [finally()](#finally)

:::

---

### 执行状态

> 即 Promise 对象（构造函数）所处理的异步任务所处的进程状态

Promise 实例（异步任务）只有 3 种执行状态，但同时只能处于一种状态

::: details Promise 异步处理的 3 种状态：

|   执行状态    |          含义          |
| :-----------: | :--------------------: |
|  **pending**  | 进行中（默认初始状态） |
| **fulfilled** |      异步处理成功      |
| **rejected**  |      异步处理失败      |

:::code-group

```js [pending]
const p1 = new Promise((resolve, reject) => {});
console.log(p1);
/*
[[Prototype]]: Promise
[[PromiseState]]: "pending"
[[PromiseResult]]: undefined
*/
```

```js [fulfilled ( resolved )]
const p2 = new Promise((resolve, reject) => resolve());
console.log(p2);
/*
[[Prototype]]: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: undefined
*/
```

```js [rejected]
const p3 = new Promise((resolve, reject) => reject());
console.log(p3);
/*
[[Prototype]]: Promise
[[PromiseState]]: "rejected"
[[PromiseResult]]: undefined
*/
```

:::

异步任务的状态随着异步任务执行只会改变一次：**要不成功、要不失败**

状态一旦改变就会被保留，不会再次变化

::: details Promise 异步处理状态的 2 种变化：

|     执行状态的变化      |     含义      |
| :---------------------: | :-----------: |
| **pending → fulfilled** | 进行中 → 成功 |
| **pending → rejected**  | 进行中 → 失败 |

> 状态一旦改变就会被保留，不会再次变化

```js
// 状态直接成为成功，不会再改变
const p1 = new Promise((resolve, reject) => {
  resolve();
  reject(); // 无效
});

// 状态直接成为失败，不会再改变
const p2 = new Promise((resolve, reject) => {
  reject();
  resolve(); // 无效
});
```

:::

::: details 改变 Promise 异步处理状态的 3 种方法：

<details class="details custom-block">
  <summary>1. executor 执行器函数中调用resolve()</summary>

异步任务处理的状态变为成功`fulfilled / resolved`

```js
const p = new Promise((resolve, reject) => {
  resolve();
});
```

</details>

<details class="details custom-block">
  <summary>2. executor 执行器函数中调用 reject()</summary>

异步任务处理的状态变为失败`rejected`

```js
const p = new Promise((resolve, reject) => {
  reject();
});
```

</details>

<details class="details custom-block">
  <summary>3. executor 执行器函数中通过 >throw 抛出异常</summary>

异步任务处理的状态变为失败`rejected`

```js
const p = new Promise((resolve, reject) => {
  throw { msg: "出错了" };
});
```

</details>
:::

---

### 执行结果

> 即 Promise 对象（构造函数）处理的异步任务成功或失败的结果

异步任务处理结束时若不指定返回值则默认为`undefined`

若向其 [executor 执行器函数](#executor-执行器函数) 中`resolve()`、`reject()`方法传入参数，则传入的参数会作为异步处理的对应状态的结果被外部接收

::: code-group

```ts [无返回值]
const 实例: Promise<void> = new Promise((resolve, reject) => {
  if(/*异步任务成功*/) resolve()
  else reject()
});
```

```ts [有返回值]
const 实例: Promise<返回值类型>  = new Promise((resolve, reject) => {
  if(/*异步任务成功*/) resolve(返回值)
  else reject()
});
```

:::

::: details 指定 Promise 异步处理结果返回值

- 异步处理状态为成功时：返回值为调用`resolve()`时传入的参数
- 异步状态为失败成功时：返回值为调用`reject()`时传入的参数
- 异步任务的的返回值默认为`undefined`
- 若调用`resolve()`、`reject()`时不传入参数，则对应异步处理状态的返回值为`undefined`

::: code-group

```js [成功时 ( resolved )]
// 有返回值
const p1 = new Promise((resolve, reject) => resolve("xxxx"));
console.log(p1);
/*
[[Prototype]]: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: "xxxx"
*/

// 无返回值
const p2 = new Promise((resolve, reject) => resolve());
console.log(p2);
/*
[[Prototype]]: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: undefined
*/
```

```js [失败时 ( rejected )]
// 有返回值
const p1 = new Promise((resolve, reject) => reject("xxxx"));
console.log(p1);
/*
[[Prototype]]: Promise
[[PromiseState]]: "rejected"
[[PromiseResult]]: "xxxx"
*/

// 无返回值
const p2 = new Promise((resolve, reject) => reject());
console.log(p2);
/*
[[Prototype]]: Promise
[[PromiseState]]: "rejected"
[[PromiseResult]]: undefined
*/
```

:::

异步任务的结果的处理，返回值仅可通过其生成的 Promise 实例上的方法获取

也可使用 [async...await...](./async-await.md) 使链式调用的异步任务变为按顺序执行同步任务

::: details 获取 Promise 异步处理结果的返回值

- 异步处理状态为成功时：返回值通过 [then()](#then) 方法参数接收
- 异步处理状态为失败时：返回值通过 [catch()](#catch) 方法参数接收

> 详见下文 `Promise.prototype.then()`、`Promise.prototype.catch()`

:::

---

### then() <Badge type="danger" text="FIXME" />

> Promise 实例上的方法，定义在原型对象上 `Promise.prototype.then()`

`then()`方法**在 Promise 实例状态改变时调用**

::: details then() 的参数：

接收两个回调函数作为参数

- 第一个参数`onfulfilled()`/`onresolved`：异步任务**成功**时执行
- 第二个参数`onrejected()`：异步任务**失败**时执行

> 第二个参数的回调函数常常省略，实际开发中异步失败时的处理多使用 [catch()](#catch)

```ts
interface Promise<T> {
  // ...
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

::: code-group

```ts [两个参数]
Promise实例.then(
  (resolved) => {
    /* 异步任务成功时执行 */
  },
  (error) => {
    /* 异任务失败时执行 */
  }
);
```

```ts [一个参数（常用）]
Promise实例.then((resolved) => {
  /* 异步任务成功时执行 */
}).catch((error) => {
  /* 异任务失败时执行 */
});
```

:::

::: details then() 的返回值：

`then()`方法可以有返回值

返回值会作为链式调用时下一个`then()`方法中第一个回调函数（异步任务成功时的`onresolved`）的参数

返回值需要是个 Promise 对象

若不通过默认是`undefined`

:::

---

### catch()

> Promise 实例上的方法，定义在原型对象上 `Promise.prototype.catch()`

`catch()` 方法

---

### finally()

> Promise 实例上的方法，定义在原型对象上 `Promise.prototype.finally()`

`finally()` 方法

## Promise 对象

Promise 对象是一个构造函数，用来生成 [Promise 实例](#promise-实例)

该构造函数内包裹要处理的异步任务，调用该构造函数生成的 Promise 实例可理解为一个异步操作

> Promise 对象调用等相关 [详见上文](#promise-实例)

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

是在调用 [Promise 对象（构造函数）](#promise-对象)创建 Promise 实例时必须传入的参数

**可理解为 executor 执行器函数的函数体就是 Promise 要处理异步任务**

executor 执行器函数在调用 Promise 构造函数生成实例时立即执行

定义时需要接收两个函数作为参数，分别在异步成功与失败时调用

<details class="details custom-block">
  <summary>两个参数：</summary>

::: code-group

```ts [方便理解版]
executor(
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void
): void
```

```ts [完整版]
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

::: details resolve()

`resolve()`需要在判定异步操作为成功时调用<br/>
调用时会将[异步任务的执行状态](#执行状态)从`未完成`变为`成功`（`pending`→`resolved`）

[异步任务的执行结果](#执行结果)（成功时）可作为参数在调用`resolve()`时传递出去<br/>
参数不是必须，默认`undefined`，不传递时默认 Promise 异步任务无返回值

::: code-group

```ts [无参数]
const 实例: Promise<void> = new Promise((resolve, reject) => {
  if(/*异步任务成功*/) resolve()
});
```

```ts [有参数]
const 实例: Promise<返回值类型> = new Promise((resolve, reject) => {
if(/*异步任务成功*/) resolve(返回值)
});
```

:::

::: details reject()

```ts [无参数]
const 实例: Promise = new Promise((resolve, reject) => {
if(/*异步任务失败*/) resject()
});
```

```ts [有参数]
const 实例: Promise = new Promise((resolve, reject) => {
if(/*异步任务失败*/) resject(原因)
});
```

:::

</details>

---

### Promise.resolve()

```js
const p = Promise.resolve(异步成功时的返回值);
// 等价于
const p = new Promise((resolve) => resolve(异步成功时的返回值));
```

---

### Promise.reject()

```js
const p = Promise.reject(异步失败时的返回值);
// 等价于
const p = new Promise((resolve, reject) => reject(异步失败时的返回值));
```

---

### Promise.all()

---

### Promise.race()

---

### Promise.any()

---

### Promise.try()

## PromiseLike 接口

> TS 内置类型，是 ES5 标准库中的一个 interface 接口，
>
> 可理解为 ES6 前的类 Promise 的实现

`PromiseLike`类型的对象可链式调用 `then()` 方法，但没有 `catch()`、`finally()` 方法，异步任务失败的捕获只能通过 `then()` 方法的第二个参数

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

## 手写 Promise 构造函数

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
  static rejectDelay = function (reason, time) {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject(reason);
      }, time);
    });
  };
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

## 异步的中断 abortControll <Badge type="danger" text="FIXME" />
