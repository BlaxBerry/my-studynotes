// prettier-ignore
import { HeadConfig } from "vitepress";

const siteHead: HeadConfig[] = [
  // link
  [
    "link",
    {
      rel: "icon",
      href: "/my-studynotes/favicon.ico",
    },
  ],

  // meta
  [
    "meta",
    {
      name: "theme-color",
      content: "#ffffff",
    },
  ],
  [
    "meta",
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no",
    },
  ],
];

export default siteHead;
