[参考](https://www.cnblogs.com/yupeng/p/3472748.html)
[参考](https://blog.csdn.net/tujiaw/article/details/58238352)



1.安装nodejs，之前就安装了。

2.安装nginx

nginx安装完成之后，配置文件一般在这些目录中/usr/local/nginx/conf, /etc/nginx, or /usr/local/etc/nginx.


假设我的域名是api.xiaohongquan.com 我想把它代理到http://127.0.0.1:7001，接下来修改对应域名的nginx config文件
```
upstream nodejs {
    server 127.0.0.1:7001;
    keepalive 64;
}

server {
    listen 80;
    server_name api.xiaohongquan.com;
    
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host  $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
        proxy_pass      http://nodejs;

    }

}
```