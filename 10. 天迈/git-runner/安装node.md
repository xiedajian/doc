

由于服务器没有联网，所以从官网下载来安装

1.从官网下载linux版本，并ftp传到服务器

2. 解压
```
tar -xvf node-v10.9.0-linux-x64.tar.xz
```

3.建立软连接，变为全局
```
 ln -s /opt/software/nodejs/bin/npm /usr/local/bin/ 

 ln -s /opt/software/nodejs/bin/node /usr/local/bin/
```