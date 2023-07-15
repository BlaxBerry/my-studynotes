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
      { text: "钩子函数 ( Hooks )", link: `${PATH}/built-in-apis/hooks` },
    ],
  },
  {
    text: "React 性能优化",
    collapsed: true,
    items: [
      { text: "优化渲染效率", link: `${PATH}/performance/optimizing-render` },
      { text: "减少重新渲染", link: `${PATH}/performance/avoid-re-render` },
      { text: "状态管理", link: `${PATH}/performance/state-management` },
      { text: "防范跨站脚本攻击", link: `${PATH}/performance/prevent-XSS` },
    ],
  },
];
