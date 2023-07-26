const PATH = "/notes/web-front-end/javascript";

export default [
  {
    text: "JS 基础",
    collapsed: true,
    items: [
      { text: "堆、栈", link: `${PATH}/ecma-script/stack-heap` },
      { text: "数据类型", link: `${PATH}/ecma-script/data-type` },
      { text: "运算符", link: `${PATH}/ecma-script/operators` },
      { text: "函数", link: `${PATH}/ecma-script/functions` },
    ],
  },
  {
    text: "内置对象方法",
    collapsed: true,
    items: [
      { text: "Array", link: `${PATH}/built-in-apis/Array` },
      { text: "String", link: `${PATH}/built-in-apis/String` },
      { text: "Object", link: `${PATH}/built-in-apis/Object` },
      { text: "Number", link: `${PATH}/built-in-apis/Number` },
      { text: "Symbol", link: `${PATH}/built-in-apis/Symbol` },
      { text: "RegExp", link: `${PATH}/built-in-apis/RegExp` },
      { text: "Date", link: `${PATH}/built-in-apis/Date` },
    ],
  },
  {
    text: "面向对象",
    collapsed: true,
    items: [
      { text: "原型 ( Prototype )", link: `${PATH}/oop/prototype` },
      { text: "类 ( Class )", link: `${PATH}/oop/class` },
    ],
  },
  {
    text: "异步编程",
    collapsed: true,
    items: [
      { text: "Promise", link: `${PATH}/async/promise` },
      { text: "Generator", link: `${PATH}/async/generator` },
    ],
  },
  {
    text: "模块化开发",
    collapsed: true,
    items: [
      { text: "CommonJS", link: `${PATH}/module-dev/common-js` },
      { text: "ES Modules", link: `${PATH}/module-dev/es-modules` },
    ],
  },
  {
    text: "Web API",
    collapsed: true,
    items: [
      { text: "DOM", link: `${PATH}/web-apis/DOM` },
      { text: "Web Storage API", link: `${PATH}/web-apis/Web-Storage-API` },
      { text: "XMLHttpRequest", link: `${PATH}/web-apis/XMLHttpRequest` },
      { text: "Fetch API", link: `${PATH}/web-apis/Fetch-API` },
      { text: "AbortController", link: `${PATH}/web-apis/AbortController` },
      { text: "File API", link: `${PATH}/web-apis/File-API` },
    ],
  },
];
