# Django 相关

![](/images/django.webp)

## 简介

Django 是个基于 Python 的重型 Web 框架，采用了 MTV 设计模式

::: details MTV 设计模式：

<details class="details custom-block">
  <summary><code>M ( Model )</code> 数据模型</summary>

管理数据字符与类型

</details>

<details class="details custom-block">
  <summary><code>T ( Template )</code> 模版</summary>

要展示的 HTML 页面内容

</details>

<details class="details custom-block">
  <summary><code>V ( View )</code> 视图</summary>

对应访问路径所对应的处理逻辑

</details>

:::

## 安装

> 本文使用 Django 4.2.4 ( LTS 长期支持版本 )

```shell
pip install Django==4.2.4
```

::: details 建议在 [Python 虚拟环境](../python/index.md#虚拟环境) 中安装

```shell
% python --version
Python 3.10.0

% python -m venv .venv
% source .venv/bin/active

(.venv) % pip install Django==4.2.4 // [!code hl]
(.venv) % pip list
Package           Version
----------------- -------
pip               23.2.1
setuptools        57.4.0
asgiref           3.7.2 // [!code hl]
Django            4.2.4 // [!code hl]
sqlparse          0.4.4 // [!code hl]
typing_extensions 4.7.1 // [!code hl]
```

:::

::: details 查看下载到虚拟环境中的版本

```shell
(.venv) % python -m django --version // [!code hl]
4.2.4
```

::::

## 项目创建

> 推荐在 [Python 虚拟环境](../python/index.md#虚拟环境) 中创建项目

```shell
django-admin startproject 项目名 [项目所处目录名]
```

- 第二个参数`项目所处目录名`默认省略，命令执行后在当前路径下创建一个为`项目名`的项目目录，然后顺带创建了一个与`项目名`同名的主应用目录
- 第二个参数可通过传入`.`实现在当前现有目录下仅创建一个为`项目名`的主应用目录

::: code-group

```shell{2-6} [省略第二个参数]
|- 执行命令的目录
  |- 项目名
    |- 项目名
      |- __init__.py
      |- ...
    |- manage.py
```

```shell{2-5} [第二个参数为 .]
|- 执行命令的目录
  |- 项目名
    |- __init__.py
    |- ...
  |- manage.py
```

:::

::: details 例：在现有目录`xxx`下创建名为`django_app`的项目与同名主应用

> 创建时启用了虚拟环境

::: code-group

```shell [命令]
% cd xxx
% python -m venv .venv
% source .venv/bin/activate

django-admin startprojcet django_app // [!code hl]
```

```shell{3-7} [目录]
|- xxx
  |- .venv
  |- django_app
    |- django_app
      |- __init__.py
      |- ...
    |- manage.py
```

:::

::: details 例：将现有目录`xxx`作为项目目录，仅创建名为`django_app`的主应用

> 创建时启用了虚拟环境

::: code-group

```shell [命令]
% cd xxx
% python -m venv .venv
% source .venv/bin/activate

(.venv) % django-admin startproject django_app . // [!code hl]
```

```shell{3-6} [目录]
|- xxx
  |- .venv
  |- django_app
    |- __init__.py
    |- ...
  |- manage.py
```

:::

## 项目启动

```shell
python manage.py runserver [[IP:]端口]
```

服务器默认开启在本机`localhost:8000`端口，可通过第二个参数设置 IP 与端口号

::: details 例：将上文创建的名为`django_app`项目在默认端口启动

> 直接运行会有警告提示，有 18 个内置迁移文件没被应用同步到数据库

```shell
(.venv) % cd django_app
(.venv) % python manage.py runserver // [!code hl]

Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions. // [!code error]
Run 'python manage.py migrate' to apply them. // [!code error]
August 19, 2023 - 12:06:30
Django version 4.2.4, using settings 'django_app.settings'
Starting development server at http://127.0.0.1:8000/  // [!code hl]
Quit the server with CONTROL-C.
```

:::

::: details 例：项目开启为局域网中任何 IP 都能访问的`8001`端口

> 还需要在配置文件[`settings.py`](# settings-py)设置`ALLOWED_HOSTS = ['*']`
>
> 访问只能通过`127.0.0.1:8001`、`localhost:8001`、`本机IP:8001`

```shell
(.venv) % cd django_app
(.venv) % python manage.py runserver 0.0.0。0:8001 // [!code hl]
```

:::

## 项目目录

一般比较大的 Django 项目中包含一个主应用与多个自定应用，来划分功能实现模块化开发，详见 [Django 应用](./basics/application.md)

主应用多命名为`config`

::: code-group

```shell [目录]
|- 项目目录
  |- .venv
  |- 主应用 # 整个项目相关
  |- 自定义应用 # 某个功能相关
  |- 自定义应用 # 某个功能相关
  |- ...
  |- manage.py # 管理该项目的命令工具
```

```shell{3-8} [主应用]
|- 项目目录
  |- .venv
  |- 主应用
    |- __init__.py
    |- settings.py # 项目的配置文件
    |- urls.py # 项目的路由映射
    |- swgi.py # Python 服务网关接口 ( Python Web Server Gateway Interface ) 项目上线部署相关
    |- asgi.py # 定义 ASGI 接口信息用于启动异步通信处理高并发 ( Django3.0后新增 ) 项目上线部署相关
  |- 自定应用
  |- ...
  |- manage.py
```

```shell{4-15} [自定义应用]
|- 项目目录
  |- .venv
  |- 主应用
  |- 自定应用
    |- __init__.py
    |- migrations # 存放迁移文件，数据库比昂记录
      |- __init__.py
      |- ...
    |- templates # 存放 HTML 渲染模版
      |- ...
    |- admin.py # 后台管理系统相关
    |- apps.py # 该自定应用的配置
    |- models.py # 模型相关
    |- tests.py # 单元测试相关
    |- views.py # 视图函数相关
  |- ...
  |- manage.py
```

:::

---

### settings.py

用于定义项目设置项，位于项目主应用目录下

::: code-group

```shell [目录]
|- 项目
  |- 主应用
    |- __init__.py
    |- ...
    |- settings.py // [!code hl]
  |- 自定义应用
  |- manage.py
```

```python [默认 setting.py]
from pathlib import Path

# 项目根目录
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/


# 密钥 ( 加密解密时用 )
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-%jy0wl^htnvc-q_xkfgo69m4&j3d$)ocxpoh6zlx$*_iq)*7v^'


# 是否启用调试模式
# SECURITY WARNING: don't run with debug turned on in production!
# True：调试模式，开发模式
# False：非调试模式，线上模式
DEBUG = True


# 被允许的域名 ( 主机 )
# ['*']：匹配所有 IP 允许局域网中任何 IP 都能访问
ALLOWED_HOSTS = []


# 定义的应用
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # 创建的自定义应用在此处追加注册
    # '...'
]


# 中间件
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    # 创建的自定义中间件在此处追加注册
    # '...'
]


# 根路由路径
# '项目名.urls'
ROOT_URLCONF = 'django_app.urls'


# 模版
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# WSGI 相关
# '项目名.wsgi.application'
WSGI_APPLICATION = 'django_app.wsgi.application'


# 数据库相关，仅支持关系型数据库
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
# 默认使用 sqlite3
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# 密码验证相关
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# 国际化
# https://docs.djangoproject.com/en/4.2/topics/i18n/
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# 静态文件
# CSS, JavaScript, Images
# https://docs.djangoproject.com/en/4.2/howto/static-files/
STATIC_URL = 'static/'


# 默认主键类型
# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

```

:::

::: tip 常用设置项：

- `ALLOWED_HOSTS`：用于注册可访问的域名
- `INSTALLED_APPS`：用于注册项目中使用的应用
- `MIDDLEWARE`：用于注册项目中使用的中间件
- `TEMPLATES`：用于设置模版导入的路径
- `DATABASES`：用于设置数据库相关配置
- `STATIC_URL`：用于设置文件的路径

:::

---

### urls.py

用于定义可访问路径地址与各个应用的视图之间的映射关系

::: code-group

```shell [目录]
|- 项目
  |- 主应用
    |- __init__.py
    |- ...
    |- urls.py // [!code hl] # 主路由
  |- 自定义应用
  |- manage.py
```

```python [默认 urls.py]
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]

```

:::

---

### views.py

用于定义各个应用的视图，位于各个应用自身的目录下

::: code-group

```shell [目录]
|- 项目
  |- 主应用
  |- 自定义应用
    |- __init__.py
    |- ...
    |- views.py // [!code hl]
  |- manage.py
```

```python [默认 views.py]
from django.shortcuts import render

# Create your views here.
```

:::

## 后台管理页面

Django 有自带的管理页面，可对数据库进行增删改查

项目启动后默认访问地址为`localhost:8000/admin/`

::: details <Badge>STEP 1</Badge> 设置路由

Django 默认已经配置好管理页面的路由，不需手动创建

::: code-group

```python [urls.py]
from django.contrib import admin
from django.urls import path


urlpatterns = [
    path('admin/', admin.site.urls), // [!code hl]
]
```

:::

::: details <Badge>STEP 2</Badge> 注册模型

要通过管理页面管理的模型还需要在`admin.py`注册

注册的模型通过`__str__`方法声明在管理页面中该模型所对应的表中各个数据的展示名

::: code-group

```shell [目录]
|-
  |- 主应用
  |- 自定义应用
    |- __init__.py
    |- ...
    |- admin.py // [!code hl]
  |- manage.py
```

```python [admin.py]
from django.contrib import admin

from 应用中模型的路径 import 模型


admin.site.register(模型) // [!code hl]
admin.site.register(模型) // [!code hl]
```

```python [models.py]
from django.db import models


class UserModel(models.Model):
    # 定义字段
    # 定义字段


    def __str__(self):
        return f'{self.字段}'
```

:::

::: details <Badge>STEP 3</Badge> 创建超级用户

创建超级用户到数据库，访问管理页面通过该用户名 + 密码

```shell
python manage.py createsuperuser
# 或
./manage.py createsuperuser
```

::: code-group

```shell [创建过程]
(.venv) % ./manage.py createsuperuser // [!code hl]
Username (leave blank to use '电脑名'): 自定义超级用户名
Email address:
Password:
Password (again):
Superuser created successfully.
```

- 默认使用本机电脑名
- 邮箱可跳过
- 输入的密码不会显示

:::

::: details <Badge>STEP 4</Badge> 国际化

::: code-group

```python [settings.py]
# LANGUAGE_CODE = 'en-us'
LANGUAGE_CODE = 'zh-hans'
```

:::

> 例：向`admin.py`中注册`UserModel`模型，创建访问超级用户

::: code-group

```python [1. 注册模型]
from django.contrib import admin

from my_app.models import UserModel

admin.site.register(UserModel)
```

```python [2. 模型]
from django.db import models


class UserModel(models.Model):
    user_name = models.CharField(verbose_name="user name", max_length=20)
    user_age = models.IntegerField(verbose_name="user age", default=0)

    def __str__(self):
        return f'{self.user_name} - {self.user_age}'
```

```shell [3. 创建超级用户]
Username (leave blank to use 'xxxx'): admin
Email address:
Password:
Password (again):
The password is too similar to the username.
This password is too short. It must contain at least 8 characters.
This password is too common.
Bypass password validation and create user anyway? [y/N]: y
Superuser created successfully.
```

```shell [目录]
|- 项目目录
  |- 主应用
  |- django_app
    |- ...
    |- admin.py // [!code hl]
    |- models.py // [!code hl]
  |- manage.py
```
