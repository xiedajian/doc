
# cnpm

至于node-sass安装失败的问题，用淘宝源可解决，具体方法这么做：

项目根目录创建npm配置文件 .npmrc 写入下面这句就可以了，用npm命令安装
```
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```