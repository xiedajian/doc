
# options

[item] 对象数组，每个item元素表示表单的一项

```
item{
	id,								// 自动名
	name,							// label名称
	labelWidth,						// label宽度
	placeholder,					// 提示语
	unit:'string' || 'object',		// 单位，字符串或对象，{icon，click:()=>{}}				
	maxlength:50,					// 最多输入50个字符
	showWordLimit:true,				// 显示字符限制
	readonly:true,					// 是否只读
	show:(type,form,data)=>{},		// 是否显示
	required:(type,form,data)=>{},		// 是否显示
	validator:{callback, trigger},	// 自定义验证规则， 同element-ui
	type:'string',					// 内置正则验证类型   mobile idcard ip domain carNo
	
	// 下拉框
	select,
	// 单选
	radio,
	// 整数型 数值型， 最大值，最小值
	integer,
	number,
	max,
	min,
	// 文本框
	textarea,
	// 图片
	image,
	// 级联选择器
	cascader,
	// 上传
	upload,
	// 日期时间选择
	time,
	date,
	datetime,
	datetimerange,
	pickerOptions,
	valueFormat,
}
```





```js
[
	{
	  id: "name",
	  name: "资源名称",
	  placeholder: "请输入资源名称",
	  maxlength: 20,
	  showWordLimit: true,
	  required: true
	},
	{
	  id: "path",
	  name: "资源路径",
	  placeholder: "请输入资源路径",
	  maxlength: 100,
	  showWordLimit: true
	},
	{
	  id: "type",
	  name: "路径类型",
	  default: 1,
	  select: [
		{
		  id: 1,
		  name: "菜单"
		},
		{
		  id: 2,
		  name: "外链"
		},
		{
		  id: 3,
		  name: "按钮",
		  show: ({ data }) => {
			console.log(data);
			return data ? true : false;
		  }
		}
	  ]
	},
	{
	  id: "method",
	  name: "后台方法",
	  placeholder: "请输入后台方法",
	  show: (type, model) => {
		return model.type === 3;
	  }
	},
	// {
	//   id: "orderNo",
	//   name: "资源序号",
	//   placeholder: "请输入资源序号",
	//   default: 0,
	//   max: 99999,
	//   integer: true,
	//   required: true
	// },
	{
	  id: "ico",
	  name: "资源图标",
	  maxlength: 50,
	  showWordLimit: true,
	  placeholder: "请输入图标样式或点击右侧按钮选择",
	  unit: {
		icon: "el-icon-setting",
		click: this.iconSettings
	  }
	},
	{
	  id: "hidden",
	  name: "是否显示",
	  default: false,
	  radio: [
		{
		  id: false,
		  name: "显示"
		},
		{
		  id: true,
		  name: "隐藏"
		}
	  ]
	}
  ]
```