# React 组件基础

## 类组件

类组件 ( Class Components ) 已经过时，推荐使用函数组件

## 函数组件

函数组件 ( Function Components )

## 组件间通信

::: details 父 → 子

利用`props`传递

:::

::: details 子 → 父

利用`props`传递回调函数

:::

::: details 兄弟之间

- 多个子组件共享父组件中状态、方法
- 使用状态管理，比如 Redux

:::

::: details 深层组件跨层级

使用上下文对象 Context

:::

## 组件设计模式

https://blog.logrocket.com/react-design-patterns/

### 高阶组件 ( HOC )

高阶组件 ( Higher Order Component ) 模式用于封装复用组件

高阶组件是一个函数，接收一个组件作为参数，对其进行封装增强后作为一个新组件返回

习惯命名为`with自定义名`

::: code-group

```tsx{0} [定义]
import React from "react";

function with高阶组件<P extends object>( // [!code focus]
    目标原始组件: React.ComponentType<P> // [!code focus]
) { // [!code focus]
  const 包裹增强后的组件: React.FC<P> = (props: P) => ( // [!code focus]
    <div> // [!code focus]
      {/* 通用的内容 */}
      <目标原始组件 {...props} /> // [!code focus]
      {/* 通用的内容 */}
    </div> // [!code focus]
  ); // [!code focus]
 // [!code focus]
  return 包裹增强后的组件; // [!code focus]
} // [!code focus]

export default with高级组件;
```

```tsx [使用]
import React from "react";

const 原始目标组件: React.FC<Props类型> = (props) => <div>...</div>; // [!code focus]

const 处理后的目标组件 = with高阶组件(原始目标组件); // [!code focus]

export default function Father() {
  return (
    <>
      <处理后的目标组件 属性={值} /> // [!code focus]
    </>
  );
}
```

:::

::: details 例：利用 HOC 定义一个通用模版，并使用该模版

```tsx{0}
import React, { ComponentType, FC } from "react";

const withTemplate = <P extends object>(Component: ComponentType<P>): FC<P> => { // [!code focus]
  return (props: P) => ( // [!code focus]
    <div className="p-4 bg-red-500"> // [!code focus]
      <Component {...props} /> // [!code focus]
    </div> // [!code focus]
  ); // [!code focus]
}; // [!code focus]

const A: FC<{ aa: string }> = (props) => <div>AAA {props.aa}</div>;
const B: FC<{ bb: string }> = (props) => <div>BBB {props.bb}</div>;

const TemplatedA = withTemplate(A); // [!code focus]
const TemplatedB = withTemplate(B); // [!code focus]

function App() {
  return (
    <>
      <TemplatedA aa="xxxx" /> // [!code focus]
      <TemplatedB bb="xxxx" /> // [!code focus]
    </>
  );
}
```

:::

---

### 渲染属性 ( Render Props )

渲染属性 ( Render Props ) 模式用于组件代码共享与复用

通过组件`props`将一个函数组件传递给通用组件并在其内部调用，传入的函数可通过参数接收通用组件内的状态与方法，返回一个 React 元素 / 组件来渲染界面

::: code-group

```tsx{0} [定义通用组件]
import React from "react";

interface Props类型 {
  render: (params?: 参数类型 | undefined) => React.ReactNode;
}

const Common: React.FC<Props类型> = ({ render }) => { // [!code focus]
  // 通用的逻辑;
  return ( // [!code focus]
    <div> // [!code focus]
      {/* 通用的内容 */}
      {render(参数)} // [!code focus]
      {/* 通用的内容 */}
    </div> // [!code focus]
  ); // [!code focus]
}; // [!code focus]
```

```tsx{0} [使用通用组件]
import React from "react";

const Component: React.FC = () => {
  return (
    <>
      <Common render={() => <div>插入的渲染内容</div>} /> // [!code focus]
      <Common render={() => <div>插入的渲染内容</div>} /> // [!code focus]
      <Common // [!code focus]
        render={(params) => ( // [!code focus]
          <div> // [!code focus]
            插入的渲染内容 // [!code focus]
            {params} // [!code focus]
            插入的渲染内容 // [!code focus]
          </div> // [!code focus]
        )} // [!code focus]
      /> // [!code focus]
    </>
  );
}
```

