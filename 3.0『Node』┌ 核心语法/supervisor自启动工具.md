


# supervisor

supervisor 会不停的 watch 你应用下面的所有文件，发现有文件被修改，就重新载入程序文件这样就实现了部署，修
改了程序文件后马上就能看到变更后的结果。

麻麻再也不用担心我的重启 nodejs 了！


1. 首先安装 supervisor
   
npm install -g supervisor


2. 使用 supervisor 代替 node 命令启动应用


```
    supervisor test.js
```