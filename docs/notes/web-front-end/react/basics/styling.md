# React 组件样式

## 内联样式

内联样式 ( Inline Style ) 是 CSS-in-JS 的实现

通过 JSX 标签的`style`属性接收一个属性为小驼峰的 JavaScript 对象

```jsx
import React from "react";

export default function Component() {
  // ...
  return (
    <JSX标签
      style={{
        属性: 固定值,
        属性: 函数(参数),
        属性: 组件状态,
      }}
    />
  );
}
```

::: details 例子：

::: code-group

```tsx{5-7} [👎]
import React from "react";

export default function Component() {
  return (
    <div style={{ marginTop: "20px" }}>
      <h1 style={{ fontWeight: "bold" }}>xxx</h1>
    </div>
  );
}
```

```tsx{3-6,10-12} [👍]
import { CSSProperties } from "react";

const styles: CSSProperties = {
  div: { marginTop: "20px" },
  h1: { fontWeight: "bold" },
};

export default function Component() {
  return (
    <div style={styles.div}>
      <h1 style={styles.h1}>xxx</h1>
    </div>
  );
}
```

:::

::: tip 优点：

1. 作为 JS 对象定义可避免样式冲突，实现外部定义
2. 利用 JS 语法可方便进行扩展、动态改变、复用

:::

::: warning 缺点：

1. 内联样式过多会导致代码可读性差
2. 无法处理部分 CSS 样式（ 伪类、伪元素、媒体查询 ）

:::

## 外联样式

引入单独的样式表 ( Style Sheet ) 目前多为`.css`、`.scss`、`.less`文件

样式文件中定义的类名需要通过 JSX 标签的`className`属性使用，其余的选择器、动画、媒体查询等会被自动使用

```jsx{6}
import React from "react";
import "样式表文件.后缀";

export default function Component() {
  return (
    <JSX标签 className="样式表文件中的类名 样式表文件中的类名" />
  );
}
```

::: details 例子：

::: code-group

```jsx{2,6-8} [组件]
import React from "react";
import "./styles.css";

export default function Component() {
  return (
    <div className="my-div">
      <h1 className="my-h1">xxx</h1>
    </div>
  );
}
```

```css [CSS样式表]
.my-div {
  margin-top: 20px;
}

.my-h1 {
  font-weight: bold;
}
```

:::

::: tip 优点

1. 关注分离，分离逻辑与样式
2. 可使用 CSS 的全部功能
3. 样式文件有助于浏览器缓存，有利于性能优化

:::

::: warning 缺点：

1. 定义的样式为全局样式，会有样式冲突覆盖问题
2. 随着样式表文件的复杂，代码可读性会变差，维护整理难度变大
3. 样式动态改变相对来说不算方便 ( 样式列表中无法实现，组件中需借助[`clsx`]()切换类名 )

:::

## 样式模块化

将样式文件作为一个模块导入组件，可为`.module.css`、`.module.scss`、`.module.less`文件

```jsx{6}
import React from "react";
import 样式模块 from "样式表文件.module.后缀";

export default function Component() {
  return (
    <JSX标签 className={样式模块.类名} />
  );
}
```

::: details 例子：

::: code-group

```jsx{2,6-8} [组件]
import React from "react";
import styles from "./styles.module.css";

export default function Component() {
  return (
    <div className={styles.myDiv}>
      <h1 className={styles.myH1}>xxx</h1>
    </div>
  );
}
```

```css [CSS样式表]
.myDiv {
  margin-top: 20px;
}

.myH1 {
  font-weight: bold;
}
```

:::

::: tip 优点

定义的样式为局部样式，导入的样式模块仅能在当前组件内使用，不影响其子组件，避免了样式冲突

:::

::: warning 缺点：

1. 类名不能使用横线链接符`-`，只能用 JS 能识别的驼峰命名法
2. 只能通过`className`接收类名
3. 样式动态改变不方便 ( 样式列表中无法实现，组件中只能通过内联样式 )

:::

## CSS-in-JS 库

可理解为解决了内联样式弊端的高级版

比如 [Styled Components](https://styled-components.com/docs) 利用 JS 模版字符串编写 CSS 代码来设置组件的样式

```shell
yarn add styled-components
yarn add -D @types/styled-component
```

::: details 例子:

```tsx
import React from "react";
import styled from "styled-components";

interface ButtonProps {
  color?: string | undefined;
}

const Button = styled.button<ButtonProps>`
  padding: 0.5rem 2rem;
  margin-left: 1rem;
  background-color: ${({ color }) => color || "white"};
  color: ${({ color }) => (color ? "white" : "black")};
`;

export default function Component() {
  return (
    <>
      <Button>Normal</Button>
      <Button color={"pink"}>Primary</Button>
    </>
  );
}
```

:::

::: tip 优点：

1. 可使用 CSS 的全部功能
2. 不需担心冲突和样式相互覆盖
3. 支持 TypeScript 类型检查

:::

::: warning 缺点：

1. 代码可读性差，后期维护麻烦
2. 独立于框架，若程序框架语言变更可能会需要重写
3. 在运行时编译，比起静态样式表解析速度要慢，但日后可能会改善

:::
