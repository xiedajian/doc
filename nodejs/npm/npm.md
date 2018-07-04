

# npm

一、从 npm install 说起
npm install 命令用来安装模块到node_modules目录。


$ npm install <packageName>
安装之前，npm install会先检查，node_modules目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。

如果你希望，一个模块不管是否安装过，npm 都要强制重新安装，可以使用-f或--force参数。


$ npm install <packageName> --force


如果想更新已安装模块，就要用到npm update命令。


$ npm update <packageName>
它会先到远程仓库查询最新版本，然后查询本地版本。如果本地版本不存在，或者远程版本较新，就会安装。


### 模块的安装过程
总结一下，Node模块的安装过程是这样的。

1. 发出npm install命令

2. npm 向 registry 查询模块压缩包的网址

3. 下载压缩包，存放在~/.npm目录

4. 解压压缩包到当前项目的node_modules目录

注意，一个模块安装以后，本地其实保存了两份。一份是~/.npm目录下的压缩包，另一份是node_modules目录下解压后的代码。

但是，运行npm install的时候，只会检查node_modules目录，而不会检查~/.npm目录。也就是说，如果一个模块在～/.npm下有压缩包，但是没有安装在node_modules目录中，npm 依然会从远程仓库下载一次新的压缩包。

这种行为固然可以保证总是取得最新的代码，但有时并不是我们想要的。最大的问题是，它会极大地影响安装速度。即使某个模块的压缩包就在缓存目录中，也要去远程仓库下载，这怎么可能不慢呢？

另外，有些场合没有网络（比如飞机上），但是你想安装的模块，明明就在缓存目录之中，这时也无法安装。
