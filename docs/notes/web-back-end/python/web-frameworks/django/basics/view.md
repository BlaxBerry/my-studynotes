# Django 视图 ( View )

## 简介

::: tip 应用分为两类：

- **[类视图](#类视图)**( Class-Based View )：用 Class 类定义
- **[函数视图](#函数视图)**( View Function ) ：用函数定义

:::

## 位置

初始默认为各个自定义应用目录下的`views.py`文件

但一般建议将细分视图并以一个包的形式定义

::: code-group

```shell [默认位置]
[自定义应用]        // [!code focus]
|- __init__.py
|- views.py       // [!code focus]
|- ...
```

```shell [推荐位置]
[自定义应用]              // [!code focus]
|- __init__.py
|- views               // [!code focus]
    |- __init__.py      // [!code focus]
    |- ...              // [!code focus]
|- ...
```

:::

## 类视图

Class-Based Views

https://di-acc2.com/programming/python/5210/

通过继承 generic view 创建视图类

更符合 Django 的设计思想

| 常用视图基类         |                                                 |     使用页面例     |
| -------------------- | ----------------------------------------------- | :----------------: |
| **[View]()**         | get()、post()など HTTP メソッドに特化したビュー |      画面全般      |
| **[TemplateView]()** | 读取模版文件、生成页面                          |      画面全般      |
| **[ListView]()**     | 连接数据库，生成一组数据                        |      一覧画面      |
| **[DetailView]()**   | 连接数据库，生成某一特定数据                    |      詳細画面      |
| **[CreateView]()**   | 连接数据库，添加数据                            | 新規登録・追加画面 |
| **[UpdateView]()**   | 连接数据库，更新某一特定数据                    |      編集画面      |
| **[DeleteView]()**   | 连接数据库，删除某一特定数据                    |      削除画面      |
| **[FormView]()**     | 表单功能                                        |     問い合わせ     |
| **[LoginView]()**    | 登陆功能                                        |      ログイン      |
| **[APIView]()**      | 使用如 Django Rest framework 外部 API 构建时    |         –          |

## 函数视图

View Function
