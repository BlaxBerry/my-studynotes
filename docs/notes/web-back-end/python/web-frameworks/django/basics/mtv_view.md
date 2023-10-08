# Django View ( 视图 )

## 简介

视图是个函数 / 类，用于处理访问路径对应的逻辑

视图与路由绑定映射关系之后，访问路由路径时会执行与之对应的视图的逻辑

---

### 位置

视图位于各个应用目录下，新创建的应用中默认为`views.py`

也可根据需求以包的形式定义多个独立的视图模块

::: code-group

```shell [单一文件]
|- 项目目录
  |- 主应用
  |- 自定义应用
    |- __init__.py
    |- ...
    |- views.py // [!code hl]
  |- manage.py
```

```shell [定义为包]
|- 项目目录
  |- 主应用
  |- 自定义应用
    |- __init__.py
    |- 自定义视图包 // [!code hl]
      |- __init__.py // [!code hl]
      |- 视图模块.py // [!code hl]
      |- 视图模块.py // [!code hl]
  |- manage.py
```

```python [views/__init__.py]
from 自定义应用.自定义视图包.视图模块 import *
from 自定义应用.自定义视图包.视图模块 import 视图
```

:::

---

### 使用步骤

::: details <Badge>STEP 0</Badge> 注册应用

视图所处的应用需要先在主应用的配置文件`settings.py`中注册

