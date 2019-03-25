

Linux系统没有自带的压缩解压工具；需要我们自己安装；当用到zip或者unzip如果没有安装就会出现unzip: Command Not Found 或 zip: Command Not Found;出现这个是因为没有安装unzip和zip；


# zip

```
apt-get install zip
```

```
zip -r mydata.zip mydata 				# 当前目录下压缩mydata目录为 mydata.zip
zip -r abc123.zip abc 123.txt			# 把当前目录下面的abc文件夹和123.txt压缩成为abc123.zip
unzip mydata.zip -d mydatabak			# 把当前目录下面的mydata.zip解压到mydatabak目录里面
unzip wwwroot.zip						# 当前目录下解压wwwroot.zip
```




# 主要参数

-c：将解压缩的结果
-l：显示压缩文件内所包含的文件
-p：与-c参数类似，会将解压缩的结果显示到屏幕上，但不会执行任何的转换
-t：检查压缩文件是否正确
-u：与-f参数类似，但是除了更新现有的文件外，也会将压缩文件中的其它文件解压缩到目录中
-v：执行是时显示详细的信息
-z：仅显示压缩文件的备注文字
-a：对文本文件进行必要的字符转换
-b：不要对文本文件进行字符转换
-C：压缩文件中的文件名称区分大小写
-j：不处理压缩文件中原有的目录路径
-L：将压缩文件中的全部文件名改为小写
-M：将输出结果送到more程序处理
-n：解压缩时不要覆盖原有的文件
-o：不必先询问用户，unzip执行后覆盖原有文件
-P：使用zip的密码选项
-q：执行时不显示任何信息
-s：将文件名中的空白字符转换为底线字符
-V：保留VMS的文件版本信息
-X：解压缩时同时回存文件原来的UID/GID