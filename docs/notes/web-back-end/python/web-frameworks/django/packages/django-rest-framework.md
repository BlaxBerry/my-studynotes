# Django Rest Framework

![](/images/django-rest-framework.webp)

## 安装

```shell
pip install djangorestframework

# pip install markdown       # Markdown support for the browsable API.
# pip install django-filter  # Filtering support
```

## 注册

1. 注册应用

```py
INSTALLED_APPS = [
    ...
    'rest_framework',
]
```

2. 注册路由

```py
urlpatterns = [
    ...
    path('api-auth/', include('rest_framework.urls'))
]
```
