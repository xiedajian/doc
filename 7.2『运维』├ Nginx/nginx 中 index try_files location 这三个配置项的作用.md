
[参考](https://blog.csdn.net/xf552527/article/details/78720870)



1.index

我的理解是默认路径，也就是当找不到文件的时候的一个默认的路径，可以配置多个。

具体的用法稍后说，请先记住这个东西当你找不到其他合适的东西，默认给你分配的。


2.location

这个东西匹配你需要的路径

```
server {
        listen 80;
        server_name localhost;

        root html/;
        index index.html index.htm index.php;
        location / {
            try_files $uri $uri/ /index.php?$args;
            proxy_pass http://www.baidu.com;
        }
        location ~ \.(html|htm)$ {
            try_files $uri = 404;
        }


        location ~ \.php$ {
            try_files $uri = 404;
            include fastcgi.conf;
            fastcgi_pass 127.0.0.1:9000;
        }
    }
```

你可以匹配你需要的所有的uri


3.try_files

这个东西是重定向用的，我感觉和index 差不多，不过确实比index 要好用

举个例子：

访问：xf.com/aa

如果我们这么设置，对于这一句的理解是。

try_files $uri $uri/ /index.php?$args;

当nginx 收到你的xf.com/aa ，那么会匹配到 

```
location / {
            try_files $uri $uri/ /index.php?$args;
            proxy_pass http://www.baidu.com;
        }
```

这里多说一嘴，如果没有合适的匹配，那么就会找index的值。

index.html inde.htm index.php

当找到相对应的文件，就会把你的访问url变成。

回来我们再说  try_files

当匹配到这项的时候，就开始执行try_files

nginx 回去找有没有 aa这个文件（$uri） 如果没有

继续找aa这个目录（$uri/） 如果也没有的话就直接

重定向到   /index.php?$args    

$args 就是你的url 问号后边的参数


总结：

nginx 获取到url  

1.找server_name

2.找location匹配

如果没有找index默认的文件

如果没有直接404

有的话加上默认的index.* 重新寻找匹配的location

如果有进入执行try_files

3.查找try_files 是否有相应的文件

如果没有直接重定向最后一项
