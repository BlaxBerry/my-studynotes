const PATH = "/notes/web-front-end";

export default [
  {
    text: "常用语言",
    collapsed: true,
    items: [
      { text: "HTML", link: `${PATH}/html/` },
      { text: "CSS", link: `${PATH}/css/` },
      { text: "Sass", link: `${PATH}/css/pre-processors/sass/` },
      { text: "JavaScript", link: `${PATH}/javascript/` },
      { text: "TypeScript", link: `${PATH}/typescript/` },
      { text: "Dart", link: `${PATH}/dart/` },
    ],
  },
  {
    text: "常用库",
    collapsed: true,
    items: [
      { text: "jQuery", link: `${PATH}/jquery/` },
      { text: "Vue", link: `${PATH}/vue/` },
      { text: "React", link: `${PATH}/react/` },
    ],
  },
  {
    text: "常用框架",
    collapsed: true,
    items: [
      { text: "Nuxt.js", link: `${PATH}/vue/web-frameworks/nuxt-js/` },
      { text: "Next.js", link: `${PATH}/react/web-frameworks/next-js/` },
      { text: "Gatsby.js", link: `${PATH}/react/web-frameworks/gatsby-js/` },
    ],
  },
  {
    text: "打包・构建工具",
    collapsed: true,
    items: [
      { text: "Webpack", link: `` },
      { text: "Vite", link: `` },
    ],
  },
  {
    text: "跨平台",
    collapsed: true,
    items: [
      {
        text: "React Native",
        link: `${PATH}/cross-device/react-native/`,
      },
      { text: "Flutter", link: `${PATH}/cross-device/flutter/` },
      { text: "Electron", link: `${PATH}/cross-device/electron/` },
    ],
  },
];
