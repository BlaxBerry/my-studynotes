---
prev: false
next: false
---

# Python 相关

![](/images/python.webp)

## 安装

> 本文为 Mac 环境下使用 [asdf](../../web-others/web-dev-tools/asdf/index.md)

```shell
# 1.
asdf plugin add python
# 2.
asdf install python 版本
# 3.
asdf global python 版本
# 4.
asdf reshim python
```

> 如下：本文使用 Python v3.10.0

```shell
% python --version
Python 3.10.0
```

## 解释器

> Python Interpreter

Python 环境需要指明版本对应的解释器

可通过`which python`获取当前工作目录所使用的 Python 版本的解释器位置

```shell [获取Python解释器位置]
% which python
# /Users/用户/.asdf/shims/python
# /Users/用户/工作区目录/.venv/bin/python
```

> VSCode 需要下载插件 Python、Pylance

一般 Python 都建议在运行在[虚拟环境](#虚拟环境)中，以防止安装的包污染到系统环境

## 虚拟环境

> Virtual Environments

虚拟环境用于隔离系统环境，一般将自虚拟环境命名为`.venv`

Python 工作区/项目都建议在运行在虚拟环境中，以防止安装的包污染到系统环境

::: code-group

```shell [工作区目录]
|- Python工作区
  |- .venv
  |- Python项目
    |- .venv
  |- Python项目
    |- .venv
```

:::

---

### venv

Python 自带虚拟环境工具，开箱即用无需另外下载

::: code-group

```shell [工作区/项目目录]
|- 工作区/项目目录
  |- .venv
  |- 项目目录/项目的包目录
  |- 项目目录/项目的包目录
  |- ...
```

```shell [.venv目录]
|- .venv
    |- bin
      |- activate
      |- ...
    |- include
    |- lib
      |- python版本
        |- site-package
          |- 下载在虚拟环境中的包
          |- ...
    |- pyvenv.cfg
```

```shell [.venv/pyvenv.cfg]
# 以 asdf 下载的 3.10.0 版本为例

home = /Users/用户/.asdf/installs/python/3.10.0/bin
include-system-site-packages = false
version = 3.10.0

```

:::

::: details 1. 创建

```shell
python -m venv 自定义虚拟环境名称
```

- 会基于系统当前的 Python 版本在执行命令的当前目录下创建仅适用于该目录的虚拟环境
- 一般将自虚拟环境命名为`.venv`

```shell
% cd 工作区目录
% python -m venv .venv
```

:::

::: details 2. 启用 ( 进入 )

```shell
% source 虚拟环境名称/bin/activate
(虚拟环境名称) %
(虚拟环境名称) %

```

- 在有虚拟环境目录的工作区命令执行会在当前终端启用 ( 进入 ) 虚拟环境
- 在当前终端窗口会以`(虚拟环境名称) %`展示
- 使用虚拟环境后 Python 解释器位置：

```shell
(虚拟环境名称) % which python
/Users/用户/路径/虚拟环境名称/bin/python
```

:::

::: details 3. 停止 ( 退出 )

```shell
(虚拟环境名称) % deactivate

% which python
/Users/用户/python解释器路径
# 比如：/Users/用户/.asdf/shims/python
```

- 在有虚拟环境目录的工作区命令执行会在当前终端停止 ( 退出 ) 虚拟环境
- 从虚拟环境退出前后 Python 解释器位置：

```shell
(虚拟环境名称) % which python
/Users/用户/路径/虚拟环境名称/bin/python
(虚拟环境名称) % deactivate
% which python
/Users/用户/python解释器路径
```

:::

> 如下： 以 asdf 下载的 3.10.0 版本的 Python

::: details 例子：开启虚拟环境 → pip 下载包 → 退出虚拟环境

```shell
# 创建并进入一个空工作区 & 查看系统 Python 所在
% mkdir my-python-demo
% cd my-python-demo
% which python
/Users/用户/.asdf/shims/python

# 创建虚拟环境 & 查看当前目录
% python -m venv .venv // [!code focus]
% ls -a
.       ..      .idea   .venv

# 启用虚拟环境 & 查看 Python 所在 & 下载并查看包 ( 例如 numpy )
% source .venv/bin/activate // [!code focus]
(.venv) % which python
/Users/用户/my-python-demo/.venv/bin/python
(.venv) % pip install numpy
(.venv) % pip list
Package    Version
---------- -------
numpy      1.25.2
pip        21.2.3
setuptools 57.4.0

# 停用虚拟环境 & 查看 Python 所在 & 查看下载的包
(.venv) % deactivate // [!code focus]
% which python
/Users/用户/.asdf/shims/python
% pip list
Package    Version
---------- -------
pip        21.2.3
setuptools 57.4.0
```

:::

---

### pyvenv <Badge type="warning" text="弃用"/>

Python 3.3、3.4 版本创建虚拟环境的推荐工具，3.6 以后弃用

## 程序执行

```shell
python 文件.py
```

## 代码格式化

::: details black

- 不妥协的严格的规范，不可自定义配置
- CI/CD 管道集成有官方预提交挂钩

```shell
source .venv/bin/active
pip install black // [!code focus]
```

:::code-group

```toml [pyproject.toml]
[tool.black]
line-length = 79 # 设置一行最大数字符数为 79
target-version = ["py39", "py310"]
include = '\.pyi?$'
exclude = '''
/(
    \.eggs
  | \.git
  | \.hg
  | \.mypy_cache
  | \.tox
  | \.venv
  | _build
  | buck-out
  | build
  | dist
  | migrations
)/
```

```json [.vscode/settings.json]
{
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.formatOnSave": true
  },
  "python.formatting.provider": "black",
  "black-formatter.args": [
    "--line-length=80" // 设置一行最大数字符数为 79
  ]
}
```

:::

::: details yapf

- 可自定义规则配置
- 不同团队的规范风格可能不一致，可能会造成混乱

```shell
source .venv/bin/active
pip install yapf // [!code focus]
```

:::

> 换行的底层逻辑实际是通过`\`进行代码换行

## 代码注释

Python 中有两种注释形式：

:::code-group

```py [1. 单行注释]
# 一行注释
# 一行注释

version = "0.1" # 一行注释
author = "BlaxBerry" # 一行注释
```

```py [2. 多行注释]
"""
第一个Python程序 - hello, world

Version: 0.1
Author: BlaxBerry
"""
```

:::

## 输入、输出

```py
data: str = input("请输入: ")
print(data)
```
