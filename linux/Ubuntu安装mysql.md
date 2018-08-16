# 安装mqsql

```
sudo apt-get install mysql-server
```

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


# 启动和关闭mysql服务器：

service mysql start
service mysql stop 

重启命令
```
/etc/init.d/mysql restart
```

确认是否启动成功：
sudo netstat -tap | grep mysql 

进入mysql shell界面：
mysql -u root -p








