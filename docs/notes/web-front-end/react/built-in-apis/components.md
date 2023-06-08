# React 内置组件

## <Fragment\>

## <Suspense\>

`<React.Suspense>` 组件用于包裹一个动态加载的组件，多与 [React.lazy()](./methods.md#lazy) 搭配使用

::: details 接口类型 <Badge type="info">TS</Badge>

```ts
interface SuspenseProps {
  children?: ReactNode | undefined;
  /** A fallback react tree to show when a Suspense child (like React.lazy) suspends */
  fallback?: ReactNode;
}
```

:::

```tsx{8-10}
import React from "react";
import 加载中的状态组件 from "路径";

const 动态加载的组件 = React.lazy(() => import("路径"));

export default function 组件() {
  return (
    <React.Suspense fallback={<加载中的状态组件 />}>
      <动态加载的组件 />
    </React.Suspense>
  );
}
```

> 如下:

::: details 例：多个动态加载的组件共存时

> 谁被动态加载就包裹谁

```tsx{9-11,13-15}
import React from "react";

const A = React.lazy(() => import("pages/A"));
const B = React.lazy(() => import("pages/B"));

export default function App() {
  return (
    <>
      <React.Suspense fallback={<div>A is Loading...</div>}>
        <A />
      </React.Suspense>

      <React.Suspense fallback={<div>B is Loading...</div>}>
        <B />
      </React.Suspense>
    </>
  );
}
```

:::

::: details 例：在 React-Router 中包裹动态加载路由组件

详见 [React-Router-Dom v6](/notes/web-front-end/react/react-router/v6.md)

```tsx{12-19,21-28}
import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "pages/404";

const PageA = React.lazy(() => import("pages/A"));
const PageB = React.lazy(() => import("pages/B"));

export default function Routes() {
  return (
    <Routes>
      {/* 动态加载 */}
      <Route
        path="/a"
        element={
          <React.Suspense fallback={<div>A is Loading...</div>}>
            <PageA />
          </React.Suspense>
        }
      />
      {/* 动态加载 */}
      <Route
        path="/b"
        element={
          <React.Suspense fallback={<div>B is Loading...</div>}>
            <PageB />
          </React.Suspense>
        }
      />

      {/* 非动态加载 */}
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
}
```

:::
