



# Git 分支管理

使用分支意味着你可以从开发主线上分离开来，然后在不影响主线 master 的同时继续工作。



# 列出分支

列出分支基本命令：

```
git branch
```
没有参数时，git branch 会列出你在本地的分支。



# 创建分支命令：

```
git branch (branchname)
```

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
git merge <分支>							# 用于从指定的分支合并到当前分支的操作
git merge –no-ff origin/master			# 当前分支合并 origin/master 远程分支 ,建议merge的时候总是用--no-ff 选项,可以保存你之前的分支历史。能够更好的查看merge历史，以及branch状态
```

git merge newtest				# 将 newtest 分支合并到主分支去

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