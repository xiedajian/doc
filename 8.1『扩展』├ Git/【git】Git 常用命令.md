
# git init

用 git init 在目录中创建新的 Git 仓库。 你可以在任何时候、任何目录中这么做，完全是本地化的。

在目录中执行 git init，就可以创建一个 Git 仓库了。比如我们创建 runoob 项目：

```
$ mkdir runoob
$ cd runoob/
$ git init
Initialized empty Git repository in /Users/tianqixin/www/runoob/.git/
# 在 /www/runoob/.git/ 目录初始化空 Git 仓库完毕。
```

现在你可以看到在你的项目中生成了 .git 这个子目录。 这就是你的 Git 仓库了，所有有关你的此项目的快照数据都存放在这里。



# git clone

使用 git clone 拷贝一个 Git 仓库到本地，让自己能够查看该项目，或者进行修改。

如果你需要与他人合作一个项目，或者想要复制一个项目，看看代码，你就可以克隆那个项目。 执行命令：

```
git clone <版本库的网址> <本地目录名>
```

git clone git@192.168.0.209:/var/git_linkeddb/www.git
git clone https://github.com/jquery/jquery.git
git checkout dev

git clone 时，可以所用不同的协议，包括 ssh, git, https 等，其中最常用的是 ssh，因为速度较快，还可以配置公钥免输入密码。各种写法如下：
```
git clone git@github.com:fsliurujie/test.git         	--SSH协议
git clone git://github.com/fsliurujie/test.git          --GIT协议
git clone https://github.com/fsliurujie/test.git      	--HTTPS协议
```



# git status

git status 命令用于查看项目的当前状态，以查看是否有修改

```
$ git status 
$ git status -s				# -s 参数，以获得简短的结果输出，如果没加该参数会详细输出内容
```


# git add

git add 命令可将该文件添加到缓存，如我们添加以下两个文件：

```
$ git add readme.txt hello.php 				# 把特定文件提交到暂存区,例如添加两个文件：README hello.php
```

git add -u 					// --update的缩写,把修改(modified)的文件提交到暂存区，不会提交新文件
git add .					// 把工作时的所有变化提交到暂存区，包括文件内容修改(modified)以及新文件(new)，但不包括被删除的文件
git add -A 					// 提交所有变化，是上面两个功能的合集（git add --all的缩写）

git rm readme.txt

> 注意参数 . 和 -A 的区别， . 提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件，-A  提交所有变化


# git rm

如果只是简单地从工作目录中手工删除文件，运行 git status 时就会在 Changes not staged for commit 的提示。

要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除，然后提交。可以用以下命令完成此项工作

```
git rm <file>
git rm -f <file>					# -f, 强制删除选项,如果删除之前修改过并且已经放到暂存区域的话则必须要用强制删除
git rm --cached <file>				#  --cached 选项,把文件从暂存区域移除，但仍然希望保留在当前工作目录中，换句话说，仅是从跟踪清单中删除
```





# git diff

执行 git diff 来查看执行 git status 的结果的详细信息。

git diff 命令显示已写入缓存与已修改但尚未写入缓存的改动的区别。git diff 有两个主要的应用场景。

• 尚未缓存的改动：git diff
• 查看已缓存的改动： git diff --cached
• 查看已缓存的与未缓存的所有改动：git diff HEAD
• 显示摘要而非整个 diff：git diff --stat

git status 显示你上次提交更新后的更改或者写入缓存的改动， 而 git diff 一行一行地显示这些改动具体是

```
git diff 											# 不加参数即默认比较工作区与暂存区
git diff --cached  [<path>...] 						# 比较暂存区与最新本地版本库
git diff HEAD [<path>...]							# 比较工作区与最新本地版本库
git diff commit-id									# 比较工作区与指定commit-id的差异
git diff --cached [<commit-id>] [<path>...] 		# 比较暂存区与指定commit-id的差异
git diff [<commit-id>] [<commit-id>]				# 比较两个commit-id之间的差异

```


# git commit

使用 git add 命令将工作去的内容写入缓存区， 而执行 git commit 将缓存区内容添加到仓库中。

每次使用git commit 命令我们都会在本地版本库生成一个40位的哈希值，这个哈希值也叫commit-id，commit-id在版本回退的时候是非常有用的

