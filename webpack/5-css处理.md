

### loader

在webpack里面是一个很重要的功能 表示加载器、转换器

通常情况下,webpack只对js文件提供支持,但是比如说less/sass/css/ES7等就不认识了,这时候就需要使用loaders来帮助它转化了.

接下来聊聊CSS的处理吧

这时就需要借助style-loader和css-loader了

我们在src下建一个css目录,然后建一个a.css文件
```
	//index.html
	<!DOCTYPE html>
	<html>
	<head>
	    <title><%= htmlWebpackPlugin.options.title %></title>
	</head>
	<body>
	    <div id="root">aaaa</div>
	</body>
	//a.css
	body {
	    background: #ccc;
	}
	-我们在index.js文件里面引入a.css

	// index.js
	import './css/a.css';
	document.write('welcome');
```
处理css文件

这时是报错的,我们是要使用loader的,处理css文件我们需要使用到

### style-loader 和css-loader
1.安装style-load css-loader

cnpm i style-loader css-loader -D

2.配置

首先我们写一个module,在里面rules(规则),rules是一个数组,里面可以写一条一条的规则

```
	const path = require('path');
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	// const CleanWebpackPlugin = require('clean-webpack-plugin');
	const Webpack = require('webpack');

	module.exports = {
	    entry:{
	        entry: './src/index.js'
	    }, 
	    output:{
	        path:path.resolve(__dirname,'dist'),
	        filename:'[name]-bundle.js' 
	    },
	    module:{ //我写一个module
	        //配置一个rules(规则),rules是一个数组,里面包含一条一条的规则
	        rules:[
	            {
	                // test 表示测试什么文件类型
	                test:/\.css$/,
	                // 使用 'style-loader','css-loader'
	                use:['style-loader','css-loader']
	            }
	        ]
	    },
	    devServer:{
	        contentBase:path.resolve(__dirname,'dist'), //最好设置成绝对路径
	        host:'localhost',
	        port:8090,
	        open:true,
	        hot:true
	    },
	    plugins:[
	        new Webpack.HotModuleReplacementPlugin(),
	        new HtmlWebpackPlugin({
	            title:'Hello World',
	            template: './src/index.html' //模板地址
	        })
	    ]
	}

```


这时候我们运行 npm run dev,我们发现css生效了.

上面我们使用的是use的写法,我们也可是使用loader的写法,效果是同样生效的


```
	module:{ //我写一个module
	    //配置一个rules(规则),rules是一个数组,里面包含一条一条的规则
	    rules:[
	        {
	            // test 表示测试什么文件类型
	            test:/\.css$/,
	            // 使用 'style-loader','css-loader'
	            loader:['style-loader','css-loader']
	        }
	    ]
	},

```


同时还有第三种写法,css-loader一定要放在后面,因为是先用css-loader在插入到style标签里面

```
	module:{ //我写一个module
	    //配置一个rules(规则),rules是一个数组,里面包含一条一条的规则
	    rules:[
	        {
	            // test 表示测试什么文件类型
	            test:/\.css$/,
	            // 使用 'style-loader','css-loader'
	            use:[
	                {loader:'style-loader'},
	                {loader:'css-loader'}
	            ]
	        }
	    ]
	},

```

总结loader的三种写法

```

	1.use:['xxx-loader','xxx-loader']
	2.loader:['style-loader','css-loader']
	3.use:[
	        {loader:'style-loader'},
	        {loader:'css-loader'}
	   ]
```
一般简单的用第一种,涉及参数配置的用第三种




### postcss-loader autoprefixer 

1.添加postCSS 支持

npm install -D postcss-loader autoprefixer  

2.配置postcss

根目录下新建 postcss.config.js

```

	// postcss.config.js  
	module.exports = {  
	    plugins: [  
	        require('autoprefixer')  
	    ]  
	}  
```
3. webpack配置文件

```
	//webpack.config.js  
	module.exports = {  
	    ...  
	    module: {  
	        rules: [  
	  
	            {  
	                test: /\.css$/,  
	                use: [  
	                    {  
	                        loader: "style-loader"  
	                    }, {  
	                        loader: "css-loader"
	                    }, {  
	                        loader: "postcss-loader"  
	                    }  
	                ]  
	            }  
	        ]  
	    }  
	}  

```




### 分离css 为单独css文件
详细看 plugin.md
extract-text-webpack-plugin 



