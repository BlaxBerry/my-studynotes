# Django Rest Framework

![](/images/django-rest-framework.webp)

https://di-acc2.com/programming/python/10325/

## 安装

```shell
source .venv/bin/active
pip install djangorestframework // [!code focus]

# pip install markdown       # Markdown support for the browsable API. // [!code focus]
# pip install django-filter  # Filtering support // [!code focus]
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
