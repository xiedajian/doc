配置GitLab/GitHub SSH公钥

大多数 Git 服务器都会选择使用 SSH 公钥来进行授权。

系统中的每个用户都必须提供一个公钥用于授权，没有的话就要生成一个。

生成公钥的过程在所有操作系统上都差不多。


首先打开git bash 检查一下用户名和邮箱是否配置（github支持我们用用户名或邮箱登录）
```
git config --global  --list				# 查看
```
如未配置，则执行以下命令进行配置：
```
git config --global user.name “用户名”
git config --global user.email “邮箱”
```

1.查看本机是否有SSH Key，在终端输入：
```
$ cd ~/.ssh
$ ls
```
查看是否有 id_rsa  id_rsa.pub 

2.如果没有，则需要生成SSH Key，执行生成公钥和私钥的命令
```
ssh-keygen -t rsa
```

并按回车3下：(回车分别表示下面各步骤)
```
1.确认秘钥的保存路径（如果不需要改路径则直接回车）；
2.如果上一步置顶的保存路径下已经有秘钥文件，则需要确认是否覆盖（如果之前的秘钥不再需要则直接回车覆盖，如需要则手动拷贝到其他目录后再覆盖）；
3.创建密码（如果不需要密码则直接回车）；
4.确认密码；
```

3.复制公钥
.ssh如果不做特殊处理的话，一般是在C:\Users\Administrator目录下。如果看不到.ssh文件，可以使用ls -ah指令查看隐藏文件夹即可，这是存放秘钥的文件，打开这个文件会看到id_rsa和id_rsa.pub。id_rsa是私钥文件，id_rsa.pub是公钥文件。

或命令打开id_rsa.pub 公钥文件，复制里面的内容，在终端输入：
```
$ cat ~/.ssh/id_rsa.pub
```

4.登录GitLab账号，点击头像，Setting->SSH Keys,将复制的公钥黏贴到Key文本框中，title随便添加就可以了。


验证配置是否成功，在终端输入：
```
$ ssh -T git@gitlab.com
```