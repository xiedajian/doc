
文档：https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001471955049232be7492e76f514d45a2180e2c224eb7a6000


# 定义模型，告诉Sequelize如何映射数据库表：

pet表
```
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });
```
用sequelize.define()定义Model时，传入名称pet，默认的表名就是pets

第二个参数指定列名和数据类型，如果是主键，需要更详细地指定。

第三个参数是额外的配置，我们传入{ timestamps: false }是为了关闭Sequelize的自动添加timestamp的功能



所有的ORM框架都有一种很不好的风气，总是自作聪明地加上所谓“自动化”的功能，但是会让人感到完全摸不着头脑

接下来，我们就可以往数据库中塞一些数据了。我们可以用Promise的方式写：

```
Pet.create({
    id: 'g-' + now,
    name: 'Gaffey',
    gender: false,
    birth: '2007-07-07',
    createdAt: now,
    updatedAt: now,
    version: 0
}).then(function (p) {
    console.log('created.' + JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: ' + err);
});
```

也可以用await写：

```
(async () => {
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: ' + JSON.stringify(dog));
})();
```
显然await代码更胜一筹。

