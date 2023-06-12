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
    text: "JS 内置对象方法",
    collapsed: true,
    items: [
      { text: "Array", link: `${PATH}/built-in-apis/Array` },
      { text: "String", link: `${PATH}/built-in-apis/String` },
      { text: "Object", link: `${PATH}/built-in-apis/Object` },
      { text: "Number", link: `${PATH}/built-in-apis/Number` },
      { text: "RegExp", link: `${PATH}/built-in-apis/RegExp` },
      { text: "Date", link: `${PATH}/built-in-apis/Date` },
    ],
  },
  {
    text: "JS 面向对象",
    collapsed: true,
    items: [{ text: "Class 类", link: `${PATH}/oop/class` }],
  },
  {
    text: "JS 异步编程",
    collapsed: true,
    items: [
      { text: "Promise", link: `${PATH}/async/promise` },
      { text: "async...await...", link: `${PATH}/async/async-await` },
      { text: "Generator", link: `${PATH}/async/generator` },
    ],
  },
  {
    text: "JS 模块化",
    collapsed: true,
    items: [
      { text: "ES Module", link: `${PATH}/module-dev/es-module` },
      { text: "CommonJS", link: `${PATH}/module-dev/common-js` },
    ],
  },
  {
    text: "Web API",
    collapsed: true,
    items: [
      { text: "Storage", link: `${PATH}/web-apis/Storage` },
      { text: "Fetch", link: `${PATH}/web-apis/Fetch` },
      { text: "FileReader", link: `${PATH}/web-apis/` },
      { text: "AbortController", link: `${PATH}/web-apis/AbortController` },
    ],
  },
];
