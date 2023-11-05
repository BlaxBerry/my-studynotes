---
prev: false
next: false
---

# Gin 相关

![](/images/gin.webp)

## 简介

Gin 是个基于 Golang 的轻量级 Web 框架

运行速度非常快，擅长处理 API 接口的高并发

## 安装

> 本文使用 Gin v1.9.1

```shell
go get -u github.com/gin-gonic/gin
```

## 项目目录

:::code-group

```shell [推荐目录结构]
[项目]
|- cmd              # 项目主应用，入口文件 main 函数，不要冗余复杂
    |- [自定义名]
        |- main.go
|- internal         # 不公开的私有包
    |- app
        |- ...
    |- pkg          # 项目中的共享代码
        |- ...
|- pkg              # 对外公开的包
    |- [包名]
    |- [包名]
    |- ...
|- configs          # 配置
    |- ...
|- test             # 测试
    |- ...
|- scripts          # 构建、安装等脚本
    |- ...
|- Makefile         # 项目管理
|- ...
|- go.mod           # 记录项目中使用的依赖包名、版本号
|- go.sum           # 记录依赖包的校验信息
```

:::

## 例子

```go
package main

import (
    "fmt"
    "net/http"

    "github.com/gin-gonic/gin"
)

func main() {
    router := gin.Default()

    router.GET("/", index)                           // http://localhost:9888/
    router.GET("/index", index)                      // http://localhost:9888/index
    router.POST("/send-by-query", sendByQuery)       // http://localhost:9888/send-by-query?aa=值[&bb=值]
    router.POST("/send-by-formdata", sendByFormData) // http://localhost:9888/send-by-post

    // listen and serve on http://localhost:9888/
    if err := router.Run(":9888"); err != nil {
        fmt.Println("[Error] Gin server failed to start due to: " + err.Error())
    }
    fmt.Println("Gin server listen and serve on: http://localhost:9888/")
}

// Get
func index(c *gin.Context) {
    jsonData := gin.H{"message": "Index Page"}
    c.JSON(http.StatusOK, jsonData)
}

// Get query
func sendByQuery(c *gin.Context) {
    aa := c.Query("aa")
    bb := c.DefaultQuery("bb", "DEFAULT")

    jsonData := gin.H{
        "aa": aa,
        "bb": bb,
    }
    c.JSON(http.StatusOK, jsonData)
}

// POST formData
func sendByFormData(c *gin.Context) {
    aa := c.PostForm("aa")
    bb := c.PostForm("bb")

    jsonData := gin.H{
        "aa": aa,
        "bb": bb,
    }
    c.JSON(http.StatusOK, jsonData)
}
```
