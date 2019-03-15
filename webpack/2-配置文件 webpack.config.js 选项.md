
[官方文档](https://www.webpackjs.com/configuration/)
[文档](https://www.webpackjs.com/concepts/)


# webpack.config.js 

项目根目录下创建 webpack.config.js 来配置 wenpack 编译的配置

最重要，最基础的4个配置
- entry			入口，指定哪些文件需要编译
- output		出口，指定编译到哪里
- loader		解析规则，不同的文件需要不同的解析器
- plugin		插件，来达到更多的功能


先来看一个 webpack.config.js 案例
```
const path = require('path');
// 用于清空 dist 目录。
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

    // 入口文件的配置项，可以指定多个入口文件
    entry: {
        'index': './src/index.js',
        'preview': './src/preview.js',
    },
	// 出口文件的配置项
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].js'
    },
    // loader模块：例如解读CSS,图片如何转换，压缩
    module: {
        rules: [ 
			// 用 babel-loader 来解析 .js 文件
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            // 添加对样式表.css格式文件的处理
            {
                test: /\.css$/,
                 use: [
                     {loader: 'style-loader'},
                     {loader: 'css-loader'},
                     {loader: 'postcss-loader'}
                 ]

            },
			// 用 url-loader 来解析图片
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{ // 这里的options选项参数可以定义多大的图片转换为base64
                        limit:50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
                        outputPath:'assets/images', //定义输出的图片文件夹
                        name:'[name].[ext]',
                    }
                }]
            }
        ]
    },

    // 插件，用于生产模版和各项功能
    plugins: [

        // 清空dist目录，第一个参数是要清理的目录的字符串数组
        new CleanWebpackPlugin(['./dist']),
    ],
}
```



# loader

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）

loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。


在 webpack 的配置中 loader 有两个目标：
1. test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。正则匹配
2. use 属性，表示进行转换时，应该使用哪个 loader。



# plugins

插件可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。

插件接口功能极其强大，可以用来处理各种各样的任务。