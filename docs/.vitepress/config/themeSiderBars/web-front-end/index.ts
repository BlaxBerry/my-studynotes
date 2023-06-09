const PATH = "/notes/web-front-end";

export default [
  {
    text: "语言",
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
    text: "框架",
    collapsed: true,
    items: [
      { text: "React", link: `${PATH}/react/` },
      { text: "Vue", link: `${PATH}/vue/` },
    ],
  },
];