```
git commit -m "提交说明"					# 提交暂存区到本地仓库
git commit -am '备注信息'				#  -a 选项,除了将暂存区里的文件提交外，还提交工作去 Changes bu not updated 中的文件,即使它们没有经过git add添加到暂存区
```



# git reset HEAD

git reset HEAD 命令用于取消已缓存的内容。

例如：我们先修改两个文件，readme.txt hello.php

修改后，都提交到了缓存区

现在要取消其中一个的缓存，操作如下：
```
git reset HEAD hello.php 
```
现在你执行 git commit，只会将 readme.txt  文件的改动提交，而 hello.php 是没有的。



# git mv

git mv 命令用于移动或重命名一个文件、目录、软连接。

```
$ git mv a.txt  b.md
```



# git log

查看提交历史

```
$ git log 
$ git log --oneline							# --oneline 选项,查看历史记录的简洁的版本
$ git log --oneline --graph					# --graph 选项，查看历史中什么时候出现了分支、合并
$ git log --reverse --oneline				# --reverse 选项，逆向显示所有日志
$ git log --decorate						# --decorate 选项，会显示我们的自定义的标签信息
```

如果只想查找指定用户的提交日志可以使用命令：git log --author , 例如，比方说我们要找 Git 源码中 Linus 提交的部分：
```
$ git log --author=Linus --oneline -5
```

如果你要指定日期，可以执行几个选项：--since 和 --before，但是你也可以用 --until 和 --after。
```
$ git log --oneline --before={3.weeks.ago} --after={2010-04-18} --no-merges
```



# git reset

简而言之，git reset 命令是用来将当前 branch 重置到另外一个 commit 的，这个动作可能同时影响到 index 以及 work directory.

在Git中，用HEAD表示当前版本,上一个版本就是HEAD^，上上个版本是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。

```
git reset [-q] [<tree-ish>] [--] <paths>…​
git reset (--patch | -p) [<tree-ish>] [--] [<paths>…​]
git reset [--soft | --mixed [-N] | --hard | --merge | --keep] [-q] [<commit>]
```

```
git reset --hard HEAD^						# 当前分支回退到上一个版本
git reset --hard HEAD~20					# 当前分支回退20个版本
```

常用的到命令，主要有三种情况。

• 错误commit后，仅撤销commit；暂存区、工作区内容不变。
```
git log 
git reset --soft commit-id 			 		# commit-id为错误commit之前的，commit-ID
// 如   
// commit-id f34a (错误的commit，当前版本库)
// *******
// commit-id d3fs (正确的commit）
// git reset --soft d3fs
```

• 错误commit后。仅撤销commit和add；工作区内容不变
```
git log 
git reset --mixed commit-id 
// 该命令相当于恢复到 git add 之前的状态，同时工作区的内容不变
```

• 错误commit之后，想要恢复到某个版本库的代码(暂存区，工作区均变化）
```
git log
git reset --hard commit-id 
```


# git checkout

git checkout命令用于切换分支或恢复工作树文件。

git checkout是git最常用的命令之一，同时也是一个很危险的命令，因为这条命令会重写工作区

git branch 和 git checkout经常在一起使用

```
git checkout [-q] [-f] [-m] [<branch>]
git checkout [-q] [-f] [-m] --detach [<branch>]
git checkout [-q] [-f] [-m] [--detach] <commit>
git checkout [-q] [-f] [-m] [[-b|-B|--orphan] <new_branch>] [<start_point>]
git checkout [-f|--ours|--theirs|-m|--conflict=<style>] [<tree-ish>] [--] <paths>…​
git checkout [<tree-ish>] [--] <pathspec>…​
git checkout (-p|--patch) [<tree-ish>] [--] [<paths>…​]
```

• 操作文件：
git checkout -- 'readme.txt' 		// 检索出某个文件
git checkout -- '*.txt' 			// 检索出所有的 .txt
git checkout -- '*' 			// 检索出所有的 .txt


• 操作分支：
git checkout dev 		 // 将分支切换到master
git checkout -b master	 // 如果分支存在则只切换分支，若不存在则创建并切换到master分支

