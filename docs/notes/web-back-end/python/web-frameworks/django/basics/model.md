# Django 模型 ( Model )

https://di-acc2.com/programming/python/1694/

https://www.bilibili.com/video/BV1fh4y1Z7jp/?p=13&spm_id_from=pageDriver&vd_source=8960252a3845b76b699282b11f36ab5c

## 简介

模型 <===> 数据库中的表

模型中的类的属性 <===> 数据库的表

模型中的类的对象 <===> 数据库的一条数据

## 位置

初始默认为各个自定义应用目录下的`models.py`文件

但一般建议将细分模块并以一个包的形式定义

::: code-group

```shell [默认位置]
[自定义应用]        // [!code focus]
|- __init__.py
|- models.py      // [!code focus]
|- ...
```

```shell [推荐位置]
[自定义应用]              // [!code focus]
|- __init__.py
|- models               // [!code focus]
    |- __init__.py      // [!code focus]
    |- ...              // [!code focus]
|- ...
```

:::

## 创建

## 数据迁移

### 生成迁移文件

```shell
python manage.py makemigrations
```

命令执行后会根据自定义应用中的模型，将迁移文件创建在每个自定义应用目录的`migrations`迁移文件目录下，`migrations`目录在创建自定义应用时会自动生成

---

### 执行迁移数据

根据生成的迁移文件将模型映射到数据库

```shell
python manage.py migrate
```
