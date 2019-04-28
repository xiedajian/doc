
1.创建GitHub Pages
如果不知道如何创建GitHub Pages，https://pages.github.com/

2.注册域名
到阿里云或者腾讯云买个自己喜欢的域名（.top域名不能作为腾讯域名邮箱）,以下用 example.com 表示你买的域名

3.到项目的设置中添加刚刚买的域名
推荐下面的方式，不要用新建文件方式，免得出错

项目 - Settings - GitHub Pages - Custom domain - 填写自己的域名


4.域名解析
到域名控制台（阿里云，腾讯云，或者其他域名供应商）找到域名列表点击解析设置，

很多人在这一步出错，或者设置完了但是访问不了（username.github.io 和 example.com 都无法访问），

例如：

阿里云域名控制台 - 域名解析 - 添加记录 - 记录类型：CNAME - 记录值：username.github.io

以上操作即可，可能需要10分钟生效，服务商分配DNS