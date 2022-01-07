
# 代码回退有两种方式 

- git revert 
- git reset

git revert 和 git reset的区别 
1. git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit。 
2. 在回滚这一操作上看，效果差不多。但是在日后继续merge以前的老版本时有区别。因为git revert是用一次逆向的commit“中和”之前的提交，因此日后合并老的branch时，导致这部分改变不会再次出现，但是git reset是之间把某些commit在某个branch上删除，因而和老的branch再次merge时，这些被回滚的commit应该还会被引入。 
3. git reset 是把HEAD向后移动了一下，而git revert是HEAD继续前进，只是新的commit的内容和要revert的内容正好相反，能够抵消要被revert的内容。




# git reset 回滚

1. git log

定义：该命令显示从最近到最远的提交日志。每一次提交都有对应的 commit id 和 commit message。

如果嫌弃输出的信息杂乱无章，那么加上 --pretty=oneline 参数试试吧！


2. git reset --hard id
定义：根据 id 回退到指定的版本；
我们已经根据 git log 命令看到了所有的提交的信息，本文中，我以回退到 个人模块修改包引入顺序 版本，

即 commit id 为 7222c8f6be2d663982faa98dffe2647966b438b1；

```
git reset --hard 7222c8f6be2d663982faa98dffe2647966b438b1
```


3. git push origin HEAD --force

推送本地到远程仓库：让远程仓库代码和你本地一样，回到指定的版本。


* 第三步是很危险的，因为远程仓库的代码也会回到旧版本，两个版本之间的改动没有记录。*
* 更好的做法是：本地回退之后，用push的方法推到远程仓库。这样两个版本之间的改动是有记录的*



这个时候突然又发现不需要回退了，刚才那些消失的代码又要重新找回来了，别担心，咱们 Git 强大着呢！

4. git reflog

定义：查看命令操作的历史

查找到你要的 操作id，依旧使用 上文说的 git reset --hard id。又回退到当初一模一样的版本啰！




