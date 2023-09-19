const PATH = "/notes/web-back-end/golang";

export default [
  {
    text: "Go 基础",
    items: [
      { text: "包、模块", link: `${PATH}/basics/package-module` },
      {
        text: "常用内置包",
        collapsed: true,
        items: [
          { text: "fmt", link: `${PATH}/built-in-apis/fmt` },
          { text: "net", link: `${PATH}/built-in-apis/net` },
          { text: "path", link: `${PATH}/built-in-apis/path` },
        ],
      },
      { text: "变量、常量", link: `${PATH}/basics/variable-constant` },
      { text: "数据类型", link: `${PATH}/basics/data-type` },
      { text: "指针", link: `${PATH}/basics/pointer` },
      { text: "函数", link: `${PATH}/basics/function` },
      { text: "运算符", link: `${PATH}/basics/operator` },
      { text: "流程控制", link: `${PATH}/basics/control-flow` },
    ],
  },

  {
    text: "Web 应用框架",
    collapsed: true,
    items: [{ text: "Gin", link: '/notes/web-back-end/gin/' }],
  },
  { text: "目录首页", link: `${PATH}/` },
];
