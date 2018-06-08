Ctrl + / 		 	---------------------注释
Ctrl + 滚动		　	--------------字体变大/缩小
Ctrl + N 			-------------------新建
Ctrl+Shift +k       -----------删除一行


Ctrl + Shift + D ---------复制这行文本

SHift +Tab --------------去除缩进 


Ctrl + 回车 -----------添加一行空行

Ctrl + Shift +V --------粘贴过程中保持缩进


	
/***
  * 自定义快捷键
  *
  */
1、 代码格式化
  Edit  ->  Line  ->  Reindent  
  添加快捷键绑定设置

  Preference  ->  Key Bindings -user 
  	{ "keys": ["ctrl+alt+l"], "command": "reindent" },
	{ "keys": ["ctrl+d"], "command": "duplicate_line" },
	{ "keys": ["ctrl+y"], "command": "run_macro_file", "args": {"file": "res://Packages/Default/Delete Line.sublime-macro"} },
