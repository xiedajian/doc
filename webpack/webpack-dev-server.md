
#### webpack-dev-server
首先在项目下安装 webpack-dev-server

$ npm install -D webpack-dev-server

安装完成后在命令行下执行 webpack-dev-server：

在 http://localhost:8080/ 访问我们的 index.html。

在入口文件 src/index.js 里再添加一行代码验证下浏览器页面的实时刷新功能：










#### 自定义配置

```
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        host: 'localhost',
        disableHostCheck: true, //绕过主机检查
        hot: true,
        https: false,  // 是否采用https，默认是http
        inline: true,
        progress: true, // 输出运行进度到控制台。
        watchContentBase: true, //观察contentBase选项提供的文件。文件更改将触发整页重新加载
        compress: true,
        port: 8000
    }

```


### dev-server 代理 实现跨域

