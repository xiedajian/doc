

官网：https://www.mongodb.com/
手册：https://docs.mongodb.org/manual/



# MongoDb

在下载页面 https://www.mongodb.com/download-center?jmp=nav#community 选择不同的平台版本


以window为例：

下载完安装，一直点默认，默认安装在 C:\Program Files\MongoDB\Server

配置环境变量：

C:\Program Files\MongoDB\Server\3.0\bin 加入到系统的 path 环境变量中

测试是否成功：

```
$ mongo
```



# 使用

1. 新建一个存放数据库的文件夹

*注意：不能有中文和空格，建议不要放在 C 盘*


2. 启动 MongoDb 服务 （默认端口 27017）

```
$ mongod --dbpath D:\mongodb
```

--dbpath 就是选择数据库文档所在的文件夹,即我们第一步创建的文件夹。

也就是说，mongoDB 中，真的有物理文件，对应一个个数据库。U 盘可以拷走。

*注意：一定要保持，开机这个 CMD 不能动了，不能关，不能 ctrl+c。 一旦这个 cmd 有问题了，数据库就自动关闭了*


3. 客户端链接mongo

客户端：mongo 使用数据库ip地址:端口号  

```
$ mongo 127.0.0.1:27017 

$ mongo (链接本地时可以省略) 
```


4. cmd常用命令

```
$ show dbs       # 查看所有的数据库
$ use icode      # 使用名为 icode 的数据库 / 或者是创建 icode数据库  
$ show collections          # 查看当前操作的数据库的集合（表）
 
$ db.user.insert({"name":"xiedajian","age":20})         # 向当前操作的数据库的user集合（表）插入一条数据
$ db.user.find()                    # 查询所有记录
$ db.user.find({"name":"xiedajin"})         # 在user集合中查找 name为xiedajian的
$ db.user.find({"age":{$gt:20}})           # 在user集合中查找 age 大于20的数据
$ db.user.find({"age":{$lt:20}})           # 在user集合中查找 age 小于20的数据
$ db.user.find({"age":{$gte:20}})           # 在user集合中查找 age 大于等于 20的数据
$ db.user.find({"age":{$lte:20}})           # 在user集合中查找 age 小于等于 20的数据
$ db.user.find({"age":{$gte:20,$lte:25}})           # 在user集合中查找 age 大于等于 20 小于等于 25的数据
$ db.user.find({"name":/xie/})             # 模糊查询，name中包含 xie的数据  
$ db.user.find({"name":/^xie/})            # 模糊查询，name中以 xie 开头的数据  

$ db.user.drop()            # 删除名为 user 的集合（表）
$ db.dropDatabase()         # 删除当前操作的数据库

```





