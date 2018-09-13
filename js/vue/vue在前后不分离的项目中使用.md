



# vue 在前后不分离的项目中怎么使用

Vue默认build路径是项目的dist目录下

有时候我们可能希望build之后的文件自动放在本机的某个其他路径下

可以通过修改 vue项目的 /config/index.js 中修改 build 打包时以下配置来实现

```
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
  }
```
上面默认的配置会把项目打包到 dist 目录，入口生成为 dist/index.html , 引用的资源例如 /static/demo.png

如果我们参考egg框架目录，想改为入口文件生成在 app/view/admin.html, 静态资源放在 app/public/ , 引用资源时 /public/demo.png
```
  build: {

    // 生成的单页面的位置
    index: path.resolve(__dirname, '../dist/admin.html'),

    // 页面中引用资源的
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 静态资源的放置目录
    assetsSubDirectory: 'admin',
    // 公共静态资源路径前缀
    assetsPublicPath: '/public/',
  }

```
 assetsRoot: path.resolve(__dirname, '../dist'),