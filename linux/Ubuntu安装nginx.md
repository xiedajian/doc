
nginx配置参考文章：https://www.cnblogs.com/fengff/p/8892590.html

# Ubuntu 16.04 安装 nginx


在Ubuntu下安装Nginx有以下方法，但是如果想要安装最新版本的就必须下载源码包编译安装。


# nginx

Nginx功能丰富，可作为HTTP服务器，也可作为反向代理服务器，邮件服务器。支持FastCGI、SSL、Virtual Host、URL Rewrite、Gzip等功能。并且支持很多第三方的模块扩展。

1、Http代理，反向代理：作为web服务器最常用的功能之一，尤其是反向代理。

2、负载均衡

3、web缓存



# 基于APT源安装

sudo apt-get install nginx

安装好的文件位置：

```
/usr/sbin/nginx：主程序

/etc/nginx：存放配置文件

/etc/nginx/nginx.conf   配置文件

/usr/share/nginx：存放静态文件

/var/log/nginx：存放日志
```

其实从上面的根目录文件夹可以知道，Linux系统的配置文件一般放在/etc，日志一般放在/var/log，运行的程序一般放在/usr/sbin或者/usr/bin


使用sudo service nginx {start|stop|restart|reload|force-reload|status|configtest|rotate|upgrade}的命令启动


# nginx 目录

通过 apt 安装完nginx后，它为我们提供了一个基本的结构，帮助我们迅速设置好配置文件。

所有的nginx配置文件都在 /etc/nginx下

你需要添加新配置选项的地方位于 sites-enabled 文件夹。如果你打开这个文件夹，你会发现一个名为 default 的txt文档，打开后你就会找到nginx的配置选项以及 “welcome to nginx"欢迎选项的代码。

接下来我们开始建立属于我们自己的配置文件用于显示一个页面。在sites-enabled目录下新建一个空白文件并命名为 test,用你自己喜欢的文本编辑器进行编辑。

*新增站点*
> 注意： 在该目录下会发现一个 /etc/nginx/sites-available 的文件夹。这个文件夹一般在你需要建立和管理多个站点的时候非常有用，可以帮助你更好的组织不同的项目。你需要在这里添加你的nginx配置文案并将他们链接至 sites-enabled 目录下。命令如下：

```
ln -s /etc/nginx/sites-available/dotcom /etc/nginx/sites-enabled/dotcom
```

只有在 sites-enabled 目录下的配置文件才能够真正被用户访问。但是你同样可以将文件放在 sites-available 目录下用来存档或者生成链接。



# Nginx配置文件结构

```
main              #全局配置

events {         #events工作模式配置
   ...
}

http      #http块
{
    ...   #http全局块
    server        #server服务器主机配置
    { 
        ...       #server全局块
        location [PATTERN]   #location路由配置
        {
            ...
        }
        location [PATTERN] 
        {
            ...
        }
    }
    server
    {
      ...
    }
    
    upstream name {                    # 负载均衡配置
        ....
    }
}

```

1、main：用于进行nginx全局信息的配置。一般有运行nginx服务器的用户组，nginx进程pid存放路径，日志存放路径，配置文件引入，允许生成worker process数等。

2、events块：用于nginx工作模式的配置.配置影响nginx服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。

3、http块：可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type定义，日志自定义，是否使用sendfile传输文件，连接超时时间，单连接请求数等。

4、server块：配置虚拟主机的相关参数，一个http中可以有多个server。

5、location块：配置请求的路由，以及各种页面的处理情况。

6、upstream：用于进行负载均衡的配置

下面给大家上一个配置文件，作为理解

```

########### 每个指令必须有分号结束。#################
#user administrator administrators;  #配置用户或者组，默认为nobody nobody。
#worker_processes 2;  #允许生成的进程数，默认为1
#pid /nginx/pid/nginx.pid;   #指定nginx进程运行文件存放地址
error_log log/error.log debug;  #制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
events {
    accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
    multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
    #use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connections  1024;    #最大连接数，默认为512
}
http {
    include       mime.types;   #文件扩展名与文件类型映射表
    default_type  application/octet-stream; #默认文件类型，默认为text/plain
    #access_log off; #取消服务日志    
    log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义格式
    access_log log/access.log myFormat;  #combined为日志格式的默认值
    sendfile on;   #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    keepalive_timeout 65;  #连接超时时间，默认为75s，可以在http，server，location块。

    upstream mysvr {   
      server 127.0.0.1:7878;
      server 192.168.10.121:3333 backup;  #热备
    }
    error_page 404 https://www.baidu.com; #错误页
    server {
        keepalive_requests 120; #单连接请求上限次数。
        listen       4545;   #监听端口
        server_name  127.0.0.1;   #监听地址       
        location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
           #root path;  #根目录
           #index vv.txt;  #设置默认页
           proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表
           deny 127.0.0.1;  #拒绝的ip
           allow 172.18.5.54; #允许的ip           
        } 
    }
}
```
上面是nginx的基本配置，需要注意的有以下几点：

