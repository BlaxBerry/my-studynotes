# JS AbortController

https://segmentfault.com/a/1190000042447341

https://blog.csdn.net/qq_45560350/article/details/130588101

## 简介

AbortController 控制器对象可用于实现中止一个 / 多个 Web 请求 / 监听事件

::: tip 基本

- 通过调用构造函数得到一个控制器实例<br/>
- 控制器实例上的`signal`属性<br/>
- 控制器实例上的`abort`方法

:::

---

### new AbortSignal()

通过调用构造函数可获取一个 AbortController 控制器实例

AbortController 实例包含一个对象属性[`signal`](#signal)、一个方法[`abort()`](#abort)

::: code-group

```js [使用]
const controllerInstance = new AbortController();
```

```js [实例打印结果]
console.log(controllerInstance);
/*
{
  signal: {
    aborted: false,
    onabort: null,
    reason: undefined,
    [[Prototype]]: {
      aborted: false,
      onabort: null,
      reason: undefined,
      throwIfAborted: Function
    }
  },
  [[Prototype]]: {
      abort: Function
    }
}
*/
```

```ts [TS类型<Badge>完整版</Badge>]
/**
 * A controller object that allows you to abort one or more DOM requests as and when desired.
 */
interface AbortController {
  /**
   * Returns the AbortSignal object associated with this object.
   */
  readonly signal: AbortSignal;
  /**
   * Invoking this method will set this object's AbortSignal's aborted flag and signal to any observers that the associated activity is to be aborted.
   */
  abort(reason?: any): void;
}
```

:::

## 实例属性 signal

`signal`是个对象包含三个属性

::: code-group

```ts [TS类型<Badge>方便理解版</Badge>]
interface AbortSignal {
  readonly aborted: boolean;
  readonly reason: any;
  onabort: ((this: AbortSignal, ev: Event) => any) | null;
}
```

```ts [TS类型<Badge>完整版</Badge>]
/** A signal object that allows you to communicate with a DOM request (such as a Fetch) and abort it if required via an AbortController object. */
interface AbortSignal extends EventTarget {
  /** Returns true if this AbortSignal's AbortController has signaled to abort, and false otherwise. */
  readonly aborted: boolean;
  onabort: ((this: AbortSignal, ev: Event) => any) | null;
  readonly reason: any;
  throwIfAborted(): void;
  addEventListener<K extends keyof AbortSignalEventMap>(
    type: K,
    listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof AbortSignalEventMap>(
    type: K,
    listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}
```

:::

::: details 例：控制一个请求任务

::: code-group

```js [fetch]
const abortController = new AbortController();

fetch("URL", { signal: abortController.signal })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log({ error }));
```

```js [Promise]
const abortController = new AbortController();

new Promise((resolve, reject) => {
  if (signal.aborted) reject(signal.reason);
  abortController.signal.addEventListener("abort", () => reject(signal.reason));
})
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
```

:::

::: details 例：控制多个请求任务

> 如下：用一个 Controller 控制一组`fetch()`任务

```js{0}
const jobs = [
  "URL_A",
  "URL_B",
  "URL_C",
].map((url) =>
  fetch(url, { signal: abortController.signal })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
);

Promise.all(jobs)
  .then((results) => console.log(results))
  .catch((error) => console.log(error));
```

:::

---

### aborted()

表示是否终止，默认值为`false`

```js

```

---

### onabort()

```js

```

---

### reason

```js

```

---

### 监听事件

## 实例方法 abort()

调用实例方法中止 web 请求

实例方法`abort()`被调用时会触发并修改发实例属性[`signal`](#abortcontrollersignal)上的方法与属性

1. 会触发实例属性的方法`signal.abort()`
2. 并改变实例属性中的属性`signal.aborted`的值为`true`

::: details 例：中断一个 Promise 任务

```js
const abortController = new AbortController();

// 生成一个预计耗时 4s 的 Promise 异步任务
new Promise((resolve, reject) => {
  const timer = setTimeout(() => resolve("success"), 4000);

  abortController.signal.addEventListener("abort", () => {
    clearTimeout(timer);
    reject("stop");
  });
})
  .then((res) => console.log(res))
  .catch((error) => console.log(error));

// 立刻中断请求
abortController.abort(); // [!code hl]

// 设置一个定时器，在 2s 后中断 Promise 异步任务
setTimeout(() => abortController.abort(), 2000); // [!code hl]
```

:::

::: details 例：中断一个`fetch()`请求

```js
const abortController = new AbortController();

fetch("https://catfact.ninja/fact", { signal: abortController.signal })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log({ error }));

// 立刻中断请求
abortController.abort(); // [!code hl]

// 设置一个定时器，10ms 后中断请求
setTimeout(() => abortController.abort();, 10); // [!code hl]
```

:::

```js
// 中断后抛出的异常错误
/*
    {
      error: {
        code: 20
        message: "The user aborted a request."
        name: "AbortError"
      }
    }
*/
```
