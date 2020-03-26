


# 代码

`单行代码`

```
代码块：代码之间分别用三个反引号包起来，且两边的反引号单独占一行
```

# 标题

```
# 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题
##### 这是五级标题
###### 这是六级标题
```

一般在#后跟个空格再写文字


# 字体

```
**这是加粗的文字**
*这是倾斜的文字*
***这是斜体加粗的文字***
~~这是加删除线的文字~~
```


# 引用

```
>这是引用的内容
>>这是引用的内容
>>>这是引用的内容
```

在引用的文字前加>即可。引用也可以嵌套，如加两个>>三个>>>n个...


# 分割线

```
---
***
```
三个或者三个以上的 - 或者 * 都可以



# 图片

```
![图片alt](图片地址 '图片title'')
```

图片alt就是显示在图片下面的文字，相当于对图片内容的解释。
图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加


# 超链接

```
[超链接名](超链接地址 "超链接title")
```
title可加可不加
```
[百度](http://baidu.com)
```


# 列表

无序列表:
```
- 列表内容
+ 列表内容
* 列表内容
```
注意：- + * 跟内容之间都要有一个空格

有序列表:
```
1.列表内容
2.列表内容
3.列表内容
```
数字加点, 注意：序号跟内容之间要有空格


# 表格

```
| 表头 | 表头 | 表头 |
| --- | --- | --- |
|第一行|第一行|第一行|
|第二行|第二行|第二行|
|第三行|第三行|第三行|
```

第二行分割表头和内容。
文字默认居左
两边加-：表示文字居中
右边加-：表示文字居右



# 语法高亮
[文档](http://alexgorbatchev.com/SyntaxHighlighter/manual/brushes/)

|Brush name		|Brush aliases					|File name				|
|ActionScript3	|as3, actionscript3				|shBrushAS3.js			|
|Bash/shell		|bash, shell					|shBrushBash.js			|
|ColdFusion		|cf, coldfusion					|shBrushColdFusion.js	|
|C#				|c-sharp, csharp				|shBrushCSharp.js		|
|C++			|cpp, c							|shBrushCpp.js			|
|CSS			|css							|shBrushCss.js			|
|Delphi			|delphi, pas, pascal			|shBrushDelphi.js		|
|Diff			|diff, patch					|shBrushDiff.js			|
|Erlang			|erl, erlang					|shBrushErlang.js		|
|Groovy			|groovy							|shBrushGroovy.js		|
|JavaScript		|js, jscript, javascript		|shBrushJScript.js		|
|Java			|java							|shBrushJava.js			|
|JavaFX			|jfx, javafx					|shBrushJavaFX.js		|
|Perl			|perl, pl						|shBrushPerl.js			|
|PHP			|php							|shBrushPhp.js			|
|Plain Text		|plain, text					|shBrushPlain.js		|
|PowerShell		|ps, powershell					|shBrushPowerShell.js	|
|Python			|py, python						|shBrushPython.js		|
|Ruby			|rails, ror, ruby				|shBrushRuby.js			|
|Scala			|scala							|shBrushScala.js		|
|SQL			|sql							|shBrushSql.js			|
|Visual Basic	|vb, vbnet						|shBrushVb.js			|
|XML			|xml, xhtml, xslt, html, xhtml	|shBrushXml.js			|

例如，js的代码查看上表，可以用 js, jscript, javascript 来表明是js的代码高亮
```
console.log(1)
```

```js
console.log(1)
```