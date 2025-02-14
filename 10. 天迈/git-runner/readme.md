
# 使用 git-runner 的步骤

- 1.服务器安装 gitrunner
- 2.注册 git-runner 到 gitlab page
- 3.启动 git-runner



## 服务器安装 gitrunner

安装
```
sudo apt-get install gitlab-runner
```

添加可执行权限
```
sudo chmod +x /usr/local/bin/gitlab-runner
```

创建GitLab CI用户
```
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash
```

安装并作为服务运行
```
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
sudo gitlab-runner start
sudo gitlab-runner stop
```

## 注册GitLab Runner

此处是将你的GitLab Runner注册到GitLab page上，让GitLab page可以和你的Runner通信。

1.运行注册命令：
```
sudo gitlab-runner register
```

2.输入GitLab URL： 
可以通过GitLab page -> Settings -> CI/CD -> Runners来获得URL
```
> Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com )
http://192.168.250.101/
```

3.输入你的注册token：
可以通过GitLab page -> Settings -> CI/CD -> Runners来获得 token
```
> Please enter the gitlab-ci token for this runner  
xxx
```

4.输入对这个Runner的表述（同时也是这个Runner的名字），当然，你也可以稍后在GitLab page上修改它：

```
> Please enter the gitlab-ci description for this runner  
[hostame] my-runner
```

5.输入Runner的tag，稍后你同样可以在GitLab page上修改它：
```
> Please enter the gitlab-ci tags for this runner (comma separated):
my-tag,another-tag
```
> 注意 tag可以有多个，各 tag之间用逗号隔开。如果你使用了多个 tag，那么当你想用这个 Runner时，在.gitlab-ci.yml的 tag字段里也必须明确指明这些 tags。

6.输入Runner的executor：
```
> Please enter the executor: ssh, docker+machine, docker-ssh+machine, kubernetes, docker, parallels, virtualbox, docker-ssh, shell:
shell
```
这里我选择的shell

如果你选择Docker作为Runner的executor，你还要选择默认的docker image来运行job（当然，你也可以在.gitlab-ci.yml里指明你需要用的image）：
```
>Please enter the Docker image (eg. ruby:2.1):
alpine:latest
```


注册完成后你可以在/etc/gitlab-runner里发现 config.toml文件，该文件是Runner的配置文件


# 使用GitLab Runner

直接运行Runner
```
sudo gitlab-runner run
```

