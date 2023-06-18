# JS AbortController

https://segmentfault.com/a/1190000042447341

https://blog.csdn.net/qq_45560350/article/details/130588101

## 简介

AbortController 是个控制器对象，可按需实现中止一个或多个 Web 请求 / 监听事件

::: tip 基本使用

- 通过构造函数实例获取 [AbortController 实例](#abortcontroller-实例)
- 调用实例方法中止 web 请求

:::

> 如下：

::: details 例：定时器中止一个基础的 Promise 任务

> 预计耗时 4s 的 Promise 异步任务在 2s 时中止

```js{1-2,7-14}
const abortController = new AbortController();
setTimeout(() => abortController.abort(), 2000);

new Promise((resolve, reject) => {
  const timer = setTimeout(() => resolve("success"), 4000);

  abortController.signal.addEventListener(
    "abort",
    () => {
      clearTimeout(timer);
      reject("stop");
    },
    { once: true }
  );
})
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
```

:::

::: details 例：React 组件内中止 Fetch 请求

```js
import React from "react";

const abortController = new AbortController();

export default function Component() {
  const fetchData = () =>
    fetch("https://catfact.ninja/fact", { signal: abortController.signal })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log({ error }));
  /*
    {
      error: {
        code: 20
        message: "The user aborted a request."
        name: "AbortError"
      }
    }
  */

  return (
    <div>
      <button onClick={fetchData}>Start Fetch</button>
      <button onClick={() => abortController.abort()}>Abort Fetch</button>
    </div>
  );
}
```

:::

## AbortController 实例

通过构造函数创建 AbortController 实例

AbortController 实例包含一个对象属性[`signal`](#abortcontrollersignal)、一个方法[`abort()`](#abortcontrollerabort)

::: code-group

```js [创建实例]
const abortController = new AbortController();
```

```ts [TS类型<Badge>完整版</Badge>]
/** A controller object that allows you to abort one or more DOM requests as and when desired. */
interface AbortController {
  /** Returns the AbortSignal object associated with this object. */
  readonly signal: AbortSignal;
  /** Invoking this method will set this object's AbortSignal's aborted flag and signal to any observers that the associated activity is to be aborted. */
  abort(reason?: any): void;
}
```

:::

## abortController.signal

[AbortController 实例](#abortcontroller-实例)上的属性

`signal`是个对象包含三个属性

::: code-group

```ts [TS类型<Badge>方便理解版</Badge>]
{
  aborted,
  reason,
  onabort,
};
```

```ts [TS类型<Badge>完整版</Badge>]
/** A signal object that allows you to communicate with a DOM request (such as a Fetch) and abort it if required via an AbortController object. */
interface AbortSignal extends EventTarget {
  /** Returns true if this AbortSignal's AbortController has signaled to abort, and false otherwise. */
  readonly aborted: boolean;
  readonly reason: any;
  onabort: ((this: AbortSignal, ev: Event) => any) | null;
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

## abortController.abort()

[AbortController 实例](#abortcontroller-实例)上的方法，用于中止一个尚未完成的 web 请求

实例方法`abort()`被调用时会触发并修改发实例属性[`signal`](#abortcontrollersignal)上的方法与属性

1. 会触发实例属性的方法`signal.abort()`
2. 并改变实例属性中的属性`signal.aborted`的值为`true`
