
# Nodejs中使用Redis

Nodejs 中Redis模块：

https://github.com/NodeRedis/node_redis

1、在你的项目中安装Redis
```
npm install redis --save   或者  cnpm install redis --save
```

2、使用Redis
```
var redis = require('redis');
var client = redis.createClient(6379, 'localhost');
//设置数据
client.set('username', '李四');
client.set('username', '李四','EX','5');   //设置过期5秒
//获取数据
client.get('username', function(err, val){
  console.log(val);
});
```


