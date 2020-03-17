# weui

WeUI 是一套与微信原生 UI 一致的 UI 库，核心文件是 weui.css，只需要获取到该文件，然后在页面中引入，即可使用 WeUI 的组件。


# 安装

有以下几种获取方式

方式一（推荐）
微信官方、BootCDN 和 cdnjs 为 WeUI 提供了 CDN 链接，推荐使用，链接如下：

```
来源	    地址
微信官方	 //res.wx.qq.com/open/libs/weui/1.1.3/weui.min.css
微信官方	 //res.wx.qq.com/open/libs/weui/0.4.3/weui.min.css
BootCDN	    //cdn.bootcss.com/weui/0.4.3/style/weui.css
cdnjs	    //cdnjs.cloudflare.com/ajax/libs/weui/0.4.3/style/weui.css
```

方式二（bower）
可以通过 bower 进行下载，命令如下：

bower install --save weui

方式三（npm）

也可以通过 npm 进行下载，命令如下：

npm install --save weui

方式四

可以在 https://github.com/weui/weui/releases 处，直接下载最新发布的版本。github 提供了 zip 和 tar.gz 两种格式的包，选择其中一种下载，解压后引用 dist/style/weui.css 文件即可。


# 使用

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
        <title>WeUI</title>
        <!-- 引入 WeUI -->
        <link rel="stylesheet" href="path/to/weui/dist/style/weui.min.css"/>
    </head>
    <body>
        <!-- 使用 -->
        <a href="javascript:;" class="weui-btn weui-btn_primary">绿色按钮</a>
    </body>
</html>
```











