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

::: details 例子：

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

    err := router.Run(":9888") // listen and serve on http://localhost:9888/
    if err != nil {
        fmt.Println("[Error] Gin server failed to start due to: " + err.Error())
    }
    fmt.Println("Gin server listen and serve on: http://localhost:9888/")
}

func index(c *gin.Context) {
    jsonData := gin.H{"message": "Index Page"}
    c.JSON(http.StatusOK, jsonData)
}

func sendByQuery(c *gin.Context) {
    aa := c.Query("aa")
    bb := c.DefaultQuery("bb", "DEFAULT")

    jsonData := gin.H{
        "aa": aa,
        "bb": bb,
    }
    c.JSON(http.StatusOK, jsonData)
}

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

:::
