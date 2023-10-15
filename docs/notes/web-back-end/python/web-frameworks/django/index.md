# Django 相关

![](/images/django.webp)

## 简介

Django 是个基于 Python 的重型 Web 框架

::: details Django 采用了 MTV 模式

- **M**odel:
- **T**emplate:
- **V**iew:

:::

## 安装

> 本文使用 Django 4.2 LTS 长期支持版本

建议安装在 [Python 虚拟环境](../../index.md#虚拟环境)

::: code-group

```shell [pip 安装]
# python -m venv .venv
# source .venv/bin/active
pip install Django==4.2     //[!code focus]
```

```shell [PDM 管理的项目中安装]
# python -m venv .venv
# source .venv/bin/active
pdm add Django==4.2         //[!code focus]
```

:::

```shell
# % source .venv/bin/active
python -m django --version  //[!code focus]
4.2                         //[!code focus]
```

## 项目创建

<Badge>方法一</Badge> 命令执行后会创建嵌套的同名目录，外层的根目录只是个容器，里层的同名目录包含该项目的相关配置文件 ( 主应用 )。一般会在项目创建后将里层同名目录改名为`config`

::: code-group

```shell [方法一 ( 项目初始化 )]
# % source .venv/bin/active
diango-admin startproject 项目名  //[!code focus]
cd 项目名
mv 项目名 新的自定义名
```

```shell [生成的目录结构]
[项目名]
    |- manage.py
    |- [项目名] # 可改为自定义名
        |- settings.py
        |- urls.py
        |- ...
```

:::

<Badge>方法二</Badge> 也可在现有的空目录下直接添加该项目的配置目录 ( 主应用 )。目录名一般为`config`

::: code-group

```shell [方法二 ( 现有目录下 )]
# % source .venv/bin/active
cd 现有项目目录                         //[!code focus]
diango-admin startproject 主应用名 .   //[!code focus]
```

```shell [生成的目录结构]
[项目名]
    |- manage.py
    |- [主应用名]
        |- settings.py
        |- urls.py
        |- ...
```

:::

## 项目目录

目录结构没有特别的约定，具体取决于开发团队

项目目录结构设计、应用中各个文件功能等 详见 [应用 ( Application )](./basics/application.md#应用目录)

::: code-group

```shell [默认目录结构]
[项目目录]
|- config
    |- __init__.py
    |- settings.py  # 项目配置
    |- urls.py      # 主路由
    |- asgi.py      # 异步、并发处理
    |- wsgi.py      # 服务器网关接口 ( Python Web Server Gateway Interface )
|- [自定义应用]
    |- migrations   # 模型迁移文件目录
    |- __init__.py
    |- models.py    # 模型
    |- views.py     # 视图
    |- test.py      # 单元测试
    |- admin.py     # Django 管理页面
    |- apps.py      # 应用信息
|- [自定义应用]
|- [自定义应用]
|- ...
|- manage.py
```

```shell [推荐目录结构]
[项目目录]
|- .venv
|- config                 # 主应用
    |- settings           # 项目配置
        |- __init__.py
        |- base.py
        |- development.py
        |- production.py
        |- ...
    |- urls.py            # 主路由
    |- asgi.py            # 异步、并发处理
    |- wsgi.py            # 服务器网关接口 ( Python Web Server Gateway Interface )
    |- ...
|- apps
    |- [自定义应用]
        |- migrations     # 模型迁移文件
            |- __init__.py
            |- ...
        |- models         # 模型
            |- __init__.py
            |- ...
        |- views          # 视图
            |- __init__.py
            |- ...
        |- tests          # 单元测试
            |- __init__.py
            |- ...
        |- __init__.py
        |- admin.py       # Django 管理页面
        |- apps.py        # 应用信息
        |- urls.py        # 子路由
    |- [自定义应用]
    |- [自定义应用]
    |- __init__.py
    |- ...
|- manage.py
|- ...
```

:::

## 项目启动

项目服务器默认开启在 8000 端口

:::code-group

```shell [默认端口]
python manage.py runserver
```

```shell [自定义IP与端口]
python manage.py runserver [IP地址:][端口]  // [!code focus]

python manage.py runserver 8080
python manage.py runserver 0.0.0.0:8000
```

:::

::: details 新项目初次启动时会报错数据未迁移

不影响服务器的正常开启，是因为 Django 默认的 Admin、Auth 等迁移文件未同步到数据库，只需要后期执行[`python manage.py migrate`](./basics/model.md#数据迁移)迁移数据即可

```shell
# source .venv/bin/active
% python manage.py runserver

Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.      // [!code error]
Run 'python manage.py migrate' to apply them.     // [!code error]
October 12, 2023 - 10:43:37
Django version 4.2, using settings 'config.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

:::

## Router

## View

## Model

## Template

## Static

## Admin

```

```
