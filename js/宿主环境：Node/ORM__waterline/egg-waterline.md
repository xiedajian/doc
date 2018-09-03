

npm: https://www.npmjs.com/package/egg-waterline
文档： https://github.com/balderdashy/waterline-docs

# egg-waterline



# Install

$ npm i egg-waterline --save



# Usage

```
// {app_root}/config/plugin.js
exports.waterline = {
  enable: true,
  package: 'egg-waterline',
};
```


# Configuration

```
// {app_root}/config/config.default.js
exports.waterline = {
    app : true,
    agent : false,
    mount: 'model', // 模型目录
    db: { // 数据库配置，内部支持 mongodb , mysql
        default: { //数据库名称
    		adapter: 'mongodb', // 数据库 mongodb | mysql
    		host: 'localhost',
    		port: 27017,
            database: 'test',
        }
    },
};

```




# Example

数据模型:

```
// {app_root}/app/model/User.js
module.exports = app => {
    return {
        identity : "User", //model访问名称，app.model.User，未定义为数据表名
        tableName : "user_table", //表名
        connection : "default", //使用的数据库名称
        schema : true,
        primaryKey: 'id',
        attributes : {
            id : {
                type : "string"
            },
            name : {
                type : "string",
                required: true
            }
        },
        beforeCreate : function ( values , next ){
            next();
        }
        
    }
    
}
```

使用数据模型:

```
// {app_root}/app/controller/Home.js
module.exports = app => {
    class HomeController extends app.Controller {
        
        async index ( ctx ) {
            let res = await app.model.User.find({
                id : 1
            });
            ctx.body = res;
        }
        
    }
    return HomeController;
}
```


