


# SplitChunksPlugin

文档： https://webpack.js.org/plugins/split-chunks-plugin/

自从webpack v4以来，它CommonsChunkPlugin被删除了optimization.splitChunks


```

	//现在配置
	optimization: {
	    splitChunks: {
	        cacheGroups: {
	            commons: {  // 抽离自己写的公共代码
	                chunks: "initial",
	                name: "common", // 打包后的文件名，任意命名
	                minChunks: 2,//最小引用2次
	                minSize: 0 // 只要超出0字节就生成一个新包
	            },
	            vendor: {   // 抽离第三方插件
	                test: /node_modules/,   // 指定是node_modules下的第三方包
	                chunks: 'initial',
	                name: 'vendor',  // 打包后的文件名，任意命名
	                // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
	                priority: 10
	            },
	        }
	    }
	},

```

## 常用参数

minSize(默认是30000)：形成一个新代码块最小的体积
minChunks（默认是1）：在分割之前，这个代码块最小应该被引用的次数（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
maxInitialRequests（默认是3）：一个入口最大的并行请求数
maxAsyncRequests（默认是5）：按需加载时候最大的并行请求数。
chunks (默认是async) ：initial、async和all
test： 用于控制哪些模块被这个缓存组匹配到。原封不动传递出去的话，它默认会选择所有的模块。可以传递的值类型：RegExp、String和Function
name(打包的chunks的名字)：字符串或者函数(函数可以根据条件自定义名字)
priority ：缓存组打包的先后优先级。
