const PATH = "/notes/web-others";

export default [
  {
    text: "版本控制",
    // collapsed: true,
    items: [
      {
        text: "Git",
        collapsed: true,
        items: [
          { text: "基础", link: `${PATH}/web-dev-tools/git/` },
          { text: "常用命令", link: `${PATH}/web-dev-tools/git/commands/` },
        ],
      },
      {
        text: "托管平台",
        collapsed: true,
        items: [
          {
            text: "Github",
            link: `${PATH}/web-dev-tools/git/platforms/github`,
          },
          {
            text: "GitLab",
            link: `${PATH}/web-dev-tools/git/platforms/gitlab`,
          },
        ],
      },
    ],
  },
  {
    text: "多版本管理",
    // collapsed: true,
    items: [
      { text: "asdf", link: `${PATH}/web-dev-tools/asdf/` },
      { text: "RTX", link: `` },
    ],
  },
  {
    text: "命令行工具",
    // collapsed: true,
    items: [{ text: "curl", link: `${PATH}/web-dev-tools/curl/` }],
  },
  {
    text: "容器化",
    // collapsed: true,
    items: [
      { text: "Docker", link: `${PATH}/web-dev-tools/docker/` },
      { text: "Kubernetes", link: `` },
    ],
  },
  {
    text: "工程化",
    // collapsed: true,
    items: [{ text: "Makefile", link: `${PATH}/web-dev-tools/Makefile/` }],
  },
];
