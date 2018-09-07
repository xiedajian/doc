

文档：http://mongodb.github.io/node-mongodb-native/3.1/


## 在node 中链接 mongodb

用 nodejs 来操作数据库 mongodb，需要MongoDB Node.JS驱动程序

1.安装驱动程序包：

```
npm install mongodb --save-dev 
```

2. 启动 mongodb 服务

```
$ mongod --dbpath  D:\mongodb       (D:\mongodb是在创建数据库时指定的目录)

```

3. 连接到MongoDB

添加代码以连接到服务器和数据库myproject：

```
// 数据库引用
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// 数据库连接的地址
const url = 'mongodb://localhost:27017';

// 需要操作数据库名称
const dbName = 'myproject';

// 连接数据库，这是一个异步的操作
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

    ...


  client.close();
});

```

4. 从命令行运行您的应用程序

```
node app.js
```


# CRUD操作

# 插入文件

这个insertOne和insertMany方法存在于Collection类中，用于将文档插入MongoDB。

```
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'myproject';

MongoClient.connect(url, function(err, client) {
  console.log("Connected correctly to server");

  const db = client.db(dbName);

    // 选择集合，进行单条插入   insertOne  
  db.collection('inserts').insertOne({a:1}, function(err, r) {

      // 插入多条 insertMany
    db.collection('inserts').insertMany([{a:2}, {a:3}], function(err, r) {

      client.close();
    });
  });
});
```


# 更新文件

这个updateOne和updateMany方法存在于Collection类中，用于更新和upsert文档。

```
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'myproject';

MongoClient.connect(url, function(err, client) {

  const db = client.db(dbName);

  const col = db.collection('updates');

    // 更新单条 updateOne
    col.updateOne({a:1}, {$set: {b: 1}}, function(err, r) {

        // 更新多条 updateMany
        col.updateMany({a:2}, {$set: {b: 1}}, function(err, r) {

            client.close();

        });
    });
});
```


# 删除文档

这个deleteOne和deleteMany方法存在于Collection类中，用于从MongoDB中删除文档。

```
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'myproject';

MongoClient.connect(url, function(err, client) {

  const db = client.db(dbName);

  const col = db.collection('updates');

    // 删除单条 deleteOne
    col.deleteOne({a:1}}, function(err, r) {

        // 删除多条 deleteMany
        col.deleteMany({a:2}}, function(err, r) {

            client.close();

        });
    });
});
```

*findOneAndUpdate，findOneAndDelete和findOneAndReplace这三种方法是特殊的命令，其允许用户更新或UPSERT一个文件，并具有修饰的或现有的文档返回。使用这些方法时，操作期间采用写锁定，以确保修改是 原子的。*



# 查询文档

查询数据库的主要方法是find方法

find返回一个允许用户操作数据的游标

该find方法返回的游标有几种方法，允许链接查询的选项

一旦查询已准备好执行的，你可以检索使用的文件next，each和toArray方法

toArray方法:
```
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'myproject';

MongoClient.connect(url, function(err, client) {

    const db = client.db(dbName);

    const col = db.collection('updates');

    col.find({a:1}).limit(2).toArray(function(err, docs) {
      console.log(docs.length);
      client.close();
    });
});
```

next方法:
该next方法允许应用程序使用回调一次读取一个文档
```
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'myproject';

MongoClient.connect(url, function(err, client) {

    const db = client.db(dbName);

    const col = db.collection('updates');

    col.find({a:1}).limit(2).next(function(err, doc) {
      console.log(doc);
      client.close();
    });
});
```

each方法:
```
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'myproject';

MongoClient.connect(url, function(err, client) {

    const db = client.db(dbName);

    const col = db.collection('updates');

    col.find({a:1}).limit(2).each(function(err, doc) {
     
      if(doc) {
        // Got a document
         console.log(doc);
      } else {
        client.close();
        return false;
      }
    });
});
```
该each方法调用提供的回调，直到没有更多可用的文档满足查询。一旦可用文档耗尽，它将返回null回调中的第二个参数。如果您希望提前终止，each则应在each回调中返回false 。这将阻止光标返回文档。

