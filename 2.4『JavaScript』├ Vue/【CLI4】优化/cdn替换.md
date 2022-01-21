
# 使用CDN 加速优化
 
 > cdn优化是指把第三方库比如（vue，vue-router，axios）通过cdn的方式引入项目中，这样vendor.js会显著减少，并且大大提升项目的首页加载速度，下面是具体操作：
 
 Echarts 改外部引用

外部引入需要配置两个地方： 

1.在 vue.config.js 的 configureWebpack.externals 加入需要外部使用的包
2.在 public/index.html 里引入对应的包 

Echarts 外部引用需要配置的地方 
```
// vue.config.js 
module.exports = {
  configureWebpack: {
    externals: {
      echarts: "echarts",
    }
  }
}; 
```

```
  <!-- public/index.html -->
  <!-- 写在 head 最下面或 body 最下面 -->
  <!-- echarts cdn -->
  <script src="https://cdn.bootcdn.net/ajax/libs/echarts/4.8.0/echarts-en.common.min.js"></script> 
 ```
  
  
# ElementUI 改按需加载   

[按需引入](https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru)



