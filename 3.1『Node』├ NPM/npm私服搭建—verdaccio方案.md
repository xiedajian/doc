

# npm私服搭建

verdaccio搭建私服很简单


# verdaccio

1.首先我们需要向运维同学申请一台linux服务器，给台2GB左右的虚拟机就够用了；
2.找个合适的地方下载安装nodejs，比如在/usr/local/lib下
安装wget：yum install -y wget；（已经安装的跳过这步）
下载：wget https://nodejs.org/dist/v10.6.0/node-v10.6.0-linux-x64.tar.xz;
解压：tar -xvf node-v10.6.0-linux-x64.tar.xz;
重命名安装目录：mv node-v10.6.0-linux-x64 nodejs;
建立软连接：
ln -s /usr/local/lib/nodejs/bin/npm /usr/local/bin/
ln -s /usr/local/lib/nodejs/bin/node /usr/local/bin/
执行node -v和 npm -v命令检查是否安装成功
3.全局安装verdaccio：npm i verdaccio -g;
4.全局安装pm2，用来守护node进程：npm i pm2 -g;
5.pm2启动服务，执行pm2 start verdaccio

//现在外网就可以通过http://ip:4873 访问了 



## verdaccio使用方式

verdaccio允许任何人创建账号，若没有配置verdaccio的配置文件config.yaml，则默认任何注册了verdaccio的开发都有publish权限。

publish仓库的步骤很简单，创建用户 -> 设置npm源 -> npm publish。



详细教程可参考 [](https://www.jianshu.com/p/d32ce7e9d4d8)



