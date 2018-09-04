

egg官网推荐解决方案：https://eggjs.org/zh-cn/tutorials/index.html
github: https://github.com/eggjs/egg-sequelize

#  egg-sequelize

nodejs 使用最广泛的 ORM 库 sequelize 的 egg 插件


# 安装
```
$ npm i --save egg-sequelize
$ npm install --save mysql2         # 对于mysql和mariadb方言

# 或使用其他数据库后端
$ npm install --save pg pg-hstore # PostgreSQL
$ npm install --save tedious # MSSQL
```


# 使用和配置

1.启用插件 config/plugin.js

```
// config/plugin.js
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

```

2.编辑您自己的配置 conif/config.{env}.js

连接单个数据库：
```
// conif/config.{env}.js
exports.sequelize = {
		delegate: 'model',  // load all models to app.model and ctx.model
		baseDir: 'model',   // load models from `app/model/*.js`
		dialect: 'mysql',   // support: mysql, mariadb, postgres, mssql
		host: '127.0.0.1',
		port: 3306,
		database: 'egg_demo',
		username: 'root',
		password: 'root',
	};
```

连接多个数据库：

```
	exports.sequelize = {
		datasources: [
			{
				delegate: 'model',  // load all models to app.model and ctx.model
				baseDir: 'model',   // load models from `app/model/*.js`
				dialect: 'mysql',   // support: mysql, mariadb, postgres, mssql
				host: '127.0.0.1',
				port: 3306,
				database: 'egg_demo',
				username: 'root',
				password: 'root',
			},
			{
				delegate: 'adminModel', // load all models to app.adminModel and ctx.adminModel
				baseDir: 'admin_model', // load models from `app/admin_model/*.js`
				dialect: 'mysql',
				host: '127.0.0.2',
				port: 3306,
				database: 'egg_demo',
				username: 'root',
				password: 'root',
			},
		],
	}
```

egg-sequelize下面有一个默认的sequelize选项

```

```

# 模型文件

默认情况下将模型放在 app/model 目录下

约定：

```
模型文件	         模型名称
user.js	            app.model.User
person.js	        app.model.Person
user_group.js	    app.model.UserGroup
user/profile.js	    app.model.User.Profile
```
表总是有时间戳字段：created_at datetime，updated_at datetime。
使用下划线样式列名称，例如：user_id，comments_count。




# 例子

标准
首先定义模型。

> 注意：app.model是Sequelize的实例，因此您可以使用以下方法：app.model.sync, app.model.query ...













