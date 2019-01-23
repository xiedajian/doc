

node.js越来越热，应用的场景也越来越多。

但也因为是开源软件，所以具备大多数开源软件都存在的“版本问题”，版本发展很快，版本前后差异性大，

老系统用新版本node跑不过，全局安装的第三方组件和node版本相关造成全局版本混乱。



# 查看当前node版本:
```
$ node -v
v8.9.4
```

# Windows 系统中更新 node：

从 https://nodejs.org/download 下载最新的 msi 安装包并安装，中文官方下载地址：http://nodejs.cn/download/ ，


# Mac 通过 homebrew 安装
```
brew install node
```
> ps：Homebrew是一款Mac OS平台下的软件包管理工具，有安装、卸载、更新、查看、搜索等功能。你不用关心各种依赖和文件路径的情况，简单的一条指令，就可以实现包管理。



# 版本管理器

Node.js 发布了很多版本，使用一个版本管理器（NVM、nodist、n、nave、nodebrew）在同一台电脑管理多个node版本，是保持版本更新的简单方式


## n

安装工具n ，这个工具是专门用来管理node.js版本的:
```
$ sudo npm install -g n
/usr/local/bin/n -> /usr/local/lib/node_modules/n/bin/n
+ n@2.1.8
added 1 package from 4 contributors in 1.776s
```


安装最新版本的node.js:
```
$ sudo n stable
     install : node-v9.8.0
       mkdir : /usr/local/n/versions/node/9.8.0
       fetch : https://nodejs.org/dist/v9.8.0/node-v9.8.0-darwin-x64.tar.gz
######################################################################## 100.0%
   installed : v9.8.0
```


再次查看node.js版本:
```
$ node -v
v9.8.0
```



## nvm是node版本管理工具，主要特点：

1.可安装多版本的node。

2.灵活切换当前的node版本。

3.以沙箱方式全局安装第三方组件到对应版本的node中。

4.通过.vnmrc文件，方便灵活地指定各应用系统所需的node版本进行运行。

可惜目前只支持linux，OS系统。

接下来，就见证一下它的能力。 


# nvm





# Windows上node.js的多版本管理工具

在Linux上我一直使用nvm来管理nodejs的不同版本，但是nvm没有windows版本，

今天发现在windows上可以使用另外一个版本管理工具nvm-windows来管理


下载与安装

下载地址：https://github.com/coreybutler/nvm-windows/releases

安装前，这里有一点需要注意，如果以前安装过node，需要先卸载，并且要把目录清理干净


使用

查看当前已经安装的nodejs版本
```
C:\Users\kongxx> nvm list

No installations recognized.
```
因为是新安装，所以提示系统没有安装任何版本。


查看可以安装的nodejs版本：
```
C:\Users\kongxx> nvm list available

|   CURRENT    |     LTS      |  OLD STABLE  | OLD UNSTABLE |
|--------------|--------------|--------------|--------------|
|    8.8.1     |    6.11.5    |   0.12.18    |   0.11.16    |
|    8.8.0     |    6.11.4    |   0.12.17    |   0.11.15    |
|    8.7.0     |    6.11.3    |   0.12.16    |   0.11.14    |
|    8.6.0     |    6.11.2    |   0.12.15    |   0.11.13    |
|    8.5.0     |    6.11.1    |   0.12.14    |   0.11.12    |
|    8.4.0     |    6.11.0    |   0.12.13    |   0.11.11    |
|    8.3.0     |    6.10.3    |   0.12.12    |   0.11.10    |
|    8.2.1     |    6.10.2    |   0.12.11    |    0.11.9    |
|    8.2.0     |    6.10.1    |   0.12.10    |    0.11.8    |
|    8.1.4     |    6.10.0    |    0.12.9    |    0.11.7    |
|    8.1.3     |    6.9.5     |    0.12.8    |    0.11.6    |
|    8.1.2     |    6.9.4     |    0.12.7    |    0.11.5    |
|    8.1.1     |    6.9.3     |    0.12.6    |    0.11.4    |
|    8.1.0     |    6.9.2     |    0.12.5    |    0.11.3    |
|    8.0.0     |    6.9.1     |    0.12.4    |    0.11.2    |
|    7.10.1    |    6.9.0     |    0.12.3    |    0.11.1    |
|    7.10.0    |    4.8.5     |    0.12.2    |    0.11.0    |
|    7.9.0     |    4.8.4     |    0.12.1    |    0.9.12    |
|    7.8.0     |    4.8.3     |    0.12.0    |    0.9.11    |
|    7.7.4     |    4.8.2     |   0.10.48    |    0.9.10    |
```



安装指定版本的node:
这里安装了 6.10.0 和 7.10.0 两个版本
```
C:\Users\kongxx> nvm install 6.10.0 64-bit
...

C:\Users\kongxx> nvm install 7.10.0 64-bit
...
```


再次查看已安装的版本:
```
C:\Users\kongxx> nvm list

    7.10.0
    6.10.0
```


使用指定版本的node:
```
C:\Users\kongxx> nvm use 6.10.0
Now using node v6.10.0 (64-bit)

C:\Users\kongxx> nvm list

    7.10.0
  * 6.10.1 (Currently using 64-bit executable)

C:\Users\kongxx> node -v
v6.10.0
```


删除指定版本的node:
```
C:\Users\kongxx> nvm uninstall 7.10.0
...
```