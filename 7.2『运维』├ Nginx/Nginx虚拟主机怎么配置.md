


# Nginx虚拟主机怎么配置?

1、基于域名的虚拟主机，通过域名来区分虚拟主机——应用：外部网站

2、基于端口的虚拟主机，通过端口来区分虚拟主机——应用：公司内部网站，外部网站的管理后台

3、基于ip的虚拟主机。


基于虚拟主机配置域名
需要建立/data/www /data/bbs目录，windows本地hosts添加虚拟机ip地址对应的域名解析；对应域名网站目录下新增index.html文件；

```
# 当客户端访问www.lijie.com,监听端口号为80,直接跳转到data/www目录下文件
server {
    listen       80;
    server_name  www.lijie.com;
    location / {
        root   data/www;
        index  index.html index.htm;
    }
}

# 当客户端访问www.lijie.com,监听端口号为80,直接跳转到data/bbs目录下文件
 server {
    listen       80;
    server_name  bbs.lijie.com;
    location / {
        root   data/bbs;
        index  index.html index.htm;
    }
}
```


基于端口的虚拟主机
使用端口来区分，浏览器使用域名或ip地址:端口号 访问
```
# 当客户端访问www.lijie.com,监听端口号为8080,直接跳转到data/www目录下文件
 server {
    listen       8080;
    server_name  8080.lijie.com;
    location / {
        root   data/www;
        index  index.html index.htm;
    }
}

# 当客户端访问www.lijie.com,监听端口号为80直接跳转到真实ip服务器地址 127.0.0.1:8080
server {
    listen       80;
    server_name  www.lijie.com;
    location / {
         proxy_pass http://127.0.0.1:8080;
        index  index.html index.htm;
    }
}
```