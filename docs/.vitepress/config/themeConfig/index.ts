import themeNav from "./theme-nav";
import themeSider from "./theme-sider";
import themeFooter from "./theme-footer";
import { DefaultTheme } from "vitepress/types/default-theme";

const themeConfig: DefaultTheme.Config = {
  siteTitle: "BlaxBerry学习笔记",
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
  ],

  // Carbon 广告
  // carbonAds: {
  //   code: 'your-carbon-code',
  //   placement: 'your-carbon-placement'
  // }
};

export default themeConfig;
