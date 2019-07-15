

在使用Git前我们需要先安装 Git。Git 目前支持 Linux/Unix、Solaris、Mac和 Windows 平台上运行。

Git 各平台安装包下载地址为：http://git-scm.com/downloads

[文档](https://git-scm.com/book/zh/v2)
 
 
# Git

Git是一个开源的分布式版本控制系统，

Git 与常用的版本控制工具 CVS, Subversion 等不同，它采用了分布式版本库的方式，不必服务器端软件支持。



# 基本概念

• 工作区：就是你在电脑里能看到的目录。
• 暂存区：英文叫stage, 或index。一般存放在 ".git目录下" 下的index文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）。
• 版本库（本地仓库）：工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。
• 远程仓库





# 配置用户名

```
$ git config --global user.name 'xiedajian'
$ git config --global user.email '172265972@qq.com'
```



# 初始化版本库（创建版本库）
```
git init
```


# 添加文件到版本库
```
git add
git commit
```
当我们使用git add 指令时，就是将对应修改的文件添加到暂存区中
紧接着，我们使用git commit指令，将暂存区中做出的修改提交到版本库中

# 查看仓库状态
```
git status
```