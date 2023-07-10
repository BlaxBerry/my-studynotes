# JSX

## 简介

JSX（ JavaScript XML ）是 JavaScript 的语法扩展

用于在 JS 文件内编写类似 HTML 的标记

React 中更多使用 JSX 来书写组件

## JSX 规则

::: details 1. 返回单个根元素

若不想渲染根元素，可使用[`<React.Fragment>`或`<>`](../built-in-apis/components.md#fragment)

::: code-group

```tsx [渲染根标签]
import React from "react";

function Component() {
  return (
    <div>
      <标签 />
      <组件 />
    </div>
  );
}
```

```tsx [不渲染根标签]
import { Fragment } from "react";

function Component() {
  return (
    <Fragment>
      <标签 />
      <组件 />
    </Fragment>
  );
}
```

:::

::: details 2. 标签必须要闭合

- 自闭合标签 (self-closing tags)
- 包装标签 (wrapping tags)

```tsx
import React from "react";

function Component() {
  return (
    <>
      <自闭合标签 />
      <包装标签><包装标签/>

      <无参数组件 />
      <组件>
        <标签/>
      <组件/>
    </>
  );
}
```

:::

::: details 3. 标签属性采用小驼峰命名法

```tsx{0}
import React from "react";

function Component() {
  return (
    <img
       className="xxxx"  // [!code hl]
       style={{
          marginTop: 10, // [!code hl]
          width: "100%"
       }}
       src="xxxx"
       alt="xxxx"
    />
  );
}
```

:::
