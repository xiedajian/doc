

github



# Validate 插件参数校验

在获取到用户请求的参数后，不可避免的要对参数进行一些校验。

借助 Validate 插件提供便捷的参数校验机制，帮助我们完成各种复杂的参数校验。


1. 先安装 egg-validate

```
$ npm i egg-validate --save
```

2. 添加到插件配置文件 config/plugin.js
   
```
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
```

3. 在控制器中使用 ctx.validate() 方法来校验参数

ctx.validate() 方法第一个参数是规则，第二参数是待校验的参数，如果不传第二个参数会自动校验 `ctx.request.body`

当校验异常时，会直接抛出一个异常，异常的状态码为 422，errors 字段包含了详细的验证不通过信息。如果想要自己处理检查的异常，可以通过 try catch 来自行捕获。

```
// app/controller/home.js
const Controller = require('egg').Controller;

class DemoController extends Controller {
   async validatedemo() {
       		const ctx = this.ctx;
		let params = ctx.query;
		
		try {
			
			// ctx.validate() 方法来校验参数
			// 第一个参数是规则，第二参数是待校验的参数，如果不传第二个参数会自动校验 `ctx.request.body
			ctx.validate({
				name: {type: 'string'},
				age: {type: 'string'},
			},params);
			
			
		} catch (err) {
			// ctx.logger.warn(err.errors);
			console.log(err);
			ctx.body = {success: '校验失败',data:err};
			return;
		}
		this.ctx.body = params;
   } 
}
```

# 自定义校验规则

可以通过 app.validator.addRule(type, check) 的方式新增自定义规则