# npm

![](/images/npm.webp)

## npx

npx 是个用于执行 Node 依赖包的工具

可在不安装包到全局的情况下使用包

```shell
npx [包名]
```

## package.json

https://juejin.cn/post/7233785645650264119

- type： module
- devDependencies：开发环境依赖包
- dependencies：生产环境依赖包

```json
{
  "name": "项目名",
  "version": "项目版本",
  "type": "module",
  "scripts": {
    "脚本名": "命令"
  },
  "dependencies": {
    "依赖包": "版本号/地址"
  },
  "devDependencies": {
    "依赖包": "版本号/地址"
  }
}
```

依赖包版本管理

```json
{
  "依赖包": "版本号",
  "依赖包": "^版本号",

  /* 私有仓库 */
  "依赖包": "git+ssh://git@github.com/<帐号名>/<仓库名>.git", // master branch
  "依赖包": "git+ssh://git@github.com/<帐号名>/<仓库名>.git#<分支名>", // specific branch
  "依赖包": "git+ssh://git@github.com/<帐号名>/<仓库名>.git#<提交CommitID>" // specific commit
}
```
