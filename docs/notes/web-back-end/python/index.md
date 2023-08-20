# Python 相关

![](/images/python.webp)

## 安装

> 本文为 Mac 环境下使用 [asdf](../../dev-tools/asdf/index.md)

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

## 虚拟环境

虚拟环境可以将 Python 项目与系统隔离

在虚拟环境中安装的包及其版本仅适用于该虚拟环境内

---

### venv

Python 自带无需下载，开箱即用

::: details 1. 创建

基于系统当前的 Python 版本在执行命令的当前目录下创建仅适用于该目录的虚拟环境

```shell
python -m venv 自定义虚拟环境名称
```

- 一般将自虚拟环境命名为`.venv`

- 命令执行后会在当前目录下自动生成虚拟环境目录

```shell
% cd 工作区目录
% python -m venv .venv
```

::: code-group

```shell{3-7} [目录]
|- 工作区
  |- ...
  |- .venv
    |- bin
    |- include
    |- lib
    |- pyvenv.cfg
```

```shell [.env/bin]
|- .venv
  |- bin
    |- activate
    |- ...
```

```shell [.env/lib]
|- lib
  |- python版本
    |- site-package
      |- ... # 下载在虚拟环境中的包
```

```shell [.env/pyvenv.cfg]
# 以 asdf 下载的 3.10.0 版本为例
home = /Users/用户/.asdf/installs/python/3.10.0/bin
include-system-site-packages = false
version = 3.10.0

```

:::

::: details 2. 启用 ( 进入 )

```shell
% source 虚拟环境名称/bin/activate

(虚拟环境名称) % which python
/Users/用户/路径/虚拟环境名称/bin/python
```

- 在有虚拟环境目录的工作区命令执行会在当前终端启用 ( 进入 ) 虚拟环境
- 在当前终端窗口会以`(虚拟环境名称) %`展示

:::

::: details 3. 停止 ( 退出 )

```shell
(虚拟环境名称) % deactivate

% which python
/Users/用户/下载路径
# 比如：/Users/用户/.asdf/shims/python
```

- 在有虚拟环境目录的工作区命令执行会在当前终端停止 ( 退出 ) 虚拟环境

:::

> 如下：

```shell
# 进入一个空工作区 & 查看系统 Python 版本
% mkdir my-python-demo
% cd my-python-demo
% which python
/Users/用户/.asdf/shims/python

# 创建虚拟环境 & 查看当前目录
% python -m venv .venv // [!code hl]
% ls -a
.       ..      .idea   .venv

# 启用虚拟环境 & 查看 Python 所在 & 下载并查看包 ( 例如 numpy )
% source .venv/bin/activate // [!code hl]
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
(.venv) % deactivate // [!code hl]
% which python
/Users/用户/.asdf/shims/python
% pip list
Package    Version
---------- -------
pip        21.2.3
setuptools 57.4.0
```

::: code-group

:::

---

### pyvenv <Badge type="warning" text="Python 3.6 弃用"/>

Python 3.3 与 v3.4 版本创建虚拟环境的推荐工具，3.6 以后弃用
