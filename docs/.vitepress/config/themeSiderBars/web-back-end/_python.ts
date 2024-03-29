const PATH = "/notes/web-back-end/python";

export default [
  {
    text: "Python 基础",
    collapsed: true,
    items: [
      { text: "变量", link: `${PATH}/basics/variable` },
      { text: "函数", link: `${PATH}/basics/function` },
      { text: "运算符", link: `${PATH}/basics/operator` },
      { text: "数据类型", link: `${PATH}/basics/data-types` },
      { text: "静态数据类型", link: `${PATH}/basics/static-data-types` },
      {
        text: "内置对象方法",
        collapsed: true,
        items: [
          { text: "List", link: `${PATH}/built-in-apis/List` },
          { text: "String", link: `${PATH}/built-in-apis/String` },
          { text: "Dict", link: `${PATH}/built-in-apis/Dict` },
        ],
      },
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
    ],
  },
  {
    text: "Web 应用开发",
    collapsed: true,
    items: [
      {
        text: "Django",
        link: `${PATH}/web-frameworks/django/`,
      },
      {
        text: "Flask",
        link: "",
      },
    ],
  },
  {
    text: "数据分析",
    collapsed: true,
    items: [
      { text: "NumPy", link: "" },
      { text: "Pandas", link: "" },
      { text: "Matplotlib", link: "" },
    ],
  },
  { text: "目录首页", link: `${PATH}/` },
];
