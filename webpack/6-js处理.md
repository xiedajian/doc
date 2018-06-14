

如何压缩js

打包完以后，JS需要压缩上线

1.在webpack4.x版本中

    --mode production 表示生产环境,只要配置在package.json的script里面 js自动就压缩了
2.之前版本是如何做到的

使用uglifyjs-webpack-plugin