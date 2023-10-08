const PATH = "/notes/web-back-end/python";

export default [
  {
    text: "Python 基础",
    collapsed: true,
    items: [
      { text: "变量", link: `${PATH}` },
      { text: "函数", link: `${PATH}/basics/function` },
      { text: "运算符", link: `${PATH}/basics/operator` },
      { text: "数据类型", link: `${PATH}/basics/data-types` },
      { text: "流程控制", link: `${PATH}/basics/control-flow` },
      { text: "异常处理", link: `${PATH}/basics/error-exception` },
      { text: "类", link: `${PATH}/basics/class` },
      { text: "模块与包", link: `${PATH}/basics/module-package` },
      {
        text: "内置模块",
        collapsed: true,
        items: [
          { text: "datetime", link: `${PATH}/built-in-modules/datetime` },
          { text: "re", link: `${PATH}/built-in-modules/re` },
          { text: "os", link: `${PATH}/built-in-modules/os` },
          { text: "urllib", link: `${PATH}/built-in-modules/urllib` },
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
        text: "内置对象方法",
        collapsed: true,
        items: [
          { text: "List", link: `${PATH}/built-in-apis/List` },
          { text: "String", link: `${PATH}/built-in-apis/String` },
          { text: "Dict", link: `${PATH}/built-in-apis/Dict` },
        ],
      },
    ],
  },
  {
    text: "Web 应用框架",
    collapsed: true,
    items: [
      {
        text: "Django",
        link: "/notes/web-back-end/python/web-frameworks/django/",
      },
    ],
  },
  {
    text: "数据分析",
    collapsed: true,
    items: [{ text: "Pandas", link: "？" }],
  },
  {
    text: "机器学习",
    collapsed: true,
    items: [{ text: "？", link: "？" }],
  },
  { text: "目录首页", link: `${PATH}/` },
];
