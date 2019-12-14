设定版本号有两种方式，一种是人工修改 package.json 中的 version

```
// package.json
{
  "name": "project",
  "version": "1.0.0",
}
```


另一种是通过 npm version 来修改版本号，提供有这如下参数
```
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]

```


详细解释如下：
```
newversion：自定义版本号，除了已经发布的版本号，想写啥写啥
major：升级主版本号 1.0.0 -> 2.0.0
minor：升级次版本号 1.0.0 -> 1.1.0
patch：升级补丁号 1.0.0 -> 1.0.1  
premajor：预备主版本
preminor：预备次版本
prerelease：预发布版本

```

在执行npm version后，会产生一条新的提交记录，比如说执行 npm version 2.0.0完后 ，查看log，
会发现一条 commit message 为 2.0.0 的提交记录，至于为啥会生成这条记录呢？
很简单，因为npm version这行命令其实是修改了 package.json 中的 version ，修改后并提交，所以就有这条新的提交记录。
要是想自定义提交记录，可以这么写 npm version 2.0.0 -m "Upgrade to %s for reasons" 其中%s就是修改后的版本号。


