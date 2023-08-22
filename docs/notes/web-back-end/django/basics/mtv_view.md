# Django View ( 视图 )

## 简介

视图实质是个函数/类，用于处理访问路径对应的逻辑

视图与路由绑定映射关系之后，访问路由路径时会执行与之对应的视图的逻辑

视图位于各个应用 ( 功能模块 ) 目录下的`views.py`

::: code-group

```shell [目录]
|- 项目
  |- 主应用
  |- 自定义应用
    |- __init__.py
    |- admin.py
    |- apps.py
    |- models.py
    |- tests.py
    |- views.py // [!code hl]
  |- manage.py
```

```python [views.py 文件]
from django.shortcuts import render

# 在此定义该应用相关的所有视图
```

:::

Django 视图有两种定义方式，通过 Python 函数或类

- [视图函数 ( FBVs )](#视图函数)
- [视图类( CBVs )](#视图类) ( 推荐 )

## 使用步骤

::: tip 视图使用步骤简介

0. [创建](../index.md#应用创建)并将应用[注册](../index.md#应用注册)到主应用目录下的[`settings.py`](../index.md#settings-py)
1. 将视图函数/类定义在应用目录下`views.py`
2. 将视图与访问路径的映射追加注册到[路由](../basics/router.md)中 ( 主应用目录下`urls.py` )

:::

::: code-group

```shell [目录]
|- 项目目录
  |- 主应用
    |- __init__.py
    |- ...
    |- settings.py // [!code hl]
    |- urls.py // [!code hl]
  |- 自定义应用
    |- __init__.py
    |- ...
    |- views.py // [!code hl]
  |- manage.py
```

```python [主应用/settings.py]
INSTALLED_APPS = [
    # ...

    '自定义应用', // [!code hl]
]
```

```python [主应用/urls.py]
from django.urls import path
from 应用.views import 视图名, 视图名 // [!code hl]


urlpatterns = [ // [!code hl]
    path('路径/', 视图函数名) // [!code hl]
    path('路径/', 视图类名.as_view()) // [!code hl]
] // [!code hl]
```

```python [应用/views.py]
# 视图函数
def 视图名(请求对象):
    return 响应对象


# 视图类
class 视图名(内置视图类):
    # template_name = 模版名
    # model = 模块名
```

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

::: details HTTP 响应对象：`HttpResponse()`

```python
from django.http import HttpResponse


def 视图名(request):
    response = '字符串'
    # response = '<html><body></body></html>'
    return HttpResponse(response, status=状态码)
```

:::

::: details JSON 数据：`JsonResponse()`

```python
from django.http.response import JsonResponse


def 视图名(request):
    data = {'键': 值, '键': 值8}
    return JsonResponse(data)
```

:::

::: details 渲染模版：`render()`

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

::: details 404 错误：`HttpResponseNotFound()`

```python
from django.http import HttpResponseNotFound


```

:::

::: details 重定向：`redirect()`

```python
from django.shortcuts import redirect


```

:::

> 例子：

:::code-group

```shell [目录]
|- 项目
  |- 主应用
    |- ...
    |- settings.py // [!code hl]
    |- urls.py // [!code hl]
  |- aa
    |- ...
    |- views.py // [!code hl]
  |- bb
    |- ...
    |- views.py // [!code hl]
  |- cc
    |- ...
    |- templates // [!code hl]
      |- index.html // [!code hl]
      |- xxx.html // [!code hl]
    |- views.py // [!code hl]
  |- manage.py
```

```python [aa/views.py]
from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def xxx(request):
    return render(request, 'xxx.html')
```

```python [bb/views.py]
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

```python [cc/views.py]
from django.http.response import JsonResponse


def data(request):
    data = {'name': 'Andy', 'age': 28}
    return JsonResponse(data)
```

```python [urls.py]
from django.urls import path

from aa.views import (
    index as aa_index,
    xxx as aa_xxx,
)
from bb.views import (
    not_found as cc_404,
    fail as cc_500,
)
from cc.views import data as bb_data


urlpatterns = [
    path('aa/', aa_index),       # localhost:8000/aa/  // [!code hl]
    path('aa/index/', aa_index), # localhost:8000/aa/index/  // [!code hl]
    path('aa/xxx/', aa_xxx),     # localhost:8000/aa/xxx/  // [!code hl]
    path('bb/', cc_index),       # localhost:8000/bb/  // [!code hl]
    path('bb/404/', cc_404),     # localhost:8000/bb/404/  // [!code hl]
    path('bb/500/', cc_404),     # localhost:8000/bb/500/  // [!code hl]
    path('cc/', bb_data),        # localhost:8000/cc/  // [!code hl]
]
```

```python [settings.py]
INSTALLED_APPS = [
    # ...

    'aa',  // [!code hl]
    'bb',  // [!code hl]
    'cc',  // [!code hl]
]
```

:::

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

::: details 渲染模版：`TemplateView`

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

::: details `RedirectView`
:::

::: details `DetailView`
:::

::: details `ListView`
:::

::: details `FormView`
:::

::: details `CreateView`
:::

::: details `UpdateView`
:::

> 例子：

::: code-group

```shell [目录]
|- 项目
  |- 主应用
    |- ...
    |- settings.py // [!code hl]
    |- urls.py // [!code hl]
  |- aa
    |- ...
    |- views.py // [!code hl]
  |- bb
    |- ...
    |- views.py // [!code hl]
  |- cc
    |- ...
    |- templates // [!code hl]
      |- index.html // [!code hl]
      |- xxx.html // [!code hl]
    |- views.py // [!code hl]
  |- manage.py
```

```python [aa/views.py]
from django.views.generic import TemplateView


class index(TemplateView):
    template_name = "index.html"


class xxx(TemplateView):
    template_name = "xxx.html"
```

```python [urls.py]
from django.urls import path

from aa.views import (
    index as aa_index,
    xxx as aa_xxx,
)


urlpatterns = [
    path('aa/', aa_index.as_view()),         # localhost:8000/aa/
    path('aa/index/', aa_index.as_view()),   # localhost:8000/aa/index/
    path('aa/xxx/', aa_xxx.as_view()),       # localhost:8000/aa/xxx/
]
```

```python [settings.py]
INSTALLED_APPS = [
    # ...

    'aa',  // [!code hl]
    'bb',  // [!code hl]
    'cc',  // [!code hl]
]
```

:::
