
GitHub Pages 官网： https://pages.github.com/


Github 有两种形式的 page：

个人或组织的 page：只能存在一个，master 分支，地址为 xxx.github.io

项目 page：每个项目可以生成一个，gh-pages 分支，地址为 xxx.github.io/projectname


# 新建一个 GitHub Pages

## 1

新建一个github仓库


## 2

点击页面右边一列的“Settings”，跳转到项目设置界面：

## 3

在设置界面我们能够看到有一块的标题是“Github Pages”，选择一个分支，然后点击 save按钮

## 4

页面重新跳转之后，Github Pages 那一栏多了一个地址，那个地址就是你的 github pages 的网址

## 5

第五步，设置主题，就能够发布了：



# jekyll

GitHub Pages为了提供对HTML内容的支持，选择了Jekyll作为模板系统

Jekyll是一个强大的静态模板系统，作为个人博客使用，基本上可以满足要求，也能保持管理的方便，

Jekyll官方:https://jekyllrb.com/

Jekyll基本结构:

Jekyll的核心其实就是一个文本的转换引擎，用你最喜欢的标记语言写文档，可以是Markdown、Textile或者HTML等等，再通过 layout 将文档拼装起来，根据你设置的URL规则来展现，这些都是通过严格的配置文件来定义，最终的产出就是web页面

基本的Jekyll结构如下：
```
    |-- _config.yml
    |-- _includes
    |-- _layouts
    |   |-- default.html
    |    -- post.html
    |-- _posts
    |   |-- 2007-10-29-why-every-programmer-should-play-nethack.textile
    |    -- 2009-04-26-barcamp-boston-4-roundup.textile
    |-- _site
     -- index.html
```
