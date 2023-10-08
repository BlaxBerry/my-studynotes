const PATH = "/notes/web-back-end/python/web-frameworks/django";

export default [
  {
    text: "Django 基础",
    collapsed: true,
    items: [
      { text: "应用", link: `${PATH}/basics/application` },
      { text: "路由", link: `${PATH}/basics/router` },
      { text: "模型 ( Model )", link: `${PATH}/basics/mtv_model` },
      { text: "模版 ( Template )", link: `${PATH}/basics/mtv_template` },
      { text: "视图 ( View )", link: `${PATH}/basics/mtv_view` },
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
