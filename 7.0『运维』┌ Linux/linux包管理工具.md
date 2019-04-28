

参考文档：https://linux.cn/article-8782-1.html

# 包管理

大多数现代的类 Unix 操作系统都提供了一种中心化的机制用来搜索和安装软件

软件通常都是存放在存储库中，并通过包的形式进行分发。

处理包的工作被称为包管理。

包提供了操作系统的基本组件，以及共享的库、应用程序、服务和文档。

包管理系统除了安装软件外，它还提供了工具来更新已经安装的包。

包存储库有助于确保你的系统中使用的代码是经过审查的，并且软件的安装版本已经得到了开发人员和包维护人员的认可。


# 包管理系统：简要概述

大多数包系统都是围绕包文件的集合构建的。

包文件通常是一个存档文件，它包含已编译的二进制文件和软件的其他资源，以及安装脚本。

包文件同时也包含有价值的元数据，包括它们的依赖项，以及安装和运行它们所需的其他包的列表。


虽然这些包管理系统的功能和优点大致相同，但打包格式和工具却因平台而异：

```
操作系统	 格式	 工具
Ubuntu	    .deb	apt, apt-cache, apt-get, dpkg
CentOS	    .rpm	yum
```

## Ubuntu

Ubuntu，它的包格式是 .deb 

APT 这款先进的包管理工具提供了大多数常见的操作命令：搜索存储库、安装软件包及其依赖项，并管理升级

在本地系统中，我们还可以使用 dpkg 程序来安装单个的 deb 文件，APT 命令作为底层 dpkg 的前端，有时也会直接调用它

## CentOS

CentOS、Fedora 和其它 Red Hat 家族成员使用 RPM 文件。在 CentOS 中，通过 yum 来与单独的包文件和存储库进行交互。


# 更新包列表

大多数系统在本地都会有一个和远程存储库对应的包数据库，在安装或升级包之前最好更新一下这个数据库。另外，yum 和 dnf 在执行一些操作之前也会自动检查更新。当然你可以在任何时候对系统进行更新。
```
Ubuntu:	sudo apt-get update
CentOS:	yum check-update
```

# 更新已安装的包

在没有包系统的情况下，想确保机器上所有已安装的软件都保持在最新的状态是一个很艰巨的任务。

你将不得不跟踪数百个不同包的上游更改和安全警报。

虽然包管理器并不能解决升级软件时遇到的所有问题，但它确实使你能够使用一些命令来维护大多数系统组件。

Ubuntu	:
```
    sudo apt-get upgrade	    只更新已安装的包
    sudo apt-get dist-upgrade	可能会增加或删除包以满足新的依赖项
 	sudo apt upgrade	        和 apt-get upgrade 类似
 	sudo apt full-upgrade	    和 apt-get dist-upgrade 类似
```

CentOS:	

```
sudo yum update
```



# 搜索某个包

大多数发行版都提供针对包集合的图形化或菜单驱动的工具，我们可以分类浏览软件，这也是一个发现新软件的好方法。

然而，查找包最快和最有效的方法是使用命令行工具进行搜索。


Ubuntu

```
	apt-cache search search_string	 
 	apt search search_string

```

CentOS

```
	yum search search_string	 
 	yum search all search_string	搜索所有的字段，包括描述
```


# 查看某个软件包的信息

Ubuntu
```
	apt-cache show package	显示有关包的本地缓存信息
 	apt show package	 
 	dpkg -s package	显示包的当前安装状态
```

CentOS
```
	yum info package	 
 	yum deplist package	列出包的依赖
```


# 从存储库安装包

知道包名后，通常可以用一个命令来安装它及其依赖。你也可以一次性安装多个包，只需将它们全部列出来即可。

Ubuntu

```
	sudo apt-get install package	 
 	sudo apt-get install package1 package2 ...	        安装所有列出来的包
 	sudo apt-get install -y package	                    在 apt 提示是否继续的地方直接默认 yes
    sudo apt install package	                        显示一个彩色的进度条
```

CentOS
```
	sudo yum install package	 
 	sudo yum install package1 package2 ...	            安装所有列出来的包
 	sudo yum install -y package	                        在 yum 提示是否继续的地方直接默认 yes
```



# 从本地文件系统安装一个包

对于一个给定的操作系统，有时有些软件官方并没有提供相应的包，那么开发人员或供应商将需要提供包文件的下载。

你通常可以通过 web 浏览器检索这些包，或者通过命令行 curl 来检索这些信息。

将包下载到目标系统后，我们通常可以通过单个命令来安装它。

在 Ubuntu 系统上，dpkg 用来处理单个的包文件。如果一个包有未满足的依赖项，那么我们可以使用 gdebi 从官方存储库中检索它们。

在 CentOS 和 Fedora 系统上，yum 和 dnf 用于安装单个的文件，并且会处理需要的依赖。


Ubuntu
```
	sudo dpkg -i package.deb	 
 	sudo apt-get install -y gdebi && sudo gdebi package.deb	        安装 gdebi，然后使用 gdebi 安装 package.deb 并处理缺失的依赖
```

CentOS
```
	sudo yum install package.rpm
```


# 删除一个或多个已安装的包

由于包管理器知道给定的软件包提供了哪些文件，因此如果某个软件不再需要了，它通常可以干净利落地从系统中清除这些文件。

Debian / Ubuntu
```
	sudo apt-get remove package	 
 	sudo apt remove package	 
 	sudo apt-get autoremove	删除不需要的包
```

CentOS
```
	sudo yum remove package
```


# apt命令

Debian 家族发行版的管理员通常熟悉 apt-get 和 apt-cache。

较少为人所知的是简化的 apt 接口，它是专为交互式使用而设计的。

```
传统命令	                 等价的 apt 命令
apt-get update	            apt update
apt-get dist-upgrade	    apt full-upgrade
apt-cache search string	    apt search string
apt-get install package	    apt install package
apt-get remove package	    apt remove package
apt-get purge package	    apt purge package

```

虽然 apt 通常是一个特定操作的快捷方式，但它并不能完全替代传统的工具，它的接口可能会随着版本的不同而发生变化，以提高可用性。

如果你在脚本或 shell 管道中使用包管理命令，那么最好还是坚持使用 apt-get 和 apt-cache。



# 获取帮助

除了基于 web 的文档，请记住我们可以通过 shell 从 Unix 手册页（通常称为 man 页面）中获得大多数的命令。比如要阅读某页，可以使用 man

```
man page
```

在 man 中，你可以用箭头键导航。按 / 搜索页面内的文本，使用 q 退出。

Ubuntu
```
	man apt-get	更新本地包数据库以及与包一起工作
 	man apt-cache	在本地的包数据库中搜索
 	man dpkg	和单独的包文件一起工作以及能查询已安装的包
 	man apt	通过更简洁，用户友好的接口进行最基本的操作
```

CentOS
```
	man yum
```




