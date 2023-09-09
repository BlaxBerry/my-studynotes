# React 钩子函数 ( Hooks )

## 简介

Hook 是 React 16.8 的新增特性

是对函数组件的增强，只能在函数组件顶层使用

可以在不编写类组件的情况下状态存储、处理副作用等 React 特性

::: tip Hooks 规则检查插件

[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

:::

https://juejin.cn/post/7064097257821306916

## useState()

`useState()`用于定义会引起渲染的组件状态值 ( State )

钩子函数返回值返回一个数组，包含定义的状态值与更新状态的函数

::: code-group

```tsx [使用]
import React, { useStat } from "react";

export default function 组件() {
  const [state, setState] = useState<状态数据类型>(状态初始值); // [!code focus]

  return ...
}
```

```ts [TS类型<Badge>方便理解版</Badge>]
function useState<S = undefined>(
  initialState？: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];
```

:::

::: tip `state`状态初始化

- 状态初始值默认为`undefined`
- 状态初始化仅发生在组件初次渲染期间

<details class="details custom-block">
  <summary><code>state</code>可通过函数初始化</summary>

详见 [性能优化](../performance/render-optimizing.md#避免-state-初始化函数重复调用)

```tsx
const [state, setState] = useState(状态初始化函数);
// 需要动态参数时
const [state, setState] = useState(() => 状态初始化函数(参数));
```

</details>

<details class="details custom-block">
  <summary><code>state</code>是个函数时要避免自动执行 ( 不常见 )</summary>

组件状态 state 可存储任何数据当然也可为一个函数

详见 [性能优化](../performance/render-optimizing.md#避免-state-初始化函数重复调用)

```tsx
const [_, __] = useState<Function>(函数名); // [!code --]
const [_, __] = useState<Function>(() => 函数名); // [!code ++]

setState(函数名); // [!code --]
setState(() => 函数名); // [!code ++]
```

</details>

<details class="details custom-block">
  <summary><code>state</code>初始值为动态<code>props</code>时不会改变</summary>

不建议将会动态改变的`props["属性"]`作为组件状态的初始值<br/>
`state`永远为`props["属性"]`的初始值，不会随之改变

- 因为状态的初始化仅发生在组件初次渲染期间
- 并且状态的改变只能通过`setState()`方法

```tsx
import React, { useState } from "react";

export default function Father() {
  const [state, setState] = useState<number>(0);
  const add = () => setState((s) => (s += 1));

  return (
    <>
      <Child state={state} />
      <button onClick={add}>+1</button>
    </>
  );
}

const Child = (props: { state: number }) => { // [!code focus]
  const [state] = useState(props.state); // [!code focus]

  console.log(state); // [!code focus] // 永远为参数初始值 0
  console.log(props.state); // [!code focus] // 会实时更新

  console.log("rendered"); // 组件初次渲染和重新渲染时都会打印

  return ... // [!code focus]
}; // [!code focus]
```

- 解决方法 1 <Badge type="warning">不推荐</Badge> `useEffect()`更新

```tsx
export default function Child (props) {
  const [state, setState] = useState(props.state); // [!code focus]

  useEffect(() => { // [!code focus]
    setState(props.state); // [!code focus]
  }, [props.state]); // [!code focus]

  return ...
};
```

- 解决方法 2 <Badge>推荐</Badge>`useMemo()`缓存

```tsx
export default function Child (props) {
  const state = useMemo(() => props.state, [props.state]); // [!code focus]

  return ...
};
```

</details>

<details class="details custom-block">
  <summary><code>state</code>的更新会触发组件重新渲染</summary>

```tsx
export default function Component() {
  const [state, setState] = useState<boolean>(true);
  const toggle = () => setState((s) => !s);

  console.log("rendered"); // 组件初次渲染和重新渲染时都会打印

  return <button onClick={toggle}>Toggle</button>;
}
```

</details>

:::

::: tip `setState`状态更新函数

- 状态的改变只能通过`setState()`方法
- 方法习惯命名为`set[状态名]`

```tsx
setState(固定新值);
// 或
setState((当前状态) => 基于当前状态改变后的新状态);
```

<details class="details custom-block">
  <summary>状态的改变为异步</summary>

状态的改变为异步执行，无法同步获取改变后的最新状态

```tsx
import React, { useState } from "react";

export default function Component() {
  const [state, setState] = useState<number>(1);

  const onClick = () => {
    setState((s) => (s *= 10)); // [!code focus]
    console.log(state); // [!code focus] // [!code --] // 打印出的时改变前的旧状态
  };

  return (
    <>
      <div>{state}</div>
      <button onClick={onClick}>update</button>
    </>
  );
}
```

若想同步获取最新状态可在调用`setState()`之前存入变量

```tsx
import React, { useState } from "react";

export default function Component() {
  const [state, setState] = useState<number>(1);

  const onClick = () => {
    setState((s) => (s *= 10)); // [!code focus]
    const newData = state * 10; // [!code focus] // [!code ++]
    console.log(newData); // [!code focus] // [!code ++]
  };

  return (
    <>
      <div>{state}</div>
      <button onClick={onClick}>update</button>
    </>
  );
}
```

</details>

<details class="details custom-block">
  <summary>改变复杂数据类型的状态</summary>

- 数值：

```tsx
import React, { useState } from "react";

export default function Component() {
  const [a, setA] = useState<Array<number>>([1, 2]);
  const [b, setB] = useState<Array<number>>([1, 2]);

  const pushToA = () => {
    setA((s) => [...s, (s[s.length - 1] += 1)]); // [!code focus] // [!code --]
  };

  const pushToB = () => {
    const __b = [...b, (b[b.length - 1] += 1)]; // [!code focus] // [!code ++]
    setB(__b); // [!code focus] // [!code ++]
  };

  return (
    <>
      <button onClick={pushToA}>push to list A</button>
      <br />
      <button onClick={pushToB}>push to list B</button>
    </>
  );
}
```

- 键值对对象

```tsx
import React, { useState } from "react";

export default function Component() {
  const [a, setA] = useState<{ key: number }>({ key: 1 });
  const [b, setB] = useState<{ key: number }>({ key: 1 });

  const updateA = () => {
    setA((s) => ({ ...s, key: (s["key"] += 1) })); // [!code focus] // [!code --]
  };

  const updateB = () => {
    const __b = { ...b, key: (b["key"] += 1) }; // [!code focus] // [!code ++]
    setB(__b); // [!code focus] // [!code ++]
  };

  return (
    <>
      <button onClick={updateA}>change value of a</button>
      <br />
      <button onClick={updateB}>change value of b</button>
    </>
  );
}
```

</details>

:::

## useRef()

`useRef()`用于定义不需要渲染的引用值 ( Ref )

多用来储存不需要渲染到 JSX 的数据、DOM 元素

钩子函数返回值为一个仅包含`current`属性的 JS 对象

::: code-group

```tsx [使用]
import React, { useRef } from "react";

export default function 组件() {
  const ref = useRef<引用值类型>(引用值初始值); // [!code focus]

  return ...
}

```

:::

::: tip `ref.current`

```tsx{0}
{ current: 引用值 }
```

- `current`属性用来存储任何类型的引用数据 ( Ref )
- `current`属性默认值为`undefined`
- `current`属性可读写，属性值的变化会立即执行

<details class="details custom-block">
  <summary>更改<code>current</code>不会触发组件重新渲染</summary>

```tsx
import React, { useRef } from "react";

export default function Component() {
  const ref = useRef<number>(0);

  console.log("rendered"); // 仅在组件初始次渲染时打印

  return <button onClick={() => ref.current++}>+1</button>;
}
```

</details>

<details class="details custom-block">
  <summary>不建议在组件渲染期间读写<code>current</code></summary>

- 仅事件处理函数内可获取立即更新后的`current`<br/>
  组件内读取的`current`永远为默认值`undefined`或初始值<br/>
  若嵌入 JSX 中也只会展示在组件初次渲染更新的值
- 组件内无法通过`useEffect()`监测到`current`变化

```tsx{6-9}
import React, { useEffect, useRef } from "react";

export default function Component() {
  const ref = useRef<number>(0);

  const handleClick = (): void => {
    ref.current++;
    console.log(ref.current++); // 事件处理函数的调用时打印最新的 ref
  };

  console.log(ref.current); // [!code error] // 仅组件初次渲染时打印 0

  useEffect(() => { // [!code error]
    console.log(ref.current); // [!code error] // 仅组件初次渲染时打印 0
  }); // [!code error]

  return (
    <>
      <div>{ref.current}</div> // [!code error] {/* 永远展示初始值 0 */}
      <button onClick={handleClick}>+1</button>
    </>
  );
}
```

</details>

:::

::: details 存储操作 DOM 元素

- 初始值必须为`null`，返回值需赋值给对应节点 JSX 标签的`ref`属性
- 若目标节点是自定义组件，需使用[`forwardRef()`](methods.md#forwardref)

```tsx
import React, { useRef } from "react";

export default function Component() {
  const ref = useRef<元素类型>(null);

  return <JSX标签 ref={ref} />;
}
```

<details class="details custom-block">
  <summary>例：<code>&ltinput/></code>非控组件</summary>

```tsx
import React, { useRef } from "react";

export default function Component() {
  const ref = useRef<HTMLInputElement>(null);

  return <input ref={ref} />;
}
```

</details>

<details class="details custom-block">
  <summary>例：<code>&ltinput/></code>聚焦</summary>

```tsx
import React, { useRef } from "react";

export default function Component() {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <input ref={ref} />
      <button onClick={() => ref.current?.focus()}>onFocus</button>
    </>
  );
}
```

</details>

:::

## useImperativeHandle()

`useImperativeHandle()`用来将当前组件内的状态和方法定义到来自父组件的引用 Ref 对象上

需结合使用[`useRef()`](#useref)、[`forwardRef()`](methods.md#forwardref)

::: code-group

```tsx [使用<Badge>子组件</Badge>]
import React, { forwardRef, useImperativeHandle } from "react";

export default forwardRef<Ref类型, Props类型>(function 子组件(props, ref) { // [!code focus]
  useImperativeHandle(ref, () => 数据, [依赖项]); // [!code focus]

  return ...
});
```

```tsx [使用<Badge>父组件</Badge>]
import React, { useRef } from "react";

export default function 父组件() {
  const ref = useRef<Ref类型>(null); // [!code focus]

  const 子组件状态 = () => ref.current?.子组件状态; // [!code focus]
  const 子组件函数 = () => ref.current?.子组件函数(); // [!code focus]

  return <子组件 ref={ref} />; // [!code focus]
}
```

```ts [TS类型<Badge>完整版</Badge>]
function useImperativeHandle<T, R extends T>(
  ref: Ref<T> | undefined,
  init: () => R,
  deps?: DependencyList
): void;
```

:::

::: details 例：父组件使用子组件传递的状态与数据

子组件传递的状态因为存放于[`useRef()`](#useref) 返回值的 ref 上，ref 的改变不会导致组件重新渲染，所以直接在父组件打印与渲染无法动态获取更新值，只能通过调用一个自定义函数来获取

::: code-group

```tsx [父组件]
import React, { useRef } from "react";
import { MyHandle } from "./Child";

export default function Father() {
  const childRef = useRef<MyHandle>(null); // [!code focus]

  const callChildFuncA = () => childRef.current?.funcA(); // [!code focus]
  const callChildFuncB = () => childRef.current?.funcB("HHHHH"); // [!code focus]
  const childSetState = () => childRef.current?.setState((s) => (s += 1)); // [!code focus]

  console.log(childRef.current?.state); // [!code focus] // [!code --] // 仅在父组件初次渲染时打印 undefined
  const showChildState = () => console.log(childRef.current?.state); // [!code focus] // [!code ++] // 可获取动态更新的值

  return (
    <>
      <Child ref={childRef} /> // [!code focus]
      <button onClick={callChildFuncA}>call funcA</button> // [!code focus]
      <button onClick={callChildFuncB}>call funcB</button> // [!code focus]
      <button onClick={childSetState}>state +1</button> // [!code focus]
      <button onClick={showChildState}>show state</button> // [!code focus]
      <div>{childRef.current?.state}</div> // [!code focus] // [!code --] {/* 永远为 undefined */}
    </>
  );
}
```

```tsx{0} [子组件]
import { Dispatch, SetStateAction, forwardRef, useImperativeHandle, useState } from "react";

export interface MyHandle {
  funcA: () => void;
  funcB: (params: unknown) => void;
  state: number;
  setState: Dispatch<SetStateAction<number>>;
}

export default forwardRef<MyHandle>(function Child(_, ref) { // [!code focus]
  const [state, setState] = useState<MyHandle["state"]>(0);

  useImperativeHandle( // [!code focus]
    ref, // [!code focus]
    () => ({ // [!code focus]
      funcA: () => console.log("xxx"), // [!code focus]
      funcB: (params) => console.log(params), // [!code focus]
      state: state, // [!code focus]
      setState: setState, // [!code focus]
    }),  // [!code focus]
    [state] // [!code focus]
  ); // [!code focus]

  return null;
}); // [!code focus]
```

:::

::: details 例：父组件直接操作子组件中 DOM 元素

::: code-group

```tsx [父组件]
import React, { useRef } from "react";
import { MyHandle } from "./Child";

export default function Father() {
  const childRef = useRef<MyHandle>(null); // [!code focus]

  const focus = () => childRef.current?.focus(); // [!code focus]
  const remove = () => childRef.current?.remove(); // [!code focus]

  return (
    <>
      <Child ref={childRef} /> // [!code focus]
      <button onClick={focus}>focus</button> // [!code focus]
      <button onClick={remove}>remove</button> // [!code focus]
    </>
  );
}
```

```tsx{0} [子组件]
import React, { forwardRef, useImperativeHandle, useRef } from "react";

export interface MyHandle {
  focus: () => void;
  remove: () => void;
}

export default forwardRef(function Child(_, ref) { // [!code focus]
  const inputRef = useRef<HTMLInputElement>(null); // [!code focus]

  useImperativeHandle(ref, () => ({ // [!code focus]
    focus: () => inputRef.current?.focus(), // [!code focus]
    remove: () => inputRef.current?.remove(), // [!code focus]
  })); // [!code focus]

  return <input ref={inputRef} />; // [!code focus]
}); // [!code focus]
```

:::

## useContext()

`useContext()`用于在后代组件中访问上下文对象 Context 中数据

需结合使用[`createContext()`](methods.md#createcontext)

::: code-group

```tsx{0} [后代组件中使用上下文数据]
import React from "react";
import { Context对象 } from "先祖组件";

const 后代组件 = () => { // [!code focus]
  const Context对象中的数据 = React.useContext(Context对象); // [!code focus]

  return <div>{Context对象中的数据}</div>; // [!code focus]
}; // [!code focus]

export default MyComponent;
```

```tsx{0} [先祖组件中传递上下文数据]
import React from "react";

export const Context对象 = React.createContext<数据类型>(初始值); // [!code focus]

const 先祖组件 = () => { // [!code focus]
  return ( // [!code focus]
    <Context对象.Provider value={传递给后代组件的数据}> // [!code focus]
      <后代组件 /> // [!code focus]
    </Context对象.Provider> // [!code focus]
  ); // [!code focus]
}; // [!code focus]

export default 先祖组件;
```

:::

::: details 例子：创建并使用主题色 ThemeProvider

::: code-group

```tsx{0} [后代组件]
import React, { useContext } from "react";
import { ThemeContext } from "./Father";

const Child = () => {
  const contextValue = useContext(ThemeContext); // [!code focus]

  const theme = contextValue?.theme; // [!code focus]
  const toggleTheme = () => // [!code focus]
    contextValue?.setTheme((s) => (s === "white" ? "black" : "white")); // [!code focus]

  return (
    <div
      className="text-gray-500"
      style={{ backgroundColor: contextValue?.theme }}
    >
      <div>Theme: {theme}</div> // [!code focus]
      <button onClick={toggleTheme}>Toggle</button> // [!code focus]
    </div>
  );
};

export default Child;
```

```tsx{0} [先祖组件]
import React, { Dispatch, SetStateAction, createContext, useState } from "react";

type Theme = "white" | "black";

type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
} | undefined;

export const ThemeContext = createContext<ThemeContextType>(undefined); // [!code focus]

const Father = () => {
  const [theme, setTheme] = useState<Theme>("white"); // [!code focus]

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}> // [!code focus]
      <Child /> // [!code focus]
    </ThemeContext.Provider> // [!code focus]
  );
}

export default Father;
```

:::

## useEffect()

## useMemo()

useMemo 缓存计算数据的值。

## useCallback()

useCallback 缓存函数的引用

## 自定义钩子 ( useXxxx )
