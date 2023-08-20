const PATH = "/notes/web-back-end/django";

export default [
  {
    text: "Django 基础",
    collapsed: true,
    items: [
      { text: "模型 ( Model )", link: `${PATH}/MTV/Model` },
      { text: "模版 ( Template )", link: `${PATH}/MTV/Template` },
      { text: "视图 ( View )", link: `${PATH}/MTV/View` },
      { text: "路由", link: `${PATH}/basics/router` },
    ],
  },
  {
    text: "常用包",
    collapsed: true,
    items: [
      { text: "Django Rest Framework", link: `${PATH}/packages/` },
      { text: "?", link: `${PATH}/packages/` }
    ],
  },
  { text: "目录首页", link: `${PATH}/` },
];
