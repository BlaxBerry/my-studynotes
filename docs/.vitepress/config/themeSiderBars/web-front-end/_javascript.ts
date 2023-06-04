const PATH = "/notes/web-front-end/javascript";

export default [
  {
    text: "JS 基础",
    collapsed: true,
    items: [
      { text: "变量", link: `${PATH}` },
      { text: "函数", link: `${PATH}` },
      { text: "堆、栈", link: `${PATH}` },
      { text: "数据类型", link: `${PATH}` },
    ],
  },
  {
    text: "JS 内置对象与其方法",
    collapsed: true,
    items: [
      { text: "Array", link: `${PATH}/apis/array/` },
      { text: "String", link: `${PATH}/apis/string/` },
      { text: "Number", link: `${PATH}` },
      { text: "Object", link: `${PATH}` },
      { text: "RegExp", link: `${PATH}` },
    ],
  },
  {
    text: "JS 异步编程",
    collapsed: true,
    items: [
      { text: "Promise", link: `${PATH}/async/promise` },
      { text: "Async...Await...", link: `${PATH}/async/async-await` },
    ],
  },
  {
    text: "JS 面向对象",
    collapsed: true,
    items: [
      { text: "类", link: `${PATH}/` },
    ],
  },
  {
    text: "JS 模块化",
    collapsed: true,
    items: [
      { text: "ES Module", link: `${PATH}/modules/es-module` },
    ],
  },
  {
    text: "Web API",
    collapsed: true,
    items: [
      { text: "storage", link: `${PATH}` },
      { text: "request", link: `${PATH}` },
    ],
  },
];
