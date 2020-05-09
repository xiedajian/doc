


# npm 配置

## npm config

npm cli 提供了 `npm config` 命令进行 npm 相关配置，

```
npm config ls -l			# 可查看 npm 的所有配置，包括默认配置。
```

npm 文档页为每个配置项提供了详细的说明 `https://docs.npmjs.com/misc/config` 

修改配置的命令为 
```
npm config set <key> <value>
```

我们使用相关的常见重要配置:

```
proxy, 				#https-proxy: 指定 npm 使用的代理
registry 			#指定 npm 下载安装包时的源，默认为 https://registry.npmjs.org/ 可以指定为私有 Registry 源
package-lock 		#指定是否默认生成 package-lock 文件，建议保持默认 true
save true/false 	#指定是否在 npm install 后保存包为 dependencies, npm 5 起默认为 true
```

删除指定的配置项命令为 `npm config delete <key>`



# npmrc 文件

除了使用 CLI 的 npm config 命令显示更改 npm 配置，还可以通过 npmrc 文件直接修改配置。

这样的 npmrc 文件优先级由高到低包括：


- 工程内配置文件: /path/to/my/project/.npmrc
- 用户级配置文件: ~/.npmrc
- 全局配置文件: $PREFIX/etc/npmrc (即npm config get globalconfig 输出的路径)
- npm内置配置文件: /path/to/npm/npmrc

通过这个机制，我们可以方便地在工程跟目录创建一个 .npmrc 文件来共享需要在团队间共享的 npm 运行相关配置。

比如如果我们在公司内网环境下需通过代理才可访问 registry.npmjs.org 源，或需访问内网的 registry, 

就可以在工作项目下新增 .npmrc 文件并提交代码库。
```
proxy = http://proxy.example.com/
https-proxy = http://proxy.example.com/
registry = http://registry.example.com/
```


