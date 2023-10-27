# React 内置方法

## memo()

`React.memo()`用于包裹一个组件，该组件在自身`props`改变时才重新渲染

方法返回值为一个新的组件，参数接收需要被记忆状态的组件 ( 第二个参数一般省略 )

::: code-group

```tsx [使用]
import { memo } from "react";

const 被记忆的组件 = memo<Props类型>(组件);
```

```tsx [TS类型<Badge>完整版</Badge>]
function memo<T extends ComponentType<any>>( // [!code focus]
  Component: T, // [!code focus]
  propsAreEqual?: (
    prevProps: Readonly<ComponentProps<T>>,
    nextProps: Readonly<ComponentProps<T>>
  ) => boolean
): MemoExoticComponent<T>; // [!code focus]
```

:::

- 被包裹的组件除了自身的初次渲染外，仅在`props`中数据变化时才会重新渲染
- 若被包裹的组件没有`props`则组件仅会初次渲染一次

可有效避免父组件重新渲染导致的不必要的重新渲染 详见 [性能优化](../performance/re-render.md#记忆子组件)

::: details 例子：

::: code-group

```tsx{0} [子组件有props]
import { memo, useState } from "react";

export default function Father() {
  const [a, setA] = useState<boolean>(true);
  const [_, setB] = useState<boolean>(true);
  const [_, setC] = useState<boolean>(true);

  return (
    <>
      <Child a={a} /> // [!code focus]
      <button onClick={() => setA((s) => !s)}>toggle a</button>
      <button onClick={() => setB((s) => !s)}>toggle b</button>
      <button onClick={() => setC((s) => !s)}>toggle c</button>
    </>
  );
}

const Child = memo<{ a: boolean }>((props) => { // [!code focus]
  console.log("rendered"); // [!code focus] // 仅在初次渲染与 props.a 改变时才打印
  return null;
}); // [!code focus]
```

```tsx{0} [子组件无props]
import { memo, useState } from "react";

export default function Father() {
  const [a, setA] = useState<boolean>(true);
  const [_, setB] = useState<boolean>(true);
  const [_, setC] = useState<boolean>(true);

  return (
    <>
      <Child /> // [!code focus]
      <button onClick={() => setA((s) => !s)}>toggle a</button>
      <button onClick={() => setB((s) => !s)}>toggle b</button>
      <button onClick={() => setC((s) => !s)}>toggle c</button>
    </>
  );
}

const Child = memo(() => { // [!code focus]
  console.log("rendered"); // [!code focus] // 仅在初次渲染时才打印
  return null;
}); // [!code focus]
```

:::

## lazy()

`React.lazy()`用于延迟加载一个组件，直到该组件第一次被成功渲染

::: code-group

```tsx [使用方法]
import { lazy } from "react";

const 延迟加载的组件 = lazy(Promise或thenable函数);
```

```ts [TS类型<Badge>完整版</Badge>]
declare namespace React {
  function lazy<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>
  ): LazyExoticComponent<T>;
}
```

:::

- 需结合使用[`import()`](/notes/web-front-end/javascript/module-dev/es-modules.md#import-1)方法在文件顶层导入目标组件

- 还需结合使用内置组件[`<React.Suspense>`](./components.md#suspense)来包裹要延迟导入的组件，以及展示加载内状态

```tsx{0}
import React from "react";

const 组件 = React.lazy(() => import("路径")); // [!code focus]
const 组件 = React.lazy(() => import("路径")); // [!code focus]


export default function WrapComponent() {
  return (
      <React.Suspense fallback={<该组件渲染前的加载状态/>}> // [!code focus]
        <组件 /> // [!code focus]
      </React.Suspense> // [!code focus]

      <React.Suspense fallback={<该组件渲染前的加载状态/>}>
        <组件 />
      </React.Suspense>
  );
}
```

::: details 例：动态导入组件`<A/>`和`<B/>`，所耗时间取决于各自的处理时间

```tsx{0}
import React from "react";

const A = React.lazy(() => import("./A")); // [!code focus]
const B = React.lazy(() => import("./B")); // [!code focus]

export default function Component() {
  return (
    <>
      <React.Suspense fallback={<div>Loading A...</div>}> // [!code focus]
        <A /> // [!code focus]
      </React.Suspense> // [!code focus]

      <React.Suspense fallback={<div>Loading B...</div>}> // [!code focus]
        <B /> // [!code focus]
      </React.Suspense> // [!code focus]
    </>
  );
}
```

:::

::: tip 自定延时加载

可利用[`Promise.all()`](../../javascript/async/promise.md#promise-all)实现动态自定义加载延迟时间

```tsx{0}
const 组件 = React.lazy(() =>
  Promise.all([
    import("路径"),
    new Promise((resolve) => setTimeout(resolve, 延时毫秒)), // [!code hl] // 等该 Promise 任务完成时才返回动态加载的组件
  ])
  .then(([组件]) => 组件)
);
```

::: details 例：1s 延时后导入组件`<A/>`，2s 延时后导入组件`<B/>`

```tsx{0}
import { lazy, Suspense } from "react";

const delay = (delayTime: number) => new Promise((resolve) => setTimeout(resolve, delayTime));

const A = lazy(() => Promise.all([import("./A"), delay(1000)]).then(([component]) => component)); // [!code focus]
const B = lazy(() => Promise.all([import("./B"), delay(2000)]).then(([component]) => component)); // [!code focus]

export default function Component() {
  return (
    <>
      <Suspense fallback={<div>Loading A...</div>}> // [!code focus]
        <A /> // [!code focus]
      </Suspense> // [!code focus]

      <Suspense fallback={<div>Loading B...</div>}> // [!code focus]
        <B /> // [!code focus]
      </Suspense> // [!code focus]
    </>
  );
}
```

:::

## forwardRef()

`React.forwardRef()`用于使子组件接收来自父组件向下传递的引用对象 Ref

```tsx{0}
import React from "react";

const 父组件 = () => {
  const ref = useRef<Ref类型>(null);
  return <子组件 ref={ref} />;
};

const 子组件 = React.forwardRef<Ref类型, Props类型>((prop, ref) => { // [!code focus]
  return ... // [!code focus]
}); // [!code focus]
```

:::details 例子：子组件内部节点使用接收的`ref`

```tsx
import React from "react";

type Props = { ... }

const Father = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Child ref={ref} />
      <button onClick={() => console.log(inputRef.current?.value)}>
        get value
      </button>
    </>
  );
};

const Child: ForwardRefRenderFunction<HTMLInputElement, Props> = (props, ref) => {
  return <input ref={ref} />;
};
```

:::

:::details 例子：子组件通过`ref`传递某数据给父组件

```tsx
import React from "react";

type Props = { ... }
type Ref = { sayHello: () => void }

const Father = () => {
  const inputRef = useRef<Ref>(null);
  return (
    <>
      <Child ref={ref} />
      <button onClick={inputRef.current?.sayHello}>
        call child function
      </button>
    </>
  );
};

const Child: ForwardRefRenderFunction<Ref, Props> = (props, ref) => {
  useImperativeHandle(ref, () => ({
    sayHello: sayHello
  }), [sayHello]);

  const sayHello = () => console.log("hello")

  return ...;
};
```

:::

:::details 例子：`React.memo()`+`React.forwardRef()`

```tsx{0}
import React from "react";

type Props = ...
type Ref = ...

const Child: ForwardRefRenderFunction<Ref, Props> = (props, ref) => { // [!code focus]
  return ...
};  // [!code focus]

const ChildMemo = memo(forwardRef(Modal));  // [!code focus]
export default ChildMemo;                   // [!code focus]
```

:::

## createContext()

`createContext()`用于创建了一个上下文对象 Context

::: code-group

```tsx{0} [使用]
import React from "react";

const Context对象 = React.createContext<数据类型| undefined>(undefined); // [!code focus]

function 父组件() {
  return (
    <Context对象.Provider value={数据}>  // [!code focus]
      <后代组件 /> // [!code focus]
    </Context对象.Provider> // [!code focus]
  );
}

function 后代组件() {
  return (
    <Context对象.Consumer> // [!code focus]
      {(value) => <>{value}</>} // [!code focus]
    </Context对象.Consumer> // [!code focus]
  )
}
```

```ts [TS类型<Badge>完整版</Badge>]
function createContext<T>(defaultValue: T): Context<T>;

interface Context<T> {
  Provider: Provider<T>;
  Consumer: Consumer<T>;
  displayName?: string | undefined;
}
```

:::

::: details `<Context对象.Provider>`

用于将数据传递后代组件的组件，必须通过`value`传递上下文数据

传递的数据的获取可通过组件`<Context.Consumer>`或钩子函数[`useContext()`](./hooks.md#usecontext)

::: code-group

```tsx [TS类型]
interface ProviderProps<T> {
  value: T;
  children?: ReactNode | undefined;
}
```

```tsx{0} [例子]
import React, { createContext, useContext } from "react";

const MyContext = createContext<{ data: string } | undefined>(undefined); // [!code focus]

export default function Father() {
  return (
    <MyContext.Provider value={{ data: "xxxxxx" }}> // [!codefocus]
      <A /> // [!code focus]
      <B /> // [!code focus]
    </MyContext.Provider> // [!code focus]
  );
}

const A = () => {
  return (
    <MyContext.Consumer> // [!code focus]
      {(value) => <div>A: {value?.data}</div>} // [!code focus]
    </MyContext.Consumer> // [!code focus]
  );
};

const B = () => {
  const value = useContext(MyContext); // [!code focus]
  return <>B: {value?.data}</>; // [!code focus]
};
```

:::

::: details `<Context对象.Consumer>`
是用于在后代组件中获取上下文值的函数组件

接收一个函数作为其子元素，函数接收上下文的当前值作为参数，并返回一个 React 元素来渲染 UI

::: code-group

```tsx [TS类型]
interface ConsumerProps<T> {
  children: (value: T) => ReactNode;
}
```

```tsx{0} [例子]
import React, { createContext } from "react";

const MyContext = createContext<{data: string} | undefined>(undefined); // [!code focus]

const Father = () => {
  return (
    <MyContext.Provider value={{data: "xxxxxx"}}>
      <Child />
    </MyContext.Provider>
  );
};

const Child = () => {
  return (
    <>
      <MyContext.Consumer> // [!code focus]
        {(value) => <div>{value?.data}</div>} // [!code focus]
      </MyContext.Consumer> // [!code focus]

      <GrandChild />
    </>
  );
};

const GrandChild = () => {
  return (
    <MyContext.Consumer> // [!code focus]
      {(value) => <button onClick={() => alert(value?.data)}>show</button>} // [!code focus]
    </MyContext.Consumer> // [!code focus]
  );
};
```

:::

## startTransition()

`React.startTransition()`用于处理优先级调度

它接受一个回调函数作为参数，并将该回调函数延迟执行，以便在其他高优先级任务完成后再执行

```tsx
startTransition(() => {
  // ...
});
```

::: details 例：优化用户交互的响应速度，避免界面闪烁或卡顿

React 将会`React.startTransition()`包裹的任务视为低优先级，即等其他任务 (如下数据请求 ) 完成后再执行，从而不会阻塞用户界面的更新

- 第一段代码：**可能会导致界面在数据请求完成之前状态被更新，从而出现闪烁的效果**
- 第二段代码：**可以确保界面状态先更新后再进行数据请求，从而避免了闪烁的效果**

```tsx{0}
import React, { startTransition, useState } from "react";

export default function Component() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // 模拟异步请求
  const fetchData = () => setTimeout(() => setLoading(false), 2000);


  const handleClick = () => {
    setLoading(true); // [!code --]
    setCount(count + 1); // [!code --]
    fetchData(); // [!code --]
  };

  const handleClick = () => {
    startTransition(() => { // [!code ++]
      setLoading(true); // [!code ++]
      setCount(count + 1); // [!code ++]
    }); // [!code ++]
    fetchData(); // [!code ++]
  };

  return (
    <>
      <p>Count: {count}</p>

      {loading ? (
        <span>Loading...</span>
      ) : (
        <button onClick={handleClick}>+1</button>
      )}
    </>
  );
}
```

:::
