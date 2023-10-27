---
prev: false
next: false
---

# Node.js 相关

![](/images/node-js.webp)

## 简介

Node.js 是能够在服务器端运行的基于 V8 引擎的 JavaScript 运行时

## 安装

> 本文为 Mac 环境下使用 [asdf](../../web-others/web-dev-tools/asdf/index.md)

```shell
# 1.
asdf plugin add nodejs
# 2.
asdf install nodejs 版本
# 3.
asdf global nodejs 版本
# 4.
asdf reshim nodejs
# 5. 查看版本
node --version
```

> 如下：本文使用 Node.js v18.18.0

```shell
% node --version
v18.18.0
```

## 程序执行

```shell
node 文件.js
```

::: tip nodemon

::: code-group

```shell [全局安装]
npm install -g nodemon
# 或
yarn global add nodemon
```

```shell [局部安装]
npm install --save-dev nodemon
# 或
yarn add -D nodemon
```

:::

<br/>

WebAssembly：https://mp.weixin.qq.com/s/cIqijFUuy_k0oISfqphUag

https://mp.weixin.qq.com/s/mHVFHLTM1Cs07peemFoVxA

Node.js 服务器端身份验证：令牌与 JWT:
https://blog.logrocket.com/node-js-server-side-authentication-tokens-vs-jwt/

TS + nodejs：
https://www.robinwieruch.de/typescript-node/
