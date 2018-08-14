

# weex

Weex 目前提供了两个脚手架工具来辅助开发和调试：weex-toolkit 和 weexpack


# weexpack

weexpack 是 weex 新一代的工程开发套件，是基于weex快速搭建应用原型的利器。

它能够帮助开发者通过命令行创建weex工程，添加相应平台的weex app模版，并基于模版从本地、GitHub 或者 weex 应用市场安装插件，

快速打包 weex 应用并安装到手机运行，对于具有分享精神的开发者而言还能够创建weex插件模版并发布插件到weex应用市场


# 安装

首先，全局安装 weex-pack 命令：

```
$ npm install -g weexpack
```

创建 weexpack 工程

```
$ weexpack create appName
$ cd project-name
$ npm install
$ weexpack  platform add android
$ weexpack  run android
$ weexpack  build android
```

web:
```
weexpack build web
weexpack run web
```


其他命令：

```
weexpack create — 创建 weex 工程项目。

weexpack platform add/remove — 安装／移除 weex 应用模版，默认模版支持 weex bundle 调试和插件机制。

weexpack platform list — 查看已安装的平台模版及版本。

weexpack platform run - 打包应用并安装到设备运行。

插件使用者命令

weexpack plugin add/remove — 安装／移除 weex 插件，支持从本地、GitHub 或者 weex 应用市场安装插件。

weexpack plugin list — 查看已安装的插件及版本。

插件开发者命令

weexpack plugin create - 生成weex插件模版，主要是配置文件和必需的目录。

weexpack plugin publish - 发布插件到weex插件市场。

```