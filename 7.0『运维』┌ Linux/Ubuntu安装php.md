



# Ubuntu 16.04 安装 LAMP 环境

更新 apt 源表 ：

$ apt-get update 

$ vim /etc/apt/source.list   // 查看源




# 安装php

```
sudo apt-get install php7.0
sudo apt-get install libapache2-mod-php7.0      # 配置APACHE+PHP7的
sudo apt-get install libapache2-mod-php         # 应该是配置APACHE+PHP5的，一块装吧

```

重启 apache2:

sudo /etc/init.d/apache2 restart


测试安装：php7.0 -v