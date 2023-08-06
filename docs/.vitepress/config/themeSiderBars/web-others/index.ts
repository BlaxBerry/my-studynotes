const CROSS_DEVICE = "/notes/web-others/cross-device";
const CLOUD_DEV = "/notes/web-others/cloud-dev";
const CI_CD = "/notes/web-others/ci-cd";

export default [
  {
    text: "跨平台",
    collapsed: true,
    items: [
      { text: "React Native", link: `${CROSS_DEVICE}/react-native/` },
      { text: "Flutter", link: `${CROSS_DEVICE}/flutter/` },
      { text: "Electron", link: `${CROSS_DEVICE}/electron/` },
    ],
  },
  {
    text: "云开发",
    collapsed: true,
    items: [
      { text: "AWS", link: `${CLOUD_DEV}/aws/` },
      { text: "GoogleCloud", link: `` },
    ],
  },
  {
    text: "Serverless",
    collapsed: true,
    items: [
      { text: "Firebase", link: `` },
      { text: "？", link: `` },
    ],
  },
  {
    text: "CI/CD 工程化",
    collapsed: true,
    items: [
      { text: "Github Action", link: `${CI_CD}/` },
      { text: "GitLab Cli", link: `${CI_CD}/` },
    ],
  },
];
