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
      {
        text: "内置对象方法",
        collapsed: true,
        items: [
          { text: "Array", link: `${PATH}/built-in-apis/array` },
          { text: "String", link: `${PATH}/built-in-apis/string` },
          { text: "Object", link: `${PATH}/built-in-apis/object` },
          { text: "Number", link: `${PATH}/built-in-apis/number` },
          { text: "Symbol", link: `${PATH}/built-in-apis/symbol` },
          { text: "RegExp", link: `${PATH}/built-in-apis/regExp` },
          { text: "Date", link: `${PATH}/built-in-apis/date` },
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
    ],
  },
  {
    text: "Web API",
    collapsed: true,
    items: [
      {
        text: "网络请求",
        collapsed: true,
        items: [
          { text: "XMLHttpRequest", link: `${PATH}/web-apis/XMLHttpRequest` },
          { text: "Fetch API", link: `${PATH}/web-apis/Fetch-API` },
        ],
      },
      { text: "DOM", link: `${PATH}/web-apis/DOM` },
      { text: "Web Storage API", link: `${PATH}/web-apis/Web-Storage-API` },
      { text: "AbortController", link: `${PATH}/web-apis/AbortController` },
      { text: "File API", link: `${PATH}/web-apis/File-API` },
    ],
  },
  {
    text: "Web 开发库",
    collapsed: true,
    items: [
      { text: "jQuery", link: "/notes/web-front-end/jquery/" },
      { text: "React", link: "/notes/web-front-end/react/" },
      { text: "Vue", link: "/notes/web-front-end/vue/" },
    ],
  },
  { text: "目录首页", link: `${PATH}/` },
];