1、1.$remote_addr 与$http_x_forwarded_for 用以记录客户端的ip地址； 2.$remote_user ：用来记录客户端用户名称； 3.$time_local ： 用来记录访问时间与时区；4.$request ： 用来记录请求的url与http协议；

  5.$status ： 用来记录请求状态；成功是200， 6.$body_bytes_s ent ：记录发送给客户端文件主体内容大小；7.$http_referer ：用来记录从那个页面链接访问过来的； 8.$http_user_agent ：记录客户端浏览器的相关信息；

2、惊群现象：一个网路连接到来，多个睡眠的进程被同事叫醒，但只有一个进程能获得链接，这样会影响系统性能。

3、每个指令必须有分号结束。



# main全局模块

```
# user nobody nobody;
worker_processes 2;
# error_log logs/error.log
# error_log logs/error.log notice
# error_log logs/error.log info
# pid logs/nginx.pid
worker_rlimit_nofile 1024;
```
上述配置都是存放在main全局配置模块中的配置项

user用来指定nginx worker进程运行用户以及用户组，默认nobody账号运行
worker_processes指定nginx要开启的子进程数量，运行过程中监控每个进程消耗内存(一般几M~几十M不等)根据实际情况进行调整，通常数量是CPU内核数量的整数倍
error_log定义错误日志文件的位置及输出级别【debug / info / notice / warn / error / crit】
pid用来指定进程id的存储文件的位置
worker_rlimit_nofile用于指定一个进程可以打开最多文件数量的描述


# event 模块

```
event {
    worker_connections 1024;
    multi_accept on;
    use epoll;
}
```

上述配置是针对nginx服务器的工作模式的一些操作配置

worker_connections 指定最大可以同时接收的连接数量，这里一定要注意，最大连接数量是和worker processes共同决定的。
multi_accept 配置指定nginx在收到一个新连接通知后尽可能多的接受更多的连接
use epoll 配置指定了线程轮询的方法，如果是linux2.6+，使用epoll，如果是BSD如Mac请使用Kqueue



# http模块

作为web服务器，http模块是nginx最核心的一个模块，配置项也是比较多的，项目中会设置到很多的实际业务场景，需要根据硬件信息进行适当的配置，常规情况下，使用默认配置即可！

```
http {
    ##
    # 基础配置
    ##

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    # server_tokens off;

    # server_names_hash_bucket_size 64;
    # server_name_in_redirect off;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    ##
    # SSL证书配置
    ##

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
    ssl_prefer_server_ciphers on;

    ##
    # 日志配置
    ##

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    ##
    # Gzip 压缩配置
    ##

    gzip on;
    gzip_disable "msie6";

    # gzip_vary on;
    # gzip_proxied any;
    # gzip_comp_level 6;
    # gzip_buffers 16 8k;
    # gzip_http_version 1.1;
    # gzip_types text/plain text/css application/json application/javascript
 text/xml application/xml application/xml+rss text/javascript;

    ##
    # 虚拟主机配置
    ##

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
```

1) 基础配置

