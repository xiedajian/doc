## 什么是CLI
CLI（command-line interface 命令行界面）是指在图形用户界面得到普及之前使用最为广泛的用户界面，它通常不支持鼠标，用户通过键盘输入指令，计算机接收到指令后，予以执行。也有人称之为字符用户界面（CUI）

### 1
进入开发目录，执行

npm init

将会创建 package.json和默认的配置。当然手动创建也没有问题

### 2
在package.js文件中，需要新增
```
"bin": {
    "xdj-cli": "bin/index.js"
  }
```
其中xdj-cli是需要执行的命令名，bin/index.js是命令所调用的文件

调试
到此，准备工作已经完成了，接下来我们在index.js文件中写入

console.log('my first cli');


