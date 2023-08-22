const PATH = "/notes/web-back-end";

export default [
  {
    text: "常用语言",
    collapsed: true,
    items: [
      { text: "Go", link: `${PATH}/golang/` },
      { text: "Python", link: `${PATH}/python/` },
      { text: "Ruby", link: `${PATH}/ruby/` },
    ],
  },
  {
    text: "常用框架・运行环境",
    collapsed: true,
    items: [
      { text: "Node.js", link: `${PATH}/node-js/` },
      { text: "Django", link: `${PATH}/django/` },
      { text: "Gin", link: `${PATH}/gin/` },
      { text: "Ruby on Rails", link: `${PATH}/ruby-on-rails/` },
    ],
  },
  {
    text: "数据库",
    collapsed: true,
    items: [
      { text: "MySQL", link: `${PATH}/mysql/` },
      { text: "MongoDB", link: `${PATH}/mongodb/` },
    ],
  },
  {
    text: "服务器",
    collapsed: true,
    items: [
      { text: "Apache", link: `${PATH}/apache/` },
      { text: "Nginx", link: `${PATH}/nginx/` },
    ],
  },
];
