const PATH = "/notes/web-front-end/react";

export default [
  {
    text: "React 基础",
    collapsed: true,
    items: [
      { text: "JSX 基础", link: `${PATH}/jsx/` },
      { text: "React 内置组件", link: `${PATH}/jsx/` },
    ],
  },
  {
    text: "React Hooks",
    collapsed: true,
    items: [
      { text: "useState()", link: `${PATH}` },
      { text: "useRef()", link: `${PATH}` },
      { text: "useEffect()", link: `${PATH}` },
      { text: "useMemo()", link: `${PATH}` },
      { text: "useCallback()", link: `${PATH}` },
    ],
  },
  {
    text: "React 内置方法",
    collapsed: true,
    items: [
      { text: "memo()", link: `${PATH}` },
      { text: "creatContext()", link: `${PATH}` },
      { text: "lazy()", link: `${PATH}` },
    ],
  },
  {
    text: "React 内置组件",
    collapsed: true,
    items: [{ text: "Suspense", link: `${PATH}` }],
  },
];
