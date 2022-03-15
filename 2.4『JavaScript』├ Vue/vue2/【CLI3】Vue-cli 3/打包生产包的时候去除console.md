

### 关闭map

在Vue.config.js中添加如下代码
```
module.exports = {
    // 关闭线上源码
    productionSourceMap: false,
}
```


### 去除 console
在vue.config.js中添加如下代码
```
module.exports = {
    // 关闭线上源码
    productionSourceMap: false,
	// 关闭生产环境console
	configureWebpack(config) {
	    if (process.env.NODE_ENV === 'production') {
	        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
	    }
	}
}

```