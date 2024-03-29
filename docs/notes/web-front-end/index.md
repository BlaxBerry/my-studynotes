---
prev: false
next: false
---

# Web 前端相关

## 学习路线

https://fecommunity.github.io/front-end-interview/

## 浏览器优化

5 秒速开页面：
https://mp.weixin.qq.com/s/lM4E2od-8O77SzxbyCagNw

性能优化——图片压缩、加载和格式选择：
https://mp.weixin.qq.com/s/IQ1Sm_pqzCOgcM59tsUlXQ

https://mp.weixin.qq.com/s/YBhyk4e25VhrRgiCbNUruA

浏览器优化：
https://juejin.cn/post/7116736167906639886

## Web 应用渲染模式

web front render pattern：
https://www.ragate.co.jp/blog/articles/10524

---

### CSR

CSR（ Client Side Rendering ）

当 CSR 在浏览器端生成 HTML/CSS 时 执行 JavaScript 。
由于第一次处理整个页面，因此初始负载会很重，但第一次之后的页面转换等交互会很快。

Steps:

1. 浏览器向指定的 URL 发出请求并获取带有空`<body>`的 HTML
2. 浏览器执行 JS 并将 HTML、CSS 等渲染到`<body>`中
3. 浏览器在 HTML 的`<body>`中显示扩展的 HTML 信息

在以下情况下考虑使用 CSR 页面：

- 网络速度很快。
- 服务器几乎没有资源可用于服务器端渲染。
- 数据显示之前的延迟很大（您必须显示大量数据）。换句话说，用户需要看到页面正在加载的一些保证，例如进度条、加载旋转器或其他占位符。
- 主要脚本很小并且加载速度很快。在这种情况下，应用程序会快速加载主脚本，并且会更快发送要求动态数据的额外请求。

---

### SPA

SPA 首屏加速：https://juejin.cn/post/7091313074614829086

---

### SSR

SSR ( Server Side Rendering )

SSR 在服务器端进行渲染（renders），因此与 CSR 相比， 在浏览器中执行 Javascript 是没有成本的，这是一个很大的优势。

Steps:

1. 浏览器请求指定的 URL
2. 服务器（NodeJS）接收请求并根据请求生成 HTML/CSS 等
3. 完成的 HTML/CSS 响应浏览器

在以下情况下考虑使用 SSR 页面：

- 网络很慢。
- 服务器有足够的资源来渲染带有数据的页面。请记住，Node 是单线程的，繁重的计算可能会阻止传入的请求。
- 数据显示之前的延迟很短。换句话说，空白页面的短暂闪烁被认为是快速加载或未被用户注意到。
- 主要脚本很大并且加载缓慢。对于我们的 SSR 页面，第一个请求要求提供包含数据的渲染页面。与 CSR 情况不同，发送此请求没有延迟。在 CSR 中，我们的应用程序仅在应用程序完成加载主脚本后才发送额外请求。
- 搜索引擎优化很重要。Googlebot 和其他搜索引擎机器人正确索引 SSR 页面。

---

### SSG

SSG ( Static Site Generation )

SSG 在构建时生成 HTML 等内容，
这是一种在每个请求上重用并传递给浏览器的技术。
在提出请求时，CSR/SSR 正在构建，
SSG 只返回预先创建的静态文件，因此显示速度 比 CSR/SSR 更快。
因为整个应用程序必须在页面刷新时构建
不适合具有许多页面的大型应用程序。

- 浏览器请求指定的 URL
- 构建时生成的静态文件对浏览器的响应

---

### ISG

ISG ( Incremental Static Generation )

SSR 和 ISR 之间的区别:

SSR 和 ISR 之间的主要区别在于页面渲染的时间。SSR 在服务器上渲染页面并将完全渲染的页面发送到客户端，而 ISR 预渲染页面并在新数据可用时在后台更新它。
另一个区别是 SSR 需要服务器来渲染页面，而 ISR 可以在构建时或运行时预渲染。这意味着 SSR 的加载速度可能比 ISR 慢，因为它需要往返服务器，而 ISR 可以通过 CDN 提供服务，从而加快加载时间。
SSR 更适合需要动态数据的页面，例如产品页面或搜索结果页面，而 ISR 更适合需要定期更新的页面，例如新闻或天气页面。

---

### ISR

ISR ( Incremental Static Regeneration )

ISR 是一种结合了 SSG 和 SSR 功能的技术。
为每个请求生成 HTML。
处理流程与 SSG 几乎相同，
它解决了 SSG 在更新时必须构建整个应用程序的缺点。
具体来说，它会定期在后台构建，
它从 API 获取数据并重新渲染。
虽然数据更新的实时性低于 CSR/SSR ，
实时性能高于 SSG，同时保持 SSG 的页面速度 。
