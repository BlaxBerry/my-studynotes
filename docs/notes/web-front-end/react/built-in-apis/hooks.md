# React 钩子函数 ( Hooks )

## 简介

Hook 是 React 16.8 的新增特性

只能在函数组件顶层使用，可以在不编写类组件的情况下使用 React 特性

::: tip Hooks 规则检查插件

[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

:::

https://juejin.cn/post/7064097257821306916

## useState()

https://www.robinwieruch.de/react-form/

::: details 不能将组件`props`作为初始值

:::

## useRef()

`useRef()`用于定义不需要渲染的引用值 ( Ref )

```tsx
const ref = React.useRef<引用值类型>(引用值初始值);
```

::: tip `ref.current`

`useRef()`返回值为一个仅包含`current`属性的 JS 对象

```tsx{0}
{ current: 引用值 }
```

- `current`属性用来存储任何类型的引用数据 ( Ref )
- `current`属性默认值为`undefined`
- `current`属性可读写，属性值的变化会立即执行

:::

::: details `current`的更改不会触发组件重新渲染

```tsx
import { useRef } from "react";

export default function Component() {
  const ref = useRef<number>(0);

  console.log("rendered");

  return <button onClick={() => ref.current++}>+1</button>;
}
```

:::

::: details `current`不建议在组件渲染期间读写

- 仅事件处理函数内可获取立即更新后的`current`
- 组件内读取的`current`永远为默认值`undefined`或初始值<br/>
  若嵌入 JSX 中也只会展示在组件初次渲染更新的值
- 组件内无法通过`useEffect()`监测到`current`变化

```tsx{6-9}
import { useEffect, useRef } from "react";

export default function Component() {
  const ref = useRef<number>(0);

  const addEventHandler = (): void => {
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
      <button onClick={addEventHandler}>+1</button>
    </>
  );
}
```

:::

`useRef()`定义的引用 Ref 多用来储存不需要渲染到 JSX 的数据、DOM 元素

::: details 存储操作 DOM 元素

- 初始值必须为`null`，返回值需赋值给对应节点 JSX 标签的`ref`属性
- 若目标节点是自定义组件需使用[`forwardRef()`](methods.md#forwardref)

```tsx
import { useRef } from "react";

export default function Component() {
  const ref = useRef<元素类型>(null);

  return <JSX标签 ref={ref} />;
}
```

<details class="details custom-block">
  <summary>例：<code>&ltinput/></code>非控组件</summary>

```tsx
import { useRef } from "react";

export default function Component() {
  const ref = useRef<HTMLInputElement>(null);

  return <input ref={ref} />;
}
```

</details>

<details class="details custom-block">
  <summary>例：<code>&ltinput/></code>聚焦</summary>

```tsx
import { useRef } from "react";

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

https://react.dev/learn/referencing-values-with-refs

https://react.dev/reference/react/useRef

## useImperativeHandle()

## useContext()

## useEffect()

## useMemo()

useMemo 缓存计算数据的值。

## useCallback()

useCallback 缓存函数的引用

## 自定义 Hooks ( useXxxx )
