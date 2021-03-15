



# Git 分支管理

默认有一个 master 分支

使用分支意味着你可以从开发主线上分离开来，然后在不影响主线 master 的同时继续工作。



# 列出分支

列出分支基本命令：

```
git branch			# 没有参数时，git branch 会列出你在本地的分支。

git branch -r		# 只看远程分支

git branch -a 		# 查看所有分支（本地+远程）
```

# 本地创建分支命令：

```
git branch (branchname)
```


# 将远程git仓库里的指定分支拉取到本地（本地不存在的分支）

当我想从远程仓库里拉取一条本地不存在的分支时：
```
git checkout -b 本地分支名 origin/远程分支名
```
这个将会自动创建一个新的本地分支，并与指定的远程分支关联起来。

例如远程仓库里有个分支dev2,我本地没有该分支，我要把dev2拉到我本地：
```
git checkout -b dev2 origin/dev2
```
若成功，将会在本地创建新分支dev2,并自动切到dev2上。

拉取不成功。我们需要先执行
```
git fetch
```

然后再执行
```
git checkout -b 本地分支名 origin/远程分支名
```
即可


# 切换分支命令:

```
git checkout (branchname)
git checkout -b (branchname) 			# -b 参数, 创建新分支并立即切换到该分支下
```

当你切换分支的时候，Git 会用该分支的最后提交的快照替换你的工作目录的内容， 所以多个分支不需要多个目录。


# 删除分支

```
git branch -d (branchname)
```

# 合并分支命令:

一旦某分支有了独立内容，你终究会希望将它合并回到你的主分支。 

你可以使用以下命令将任何分支合并到当前分支中去：

```
git merge <分支>							# 合并某分支到当前分支
git merge –no-ff origin/master				# 合并远程分支 origin/master 到当前分支 ,建议merge的时候总是用--no-ff 选项,可以保存你之前的分支历史。能够更好的查看merge历史，以及branch状态
```

你可以多次合并到统一分支， 也可以选择在合并之后直接删除被并入的分支。



# 合并冲突

合并并不仅仅是简单的文件添加、移除的操作，Git 也会合并修改。

将 newtest 分支合并到 "master" 分支，test.txt 文件出现合并冲突，我们需要手动去修改它。

修改过程省略

修改后用 git add 要告诉 Git 文件冲突已经解决
```
git add test.txt 
git commit
```
现在我们成功解决了合并中的冲突，并提交了结果。


# git fetch 取回所有分支（branch）的更新

```
git fetch
```



# git--创建空的分支

在Git中创建分支，是必须有一个父节点的，也就是说必须在已有的分支上来创建新的分支，如果你的工程已经进行了一段时间，这个时候是无法创建空分支的。
但是有时候需要创建一个空分支

解决方法：

使用 git checkout的--orphan参数:
```
git checkout --orphan 2.0.2
```
该命令会生成一个叫2.0.2的分支，该分支会包含父分支的所有文件。但新的分支不会指向任何以前的提交，就是它没有历史，如果你提交当前内容，那么这次提交就是这个分支的首次提交。


删除所有文件：
我们想要空分支，所以我们需要把当前内容全部删除，用git命令
```
git rm -rf .
```
注意：最后的‘.’不能少。


提交分支：
如果没有任何文件提交的话，分支是看不到的，所以我们需要创建一个新文件，然后提交则新创建的branch就会显示出来。
```
echo '# new branch' >> README.md

git add README.md

git commit -m 'new branch'
```
最后push到远程仓库，则新的空分支就创建成功了。
```
git push origin 2.0.2
```