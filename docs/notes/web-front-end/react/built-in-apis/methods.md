# React 内置方法

## memo()

`React.memo()`用于包裹一个组件，该组件仅在自身`props`更新变化时才重新渲染(re-render)，可有效避免父组件重新渲染导致的不必要的重新渲染

参数接收需要被记忆状态的组件，返回值为一个新的组件

::: code-group

```tsx [使用]
const 被记忆的组件 = React.memo(组件);
```

```tsx [TS类型<Badge>完整版</Badge>]
function memo<T extends ComponentType<any>>(
  Component: T,
  propsAreEqual?: (
    prevProps: Readonly<ComponentProps<T>>,
    nextProps: Readonly<ComponentProps<T>>
  ) => boolean
): MemoExoticComponent<T>;
```

:::

::: code-group

```tsx [写法一]
import React from "react";

// 普通函数定义的组件
export default React.memo<PropsType>(function (props) {
  // return ... ;
});

// 箭头函数定义的组件
export default React.memo<PropsType>((props) => {
  // return ... ;
});
```

```tsx [写法二]
import React from "react";

// 普通函数定义的组件
function Component(props) {
  // return ... ;
}

// 箭头函数定义的组件
const Component = (props) => {
  // return ... ;
};

export default React.memo<PropsType>(Component);
```

:::

::: tip 复杂数据类型的`props`时不管用

React 默认通过浅层相等来比较新旧`props`，所以在`props`是对象、数组或函数时仍会重新渲染<br/>
为了避免这种情况应该：<br/>

<details class="details custom-block">
  <summary>1. 简化从父组件中传递<code>props</code>的数据类型</summary>

```tsx
const Father = () => (
    <>
       <Child data={ a: xxx, b: xxx, c: xxx }/>; // [!code --]
       <Child a={xxx} b={xxx} c={xxx} />;  // [!code ++]
    </>
)
```

</details>

<details class="details custom-block">
  <summary>2. 在父组件中使用<code>useMemo()</code>来记忆要传递的<code>props</code></summary>

```tsx{2-4}
const Father = () => {
  const dataMemorized = React.memo(() => {
    return { a: xxx, b: xxx, c: xxx };
  }, [a, b, c]);

  return (
    <>
      <Child data={dataMemorized} />;
    </>
  );
};
```

</details>

:::

::: warning 第二个参数（状态的比较函数）

`React.memo()`可接收一个状态的比较函数作为第二个参数。但若要自定义则必须比较每个`prop`，一般情况下省略即可，没那技术就别尝试

:::

## lazy()

`React.lazy()`用于延迟加载一个组件，直到该组件第一次被成功渲染

::: code-group

```tsx [使用方法]
const 延迟加载的组件 = React.lazy(Promise或thenable函数);
```

```ts [TS类型<Badge>完整版</Badge>]
declare namespace React {
  function lazy<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>
  ): LazyExoticComponent<T>;
}
```

:::

`React.lazy()`多与[`import()`](/notes/web-front-end/javascript/module-dev/es-modules.md#import-1)方法搭配使用，在文件顶层导入目标组件

延迟导入的组件还需要由内置组件[`<React.Suspense>`](./components.md#suspense)包裹来显示该组件在加载时展示的内容

```tsx{1-2,6-8,10-12}
const 组件 = React.lazy(() => import("路径"));
const 组件 = React.lazy(() => import("路径"));

export default function WrapComponent() {
  return (
      <React.Suspense fallback={<该组件渲染前的加载状态/>}>
        <组件 />
      </React.Suspense>

      <React.Suspense fallback={<该组件渲染前的加载状态/>}>
        <组件 />
      </React.Suspense>
  );
}
```

::: tip 自定延时加载

可利用[`Promise.all()`](../../javascript/async/promise.md#promise-all)实现动态自定义加载

```tsx{0}
const 组件 = React.lazy(() =>
  Promise.all([
    import("路径"),
    new Promise((resolve) => setTimeout(resolve, 延时毫秒)), // [!code hl] // 等该 Promise 任务完成时才返回动态加载的组件
  ])
  .then(([组件]) => 组件)
);
```

:::

::: details 例：动态导入组件`<A/>`和`<B/>`，所耗时间取决于各自的处理时间

```tsx
import React from "react";

const A = React.lazy(() => import("./A"));
const B = React.lazy(() => import("./B"));

export default function App() {
  return (
    <>
      <React.Suspense fallback={<div>Loading A</div>}>
        <A />
      </React.Suspense>

      <React.Suspense fallback={<div>Loading B</div>}>
        <B />
      </React.Suspense>
    </>
  );
}
```

:::

::: details 例：1s 延时后导入组件`<A/>`，2s 延时后导入组件`<B/>`

```tsx
import React from "react";

const A = React.lazy(() =>
  Promise.all([
    import("./A"),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([component]) => component)
);

const B = React.lazy(() =>
  Promise.all([
    import("./B"),
    new Promise((resolve) => setTimeout(resolve, 2000)),
  ]).then(([component]) => component)
);

export default function App() {
  return (
    <>
      <React.Suspense fallback={<div>Loading A</div>}>
        <A />
      </React.Suspense>

      <React.Suspense fallback={<div>Loading B</div>}>
        <B />
      </React.Suspense>
    </>
  );
}
```

:::

## startTransition()

## forwardRef()

## createContext()

结合 [useContext()](../built-in-hooks/index.md#usecontext)
