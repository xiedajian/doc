
[参考：](https://www.jb51.net/article/130212.htm)


# 地理课上学习过的基本概念

子午线为中心，向东西两侧延伸，每 15 度划分一个时区，刚好是 24 个时区。

然后因为一天有 24 小时，地球自转一圈是 360 度，360 度 / 24 小时 = 15 度/小时，所以每差一个时区，时间就差一个小时。

标准时间（子午线中心处的时间）是英国伦敦的皇家格林威治天文台的标准时间（因为它刚好在本初子午线经过的地方），这就是我们常说的 GMT（Greenwich Mean Time）。

然后其他各个时区根据标准时间确定自己的时间，往东的时区时间晚（表示为 GMT+hh:mm）、往西的时区时间早（表示为 GMT-hh:mm）。

比如，中国标准时间是东八区，我们的时间就总是比 GMT 时间晚 8 小时，他们在凌晨 1 点，我们已经是早晨 9 点了。


但是 GMT 其实是根据地球自转、公转计算的，不是非常准确，

于是后面提出了根据原子钟计算的标准时间 UTC（Coordinated Universal Time）。


一般情况下，GMT 和 UTC 可以互换，但是实际上，GMT 是一个时区，而 UTC 是一个时间标准。



# Node.js sequelize时区配置

sequelize 默认情况下，保存日期时会转换成 +00:00时区，例如

提交数据：

> time=2017-07-17 16:52:12

数据库中会保存成

> 2017-07-17 08:52:12


解决方式： 

sequelize时配置时区

```
timezone: '+08:00'
```

如：
```
const sequelize = new Sequelize(config.database, config.username, config.password, {
 host: config.host,
 port: config.port,
 dialect: 'mysql',
 pool: {
 max: 5,
 min: 0,
 idle: 10000
 },
 timezone: '+08:00'   //东八时区
});
```

egg 中配置
```
    config.sequelize = {
        delegate: 'model',  // load all models to app.model and ctx.model
        baseDir: 'model',   // load models from `app/model/*.js`
        dialect: 'mysql',   // support: mysql, mariadb, postgres, mssql
        host: '127.0.0.1',
        port: 3306,
        database: 'mall',
        username: 'root',
        password: 'root',
        timezone: '+08:00'  //东八时区
    };
```
