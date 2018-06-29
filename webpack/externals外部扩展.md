

# 外部扩展(externals)

所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖

是在运行时(runtime)再去从外部获取这些扩展依赖

比如 ：

多页面 webpack 使用jquery ，不用 exyrenals 有两种做法

1. npm 安装 jquery ，在每个页面 import

```
	// 安装
	npm i jquery
	// 使用
	import $ from 'jquery';

```

2. 另一种，在页面使用 <script src="xx"></script> 标签来引入 jquery ，然后在使用的页面声明

```
	const $ = window.jQuery;

```


### 使用 externals 声明 

jquery 使用 <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script> 标签的方式进行引入、

webpack.conig.js 文件中配置 externals:
```

	module.exports = {

	    externals: {
	        $: 'jquery',
	        jQuery: 'jquery',
	        'window.jQuery': 'jquery',
	        'window.$': 'jquery',
	    },

	}
```


这样在代码中就无需 const $ = window.jQuery 来声明 $ 了，可以直接使用 $



### 更实际的用途

比如我们现在有工具库 ， tools.js  没有给我们提供模块化（ADM，CMD，UMD）的功能，只是使用window或者global的方式把工具的对象tools暴露出来

```

	window.Tools = {
	    add: function(num1, num2) {
	      return num1 + num2
	    }
  	}
```

接下来把它放在任何页面能够引用到的地方，例如CDN，然后用script的方式引入页面


<script src="http://xxx/tools.min.js"></script>

一般来说我们可能会直接就这么用了

const res = Tools.add(1,2)

但是既然我们是模块化开发，当然要杜绝一切全局变量了，我们要用require的方式。

```

	module.exports = {

	    externals: {
			mathTools: "tools"
	    },

	}

```
使用：

const tools = require('mathTools')
const res = tools.add(1,2)
