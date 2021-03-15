
有时候希望检测项目中所有可以更新的依赖包，这时候一个个检测就会非常耗时

# 工具 npm-check

```
npm i -g npm-check
```

在项目根目录运行
```
npm-check -u
```

输出如下：
```
? Choose which packages to update. (Press <space> to select)
Update package.json to match version installed.
❯◯ chalk ^1.1.3 ❯ 2.4.2 https://github.com/chalk/chalk#readme
◯ cheerio ^0.22.0 ❯ 0.22.0 https://github.com/cheeriojs/cheerio#readme
◯ debug ^2.3.3 ❯ 4.1.1 https://github.com/visionmedia/debug#readme
◯ log4js ^1.0.1 ❯ 4.1.0 https://log4js-node.github.io/log4js-node/
◯ mustache ^2.3.0 ❯ 3.0.1 https://github.com/janl/mustache.js
◯ request 2.79.0 ❯ 2.88.0 https://github.com/request/request#readme
◯ unescape ^0.2.0 ❯ 1.0.1 https://github.com/jonschlinkert/unescape
◯ yargs ^6.4.0 ❯ 13.2.2 https://yargs.js.org/
Space to select. Enter to start upgrading. Control-C to cancel.
```

空格切换包是否更新，Control + C 取消更新，回车就是执行更新。
