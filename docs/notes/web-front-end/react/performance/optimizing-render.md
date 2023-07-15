# React 优化渲染效率

https://www.codementor.io/blog/react-optimization-5wiwjnf9hj

https://www.bacancytechnology.com/blog/react-performance-optimization

https://juejin.cn/post/7064804207722758157#heading-20

https://juejin.cn/post/7171631228917923877#heading-2

## 减少渲染真实 DOM 节点的频率

## 减少 Virtual DOM 比对的频率

## 长列表虚拟化 ( 窗口化 )

- react-window
- react-virtualized

## 代码分割、延时加载

- 图片延迟导入
  - react-lazyload
  - react-lazy-load-image-component
- 路由懒加载

## 错误边界

react-error-boundary

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import App from "./App";

const errorBoundaryCallback = (
  error: Error,
  info: { componentStack: string }
) => {
  console.log({ error, info });
};

const ErrorComponent = ({ error: { message } }: FallbackProps) => {
  return <>{message}</>;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
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

错误记录，比如使用第三方日志服务 ( Sentry )

## 优化加载资源

优化图像 tinyPng

## CDN
