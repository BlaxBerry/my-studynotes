const PATH = "/notes/web-back-end/node-js";

export default [
  {
    text: "Node.js 基础",
    collapsed: true,
    items: [
      { text: "?", link: `${PATH}/` },
      { text: "?", link: `${PATH}/` },
      {
        text: "内置模块",
        collapsed: true,
        items: [
          { text: "fs", link: `` },
          { text: "path", link: `` },
          { text: "http", link: `` },
          { text: "url", link: `` },
          { text: "querystring", link: `` },
          { text: "util", link: `` },
        ],
      },
      {
        text: "包管理工具",
        collapsed: true,
        items: [
          {
            text: "npm",
            link: "/notes/web-back-end/node-js/package-management/npm",
          },
          {
            text: "yarn",
            link: "/notes/web-back-end/node-js/package-management/yarn",
          },
        ],
      },
    ],
  },
  {
    text: "Web 应用开发",
    collapsed: true,
    items: [
      {
        text: "Express.js",
        link: "/notes/web-back-end/node-js/web-frameworks/express-js/",
      },
      {
        text: "Koa.js",
        link: "/notes/web-back-end/node-js/web-frameworks/koa-js/",
      },
      {
        text: "Nest.js",
        link: "/notes/web-back-end/node-js/web-frameworks/nest-js/",
      },
    ],
  },
  { text: "目录首页", link: `${PATH}/` },
];
