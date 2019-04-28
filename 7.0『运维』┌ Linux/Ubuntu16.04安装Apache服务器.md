
虚拟主机参考文档：https://www.cnblogs.com/lishanlei/p/7978783.html


# Ubuntu 16.04 安装 LAMP 环境

更新 apt 源表 ：

$ apt-get update 

$ vim /etc/apt/source.list   // 查看源



# 安装apache 

 sudo apt-get install apache2


测试： 浏览器访问http://Ubuntu的IP，出现It Works!网页。

查看状态： service apache2 status/start/stop/restart

Web目录： /var/www/html

安装目录： /etc/apache2/

全局配置： /etc/apache2/apache2.conf

监听端口： /etc/apache2/ports.conf

虚拟主机： /etc/apache2/sites-availabel/000-default.conf




4.停止服务： 

sudo /etc/init.d/apache2 stop


5.开启服务：

sudo /etc/init.d/apache2 start

6.重启

sudo /etc/init.d/apache2 restart




# ubuntu 上的 apache 基本知识

在window下，Apache的配置文件是httpd.conf,但在Linux下安装了Apache后发现其配置并不像window下那么简单，Linux下Apache将各个设置项分在了不同的配置文件中

Ubuntu中Apache的配置文件是//etc/apache2/apache2.conf。Apache在启动时会找到这个文件并自动读取该文件中的配置信息，而其他配置文件则是通过include指令包含进来的，在apache2.conf 中可以看到这些引入行

在Ubuntu中Web文档的根目录是在/var/www中，怎么知道的呢？在/etc/apache2/sites-enabled/000-default中有这样一段内容

```
NameVirtualHost *
<VirtualHost *>
ServerAdmin webmaster@localhost
DocumentRoot /var/www/
```

这是设置虚拟机的，当然，如果觉得没有用的，也可以将apache2.conf里的Include /etc/apache2/sites-enabled/一行注释掉，并在htttpd.conf中的DocumentRoot设置成某个项目的目录，这样可以方便开发。



# 在/etc/apache2目录下，发现了sites-enabled目录，然而还有一个sites-available目录，那么这两个目录到底有什么作用呢？

其实，sites-available这个目录包含Apache虚拟主机的配置文件。虚拟主机允许Apache配置多个站点并为每个站点配置不同的参数。而sites-enabled目录的作用是持有/etc/apache2/sites-available目录下文件的链接。当Apache重启后，该目录中包含的站点将会被激活。如果apache上配置了多个虚拟机，每个虚拟机的配置文件都放在sites-available下，那么对于虚拟主机的停用，启动就是非常方便了，操作某个虚拟主机就不用动配置文件了

在/etc/apache2下还用类似于sites-enabled和sites-available两个目录的mods-available和mods-enabled两个目录，那么这两个目录有何作用呢？其实类似于sites-enabled和sites-available，mods-available这个目录包含模块和模块配置文件，不是所有的模块都有配置文件。比如当apt-get install php5安装了php模块，在这两个目录中就有了php5.load、php5.conf和指向这两个文件的链接。这对于apache开启停用某个模块是非常方便的

在/etc/apache2目录下，还有一个文件ports.conf，这个文件配置Apache监听的端口，如果觉得嫌弃它多余，可以先把apache2.conf中的Include /etc/apache2/ports.conf一行去掉，在httpd.conf里设置Apache端口。

在Ubuntu缺省安装的目录有与其他相比有一点不同。在ubuntu中module和 virtual host的配置都有两个目录，一个是available，一个是enabled，available目录是存放有效的内容，但不起作用，只有用ln 连到enabled过去才可以起作用。这样子对于开发以及调试都很方便。


# 虚拟主机

所谓虚拟主机，就是把一台运行在互联网上的服务器划分成多个“虚拟”的服务器，每一个虚拟主机都具有独立的域名和完整的Internet服务器（支持WWW、FTP、E-mail等）功能

再简单的说，就是同一台服务器可以同时处理超过一个域名(domain)。假设www.example1.com和www.example2.com两个域名都指向同一个服务器，

而web服务器又支持虚拟主机，那么www.example1.com和www.example2.com可以访问到同一服务器上不同的web空间

在Apache2中，有效的站点信息都存放在/etc/apache2/sites-available/用户名(文件) 里面

我们可以添加格式如下的信息来增加一个有效的虚拟空间，将/etc/apache2/sites-available/000-default.conf里的大部分东西拷贝过来就行了(比较老的ubuntu版本可能叫做default)，命名成自己想命的名字，记得改DocumentRoot作为默认目录，在Directory中设置路径，

*注意端口号不要与其他的虚拟主机重复*

