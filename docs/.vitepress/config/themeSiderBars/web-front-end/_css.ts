const PATH = "/notes/web-front-end/css";

export default [
  {
    text: "选择器",
    collapsed: true,
    items: [
      { text: "简单选择器", link: `${PATH}/selectors/simple-selectors` },
      { text: "伪类选择器", link: `${PATH}/selectors/pseudo-class-selectors` },
      {
        text: "伪元素选择器",
        link: `${PATH}/selectors/pseudo-elements-selectors`,
      },
      { text: "属性选择器", link: `${PATH}/selectors/attribute-selectors` },
      { text: "组合选择器", link: `${PATH}/selectors/combinator-selectors` },
    ],
  },
  {
    text: "常用样式",
    collapsed: true,
    items: [
      { text: "文本效果", link: `${PATH}/styles/text-effects` },
      { text: "过渡 ( Transition )", link: `${PATH}/styles/` },
      { text: "动画 ( Animation )", link: `${PATH}/styles/animations` },
      { text: "2D Transform", link: `${PATH}/styles/` },
      { text: "3D Transform", link: `${PATH}/styles/` },
    ],
  },
  {
    text: "排版布局",
    collapsed: true,
    items: [
      { text: "弹性盒 ( Flexbox )", link: `${PATH}/layouts/flexbox` },
      { text: "栅格 ( Grids )", link: `${PATH}/layouts/grids` },
      { text: "浮动 ( Floats )", link: `${PATH}/layouts/floats` },
      { text: "定位 ( Positioning )", link: `${PATH}/layouts/positioning` },
      { text: "正常流 ( Normal Flow )", link: `${PATH}/layouts/normal-flow` },
    ],
  },
  {
    text: "预处理器",
    collapsed: true,
    items: [
      { text: "Sass", link: `/notes/web-front-end/css/pre-processors/sass/` },
      { text: "Less", link: `` },
    ],
  },
  { text: "目录首页", link: `${PATH}/` },
];
