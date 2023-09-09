const PATH = "/notes/web-back-end/golang";

export default [
  {
    text: "Go 基础",
    collapsed: true,
    items: [
      { text: "包与模块", link: `${PATH}/basics/package-module` },
      { text: "变量", link: `${PATH}` },
      { text: "函数", link: `${PATH}` },
      { text: "数据类型", link: `${PATH}` },
      { text: "异常处理", link: `${PATH}` },
      {
        text: "内置对象方法",
        collapsed: true,
        items: [
          { text: "List", link: `${PATH}/apis/` },
          { text: "String", link: `${PATH}/apis/` },
        ],
      },
    ],
  },
  {
    text: "Web 应用框架",
    collapsed: true,
    items: [{ text: "Gin", link: '/notes/web-back-end/gin/' }],
  },
  { text: "目录首页", link: `${PATH}/` },
];
