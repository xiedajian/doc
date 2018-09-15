
参考文档： https://www.86886.wang/detail/5b6d5f2d3fbd32075e4bd4f5


# File API

FileAPI(文件API)为Web开发人员提供一种安全的方式，以便在客户端访问用户计算机中的文件，并更好地对这些文件执行操作

File API在表单中的文件输入字段的基础上，又添加了一些直接访问文件信息的接口。

HTML5在DOM中为文件输入元素添加了一个files集合。

在通过文件输入字段选择了一或多个文件时，files集合中将包含一组File对象，每个File对象对应着一个文件。

每个File对象都有下列只读属性

```
name:本地文件系统中的文件名

size:文件的字节大小

type:字符串，文件的MIME类型

lastModifiedDate:字符串，文件上一次被修改的时间
```

```
<button id="btn">btn</button>
<input type="file" id="upload" multiple>
<script>
 upload.onchange = function(e) {
   var files = e.target.files;
   for (var i = 0; i < files.length; i++) {
     var file = files[i];
     console.log(file);
   }
 }
 </script>
```


# FileReader

FileReader可以读取文件中的数据

使用FileReader()构造函数来创建一个FileReader对象

```
var reader = new FileReader();
```

### FileReader对象属性

1. error：表示在读取文件时发生的错误(只读)

2. readyState：表明FileReader对象的当前状态，值为状态常量中的一个(只读)，状态常量有以下三个

常量名     值    描述
EMPTY      0    还没有加载任何数据
LOADING    1    数据正在被加载
DONE       2    已完成全部的读取请求

3. result：表示读取到的文件内容，这个属性只在读取操作完成之后才有效，并且数据的格式取决于读取操作是由哪个方法发起的(只读)

### FileReader对象方法

FileReader类型实现的是一种异步文件读取机制，类似于XMLHttpRequest，区别只是它读取的是文件系统，而不是远程服务器。

为了读取文件中的数据，FileReader提供了如下几个方法

1. abort(): 终止读取操作

2. readAsText(file或Blob,encoding)：以纯文本形式读取File或Blob对象的内容，将读取到的文本保存在result属性中。第二个参数(可选)用于指定编码类型，默认为UTF-8

3. readAsDataURL(file或Blob)：读取File或Blob对象的内容，并将文件以数据URI(进行Base64编码)的形式保存在result属性中

4. readAsBinaryString(file或Blob)：读取File或Blob对象的内容，并将一个字符串保存在result属性中，字符串中的每个字符表示一字节

5. readAsArrayBuffer(file或Blob)：读取File或Blob对象的内容，并将一个包含文件内容的ArrayBuffer保存在result属性中


### FileReader对象事件

类似于XMLHttpRequest对象，FileReader也提供了几个事件

```
onabort：当读取操作被中止时调用

onerror：当读取操作发生错误时调用

onload：当读取操作成功完成时调用

onloadend：当读取操作完成时调用，不管是成功还是失败。该处理程序在onload或者onerror之后调用

onloadstart：当读取操作将要开始之前调用

onprogress：在读取数据过程中周期性调用
```

读取文件时，首先触发loadstart事件，此时readyState为1，result为空。

接着，每过50ms左右，就会触发一次progress事件，通过事件对象可以获得与XHR的progress事件相同的信息(属性)：lengthComputable、loaded和total。

当文件读取完成时，触发load事件，此时的readyState为2，result为文件内容。

如果触发了error事件，就不会发生load事件。

触发error事件时，相关的信息将保存到FileReader的error属性中。

这个属性中将保存一个对象，该对象只有一个属性code，即错误码。这个错误码是1表示未找到文件，是2表示安全性错误，是3表示读取中断，是4表示文件不可读，是5表示编码错误

如果想中断读取过程，可以调用abort()方法，这样就会触发abort事件

在触发load、error或abort事件后，会触发另一个事件loadend。loadend事件发生就意味着已经读取完整个文件，或者读取时发生了错误，或者读取过程被中断



# 应用

## 缩略图

使用FileReader对象的readAsDataURL()方法完成对文件的读取，再通过File对象的type属性筛选出图片

```
<img src="https://www.86886.wang/public/1533885924628.jpg" alt="preview" id="previewImg">
  <p id="imgName"></p>
  <input type="file" id="upload" style="display:none" accept="image/gif,image/jpeg,image/jpg,image/png,image/x-icon">
  <button id="btn">btn</button>
  <script>
  btn.onclick = function() {
    upload.click()
  }
  upload.onchange = function(e) {
    var file = e.target.files[0];
    if(file) {
      if(/image/.test(file.type)) {
        var render = new FileReader();
        render.readAsDataURL(file);
        render.onload = function() {
          previewImg.src = render.result;
          imgName.innerHTML = file.name;
        }
      }
    }
  }
</script>
```


## 文件进度

使用onprogress事件的loaded和total属性，可以实现文件进度显示

```
<input id="upload" type="file" style="display:none">
<button id="btn">选择文件</button>
<div id="fileData"></div>
<script>
btn.onclick = function() { upload.click(); }
upload.onchange = function() {
  var file = upload.files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onprogress = function(e) {
      fileData.innerHTML = '文件进度为：' + e.loaded + '/' + e.total;
    }
  }
}
</script>
```


## 文件上传

方式一: 传统方式，使用表单提交实现文件上传

必须在<form>元素中将enctype设置为"multipart/form-data"，将method设置为"post"。
另外，需要在<form>表单中设置一个hidden类型的input框，其中name值为MAX_FILE_SIZE的隐藏值域，通过设置其value值限制上传文件的大小，单位bytes

```html
<form action="pp.php" method="post" enctype="multipart/form-data">
    <input type="hidden" name="MAX_FILE_SIZE" value="1048576">
    <input type="file" name="file1">
    <button>上传文件</button>
</form>
```

方式二: 使用FormData实现文件上传

创建一个FormData()对象，调用append()方法并传入相应的File对象作为参数。然后，再把FormData对象传递给XHR的send()方法
```html
<input id="upload" type="file" style="display:none">
<button id="btn">选择文件</button>
<script>
btn.onclick = function() { upload.click(); }
upload.onchange = function() {
  var data = new FormData(),
    file = upload.files[0],
    xhr = new XMLHttpRequest();

  data.append('file', file);
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      if(xhr.status == 200) {
        console.log(xhr.responseText)
      }
    }
  }
  xhr.open('post', '/api/test', true);
  xhr.send(data);
}
</script>
```
*注意： IE9-浏览器不支持使用FormData()上传文件*


方式三: 使用File API实现文件上传，通过File API传送二进制文件
```html
<input id="upload" type="file" style="display:none">
  <button id="btn">选择文件</button>
  <script>
  btn.onclick = function() { upload.click(); }
  upload.onchange = function() {
    var file = upload.files[0],
      xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {
          console.log(xhr.responseText)
        }
      }
    }
    xhr.open('post', '/api/test', true);
    xhr.setRequestHeader("content-type",file.type);
    xhr.send(file);
  }
  </script>
```
*注意： IE9-浏览器不支持*