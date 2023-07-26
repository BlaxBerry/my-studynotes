const PATH = "/notes/web-back-end/ruby";

export default [
  {
    text: "Ruby 基础",
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
    text: "Web 应用框架",
    collapsed: true,
    items: [{ text: "Ruby on Rails", link: "/notes/web-back-end/ruby-on-rails/" }],
  },
];
