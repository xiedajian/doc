[npm](https://www.npmjs.com/package/file-saver)
[网友中文文档](https://www.cnblogs.com/yunser/p/7629399.html)



# FileSaver.js

FileSaver.js 在没有原生支持 saveAs() 的浏览器上实现了 saveAs() 接口。

FileSaver.js是在客户端保存文件的解决方案，非常适合在客户端生成文件的Web应用程序


```
npm i file-saver
```

```
import { saveAs } from 'file-saver';
```

Saving Blob
```
var FileSaver = require('file-saver');
var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(blob, "hello world.txt");
```
标准 W3C 文件 API Blob 接口不兼容所有浏览器。
Blob.js 是一个跨浏览器的 Blob 实现，可以解决兼容性问题



Saving URLs
```
FileSaver.saveAs("https://httpbin.org/image", "image.jpg");
```



保存画布（canvas）
```
var canvas = document.getElementById("my-canvas");
canvas.toBlob(function(blob) {
    saveAs(blob, "pretty image.png");
});
```
注意：标准的 HTML5 canvas.toBlob() 方法不兼容所有浏览器。
canvas-toBlob.js 是一个跨浏览器的实现 canvas.toBlob() 的 polyfill 方案。



保存文件：
你可以保存一个文件结构，不需要指定文件名。文件自身已经包含了文件名，有一些方法来获取文件实例（从 storage，file input，新的构造函数）
如果你想修改文件名，你可以在第二个参数设置文件名。
```
var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(file);
```








