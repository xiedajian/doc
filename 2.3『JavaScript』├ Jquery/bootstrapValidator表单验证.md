[参考](https://blog.csdn.net/weixin_41305441/article/details/85062418)


# bootstrapValidator表单验证插件

CDN
```

https://cdn.bootcss.com/bootstrap-validator/0.5.3/css/bootstrapValidator.min.css
https://cdn.bootcss.com/bootstrap-validator/0.5.3/js/bootstrapValidator.min.js
```


# 使用

1.引入依赖库
```
<link rel="stylesheet" href="/path/to/bootstrap/css/bootstrap.css"/>
<link rel="stylesheet" href="/path/to/dist/css/bootstrapValidator.min.css"/>

<script type="text/javascript" src="/path/to/jquery/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/path/to/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/path/to/dist/js/bootstrapValidator.min.js"></script>
```

2.准备form元素
- 验证元素和相关标签必须含有form-group类名的父级元素。
- 表单内的name属性和id属性不能使用表单元素，例如：submit、reset、length、method等
- 验证元素必须有name属性，插件将根据name属性进行验证

正确的表单元素:
```
<form class="form-horizontal" id="xdj-wxsj">
 <div class="form-group">
    <label for="ip" class="col-sm-2 control-label">IP：</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="ip" name="ip" placeholder="IP">
    </div>
  </div>
  <div class="form-group">
    <label for="dk" class="col-sm-2 control-label">端口：</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="dk" name="dk" placeholder="端口">
    </div>
  </div>
     <div class="form-group">
    <label for="yhm" class="col-sm-2 control-label">用户名：</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="yhm" name="yhm" placeholder="用户名">
    </div>

  </div>  <div class="form-group">
    <label for="mm" class="col-sm-2 control-label">密码：</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="mm" name="mm" placeholder="密码">
    </div>

  </div>
    <div class="form-group">
    <label for="wjm" class="col-sm-2 control-label">文件名：</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="wjm" name="wjm" placeholder="文件名">
    </div>
       </div>
</form>
```

正确的表单元素:
表单内的name属性和id属性不能使用表单元素，例如：submit、reset、length、method等
```
<!--错误示例-->
<button type="submit" name="submit" class="btn btn-primary">Submit</button>
<!--如果使用以上命名方式，表单即使在验证通过后也无法提交表单-->
```


3.准备好form元素后直接初始化
```
$('#xdj-wxsj').bootstrapValidator({
	trigger:'blur ',		// 触发器
　　 message: 'This value is not valid',
　	feedbackIcons: {
　　　　valid: 'glyphicon glyphicon-ok',
　　　　invalid: 'glyphicon glyphicon-remove',
　　　　validating: 'glyphicon glyphicon-refresh'
　　},
	fields: {
		ip: {
			message: 'ip验证失败',
			validators:{
				notEmpty: {
					message: 'ip不能为空'
				},
				// 正则验证
				regexp: {
					regexp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
					message: '请输入正确的IP'
				},
			}
		},
		dk: {
			validators: {
				notEmpty: {
					message: '端口不能为空'
				},
				regexp: {
					regexp: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
					message: '请输入正确的端口'
				},
			}
		},
		yhm: {
			validators: {
				notEmpty: {
					message: '用户名不能为空'
				},
			   stringLength: {
					min: 6,
					max: 30,
					message: '用户名的长度必须介于6到30之间'
				}
			}
		},
		mm: {
			validators: {
				notEmpty: {
					message: '密码不能为空'
				}
			}
		},
		wjm: {
			validators: {
				notEmpty: {
					message: '文件名不能为空'
				}
			}
		}
	}
 });

```

还可以手动触发验证
```
 var bootstrapValidator = $('#xdj-wxsj').data("bootstrapValidator");
 bootstrapValidator.validate();
 if(bootstrapValidator.isValid()){
	 // do 
 }
```