
参考文档：http://man.linuxde.net/sudo

# sudo

Linux sudo命令以系统管理者的身份执行指令，也就是说，经由 sudo 所执行的指令就好像是 root 亲自执行。

使用权限：在 /etc/sudoers 中有出现的使用者。

sudo命令用来以其他身份来执行命令，预设的身份为root。

在/etc/sudoers中设置了可执行sudo指令的用户。

若其未经授权的用户企图使用sudo，则会发出警告的邮件给管理员。

用户使用sudo时，必须先输入密码，之后有5分钟的有效期限，超过期限则必须重新输入密码。

```
sudo su				# 切换到root环境
```