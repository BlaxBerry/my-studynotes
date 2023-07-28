const PATH = "/notes/web-front-end/react";

export default [
  {
    text: "React 基础",
    collapsed: true,
    items: [
      { text: "JSX 基础", link: `${PATH}/basics/jsx` },
      { text: "组件基础", link: `${PATH}/basics/components` },
      { text: "状态管理", link: `${PATH}/basics/state-management` },
      { text: "样式使用", link: `${PATH}/basics/styling` },
    ],
  },
  {
    text: "内置 API",
    collapsed: true,
    items: [
      { text: "内置组件", link: `${PATH}/built-in-apis/components` },
      { text: "内置方法", link: `${PATH}/built-in-apis/methods` },
      { text: "钩子函数 ( Hooks )", link: `${PATH}/built-in-apis/hooks` },
    ],
  },
  {
    text: "性能优化",
    collapsed: true,
    items: [
      { text: "优化渲染效率", link: `${PATH}/performance/render-optimizing` },
      { text: "重新渲染", link: `${PATH}/performance/re-render` },
      { text: "防范跨站脚本攻击", link: `${PATH}/performance/XSS-prevent` },
    ],
  },
  {
    text: "Web 应用框架",
    collapsed: true,
    items: [
      { text: "Next.js", link: "/notes/web-front-end/next-js/" },
      { text: "Gatsby.js", link: "/notes/web-front-end/gatsby-js/" },
    ],
  },
];
