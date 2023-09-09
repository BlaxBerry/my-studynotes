# React 优化渲染效率

React 老项目优化:
https://blog.csdn.net/zhangrui_web/article/details/112979204

## 结构相关

### 避免同名 JSX 卸载后又挂载

::: code-group

```jsx{0} [👎]
import React from "react";

export default function Component() {
  if (条件) return <JSX标签 a={值a1} />; // [!code --]
  return <JSX标签 a={值a2} b={值b} />; // [!code --]
}
```

```jsx [👍]
import React from "react";

export default function Component() {
  return (
    <JSX标签
      a={条件 ? 值a1 : 值a2} // [!code ++]
      b={条件 && 值b} // [!code ++]
    />
  );
}
```

:::

---

### 避免内联样式

不推荐大量使用 CSS-in-JS 的内联样式，一方面有代码可读性差功能不全等问题，另一方面组件每次渲染时都会重新创建`style`中内联样式对象

建议可在组件外部定义样式对象，或采用[其他代替方式](../basics/styling.md)

::: code-group

```jsx{0} [👎]
import React from "react";

export default function Component() {
  return (
    <JSX标签
      style={{ // [!code --]
        属性: 值, // [!code --]
        属性: 值, // [!code --]
        属性: 值, // [!code --]
      }} // [!code --]
    />
  );
}
```

```tsx{0} [👍]
import React, { CSSProperties } from "react";

const styles: CSSProperties = { // [!code ++]
  属性: 值, // [!code ++]
  属性: 值, // [!code ++]
  属性: 值, // [!code ++]
} // [!code ++]

export default function Component() {
  return <JSX标签 style={styles} />;
}
```

:::

---

### 避免内联函数

不推荐在 JSX 中定义内联函数，组件每次渲染时都会重新创建函数

1. 建议使用`useCallback()`创建函数
2. 不依赖本组件状态时，建议作为外部函数在组件外部创建

::: code-group

```jsx{0} [👎]
import React from "react";

export default function Component() {
  return <JSX标签 属性={() => {/* ... */}} /> // [!code --]
}
```

```jsx{0} [👍 <Badge>useCallback( )</Badge>]
import React, { useCallback } from "react";

export default function Component() {
  const 函数名 = useCallback(() => {/* ... */}, [依赖项]); // [!code ++] // 指定依赖项或空依赖

  return <JSX标签 属性={函数名} />;
}
```

```jsx{0} [👍 <Badge>外部函数</Badge>]
import React from "react";

const 函数名 = () => {/* ... */};  // [!code ++]

export default function Component() {
  return <JSX标签 属性={函数名} />;
}
```

:::

---

### 避免在组件内部定义子组件

不推荐在组件内部定义子组件，当前组件每次渲染时都会重新创建子组件 ( 不是重现渲染 )

建议将子组件在当前组件外部定义

::: code-group

```jsx [👎]
import React from "react";

export default function Component() {
  const ChildComponent = <div>.....</div>; // [!code --]

  return <div>{ChildComponent}</div>; // [!code --]
}
```

```jsx{0} [👍]
import React from "react";

const ChildComponent = () => <div>.....</div>; // [!code ++]

export default function Component() {
  return <div><ChildComponent /></div>; // [!code ++]
}
```

:::

---

### 使用虚拟化长列表 <Badge type="danger">FIXME</Badge>

https://blog.logrocket.com/react-virtualized-vs-react-window/

https://blog.logrocket.com/rendering-large-lists-react-virtualized/

渲染大型列表和表单时除了分页 ( pagination ) 还可使用列表虚拟化（ List Virtualization ）

通过只在用户可见的固定区域渲染整个列表或表单的一小部分，并且当用户继续滚动时可见内容的区域会移动，从而实现减少创建的 DOM 节点数量，减少渲染所需时间，提高渲染效率

::: tip 推荐库

- react-virtualized
- react-window

:::

## 数据相关

### 避免 state 初始化函数重复调用

