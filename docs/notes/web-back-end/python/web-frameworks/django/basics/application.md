# Django 应用 ( Application )

## 简介

Django 项目将各个业务功能以应用的形式定义，每个应用都是个 Python 包

一个项目主应用加多个自定义应用构成一个项目

::: tip 应用分为两类：

- **主应用**：存放项目配置 ( 可称为项目配置应用 ) 故建议命名为`config`
- **自定义应用**：存放具体业务功能

:::

## 创建应用

- <Badge>主应用</Badge> 在项目创建时自动创建 详见 [创建 Django 项目](../index.md#项目创建)

- <Badge>自定义应用</Badge> 需要执行 Django 命令创建

::: code-group

```shell [自定义应用]
# cd 项目根目录
python manage.py startapp 自定义应用名   // [!code focus]
```

```shell [主应用]
# % source .venv/bin/active

# 创建方法一：初始化新项目
diango-admin startproject 项目名        //[!code focus]
cd 项目名
mv 项目名 新的自定义名

# 创建方法二：现有根目录下添加
cd 现有项目目录
diango-admin startproject 主应用名 .    //[!code focus]
```

:::

自定义应用在创建后需要注册才能使用 详见下文 [注册应用](#注册应用)

## 应用位置

一般开发会有多个自定义应用，有两种位置的设计：

- 多个自定义应用直接分别存放在项目根目录下
- 多个自定义应用以子包的形式存放某个包目录下

::: code-group

```shell [目录结构设计一]
[项目目录]
|- [主应用]
|- [自定义应用]
|- [自定义应用]
|- ...
|- manage.py
|- ...
```

```shell [目录结构设计二]
[项目目录]
|- [主应用]
|- [自定义包名]
    |- __init__.py
    |- [自定义应用]
    |- [自定义应用]
    |- ...
|- manage.py
|- ...
```

:::

## 应用目录

目录结构没有特别的约定，具体取决于开发团队

建议模块化开发尽量细分功能，可参照[推荐的项目目录结构](../index.md#项目目录)

::: code-group

```shell [默认自定义应用目录]
[自定义应用]
|- migrations   # 模型迁移文件
    |- __init__.py
|- __init__.py
|- admin.py     # Django 管理系统
|- apps.py      # 应用信息
|- models.py    # 模型
|- views.py     # 视图
|- test.py      # 单元测试
|- urls.py      # 子路由
```

```shell [默认主应用目录]
[主应用]
|- __init__.py
|- asgi.py      # 异步、并发处理
|- wsgi.py      # 服务器网关接口
|- settings.py  # 项目配置
|- urls.py      # 主路由
```

:::

> 如下：应用创建后自动生成文件夹与文件：

::: details `migrations`

详见 [数据迁移](./model.md#数据迁移)

::: code-group

```shell [默认位置]
[自定义应用]
|- ...
|- migrations
    |- __init__.py
    |- ...
```

:::

::: details 自定义应用 / `admin.py`

详见 [管理系统](./admin.md)

::: code-group

```shell [默认位置]
[自定义应用]
|- ...
|- admin.py
```

```py [默认内容]
from django.contrib import admin

# Register your models here.

```

:::

::: details 自定义应用 / `apps.py`

当前应用信息定义文件，其中定义了`AppConfig`类

::: code-group

```shell [默认位置]
[自定义应用]
|- ...
|- apps.py
```

```py [默认内容]
from django.apps import AppConfig


class 自定义应用名Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = '自定义应用名'

```

:::

::: details 自定义应用 / `models.py`

详见 [模块 ( Model )](./model.md)

::: code-group

```shell [默认位置]
[自定义应用]
|- ...
|- models.py
```

```py [默认内容]
from django.db import models

# Create your models here.

```

:::

::: details 自定义应用 / `views.py`

详见 [视图 ( View )](./view.md)

::: code-group

```shell [默认位置]
[自定义应用]
|- ...
|- views.py
```

```py [默认内容]
from django.shortcuts import render

# Create your views here.

```

:::

::: details 自定义应用 / `tests.py`

详见 [单元测试](./tests.md)

::: code-group

```shell [默认位置]
[自定义应用]
|- ...
|- tests.py
```

```py [默认内容]
from django.test import TestCase

# Create your tests here.

```

:::

::: details `urls.py`

详见 [路由](./route.md)

::: code-group

```shell [默认位置]
[项目目录]
|- [主应用]
    |- urls.py
|- [自定义应用]
    |- ...
    |- urls.py
|- ...
```

```py [主路由默认内容]
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]
```

:::

## 注册应用

- <Badge>主应用</Badge> 不需要注册
- <Badge>自定义应用</Badge> 在创建后需要添加到项目配置文件的[`INSTALLED_APPS`](settings.md#installed-apps)字段

```py [默认]
INSTALLED_APPS = [                              // [!code focus]
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # 直接存放在项目根目录下的自定义应用
    "自定义应用名",                               // [!code focus]
    # 以包的形式存放在某个目录下的多个自定义应用
    "存放目录.自定义应用名.apps.自定义应用名Config", // [!code focus]
]                                              // [!code focus]
```
