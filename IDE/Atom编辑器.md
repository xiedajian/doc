
参考文档：https://www.jianshu.com/p/1c7c9521d31b
参考文档：https://www.cnblogs.com/libin-1/p/6638165.html

# Atom

下载安装Atom：https://atom.io/



刚刚体验了一下Atom编辑器，太酷了，而且开源免费；只可惜是英文版，不过呢可以通过插件的办法来将它汉化消除掉语言障碍！




## Atom编辑器汉化方法：


Atom编辑器汉化插件托管在github上，项目地址：https://github.com/chinakids/atom-simplified-chinese-menu

当然也可以跳过项目介绍直接下载：https://github.com/chinakids/atom-simplified-chinese-menu/archive/master.zip

将下载好后的汉化版文件夹解压到当前用户目录下的.atom\packages文件夹中

linux系统路径：~/.atom/packages
windows系统：C:\Users\Administrator\.atom\packages （Administrator是当前系统登录用户）

重启Atom编辑器后就变成中文的了

## 安装插件

File 》 Settings 》 Install 》 搜索插件


汉化插件 	simplified-chinese-menu
同步滚动插件 markdown-scroll-sync
json格式 	pretty-json



## 把atom作为markdown编辑器

市面上专门的markdown编辑器功能不能令人满意，并且大多数要收费。atom是代码编辑器，但它的markdown编辑功能很好用，vim模式、对中文的良好支持、实时预览、markdown转化为PDF或者图片等功能正好满足自己的需求，最重要的是免费。


要把atom作为markdown编辑器，需要安装几个插件，列于下：

```

markdown-writer 				，markdown编辑器插件
markdown-toc  					,markdown目录生成插件
vim-mode-plus					,编辑器vim模式插件(可选)
markdown-table-editor		 	,便于表格编辑
markdown-themeable-pdf 			，markdown转化为PDF或者图片,markdown-preview-enhanced也有pdf导出功能,但有点问题
pdf-view 						,pdf预览插件，使markdown-themeable-pdf转化的pdf可自动预览。
language-markdown 				,markdown语法高亮插件。(可选)
markdown-preview-enhanced 		.语法高亮，双向实时预览。(必装)
language-gfm-enhanced 			。与markdown-preview-enhanced配套。
git-plus 						. git插件
script 							. 运行各种代码和脚本，如javascript等。
markdown-image-paste 			,从剪贴板粘贴图像到本地或七牛或sm.sm

```

安装markdown-themeable-pdf后，在进行pdf转化时，可能会出现转化失败的情况，原因是node.js未安装phantomjs。可在nodejs命令行窗口中执行npm install phantomjs-prebuilt进行安装，
