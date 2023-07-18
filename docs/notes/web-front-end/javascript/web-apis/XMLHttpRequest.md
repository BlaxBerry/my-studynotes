# JS XMLHttpRequest

https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest

## 请求中断

详见 [AbortController](./AbortController.md)

```js
const xhr = new XMLHttpRequest();

xhr.addEventListener("load", function (e) {
  console.log(this.responseText);
});
xhr.open("GET", "URL");
xhr.send();

setTimeout(() => {
  xhr.abort();
}, 10);
```
