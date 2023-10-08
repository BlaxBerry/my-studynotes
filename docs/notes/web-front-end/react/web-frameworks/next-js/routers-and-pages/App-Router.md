# Next.js 应用路由 ( App Router )

https://blog.logrocket.com/guide-next-js-layouts-nested-layouts/

https://codezine.jp/article/detail/17925

## 简介

Next 13 新增的路由

App Router 在项目创建时的配置

```shell
% npx create-next-app@latest
✔ What is your project named? 项目名
✔ Would you like to use TypeScript?  Yes
✔ Would you like to use ESLint?  Yes
✔ Would you like to use Tailwind CSS?  Yes
✔ Would you like to use `src/` directory?  Yes
✔ Would you like to use App Router?(recommended)  Yes  // [!code focus]
✔ Would you like to customize the default import alias?  No
```

## 目录结构

App Router 约定目录结构

下划线开头的文件夹不会被解析为路由

```shell [App Router <Badge>推荐</Badge>]
|- .next
|- node_modules
|- public
|- src // [!code focus]
  |- app // [!code focus]
      |- 路由名 // [!code focus]
        |- layout.tsx // [!code focus]
        |- error.tsx // [!code focus]
        |- page.tsx // [!code focus]
        |- loading.tsx // [!code focus]
    |- favicon.ico
    |- globals.css
    |- ...
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

---

### page.tsx

`page.tsx`文件是当前路由对应的主页面

嵌套在[`layout.tsx`](#layout-tsx)中

::: code-group

```shell [目录]
|- src // [!code focus]
  |- app // [!code focus]
    |- 路由名 // [!code focus]
      |- page.tsx // [!code focus]
      |- 子路由名
        |- page.tsx
    |- page.tsx
```

```tsx [page.tsx]
import React from "react";

export default function Page() {
  return <div>页面展示内容</div>;
}
```

:::

::: details 例子：

::: code-group

```shell [目录]
|- src
  |- app
    |- a
      |- page.tsx
    |- b
      |- page.tsx
    |- page.tsx
```

```tsx [app/page.tsx]
import React from "react";

export default function HomePage() {
  return <div>Home Page</div>;
}
```

```tsx [app/a/page.tsx]
import React from "react";

export default function APage() {
  return <div>A page</div>;
}
```

```tsx [app/b/page.tsx]
import React from "react";

export default function BPage() {
  return <div>B page</div>;
}
```

:::

---

### layout.tsx

不是必须

`layout.tsx`文件当前路由对应页面的布局模版组件

用于包裹通过`props.children`接收的[`page.tsx`](#page-tsx)

::: code-group

```shell [目录]
|- src // [!code focus]
  |- app // [!code focus]
    |- 路由名 // [!code focus]
      |- page.tsx // [!code focus]
      |- layout.tsx // [!code focus]
      |- 子路由名
        |- page.tsx
        |- layout.tsx
    |- page.tsx
    |- layout.tsx
```

```tsx [layout.tsx]
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <div>{children}</div>;
}
```

:::

::: details 例子：兄弟路由

::: code-group

```shell [目录]
|- src
  |- app
    |- a
      |- page.tsx
      |- layout.tsx
    |- b
      |- page.tsx
      |- layout.tsx
    |- ...
```

```tsx [a/layout.tsx]
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function APageLayout({ children }: Props) {
  return <div className="p-4 bg-red-500 text-white">{children}</div>;
}
```

```tsx [a/page.tsx]
import React from "react";

export default function APage() {
  return <div>A page</div>;
}
```

```tsx [b/layout.tsx]
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function BPageLayout({ children }: Props) {
  return <div className="p-4 bg-green-500 text-white">{children}</div>;
}
```

```tsx [b/page.tsx]
import React from "react";

export default function BPage() {
  return <div>B page</div>;
}
```

:::

::: details `loading.tsx`

:::

::: details `error.tsx`

Error components must be Client Components

:::

## 路由映射

`app/`目录下的每个文件夹名对应一个路由 / 子路由，并映射到对应的 URL 路径中

| URL                    | 路由 ( 目录 )                          |
| ---------------------- | -------------------------------------- |
| `/`                    | `src/app/page.tsx`                     |
| `/[路由名]`            | `src/app/[路由名]/page.tsx`            |
| `/[路由名]/[子路由名]` | `src/app/[路由名]/[子路由名]/page.tsx` |

```shell
|- src
  |- app
    |- 路由名
      |- page.tsx
      |- 子路由名
        |- page.tsx
    |- page.tsx
