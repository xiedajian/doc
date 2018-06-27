
# git
分支管理
- 远程仓库
- 本地仓库
- 暂存区
- 工作区


## clone仓库

git clone <版本库的网址> <本地目录名>
git clone git@192.168.0.209:/var/git_linkeddb/www.git
git clone https://github.com/jquery/jquery.git
git checkout dev



## remote远程主机
git remote 					// 列出所有远程主机
git remote 	-v				// 使用-v选项，可以参看远程主机的网址
git remote show <主机名>		// 查看该主机的详细信息
git remote add <主机名> <网址>	// 添加远程主机
git remote rm <主机名>			// 删除远程主机
git remote rename <原主机名> <新主机名>	// 远程主机的改名



### 拉取，合并，修改，提交

git fetch <远程主机名>  				// 拉取远程仓库所有分支到本地仓库
git fetch <远程主机名>  <分支名>		// 拉取远程仓库某个分支到本地仓库
git fetch origin 		
git fetch origin dev		

git merge <分支>							// 用于从指定的分支合并到当前分支的操作
git merge –no-ff origin/master			// 在本地分支上合并远程分支 ,建议merge的时候总是用--no-ff 选项,可以保存你之前的分支历史。能够更好的查看merge历史，以及branch状态


git pull <远程主机名> <远程分支名>:<本地分支名>		// 取回远程主机某个分支的更新，再与本地的指定分支合并,等同于先做git fetch，再做git merge
git pull origin next:master							// 取回origin主机的next分支，与本地的master分支合并
git pull origin dev									// 远程分支是与当前分支合并，则冒号后面的部分可以省略		


git add readme.txt  		// 把特定文件提交到暂存区
git add .					// 把工作时的所有变化提交到暂存区，包括文件内容修改(modified)以及新文件(new)，但不包括被删除的文件
git add -u 					// --update的缩写,把修改(modified)的文件提交到暂存区，不会提交新文件
git add -A 					// 是上面两个功能的合集（git add --all的缩写）
git rm readme.txt


git commit -m "提交说明"		// 提交暂存区到本地仓库
git commmit -am '备注信息'	//  -a 选项,除了将暂存区里的文件提交外，还提交 Changes bu not updated 中的文件

git push <远程主机名> <本地分支名>:<远程分支名>		// 将本地分支的更新，推送到远程主机。它的格式与git pull命令相仿
git push origin dev									// 本地dev分支推到远程origin主机的dev分支



### 日志

git log


### 回退版本

git reset --hard HEAD^			// 在Git中，用HEAD表示当前版本,上一个版本就是HEAD^，上上个版本是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。




### branch分支

git branch 				// 查看本地已经存在的分支，并且在当前分支的前面用"*"标记
git branch -r 			// -r选项，查看远程版本库分支列表
git branch -a 			// -a选项，查看所有分支列表，包括本地和远程
git branch dev			// 创建dev分支
git branch -d dev 		// 删除dev分支，如果分支有未merge的提交，会删除失败，此时可以使用 git branch -D dev：强制删除dev分支
git branch -vv			// 查看本地分支对应的远程分支
git branch -m oldName newName			// 给分支重命名




### checkout检出
git checkout命令用于切换分支或恢复工作树文件。git checkout是git最常用的命令之一，同时也是一个很危险的命令，因为这条命令会重写工作区
git branch 和 git checkout经常在一起使用
- 操作文件  
- 操作分支

操作文件：
git checkout -- 'readme.txt' 		// 检索出某个文件
git checkout -- '*.txt' 			// 检索出所有的 .txt
git checkout -- '*' 			// 检索出所有的 .txt


操作分支：
git checkout dev 		 // 将分支切换到master
git checkout -b master	 // 如果分支存在则只切换分支，若不存在则创建并切换到master分支






