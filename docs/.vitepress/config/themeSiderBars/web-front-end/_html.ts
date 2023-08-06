const PATH = "/notes/web-front-end/html";

export default [
  {
    text: "常用标签",
    collapsed: true,
    items: [
      { text: "布局", link: `${PATH}/elements/layouts` },
      { text: "标题、段落", link: `${PATH}/elements/titles-and-paragraphs` },
      { text: "文本格式", link: `${PATH}/elements/text-formatting` },
      { text: "文本引用", link: `${PATH}/elements/quotation-and-citation` },
      { text: "多媒体", link: `${PATH}/elements/media` },
      { text: "列表 ( List )", link: `${PATH}/elements/lists` },
      { text: "表格 ( Table )", link: `${PATH}/elements/table` },
      { text: "表单 ( Form )", link: `${PATH}/elements/form` },
    ],
  },
  {
    text: "图形",
    collapsed: true,
    items: [
      { text: "Canvas", link: `${PATH}/canvas/` },
      { text: "SVG", link: `${PATH}/svg/` },
    ],
  },
  {
    text: "其他",
    collapsed: true,
    items: [
      { text: "字符集", link: `${PATH}/chart` },
      { text: "语义标签", link: `${PATH}/semantic` },
      { text: "块、内联", link: `${PATH}/block-inline` },
    ],
  },
  {
    text: "SEO",
    collapsed: true,
    items: [
      { text: "Meta标签", link: `${PATH}/SEO/meta-tags` },
    ],
  }
];
