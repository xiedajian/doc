

1.在终端输入更新检查命令，sudo apt-get update



2. 在更新完成后（如果不想检查更新，也可直接输入此步）输入：
   

 sudo apt-get install apache2



3.完成后，在浏览器输入https://localhost 或者127.0.0.1，如果顺利跳出Apache版本网页，即代表安装成功



4.停止服务： 

sudo /etc/init.d/apache2 stop


5.开启服务：

sudo /etc/init.d/apache2 start

6.重启

sudo /etc/init.d/apache2 restart



- 测试： 浏览器访问http://Ubuntu的IP，出现It Works!网页。
- 
- 查看状态： service apache2 status/start/stop/restart
- 
- Web目录： /var/www
- 
- 安装目录： /etc/apache2/
- 
- 全局配置： /etc/apache2/apache2.conf
- 
- 监听端口： /etc/apache2/ports.conf
- 
- 虚拟主机： /etc/apache2/sites-enabled/000-default.conf



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