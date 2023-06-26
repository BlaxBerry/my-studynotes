# JS ES Modules

## 简介

ES6 提出的 JavaScript 模块加载方案

主要由模块的[导入](#导入)**、**[导出](#导出)两部分组成

::: tip 想要使用 ES6 模块需要：

1. 配置项目`package.json`文件的`type`

```json
{
  /* ... */
  "type": "module", // [!code hl]
  "main": "入口文件.js"
}
```

2. HTML 文档中给`<script/>`标签添加`type="module"`属性

```html
<script type="module" src="模块路径"></script>
```

:::

## ES6 模块特点

::: details 一个文件就是一个模块
ES6 模块是一个独立的文件
:::

::: details 成员私有不公开
ES6 模块内部的所有成员无法从外部直接获取
:::

::: details 自动采用严格模式
无论是否在模块顶部添加`"use strict"`，ES6 的模块自动采用严格模式
:::

## 导出

::: tip 主要的导出方式

- [不导出任何成员](#无导出成员)
- [默认导出](#export-default)（导出默认的一个成员）
- [具名导出](#export)（导出指定的多个成员）
- [先导入后导出](#先导入后导出)

:::

---

### 无导出成员

ES 模块可以不导出任何成员

> 如下：模块在被导入时其内逻辑会直接执行

::: code-group

```js [导出]
console.log("1111");
console.log("2222");
```

```js [导入]
import "./output.js";

// "1111"
// "2222"
```

```[目录]
|- input.js
|- output.js
```

:::

---

### export

`export` 命令用于导出指定的模块成员

导入使用模块成员时必须知道其名称否则报错，详见下文 [import](#import)

::: code-group

```js [导出<Badge>写法一</Badge>]
export 模块成员;
export 模块成员;
export 模块成员;
```

```js{0} [导出<Badge>写法二</Badge>]
export {
  模块成员,
  /* 模块成员 as 自定义名 */,
  /* 模块成员 as default */,
};
```

```js [导入]
import { 模块成员, 模块成员 } from "./模块.js";
```

:::

::: details 如下：

::: code-group

```js [导出<Badge>写法一</Badge>]
export const a = 1;

export const b = () => {
  return a * 4;
};

export function c() {
  return a * 4;
}

export class d {
  constructor(xx) {
    this.xx = xx;
  }
}
```

```js [导出<Badge>写法二</Badge>]
const a = 1;

const b = () => {
  return a * 4;
};

function c() {
  return a * 4;
}

class d {
  constructor(xx) {
    this.xx = xx;
  }
}

export { a, b, c, d };
```

```js [导入]
import { a, b, c, d } from "./output.js";

console.log("a", a);
// a 1
console.log("b", b());
// b 4
console.log("c", c());
// c 4
console.log("d", new d("xxx").xx);
// d "xxx"
```

```[目录]
|- input.js
|- output.js
```

:::

::: tip 注意点

<details class="details custom-block">
  <summary>1. 必须顶层导出</summary>

`export` 命令必须出现在模块的顶层，否则报错

```js
(function () {
  export 成员;
})();
// [!code error] // SyntaxError: Unexpected token 'export'

function doSomething() {
  export 成员;
};
// [!code error] // SyntaxError: Unexpected token 'export'
```

</details>

:::

---

### export default

`export default` 命令用于给模块指定一个默认导出的成员

导入使用可指定任意名来接收该成员，详见下文 [import](#import)

::: code-group

```js [导出]
export default 模块成员;
```

```js [导入]
import 任意名 from "./模块.js";
```

:::

::: details 如下：

::: code-group

```js [导出<Badge>写法一</Badge>]
export default function doSomething() {
  console.log("xxxx");
}
```

```js [导出<Badge>写法二</Badge>]
function doSomething() {
  console.log("xxxx");
}

export default doSomething;
```

```js [导入]
import customFunction from "./output.js";

customFunction();
// "xxxx"
```

```[目录]
|- input.js
|- output.js
```

:::

::: tip 注意点：

<details class="details custom-block">
  <summary>1. 一个模块只能有一个默认输出</summary>

一个模块中只能有一个`export default`，否则报错

```js
const a = 1;
const b = 2;

export default a;
export default b; // [!code error] SyntaxError: Identifier '.default' has already been declared

```

</details>

<details class="details custom-block">
  <summary>2. 模块成员不同同时定义并导出</summary>

不能与[`export`](#export)命令那般同时定义并导出

因为`export default`命令其本质是是输出一个叫做`default`的变量，并将后面的值赋给该变量，详见下文[`import`整体导入](#import)

```js
import * as 自定义名 from "模块路径";
console.log(自定义名.default);
```

</details>

<details class="details custom-block">
  <summary>2. 仅非匿名函数可同时定义并导出</summary>

有个例外就是非匿名函数，可同时定义并导出

```js
export default function xxx() {
  // do something
  // return something
}
```

</details>

:::

### 先导入后导出

::: code-group

```js [导入后直接导出]
export { 模块成员, 模块成员 } from "模块路径";

export * from "模块路径";
```

```js [导入后改名并导出]
export { 模块成员 as 导出名 } from "模块路径";

export { default as 导出名 } from "模块路径";
```

:::

::: details 如下： `a.js` → `b.js` → `c.js`

::: code-group

```js [c.js]
import { bObj, bFunc } from "./b.js";

console.log(bObj); // { name: 'Andy', age: 28 }
bFunc(); // "xxxx"
```

```js [b.js]
export { aFunc as bFunc } from "./a.js";
export { default as bObj } from "./a.js";
```

```js [a.js]
export function aFunc() {
  console.log("xxxx");
}
export default {
  name: "Andy",
  age: 28,
};
```

```js[目录]
|- a.js
|- b.js
|- c.js
```

:::

## 导入

::: tip 主要的导入方式

- 静态加载：[`import` 命令](#import)
- 动态加载：[`import()` 方法](#import-1)

:::

---

### import

::: tip 主要的导入方式

- [仅导入默认导出的成员](#import-x-from)
- [仅导入指定的模块成员](#import-a-b-from)
- [同时导入默认导出的成员 + 指定的模块成员](#import-x-a-b-from)
- [整体加载所有导出的成员](#import-from)

:::

::: warning 模块路径

导入模块时需要指明目标模块的包含文件后缀名的具体路径<br/>
当然在前端项目中可通过构建工具 / TS 配置来省略路径、文件后缀名

:::

---

### import x from

仅导入默认导出的成员

```js
import 自定义名 from "模块路径";
```

---

### import { a, b } from

仅导入指定的模块成员

```js
import { 模块成员, 模块成员 } from "模块路径";
```

---

### import x, { a, b } from

同时导入默认导出的成员 + 指定的模块成员

```js
import 自定义名, { 模块成员, 模块成员 } from "模块路径";
```

---

### import \* from

整体加载所有导出的成员

以一个对象形式接收目标模块的全部成员，`export`导出的模块成员名为该对象的属性名，`export default`导出的模块成员为该对象上`default`熟悉的值

::: code-group

```js [仅加载]
import * from "模块路径";
```

```js [指定接收名后加载]
import * as 自定义名 from "模块路径";

console.log(自定义名);
/*
{
  [导出成员?]: something,
  [default?]: something,
}
*/
```

:::

::: details 如下：

::: code-group

```js [导入]
import * as outputtedModule from "./output.js";

console.log("default", outputtedModule.default);
// default 1
console.log("b", outputtedModule.b());
// b 4
console.log("c", outputtedModule.c());
// c 4
console.log("d", new outputtedModule.d("xxx").xx);
// d "xxx"
```

```js [导出]
const a = 1;

const b = () => {
  return a * 4;
};

function c() {
  return a * 4;
}

class d {
  constructor(xx) {
    this.xx = xx;
  }
}

export { a as default, b, c, d };
```

```[目录]
|- input.js
|- output.js
```

:::

---

### import( )

利用 [Promise](../async/promise.md) 实现模块的动态按需加载

模块加载成功以后，会以一个对象形式接收该模块内所有成员

```js
import("模块").then((module) => console.log(module));

/*
{
  [导出成员?]: something,
  [default?] something,
}
*/
```

::: tip 主要的导入方式

<details class="details custom-block">
  <summary>1. 按需加载模块</summary>

尤其可用于导入一些很大的第三方库，比如通过 [ExcelJS](https://www.npmjs.com/package/exceljs) 读写 Excel、CSV 文件等

> 如下，触发点击事件后才导入某一个模块

```js
button.addEventListener('click', (event) => {
  import('module').then(...).catch(...);
});
```

</details>

<details class="details custom-block">
  <summary>2. 条件加载模块</summary>

```js
if (condition) {
  import('moduleA').then(...).catch(...);
} else {
  import('moduleB').then(...).catch(...);
}
```

</details>

<details class="details custom-block">
  <summary>3. 同时加载多个模块</summary>

详见 [`Promise.all()`](../async/promise.md#promise-all)

```js{0}
Promise.all([import("moduleA"), import("moduleB"), import("moduleC")])
  .then(([module1, module2, module3]) => {/* */})
  .catch((error) => => {/* */})
  .finally(() => => {/* */});
```

</details>

:::

---

### await import()

利用 [顶层`await`](../async/async-await.md#顶层-await) 实现 Promise 异步转同步动态加载模块

```js
const 模块 = (await import("路径")).default;

console.log(模块);
/*
{
  [导出成员?]: something,
  [default?] something,
}
*/
```

::: details 如下： React 中顶层导入 CSS-in-JS 的样式文件成员

::: code-group

```tsx [导入]
import React from "react";
const styles = (await import("styles/common.ts")).default;

export default function Component() {
  return <div style={{ color: styles.color, height: styles.height }} />;
}
```

```ts [导出]
export default {
  color: "red",
  height: 100,
};
```

:::

::: details 如下：React 中组件加载完毕时 import 导入样式文件

```tsx
import { useEffect } from "react";

export default function Component() {
  useEffect(() => {
    (async () => {
      try {
        await import("styles/index.scss");
      } catch {
        console.error("模块加载失败");
      }
    })();
  }, []);

  return <></>;
}
```

:::

## 浏览器环境下的异步加载 <Badge type="danger">FIXME</Badge>

https://es6.ruanyifeng.com/#docs/module-loader

默认情况下浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到`<script>`标签就会停下来，等到执行完脚本，再继续向下渲染

所以如果脚本体积很大或者是外部脚本时，加载与下载会大量耗时，容易造成浏览器堵塞卡死

```html
<script async src="模块路径"></script>
```

```html
<script defer src="模块路径"></script>
```

- defer（渲染完再执行）

  - 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成）才会执行
  - 如果有多个 defer 脚本，会按照它们在页面出现的顺序加载

- async（下载完就执行）
  - 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染
  - 如果有多个 async 脚本是不能保证加载顺序
