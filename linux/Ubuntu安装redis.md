
参考：http://blog.csdn.net/qq_30242609/article/details/52913145

# Ubuntu16.04安装Redis

Redis是常用基于内存的Key-Value数据库，比Memcache更先进，支持多种数据结构，高效，快速。用Redis可以很轻松解决高并发的数据访问问题；作为实时监控信号处理也非常不错


# 安装Redis服务器端

```
sudo apt-get update
sudo apt-get install redis-server
```
安装完成后，Redis服务器会自动启动，我们检查Redis服务器程序

# 检查Redis服务器系统进程

```
~ ps -aux|grep redis
redis     4162  0.1  0.0  10676  1420 ?        Ss   23:24   0:00 /usr/bin/redis-server /etc/redis/redis.conf
conan     4172  0.0  0.0  11064   924 pts/0    S+   23:26   0:00 grep --color=auto redis
```

# 通过启动命令检查Redis服务器状态

```
~ netstat -nlt|grep 6379
tcp        0      0 127.0.0.1:6379          0.0.0.0:*               LISTEN
```

# 通过启动命令检查Redis服务器状态

```
~$ sudo /etc/init.d/redis-server status
● redis-server.service - Advanced key-value store
   Loaded: loaded (/lib/systemd/system/redis-server.service; enabled; vendor preset: enabled)
   Active: active (running) since 四 2017-11-09 12:22:09 CST; 59s ago
     Docs: http://redis.io/documentation,
           man:redis-server(1)
 Main PID: 5394 (redis-server)
   CGroup: /system.slice/redis-server.service
           └─5394 /usr/bin/redis-server 127.0.0.1:6379

11月 09 12:22:09 zzf systemd[1]: Starting Advanced key-value store...
11月 09 12:22:09 zzf run-parts[5388]: run-parts: executing /etc/redis/redi...le
11月 09 12:22:09 zzf run-parts[5395]: run-parts: executing /etc/redis/redi...le
11月 09 12:22:09 zzf systemd[1]: Started Advanced key-value store.
Hint: Some lines were ellipsized, use -l to show in full.
```


# 通过命令行客户端访问Redis

安装Redis服务器，会自动地一起安装Redis命令行客户端程序。

在本机输入redis-cli命令就可以启动，客户端程序访问Redis服务器。

```
~ redis-cli
redis 127.0.0.1:6379>

# 命令行的帮助

redis 127.0.0.1:6379> help
redis-cli 2.2.12
Type: "help @" to get a list of commands in 
      "help " for help on 
      "help " to get a list of possible help topics
      "quit" to exit


# 查看所有的key列表

redis 127.0.0.1:6379> keys *
(empty list or set)
```

# 基本的Redis客户端命令操作

增加一条记录key1

```
redis 127.0.0.1:6379> set key1 "hello"
OK

# 打印记录
redis 127.0.0.1:6379> get key1
"hello"
```

增加一条数字记录

```
set key2 1
OK

# 让数字自增
redis 127.0.0.1:6379> INCR key2
(integer) 2
redis 127.0.0.1:6379> INCR key2
(integer) 3

# 打印记录
redis 127.0.0.1:6379> get key2
"3"
```

增加一个列表记录key3

```
redis 127.0.0.1:6379> LPUSH key3 a
(integer) 1

# 从左边插入列表
redis 127.0.0.1:6379> LPUSH key3 b
(integer) 2

# 从右边插入列表
redis 127.0.0.1:6379> RPUSH key3 c
(integer) 3

# 打印列表记录，按从左到右的顺序
redis 127.0.0.1:6379> LRANGE key3 0 3
1) "b"
2) "a"
3) "c"
```

增加一个哈希记表录key4
```
redis 127.0.0.1:6379> HSET key4 name "John Smith"
(integer) 1

# 在哈希表中插入，email的Key和Value的值
redis 127.0.0.1:6379> HSET key4 email "abc@gmail.com"
(integer) 1

# 打印哈希表中，name为key的值
redis 127.0.0.1:6379> HGET key4 name
"John Smith"

# 打印整个哈希表
redis 127.0.0.1:6379> HGETALL key4
1) "name"
2) "John Smith"
3) "email"
4) "abc@gmail.com"
```

删除记录
```
# 查看所有的key列表
redis 127.0.0.1:6379> keys *
1) "key2"
2) "key3"
3) "key4"
4) "key5"
5) "key1"

# 删除key1,key5
redis 127.0.0.1:6379> del key1
(integer) 1
redis 127.0.0.1:6379> del key5
(integer) 1

# 查看所有的key列表
redis 127.0.0.1:6379> keys *
1) "key2"
2) "key3"
3) "key4"
```


# 修改Redis的配置

## 使用Redis的访问账号

默认情况下，访问Redis服务器是不需要密码的，为了增加安全性我们需要设置Redis服务器的访问密码。设置访问密码为redisredis。

用vi打开Redis服务器的配置文件redis.conf

```
~ sudo vi /etc/redis/redis.conf

#取消注释requirepass
requirepass redisredis
```

## 让Redis服务器被远程访问

默认情况下，Redis服务器不允许远程访问，只允许本机访问，所以我们需要设置打开远程访问的功能。

用vi打开Redis服务器的配置文件redis.conf

```
~ sudo vi /etc/redis/redis.conf

#注释bind
#bind 127.0.0.1
```

修改后，重启Redis服务器。
```
~ sudo /etc/init.d/redis-server restart
Stopping redis-server: redis-server.
Starting redis-server: redis-server.
```

未使用密码登陆Redis服务器
```
~ redis-cli

redis 127.0.0.1:6379> keys *
(error) ERR operation not permitted
```

发现可以登陆，但无法执行命令了。

登陆Redis服务器，输入密码

```
~  redis-cli -a redisredis

redis 127.0.0.1:6379> keys *
1) "key2"
2) "key3"
3) "key4"
```
登陆后，一切正常。

我们检查Redis的网络监听端口

检查Redis服务器占用端口

```
~ netstat -nlt|grep 6379
tcp        0      0 0.0.0.0:6379            0.0.0.0:*               LISTEN
```

我们看到网络监听从之前的 127.0.0.1:3306 变成 0 0.0.0.0:3306，表示Redis已经允许远程登陆访问。

我们在远程的另一台Linux访问Redis服务器

```
~ redis-cli -a redisredis -h 192.168.1.199

redis 192.168.1.199:6379> keys *
1) "key2"
2) "key3"
3) "key4"
```
远程访问正常。通过上面的操作，我们就把Redis数据库服务器，在Linux Ubuntu中的系统安装完成





