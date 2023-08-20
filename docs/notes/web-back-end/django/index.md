# Django 相关

![](/images/django.webp)

## 介绍

Django 是个基于 Python 的 Web 框架 ( 重型框架 )

采用了 MTV 设计模式

::: tip MTV 设计模式

- M ( Model )：数据模型
- T ( Template )：模版
- V ( View )：视图处理函数 / 类

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

(.venv) % pip install Django==4.2.4
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
(.venv) % python -m django --version
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

```shell [省略第二个参数]
|- 执行命令的目录
  |- 项目名 // [!code hl]
    |- 项目名 // [!code hl]
      |- ... // [!code hl]
    |- manage.py // [!code hl]
```

```shell [第二个参数为 .]
|- 执行命令的目录
  |- 项目名 // [!code hl]
    |- ... // [!code hl]
  |- manage.py // [!code hl]
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

```shell [目录]
|- xxx
  |- .venv
  |- django_app // [!code hl]
    |- django_app // [!code hl]
      |- ... // [!code hl]
    |- manage.py // [!code hl]
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

```shell [目录]
|- xxx
  |- .venv
  |- django_app // [!code hl]
    |- ... // [!code hl]
  |- manage.py // [!code hl]
```

:::

## 项目启动

```shell
python manage.py runserver [IP:端口]
```

服务器默认开启在本机`localhost:8000`端口

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
Starting development server at http://127.0.0.1:8000/
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

Django 项目中包含一个主应用与多个自定应用 [详见应用](#应用-applications)

```shell
|- 项目目录
  |- .venv
  |- 主应用 # 整个项目相关
  |- 自定义应用 # 某个功能相关
  |- 自定义应用 # 某个功能相关
  |- ...
  |- manage.py # 管理该项目的命令工具
```

::: code-group

```shell [主应用]
|- 项目目录
  |- .venv
  |- 主应用
    |- __init__.py # 告知 Python 该目录为一个包
    |- settings.py # 项目的配置文件
    |- urls.py # 项目的路由映射
    |- swgi.py # Python 服务网关接口 ( Python Web Server Gateway Interface ) 项目上线部署相关
    |- asgi.py # 定义 ASGI 接口信息用于启动异步通信处理高并发 ( Django3.0后新增 ) 项目上线部署相关
  |- 自定应用
  |- ...
  |- manage.py
```

```shell [自定义应用]
|- 项目目录
  |- .venv
  |- 主应用
  |- 自定应用
    |- __init__.py # 告知 Python 该目录为一个包
    |- migrations # 迁移文件夹，数据库相关
      |- __init__.py # 告知 Python 该目录为一个包
      |- ...
    |- admin.py # 后台管理系统相关
    |- apps.py # 该自定应用的配置
    |- models.py # 模型相关
    |- test.py # 单元测试相关
    |- views.py # 视图函数相关
  |- ...
  |- manage.py
```

:::

---

### settings.py

文件位于项目主应用目录下，包含常用设置项：

- `ALLOWED_HOSTS`：用于注册可访问的域名
- `INSTALLED_APPS`：用于注册项目中使用的应用
- `MIDDLEWARE`：用于注册项目中使用的中间件
- `TEMPLATES`：用于设置模版导入的路径
- `DATABASES`：用于设置数据库相关配置
- `STATIC_URL`：用于设置文件的路径

::: details 例：项目新创建项目的默认`settings.py`

```python
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

## 应用 ( Applications )

Django 项目中一般有多个应用分别处理不同功能，可视为模块化开发中的模块

对于小项目来说自动生成的主应用足够，中大型项目中业务可按需分别放入不同应用

::: tip 主应用：
包含当前该 Django 项目相关的内容，在通过[`django-admin startproject`](#项目创建)创建项目时自动创建
:::

::: tip 自定义应用：
包含项目中各个业务功能相关内容，需通过[`python manage.py startapp`](#应用创建)自行创建
:::

---

### 应用创建

在创建项目时会顺带创建一个主应用，若想创建其他自定义应用则需在项目目录下执行下文命令

```shell
python manage.py startapp 应用名
# 或
django-admin startapp 应用名
```

命令执行后会在项目目录下创建一个为`应用名`的目录 [详见项目目录](#项目目录)

::: details 例：在名为`django_app`的项目下创建名为`main`的主应用与`aaa`、`bbb`的两个自定义应用

::: code-group

```shell [命令]
(.venv) % cd django_app
(.venv) % django-admin startproject main .
(.venv) % python manage.py startapp aaa
(.venv) % python manage.py startapp bbb
```

```shell [目录]
|- django_app
  |- main
  |- aaa
  |- bbb
  |- manage.py
```

```python [配置文件]
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'aaa', // [!code hl]
    'bbb', // [!code hl]
]

```

:::

---

### 应用注册

应用创建后需要注册否则无法使用，即手动追加到配置文件[`settings.py`](# settings-py)的`INSTALLED_APPS`

::: code-group

```python [settings.py]
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # 除主应用外的自定义应用需在此注册
]
```

:::

## 数据迁移 （ Migrations ）

将模型自动映射到数据库的表

---

### 生成迁移文件

```shell
python manage.py makemigrations
```

每个自定义应用默认都有迁移文件夹`migrations`来存放迁移文件

```shell
|- 项目
  |- 自定义应用
    |- migrations
      |- __init__.py
      |- ...
```

::: details 例：创建 Django 项目后执行命令生成迁移文件

会提示没有变化，Django 项目默认自带 18 个 迁移文件

```shell
(.venv) % django-admin startproject django_app
(.venv) % python manage.py makemigrations // [!code hl]
No changes detected
```

:::

---

### 执行迁移

```shell
python manage.py migrate
```

将生成的迁移文件同步到数据库

::: details 例：创建 Django 项目后执行命令生迁移到默认数据库

Django 项目默认使用 sqlite3，详见配置文件[`settings.py`](# settings-py)

命令执行后会在项目目录下生成名为`db.sqlite3`的 Sqlite3 数据库文件

::: code-group

```shell [命令]
(.venv) % django-admin startproject django_app
(.venv) % python manage.py migrate // [!code hl]
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying auth.0012_alter_user_first_name_max_length... OK
  Applying sessions.0001_initial... OK
```

```python [数据库配置]
DATABASE = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

```shell [目录]
|- 项目名
  |- 主应用
    |- ...
  |- ...
  |- db.sqlite3 // [!code hl]
  |- manage.py
```

:::

<br/>

https://www.bilibili.com/video/BV1fh4y1Z7jp/?p=9&spm_id_from=pageDriver&vd_source=8960252a3845b76b699282b11f36ab5c
