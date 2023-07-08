# React.useMemo()

```js
const 缓存数据 = React.useMemo(有返回值的数据计算, 依赖项);
```

主要用于缓存页面在两次重新渲染之间的数据计算的结果

- 跳过昂贵的数据的重新计算
- 跳过组件的重新渲染 (re-render)

为了可读性尽量使用`return`返回计算结果，尤其是箭头函数中

```js
const data = useMemo(() => ({ key: state }), [state]); // [!code --]

const data = useMemo(() => {
  return { key: state };
}, [state]);
```

若不指定依赖项，每次组件渲染时`useMemo()`都会重新计算
