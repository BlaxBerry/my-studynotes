const PATH = "/notes/web-front-end/react";

export default [
  {
    text: "React 基础",
    collapsed: true,
    items: [{ text: "JSX 基础", link: `${PATH}/jsx/` }],
  },
  {
    text: "React 内置 API",
    collapsed: true,
    items: [
      { text: "内置组件", link: `${PATH}/built-in-apis/components` },
      { text: "内置方法", link: `${PATH}/built-in-apis/methods` },
    ],
  },
  {
    text: "React Hooks",
    collapsed: true,
    items: [
      { text: "useState()", link: `${PATH}/hooks/useState` },
      { text: "useRef()", link: `${PATH}/hooks/useRef` },
      { text: "useContext()", link: `${PATH}/hooks/useContext` },
      { text: "useEffect()", link: `${PATH}/hooks/useEffect` },
      { text: "useMemo()", link: `${PATH}/hooks/useMemo` },
      { text: "useCallback()", link: `${PATH}/hooks/useCallback` },
    ],
  },
  {
    text: "React 性能优化",
    collapsed: true,
    items: [
      { text: "重新渲染", link: `${PATH}/performance/re-render` },
      { text: "渲染效率", link: `${PATH}/performance/re-render` },
      { text: "加载时间", link: `${PATH}/performance/re-render` },
    ],
  },
];
