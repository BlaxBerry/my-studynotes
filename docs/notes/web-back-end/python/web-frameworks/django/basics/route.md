# Django 路由

## 简介

Django 项目中路由定义在`urls.py`文件中，是指访问路径与视图之间的映射

::: tip 路由分为两类：

- **主路由**：在项目主应用目录下，创建主应用时自动生成
- **子路由**：在各个自定义应用目录下，非必需可自行创建

:::

:::code-group

```shell [位置]
[项目目录]
|- config
    |- urls.py  # 主路由
    |- ...
|- [自定义应用]
    |- urls.py  # 子路由
    |- ...
```

```py [主路由文件]
from django.urls import path

urlpatterns = [
    path('路径', 视图),
    path(r"路径", include("自定义应用.urls"))
    # ...
]
```

```py [子路由文件]
from django.urls import path

urlpatterns = [
    path('路径', 视图),
    path('路径', 视图),
    # ...
]
```

:::

## 注册路由

### 类视图

```py
from django.urls import path
from 自定义应用.views import 类视图名

urlpatterns = [
    # ...
    path('路径', 类视图名.as_view(), name='路由名')
]

```

### 函数视图

```py
from django.urls import path
from 自定义应用.views import 类视图名

urlpatterns = [
    # ...
    path('路径', 函数视图名, name='路由名')
]
```

### 导入子路由

一般会将路由拆分为子路由后定义在各自自定义应用下的`urls.py`，
然后主应用下的主路由中通过`include()`导入子路由

```py
from django.urls import include, path

urlpatterns = [
    # ...
    path(r"路径", include("自定义应用.urls"))
]
```

## 路由匹配

```py
from django.urls import path

urlpatterns = [
    path('', 视图),   # localhost:8000
    path('/', 视图),  # localhost:8000/
    path('a', 视图),  # localhost:8000/a
    path('a/', 视图), # localhost:8000/a/
]
```

主路由

子路由
