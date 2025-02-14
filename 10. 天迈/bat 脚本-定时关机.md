
# 定时晚上20:01休眠

```
@echo off
:loop
rem 获取当前时间
for /f "tokens=1-2 delims=:" %%a in ("%time%") do (
    set hour=%%a
    set minute=%%b
)

rem 检查当前时间是否为 20:01
if "%hour%"=="20" if "%minute:~0,2%"=="01" (
    shutdown /h
    exit
)

rem 等待 60 秒后再次检查
timeout /t 60 >nul
goto loop
```


### 代码说明
:loop：定义一个标签，用于循环。
for /f "tokens=1-2 delims=:" %%a in ("%time%")：获取当前时间的小时和分钟。
if "%hour%"=="20" if "%minute:~0,2%"=="01"：检查当前时间是否为 20:01。
shutdown /h：如果是 20:01，则执行休眠命令。
timeout /t 60 >nul：如果不是 20:01，等待 60 秒后再次检查。


注意事项
这个脚本会在后台运行，直到达到指定的时间（20:01），然后将计算机休眠。
如果你希望在计算机启动时自动运行这个脚本，可以将其添加到启动文件夹中，或者使用任务计划程序设置定时任务。