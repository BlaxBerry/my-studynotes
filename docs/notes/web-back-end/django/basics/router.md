# Django 路由

https://www.bilibili.com/video/BV1fh4y1Z7jp/?p=15&spm_id_from=pageDriver&vd_source=8960252a3845b76b699282b11f36ab5c

::: code-group

```shell [目录]
|- 项目
  |- 主应用
    |- __init__.py
    |- asgi.py
    |- settings.py
    |- urls.py // [!code hl]
    |- wsgi.py
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
