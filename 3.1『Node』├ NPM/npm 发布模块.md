

# 发布一个简单的npm 包

发布npm 包的过程实际上就是把你本地的node 项目上传，供别人使用的过程。

所以发布操作包含以下三个部分：

本地创建node 项目编写代码、申请npm 账号、本地进行发布。



## 1）本地创建npm 项目


npm 项目的创建不用多说，直接使用以下命令进行创建：
```
npm init  -y
```

一般会将发布的内容写在根目录下的lib 文件夹中，所以我们在lib 文件夹下新建isArr.js，写入一个简单的函数判断一个变量是否是数组：
```
var isArr = function() {
    return Object.prototype.toString().slice(8, -1).toLowerCase() === 'array';
}
module.exports = isArr;
```

同时在此建立一个index.js 文件将刚刚写的函数导出：
```
module.exports = require('./isArr.js');
```

根目录下也要创建一个index.js 文件，这个文件是我们发布的包的默认入口文件，里面的内容也只是做一个导出操作：
```
module.exports = require('./lib');
```

到这里，目录结构就变成了这个样子：（大部分的包都是这样的结构）
```
|-lib
|	|-index.js
|	|-isArr.js
|-index.js
|-package.json
```


## 2）申请一个npm 账号

网址在这里，自己去搞：https://www.npmjs.com/



## 3）发布刚刚写的包

进入项目根目录，登录刚刚申请的npm 账号

```
$ npm login
```

登录完成以后执行以下操作：
```
$ npm publish
```

此时去npm 网站上就能看到你刚刚发布的包，别人想要使用的时候使用npm install 安装即可。




# 更新包

前提：你已经写了一个npm包，然后已经上传到npm中，那么它的版本就是1.0.0；

假设你的1.0.0版本现在被自己修修改改，已经变得不一样，那么我们就应该更新一下远端的1.0.0版本；

操作步骤：

                第一步：在本地更新这个包的版本  ,使用命令 npm version   <update_type>;

                第二步：提交到远端npm中，使用命令npm publish;

                

                演示（我写了一个测试包，包的名字就是 nbfirstnpmcvper ,有点长，不要介意啊）：



                1.查看已经发布的这个包nbfirstnpmcvper 的版本，如图：


# 删除包

执行npm unpublish即可
```
npm unpublish
```
注意：发布成功的包只有在24小时以内才可以删除