# Django 管理系统

## 简介

:::code-group

```py [主路由]
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]
```

:::
