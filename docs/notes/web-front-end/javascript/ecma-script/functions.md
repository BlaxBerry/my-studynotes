# JS 函数

https://tsejx.github.io/javascript-guidebook/standard-built-in-objects/fundamental-objects/function/function/

## 函数类型

### 立即执行函数

IIFE (Immediately Invoked Function Expression)

### 内置对象方法函数

- Date
- Math
- Strings
- Arrays
- Objects

## this 指向

## 柯里化 ( Currying )

https://tsejx.github.io/javascript-guidebook/core-modules/ecmascript-function-objects/function-types/function-currying/

## 防抖（ Debounce ）

https://codefrontend.com/debounce-throttle-js-react/

防抖（ Debounce ）是一种常用的前端技术，用于控制函数在连续触发时执行的频率。当一个事件被连续触发时，防抖会在一定的时间延迟后执行最后一次触发的动作，从而避免频繁执行函数造成性能损耗或不必要的操作。

当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时

原理是利用计时器使立刻执行的逻辑稍微等待一下，

建议封装为通用函数，并通过`apply()`修改`this`指向和接收参数

```js
function debounce(func, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

::: tip 仅同时满足下列条件时才建议使用，否则适得其反降低用户体验

1. 频繁调用某个函数时
2. 函数多次调用时有效率低下问题
3. 函数多次调用，但仅需获取最后一次的执行结果

:::

::: details 例：`window.onresize`动态响应修改布局

页面变更时触发的`window.onresize`非常频繁，会导致导致函数不断被调用，导致很卡

::: code-group

```js [👎]
function setPageLayout() {
  /* 更改页面布局的逻辑 */
}

window.onresize = setPageLayout();
```

```js [👍]
function debounce(func, duration = 500) {
  let timerID;
  return function () {
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      func();
    }, duration);
  };
}

function setPageLayout() {
  /* 更改页面布局的逻辑 */
}

const debounce_setPageLayout = debounce(setPageLayout, 500);

window.onresize = debounce_setPageLayout;
```

:::

## 节流（ Throttle ）

https://www.xiaohongshu.com/explore/64bdd984000000001701920e

https://codefrontend.com/debounce-throttle-js-react/

当持续触发事件时，保证一定时间段内只调用一次事件处理函数

函数节流主要有两种实现方法：时间戳和定时器

## 闭包 ( Closure )

https://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html

https://www.xiaohongshu.com/explore/64687f7d00000000270109b8?app_platform=ios&app_version=7.85.2&share_from_user_hidden=true&type=video&xhsshare=WeixinSession&appuid=5f30c38f00000000010080f3&apptime=1684588184&wechatWid=7869e27a50c008cb39ad21f977b55165
