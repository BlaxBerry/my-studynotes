const PATH = "/notes/web-back-end/golang";

export default [
  {
    text: "Go 基础",
    collapsed: true,
    items: [
      { text: "变量", link: `${PATH}/basics/variable` },
      { text: "常量", link: `${PATH}/basics/constant` },
      { text: "指针", link: `${PATH}/basics/pointer` },
      { text: "函数", link: `${PATH}/basics/function` },
      { text: "运算符", link: `${PATH}/basics/operator` },
      { text: "数据类型", link: `${PATH}/basics/data-type` },
      { text: "流程控制", link: `${PATH}/basics/control-flow` },
      { text: "错误处理", link: `${PATH}/basics/error-handling` },
      {
        text: "模块化开发",
        collapsed: true,
        items: [
          { text: "包、模块", link: `${PATH}/basics/pkg-module` },
          { text: "包管理 ( Go Modules )", link: `${PATH}/basics/go-modules` },
        ],
      },
      {
        text: "内置包",
        collapsed: true,
        items: [
          { text: "fmt", link: `${PATH}/built-in-pkgs/fmt` },
          { text: "net/http", link: `${PATH}/built-in-pkgs/net-http` },
          { text: "path/filepath", link: `` },
          { text: "log", link: `` },
          { text: "reflect", link: `` },
          { text: "strings", link: `` },
          { text: "bytes", link: `` },
          { text: "encoding/json", link: `` },
          { text: "sort", link: `` },
          { text: "sync", link: `` },
        ],
      },
      { text: "并发", link: `${PATH}/basics/` },
      { text: "异步", link: `${PATH}/basics/` },
    ],
  },
  {
    text: "Web 应用开发",
    collapsed: true,
    items: [
      { text: "Gin", link: "/notes/web-back-end/golang/web-frameworks/gin/" },
    ],
  },
  { text: "目录首页", link: `${PATH}/` },
];
