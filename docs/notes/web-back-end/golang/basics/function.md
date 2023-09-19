# Golang 函数

https://www.bilibili.com/video/BV1tP4y1v7kW?p=57&spm_id_from=pageDriver&vd_source=8960252a3845b76b699282b11f36ab5c

函数名采用驼峰命名法

大写字母开头的函数可被其他包访问，小写字母开头的函数仅限当前包内使用

```go
func 函数名(行参列表) (返回值类型列表)  {
	// ...
	return 返回值列表
}
```
