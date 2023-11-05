const PATH = "/notes/web-others/web-dev-tools";

export default [
  {
    text: "多版本运行时管理",
    // collapsed: true,
    items: [{ text: "asdf", link: `${PATH}/asdf/` }],
  },
  {
    text: "协作开发版本控制",
    // collapsed: true,
    items: [
      { text: "Git", link: `${PATH}/git/` },
      {
        text: "Git 托管平台",
        collapsed: true,
        items: [
          { text: "Github", link: `${PATH}/git/platforms/github` },
          { text: "GitLab", link: `${PATH}/git/platforms/gitlab` },
        ],
      },
    ],
  },
  {
    text: "容器化平台",
    // collapsed: true,
    items: [
      { text: "Docker", link: `${PATH}/docker/` },
      // { text: "Kubernetes", link: `${PATH}/kubernetes/` },
    ],
  },
  {
    text: "数据请求获取",
    // collapsed: true,
    items: [{ text: "curl", link: `${PATH}/curl/` }],
  },
  {
    text: "x",
    // collapsed: true,
    items: [{ text: "Makefile", link: `${PATH}/Makefile/` }],
  },
];