```
sendfile on：配置on让sendfile发挥作用，将文件的回写过程交给数据缓冲去去完成，而不是放在应用中完成，这样的话在性能提升有有好处
tc_nopush on：让nginx在一个数据包中发送所有的头文件，而不是一个一个单独发
tcp_nodelay on：让nginx不要缓存数据，而是一段一段发送，如果数据的传输有实时性的要求的话可以配置它，发送完一小段数据就立刻能得到返回值，但是不要滥用哦

keepalive_timeout 10：给客户端分配连接超时时间，服务器会在这个时间过后关闭连接。一般设置时间较短，可以让nginx工作持续性更好
client_header_timeout 10：设置请求头的超时时间
client_body_timeout 10:设置请求体的超时时间
send_timeout 10：指定客户端响应超时时间，如果客户端两次操作间隔超过这个时间，服务器就会关闭这个链接

limit_conn_zone $binary_remote_addr zone=addr:5m ：设置用于保存各种key的共享内存的参数，
limit_conn addr 100: 给定的key设置最大连接数

server_tokens：虽然不会让nginx执行速度更快，但是可以在错误页面关闭nginx版本提示，对于网站安全性的提升有好处哦
include /etc/nginx/mime.types：指定在当前文件中包含另一个文件的指令
default_type application/octet-stream：指定默认处理的文件类型可以是二进制
type_hash_max_size 2048：混淆数据，影响三列冲突率，值越大消耗内存越多，散列key冲突率会降低，检索速度更快；值越小key，占用内存较少，冲突率越高，检索速度变慢
```
2) 日志配置
```
access_log logs/access.log：设置存储访问记录的日志
error_log logs/error.log：设置存储记录错误发生的日志
```

3) SSL证书加密
```
ssl_protocols：指令用于启动特定的加密协议，nginx在1.1.13和1.0.12版本后默认是ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2，TLSv1.1与TLSv1.2要确保OpenSSL >= 1.0.1 ，SSLv3 现在还有很多地方在用但有不少被攻击的漏洞。
ssl prefer server ciphers：设置协商加密算法时，优先使用我们服务端的加密套件，而不是客户端浏览器的加密套件
```
4) 压缩配置
```
gzip 是告诉nginx采用gzip压缩的形式发送数据。这将会减少我们发送的数据量。
gzip_disable 为指定的客户端禁用gzip功能。我们设置成IE6或者更低版本以使我们的方案能够广泛兼容。
gzip_static 告诉nginx在压缩资源之前，先查找是否有预先gzip处理过的资源。这要求你预先压缩你的文件（在这个例子中被注释掉了），从而允许你使用最高压缩比，这样nginx就不用再压缩这些文件了（想要更详尽的gzip_static的信息，请点击这里）。
gzip_proxied 允许或者禁止压缩基于请求和响应的响应流。我们设置为any，意味着将会压缩所有的请求。
gzip_min_length 设置对数据启用压缩的最少字节数。如果一个请求小于1000字节，我们最好不要压缩它，因为压缩这些小的数据会降低处理此请求的所有进程的速度。
gzip_comp_level 设置数据的压缩等级。这个等级可以是1-9之间的任意数值，9是最慢但是压缩比最大的。我们设置为4，这是一个比较折中的设置。
gzip_type 设置需要压缩的数据格式。上面例子中已经有一些了，你也可以再添加更多的格式。
```
5) 文件缓存配置
```
open_file_cache 打开缓存的同时也指定了缓存最大数目，以及缓存的时间。我们可以设置一个相对高的最大时间，这样我们可以在它们不活动超过20秒后清除掉。
open_file_cache_valid 在open_file_cache中指定检测正确信息的间隔时间。
open_file_cache_min_uses 定义了open_file_cache中指令参数不活动时间期间里最小的文件数。
open_file_cache_errors 指定了当搜索一个文件时是否缓存错误信息，也包括再次给配置中添加文件。我们也包括了服务器模块，这些是在不同文件中定义的。如果你的服务器模块不在这些位置，你就得修改这一行来指定正确的位置。

```

# server 模块

rever模块配置是http模块中的一个子模块，用来定义一个虚拟访问主机，也就是一个虚拟服务器的配置信息

sites-available / sites-enabled 下面配置http服务器多站点

```
server {
    listen        80;
    server_name localhost    192.168.1.100;
    root        /nginx/www;
    index        index.php index.html index.html;
    charset        utf-8;
    access_log    logs/access.log;
    error_log    logs/error.log;
    ......
}
```

核心配置信息如下：

server：一个虚拟主机的配置，一个http中可以配置多个server

server_name：用力啊指定ip地址或者域名，多个配置之间用空格分隔

root：表示整个server虚拟主机内的根目录，所有当前主机中web项目的根目录

index：用户访问web网站时的全局首页

charset：用于设置www/路径中配置的网页的默认编码格式

access_log：用于指定该虚拟主机服务器中的访问记录日志存放路径

error_log：用于指定该虚拟主机服务器中访问错误日志的存放路径




### 最顶层是 server ,代码为：

