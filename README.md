# Personal StudyNote Site

[Github Page](https://github.com/BlaxBerry/my-studynotes)

## Progress

Developing ...

## Stacks

- [Vitepress]() v1.0.0-beta.1
- [TypeScript]()
- [Sass]()
- [Markdown]()
- [Github Pages]()
- [Github Actions]()

## Directories

```shell
|- .github
|- .vscode
|- docs
  |- .vitepress # Vitepress's Theme Configurations
    |- config
      |- siteHeadConfig
      |- themeConfig
        |- ...
      |- themeSiderBars
        |- ...
      |- index.ts
    |- theme
      |- custom.scss
      |- index.ts
  |- notes # Markdown Notes
    |- ...
  |- public # Static Assets
    |- images
      |- ...
    |- ...
  |- ...
  |- index.md
  |- package.json
  |- yarn.lock
```

## Others

dev steps：

1. work on `main` branch
2. add then commit with message `update docs`
3. push to remote branch directly ( it will be deployed to github page by github action atomically )

static assets：

1. images should be added to `/public/images/`
2. image's size should be `2000*1000` and `.webp`
3. only skill's images should be added at this moment
