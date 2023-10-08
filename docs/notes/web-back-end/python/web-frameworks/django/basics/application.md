# Django 应用

## 简介

Django 中的应用 ( Application ) 可视为模块化开发中的模块

一般中大型项目会有多个应用分别处理不同业务功能，每个应用都可以有独自的数据库表结构、视图函数、渲染模版等内容

::: details 主应用：

- 在通过[`django-admin startproject`](../index.md#项目创建)创建项目时自动创建
- 包含当前该 Django 项目配置相关的内容，故多命名为`config`

```shell
django-admin startproject config .
```

:::

::: details 自定义应用：

- 需自行通过[`python manage.py startapp`](#应用创建)创建
- 不是必须，用于模块化处理中大型项目中复杂独立的功能
- 包含 MTV 相关的目录

```shell
django-admin startapp 自定义应用 .
```

:::

::: code-group

```shell{3-8} [主应用]
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

```shell{4-15} [自定义应用]
|- 项目目录
  |- .venv
  |- 主应用
  |- 自定应用
    |- __init__.py # 告知 Python 该目录为一个包
    |- migrations # 迁移文件夹
      |- __init__.py # 告知 Python 该目录为一个包
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

## 应用创建

在创建项目时会自动创建一个主应用

其他自定义应用则需在项目目录下执行下文命令来创建

命令执行后会在项目目录下创建一个为`应用名`的目录 详见 [Django 项目目录](../index.md#项目目录)

::: code-group

```shell [命令]
python manage.py startapp 应用名
# 或
django-admin startapp 应用名
```

```shell [目录]
|- 项目目录
  |- .venv
  |- 主应用
  |- 应用名
    |- __init__.py // [!code hl]
    |- ... // [!code hl]
  |- ...
  |- manage.py
```

:::

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
    # ...

    'aaa', // [!code hl]
    'bbb', // [!code hl]
]

```

:::

## 应用注册

应用创建后需要注册，否则无法使用

手动追加到主应用的配置文件[`settings.py`](../index.md#settings-py)中的`INSTALLED_APPS`

::: code-group

```python [settings.py]
INSTALLED_APPS = [
    # ...

    "自定义应用",
    "自定义应用"
]
```

:::
