

# 前端轻量级web进度条 – Nprogress

官网
NProgress.js：http://ricostacruz.com/nprogress/

安装
```
npm install nprogress 
```

用法
```
NProgress.start();
NProgress.done();
```





# Vue使用NProgress

router.js
```
//导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

```

## 修改颜色

在App.vue中的style中增加：
```
  #nprogress .bar {
      background: red !important; //自定义颜色
    }
```