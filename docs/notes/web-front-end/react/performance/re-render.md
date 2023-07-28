# React 重新渲染 ( re-Render )

https://www.developerway.com/posts/react-re-renders-guide#part1

https://blog.logrocket.com/react-conditional-rendering-9-methods/

https://medium.com/@shriharim006/react-how-to-stop-re-rendering-in-react-components-bab286f13d33

::: tip 根据触发时机 React 组件渲染分为 2 种：

1. 初始渲染 ( Initial Render )：组件首次出现在屏幕上时
2. 重新渲染 ( Re-Render )：已经存在于屏幕上的组件的第二次以及之后的渲染

:::

::: tip 根据是否必须 React 组件渲染分为 2 种：

1. 必要的渲染 ( Necessary )：用户与应用程序交互、异步数据请求、某些订阅模型传递等场合导致组件展示内容进行必要的更新
2. 非必要的渲染 ( Unnecessary )：应当尽量避免

:::

## 重新渲染的原因

---

### 组件自身状态改变

组件自身状态改变时会导致组件自身重新渲染

::: tip 改善方案：

- [使用 Ref 存储数据](#使用-ref-存储数据)
<!-- - [利用`useMemo()`进行数据昂贵计算]() -->

:::

---

### 父组件重新渲染

当一个组件重新渲染时，其所有子组件也会随着重新渲染

::: tip 改善方案：

- [使用`React.memo()`记忆子组件](#记忆子组件)

:::

https://www.developerway.com/posts/react-elements-children-parents

---

### 上下文 ( Context ) 改变

当`<Context.Provider>`中的`value`值发生更改时，所有使用了此`Context`的组件都将重新渲染，即使它们不直接使用数据的更改部分

---

### 组件自身钩子函数 ( Hooks ) 变化

Hooks 钩子内的所有东西被视为所属于调用该钩子的组件，所以组件自身发生改变，从而导致组件重新渲染

---

### 组件接收的参数 ( props ) 改变

组件接收的`props`的更新改变实质是父组件发生了改变导致作为子组件的当前组件重新渲染

故本项原因应该仍为上述[父组件重新渲染](#父组件重新渲染)

## 避免不必要的重新渲染

### 下移组件状态

不要将仅子组件自身使用的状态定义在父组件，否则会导致其他子组件也跟着重新渲染

建议将状态定义在使用的组件内，尽可能减少由于父组件导致的子组件重新渲染

::: details 例子：

- 修改状态`count`的定义位置，应该定义在使用该状态的`<B/>`组件中
- 调整`<B/>`组件 UI 结构，与状态`count`相关的逻辑也放入`<B/>`组件中

::: code-group

```tsx [❌]
import { useState } from "react";

export default function Father() {
  const [count, setCount] = useState<number>(0); // [!code --]
  return (
    <>
      <A />
      <B count={count} /> // [!code --]
      <button onClick={() => setCount((s) => (s += 1))}>+1</button>
    </>
  );
}

function A() {
  console.log("A rendered");
  return <div>A</div>;
}

function B({ count }: { count: number }) {
  console.log("B rendered");
  return <div>B {count}</div>;
}
```

```tsx [✅]
import { useState } from "react";

export default function Father() {
  return (
    <>
      <A />
      <B /> // [!code ++]
    </>
  );
}

function A() {
  console.log("A rendered");
  return <div>A</div>;
}

function B() {
  const [count, setCount] = useState<number>(0); // [!code ++]
  console.log("B rendered");
  return (
    <>
      <div>B {count}</div>
      <button onClick={() => setCount((s) => (s += 1))}>+1</button> // [!code ++]
    </>
  );
}
```

:::

---

### 使用 Ref 存储数据

建议将不需要渲染到页面数据定义为引用 ( Ref ) 来避免状态更新导致的组件重新渲染

即利用[`useRef()`](../built-in-apis/hooks.md#useref)替代`useState()`

::: details 例：非空组件替换受控组件

可按需替换受控组件的`useState()` + `onChange()`

::: code-group

```tsx{0} [👎]
import { ChangeEvent, useState } from "react";

export default function Father() {
  const [state, setState] = useState<string>(""); // [!code --]
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setState(e.target.value); // [!code --]

  console.log("rendered");

  return <input value={state} onChange={onChange} />; // [!code --]
}
```

```tsx [👍]
import { useRef } from "react";

export default function Father() {
  const ref = useRef<HTMLInputElement>(null); // [!code ++]

  return <input ref={ref} />; // [!code ++]
}
```

:::

---

### 记忆子组件

使用[`React.memo()`](../built-in-apis/methods.md#memo)记忆子组件

---

### 记忆上下文

```

```
