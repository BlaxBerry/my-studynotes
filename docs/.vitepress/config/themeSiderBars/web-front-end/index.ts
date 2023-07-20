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
    ],
  },
  {
    text: "常用库・框架",
    collapsed: true,
    items: [
      { text: "jQuery", link: `${PATH}/jquery/` },
      { text: "Vue", link: `${PATH}/vue/` },
      { text: "React", link: `${PATH}/react/` },
      { text: "Nuxt", link: `${PATH}/vue-nuxt/` },
      { text: "Next", link: `${PATH}/react-next/` },
      { text: "Gatsby", link: `${PATH}/react-gatsby/` },
    ],
  },
];
