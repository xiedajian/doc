
[原文](https://www.cnblogs.com/zgh-blog/p/htmlToWord.html)



# html 导出 doc

目前没有发现有任何一个相应的库可以简单，准确，有格式的实现将指定内容转换为word导出。


尝试的方法：

## ActiveXObjecttoWordExcel

 那么最先找到的是ActiveXObjecttoWordExcel：JavaScript中ActiveXObject对象是启用并返回 Automation对象的引用。并且此对象仅在IE中支持，所以...这种显然不适合我们大多数人使用。如果你的需求只是IE6以上的话，那么这不失为一种解决方法。
 
 
## html-docx.js
 
 第二种：html-docx，需要借助富文本编辑器，这个需要借助一个富文本编辑器，并将需要导入的内容写到富文本编辑器后在进行导出，，这种方式确实是可以导出的，不过如果你的界面没有富文本编辑器，就需要虚拟创建一个富文本编辑器并将内容放入，然后再进行导出。不过略显麻烦。
 
 
 
## wordexport.js

第三种：wordExport:也是我选取的方法。他可以将你需要的内容，不论是图片，标题，表格，内容等导出为word，但是你会发现没有什么格式可言，我采用的是最笨的方法（没有发现可以控制格式的方法，如果你有，请联系我 TT），所有的格式包括首页等都是通过css控制进而写入的，展示效果还算不错。

 那么，如果你没有很好的库的支持，或者更好的办法（找到请分享哈），去导出图片，表格，内容到word，并且还包含格式控制，却需要做这么一个功能的话，我写了一个demo放在github, 你可以配置任何你需要的动态数据内容仅仅通过js。
 
 htmlToWordDemo的git地址：https://github.com/ch-zgh-1993/htmlToWordDemo  仅仅是一个demo（包含格式），若你加上你的内容，稍加修改，将会格局清晰，内容完整。