详见 [配置文件`settings.py`](../index.md#settings-py)

::: code-group

```shell [目录]
|- 项目目录
  |- 主应用
    |- __init__.py
    |- ...
    |- settings.py // [!code hl]
  |- 自定义应用
  |- 自定义应用
  |- manage.py
```

```python [settings.py]
INSTALLED_APPS = [
    # ...

    '自定义应用', // [!code hl]
    '自定义应用', // [!code hl]
]
```

:::

::: details <Badge>STEP 1</Badge> 定义视图

Django 视图有两种定义方式：

- [视图函数](#视图函数) ( 通过 Python 函数定义 )
- [视图类](#视图类)<Badge>推荐</Badge> ( 通过 Python 类定义 )

::: code-group

```python [视图函数]
# from django.shortcuts import render, redirect
# from django.http import HttpResponse, HttpResponseNotFound
# from django.http.response import JsonResponse


def 视图名(请求对象):
    return 响应对象
```

```python [视图类]
# from django.views.generic import (
#     TemplateView,
#     DetailView,
#     ListView,
# )


class 视图名(内置视图类):
    # template_name = 模版名
    # model = 模块名
```

:::

::: details <Badge>STEP 2</Badge> 注册路由

定义的视图需要在`urls.py`路由配置文件中注册，来指明当前视图为访问哪一个路径时执行的逻辑

详见 [Django 路由](./router.md)

::: code-group

```shell [主路由]
|- 项目目录
  |- 主应用
    |- __init__.py
    |- ...
    |- urls.py // [!code hl] # 注册到主路由文件
  |- 自定义应用
    |- __init__.py
    |- ...
    |- urls.py // [!code hl] # 注册到子路由文件
  |- manage.py
```

```python [urls.py]
from django.urls import path
from 应用.views import 视图名, 视图名 // [!code hl]


urlpatterns = [
    path('路径/', 视图函数名) // [!code hl]
    path('路径/', 视图类名.as_view()) // [!code hl]
]
```

:::

::: details <Badge>STEP 3</Badge> 按需关联模型、模版

详见 [Django 模型](./mtv_model.md)、[Django 模版](./mtv_template.md)

:::

## 视图函数

> function-based views ( FBVs )

::: code-group

```python [创建视图函数]
# from django.shortcuts import render, redirect
# from django.http import HttpResponse, HttpResponseNotFound
# from django.http.response import JsonResponse


def 视图名(request):
    return 响应
```

```python [注册路由映射]
from django.urls import path
from 应用.views import 视图名, 视图名

urlpatterns = [
    path('路径/', 视图名)
    path('路径/路径/', 视图名)
]
```

:::

---

### HttpResponse()

HTTP 响应对象：`HttpResponse()`

```python
from django.http import HttpResponse


def 视图名(request):
    response = '字符串'
    # response = '<html><body></body></html>'
    return HttpResponse(response, status=状态码)
```

::: details 例子：

::: code-group

```python [视图]
from django.http import HttpResponse


def index(request):
    return HttpResponse('hello', status=200)


def not_found(request):
    return HttpResponse('Not Found', status=404)


def fail(request):
    return HttpResponse(
        '<html><body><h1>服务器出错了</h1></body></html>',
        status=500,
    )
```

```shell [目录]
|- 项目目录
  |- 主应用
    |- __init__.py
    |- ...
    |- urls.py
  |- app
    |- __init__.py
    |- ...
    |- views.py
  |- manage.py
```

```python [urls.py]
from django.urls import path

from app.views import (
    index as app_index,
    not_found as app_404,
    fail as app_500,
)

urlpatterns = [
    path('app/', app_index),       # localhost:8000/app/
    path('app/404/', app_404),     # localhost:8000/app/404/
    path('app/500/', app_404),     # localhost:8000/app/500/
]
```

:::

---

### JsonResponse()

JSON 数据：`JsonResponse()`

```python
from django.http.response import JsonResponse


def 视图名(request):
    data = {'键': 值, '键': 值8}
    return JsonResponse(data)
```

::: details 例子：

::: code-group

```python [视图]
from django.http.response import JsonResponse


def data(request):
    data = {'name': 'Andy', 'age': 28}
    return JsonResponse(data)
```

```shell [目录]
|- 项目目录
  |- 主应用
    |- __init__.py
    |- ...
    |- urls.py
  |- app
    |- __init__.py
    |- ...
    |- views.py
  |- manage.py
```

```python [urls.py]
from django.urls import path
from app.views import data

urlpatterns = [
    path('app/data', data),   # localhost:8000/app/
]
```

:::

---

### render()

渲染模版：`render()`

返回的 HTML 模版定义在该应用目录中`templates`目录下

::: code-group

```python [views.py]
from django.shortcuts import render


def 视图名(request):
    return render(request, '模版名.html')
```

```shell [目录]
|- 项目目录
  |- 主应用
  |- 自定义应用
    |- __init__.py
    |- ...
    |- templates // [!code hl]
      |- 视图模版名.html // [!code hl]
    |- views.py // [!code hl]
  |- manage.py
```

:::

::: details 例子：

::: code-group

```python [视图]
from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def xxx(request):
    return render(request, 'xxx.html')
```

```shell [目录]
|- 项目目录
  |- 主目录
    |- __init__.py
    |- ...
    |- urls.py
  |- app
    |- __init__.py
    |- ...
    |- templates // [!code hl]
      |- index.html // [!code hl]
      |- xxx.html // [!code hl]
    |- views.py // [!code hl]
  |- manage.py
```

```python [urls.py]
from django.urls import path
from app.views import index, xxx


urlpatterns = [
    path('app/', index),         # localhost:8000/app/
    path('app/index/', index),   # localhost:8000/app/index/
    path('app/xxx/', xxx),       # localhost:8000/app/xxx/
]
```

:::

---

### HttpResponseNotFound()

404 错误：`HttpResponseNotFound()`

```python
from django.http import HttpResponseNotFound


```

---

### redirect()

重定向：`redirect()`

```python
from django.shortcuts import redirect


```

## 视图类

> class-based views ( CBVs )

::: code-group

```python [创建视图类]
# from django.views.generic import (
#     TemplateView,
#     DetailView,
#     ListView,
# )


class 视图(视图类):
    template_name = 模版名
    model = 模型 # TemplateView、RedirectView 不需要

    class Meta:
        app_label = '自定义应用名'
```

```python [注册路由映射]
from django.urls import path
from 应用.views import 视图名, 视图名

urlpatterns = [
    path('路径/', 视图名.as_view())
    path('路径/路径/', 视图名.as_view())
]
```

:::

---

### TemplateView

渲染模版：`TemplateView`

只需要指定模版名`template_name`为要渲染的模版名，即可在访问该视图对应路径时自动渲染

模版位于该应用目录下`templates`目录下

::: code-group

```python [views.py]
from django.views.generic import TemplateView


class 视图名(TemplateView):
    template_name = "视图模版名.html"
```

```shell [目录]
|- 项目目录
  |- 主应用
  |- 自定义应用
    |- __init__.py
    |- ...
    |- templates // [!code hl]
      |- 视图模版名.html // [!code hl]
    |- views.py // [!code hl]
  |- manage.py
```

:::

::: details 例子：

::: code-group

```python [视图]
from django.views.generic import TemplateView


class index(TemplateView):
    template_name = "index.html"


class xxx(TemplateView):
    template_name = "xxx.html"
```

```shell [目录]
|- 项目目录
  |- 主应用
  |- app
    |- __init__.py
    |- ...
    |- templates // [!code hl]
      |- index.html // [!code hl]
      |- xxx.html // [!code hl]
    |- views.py // [!code hl]
  |- manage.py
```

```python [urls.py]
from django.urls import path
from app.views import index, xxx


urlpatterns = [
    path('app/', index.as_view()),         # localhost:8000/app/
    path('app/index/', index.as_view()),   # localhost:8000/app/index/
    path('app/xxx/', xxx.as_view()),       # localhost:8000/app/xxx/
]
```

:::

---

### RedirectView

---

### DetailView

---

### ListView

---

### FormView

---

### CreateView

---

### UpdateView
