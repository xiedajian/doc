
文档： http://www.runoob.com/linux/linux-remote-login.html

# 远程连接服务器

Linux一般作为服务器使用，而服务器一般放在机房，你不可能在机房操作你的Linux服务器。

这时我们就需要远程登录到Linux服务器来管理维护系统。

Linux系统中是通过ssh服务实现的远程登录功能，默认ssh服务端口号为 22。

Window系统上 Linux 远程登录客户端有SecureCRT, Putty, SSH Secure Shell等



# ssh

SSH 为 Secure Shell 的缩写

SSH 为建立在应用层基础上的安全协议。

SSH 是目前较可靠，专为远程登录会话和其他网络服务提供安全性的协议。





# putty.exe

PuTTY是一款开源(Open Source Software)的连接软件，主要由Simon Tatham维护，使用MIT许可证授权。

包含的组件有：PuTTY, PuTTYgen,PSFTP, PuTTYtel, Plink, PSCP, Pageant,默认登录协议是SSH，默认的端口为22。

Putty是用来远程连接服务器的，支持SSH、Telnet、Serial等协议的连接。其中最常用的是SSH。

用它来远程管理Linux十分好用，其主要优点如下：

◆ 完全免费;

◆ 在Windows 9x/NT/2000下运行的都非常好;

◆ 全面支持SSH1和SSH2；

◆ 绿色软件，无需安装，下载后在桌面建个快捷方式即可使用；

◆ 体积很小，不到1M；

◆ 操作简单，所有的操作都在一个控制面板中实现



# Putty的下载安装教程如下：

1 去putty官网下载对应位数的软件到本地，下载地址：https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html

2 下载得到的直接是一个文件名为putty.exe的可执行文件，不需要安装即可使用


双击打开后，进入Putty的主界面

之后输入 ： host Name (or Ip) 然后SSH连接，

输入账号 密码

远程登录成功之后，就可以在Putty里进行操作了。

操作方式和在虚拟机（或服务器）上操作一样了，甚至还要方便。

因为Putty里支持复制和粘贴，可以很便捷的操作。

最后需要注意一点，Putty的登录信息一般会保存在本机上，所以在使用公用电脑的时候，务必要注意清除登录信息


# 终端利用ssh登录远程服务器

安装ssh：

yum install ssh

启动ssh：

service sshd start

登录远程服务器：

ssh -p 50022 my@127.0.0.1

输入密码：

my@127.0.0.1:

-p 后面是端口

my 是服务器用户名

127.0.0.1 是服务器 ip

回车输入密码即可登录