# JS Fetch API

https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API

https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html

## 简介

Fetch API 提供了获取资源的接口 ( 静态资源、跨网络通信 )

可理解为[`XMLHttpRequest`](XMLHttpRequest.md)的升级版

- 使用 Promise，不使用回调函数
- 通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用

## Headers

## Request

## Response

## fetch()

全局方法，用于发起获取资源的请求

返回值类型为[`Promise`类型](../async/promise.md#promise-t)

::: code-group

```js [使用]
fetch("URL")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

```ts [ts类型<Badge>完整版</Badge>]
declare function fetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response>;
```

:::

::: code-group

```ts [ts类型<Badge>完整版</Badge>]
type RequestInfo = Request | string;
```

```ts [ts类型<Badge>完整版</Badge>]
interface RequestInit {
  /** A BodyInit object or null to set request's body. */
  body?: BodyInit | null;
  /** A string indicating how the request will interact with the browser's cache to set request's cache. */
  cache?: RequestCache;
  /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
  credentials?: RequestCredentials;
  /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
  headers?: HeadersInit;
  /** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
  integrity?: string;
  /** A boolean to set request's keepalive. */
  keepalive?: boolean;
  /** A string to set request's method. */
  method?: string;
  /** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
  mode?: RequestMode;
  /** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
  redirect?: RequestRedirect;
  /** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
  referrer?: string;
  /** A referrer policy to set request's referrerPolicy. */
  referrerPolicy?: ReferrerPolicy;
  /** An AbortSignal to set request's signal. */
  signal?: AbortSignal | null;
  /** Can only be null. Used to disassociate request from any Window. */
  window?: null;
}
```

:::

### 错误处理

当遇到网络错误时，fetch() 返回的 promise 会被 reject，并传回 TypeError，虽然这也可能因为权限或其他问题导致。成功的 fetch() 检查不仅要包括 promise 被 resolve，还要包括 Response.ok 属性为 true。HTTP 404 状态并不被认为是网络错误。

### 请求中断

详见 [AbortController](./AbortController.md)

https://www.zhangxinxu.com/wordpress/2023/01/fetch-abortcontroller-abort-fetch-axios/

```js
const abortController = new AbortController();

fetch("https://catfact.ninja/fact", { signal: abortController.signal })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log({ error }));

// 立刻中断请求
abortController.abort(); // [!code hl]

// 设置一个定时器，指定延迟时间后后中断请求
setTimeout(() => abortController.abort();, 延迟时间毫秒); // [!code hl]

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

::: details 例子：

:::