[`useState`](../built-in-apis/hooks.md#usestate)使用函数初始化组件状态时，参数应该是函数本身，而不能为函数的调用

否则在组件每次渲染时都会调用该函数重复初始化，造成不必要开销

因为组件状态的初始化只需要在该组件初次渲染时执行一次即可，否则就是性能浪费

::: code-group

```tsx [👎]
import React, { useState } from "react";

export default function Component() {
  const [state, setState] = useState(状态初始化函数()); // [!code --]
  // 需要动态参数时
  const [state, setState] = useState(状态初始化函数(参数)); // [!code --]

  return ...
}
```

```tsx [👍]
import React, { useState } from "react";

export default function Component() {
  const [state, setState] = useState(状态初始化函数); // [!code ++]
  // 需要动态参数时
  const [state, setState] = useState(() => 状态初始化函数(参数)); // [!code ++]

  return ...
}
```

:::

::: details 例：借助切换父组件中状态实现子组件重复渲染，来查看状态初始化函数的调用次数

::: code-group

```tsx [父组件]
import React, { useState } from "react";

export default function Father() {
  const [flag, setFlag] = useState<boolean>(true);
  const toggle = () => setFlag((s) => !s);

  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <ChildA />
      <ChildB />
    </>
  );
}
```

```tsx [子组件<Badge>调用函数</Badge>]
import React, { useState } from "react";

const initState = () => {
  console.log("A's initState function is called"); // 每次子组件重新渲染时都会调用
  return "";
};
const initDynamicState = (params: string) => {
  console.log(`A's initDynamicState function is called`, params); // 每次子组件重新渲染时都会调用
  return "";
};

const ChildA = () => {
  useState(initState()); // [!code --]
  useState(() => initDynamicState("A")); // [!code --]
  return <div>A</div>;
};
```

```tsx [子组件<Badge>传入函数名</Badge>]
import React, { useState } from "react";

const initState = () => {
  console.log("B's initState function is called"); // 仅子组件初次渲染时被调用
  return "";
};
const initDynamicState = (params: string) => {
  console.log(`B's initDynamicState function is called`, params); // 仅子组件初次渲染时被调用
  return "";
};

const ChildB = () => {
  useState(initState); // [!code ++]
  useState(() => initDynamicState("B")); // [!code ++]
  return <div>B</div>;
};
```

:::

---

### 避免 state 函数擅自执行

在状态为一个函数时，初始化与更新时必须将要存储的函数作为一个箭头函数的返回值

否则会被视为初始化函数，在每次状态的始化与更新时会被执行

::: code-group

```tsx [👎]
import React, { useState } from "react";

const funcA = () => console.log(`A is called`);
const funcB = () => console.log(`B is called`);

export default function Component() {
  const [_, setState] = useState<Function>(() => funcA); // [!code --] // 函数不会执行
  const onChange = () => setState(() => funcB); // [!code --] // 函数不会执行

  return <button onClick={onChange}>Update</button>;
}
```

```tsx [👍]
import React, { useState } from "react";

const funcA = () => console.log(`A is called`);
const funcB = () => console.log(`B is called`);

export default function Component() {
  const [_, setState] = useState<Function>(funcA); // [!code ++] // 每次组件渲染时函数被执行
  const onChange = () => setState(funcB); // [!code ++] // 每次调用 setState() 时函数被执行

  return <button onClick={onChange}>Update</button>;
}
```

:::

---

### 避免缓存 Hooks 空依赖

`useMemo()`、`useCallback()`这两个钩子函数是用于缓存基于本组件内状态数据变化而变化的状态和函数，
因此若依赖项可指定的话则没有必要使用该钩子函数，直接定义即可

::: code-group

```jsx [👎]
import React, { useCallback, useMemo } from "react";

export default function Component() {
  const state = useMemo(()=> (/* ... */),[]) // [!code --]
  const func = useCallback(()=> {/* ... */} ,[]) // [!code --]

  return ...
}
```

```jsx [👍]
import React, { useCallback, useMemo } from "react";

const state = /* ... */; // [!code ++]
const func = ()=> {/* ... */}; // [!code ++]

