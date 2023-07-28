# Next.js 页面路由 ( Pages Router )

https://blog.logrocket.com/guide-next-js-layouts-nested-layouts/

## 简介

Next 13 之前采用路由方式

Pages Router 在项目创建时的配置

```shell
% npx create-next-app@latest
✔ What is your project named? 项目名
✔ Would you like to use TypeScript?  Yes
✔ Would you like to use ESLint?  Yes
✔ Would you like to use Tailwind CSS?  Yes
✔ Would you like to use `src/` directory?  Yes
✔ Would you like to use App Router?(recommended)  No  // [!code focus]
✔ Would you like to customize the default import alias?  No
```

## 目录结构

下划线开头的文件夹不会被解析为路由

```shell
|- .next
|- node_modules
|- public
  |- favicon.ico
|- src // [!code focus]
  |- pages // [!code focus]
    |- ... // [!code focus]
    |- api // [!code focus]
      |- ... // [!code focus]
  |- styles
    |- global.css
|- .eslintrc.json
|- .gitignore
|- next-env.d.ts
|- next.config.js
|- package-lock.json
|- package.json
|- postcss.config.js
|- README.md
|- tailwind.config.js
|- tsconfig.json
```
