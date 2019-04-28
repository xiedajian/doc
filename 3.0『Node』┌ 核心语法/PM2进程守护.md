
npm文档: https://www.npmjs.com/package/pm2

# nodejs 进程守护

如果直接通过node app来启动，如果报错了可能直接停在整个运行，

supervisor感觉只是拿来用作开发环境的。最常见的线上部署nodejs项目的有forever,pm2这两种。

使用场合:

supervisor是开发环境用。
forever管理多个站点，每个站点访问量不大，不需要监控。
nodemon 是开发环境使用，修改自动重启。
pm2 网站访问量比较大,需要完整的监控界面。



# PM2

pm2 是一个带有负载均衡功能的Node应用的进程管理器。可以把你的独立代码利用全部的服务器上的所有CPU，并保证进程永远都活着，0秒的重载。


主要特征：
- 1、内建负载均衡（使用Node cluster 集群模块） 
- 2、后台运行 
- 3、0秒停机重载 
- 4、具有Ubuntu和CentOS 的启动脚本 
- 5、停止不稳定的进程（避免无限循环） 
- 6、控制台检测 
- 7、提供 HTTP API 
- 8、远程控制和实时的接口API ( Nodejs 模块,允许和PM2进程管理器交互 )


## pm2的安装：

```
npm install -g pm2
```


## 用法

最简单的用法  
```
pm2 start app.js
```
您可以像这样启动任何应用程序（Node.js，Python，Ruby，$ PATH中的二进制文件......）

您的应用程序现在已被守护，监控并永远保持活力。


列出所有正在运行的应用
```
pm2 list
```

管理应用程序非常简单：

```
$ pm2 stop      < app_name | id | 'all' | json_conf >           # 停止
$ pm2 restart   < app_name | id | 'all' | json_conf >           # 删除
$ pm2 delete    < app_name | id | 'all' | json_conf >           # 重启
$ pm2 reload    <app_name  | id | all >                         # 重载
```

要了解特定应用程序的更多详细信息
```
$ pm2 describe   < id | app_name >
```

要监控日志，自定义指标，应用程序信息：
```
$ pm2 monit
```



更多用法：
```
pm2 start app.js -i 4   // 后台运行pm2，启动4个app.js 
                        // 也可以把'max' 参数传递给 start
                        // 正确的进程数目依赖于Cpu的核心数目
pm2 start app.js --name my-api // 命名进程
pm2 list               // 显示所有进程状态
pm2 monit              // 监视所有进程
pm2 logs               //  显示所有进程日志
pm2 stop all           // 停止所有进程
pm2 restart all        // 重启所有进程
pm2 reload all         // 0秒停机重载进程 (用于 NETWORKED 进程)
pm2 stop 0             // 停止指定的进程
pm2 restart 0          // 重启指定的进程
pm2 startup            // 产生 init 脚本 保持进程活着
pm2 web                // 运行健壮的 computer API endpoint 
pm2 delete 0           // 杀死指定的进程
pm2 delete all         // 杀死全部进程

```
pm2运行进程的不同方式：

```
pm2 start app.js -i max  // 根据有效CPU数目启动最大进程数目
pm2 start app.js -i 3      // 启动3个进程
pm2 start app.js -x        //用fork模式启动 app.js 而不是使用 cluster
pm2 start app.js -x -- -a 23   // 用fork模式启动 app.js 并且传递参数 (-a 23)
pm2 start app.js --name serverone  // 启动一个进程并把它命名为 serverone
pm2 stop serverone       // 停止 serverone 进程
pm2 start app.json        // 启动进程, 在 app.json里设置选项
pm2 start app.js -i max -- -a 23                   //在--之后给 app.js 传递参数
pm2 start app.js -i max -e err.log -o out.log  // 启动并生成一个配置文件
pm2 start app.js --watch   #实时监控app.js的方式启动，当app.js文件有变动时，pm2会自动reload

// 也可以执行用其他语言编写的app  ( fork 模式):
pm2 start my-bash-script.sh    -x --interpreter bash
pm2 start my-python-script.py -x --interpreter python
```


# 

