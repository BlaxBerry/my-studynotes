# JSX 基础

## 简介

JSX（ JavaScript XML ）是 JavaScript 的语法扩展

用于在`.jsx`、`.tsx`等文件中编写类似 HTML 的标记，最终会被转换为纯 JavaScript 对象

React 中多使用 JSX 语法创建虚拟 DOM

## JSX 书写规则

::: details 1. React 组件必须返回单个根元素

React 组件在返回多个标签/子组件时需要使用单个父元素包装<br/>
若不想渲染根元素时可使用[`<React.Fragment>` ( `<>...</>` )](../built-in-apis/components.md#fragment)

::: code-group

```tsx [渲染根标签]
import React from "react";

export default function Component() {
  return (
    <div>
      <JSX标签 />
      <子组件 />
    </div>
  );
}
```

```tsx [不渲染根标签]
import { Fragment } from "react";

function Component() {
  return (
    <>
      <JSX标签 />
      <子组件 />
    </>
  );
}
```

:::

::: details 2. JSX 标签必须要闭合

书写无内容的一般标签、自闭合标签、无参数的组件时必须使用斜线`/`来结束

```tsx
<JSX标签>
  <无内容一般标签 />
  <自闭合标签 />
  <无参数组件 />
</JSX标签>
```

:::

::: details 3. JSX 标签名首字母大小写

- JSX 标签首字母小写时：转化渲染为同名的 HTML 元素，若没有则报错
- JSX 标签首字母大写时：渲染为同名的 React 组件，若没有则报错

:::

::: details 4. JSX 标签属性采用驼峰命名

JSX 最终会被转换为 JavaScript 对象的键，所以大部分变量都等需采用小驼峰命名法

> 如下：`className`属性、`style`属性值对象的各个键名、事件对象上方法名等等

```tsx{0}
import React from "react";

export default function Component() {
  return (
    <div
      className="xxxx" // [!code hl]
      style={{
        marginTop: 10, // [!code hl]
        PaddingLeft: "20px", // [!code hl]
      }}
      onClick={(e) => e.stopPropagation()} // [!code hl]
    />
  );
}
```

:::

::: details 5. JSX 标签属性值使用大括号`{}`包裹

```jsx
<JSX标签
  属性={属性值}
  属性={属性值}
/>
```

:::

::: details 6. JSX 标签属性值的简写

- JSX 标签的属性值为字符串时可省略大括号`{}`
- JSX 标签的属性值为`true`时可省略属性值，因为组件上的`prop`默认值都为`true`

::: code-group

```jsx [字符串类型]
<JSX标签
  属性={"字符串内容"}
  属性="字符串内容" // [!code hl] // 省略写法
/>
```

```jsx [true]
<JSX标签
  属性={true}
  属性 // [!code hl] // 省略写法
/>
```

:::

## JSX 内容嵌入

::: tip JSX 标签内可嵌入的内容

1. [嵌套其他 JSX 标签或组件](#标签与组件)
2. [直接渲染到页面的文本 ( 字符串 )](#字符串文本)
3. [动态渲染到页面的文本 ( JavaScript 表达式 )](#javascript-表达式)

:::

---

### 标签与组件

JSX 标签或组件可直接嵌套写入 JSX 标签

```jsx
<父JSX标签>
  <子JSX标签>文本内容</子JSX标签>
  <子JSX标签 />
  <子组件 />
</父JSX标签>
```

---

### 字符串文本

字符串文本可直接写入 JSX 标签，也可以 JavaScript 形式用单双引号包裹后写入`{}`

此外为了避免魔术字符串 ( Magic String ) 建议将具体的固定字符串写作为 JavaScript 变量引入

::: code-group

```jsx [写法一]
<JSX标签>字符串内容</JSX标签>
```

```jsx [写法二]
<JSX标签>{'字符串内容'}</JSX标签>
<JSX标签>{"字符串内容"}</JSX标签>
```

:::

---

### JavaScript 表达式

JSX 中使用 JavaScript 时需写入大括号`{}`

::: details JS 变量

在`{}`中直接引用，其值会被作为页面内容渲染

```jsx
<JSX标签>{变量名}</JSX标签>
<JSX标签>其他内容{变量名}其他内容</JSX标签>
```

:::

::: details JS 函数

在`{}`中调用某函数，其返回值会被作为页面内容渲染

也可通过立即执行函数在 JSX 中直接书写 JS 逻辑，但不建议因为会增加组件的渲染开销

::: code-group

```jsx [一般函数]
<JSX标签>{函数()}</JSX标签>
<JSX标签>{函数(参数)}</JSX标签>
```

```jsx [立即执行函数]
<JSX标签>
  {(() => {
    // JS 逻辑
    // return 要作为渲染内容的返回值;
  })()}
</JSX标签>
```

:::

::: details JS 注释

在`{}`中使用的注释内容不会被渲染

::: code-group

```jsx{0} [单行注释]
<JSX标签
  // xxxx
  /* xxx */
  属性={值} // xxxx
  属性={值} /* xxxx */
>
  {/* xxxx */}
</JSX标签>
```

```jsx [多行注释]
<JSX标签>
  {/*
    XXXX
    XXXX
    XXXX
    XXXX
  */}
</JSX标签>
```

:::

::: tip `null`、`undefined`、`false`、`true`会被忽略渲染

若想抛弃语义进渲染值的话可转位字符串类型

::: code-group

```jsx [不被渲染]
<JSX标签>{null}</JSX标签>
<JSX标签>{undefined}</JSX标签>
<JSX标签>{false}</JSX标签>
<JSX标签>{true}</JSX标签>

// 上述潜入内容不被渲染，等同于：
<JSX标签/>

```

```jsx [可以渲染]
<JSX标签>{String(null)}</JSX标签>
<JSX标签>{String(undefined)}</JSX标签>
<JSX标签>{String(false)}</JSX标签>
<JSX标签>{String(true)}</JSX标签>
```

:::

::: warning 数值`0`会被渲染

虽然在 JavaScript 中`0`是虚值，但是 JSX 中会被渲染出来

故不能作为条件用于逻辑运算符判断的条件渲染，若需要使用时可转位布尔类型

```jsx
<JSX标签>{0 ？ <A/> : <B/>}</JSX标签> // [!code --]
<JSX标签>{Boolean(0) ？ <A/> : <B/>}</JSX标签> // [!code ++]
```

:::

## JSX 列表渲染

JSX 列表渲染实质是通过调用 JavaScript 数组方法[`map()`](../../javascript/built-in-apis/Array.md#map)将列表数据映射为一个组件数组

组件数组中的每一个 JSX 标签 / 组件都需要一个`key`属性作为唯一标识

::: code-group

```jsx [箭头函数]
<JSX标签>
  {列表数据.map((列表元素) => (
    <子JSX标签 key={唯一标识}>{列表元素}</子JSX标签>
  ))}
</JSX标签>
```

```jsx [一般函数]
<JSX标签>
  {列表数据.map((列表元素) => {
    return <子JSX标签 key={唯一标识}>{列表元素}</子JSX标签>;
  })}
</JSX标签>
```

:::

::: warning 唯一标识`key`

- **不能使用动态生成的数据** ( 例如`key={Math.random()}`)<br/>
  > 动态不固定的`key`会在每次渲染时都重新创建所有组件和 DOM，会导致渲染慢效率低下、还会出现输入类控件数据丢失问题。应使用包含在列表数据中的稳定值 ( 例如`ID`)
- **原则上不能使用列表`index`**<br/>
  > 因为对列表数据的增删改操作会使得原有数据顺序变更，会导致列表重新渲染、输入类控件数据残留等问题。仅限如渲染一组死数据等极少数情况才可使用`index`

:::

> 如下：对一组列表数据分别直接渲染与筛选过滤后再渲染

::: code-group

```jsx{7-11} [例一<Badge>仅渲染</Badge>]
import React from "react";
import { dataList } from "list.js"

export default function Component() {
  return (
    <ul>
      {dataList.map(({ id, value }) => (
        <li key={id}>
          {id} - {value.toLocaleString()}
        </li>
      ))}
    </ul>
  );
}
```

```jsx{7-13} [例二<Badge>过滤后渲染</Badge>]
import React from "react";
import { dataList } from "list.js"

export default function Component() {
  return (
    <ul>
      {dataList
        .filter(({ id }) => id !== 2)
        .map(({ id, value }) => (
          <li key={id}>
            {id} - {value.toLocaleString()}
          </li>
        ))}
    </ul>
  );
}
```

```js [列表数据]
export const dataList = [
  { id: 1, value: "1000" },
  { id: 2, value: "2000" },
  { id: 3, value: "3000" },
];
```

:::

## JSX 条件渲染

JSX 中的条件渲染只能使用**逻辑运算符**或**三元运算符**

当然组件中可使用`if`条件语句根据不同条件`return`返回不同 JSX 内容

---

### 逻辑运算符

JSX 中可使用逻辑运算符`||`、`&&`进行条件判断后渲染

```jsx
<JSX标签>
  {条件 && <JSX标签 />}
  {条件 || <JSX标签 />}
</JSX标签>
```

::: details 判断条件为数值`0`时：

在 React JSX 中数值`0`会被渲染到页面，不会被视为`false`

::: code-group

```jsx [❌]
<JSX标签>
  {0 && <JSX标签 />} // [!code hl]
  {[].length && <JSX标签 />} // [!code hl]
</JSX标签>
```

```jsx [✅<Badge>转为Boolean类型</Badge>]
<JSX标签>
  {!!0 && <JSX标签 />} // [!code hl]
  {!![].length && <JSX标签 />} // [!code hl]
  {Boolean([]) && <JSX标签 />} // [!code hl]
</JSX标签>
```

```jsx{0} [✅<Badge>使用三元运算符</Badge>]
<JSX标签>
  {0 ? <JSX标签 /> : <JSX标签 />} // [!code hl]
</JSX标签>
```

:::

::: details 判断条件为`[]`、`{}`时：

JavaScript 中空数组`[]`、空对象`{}`被视为`true`，所以不能直接用做判断条件

::: code-group

```jsx [空数组]
<JSX标签>
  {[] && <JSX标签 />} // [!code --]
  {!![].length && <JSX标签 />} // [!code ++]
  {Boolean([]) && <JSX标签 />} // [!code ++]
</JSX标签>
```

```jsx [空对象]
<JSX标签>
  {{} && <JSX标签 />} // [!code --]
  {!!Object.keys({}).length && <JSX标签 />} // [!code ++]
  {Boolean({}) && <JSX标签 />} // [!code ++]
</JSX标签>
```

:::

---

### 三元运算符

```jsx{0}
<JSX标签>
  {条件 ? <JSX标签 /> : <JSX标签 />}
</JSX标签>
```

::: details 判断条件为`[]`、`{}`时：

JavaScript 中空数组`[]`、空对象`{}`被视为`true`，所以不能直接用做判断条件

::: code-group

```jsx [空数组]
<JSX标签>
  {[] ? <A /> : <B />} // [!code --]
  {[].length ? <A /> : <B />} // [!code ++]
</JSX标签>
```

```jsx [空对象]
<JSX标签>
  {{} ? <A /> : <B />} // [!code --]
  {Object.keys({}).length ? <A /> : <B />} // [!code ++]
</JSX标签>
```

:::

::: details 三元运算符嵌套时可读性差 <Badge type="warning">Bad</Badge>

::: code-group

```jsx{2-10} [👎]
<JSX标签>
  {条件1 ? (
    <A />
  ) : 条件2 ? (
    <B />
  ) : 条件3 ? (
    <C />
  ) : (
    <D />
  )}
</JSX标签>
```

```jsx{2-5} [👍]
<JSX标签>
  {条件1 && <A />}
  {条件2 && <B />}
  {条件3 && <C />}
  {条件4 && <D />}
</JSX标签>
```

:::

::: details 同名输入类控件切换会数据残留 <Badge type="danger">Bug</Badge>

> 如下：`<input/>`输入值保留了下来

```jsx{8}
import React, { useState } from "react";

export default function Component() {
  const [isText, setIsText] = useState(true);

  return (
    <>
      {isText ? <input type="text" /> : <input type="password" />}

      <button onClick={() => setIsText((s) => !s)}>切换</button>
    </>
  );
}
```

::: tip 解决方法

- 方法一： 添加唯一标识`key`来区分切换前后的同名标签
- 方法二： 改用逻辑运算符形成单独判断分支

::: code-group

```jsx [改法一]
import React, { useState } from "react";

export default function Component() {
  const [isText, setIsText] = useState(true);

  return (
    <>
      {isText ? (
        <input
          type="text"
          key="my-text" // [!code hl]
        />
      ) : (
        <input
          type="password"
          key="my-password" // [!code hl]
        />
      )}

      <button onClick={() => setIsText((s) => !s)}>切换</button>
    </>
  );
}
```

```jsx{8-9} [改法二]
import React, { useState } from "react";

export default function Component() {
  const [isText, setIsText] = useState(true);

  return (
    <>
      {isText && <input type="text" />}
      {!isText && <input type="password" />}

      <button onClick={() => setIsText((s) => !s)}>切换</button>
    </>
  );
}
```

:::
