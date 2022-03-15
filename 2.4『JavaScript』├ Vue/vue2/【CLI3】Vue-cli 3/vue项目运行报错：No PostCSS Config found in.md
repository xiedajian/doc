

报错：
```
Module build failed (from ./node_modules/postcss-loader/src/index.js):
Error: No PostCSS Config found in: E:\@tiamaes\map\src\components
```


解决办法：

在项目根目录下创建postcss.config.js，配置内容如下：即可修复报错问题。
```
module.exports = {  
  plugins: {  
    'autoprefixer': {browsers: 'last 5 version'}  
  }  
}
```

上边不行的话，就在报错得地方添加 postcss.config.js 文件, 例如这里在报错得 @tiamaes/map 包目录下添加
```
module.exports = {
  plugins: {
    autoprefixer: {}
  }
};

```