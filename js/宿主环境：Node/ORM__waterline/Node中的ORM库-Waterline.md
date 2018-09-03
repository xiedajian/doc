

# Waterline

Waterline是Github中比较活跃的支持大部分主流数据库的ORM模块，其中包括关系型和非关系型。

这篇文章我们就以sails-mongo(就是用waterline来操作mongodB)为例，结合Koa2写一个简单的Restful接口。

其实也不算作严格的Restful,因为并没有做具体的路由匹配，也没有实现CRUD的所有功能，但是它们的接口在github上有介绍，通过以下的代码并不难实现所有的功能。

了演示方便，不致于混淆，只创建了2个文件，分别是app.js和server.js，app.js里定义了koa产生的对象app以及中间件，server.js里定义了数据库模型、数据库的建立、服务器创建和启动。

我们先看server.js:


```
var Waterline = require("waterline");
var mongoAdapter = require("sails-mongo");//mongo 适配器
var app = require("./app.js");
var http = require("http");

var userCollection = Waterline.Collection.extend({ //user model in database
    identity:"user",
    connection:"myMongo",
    attributes:{
        name:"string",
        age:{type:"integer",required:false}
    },
    autoCreatedAt:false,  //waterline会给collection自动加上createdAt和updatedAt字段，这里设置不加这两个字段
    autoUpdatedAt:false
});

var config ={
    adapters:{
        "mongo":mongoAdapter
    },
    connections:{
        myMongo:{
            adapter:"mongo",
            url:"mongodb://localhost:27017/test" //两种写法
            //host:"localhost"
            //database:"test"
        }
    }
};


var waterline = new Waterline();
waterline.loadCollection(userCollection);

waterline.initialize(config,function(err,models){ //首先初始化数据库
    var server = http.createServer(app.callback());
    app.models = models.collections;//用app来保存数据库里的models,是为了在app.js中使用
    app.connections = models.connections;
    server.listen(8080); //启动服务器
    server.on("listening",function(){
        console.log("listening...")
    });

});
```

在server.js里，将数据库里的models挂载到app上，而在app.js中能访问到app，所以就将models传到了app.js中。接下来看app.js：

```
var Koa = require("koa");
var app = new Koa();

app.use(async (ctx,next)=>{//在koa中，所有中间件的ctx是一样的
    ctx.request.models = app.models;//将app中的models存到ctx.request中，为了之后的中间件中获取
    await next();
});

app.use(async (ctx,next)=>{
    var User = ctx.request.models.user;//在ctx.request中获取User
    var doc = await User.create({name:"yingge",age:18});
    ctx.body = JSON.stringify(doc);
});

module.exports = app;
```

其实这个例子中完全可以直接从app中获取app.models.user，不用多此一举将app.models传给ctx.request.models，这样做的目的是为了考虑到路由比较多的情况，我们不会将所有的路由都写在app.js里，这时候，对于别的路由定义的文件，只能访问到ctx，即koa2的上下文。我们用ctx来存储公有的数据。第一个中间件结束后，访问第二个中间件，在第二个中间件里获取叫做User的model，返回创建的条目


以上是仿照waterline官网上express的例子做出来的koa的demo。供学习和参考。        






