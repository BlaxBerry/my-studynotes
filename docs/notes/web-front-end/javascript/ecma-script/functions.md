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

## 柯里化

https://tsejx.github.io/javascript-guidebook/core-modules/ecmascript-function-objects/function-types/function-currying/

## 防抖（ debounce ）

原理是利用计时器使立刻执行的逻辑稍微等待一下，

建议封装为通用函数，并通过`apply()`修改`this`指向和接收参数

```js
function debounce(func, duration) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, duration);
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

## 节流（ throttle ）
