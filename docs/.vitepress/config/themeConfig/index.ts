import themeNav from "./theme-nav";
import themeSider from "./theme-sider";
import themeFooter from "./theme-footer";
import { DefaultTheme } from "vitepress/types/default-theme";

const themeConfig: DefaultTheme.Config = {
  siteTitle: 'BlaxBerry学习笔记',
  logo: "/favicon.ico",
  nav: themeNav,
  footer: themeFooter,

  // 侧边栏
  sidebar: themeSider,
  sidebarMenuLabel: "相关目录",

  // 侧边目录
  aside: true,
  outline: "deep",
  outlineTitle: "本篇目录",

  // 深色模式
  darkModeSwitchLabel: "深色模式",

  // 返回顶部
  returnToTopLabel: "返回顶部",

  // 最后更新
  lastUpdatedText: "最后更新",

  // 社交链接
  socialLinks: [
    {
      icon: "github",
      link: "https://github.com/BlaxBerry/my-studynotes",
    },
    {
      icon: "twitter",
      link: "https://twitter.com/chenjiaxu333",
    },
    {
      icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.998 1.998c1.204 0 2.358.213 3.427.602L14.23 3.794a8.502 8.502 0 1 0 5.974 5.976l1.194-1.194A9.984 9.984 0 0 1 22 12c0 5.524-4.478 10.002-10.002 10.002c-5.524 0-10.002-4.478-10.002-10.002c0-5.524 4.478-10.002 10.002-10.002Zm0 4.002a6.01 6.01 0 0 1 1.502.19v1.567a4.5 4.5 0 1 0 2.742 2.743h1.567A6 6 0 1 1 12 6Zm2 6a2 2 0 1 1-1.217-1.841l1.72-1.72L14.5 5.25a.75.75 0 0 1 .22-.53l2.5-2.5a.75.75 0 0 1 1.28.53V5.5h2.75a.75.75 0 0 1 .53 1.28l-2.5 2.5a.75.75 0 0 1-.53.22h-3.19l-1.72 1.72c.102.24.158.503.158.78Zm4.441-4l1-1h-1.69a.75.75 0 0 1-.75-.75V4.56l-.999 1v2.381a.701.701 0 0 1 .059.06h2.38Z"/></svg>',
      },
      link: "https://blaxberry.github.io/portfolio/",
    },
  ],

  // Carbon 广告
  // carbonAds: {
  //   code: 'your-carbon-code',
  //   placement: 'your-carbon-placement'
  // }
};

export default themeConfig;
