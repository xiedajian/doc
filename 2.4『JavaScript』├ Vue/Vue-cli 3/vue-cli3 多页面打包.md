[原文](https://www.jianshu.com/p/2db75dbeb0d9)


# vue-cli 3.0 多页面打包

vue2.x要配置一个多页面 挺麻烦的 vue-cli 3.0 配置就相对简单太多了


## 目录结构
```
-project
  |-public 
  |-src  // 源码
  | |-projects // 模块目录
  | | |-p1 // 项目1
  | | | |-assets
  | | | |-components
  | | | |-views
  | | | |-App.vue
  | | | |-main.js
  | | | |-router.js
  | | | |-store.js
  | | |-p2 // 项目2
  | | | |．．．．．
  |-postcss.config.js // postcss 配置文件
  |-webpack.config.js // 通用webpack配置信息
  |-package.json
```



## webpack.config.js 中pages的配置
```
pages: {
    index: {
      entry: './src/projects/p1/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
    about: {
      entry: './src/projects/p2/main.js',
      template: 'public/index.html',
      filename: 'about.html'
    }
  },
```