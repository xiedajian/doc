

# babel

Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。

这意味着，你可以现在就用 ES6 编写程序，而不用担心现有环境是否支持

## 配置文件.babelrc

Babel的配置文件是.babelrc，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。

该文件用来设置转码规则和插件，基本格式如下。

```
  {
    "presets": [],
    "plugins": []
  }
```

presets字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。



## 命令行转码babel-cli
Babel提供babel-cli工具，用于命令行转码。

它的安装命令如下。

$ npm i -g babel-cli

基本用法如下。


# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s




## webpack 使用 babel


一、安装babel-loader、babel-core、babel-preset-env

这三个文件都是必需的，但彼此的作用各不相同。 
　　首先，babel-loader作为webpack的loader的一种，作用同其他loader一样，实现对特定文件类型的处理。webpack官方文档中指出了loader的作用，即：
> loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 
JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack的打包能力，对它们进行处理。

虽然webpack本身就能够处理.js文件，但无法对ES2015+的语法进行转换，babel-loader的作用正是实现对使用了ES2015+语法的.js文件进行处理。 
　　要使用babel，首先要安装babel-loader，命令行中定位到项目根目录输入以下指令进行安装：

npm install -D babel-loader


笔者这里安装完成后显示版本是babel-loader@7.1.4。 
　　第二，babel-core的作用在于提供一系列api。这便是说，当webpack使用babel-loader处理文件时，babel-loader实际上调用了babel-core的api，因此也必须安装babel-core：

npm install -D babel-core


笔者安装完成显示版本为babel-core@6.26.0。 
　　第三，babel-preset-env的作用是告诉babel使用哪种转码规则进行文件处理。事实上，babel有几种规则都可以实现对ES6语法的转码，如babel-preset-es2015、babel-preset-latest、babel-preset-env，不过官方现已建议采用babel-preset-env，本文也将采用babel-preset-env，你可以通过官网了解几种规则的区别。同样在命令行中定位到项目根目录，输入以下指令进行安装： 

npm install -D babel-preset-env

笔者安装的版本是babel-preset-env@1.6.1。


二、配置babel 规则

上面仅仅是安装了三个包，如果要使babel起作用，便需要配置babel规则。 
　　第一种方式是通过package.json。在package.json文件中增加一个“babel"属性，该属性是一个JSON对象，作用是设置项目中的babel转码规则和使用到的babel插件，其基本格式如下：


"babel":{
  "presets": [],
  "plugins": []
}


”presets”属性字段设定转码规则，”plugins”属性设置使用到的插件。在本项目中只需将”babel”属性 的”presets”:设置为[“env”]即可，如下所示：

"babel":{
  "presets": ["env"]
}


上面的设置告诉npm本项目将使用babel，并且使用bable-preset-env规则进行转码，即实现对ES2015+语法进行转码。 
　　除此之外，还有第二种方式，即通过.babelrc文件。在项目根目录下新建.babelrc文件，里面只需输入第一种方式中”babel”属性的值即可：

{
  "presets": ["env"]
}

作用和第一种方式相同。



三、建立并配置webpack.config.js文件

仅有上面仍然不能起作用，虽然上面已经配置好babel的规则，但webpack仍然不知道何时使用该规则，这便需要使用webpack.config.js文件。 
　　这个文件的作用是对webpack打包的参数进行配置。我的第一篇关于webpack4.x的文章《webpack4.x开发环境配置》中已经提到，webpack4.x中webpack.config.js这样的配置文件不是必须的，但事实上，如果想要进行更加个性化的打包配置，仍然要使用该文件。在根目录下新建webpack.config.js文件，在其中输入：

module.exports={
    module:{
        rules:[
            {
                test: /\.js$/,
                 exclude: /node_modules/, 
                 loader: "babel-loader"
            }
        ]
    }

}

这就告诉webpack打包时，一旦匹配到.js文件就使用babel-loader进行处理，如前文所述，babel-loader调用babel-core的api使用bable-preset-env的规则进行转码。这里并没有使用entry、output这样的参数，这是webpack4.x有默认的入口和出口，本项目无须改变，因此便不必进行设置。


四、运行查看结果

假使你已经在package.json文件的"scripts"属性下增加了"build"属性，即

"build": "webpack --mode production --progress --display-modules --colors --display-reasons"

　　现在，在命令行定位到项目根目录，执行

npm run build

　　这就相当于执行"build"属性对应的脚本。 
　　现在，webpack开始进行打包，当打包完成后，用浏览器打开dist目录下的index.html查看结果，可以发现弹出两次弹窗

第一次是"hello world"，第二次是"2,3,4"。

　　这表明a.js中的arrowTest()函数成功执行，打开main.js查看打包后的代码，也可以发现箭头函数部分的代码已经被转换成ES5的语法，如下：

[1,2,3].map(function(r){return r+1})

　　这表明整个babel的配置及使用已经成功。

　　当然，以上只是最基本的配置和使用，如果要应对更加复杂的情况，只需要参照官方文档对相关参数进行修改，这并不是什么难事，完！





参考： https://blog.csdn.net/u012443286/article/details/79577545


