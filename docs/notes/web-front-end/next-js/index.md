# Next.js 相关

![](/images/next.webp)

## 项目创建

```shell
npx create-next-app@latest
```

::: tip 安装配置选:

```shell
✔ What is your project named? 自定义项目名
# 是否安装使用 TS ( 默认推荐 Yes )
✔ Would you like to use TypeScript? No / Yes
# 是否安装使用 ESlint ( 默认推荐 Yes )
✔ Would you like to use ESLint? No / Yes
# 是否安装使用 Tailwind ( 默认推荐 Yes )
✔ Would you like to use Tailwind CSS? No / Yes
# 是否使用 src 目录存放源代码 ( 默认推荐 Yes )
✔ Would you like to use `src/` directory? No / Yes
# 是否使用应用路由 App Router ( 默认推荐 Yes )
✔ Would you like to use App Router?(recommended)  No / Yes
# 是否自定义引用名，默认为 @ ( 默认推荐 No )
✔ Would you like to customize the default import alias? No / Yes
```

:::

::: details 例子：

- 使用 TypeScript、ESLint、TailwindCSS
- 使用`src/`目录存放源代码
- 使用应用路由器 App Router
- 不使用自定义引用别名，使用默认`@`

```shell{2-8}
% npx create-next-app@latest
✔ What is your project named? 项目名
✔ Would you like to use TypeScript?  Yes
✔ Would you like to use ESLint?  Yes
✔ Would you like to use Tailwind CSS?  Yes
✔ Would you like to use `src/` directory?  Yes
✔ Would you like to use App Router?(recommended)  Yes
✔ Would you like to customize the default import alias?  No
Creating a new Next.js app in /项目路径/项目名.

Using npm.

Initializing project with template: app-tw


Installing dependencies:
- react
- react-dom
- next
- typescript
- @types/react
- @types/node
- @types/react-dom
- tailwindcss
- postcss
- autoprefixer
- eslint
- eslint-config-next


added 350 packages, and audited 351 packages in 31s

131 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Initialized a git repository.

Success! Created 项目名 at /项目路径/项目名
```

:::

```shell
npm run dev
```

::: details 例子：

项目默认开启在`3000`端口

```shell
% npm run dev

> next-demo@0.1.0 dev
> next dev

- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

:::

## 项目目录

```shell
|- .next
|- node_modules
|- public
|- src
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

::: details `package.json`

```json
{
  "name": "项目名",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@types/node": "20.4.4",
    "@types/react": "18.2.15",
    "@types/react-dom": "18.2.7",
    "autoprefixer": "10.4.14",
    "eslint": "8.45.0",
    "eslint-config-next": "13.4.12",
    "next": "13.4.12",
    "postcss": "8.4.27",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwindcss": "3.3.3",
    "typescript": "5.1.6"
  }
}
```

:::

::: details `.eslintrc.json`

```json
{
  "extends": "next/core-web-vitals"
}
```

:::

::: details `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
```

:::

::: details `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

:::

::: details `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
```

:::

::: details `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

:::

https://reffect.co.jp/react/next-js-13-app/

Next.js 中使用 CORS 处理跨域请求:
https://blog.logrocket.com/using-cors-next-js-handle-cross-origin-requests/

Next.js 中的 cookie:
https://blog.logrocket.com/guide-cookies-next-js/

layouts and nested layouts:
https://blog.logrocket.com/guide-next-js-layouts-nested-layouts/
