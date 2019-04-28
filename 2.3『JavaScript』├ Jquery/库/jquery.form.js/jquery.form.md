
# jquery.from


jQuery Form Plugin允许您轻松且不引人注意地升级HTML表单以使用AJAX。

jQuery.form.js是一个form插件，支持ajax表单提交和ajax文件上传。


官网： https://jquery-form.github.io/form/



## 核心方法

- ajaxForm( options )			// 准备要通过AJAX提交的表单,为AJAX提交准备表单

- ajaSubmit(options)			// 立即通过AJAX提交表单

- serialize()					// 将表单序列化为查询字符串  name1=value1&name2=value2

- fieldSerialize()				// 只需要序列化表单的一部分时，这很方便

- resetForm()					// 将表单重置为其原始状态

- clearForm()					// 清除表单元素。此方法清空所有文本输入，清除任何选择元素中的选择

- clearFields()					// 清除字段元素。当您只需要清除表单的一部分时，这很方便

## 使用


html:

在页面中添加表单。只是一个普通的表格，不需要特殊的标记

````
	<script src="https://cdn.bootcss.com/jquery.form/4.2.2/jquery.form.min.js"></script>
	<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
	<form id="myForm" action="comment.php" method="post">
	   Name: <input type="text" name="name">
	   Comment: <textarea name="comment"></textarea>
	   <input type="submit" value="Submit Comment">
	</form>
```



js:

```
       $('#myForm').ajaxForm(function() {
           alert("Thank you for your comment!");
       });

```
