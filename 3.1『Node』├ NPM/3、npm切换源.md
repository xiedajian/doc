
# npm 切换源


查看npm源
```
npm config get registry
```

设置npm源
```
npm config set registry https://registry.npmmirror.com							#淘宝源
npm config set registry https://registry.npmjs.org								#官方源
npm config set registry https://mirrors.huaweicloud.com/repository/npm/			#华为源
```

临时使用npm源(命令后跟--registry指定本次源)
```
npm install --registry=https://registry.npmmirror.com
npm install jquery --registry https://registry.npmmirror.com
npm install -g cnpm --registry=https://registry.npmmirror.com
```


# 使用 nrm 管理 npm 源

nrm是用来专门管理npm源地址的工具，我们使用nrm可以很方便的切换npm源地址。

```
npm install nrm -g
```


nrm有默认配置，使用 nrm ls 查看，带 * 即为当前源地址
```
nrm ls


  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
* tiamaes ------ http://192.168.250.101:4873/
```


nrm切换淘宝镜像
```
nrm use taobao
```


使用nrm添加镜像地址
```
nrm add r_name r_url 		# r_name 为镜像名字，r_url 为镜像地址
nrm add tiamaes http://192.168.250.101:4873/	#案例
```


删除nrm镜像
```
nrm del r_name
```


测试镜像速度
```
nrm test r_name
```

