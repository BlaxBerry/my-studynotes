# Express.js 相关

![](/images/express-js.webp)

## 简介

Express.js 是一个基于 Node.js 的轻量级 Web 框架

## 安装

```shell
npm install express
# 或
yarn add express
```

## 项目目录

```shell
|- 项目目录
  |- node_modules
  |- src
    |- ...
    |- 项目入口文件
  |- package.json
  |- ...
```

<details class="details custom-block">
  <summary>例子：</summary>

::: code-group

```ts [ES Module]
import express from "express";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Express Server running at http://localhost:${port}`);
});
```

```js [CommonJs]
const express = require("express");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Express Server running at http://localhost:${port}`);
});
```

:::

```shell
node 项目入口文件.js
```

</details>
