





# Clipboard.js

官网地址： https://clipboardjs.com/

cdn: <script src="https://cdn.bootcss.com/clipboard.js/2.0.1/clipboard.min.js"></script>


将文本复制到剪贴板的现代方法

没有Flash。没有框架。只需3kb gzipped

取代flash复制到剪切板，更好页面性能，不会造成卡顿想象，不止兼容PC端，还优雅的兼容移动端ios的safari浏览器



### 前言

ZeroClipboard的时代或许已经过去了，

zeroClipboard利用透明的 flash 覆盖在复制按钮上，点击 flash，将复制内容传入到 flash 中，再通过 flash 把传入的内容写到剪贴板上。

可能由于Flash技术正被各大浏览器厂商冷落，所以，截止到目前ZeroClipboard.js最新版，也无法实现在移动端浏览器进行文本复制。



## 安装

npm install clipboard --save



## 使用

引入

```
	<script src="dist/clipboard.min.js"></script>

```
new ClipboardJS('.btn');

1. Copy 从另一个元素复制文本:

可以通过 data-clipboard-target 在触发器元素中添加属性来实现。您在此属性中包含的值需要与另一个元素选择器匹配

```
	<!-- Target -->
	<input id="foo" value="https://github.com/zenorocha/clipboard.js.git">

	<!-- Trigger -->
	<button class="btn" data-clipboard-target="#foo">
	    <img src="assets/clippy.svg" alt="复制到剪贴板">
	</button>

```

2. Cut 从另一个元素剪切文本

定义data-clipboard-action属性以指定是要copy还是cut内容

```
	<!-- Target -->
	<textarea id="bar">Mussum ipsum cacilds...</textarea>

	<!-- Trigger -->
	<button class="btn" data-clipboard-action="cut" data-clipboard-target="#bar">
	   剪切切到剪贴板
	</button>

```

3. 从属性复制文本

事实是，你甚至不需要另一个元素来复制其内容。您可以data-clipboard-text在触发器元素中包含一个属性来承载被复制的内容

```
	<！-- Trigger --> 
	<button class="btn" data-clipboard-text="被复制的内容">
	    复制到剪贴板
	</button>

```

4. 事件监听

在某些情况下，希望修改复制/剪切操作后的内容

这就是为什么我们触发自定义事件，比如success和error你倾听并实现自定义的逻辑。

```
	var clipboard = new ClipboardJS('.btn');

	clipboard.on('success', function(e) {
	    console.info('Action:', e.action);
	    console.info('Text:', e.text);
	    console.info('Trigger:', e.trigger);

	    e.clearSelection();
	});

	clipboard.on('error', function(e) {
	    console.error('Action:', e.action);
	    console.error('Trigger:', e.trigger);
	});

```


5. 销毁 clipboard 对象

如果您正在使用单页应用程序，则可能需要更精确地管理DOM的生命周期。以下是清理我们创建的事件和对象的方法

```

	var clipboard = new ClipboardJS('.btn');
	clipboard.destroy();
```

6. 检测是否支持clipboard.js 

```
	ClipboardJS.isSupported()

```
