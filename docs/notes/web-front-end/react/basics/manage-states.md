# React 状态管理

https://mp.weixin.qq.com/s/aud0xe7HbcUw1GJhfph1nw

### Provider 模式

用于在组件树中的多个组件之间共享全局状态数据

详见 [`createContext()`](../built-in-apis/methods.md#createcontext)

```tsx{0}
import React, { createContext } from "react";

const MyContext = createContext();

const Father = () => {
  const data = "xxxxxx";

  return (
    <MyContext.Provider value={data}>
      <Child />
    </MyContext.Provider>
  );
};

const Child = () => {
  return (
    <MyContext.Consumer>
       {(value) => <p>{value}</p>}
    </MyContext.Consumer>
  );
};
```

---

### State Reducer 模式

它通过使用一个 state reducer 函数来控制状态的更新逻辑。

在常规的 React 组件中，通常使用 setState 方法来更新状态。然而，在某些情况下，我们可能需要更复杂的状态更新逻辑。这就是 State Reducer 模式的用武之地。

State Reducer 模式的核心思想是将控制状态更新逻辑的责任委托给一个 state reducer 函数。这个函数接受当前状态和 action，然后返回新的状态。通过将这个函数传递给组件，我们可以自定义状态的更新行为。

```tsx
import React, { useReducer } from "react";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increment = () => {
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
  };

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```
