const PATH = "/notes/web-front-end/react/web-frameworks/next-js";

export default [
  {
    text: "Next.js 基础",
    collapsed: true,
    items: [
      {
        text: "路由、页面",
        collapsed: true,
        items: [
          { text: "App Router", link: `${PATH}/routers-and-pages/App-Router` },
          {
            text: "Pages Router",
            link: `${PATH}/routers-and-pages/Pages-Router`,
          },
        ],
      },
      {
        text: "SEO 优化",
        collapsed: true,
        items: [
          {
            text: "元数据 ( MetaData )",
            link: `${PATH}/optimizing-SEO/metadata`,
          },
        ],
      },
      {
        text: "数据请求",
        collapsed: true,
        items: [
          { text: "?", link: `${PATH}/data-fetching` },
          { text: "?", link: `${PATH}/data-fetching` },
        ],
      },
    ],
  },
  { text: "目录首页", link: `${PATH}/` },
];
