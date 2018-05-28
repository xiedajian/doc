
### 传统form
```
<form id="uploadForm" action="" method="post" enctype="multipart/form-data"> 
   <p>上传文件：<input type ="file" name="file"/></p> 
   <input type="submit" value="上传"/> 
</form>
```

### 优缺点
- 无需js直接提交数据
- 页面会刷新


#### ajax来异步提交表单数据，不刷新页面
1.使用 serialize() 对 form 表单进行序列化提交
- 缺点：只能传递一般参数，文件流失无法被序列化并传递的
```
var data = $('#uploadForm').serialize()
$.ajax({ 
   url: "", 
   type: "POST", 
   data: data, 
   success: function(data) {   
   }, 
   error: function(data) {
   } 
});

```

2. 使用 FormData 进行 Ajax 请求并上传文件
- 无需刷徐页面，并且可以传递文件
```
<form id="uploadForm"> 
   <p>上传文件：<input type="file" name="file" /></p> 
   <input type="button" value="上传" onclick="upload()" /> 
</form>
function upload() { 
   var formData = new FormData($("#uploadForm")); 
   $.ajax({ 
     url: '', 
     type: 'POST', 
     data: formData, 
     async: false, 
     cache: false, 
	 // 告诉jQuery不要去设置Content-Type请求头
     contentType: false, 
	 // 告诉jQuery不要去处理发送的数据
     processData: false, 
     success: function(data) {
     }, 
     error: function(data) {   
     } 
   }); 
}
```

### FormData详解
1、append()
append()方法用于向 FormData 对象中添加键值对：key相同不会覆盖原来的
```
fd.append('key1',"value1");
fd.append('key2',"value2");
```

2、set()
设置对应的键 key 对应的值 value(s)，set()方法将会覆盖前面的设置的键值对。
```
fd.set('key1',"value1");
fd.set('key2',"value2");
```

3、delete()
接收一个参数，表示你要删除的 key 值的名字
```
fd.delete('name');
```

4、get() 和 getAll()
- get()接收一个参数，表示需要查找的 key 的名称，返回第一个该 key 对应的 value 值
- getAll()接收一个参数,如果有多个相同的 key， 而且要返回所有的这个 key 对应的 value 值数组。
```
console.log(fd.get('name')); 	// sean
console.log(fd.getAll('name')); // ["sean", "will"]
```

5、has()
该方法也接收一个参数，同样是 key 的名称，返回一个Boolean 值， 用来判断FormData 对象是否含有该 key。
```
console.log(fd.has('name')); // true
```

6、keys()
该方法不需要接收参数，返回一个迭代器，通过这个迭代器，我们可以遍历FormData 对象中所有的 key。
```
for (var key of fd.keys()) {
    console.log(key); 
}
```

7、values()
有遍历 key 的迭代，当然也就少不了遍历 value 的迭代器了。values()就是遍历value 的迭代器，用法与 keys() 类似：
```
for (var value of fd.values()) {
    console.log(value); 
}
```

8、entries()
有遍历 key 的迭代器，也有遍历 value 的迭代器，为何不搞一个两者一起的呢！entries()就是返回一个包含键值对的迭代器：
```
for(var pair of fd.entries()) {
    console.log(pair[0]+ ', '+ pair[1]); 
}
```


##### FormData兼容性问题
低于IE10 的IE浏览器不支持 FormData