```
server {

}
```

### listen

声明服务器监听的端口号。SSL在443端口。互联网的默认端口是80

```
server {
    listen 80;    
}
```

### server_name

server_name主要用来匹配url地址。

任意请求通过nginx时，它会查看url并寻找 server_name 片段。如果你的站点地址为 http://xvfeng.me, 那么你的 server_name 应当也为 xvfeng.me . 如果你在域名解析时使用了A记录并通过服务器指向 http://snargles.com , 你可以添加另外一个 server 代码，将 server_name 指向 snargles.com, 这段代码就会匹配来自于这个域名的请求。

这个特性非常强大。这意味着你可以在单个nginx配置文件里托管无数个站点，甚至包括不同域名的网站。

你需要做的只是将设置A记录并指向虚拟机所在的IP, 之后设置其他的nginx服务器配置。

针对 server_name 还有两点值得关注。

首先是你可以设置子域名。如果你想匹配http://test.example.com ,设置相当简单，甚至还可以指向一个完全不同的应用。

第二点，你可以使用通配符, 即 * 或者正则来匹配路由。这个功能绝对强大。

下面我们简单的配置一下server_name到example.com .

```
server {
    listen 80;
    server_name example.com;
}
```

### root

这个是托管静态站点最关键的部分。如果你只是想用它来托管一些html和css文件，root部分要定义的就是这些文件存放的路径。

我喜欢把文件放在 /var/www 目录下，因此我们在这里建立一个文件夹。使用 mkdir 创建 /var/www/example 目录,建立一个空白的 index.html 文件，随便添加一些段落输出hello world之类的内容。代码如下：

```
server {
    listen 80;
    server_name example.com;
    root /var/www/example;
}
```
基本变量设置完毕，下一步配置路由。


### location

Location接受两个参数，一个字符串或者正则和一段代码。字符串或者正则用于匹配某个特定目录。

如果你想让用户在访问 example.com/whaterver 时访问某个特定页面，你需要将 whatever 设置为uri地址

在这里我们只需要访问root目录，因此只需要加上 / 即可，内容暂时为空，下面再做解释。

```
server {
    listen 80;
    server_name example.com;
    root /var/www/example;

    location / {

    }
}
```



# location模块

location模块是nginx配置中出现最多的一个配置，主要用于配置路由访问信息

在路由访问信息配置中关联到反向代理、负载均衡等等各项功能，所以location模块也是一个非常重要的配置模块

基本配置

```
location / {
    root    /nginx/www;
    index    index.php index.html index.htm;
}
```

location /：表示匹配访问根目录

root：用于指定访问根目录时，访问虚拟主机的web目录

index：在不指定访问具体资源时，默认展示的资源文件列表

*反向代理配置方式*

通过反向代理代理服务器访问模式，通过proxy_set配置让客户端访问透明化

```
location / {
    proxy_pass http://localhost:8888;
    proxy_set_header X-real-ip $remote_addr;
    proxy_set_header Host $http_host;
}
```

uwsgi配置

wsgi模式下的服务器配置访问方式

```
location / {
    include uwsgi_params;
    uwsgi_pass localhost:8888
}
```


# upstream模块

upstream模块主要负责负载均衡的配置，通过默认的轮询调度方式来分发请求到后端服务器

简单的配置方式如下

```
upstream name {
    ip_hash;
    server 192.168.1.100:8000;
    server 192.168.1.100:8001 down;
    server 192.168.1.100:8002 max_fails=3;
    server 192.168.1.100:8003 fail_timeout=20s;
    server 192.168.1.100:8004 max_fails=3 fail_timeout=20s;
}

```

核心配置信息如下

ip_hash：指定请求调度算法，默认是weight权重轮询调度，可以指定

server host:port：分发服务器的列表配置

-- down：表示该主机暂停服务

-- max_fails：表示失败最大次数，超过失败最大次数暂停服务

-- fail_timeout：表示如果请求受理失败，暂停指定的时间之后重新发起请求





# 采坑
启动nginx时就报错
Job for nginx.service failed because the control process exited with error code. See "systemctl status nginx.service" and "journalctl -xe" for details.


一切的一切在你修改/etc/nginx/conf.d/default.conf文件的那一刻，都已注定：你修改的语句末尾少了分号;

加上分号，:wq保存，运行systemctl restart nginx.service

整个世界又重归美好


