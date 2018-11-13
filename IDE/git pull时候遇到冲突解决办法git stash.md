

# git pull时候遇到冲突解决办法git stash

在使用git pull代码时，经常会碰到有冲突的情况，提示如下信息：

```
error: Your local changes to 'c/environ.c' would be overwritten by merge. Aborting. Please, commit your changes or stash them before you can merge. 
```

这个意思是说更新下来的内容和本地修改的内容有冲突，先提交你的改变或者先将本地修改暂时存储起来。

处理的方式非常简单，主要是使用git stash命令进行处理，分成以下几个步骤进行处理。


1、先将本地修改存储起来

$ git stash 这样本地的所有修改就都被暂时存储起来 。

$ git stash list 可以看到保存的信息：

git stash暂存修改 git stash暂存修改

其中stash@{0}就是刚才保存的标记。


2、pull内容

暂存了本地修改之后，就可以pull了。

$ git pull


3、还原暂存的内容

$ git stash pop stash@{0} 系统提示如下类似的信息：

Auto-merging c/environ.c CONFLICT (content): Merge conflict in c/environ.c 意思就是系统自动合并修改的内容，但是其中有冲突，需要解决其中的冲突。


4、解决文件中冲突的的部分

打开冲突的文件，会看到类似如下的内容：

git冲突内容 git冲突内容

其中Updated upstream 和=====之间的内容就是pull下来的内容，====和stashed changes之间的内容就是本地修改的内容。碰到这种情况，git也不知道哪行内容是需要的，所以要自行确定需要的内容。

解决完成之后，就可以正常的提交了。


5 删除stash。

git stash drop <stash@{id}> 

如果不加stash编号，默认的就是删除最新的，也就是编号为0的那个，加编号就是删除指定编号的stash。

git stash clear 是清除所有stash,整个世界一下子清净了！


6 git stash pop 与 git stash apply <stash@{id}> 的区别。

当我使用git stash pop 和 git stash apply 几次以后，我发现stash list 好像比我预计的多了几个stash。

于是我便上网去了解了一下这两个命令的区别。

原来git stash pop stash@{id}命令会在执行后将对应的stash id 从stash list里删除，而 git stash apply stash@{id} 命令则会继续保存stash id。

对于有点强迫症的我来说，是容不下越来越多的陈旧stash id 仍然存在的，所以我更习惯于用git stash pop 命令。


# 如果希望服务器上版本完全覆盖本地修改，使用如下命令回退并更新

git reset --hard

git pull