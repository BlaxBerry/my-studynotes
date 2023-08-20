const PATH = "/notes/web-back-end/python";

export default [
  {
    text: "Python 基础",
    collapsed: true,
    items: [
      { text: "变量", link: `${PATH}` },
      { text: "函数", link: `${PATH}` },
    ],
  },
  {
    text: "内置对象方法",
    collapsed: true,
    items: [
      { text: "List", link: `${PATH}/apis/` },
      { text: "String", link: `${PATH}/apis/` },
      { text: "Number", link: `${PATH}` },
      { text: "Dictionary", link: `${PATH}` },
      { text: "RegExp", link: `${PATH}` },
    ],
  },
  {
    text: "包管理工具",
    collapsed: true,
    items: [
      { text: "pip", link: `${PATH}/package-management/pip` },
      { text: "PDM", link: `${PATH}/package-management/PDM` },
    ],
  },
  {
    text: "Web 应用框架",
    collapsed: true,
    items: [{ text: "Django", link: "/notes/web-back-end/django/" }],
  },
];
