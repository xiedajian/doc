.bat 是什么文件

.bat 文件是 Windows 系统的批处理文件（Batch file），用于执行一系列命令。



基本语法示例：

```
@echo off
:: 这是注释
echo 开始执行命令...

:: 设置变量
set name=world

:: 使用变量
echo Hello %name%

:: 暂停，等待用户按键
pause
```



常用命令：

```
@echo off      :: 关闭命令回显
echo 文本      :: 显示文本
set 变量=值    :: 设置变量
cd 路径       :: 切换目录
mkdir 文件夹   :: 创建目录
del 文件      :: 删除文件
pause        :: 暂停执行
if 条件      :: 条件判断
goto 标签     :: 跳转到标签
exit		:: 退出
call     	:: 命令用于在批处理程序中调用另一个批处理程序或标签。
```





案例

```
@echo off

:: 设置简单标题
title 我的程序

echo 1. 启动开发环境
echo 2. 构建项目
echo 3. 退出

set /p choice=请选择操作(1-3):

if "%choice%"=="1" (
    npm run dev
) else if "%choice%"=="2" (
    npm run build
) else if "%choice%"=="3" (
    exit
)

pause
```

`/p` 是 `set` 命令的一个参数，用于从用户输入获取值。

set /p choice=请选择操作(1-3):





call 调用其他命令

```
:: 基本语法
call other.bat

:: 带参数
call other.bat param1 param2

:: 带路径
call "C:\Scripts\other.bat"

:: 调用 vue-cli 打包
call npm run build
```







中文显示乱码

在文件开头添加编码设置：

```
@echo off
chcp 65001
:: 或者用 936 (GB2312)
:: chcp 936

echo 中文测试
pause
```

chcp 命令最好加上 >nul 来隐藏输出

```
@echo off
:: 设置代码页为 UTF-8
chcp 65001 >nul
```

