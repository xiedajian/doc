

# Ubuntu 16.04 安装 node

node当前版本 node-v8.11.3-linux-x64.tar.xz



#node 和 npm 的安装

## 方法1： 下载二进制文件进行安装
下载并解压 node-v8.11.3-linux-x64.tar.xz

```
sudo tar -xJf node-v8.11.3-linux-x64.tar.xz
```
移到通用的软件安装目录 /opt/ 
```
sudo  mv node-v8.11.3-linux-x64 /opt/
```


配置环境变量：
```

echo 'export PATH=$PATH:/opt/node-v8.11.3-linux-x64/bin' >> /etc/profile

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

```
sudo apt-get update
sudo apt-get install -y nodejs
node -v
npm -v
```


# 设置 npm 使用淘宝源

建议把 npm 的源切换到 淘宝源。 获取安装cnpm，使用cnpm。

临时使用淘宝源
```
npm --registry https://registry.npm.taobao.org install node-red-contrib-composer@latest
```
全局配置切换到淘宝源

```
 npm config set registry https://registry.npm.taobao.org
```


全局配置切换到官方源
```
 npm config set registry http://www.npmjs.org
```

检测是否切换到了淘宝源
```
npm info underscore

```

```
...
gitHead: 'e4743ab712b8ab42ad4ccb48b155034d02394e4d',
  dist: 
   { shasum: '4f3fb53b106e6097fcf9cb4109f2a5e9bdfa5022',
     size: 34172,
     noattachment: false,
    //　有　registry.npm.taobao.org　等字样　　说明切换成功
     tarball: 'http://registry.npm.taobao.org/underscore/download/underscore-1.8.3.tgz' },
  directories: {},
  publish_time: 1427988774520 }

```
