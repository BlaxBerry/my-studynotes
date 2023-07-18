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
      { text: "原始类型", link: `${PATH}/basics/primitive-types` },
      { text: "对象类型", link: `${PATH}/basics/ts-object` },
      { text: "数组类型", link: `${PATH}/basics/ts-array` },
      { text: "元组类型", link: `${PATH}/basics/ts-tuple` },
      { text: "模版文字类型", link: `${PATH}/basics/ts-template-literal` },
      { text: "枚举 ( Enum )", link: `${PATH}/basics/ts-enum` },
      { text: "高级类型", link: `${PATH}/basics/advanced-types` },
      { text: "内置工具类型", link: `${PATH}/basics/utility-types` },
      { text: "泛型 ( Generic )", link: `${PATH}/basics/ts-generic` },
    ],
  },
  {
    text: "TypeScript 类型操作",
    collapsed: true,
    items: [{ text: "类型的操作", link: `${PATH}/types-manipulation/` }],
  },
  {
    text: "TypeScript 面向对象",
    collapsed: true,
    items: [
      { text: "接口 ( Interface )", link: `${PATH}/basics/ts-interface` },
      { text: "类 ( Class )", link: `${PATH}/basics/ts-class` },
    ],
  },
];
