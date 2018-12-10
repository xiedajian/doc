


## 使用 vue-cli 前后分离的项目部署到node

首先VUE 是一个javascript的前端框架，注定了它是运行在浏览器里的，对服务器本地没有任何要求，只要一个静态文件服务器能通过http访问到其资源文件就足矣！

无论你是用apache ,ngnix 就算你要用node 自己实现一个静态文件服务器，也用不了多少行代码。

vue 使用 npm run build 把生成的dist文件夹（不要上传文件夹）里的内容上传到http服务器上就可以通过 http来访问了



*上传以后 程序出现错误不能运行的原因99.99%的可能性是你引用资源的路径有问题*


## 问题的原因：

一般如果vue框架的程序上传到网站服务器的根目录下是不会有问题的，也不存在资源文件引用错误的情况。

但如果你不是根目录，就会有问题，通过vue-cli 生成的开发目录，build以后默认引用资源文件的路径是:

```
// vue 生成的 dist 文件夹下的 index.html ，引入资源时的案例
<script type="text/javascript" src="/static/js/app.js"></script>
```

可以看到访问的静态资源时  /static 的绝对路径

但是放到服务器时，不一定会放到 根目录，所以此时这个路径就找不到文件了

比如egg框架，静态资源都放在 app/public 下

此时，其实引用的路径应该为

```
<script type="text/javascript" src="/public/static/js/app.js"></script>
```


## 解决的方法

要解决的方法很简单把引用的方式改了

当然这也不需要手动去改

我们可以通过修改vue项目的config中的index.js下修改webpack配置：

```
assetsPublicPath: './'
或者
assetsPublicPath: '/public/',
```

这样，我们就基本解决了有服务器子目下运行的问题，

当然，如果你还用到了vue-router

要在router的配置中加上

```
export default new Router({
  mode: 'history',
  base: '/public/', //加上这一行
```

　用浏览器打开http://www.xxx.com/hot/

　一切运行正常，点击各种链接也能出来

*vue的history模式的坑，需要服务器来额外配置* 

但是由于我启用了history模式，我直接在浏览里访问 http://www.xxx.com/hot/item/1 这样的url是又404了


## vue 的 history 模式的坑

为什么 我可以在首页通过点击进入 http://www.xxx.com/hot/item/1 这个页面，但是直接访问又不行呢，

因为在history 模式下，只是动态的通过js 操作window.history 来改变有浏览器地址栏里的路径，并没有发起http请求，但当你直接 在浏览器里输入这个地址的时候 就一定要先对服务器放起http请求，但是这个目标在服务器上又不存在所以就返回了404了，怎么解决呢，就是把所有的请求全部转发到http://www.xxx.com/hot/index.hmtl上就可以了　




# 使用 vue 前后端分离测试

1.修改vue项目的 config/index.js 的 build 打包时以下配置

如我们想改为入口文件生成在 app/view/admin.html, 静态资源放在 app/public/ , 引用资源时 /public/demo.png可参考

```
  build: {
    // Template for index.html
    // index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    // assetsRoot: path.resolve(__dirname, '../dist'),
    // assetsSubDirectory: 'static',
    // assetsPublicPath: '/',

    /**
     * 在 egg 框架中，修改为下面配置
     */
    index: path.resolve(__dirname, '../dist/admin.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'admin',
    assetsPublicPath: '/public/',
```

如果不想分成两个项目做开发的话，可以合并 vue 和 egg 的开发目录，可以自己合并开发结构，也可以使用wasywebpack搭建好的架子