```

::: details 例子：

| URL     | 路由 ( 目录 )           |
| ------- | ----------------------- |
| `/`     | `src/app/page.tsx`      |
| `/a`    | `src/app/a/page.tsx`    |
| `/b`    | `src/app/b/page.tsx`    |
| `/b/bb` | `src/app/b/bb/page.tsx` |

::: code-group

```shell [目录]
|- src
  |- app
    |- a
      |- page.tsx  # /a
    |- b
      |- page.tsx  # /b
      |- bb
        |- page.tsx  # /b/bb
    |- page.tsx  # /
    |- ...
```

:::

## 动态路由

```shell
|- src
  |- app
    |- [动态路由名]
      |- page.tsx
      |- ...
```

动态路由名 ( 目录名 ) 以`params["动态路由名"]`的形式被页面`params`参数获取

::: details 方法 1：路由参数`props.params`获取

::: code-group

```shell [目录]
|- src
  |- app
    |- [动态路由名]
      |- page.tsx
      |- layout.tsx
```

```tsx [layout.tsx]
import React from "react";

interface Props {
  children: React.ReactNode;
  params: { 动态路由名: string };
}

export default function DynamicPageLayout({ children, params }: Props) {
  console.log(params.动态路由名);

  return <div>{children}</div>;
}
```

```tsx [page.tsx]
import React from "react";

interface Props {
  params: { 动态路由名: string };
}

export default function DynamicPage({ params }: Props) {
  console.log(params.动态路由名); // 服务器终端打印

  return <div>{params.动态路由名}</div>;
}
```

:::

::: details 方法 2：客户端方法`useParams()`获取

::: code-group

```shell [目录]
|- src
  |- app
    |- [动态路由名]
      |- page.tsx
      |- layout.tsx
```

```tsx [layout.tsx]
"use client";

import React from "react";
import { useParams } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function DynamicPageLayout({ children }) {
  const params = useParams();

  console.log(params[动态路由名]); // 浏览器、服务器终端打印

  return <div>{children}</div>;
}
```

```tsx [page.tsx]
"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function DynamicPage() {
  const params = useParams();

  console.log(params[动态路由名]); // 浏览器、服务器终端打印

  return <div>{params[动态路由名]}</div>;
}
```

:::

## 路由参数

```tsx
import type { NextPage, GetStaticProps } from "next";
```

### useParams

客户端方法

```tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function DynamicPage() {
  const params = useParams();

  console.log(params[参数名]); // 服务器终端打印

  return <div>{params[参数名]}</div>;
}
```

---

### useSearchParams()

```https
/路由名?参数名=值&参数名=值
```

```tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

export default function DynamicPage() {
  const searchParams = useSearchParams();

  console.log(searchParams.get("参数名"));

  return <div></div>;
}
```

## 路由跳转

- [内置组件`<Link/>`](#link)
- [内置钩子函数`useRouter()`](#userouter)

---

### \<Link>

除非有特殊需求，否则建议使用[`useRouter()`](#userouter)编程式路由导航

```tsx
import Link from "next/link";

export default function Page() {
  return <Link href="/路由名">文本内容</Link>;
}
```

::: details `href`属性 <Badge>必须</Badge>

值为要跳转到的路由

::: code-group

```tsx [写法一<Badge>字符串</Badge>]
<Link href="/路由名">文本内容</Link>
<Link href="/路由名/子路由名">文本内容</Link>
<Link href="/路由名?query参数">文本内容</Link>
```

```tsx [写法二<Badge>对象</Badge>]
<Link
  href={{
    pathname: "/路由名",
  }}
>
  文本内容
</Link>

<Link
  href={{
    pathname: "/路由名/子路由名",
  }}
>
  文本内容
</Link>

<Link
  href={{
    pathname: "/路由名",
    query: "query参数",
  }}
>
  文本内容
