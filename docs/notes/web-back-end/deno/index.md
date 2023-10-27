---
prev: false
next: false
---

# Deno 相关

![](/images/deno.webp)

## 简介

Deno 是能够在服务器运行的基于 V8 引擎和 Rust 语言的 JavaScript 运行时，并且可以直接运行 TypeScript 和 WebAssembly

## 安装

> 本文为 Mac 环境下使用 [asdf](../../dev-tools/asdf/index.md)

```shell
# 1.
asdf plugin-add deno https://github.com/asdf-community/asdf-deno.git
# 2.
asdf install deno 版本
# 3.
asdf global deno 版本
# 4.
asdf reshim deno
# 5. 查看版本
deno --version
```

> 如下：本文使用 Deno v1.37.1

```shell
% deno --version
deno 1.37.1 (release, x86_64-apple-darwin)
v8 11.8.172.6
typescript 5.2.2
```

## 程序执行

```shell
deno run 文件.ts
```
