
# 使用 npm 命令安装模块

已jquery为例

```
$ npm install jquery					# 默认安装最新版本，局部安装
$ npm install jquery -g                 # -g 全局安装
$ npm install jquery --save -dev        # --save 保存记录到 package.json 文件的 dev 依赖列表
$ npm install jquery@1.12.4。			# @安装特定的版本
$ npm install juqery--force             # --force 或-f ，强制安装，不管node_module是否已经安装过
```

2.更新已安装模块
```
$ npm update jquery 
$ npm update jquery  -g
```


3. 卸载模块

```
npm uninstall jqeury
npm uninstall jqeury -g
```

4. 检查模块是否已经过时
```
$ npm outdated 						# 此命令会列出所有已经过时的包，可以及时进行包的更新
```

5. 查看 模块 的版本 

```
npm info jquery   //查看模块的版本
```



# 常用命令

1. 查看 npm 版本

```
npm -v
```

2. 查看某条命令的详细帮助 
```
npm help install				# 例如输入npm help install
```


3. npm 自身升级

旧版本的 npm 可以很容易得通过 npm 命令来升级
```
$ npm install npm -g

$ npm install npm@latest -g 			# 安装最新版本
```

4. npm 清理缓存
```
npm cache clean -f
```

5. 在项目中引导创建一个package.json文件
```
npm init [-f|--force|-y|--yes]
```
此处使用-y 可以跳过后面让你填写内容操作，所有内容都是用默认值就好，有需要的话回头可以在package.json 文件中进行修改


6. 查看包的安装路径		(输出 node_modules的路径)
```
npm root [-g]
```

7. 管理npm的配置路径 	(对于config这块用得最多应该是设置代理)
```
npm config set <key> <value> [-g|--global]
npm config get <key>
npm config delete <key>
npm config list
npm config edit
```

8. npm list 查看已安装的 node 包

```
npm list		# 当前目录下
npm list -g		# 全局安装的包
npm ls  		# list 简写为 ls
npm ls -g 
```


9.npm list 加上 --depth 0，来限制结果的层数
```
npm ls --depth 0			# npm list会把依赖包递归展示，如果只看第一层依赖包，用 --depth 限制层数

npm ls -g --depth 0			# 查看全局安装的模块及依赖
```