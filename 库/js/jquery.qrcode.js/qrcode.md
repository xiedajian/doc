
# jquery.qrcode.js

生成二维码

官网： http://jeromeetienne.github.io/jquery-qrcode/

GitHub: https://github.com/jeromeetienne/jquery-qrcode

cdn: <script src="https://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js"></script>

jquery.qrcode.js是用于纯浏览器qrcode生成的jquery插件。

它允许您轻松地将qrcode添加到您的网页。它是独立的，minify + gzip后不到4k，没有图像下载。

它不依赖于打开和关闭的外部服务，或者在加载时增加延迟。它基于一个以各种语言构建qrcode 的库。

jquery.qrcode.js将其包装起来，以便在您自己的代码中包含它。

显示，不要说，这是一个例子

## 如何使用它
让我一起走过你。首先将其包含在您的网页中，并使用通常的脚本标记

```
<script type="text/javascript" src="jquery.qrcode.min.js"></script>
```
然后创建一个DOM元素，它将包含生成的qrcode图像。让我们说一个div

```
<div id="qrcode"></div>
```

然后在此容器中添加qrcode

```
jquery('#qrcode').qrcode("this plugin is great");

您可以设置生成的qrcode的高度和宽度：

jquery('#qrcode').qrcode({width: 64,height: 64,text: "size doesn't matter"});
```

就是这个。看到现场。

结论
jquery.qrcode.js可以在MIT许可证的 github上找到。如果你遇到错误，请填写github上的问题。随意分叉，修改并享受它的乐趣:)