export default function Component() {
  return ...
}
```

:::

## 加载相关

### 使用组件懒加载 <Badge type="danger">FIXME</Badge>

加载时的页面展示可使用 Loading、Skeleton

---

### 优化图片资源 <Badge type="danger">FIXME</Badge>

::: details 压缩图像大小

大图像可能会减慢您的网站速度。将图像调整为适当的大小可以减小图像的大小并提高 Web 应用程序的性能。
图像压缩可以减小图像的大小，而不会显着影响质量。有多种图像压缩工具可供使用，例如 TinyPNG、 JPEGmini 和 Kraken.io，它们可以在不损失质量的情况下压缩图像。

:::

::: details 使用适当的图像格式

不同的图像格式更适合不同类型的图像。例如，JPEG 更适合照片，而 PNG 更适合透明背景的图像。

:::

::: details 使用图片懒加载

延迟加载图像：延迟加载图像意味着仅在需要时才加载图像，例如当图像出现在用户屏幕上时。（我们在本文的第二部分中讨论了这种特殊的技术。）

::: tip 推荐库

- react-lazyload
- react-lazy-load-image-component

:::

---

### 使用 CDN <Badge type="danger">FIXME</Badge>

CDN（即内容交付网络）是一个由分布式服务器或节点组成的系统，这些服务器或节点协同工作，根据用户的地理位置向用户交付 Web 内容，例如图像、视频和其他文件。

当用户从网站请求内容时，CDN 将从距离用户最近的服务器提供内容，这有助于减少延迟并提高网站性能。CDN 还可以通过缓存经常访问的内容并从 CDN 服务器而不是源服务器传送内容来帮助减少网站源服务器的负载。

CDN 通常用于托管静态内容（即不会随时间频繁更改的内容），例如图像、视频、博客文章等。此外，如果您使用静态站点生成 (SSG) 作为渲染模式，则可以将渲染的站点托管在 CDN 中，以实现更快的交付速度。

Cloudflare 和 Amazon CloudFront 是流行 CDN 的一些示例。

https://www.youtube.com/watch?v=RI9np1LWzqw&authuser=0

---

### 使用 Tree-Shaking 优化模块 <Badge type="danger">FIXME</Badge>

Tree-shaking 是现代 JavaScript 应用程序中使用的一种技术，用于从最终包中消除未使用的代码。在大型 React 应用程序中，可能有许多组件、函数和其他代码对于特定页面或功能来说不是必需的。Tree-shaking 使您能够删除这些未使用的代码，从而减少捆绑包的大小并提高应用程序的性能。

Tree-shaking 的工作原理是分析代码的依赖关系并删除任何未使用或引用的代码。这是由打包工具（例如 Webpack）在构建过程中完成的。当您导入模块时，捆绑程序将仅包含应用程序中实际使用的代码部分。

为了确保您的 React 应用程序可以利用 tree-shaking，您应该使用 ES6 模块并确保您的代码是模块化的，并遵循组织和导入/导出代码的最佳实践。此外，当您只需要其中的一小部分时，应避免导入整个库。

---

## 其他

### 使用错误边界

错误边界 ( Error Boundary ) 可以捕获子级组件在渲染时发生的错误

当错误发生时，可以将可以记录错误并显示备用 UI 界面

::: tip 推荐库

- react-error-boundary

:::

::: details 例子：react-error-boundary 捕获处理整个应用的错误

```tsx{6-9,11-13,17-22}
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import App from "./App";

const errorBoundaryCallback = (
  error: Error,
  info: { componentStack: string }
) => console.log({ error, info });

const ErrorComponent = ({ error: { message } }: FallbackProps) => {
  return <>{message}</>;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorComponent}
      onError={errorBoundaryCallback}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
```

:::

错误记录，比如使用第三方日志服务 ( Sentry )

---

### 使用 debounce、throttle 优化频繁触发的回调 <Badge type="danger">FIXME</Badge>

Throttling & Debouncing Event Action

避免过多受控组件的 state + onChange 导致的组件重复渲染

---

### 使用 ServiceWorkers 缓存应用程序状态 <Badge type="danger">FIXME</Badge>

---

### 使用 Web Worker 执行 CPU 广泛任务 <Badge type="danger">FIXME</Badge>

---

### 使用 Lock 防止并发执行 <Badge type="danger">FIXME</Badge>

给异步函数增加竞态锁，防止并发执行
