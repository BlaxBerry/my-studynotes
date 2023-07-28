# React 组件基础

## 类组件

类组件 ( Class Components ) 已经过时，推荐使用函数组件

## 函数组件

函数组件 ( Function Components )

## 组件设计模式

https://blog.logrocket.com/react-design-patterns/

### 高阶组件模式（ HOC ）

高阶组件（ Higher Order Component ）组件模式，用于组件复用

高阶组件是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件

prop 重名问题

```tsx

```

---

### Render Props

Render Props 组件模式

是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术，更具体的说，render prop 是一个用于告知组件需要渲染什么内容的函数 prop。

出现嵌套地狱的问题

```tsx

```

---

### State Reducer 模式

---

### Provider 模式

提供者 （ Provider ）模式用于在组件树中的多个组件之间共享全局状态数据

在 React context API 中实现

---

### 复合组件

复合组件（ Compound Components ）模式

---

### 表示组件模式和容器组件模式

The presentational and container component patterns

---

### Hooks 模式

钩子函数
