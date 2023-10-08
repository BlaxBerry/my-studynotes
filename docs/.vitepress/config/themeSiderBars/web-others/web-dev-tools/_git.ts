const PATH = "/notes/web-others/web-dev-tools/git";

export default [
  {
    text: "常用命令",
    collapsed: true,
    items: [
      { text: "git stash", link: `${PATH}/commands/git-stash` },
      { text: "git commit", link: `${PATH}/commands/git-commit` },
      { text: "git checkout", link: `${PATH}/commands/git-checkout` },
    ],
  },
  {
    text: "SSH",
    collapsed: true,
    items: [
      { text: "?", link: `${PATH}/` },
      { text: "?", link: `${PATH}/` },
    ],
  },
  {
    text: "git-hooks",
    collapsed: true,
    items: [
      { text: "?", link: `${PATH}/` },
      { text: "?", link: `${PATH}/` },
      {
        text: "Husky",
        collapsed: true,
        items: [
          { text: "?", link: `${PATH}/` },
          { text: "?", link: `${PATH}/` },
        ],
      },
    ],
  },
  {
    text: "托管平台",
    collapsed: true,
    items: [
      { text: "Github", link: `${PATH}/platforms/github` },
      { text: "GitLab", link: `${PATH}/platforms/gitlab` },
    ],
  },
];
