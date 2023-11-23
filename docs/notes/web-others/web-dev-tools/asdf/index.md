---
prev: false
next: false
---

# asdf 相关

![](https://willsena.dev/content/images/2022/11/asdf.jpg)

## 简介

asdf 是个多版本自动管理工具，可在同一台机器上同时安装管理多个版本的语言运行时环境，通过下载对应扩展插件来替代以往分别安装 NVM、pyenv、RVM 等工具的版本管理方式

## 安装

> 本文为 Mac 环境

::: code-group

```shell [Homebrew + .zshrc]
# 1. Homebrew 下载
brew install asdf

# 2. .zshrc 追加配置
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ${ZDOTDIR:-~}/.zshrc
```

:::

## 常用流程

---

### 下载

1. [下载对应插件](#asdf-plugin-add-plugin)
2. [下载指定版本](#asdf-install-name-version)

::: details 例子：

> 下载 v14.8.0 版本的 Node.js

```shell
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf install nodejs 14.18.0
```

:::

---

### 指定/切换

1. [全局版本](#asdf-global-name-version)/[局部版本](#asdf-local-name-version)
2. [更新指向](#asdf-reshim-name)

::: details 例子：

> 切换全局环境下的 Node.js 为 18.18.0 版

```shell
asdf global nodejs 14.18.0
asdf reshim nodejs
```

:::

## 版本管理

### .tool-versions

`.tool-versions`是 asdf 用于记载当前目录范围内所用语言・环境的版本的文本文件

若目录中没有该文件则默认为本机全局环境下的语言・环境的版本

:::code-group

```shell [文件位置]
目录
 |- .tool-versions
 |- ...
```

```shell [文件内容]
[语言环境] [版本]
[语言环境] [版本]
```

:::

::: details 如下：查看 Mac 全局环境使用的版本

> 分别为 Node.js 14.17.0、Ruby 3.0.1、 Python 3.9.5

::: code-group

```shell [查看命令]
open ~/.tool-version
```

```txt [文本内容]
nodejs 14.17.0
ruby 3.0.1
python 3.9.5
```

:::

## 常用命令

---

### asdf plugin add \<plugin>

从社区仓库安装一个指定语言・环境的对应插件

```shell
asd plugin add [插件名]
```

::: details 例子：

::: code-group

```shell [常用语言・环境插件]
# Node.js
asdf plugin add nodejs
# Ruby
asdf plugin add ruby
# Python
asdf plugin add python
# Golang
asdf plugin add golang
```

:::

插件详见 [asdf community](https://github.com/orgs/asdf-community/repositories)

---

### asdf plugin list

列出所有已安装的插件

```shell
asdf plugin list
```

::: details 例子：

> 如下：本机安装了 Node.js、Python、Ruby 三种语言・环境

```shell
% asdf plugin list
nodejs
python
ruby
```

:::

---

### asdf plugin update

升级所有已安装的插件

```shell
asdf plugin update --all
```

升级某一个已安装的插件

```shell
asdf plugin update 插件名
```

---

### asdf list all \<name>

列出指定语言・环境的所有可通过 asdf 下载的版本

::: details 例子：

```shell
% asdf list all golang
1
1.2.2
1.3
# ... 省略
1.20.6
1.20.7
```

:::

---

### asdf install \<name> \<version>

下载指定版本的语言・环境

可下载的版本可通过[`asdf list all <name>`](#asdf-list-all-name)查看

```shell
asdf install [语言・环境] [版本]
```

::: details 例子：

> 下载 v1.18 版本的 Go

```shell
asdf install golang 1.18
```

:::

::: warning

如果不指定版本就是下载全部版本

:::

---

### asdf list

列出本机所有已安装的语言・环境的全部版本

```shell
asdf list
```

::: details 例子：

> 除了 Go 只下载了插件没下载任何版本以外，其余 Node.js、Python、Ruby 都展示了本机上已经所有下载的版本

```shell
% asdf list
golang
  No versions installed
nodejs
  14.18.1
  16.15.0
python
  3.10.0
  3.10.5
ruby
  2.6.6
  3.1.2
```

:::

---

### asdf current

显示所有语言・环境当前的版本

```shell
asdf current
```

::: details 例子：

> 除了 Go 没有指定全局版本外，其余 Node.js、Python、Ruby 都展示了当前全局使用的版本

```shell
% asdf current
golang          ______          No version is set. Run "asdf <global|shell|local> golang <version>"
nodejs          16.15.0         /Users/chen/.tool-versions
python          3.10.0          /Users/chen/.tool-versions
ruby            3.1.2           /Users/chen/.tool-versions

```

:::

---

### asdf global \<name> \<version>

指定 / 切换本机全局环境使用的版本

```shell
asdf global [语言・环境] [版本]
```

::: details 例子：

> 指定 Go 在本机全局环境下使用 v1.18 版本

```shell
asdf global golang 1.18
asdf reshim golang
```

:::

::: warning

指定完后要通过[`asdf reshim`](#asdf-reshim-name)更新和重新连接可执行文件，否则系统可能仍然使用切换前的旧版本

:::

---

### asdf local \<name> \<version>

指定 / 切换项目局部环境使用的版本

```shell
asdf local [语言・环境] [版本]
```

::: details 例子：

> 指定 Go 在某项目局部环境下使用 v1.18 版本

```shell
cd [项目目录]
asdf local golang 1.18
asdf reshim golang
```

:::

::: warning

指定完后要通过[`asdf reshim`](#asdf-reshim-name)更新和重新连接可执行文件，否则系统可能仍然使用切换前的旧版本

:::

---

### asdf reshim \<name>

重新建立插件的符号链接

可理解为更新并重新连接已安装插件的可执行文件

```shell
asdf reshim [语言・环境名]
```

::: warning

在安装一个新版本插件或更改已安装插件的环境配置时，需要运行`asdf reshim`命令来更新环境变量，使得系统可以找到并使用正确版本的可执行文件，否则在切换或安装新版本后系统可能仍然使用旧版本的插件

:::