```
<VirtualHost *自定义端口>
# 在ServerName后加上你的网站名称
ServerName www.linyupark.com
# 如果你想多个网站名称都取得相同的网站，可以加在ServerAlias后加上其他网站别名。
# 别名间以空格隔开。
ServerAlias ftp.linyupark.com mail.linyupark.com
# 在ServerAdmin后加上网站管理员的电邮地址，方便别人有问题是可以联络网站管理员。
ServerAdmin webmaster@linyupark.com
# 在DocumentRoot后加上存放网站内容的目录路径(用户的个人目录)
DocumentRoot /home/linyupark/public_html
<Directory /home/linyupark/public_html>
Options Indexes FollowSymLinks MultiViews
AllowOverride None
Order allow,deny
allow from all
</Directory>
ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
<Directory "/usr/lib/cgi-bin">
AllowOverride None
Options ExecCGI -MultiViews +SymLinksIfOwnerMatch
Allow from all
</Directory>
ErrorLog /home/linyupark/public_html/error.log
# Possible values include: debug, info, notice, warn, error, crit,
# alert, emerg.
LogLevel warn
CustomLog /home/linyupark/public_html/access.log combined
ServerSignature On
</VirtualHost>

```

如果你的服务器有多个IP，而不同的IP又有着不一样的虚拟用户的话，可以修改成:

```
<VirtualHost IP地址[:端口]>
    ...
</VirtualHost>　
```

一般情况下，我们只需要做两部操作：1，添加“ServerName www.example.com”, 2，修改“DocumentRoot  /var/www”为自己定义的目录。


## 启动虚拟主机配置

现在我们配置的内容只是有效虚拟主机，要是真正的发挥作用得放在/etc/apache2/sites-enabled 文件夹下面，需要通过ln建立关联：

```
$ sudo ln -s /etc/apache2/sites-available/example.conf  /etc/apache2/sites-enabled/example.conf　
```
修改/etc/hosts文件，加入当前主机的IP地址和需要设置的虚拟主机名，如：127.0.0.1 www.jiaoxue.com :

```
127.0.0.1       localhost
127.0.1.1       shanlei-Lenovo-ideapad-110-15ISK
127.0.0.1       www.jiaoxue.com
 
# The following lines are desirable for IPv6 capable hosts
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
~ 
```
检查语法没有错误，如果没有错误，重启Apache：

```
sudo /etc/init.d/apache2 restart
//或
service apache2 restart
```


# 配置Apache

安装完apache ， mysql ， php 之后需要配置apache

1. 项目根目录的更改可通过/etc/apache2/sites-available下的000-default.conf配置文件进行更改。



2. 打开配置文件：vim /etc/apache2/apache2.conf

添加：

AddType application/x-httpd-php .php .htm .html

AddDefaultCharset UTF-8


# 同一台服务器运行多站点

比如你有一台独立的Ubuntu虚拟机，配有一个外网的IP(45.46.47.48),并且注册了两个域名AAA.com和BBB.com，将这两个域名DNS解析到你虚机的IP地址。假设你已经安装好了Apache，一切都是默认的设置。

我们需要在这一个server上面，同时host AAA.com，BBB.com

### 第一步：修改hosts文件
在Ubuntu系统中，hosts文件目录为/etc/hosts,可以用vi编辑
sudo vi /etc/hosts
添加一下两行内容：
127.0.0.1 AAA.com
127.0.0.1 BBB.com


### 第二步：创建站点目录
默认一个站点，我们的站点目录为/var/www/html，这里我们分别为两个站点创建两个目录：
创建目录/var/www/html/AAA/, 并创建一个index.html文件，添加内容”Hello, site AAA”
然后，
创建目录/var/www/html/BBB/, 并创建一个index.html文件，添加内容”Hello, site BBB”


### 第三步：修改apache config文件
进入目录 /etc/apache2/sites-available/
可以看到有一个默认文件000-default.conf，我们可以直接将其作为A站点的config文件，它的内容如下：

```
<VirtualHost *:80>
        ServerName AAA.com
        ServerAlias www.AAA.com
        <Directory /var/www/html/AAA/>
            AllowOverride All
        </Directory>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/AAA
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

运行命令为BBB.com创建配置文件：
sudo cp 000-default.conf 001-default.conf
修改其内容如下：

```
<VirtualHost *:80>
        ServerName BBB.com
        ServerAlias www.BBB.com
        <Directory /var/www/html/BBB/>
            AllowOverride All
        </Directory>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/BBB
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```


### 第四步：启动站点

运行命令：
sudo a2ensite 000-default.conf
sudo a2ensite 000-default.conf
如果提示需要运行apache load，你可以按照提示运行命令。

###第五步：重启Apache service

运行命令：
sudo service apache2 restart

###第六步：验证
你可以在浏览器中分别输入AAA.com和BBB.com查看是否和index里面的内容一致。如果和预期一致，那么就完成了Apache多站点的配置了。








所谓虚拟主机，就是把一台运行在互联网上的服务器划分成多个“虚拟”的服务器，同一台服务器可以同时处理超过一个域名(domain)

在Apache2中，有效的站点信息都存放在/etc/apache2/sites-available/用户名(文件) 里面

1.首先在“/etc/hosts”文件中加入当前主机的IP地址和需要设置的虚拟主机名： 
如：192.168.20.141 www.alex.com 
2.在“/etc/apache2/sites-available”目录下有“000-default.conf” 
将000-default.conf 复制一份叫做 alex.conf 
3 进入alex.conf 
修改 ServerName 和 DocumentRoot 