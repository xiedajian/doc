

# Ubuntu 16.04 安装 LAMP 环境

更新 apt 源表 ：

$ apt-get update 

$ vim /etc/apt/source.list   // 查看源




# 安装mqsql

```
sudo apt-get install mysql-server
```

上述命令会：

apt-get将查看所有可用的mysql-server软件包，并确定MySQL提供的软件包是最新和最佳的候选软件。

然后，它将计算软件包依赖关系，并要求您批准安装。 键入y然后ENTER 。 该软件将安装。 系统将要求您在安装的配置阶段设置root密码。 一定要选择一个安全的密码，输入两次，过程就会完成。

上述命令会安装以下包： 
apparmor 
mysql-client-5.7 
mysql-common 
mysql-server 
mysql-server-5.7 
mysql-server-core-5.7 
因此无需再安装mysql-client等。


安装过程会提示设置mysql root用户的密码，设置完成后等待自动安装即可。

默认安装完成就启动了mysql。



# 常用命令：

开启：   $ service mysql start
停止：   $ service mysql stop 
重启：   $ /etc/init.d/mysql restart


确认是否启动成功：
```
sudo netstat -tap | grep mysql 
```

进入mysql shell界面：

```
mysql -u root -p
```

查看状态：service mysql status/start/stop/retart

查看监听端口的情况：netstat -tunpl 或 netstat -tap







