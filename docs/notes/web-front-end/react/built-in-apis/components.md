# React 内置组件

## <StrictMode\>

> 该组件不会被渲染到页面

`<StrictMode\>`组件用于包裹整个应用程序的根组件或部分组件，为其启用严格模式

严格模式仅用于检查开发环境下组件中的常见错误

```tsx
<StrictMode>
  <组件 />
</StrictMode>
```

> 如下：`src/main.tsx`中包裹`root`根组件，为整个应用程序开启严格模式

::: code-group

```tsx [包裹根组件 <Badge>写法一</Badge>]
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```tsx [包裹根组件 <Badge>写法一</Badge>]
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```tsx [包裹部分内容]
import { StrictMode } from "react";

function App() {
  return (
    <>
      <Header />
      <StrictMode>
        <main>
          <Sidebar />
          <Content />
        </main>
      </StrictMode>
      <Footer />
    </>
  );
}
```

:::

## <Fragment\> ( <> )

> 该组件不会被渲染到页面

`<React.Fragment>`组件作为一个包裹节点 ( wrapper node ) 来包裹多个元素、文本等

`<React.Fragment>`组件只能接收两个属性：`children`、`key`

`<React.Fragment>`可简写为`<>...</>`，但不能携带任何属性

::: code-group

```tsx [写法一]
<React.Fragment>
  <组件 />
  <组件 />
</React.Fragment>
```

```tsx [写法二]
<>
  <组件 />
  <组件 />
</>
```

:::

> 如下：`src/App.tsx`组件中循环遍历列表

```tsx
import React from "react";

export default function App() {
  return (
    <>
      {["A", "B", "C"].map((item, index) => (
        <React.Fragment key={index}>
          <span>{index}</span>
          --
          <span>{item}</span>
        </React.Fragment>
      ))}
    </>
  );
}
```

## <Suspense\>

> 该组件不会被渲染到页面

`<React.Suspense>`组件用于包裹一个动态加载的组件，多与[`React.lazy()`](./methods.md#lazy)搭配使用

::: code-group

```tsx{8-10} [使用]
import React from "react";
import 加载中的状态组件 from "路径";

const 动态加载的组件 = React.lazy(() => import("路径"));

export default function 组件() {
  return (
    <React.Suspense fallback={<该组件渲染前的加载状态 />}>
      <动态加载的组件 />
    </React.Suspense>
  );
}
```

```ts [TS类型 <Badge>完整版</Badge>]
interface SuspenseProps {
  children?: ReactNode | undefined;
  /** A fallback react tree to show when a Suspense child (like React.lazy) suspends */
  fallback?: ReactNode;
}
```

:::

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

## <Profiler\>

> 该组件不会被渲染到页面

`<React.Profiler>`组件用于测量组件的渲染性能

::: warning 生成环境中禁用，开发环境中不要滥用

每次分析都会给应用程序增加一些 CPU 和内存开销

:::

::: code-group

```tsx [整个应用程序]
<React.Profiler
  id="自定义名"
  onRender={回调函数}
>
  <App />
</React.Profiler>
```

```tsx [某个指定组件]
<React.Profiler
  id="自定义名"
  onRender={回调函数}
>
  <某个组件 />
</React.Profiler>
```

:::

::: code-group

```tsx{5-10,14-23} [使用]
import React from "react";

export default function Component() {
  return (
    <React.Profiler
      id="自定义名"
      onRender={profilerOnRenderCallback}
    >
      {/* ... */}
    </React.Profiler>
  );
}

const profilerOnRenderCallback: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime });
};
```

```tsx [TS类型<Badge>完整版</Badge>]
const Profiler: ExoticComponent<ProfilerProps>;

interface ProfilerProps {
  children?: ReactNode | undefined;
  id: string;
  onRender: ProfilerOnRenderCallback;
}

type ProfilerOnRenderCallback = (
  id: string,
  phase: "mount" | "update",
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
  interactions: Set<SchedulerInteraction>
) => void;
```

:::
