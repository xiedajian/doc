

文档： http://www.runoob.com/linux/linux-command-manual.html



一、常用操作以及概念
快捷键
Tab：命令和文件名补全；
Ctrl+C：中断正在运行的程序；
Ctrl+D：结束键盘输入（End Of File，EOF）

## 求助
1. --help
指令的基本用法与选项介绍。

2. man
man 是 manual 的缩写，将指令的具体信息显示出来。

当执行man date时，有 DATE(1) 出现，其中的数字代表指令的类型，常用的数字及其类型如下：

```
	代号	类型
	1	用户在 shell 环境中可以操作的指令或者可执行文件
	5	配置文件
	8	系统管理员可以使用的管理指令
```

3. info
info 与 man 类似，但是 info 将文档分成一个个页面，每个页面可以进行跳转。



# 1.打包及压缩 
window: zip,rar 
linux: gz, bzip, zip


# 2.软件的安装及卸载(ubuntu) 
1.离线 
sudo dpkg -i 文件名 
sudo dpkg -r 包名 
在线 
sudo apt-get -install 包名 
sudo apt-get -remove 包名

# vim的使用 
1.一般模式 
默认进入的模式，只能查看，不能编辑， i 进入插入模式 
2.编辑模式 
可以编辑文档， esc进入一般模式 
3.命令模式 
在一般模式中， ： 进入

# 4.关于加密 
1.对称加密（加密秘钥与解密秘钥相同 
des, aes 
2.非对称加密 
rsa 
数字摘要(电子合同，防耍赖等) 
md5 sha1

# 5.linux目录结构介绍 
bin: 存放的可执行的二进制文件 
cd ls su passwd 
boot: 存放系统的引导文件的目录 
dev: 存放设备文件的目录，linux把设备当文件来处理 
etc: 粗放系统的配置文件的目录 
home: 存放所有用户文件的目录， root用户除外 
lib： 共享库 
usr: 好比program files,存放应用程序 
opt: 自定义存放应用的位置 
mnt: 临时文件系统的挂靠点


# 6.文件权限(8进制) 
- :普通文件 -d :目录 -l :连接文件 
文件默认权限： -rw-r–r– 644 
目录默认权限： drwxr-xr-x 755

# 7.开关机命令（需要超级用户授权 
sudo shutdown -h 
now 马上 
12:30 在某个时间点 
3 几分钟之后 
sudo shutdown -r 重启


# 8.linux文件操作命令 
1. ls, mkdir, cd, touch, cat(more), 
2. echo 重定向 echo “content”->a.txt 
->覆盖模式 
->>追加模式 
3. cp, mv, rm(fi) 
4. wc ： word count 
行数 单词书 字符数 
wc bj.txt 
5. ln: 创建连接文件 
硬连接：ln aa.txt aa.link 
软连接： ln -s aa.txt aa.link 
6. pwd 
查看当前目录的绝对路径 
7. 管道命令(某一个命令的输出，作为下一个命令的输入) 
ls -la | wc 
8. passwd 
ubuntu默认是没有开启root账号的，为其设置密码就可以开启了 
9. su 切换用户


# 9.linux系统命令 
1. stat 查看当前用户信息 
2. who与whom 
who: 查看在线的用户 
whoami: 查看当前用户 
3. hostname: 查看当前主机名 
4. uname: 显示系统信息 
-a 显示完整的系统信息 
5.top：显示当前耗时的进行的信息， 每3秒刷新一次 
ctrl + c退出 
kill + pid 杀死进程 
6. ps： 显示当前进程的快照 
-axu 
7. du: 显示文件的大小信息 
8. df: 显示磁盘的使用情况 
9. clear:清除屏幕 windows:cos 
10. man: 帮助命令 
11.ifconfig: 查看或者设置网卡信息 
12. netstat:网络详细信息 
13. useradd 
查看用户信息 
sudo cat/etc/passwd 
itcast:x:1000:1000:UbuntuA,,,:/home/itcast:/bin/bash 
- itcast: 用户名 
- x :密码, 已经加密了，密码放在 /etc/shadow中，也加密了 
- 1000： userId 
- 1000: groupId 
- UbuntuA,,, : 账号描述 
- /home/itcast: 该账号存放文件的默认位置 
- /bin/bash: 该用户的shell脚本的解析方式， sh, bash, brash 
创建用户 
user add lijun -d /home/lijun -s /bin/bash 
-d： 指定用户的home路径 
-s: 指定用户的shell解析方式

步骤：
    1.创建/home/lijun
    2.创建用户 user add
    3.passwd 设置命令
    4.su 切换用户       

