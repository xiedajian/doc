
### clean-webpack-plugin

 用于清空 dist 目录。

1.安装

npm i -D clean-webpack-plugin


2.使用
//webpack.config.js 中使用
```

const CleanWebpackPlugin = require('clean-webpack-plugin');


plugins: [

	    new CleanWebpackPlugin(['./dist']),
]
```


###  copy-webpack-plugin

 用于复制 src 文件到 dist

1.安装
npm i -D copy-webpack-plugin

2.使用
//webpack.config.js 中使用

```

const CopyWebpackPlugin = require('copy-webpack-plugin');


plugins: [

	    new CopyWebpackPlugin([
          {from:path.resolve(__dirname,'./src/components/vendor'),to:path.resolve(__dirname,'../www/static/pc/vendor')},
          {from:path.resolve(__dirname,'./src/css'),to:path.resolve(__dirname,'../www/static/pc/css')},
          {from:path.resolve(__dirname,'./src/images'),to:path.resolve(__dirname,'../www/static/pc/images')},
        ]),
]
```


### html-webpack-plugin
 用于生成 html 文件

1.安装
npm i -D html-webpack-plugin

2.使用
//webpack.config.js 中使用

```

var HtmlWebpackPlugin = require('html-webpack-plugin');


plugins: [

		// 每一个页面一个配置
        new HtmlWebpackPlugin({
            title: 'title',  // 生成 HTML 文档的标题
            filename: 'index.html', // 写入 HTML 文件的文件名，默认 `index.html`, 生成的html存放路径，相对于path
            favicon: './src/img/favicon.ico', // favicon路径，通过webpack引入同时可以生成hash值
            template: './src/method1/test.html', // html模板路径
            inject: true, // js插入的位置，true/'head'/'body'/false
            hash: true, // 为静态资源生成hash值
            chunks: ['index'], // 需要引入的chunk，不配置就会引入所有页面的资源js
            minify: { // 压缩HTML文件
                removeComments: false, // 移除HTML中的注释
                collapseWhitespace: false // 删除空白符与换行符
            }
        }),
]
```


### mini-css-extract-plugin

npm install --save-dev mini-css-extract-plugin

这个插件将CSS抽取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。它支持按需加载CSS和SourceMaps。

它建立在新的webpack v4功能（模块类型）之上，并要求webpack 4工作。

与extract-text-webpack-plugin相比：

异步加载
没有重复的编译（性能）
更易于使用
特定于CSS

https://webpack.js.org/plugins/mini-css-extract-plugin/


### open-browser-webpack-plugin

npm install open-browser-webpack-plugin --save-dev

打开浏览器特定网址

```
    const OpenBrowserPlugin = require('open-browser-webpack-plugin');


      plugins: [
        new OpenBrowserPlugin({ url: 'http://localhost:3000' })
      ]
```


