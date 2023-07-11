const PATH = "/notes/web-front-end/typescript";

export default [
  {
    text: "TypeScript 配置",
    collapsed: true,
    items: [
      { text: "环境构建", link: `${PATH}/product-env-config/ts-configuration` },
      {
        text: "配置文件 ( tsconfig.json )",
        link: `${PATH}/product-env-config/ts-configuration`,
      },
    ],
  },
  {
    text: "TypeScript 常见类型",
    collapsed: true,
    items: [
      { text: "原始类型", link: `${PATH}/common-types/primitive-types` },
      { text: "对象类型", link: `${PATH}/common-types/ts-object` },
      { text: "数组类型", link: `${PATH}/common-types/ts-array` },
      { text: "元组类型", link: `${PATH}/common-types/ts-tuple` },
      {
        text: "模版文字类型",
        link: `${PATH}/common-types/ts-template-literal`,
      },
      { text: "枚举类型", link: `${PATH}/common-types/ts-enum` },
      { text: "高级类型", link: `${PATH}/common-types/advanced-types` },
      { text: "内置工具类型", link: `${PATH}/common-types/utility-types` },
    ],
  },
  {
    text: "TypeScript 类型操作",
    collapsed: true,
    items: [
      { text: "类型的操作", link: `${PATH}/types-manipulation/` },
      { text: "泛型 ( Generic )", link: `${PATH}/ts-generic/` },
    ],
  },
  {
    text: "TypeScript 面向对象",
    collapsed: true,
    items: [
      { text: "接口 ( Interface )", link: `${PATH}/ts-interface/` },
      { text: "类 ( Class )", link: `${PATH}/ts-class/` },
    ],
  },
];
