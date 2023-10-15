# Golang 包管理

### GOPATH <Badge type="warning">弃用</Badge>

> Golang 旧版本约定的项目存放位置

所有项目与包都存放于环境变量`GOPATH`工作目录下

```shell
|- [GOPATH]
    |- bin # 存放编译后生成的二进制可执行文件
    |- pkg # 存放编译后的中间文件
    |- src # 存放项目源码
        |- GO项目
        |- GO项目
        |- ...
```

::: code-group

```shell [GOPATH]
% go env GOPATH
/Users/用户/.asdf/installs/golang/1.18/packages
```

:::

---

### Go Modules

> Golang 新版本默认的项目存放位置与依赖包管理方式

不再依靠`GOPATH`目录，可在任何目录下创建项目

通过`go mod`相关命令管理项目与其依赖包

```shell
|- [任意位置]
    |- GO项目
        |- 自定义功能包
            |- 细分的功能.go
            |- 细分的功能.go
            |- ...
        |- ...
        |- main.go
        |- go.mod
        |- go.sum
```

Golang 新版本的环境变量`GO111MODULE`默认没有值

::: code-group

```shell [GO111MODULE]
% go env GO111MODULE
""
```

:::
