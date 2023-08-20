const PATH = "/notes/web-front-end";

export default [
  {
    text: "常用语言",
    collapsed: true,
    items: [
      { text: "HTML", link: `${PATH}/html/` },
      { text: "CSS", link: `${PATH}/css/` },
      { text: "Sass", link: `${PATH}/sass/` },
      { text: "JavaScript", link: `${PATH}/javascript/` },
      { text: "TypeScript", link: `${PATH}/typescript/` },
      { text: "Dart", link: `${PATH}/dart/` },
    ],
  },
  {
    text: "常用库・框架",
    collapsed: true,
    items: [
      { text: "jQuery", link: `${PATH}/jquery/` },
      { text: "Vue", link: `${PATH}/vue/` },
      { text: "React", link: `${PATH}/react/` },
      { text: "Nuxt.js", link: `${PATH}/nuxt-js/` },
      { text: "Next.js", link: `${PATH}/next-js/` },
      { text: "Gatsby.js", link: `${PATH}/gatsby-js/` },
    ],
  },
  {
    text: "包管理工具",
    collapsed: true,
    items: [
      { text: "npm", link: `${PATH}/package-management/npm` },
      { text: "yarn", link: `${PATH}/package-management/yarn` },
    ],
  },
  {
    text: "打包・构建工具",
    collapsed: true,
    items: [
      { text: "Webpack", link: `${PATH}/#` },
      { text: "Vite", link: `${PATH}/#` },
    ],
  },
];
