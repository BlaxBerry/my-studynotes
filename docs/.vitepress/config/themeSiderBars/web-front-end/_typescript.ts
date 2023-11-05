const PATH = "/notes/web-front-end/typescript";

export default [
  {
    text: "常见类型",
    collapsed: true,
    items: [
      { text: "原始类型", link: `${PATH}/basics/primitive-types` },
      { text: "对象类型", link: `${PATH}/basics/ts-object` },
      { text: "数组类型", link: `${PATH}/basics/ts-array` },
      { text: "元组类型", link: `${PATH}/basics/ts-tuple` },
      { text: "字面量类型", link: `${PATH}/basics/ts-template-literal` },
      { text: "高级类型", link: `${PATH}/basics/advanced-types` },
      { text: "内置工具类型", link: `${PATH}/basics/utility-types` },
      { text: "枚举 ( Enum )", link: `${PATH}/basics/ts-enum` },
      { text: "泛型 ( Generic )", link: `${PATH}/basics/ts-generic` },
    ],
  },
  {
    text: "类型操作",
    collapsed: true,
    items: [
      { text: "类型推断", link: `${PATH}/types-manipulation/type-inference` },
      { text: "类型断言", link: `${PATH}/types-manipulation/type-assertions` },
      {
        text: "类型守护 ( 类型缩小 )",
        link: `${PATH}/types-manipulation/type-guards`,
      },
    ],
  },
  {
    text: "面向对象",
    collapsed: true,
    items: [
      { text: "接口 ( Interface )", link: `${PATH}/basics/ts-interface` },
      { text: "类 ( Class )", link: `${PATH}/basics/ts-class` },
    ],
  },
  { text: "目录首页", link: `${PATH}/` },
];
