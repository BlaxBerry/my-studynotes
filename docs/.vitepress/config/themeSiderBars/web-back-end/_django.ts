const PATH = "/notes/web-back-end/python/web-frameworks/django";

export default [
  {
    text: "Django 基础",
    collapsed: true,
    items: [
      { text: "项目配置", link: `${PATH}/basics/settings` },
      { text: "应用 ( Application )", link: `${PATH}/basics/application` },
      { text: "路由", link: `${PATH}/basics/route` },
      { text: "视图 ( View )", link: `${PATH}/basics/view` },
      { text: "模型 ( Model )", link: `${PATH}/basics/model` },
      { text: "模版 ( Template )", link: `${PATH}/basics/template` },
      { text: "管理系统", link: `${PATH}/basics/admin` },
      { text: "单元测试", link: `${PATH}/basics/tests` },
    ],
  },
  {
    text: "常用包",
    collapsed: true,
    items: [
      {
        text: "Django Rest Framework",
        link: `${PATH}/packages/django-rest-framework`,
      },
    ],
  },
  { text: "目录首页", link: `${PATH}/` },
];