</Link>
```

:::

::: details `replace`属性

- 默认值为`false`，访问的新的 URL 会添加到浏览器的历史记录中
- 值为`true`时，访问的新的 URL 会替换当前的历史记录，而不是追加

```tsx{0}
<Link href="/路由名" replace>文本内容</Link>
```

:::

::: details `prefetch`属性

- 默认值为`true`，视口中的任何内容（初始或通过滚动）都将被预加载
- 值为`false`时会在生产环境中禁用预加载

```tsx{0}
<Link href="/路由名" prefetch={false}>文本内容</Link>
```

:::

---

### useRouter()

https://nextjs.org/docs/app/api-reference/functions/use-router

`useRouter()`钩子允许以编程方式更改客户端组件内的路由

:::code-group

```tsx{7-14} [使用]
"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  // const router = useRouter();
  const {
    push,
    replace,
    refresh,
    prefetch,
    back,
    forward
  } = useRouter();
}
```

```ts [TS类型<Badge>完整版</Badge>]
export interface AppRouterInstance {
  /**
   * Navigate to the previous history entry.
   */
  back(): void;
  /**
   * Navigate to the next history entry.
   */
  forward(): void;
  /**
   * Refresh the current page.
   */
  refresh(): void;
  /**
   * Navigate to the provided href.
   * Pushes a new history entry.
   */
  push(href: string, options?: NavigateOptions): void;
  /**
   * Navigate to the provided href.
   * Replaces the current history entry.
   */
  replace(href: string, options?: NavigateOptions): void;
  /**
   * Prefetch the provided href.
   */
  prefetch(href: string, options?: PrefetchOptions): void;
}
```

:::

::: details `push()`

::: code-group

```tsx [使用]
"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const { push } = useRouter();

  return (
    <>
      <button type="button" onClick={() => push("/路由")}>
        文本内容
      </button>

      <button type="button" onClick={() => push("/路由/子路由")}>
        文本内容
      </button>

      <button type="button" onClick={() => push("/路由", { scroll: boolean })}>
        文本内容
      </button>
    </>
  );
}
```

```ts [TS类型<Badge>方便理解版</Badge>]
export interface AppRouterInstance {
  // ...
  push(href: string, options?: NavigateOptions): void;
}

export interface NavigateOptions {
  scroll?: boolean;
}
```

:::

::: details `replace()`

::: code-group

```tsx [使用]

```

```ts [TS类型<Badge>方便理解版</Badge>]
export interface AppRouterInstance {
  // ...
  replace(href: string, options?: NavigateOptions): void;
}

export interface NavigateOptions {
  scroll?: boolean;
}
```

:::

::: details `refresh()`

::: code-group

```tsx [使用]

```

```ts [TS类型<Badge>方便理解版</Badge>]
export interface AppRouterInstance {
  // ...
  refresh(): void;
}
```

:::

::: details `prefetch()`

::: code-group

```tsx [使用]

```

```ts [TS类型<Badge>方便理解版</Badge>]
export interface AppRouterInstance {
  // ...
  prefetch(href: string, options?: PrefetchOptions): void;
}

export interface PrefetchOptions {
  kind: PrefetchKind;
}
```

:::

::: details `back()`

::: code-group

```tsx [使用]

```

```ts [TS类型<Badge>方便理解版</Badge>]
export interface AppRouterInstance {
  // ...
  back(): void;
}
```

:::

::: details `forward()`

::: code-group

```tsx [使用]

```

```ts [TS类型<Badge>方便理解版</Badge>]
export interface AppRouterInstance {
  // ...
  forward(): void;
}
```

:::

## 路由中间件

::: code-group

```tsx [middleware.ts]
export function middleware(req) {
  const nextUrl = req.nextUrl;

  if (nextUrl.pathname === "/dashboard") {
    if (req.cookies.authToken) {
      return NextResponse.rewrite(new URL("/auth/dashboard", req.url));
    } else {
      return NextResponse.rewrite(new URL("/public/dashboard", req.url));
    }
  }
}
```

```tsx [Link组件]
import Link from "next/link";
import useIsAuthed from "./hooks/useIsAuthed";

export default function Page() {
  const isAuthed = useIsAuthed();
  const path = isAuthed ? "/auth/dashboard" : "/dashboard";

  return (
    <Link as="/dashboard" href={path}>
      Dashboard
    </Link>
  );
}
```

:::
