

# 设置小程序的首页

小程序可以有多个底部tab，一般第一项作为小程序入口页面，


但是有时候需要比如第三项需要作为默认入口

只需要设置 app.json 配置文件关于 page 选项的首个就可以

```

  "pages": [
    "packageRoot/tab3/index",
    "packageRoot/tab1/index",
    "packageRoot/tab2/index",
    "packageRoot/tab4/index",
  ],

```