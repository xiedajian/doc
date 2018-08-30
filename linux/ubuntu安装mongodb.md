

参考文档：https://blog.csdn.net/xsj_blog/article/details/71106133?locationNum=7&fps=1
官方文档：https://docs.mongodb.com/master/tutorial/install-mongodb-on-ubuntu/?_ga=2.157663545.222669535.1493745656-724007558.1488558955



# Ubuntu 16.04 安装 MongoDB



# mongodb

依次执行下面命令

```

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4


#下面命令针对ubuntu16.04版本，在其他ubuntu版本系统请查看MongoDB官网
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

sudo apt-get update

sudo apt-get install -y mongodb-org
```

测试是否成功：

```
$ mongo -version        # 查看MongoDB版本
```


# 启动，重启，停止服务

先指定数据库的地址：

```
monod -dbpath /var/lib/mongodb   # 数据库的地址默认是/var/lib/mongodb 
```

```
sudo service mongod start       # 启动
sudo service mongod stop        # 关闭
sudo service mongod restart     # 重启
```

## 查看服务是否启动成功

```
sudo cat /var/log/mongodb/mongod.log
```

在 mongod.log 日志中若出现如下信息，说明启动成功

```
[initandlisten] waiting for connections on port 27017
```


```
$ ps aux | grep mongod   # 查看守护进程mongod的运行状态

mongodb   18454  9.5  1.5 292152 61952 ?        Ssl  12:27   0:00 /usr/bin/mongod --quiet --config /etc/mongod.conf
hupeng    18475  0.0  0.0  15964   936 pts/4    R+   12:27   0:00 grep --color=auto mongod
```
 

# 配置文件

配置文件mongod.conf所在路径: 

```
/etc/mongod.conf
```

内容：
```
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /var/lib/mongodb   #数据库存储路径
  journal:
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:


# where to write logging data.
systemLog:
  destination: file
  logAppend: true     #以追加的方式写入日志
  path: /var/log/mongodb/mongod.log   #日志文件路径

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1   #绑定监听的ip 127.0.0.1只能监听本地的连接，可以改为0.0.0.0


#processManagement:

#security:

#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:

```







# 卸载

```
sudo apt-get purge mongodb-org* 

```

移除数据库和日志文件（数据库和日志文件的路径取决于/etc/mongod.conf文件中的配置)

```
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb

```



# 使用

shell命令模式 

输入mongo进入shell命令模式，默认连接的数据库是test数据库，命令如下：

```
$ mongo
```

常用操作命令：

```
show dbs：显示数据库列表 
show collections：显示当前数据库中的集合（类似关系数据库中的表table） 
show users：显示所有用户 
use yourDB：切换当前数据库至yourDB 
db.help() ：显示数据库操作命令 
db.yourCollection.help() ：显示集合操作命令，yourCollection是集合名

```




# 坑

1. 执行 mongo 命令时报错：

MongoDB shell version v4.0.2
connecting to: mongodb://127.0.0.1:27017
2018-08-29T23:14:36.004+0800 E QUERY    [js] Error: couldn't connect to server 1    27.0.0.1:27017, connection attempt failed: SocketException: Error connecting to     127.0.0.1:27017 :: caused by :: Connection refused :
connect@src/mongo/shell/mongo.js:257:13
@(connect):1:6

原因： 没有指定数据库的目录

解决方法：
先执行  

```
monod -dbpath /var/lib/mongodb
```

2. 远程连接服务器上的mongodb数据库时失败

原因：mongodb的配置文件中的bind_ip 默认为127.0.0.1，默认只有本机可以连接。  此时，需要将bind_ip配置为0.0.0.0，表示接受任何IP的连接。

解决
 
```
vim /etc/mongod.conf
```

i 进入编辑模式，修改 net 下的 bindIp : 0.0.0.0 
esc 退出编辑模式，shift ：  输入 wq 回车保存

重启服务

```
service mongod restart
```

3. 远程连接服务器上的mongodb数据库时失败

想要远程连接，除了修改bind_ip为 127.0.0.1 ，还需要

防火墙开放27017端口

命令：

```
iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 27017 -j ACCEPT
```

如果是阿里云服务器，还需要在阿里云服务器的安全组规则中 - 入方向 - 允许访问端口27017/27017,授权对象 0.0.0.0/0
