
Git中的暂存区成为stage或者是index.可以理解成一个"提交任务".Git暂存区是Git最成功的设计之一,但是也是最难理解的.

暂存区是一个介于工作区和版本库的中间状态.当执行提交的时候,实际上是将暂存区的内容提交到版本库中.

# stash 暂存区的作用

使用场景：
1.代码写一半，这时需要做成其他的工作，已经写一半的代码又不能提交，就可以利用暂存区来暂存当前的工作

stash的含义就是把工作区的修改临时储藏起来，等以后再恢复使用，可以继续在以前基础上工作。

2. 现在另一种情况：你pull最新代码，但这时候你又不想重新增加commit记录，这时候先git stash，然后pull，最后在git stash pop,


两种情况在实际开发过程中会经常用到，要熟练掌握git stash的应用
```
git stash        	# 暂存
git stash pop		# 恢复暂存
```


# stash 简单使用流程

git stash 就用于保存当前工作进度的.
```
git stash
// Saved working directory and index state WIP on master: 254485f 暂存区
```
一开始运行git status 一些未提交的改动都存在,
但是运行完 git stash之后,
再查看工作区状态 git status ,
会看见工作区尚未提交的改动(包括暂存区的改动)全都不见了.

因为执行了git stash命令来将工作区和暂存区的改动全部封存起来,所以执行下面的命令会看到工作区和暂存区没有改动

取出
```
git stash pop
```

补充：在我们多次使用git stash 后，git栈里充满了很多未提交的代码，这时候用`git stash list` 可以讲git 栈信息打印出来，比如

`git stash apply stash@{1}` 就代表把指定版本号为stash@{1}的工作取出来。清空的话使用`git stash clear`。

git stash pop 和 git stash apply 的不同：
```
1.git stash pop stash@{0}，取出的同时也删除暂存在栈中内容

2.git stash apply stash@{0},取出不会删除暂存在栈中的内容
```

# 其他命令
```
$ git stash list [<options>]
$ git stash show [<options>] [<stash>]
$ git stash drop [-q|--quiet] [<stash>]
$ git stash ( pop | apply ) [--index] [-q|--quiet] [<stash>]
$ git stash branch <branchname> [<stash>]
$ git stash clear
$ git stash [push [-p|--patch] [-k|--[no-]keep-index] [-q|--quiet]
    [-u|--include-untracked] [-a|--all] [-m|--message <message>]
    [--] [<pathspec>...]]
$ git stash save [-p|--patch] [-k|--[no-]keep-index] [-q|--quiet]
          [-u|--include-untracked] [-a|--all] [<message>]

```