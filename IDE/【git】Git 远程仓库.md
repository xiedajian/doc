
[文档](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8)



# 查看远程仓库

列出所有的远程服务器的简写

```
$ git remote
$ git remote -v					# -v 参数，你还可以看到每个别名的实际链接地址。
```	


# 添加远程仓库

运行 `git remote add <shortname> <url>` 添加一个新的远程 Git 仓库，同时指定一个你可以轻松引用的简写：

```
$ git remote add pb https://github.com/paulboone/ticgit
```



# 从远程仓库中抓取与拉取

```
$ git fetch [remote-name] 							# 拉取远程仓库所有分支到本地仓库
$ git fetch [remote-name] [branch-name]				# 拉取远程仓库某个分支到本地仓库
```
这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。

如果你使用 clone 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写


```
$ git pull [remote-name] [branch-name]
$ git pull [remote-name] [branch-name]:[本地分支名]			# 取回远程主机某个分支的更新，再与本地的指定分支合并,等同于先做git fetch，再做git merge
```
```
git pull origin next:master							// 取回origin主机的next分支，与本地的master分支合并
git pull origin dev									// 远程分支是与当前分支合并，则冒号后面的部分可以省略		
```



# 推送到远程仓库

```
$ git push [remote-name] [branch-name]:[远程分支名]	
```

```
git push origin master				# 本地 master 分支推送到 origin 服务器
git push origin dev					# 本地 dev 分支推到远程origin主机的dev分支
```



# 查看某一个远程仓库的更多信息

```
$ git remote show [remote-name]
```



# 删除远程仓库

```
git remote rm [remote-name]
```