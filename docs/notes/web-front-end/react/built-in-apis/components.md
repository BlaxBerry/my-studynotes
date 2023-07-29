# React 内置组件

## <StrictMode\>

> 该组件不会被渲染到页面

`<React.StrictMode>`组件用于包裹整个应用程序的根组件或部分组件，为其启用严格模式

严格模式仅用于检查开发环境下组件中的常见错误

```tsx
<React.StrictMode>
  <组件 />
</React.StrictMode>
```

::: code-group

```tsx{0} [包裹根组件]
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);// [!code focus]
root.render(// [!code focus]
  <StrictMode>  // [!code focus]
    <App /> // [!code focus]
  </StrictMode> // [!code focus]
);// [!code focus]
```

```tsx{0} [包裹部分内容]
import { StrictMode } from "react";

function App() {
  return (
    <>
      <Header />
      <StrictMode> // [!code focus]
        <main> // [!code focus]
          <Sidebar /> // [!code focus]
          <Content /> // [!code focus]
        </main> // [!code focus]
      </StrictMode> // [!code focus]
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

::: details 例：组件中循环遍历列表

```tsx{0}
import { Fragment } from "react";

const list: string[] = ["A", "B", "C"]

export default function Component() {
  return (
    <>
      {list.map((item, index) => ( // [!code focus]
        <Fragment key={index}> // [!code focus]
          <span>{index}</span>
          <span>{item}</span>
        </Fragment> // [!code focus]
      ))} // [!code focus]
    </>
  );
}
```

:::

## <Suspense\>

> 该组件不会被渲染到页面

`<React.Suspense>`组件用于包裹一个动态加载的组件，多与[`React.lazy()`](./methods.md#lazy)搭配使用

::: code-group

```tsx{0} [使用]
import React from "react";
import 加载中的状态组件 from "路径";

const 动态加载的组件 = React.lazy(() => import("路径")); // [!code focus]

export default function 组件() {
  return (
    <React.Suspense fallback={<该组件渲染前的加载状态 />}> // [!code focus]
      <动态加载的组件 /> // [!code focus]
    </React.Suspense> // [!code focus]
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

```tsx{0}
import { lazy, Suspense } from "react";

const A = lazy(() => import("pages/A")); // [!code focus]
const B = lazy(() => import("pages/B")); // [!code focus]

export default function App() {
  return (
    <>
      <Suspense fallback={<div>A is Loading...</div>}> // [!code focus]
        <A /> // [!code focus]
      </Suspense> // [!code focus]

      <Suspense fallback={<div>B is Loading...</div>}> // [!code focus]
        <B /> // [!code focus]
      </Suspense> // [!code focus]
    </>
  );
}
```

:::

::: details 例：在 React-Router 中包裹动态加载路由组件

详见 [React-Router-Dom v6](/notes/web-front-end/react/react-router/v6.md)

```tsx{0}
import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "pages/404";

const PageA = React.lazy(() => import("pages/A")); // [!code focus]
const PageB = React.lazy(() => import("pages/B")); // [!code focus]

export default function Routes() {
  return (
    <Routes>
      {/* 动态加载 */}
      <Route // [!code focus]
        path="/a" // [!code focus]
        element={ // [!code focus]
          <React.Suspense fallback={<div>A is Loading...</div>}> // [!code focus]
            <PageA /> // [!code focus]
          </React.Suspense> // [!code focus]
        } // [!code focus]
      /> // [!code focus]
      {/* 动态加载 */}
      <Route // [!code focus]
        path="/b" // [!code focus]
        element={ // [!code focus]
          <React.Suspense fallback={<div>B is Loading...</div>}> // [!code focus]
            <PageB /> // [!code focus]
          </React.Suspense> // [!code focus]
        } // [!code focus]
      /> // [!code focus]

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

能够从中获取详细的组件渲染时间、渲染次数、重新渲染原因等信息

::: code-group

```tsx{0} [使用]
import { Profiler, ProfilerOnRenderCallback } from "react";

export default function Component() {
  return (
    <Profiler // [!code focus]
      id="自定义名" // [!code focus]
      onRender={profilerOnRenderCallback} // [!code focus]
    > // [!code focus]
      <要监控的组件/> // [!code focus]
    </Profiler> // [!code focus]
  );
}

const profilerOnRenderCallback: ProfilerOnRenderCallback = ( // [!code focus]
  id, // [!code focus]
  phase, // [!code focus]
  actualDuration, // [!code focus]
  baseDuration, // [!code focus]
  startTime, // [!code focus]
  commitTime // [!code focus]
) => { // [!code focus]
  console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime });
}; // [!code focus]
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

::: warning 不要滥用`<React.Provider>`

开发环境中不要滥用，生成环境中要禁用

- 每次分析都会给应用程序带来性能开销
- 过多使用会导致调试和分析复杂性增加
- 会有不精准的可能性，组件渲染时间较长并不一定肯定是其本身性能问题，也有可能比如网络请求、数据处理、DOM 操作等原因导致

:::
