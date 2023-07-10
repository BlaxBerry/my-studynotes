const PATH = "/notes/web-front-end/typescript";

export default [
  {
    text: "TypeScript 常用类型",
    collapsed: true,
    items: [
      { text: "原始类型", link: `${PATH}/common-types/primitive-types` },
      { text: "对象类型", link: `${PATH}/common-types/object-types` },
      {
        text: "数组、元组类型",
        link: `${PATH}/common-types/array-tuple-types`,
      },
      {
        text: "模版文字类型",
        link: `${PATH}/common-types/template-literal-types `,
      },
      { text: "高级类型", link: `${PATH}/common-types/advanced-types` },
    ],
  },
  {
    text: "TypeScript 接口、泛型",
    collapsed: true,
    items: [
      {
        text: "接口 ( Interface )",
        link: `${PATH}/interface-generic/interface`,
      },
      { text: "泛型 ( Generic )", link: `${PATH}/interface-generic/generic` },
      {
        text: "内置工具类型",
        link: `${PATH}/interface-generic/utility-types`,
      },
    ],
  },
];
