
引入http-vue-loader
```
  <script src="https://unpkg.com/http-vue-loader"></script>
```

测试路由
```
   {
    path: "/jar-page",
    // component: () => import("http://127.0.0.1:5500/public/jar-page/demo.vue")
    component: httpVueLoader('http://127.0.0.1:5500/public/jar-page/demo.vue')
  },
```




vue.config.js 增加运行时编译器
```
  /**
   * @type boolean
   * @default false
   * @description 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
   */
  runtimeCompiler: true,
```


