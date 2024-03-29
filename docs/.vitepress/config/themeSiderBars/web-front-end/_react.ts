const PATH = "/notes/web-front-end/react";

export default [
  {
    text: "React 基础",
    collapsed: true,
    items: [
      { text: "JSX 基础", link: `${PATH}/basics/jsx` },
      { text: "组件基础", link: `${PATH}/basics/components` },
      { text: "组件样式", link: `${PATH}/basics/styling` },
      { text: "状态管理", link: `${PATH}/basics/manage-states` },
      { text: "表单管理", link: `${PATH}/basics/manage-forms` },
      {
        text: "内置 API",
        collapsed: true,
        items: [
          { text: "内置组件", link: `${PATH}/built-in-apis/components` },
          { text: "内置方法", link: `${PATH}/built-in-apis/methods` },
          { text: "钩子函数 ( Hooks )", link: `${PATH}/built-in-apis/hooks` },
        ],
      },
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
    text: "Web 应用开发",
    collapsed: true,
    items: [
      {
        text: "Next.js",
        link: "/notes/web-front-end/react/web-frameworks/next-js/",
      },
      {
        text: "Gatsby.js",
        link: "/notes/web-front-end/react/web-frameworks/gatsby-js/",
      },
    ],
  },
  { text: "目录首页", link: `${PATH}/` },
];