*如果查询返回许多文档，则最好使用next或each方法，因为该toArray方法将在调用回调函数之前将所有文档实现到内存中，如果查询返回许多文档，则可能使用大量内存*

```
collection.find({}).project({a:1})                             // Create a projection of field a
collection.find({}).skip(1).limit(10)                          // Skip 1 and limit 10
collection.find({}).batchSize(5)                               // Set batchSize on cursor to 5
collection.find({}).filter({a:1})                              // Set query on the cursor
collection.find({}).comment('add a comment')                   // Add a comment to the query, allowing to correlate queries
collection.find({}).addCursorFlag('tailable', true)            // Set cursor as tailable
collection.find({}).addCursorFlag('oplogReplay', true)         // Set cursor as oplogReplay
collection.find({}).addCursorFlag('noCursorTimeout', true)     // Set cursor as noCursorTimeout
collection.find({}).addCursorFlag('awaitData', true)           // Set cursor as awaitData
collection.find({}).addCursorFlag('exhaust', true)             // Set cursor as exhaust
collection.find({}).addCursorFlag('partial', true)             // Set cursor as partial
collection.find({}).addQueryModifier('$orderby', {a:1})        // Set $orderby {a:1}
collection.find({}).max(10)                                    // Set the cursor max
collection.find({}).maxTimeMS(1000)                            // Set the cursor maxTimeMS
collection.find({}).min(100)                                   // Set the cursor min
collection.find({}).returnKey(10)                              // Set the cursor returnKey
collection.find({}).setReadPreference(ReadPreference.PRIMARY)  // Set the cursor readPreference
collection.find({}).showRecordId(true)                         // Set the cursor showRecordId
collection.find({}).sort([['a', 1]])                           // Sets the sort order of the cursor query
collection.find({}).hint('a_1')                                // Set the cursor hint
```
所有选项都是可链接的，因此您可以通过以下方式组合设置：

```
collection.find({}).maxTimeMS(1000).skip(1).toArray(..)
```



# 创建索引

要在一个或多个字段上创建索引，请将索引规范文档传递给该createIndex()方法：

```
  { <field1>: <type1>, <field2>: <type2> ... }
```

createIndex()方法创建索引： （1为升序，-1为降序）
```
  // Get the users collection
  const collection = db.collection('users');
  
  collection.createIndex(
    { dateOfBirth : 1 }, function(err, result) {
    console.log(result);
    callback(result);
  });
```

## 创建复合索引

要指定复合索引，请使用该compoundIndex方法。

```
  const collection = db.collection('users');
  
  collection.createIndex(
    { lastName : -1, dateOfBirth : 1 }, function(err, result) {
    console.log(result);
    callback(result);
  });
```

## 创建文本索引

MongoDB还提供 文本索引以支持字符串内容的文本搜索。文本索引可以包括其值为字符串或字符串元素数组的任何字段

此示例指定comments字段的文本索引键：

```
  const collection = db.collection('users');
  
  collection.createIndex(
    { comments : "text" }, function(err, result) {
    console.log(result);
    callback(result);
  });
```

## 创建唯一索引

```
  const collection = db.collection('users');
  
  collection.createIndex(
    { lastName : -1, dateOfBirth : 1 },
    { unique:true },
    function(err, result) {
      console.log(result);
      callback(result);
  });
```



## 聚合（多表查询）

聚合操作将来自多个文档的值组合在一起，并且可以对分组数据执行各种操作以返回单个结果

aggregate  ，  group


# 在链接数据库时报错  current URL string parser is deprecated

执行：MongoClient.connect(url,function(){})  链接数据库时

报错：(node:14196) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.

翻译：Debug警告：当前URL字符串解析器已被弃用，将在将来的版本中删除。若要使用新的解析器，将传递选项{USENWURLPARSE:Trase}连接到MungclieT.Cu连上。

解决方法：添加一个参数

```
MongoClient.connect(url,{useNewUrlParser:true},function(){})
```




