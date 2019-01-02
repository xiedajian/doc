
[参考：](https://blog.csdn.net/qq_33404395/article/details/80788233)
[官网](https://dashboard.ngrok.com/get-started)


# 内网穿透

内网穿透想必开发过微信的同志都很了解，大部分人选择网上寻找各种现成的，比如ngrok官网、ittun-ngrok、sunny-ngrok或者花生壳之类的。

但是世界上没有免费的午餐，要不就是收费，要不就是免费但是偶尔会出现连接失败的问题（当然大多数时间是没有问题的）。


# ngrok服务器

ngrok 是一个反向代理，通过在公共端点和本地运行的 Web 服务器之间建立一个安全的通道，实现内网主机的服务可以暴露给外网。

ngrok 可捕获和分析所有通道上的流量，便于后期分析和重放，所以ngrok可以很方便地协助服务端程序测试。

简而言之就是将内网IP映射成对外可访问的域名

ngrok的使用并不复杂，主要步骤如下:

1. 进入ngrok官网（https://ngrok.com/），注册ngrok账号并下载ngrok； 

2. 根据官网给定的授权码，运行如下授权命令；

```
ngrok authtoken 授权码
```

授权码和账户是绑定的，在授权命令运行后，ngrok会将授权码保存在本地电脑 ~/.ngrok2/ngrok.yml 中，所以只需要运行一次，以后都可以使用。 


3. 根据需要，运行命令开发端口
 
```
ngrok http 8080
```

这条命令的意思是将本地8080端口对应的服务暴露到外网中。 

ngrok将随机十六进制名称分配给它为您打开的HTTP隧道。这对于一次性个人用途是可以的

但是，如果子域名称更改或难以阅读，则可能会令人沮丧，可以使用-subdomain 交换机指定自定义子域

```
ngrok http -subdomain=inconshreveable 80
```

显示如下：
```
ngrok by @inconshreveable

...
Forwarding                    http://inconshreveable.ngrok.io -> 127.0.0.1:80
Forwarding                    https://inconshreveable.ngrok.io -> 127.0.0.1:80
```
把域名自定义为 http://inconshreveable.ngrok.io 

当然了，自定义域名是收费的



4.其他 

每次启动ngrok都会分配一个新的外网域名，所以需要每次更换配置或者更换访问地址，不太方便。

当然，ngrok也提供了解决方法，那就是付费，可以设置固定域名。