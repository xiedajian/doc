

文档：https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001472286125147031e735933574ae099842afd31be80d1000


# 多人开发的问题

直接使用Sequelize虽然可以，但是存在一些问题。

团队开发时，有人喜欢自己加timestamp：

```
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT
}, {
        timestamps: false
    });
```

有人又喜欢自增主键，并且自定义表名：

```
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING(100)
}, {
        tableName: 't_pet'
    });
```

一个大型Web App通常都有几十个映射表，一个映射表就是一个Model。如果按照各自喜好，那业务代码就不好写。Model不统一，很多代码也无法复用。

所以我们需要一个统一的模型，强迫所有Model都遵守同一个规范，这样不但实现简单，而且容易统一风格。



# 统一model规范

我们首先要定义的就是Model存放的文件夹必须在models内，并且以Model名字命名，例如：Pet.js，User.js等等

其次，每个Model必须遵守一套规范：

- 统一主键，名称必须是id，类型必须是STRING(50)；
- 主键可以自己指定，也可以由框架自动生成（如果为null或undefined）；
- 所有字段默认为NOT NULL，除非显式指定；
- 统一timestamp机制，每个Model必须有createdAt、updatedAt和version，分别记录创建时间、修改时间和版本号。其中，createdAt和updatedAt以BIGINT存储时间戳，最大的好处是无需处理时区，排序方便。version每次修改时自增。

所以，我们不要直接使用Sequelize的API，而是通过db.js间接地定义Model。

例如，User.js应该定义如下：

```
const db = require('../db');

module.exports = db.defineModel('users', {
    email: {
        type: db.STRING(100),
        unique: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN
});
```

这样，User就具有email、passwd、name和gender这4个业务字段。

id、createdAt、updatedAt和version应该自动加上，而不是每个Model都去重复定义。

所以，db.js的作用就是统一Model的定义：

```
const Sequelize = require('sequelize');

console.log('init sequelize...');

var sequelize = new Sequelize('dbname', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    });
}
```

我们定义的defineModel就是为了强制实现上述规则。

Sequelize在创建、修改Entity时会调用我们指定的函数，这些函数通过hooks在定义Model时设定。我们在beforeValidate这个事件中根据是否是isNewRecord设置主键（如果主键为null或undefined）、设置时间戳和版本号。

这么一来，Model定义的时候就可以大大简化。


# Sequelize提供了一个sync()来自动创建数据库

注意到我们其实不需要创建表的SQL，因为Sequelize提供了一个sync()方法，可以自动创建数据库。

这个功能在开发和生产环境中没有什么用，但是在测试环境中非常有用。

测试时，我们可以用sync()方法自动创建出表结构，而不是自己维护SQL脚本。

这样，可以随时修改Model的定义，并立刻运行测试。

开发环境下，首次使用sync()也可以自动创建出表结构，避免了手动运行SQL的问题。








