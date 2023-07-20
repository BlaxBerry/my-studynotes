# React 优化渲染效率

https://mp.weixin.qq.com/s/rR9blZrDzI0zQ7Vs6QiuAQ

## 避免重新无意义的重新挂载

::: code-group

```jsx{0} [👎]
import React from "react";

export default function Component() {
  if (条件) return <JSX标签 a={值a1} />;
  return <JSX标签 a={值a2} b={值b} />;
}
```

```jsx{6-7} [👍]
import React from "react";

export default function Component() {
  return (
    <JSX标签
      a={条件 ? 值a1 : 值a2}
      b={条件 && 值b}
    />
  );
}
```

:::

## 避免内联函数

不推荐在 JSX 中定义内联函数，会导致每次渲染都会重新定义函数

建议将函数在组件中单独定义后绑定给 JSX 属性

::: code-group

```jsx{0} [👎]
import React from "react";

export default function Component() {
  return <JSX标签 属性={() => { /*...*/ }} /> // [!code error]
}
```

```jsx{4,6} [👍]
import React from "react";

export default function Component() {
  const 函数名 = () => { /*...*/ };

  return <JSX标签 属性={函数名} />;
}
```

:::

## 使用虚拟化长列表 <Badge type="danger">FIXME</Badge>

https://blog.logrocket.com/react-virtualized-vs-react-window/

https://blog.logrocket.com/rendering-large-lists-react-virtualized/

渲染大型列表和表单时除了分页 ( pagination ) 还可使用列表虚拟化（ List Virtualization ）

通过只在用户可见的固定区域渲染整个列表或表单的一小部分，并且当用户继续滚动时可见内容的区域会移动，从而实现减少创建的 DOM 节点数量，减少渲染所需时间，提高渲染效率

::: tip 推荐库

- react-virtualized
- react-window

:::

## 使用延时加载组件 <Badge type="danger">FIXME</Badge>

Throttling & Debouncing Event Action

## 使用错误边界

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

## 优化图片资源 <Badge type="danger">FIXME</Badge>

### 压缩图像

大图像可能会减慢您的网站速度。将图像调整为适当的大小可以减小图像的大小并提高 Web 应用程序的性能。
图像压缩可以减小图像的大小，而不会显着影响质量。有多种图像压缩工具可供使用，例如 TinyPNG、 JPEGmini 和 Kraken.io，它们可以在不损失质量的情况下压缩图像。

---

### 使用适当的图像格式

不同的图像格式更适合不同类型的图像。例如，JPEG 更适合照片，而 PNG 更适合透明背景的图像。

---

### 使用延时加载图片

延迟加载图像：延迟加载图像意味着仅在需要时才加载图像，例如当图像出现在用户屏幕上时。（我们在本文的第二部分中讨论了这种特殊的技术。）

::: tip 推荐库

- react-lazyload
- react-lazy-load-image-component

:::

## 使用 CDN <Badge type="danger">FIXME</Badge>

CDN（即内容交付网络）是一个由分布式服务器或节点组成的系统，这些服务器或节点协同工作，根据用户的地理位置向用户交付 Web 内容，例如图像、视频和其他文件。

当用户从网站请求内容时，CDN 将从距离用户最近的服务器提供内容，这有助于减少延迟并提高网站性能。CDN 还可以通过缓存经常访问的内容并从 CDN 服务器而不是源服务器传送内容来帮助减少网站源服务器的负载。

CDN 通常用于托管静态内容（即不会随时间频繁更改的内容），例如图像、视频、博客文章等。此外，如果您使用静态站点生成 (SSG) 作为渲染模式，则可以将渲染的站点托管在 CDN 中，以实现更快的交付速度。

Cloudflare 和 Amazon CloudFront 是流行 CDN 的一些示例。

https://www.youtube.com/watch?v=RI9np1LWzqw&authuser=0

## 使用 Tree-Shaking 优化模块 <Badge type="danger">FIXME</Badge>

Tree-shaking 是现代 JavaScript 应用程序中使用的一种技术，用于从最终包中消除未使用的代码。在大型 React 应用程序中，可能有许多组件、函数和其他代码对于特定页面或功能来说不是必需的。Tree-shaking 使您能够删除这些未使用的代码，从而减少捆绑包的大小并提高应用程序的性能。

Tree-shaking 的工作原理是分析代码的依赖关系并删除任何未使用或引用的代码。这是由打包工具（例如 Webpack）在构建过程中完成的。当您导入模块时，捆绑程序将仅包含应用程序中实际使用的代码部分。

为了确保您的 React 应用程序可以利用 tree-shaking，您应该使用 ES6 模块并确保您的代码是模块化的，并遵循组织和导入/导出代码的最佳实践。此外，当您只需要其中的一小部分时，应避免导入整个库。

## 使用 debounce、throttle 优化频繁触发的回调 <Badge type="danger">FIXME</Badge>

## 使用 ServiceWorkers 缓存应用程序状态 <Badge type="danger">FIXME</Badge>

## 使用 Web Worker 执行 CPU 广泛任务 <Badge type="danger">FIXME</Badge>

## 使用 Lock 防止并发执行 <Badge type="danger">FIXME</Badge>

给异步函数增加竞态锁，防止并发执行
