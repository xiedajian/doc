


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

