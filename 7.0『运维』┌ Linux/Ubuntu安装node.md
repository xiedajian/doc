

# Ubuntu 16.04 安装 node

node当前版本 node-v8.11.3-linux-x64.tar.xz



#node 和 npm 的安装

## 方法1： 下载源码进行安装


下载源码到当前目录，你需要在https://nodejs.org/en/download/下载最新的Nodejs版本，本文以v10.15.1为例:
```
wget https://nodejs.org/dist/v10.15.1/node-v10.15.1.tar.gz
```

解压
```
sudo tar -xvf node-v10.15.1.tar.gz
```

移到通用的软件安装目录 /opt/ 
```
sudo  mv node-v10.15.1 /opt/
```

配置环境变量：
```

echo 'export PATH=$PATH:/opt/node-v10.15.1/bin' >> /etc/profile

```


编译/etc/profile 使配置生效
```
source /etc/profile 
```

验证是否安装成功： 
```
node -v         // v8.11.3
npm -v          // 5.6.0
```



## 方法2： 使用apt-get安装  

更新ubuntu软件源
```
sudo apt-get update
node -v
npm -v
```

安装nodejs, 不过这样装的版本太旧，利用 n 升级版本 
```
sudo apt-get install nodejs
sudo apt install nodejs-legacy
sudo apt install npm
```

全局切换npm的包镜像源，方便快速下载
```
sudo npm config set registry https://registry.npm.taobao.org
sudo npm config list				# 查看是否切换源
```

全局安装n管理器(用于管理nodejs版本)
```
sudo npm install n -g
```

安装最新的nodejs
```
sudo n stable	//升级为最新稳定版本的node.js
sudo n latest   //升级为最新版本的node.js
sudo n 10.15.1	//升级为特定的v10.15.1版本
node -v
npm -v
```

