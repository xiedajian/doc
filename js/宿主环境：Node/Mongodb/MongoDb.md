

官网：https://www.mongodb.com/
手册：https://docs.mongodb.org/manual/



# MongoDb

在下载页面 https://www.mongodb.com/download-center?jmp=nav#community 选择不同的平台版本


以window为例：

下载完安装，一直点默认，默认安装在 C:\Program Files\MongoDB\Server

配置环境变量：

C:\Program Files\MongoDB\Server\4.0\bin 加入到系统的 path 环境变量中

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

$ db.user.find()                             # 查询所有记录 ， 第一个对象参数表示查询条件，第二个参数表示查询指定列
$ db.user.findOne()                             # 查询第1条数据
$ db.user.find({"name":"xiedajin"})         # 在user集合中查找 name为xiedajian的
$ db.user.find({"age":{$gt:20}})           # 在user集合中查找 age 大于20的数据
$ db.user.find({"age":{$lt:20}})           # 在user集合中查找 age 小于20的数据
$ db.user.find({"age":{$gte:20}})           # 在user集合中查找 age 大于等于 20的数据
$ db.user.find({"age":{$lte:20}})           # 在user集合中查找 age 小于等于 20的数据
$ db.user.find({"age":{$gte:20,$lte:25}})           # 在user集合中查找 age 大于等于 20 小于等于 25的数据
$ db.user.find({$or:[{"age":20},{"age":25}]})           # 在user集合中查找 age 等于 20 或者等于 25的数据
$ db.user.find({"name":/xie/})             # 模糊查询，name中包含 xie的数据  
$ db.user.find({"name":/^xie/})            # 模糊查询，name中以 xie 开头的数据  
$ db.user.find({},{name:1})             # 第一个参数为空表示查询条件为空， 第二个参数表示查询结果只有name列
$ db.user.find({"name":/^xie/},{"name":1})             # 第一个参数为查询name以xie开头的， 第二个参数表示查询结果只有name列

$ db.user.find().sort({"age":1})             # 排序 ，age:1 表示升序 ， age：-1表示降序
$ db.user.find().sort({"age":1}).limit(5)    # 取头5条, limit限制取的数量
$ db.user.find().sort({"age":1}).skip(2).limit(5)    # 从第3条开始查，查5条   skip表示跳过几条 ，用于分页
$ db.user.find().count()                 # 统计数量

$ db.user.update({"name":"xiedajian"},{$set:{"name":"xiedajin2"}})          # 修改所有匹配到的数据，注意写 $set，不写$set表示把整条完整替换，第一个参数为筛选条件，第二表示新的数据
$ db.user.remove({"name":"xiedajian"})                           # 删除所有匹配到的数据，第一个参数为筛选条件
$ db.user.remove({"name":"xiedajian"},{ justOne: true } ))       # 只删除匹配到的第一条

$ db.user.drop()            # 删除名为 user 的集合（表）
$ db.dropDatabase()         # 删除当前操作的数据库

```





# explain

explain

explain 是非常有用的工具，会帮助你获得查询方面诸多有用的信息。

只要对游标调用该方法，就可以得到查询细节。explain 会返回一个文档，而不是游标本身。

explain 会返回查询使用的索引情况，耗时和扫描文档数的统计信息




# 查询具体执行的时间

explain executionStats 查询具体的执行时间


```
$ db.user.find().explain( "executionStats" )
```

关注输出的如下数值：explain.executionStats.executionTimeMillis



