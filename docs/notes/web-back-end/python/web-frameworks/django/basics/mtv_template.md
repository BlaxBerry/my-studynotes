# Django Template ( 模版 )

## 简介

### 位置

```shell
|- 项目目录
  |- 主应用
  |- 自定义应用
    |- templates // [!code hl]
      |- 模版.html // [!code hl]
      |- ... // [!code hl]
  |- manage.py
```

## 渲染方式

- 视图函数：通过[`render()`](./mtv_view.md#render)方法
- 视图类：通过[`TemplateView`](./mtv_view.md#templateview)内置类
