const PATH = "/notes/web-back-end";

export default [
  {
    text: "常用语言・运行时",
    collapsed: true,
    items: [
      { text: "Node.js", link: `${PATH}/node-js/` },
      { text: "Deno", link: `${PATH}/deno/` },
      { text: "Python", link: `${PATH}/python/` },
      { text: "Golang", link: `${PATH}/golang/` },
      { text: "Ruby", link: `${PATH}/ruby/` },
      { text: "Rust", link: `${PATH}/rust/` },
    ],
  },
  {
    text: "常用框架",
    collapsed: true,
    items: [
      {
        text: "Express.js",
        link: `${PATH}/node-js/web-frameworks/express-js/`,
      },
      {
        text: "Nest.js",
        link: `${PATH}/node-js/web-frameworks/nest-js/`,
      },
      { text: "Django", link: `${PATH}/python/web-frameworks/django/` },
      { text: "Gin", link: `${PATH}/golang/web-frameworks/gin/` },
      {
        text: "Ruby on Rails",
        link: `${PATH}/ruby/web-frameworks/ruby-on-rails/`,
      },
    ],
  },
  {
    text: "数据库",
    collapsed: true,
    items: [
      {
        text: "关系型 ( SQL )",
        collapsed: true,
        items: [
          { text: "MySQL", link: `${PATH}/databases/mysql/` },
          { text: "PostgreSQL", link: `${PATH}/databases/postgreSQL/` },
        ],
      },
      {
        text: "非关系型 ( NoSQL )",
        collapsed: true,
        items: [
          { text: "MongoDB", link: `${PATH}/databases/mongodb/` },
          { text: "Redis", link: `${PATH}/databases/redis/` },
        ],
      },
    ],
  },
  {
    text: "服务器",
    collapsed: true,
    items: [
      { text: "Apache", link: `${PATH}/servers/apache/` },
      { text: "Nginx", link: `${PATH}/servers/nginx/` },
    ],
  },
];
