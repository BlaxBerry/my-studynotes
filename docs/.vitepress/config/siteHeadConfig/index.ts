import { HeadConfig } from "vitepress";

const siteHead: HeadConfig[] = [
  // links
  [
    "link",
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
  ],
  [
    "link",
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
  ],
  [
    "link",
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
  ],
  [
    "link",
    {
      rel: "manifest",
      sizes: "180x180",
      href: "/site.webmanifest",
    },
  ],
  [
    "link",
    {
      rel: "mask-icon",
      sizes: "180x180",
      href: "/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
  ],

  // meta
  [
    "meta",
    {
      name: "msapplication-TileColor",
      content: "#da532c",
    },
  ],
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