:::

::: details 例：定义并使用一个能获取鼠标指针位置的通用组件

::: code-group

```tsx [定义]
import React from "react";
import MouseSpace from "components/common/MouseSpace";

export default function Component() {
  return (
    <>
      <MouseSpace
        render={(position) => (
          <div>
            <div>x: {position.x}</div>
            <div>y: {position.y}</div>
          </div>
        )}
      />
    </>
  );
}
```

```tsx [使用]
import React, { useState } from "react";

const initPosition = { x: 0, y: 0 };

type Position = typeof initPosition;

interface CommonProps {
  render: (position: Position) => React.ReactNode;
}

const MouseSpace: React.FC<CommonProps> = ({ render }) => {
  const [mousePosition, setMousePosition] = useState<Position>(initPosition);
  const handlerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      style={{ height: "100vh" }}
      onMouseMove={handlerMouseMove}
    >
      {render(mousePosition)}
    </div>
  );
};

export default MouseSpace;
```

:::

::: warning 缺点：

- 易出现命名冲突，尤其是作为子组件的函数的参数
- 易出现嵌套地狱的问题，作为子组件的函数的返回值过复杂是可读性差

:::

---

### 容器/组件 ( Container/Component )

容器/组件（ Container/Component ）模式也称为 Stateful/Stateless 模式

该模式注重于业务逻辑和 UI 的分离

::: tip 由两部分组成：容器组件、展示组件

- 容器组件 ( Container components )
  - 专门负责状态管理、数据请求等业务逻辑
  - 通过`props`传递数据、事件处理逻辑给展示组件
- 展示组件 ( Presentational components )
  - 专门负责渲染 UI 和处理用户交互
  - 无状态
  - 通过`props`接收来自容器组件的数据、事件处理逻辑

:::

::: details 例：`<Father>`为容器组件、`<Child>`为展示组件

::: code-group

```tsx [容器组件]
import React from "react";

const Father: React.FC = () => {
  const [list, setList] = useState<number[]>([1, 2]);

  const handleClick = (params: string): void => console.log(`xxx${params}xxx`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    console.log(e.target.value);

  return (
    <Child // [!code focus]
      list={list} // [!code focus]
      setList={setList} // [!code focus]
      onClick={handleClick} // [!code focus]
      onChange={handleChange} // [!code focus]
    />
  );
};
```

```tsx [展示组件]
import React from "react";

interface Props {
  list: number[];
  setList: React.Dispatch<React.SetStateAction<number[]>>;
  onClick: () => void;
  onChange: () => void;
}

const Child: React.FC<Props> = ({ list, setList, onClick, onChange }) => (
  <>
    <ul>
      {list.map((e, i) => (
        <li key={i}>{e}</li>
      ))}
    </ul>
    <input onChange={onChange} />
    <button onClick={() => onClick("xxx")}>xxx</button>
  </>
);
```

:::

::: warning 缺点：

- 组件之间的相互依赖关系复杂，增加了耦合性，降低了灵活性和可扩展性
- 组件的数量过多会增加复杂性，以及后期维护和调试的难度

:::

---

### 复合组件（ Compound Components ）

复合组件（ Compound Components ）模式是指将多个组件组合起来形成一个更高级别的组件

复合组件模式通常包含一个父组件和多个子组件

父组件负责定义整体的结构和逻辑，子组件负责实现具体的功能

::: details 例：页面组件

```tsx
import React from "react";

const Header = ({ children }) => <header>{children}</header>;
const Content = ({ children }) => <main>{children}</main>;
const Footer = ({ children }) => <footer>{children}</footer>;

// 父组件
export default function Page() {
  return (
    <div>
      <Header>页面标题</Header>
      <Content>页面内容</Content>
      <Footer>页面底部</Footer>
    </div>
  );
}
```

:::

---

### Hooks 模式

使用钩子函数 ( Hooks ) 实现状态与逻辑的共享，减少组件的耦合与重复

[详见 React 内置 Hooks](../built-in-apis/hooks.md)

---
