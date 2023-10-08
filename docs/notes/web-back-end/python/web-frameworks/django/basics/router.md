# Django 路由

## 简介

---

### 位置

也可根据需求以包的形式定义多个独立的路由模块

::: code-group

```shell [主路由]
|- 项目
  |- 主应用
    |- __init__.py
    |- ...
    |- urls.py // [!code hl] # 主路由
  |- 自定义应用
    |- __init__.py
    |- ...
    |- urls.py // [!code hl] # 子路由
  |- manage.py
```

```shell [子路由]

```

```shell [路由模块]

```

:::

一般 Django 项目会有很多应用，
若所有路由都在主路由文件中配置会变得杂乱臃肿

建议在每个独立的应用中创建独自的路由，然后分发到主路由

https://www.bilibili.com/video/BV1fh4y1Z7jp/?p=15&spm_id_from=pageDriver&vd_source=8960252a3845b76b699282b11f36ab5c

::: code-group

```shell [目录]
|- 项目
  |- 主应用
    |- __init__.py
    |- ...
    |- urls.py // [!code hl] # 主路由文件
  |- 自定义应用
  |- ...
  |- manage.py
```

```python [默认 urls.py]
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),

    # 定义各个自定义应用视图与访问路径的映射
]
```

:::
