# 两个服务器实现ssh免登陆

背景： 有些场景可能用到两台服务器ssh免密登录。比如服务器自动化部署

开始准备：

　　 服务器A  linux   ip: 192.168.1.1

 　　服务器B  linux  ip: 192.168.1.2
 
 我们希望从A向B复制东西的时候免登陆
 
 # 第一步：在服务器A 上 ，使用以下命令 生成秘钥 

```
ssh-keygen -t rsa
```
出现冒号（：）回车即可，要按三次回车。如果出现（yes/no）输入yes

.ssh/id_rsa、id_rsa.pub的文件，其中第一个为密钥，第二个为公钥。

过程中会要求输入密码，为了ssh访问过程无须密码，可以直接回车

# 第二部：公钥部署，拷贝id_rsa.pub中的内容到需要访问的主机
 
 拷贝id_rsa.pub中的内容到需要访问的主机，并建立~/.ssh/authorized_keys文件，将先前的id_rsa.pub拷贝到目标机B，如果.ssh目录不存在，则建立文件夹
 
 ```
ssh-copy-id -i .ssh/id_rsa.pub  B服务器用户@192.168.x.xxx
```
将A服务器的公钥存到B服务器的~/.ssh/authorized_keys文件

如果没有authorized_keys文件，需先手动创建
或者直接复制A的id_rsa.pub为B的authorized_keys
```
scp ~/.ssh/id_rsa.pub 192.168.0.23:/root/.ssh/authorized_keys
```

# 第三步：验证

```
ssh B服务器用户@192.168.x.xxx
```

指定端口用小写 -p  
例如：
```
ssh -p 10031  tmkj@192.168.235.38
```


# 应用场景

将A服务器的文件通过 scp 命令远程复制到 B 服务器
```
scp  -r dist.zip  192.168.247.128:/home/tmkj/web-work/template/
```

scp命令指定端口号用大写 -P
例如：
```
scp -P 10031  -r dist.zip  192.168.247.128:/home/tmkj/web-work/template/
```