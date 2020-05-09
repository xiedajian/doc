[参考](https://juejin.im/post/5c94fef7f265da60fd0c15e8)

 # 什么是CLI
CLI（command-line interface 命令行界面）是指在图形用户界面得到普及之前使用最为广泛的用户界面，它通常不支持鼠标，

用户通过键盘输入指令，计算机接收到指令后，予以执行。也有人称之为字符用户界面（CUI）

扯了一堆，你好像还没说下啥是脚手架？emmm... 它就是个工具，方便我们新建项目用的，有了这个项目我们就能直接开发了。

其实我们本可以用 git clone url 来新建（复制）项目，再 cuo 一点的方法就是复制粘贴整个文件夹，一样也能达到初始化的目的。

脚手架的本质也是从远程下载一个模板来进行一个新项目。额。所以。。。有什么不同呢？就高大上啊

当然不止于此啦，脚手架可是高级版的克隆，它主要是提供了交互式的命令让我们可以动态的更改模板，

然后用一句命令就可以一劳永逸了（当然还是要维护的），这应该是最主要的区别吧，反正现在我是这么想的😢。


# 前置知识


## commander

这是用来编写指令和处理命令行的，具体用法如下：
```
const program = require("commander");
// 定义指令
program
  .version('0.0.1')
  .command('init', 'Generate a new project from a template')
  .action(() => {
    // 回调函数
  })
// 解析命令行参数
program.parse(process.argv);

```

回忆一下，我们曾用过的 vue init 的命令就是这样声明的。


## inquirer

这是个强大的交互式命令行工具，具体用法如下：

想象一下我们用 vue init webpack project-name 之后是不是会有几个交互问题，问你文件名啊、作者啊、描述啊、要不要用 eslint 啊等等之类的，就是用这个来写的。



## chalk

这是用来修改控制台输出内容样式的，比如颜色啊，具体用法如下：
```
const chalk = require('chalk');
console.log(chalk.green('success'));
console.log(chalk.red('error'));
```


## ora

这是一个好看的加载，就是你下载的时候会有个转圈圈的那种效果，用法如下：
```
const ora = require('ora')
let spinner = ora('downloading template ...')
spinner.start()
```


## download-git-repo

看名字很明显了，这是用来下载远程模板的，支持 GitHub、 GitLab 和 Bitbucket 等，用法如下：

```
const download = require('download-git-repo')
download(repository, destination, options, callback)
```

其中 repository 是远程仓库地址；destination 是存放下载的文件路径，也可以直接写文件名，默认就是当前目录；options 是一些选项，比如 { clone：boolean } 表示用 http download 还是 git clone 的形式下载。




# 实战


### 1


进入开发目录，执行
```
npm init -y
```
将会创建 package.json和默认的配置。当然手动创建也没有问题

安装依赖
```
commander  inquirer  chalk  ora  download-git-repo
```


### 2

新建一个 bin 文件夹，并在 bin 目录下新建一个 xdj.js 文件，并写上：
```
#!/usr/bin/env node
console.log('hello,my first cli');
```

这个文件就是我们整个脚手架的入口文件，我们用 node ./bin/xr 运行一下，就能在控制台打印出 hello，

这里要注意开头的 #!/usr/bin/env node 这个语句必须加上，主要是为了让系统看到这一行的时候，会沿着该路径去查找 node 并执行，主要是为了兼容 Mac ，确保可执行。

我们来丰富一下 xdj.js 文件

```
#!/usr/bin/env node
const program = require('commander')

// 定义当前版本
// 定义使用方法
// 定义四个指令
program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('add', 'add a new template')
  .command('delete', 'delete a template')
  .command('list', 'list all the templates')
  .command('init', 'generate a new project from a template')
  
// 解析命令行参数
program.parse(process.argv)

```


当然，你可能会觉得每次输入 node ./bin/xr 这个命令有点麻烦，没关系，我们可以在 package.json 里面写入已下内容：

```
"bin": {
    "xdj": "bin/xdj.js"
}
```
其中 xdj 是需要执行的命令名，bin/xdj.js 是命令所调用的文件


然后在根目录下执行 npm link（就是把命令挂载到全局的意思），这样我们每次只要输入 xdj，就可以直接运行了，so cool，就像下面这样：
```
D:\web\test\xdj-cli>xdj
Usage: xdj <command> [options]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  add            add a new template
  delete         delete a template
  list           list all the templates
  init           generate a new project from a template
  help [cmd]     display help for [cmd]
```

