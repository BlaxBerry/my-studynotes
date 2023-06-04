import { defineConfig } from "vitepress";
// import siteHead from "./siteHeadConfig";
import themeConfig from "./themeConfig";

export default defineConfig({
  // 网站元数据
  title: "学习笔记",
  titleTemplate: ":title | BlaxBerry学习笔记",
  description: "BlaxBerry的学习记录",
//   head: siteHead,

  // 站点部署 https://blaxberry.github.io/my-studynotes/
  base: "/my-studynotes/",
  // 缓存目录
  cacheDir: "./.vitepress/.vite",
  // 站点的构建输出目录
  outDir: "./.vitepress/dist",
  // 忽略死链接
  ignoreDeadLinks: true,

  // 默认主题配置
  themeConfig,

  //使用深色模式
  appearance: true,
  // 使用最近更新时间
  lastUpdated: true,
});
