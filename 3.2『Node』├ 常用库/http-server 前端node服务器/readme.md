[http-server](https://www.npmjs.com/package/http-server)


# http-server 

基于node的零配置http server服务器

非常适合前端用来作为web服务器

安装
```
npm i http-server -g
```

查看帮助说明
```
http-server -h
```


# 使用

```
http-server				# 本目录作为服务器根目录，起一个node服务器，默认端口 8080
http-server	 ./static			# 指定目录
hs 						# 缩写
hs ./static				# 缩写
http-server -p 3000 	# 配置端口	
http-server -p 3000 -P https://condejs.org			# —P 配置请求代理
http-server -p 3000 -P https://condejs.org	-c-1	# 禁用缓存 -c表示缓存 -1表示禁用
```


# 参数
```
-p或--port要使用的端口（默认为8080）
-a 要使用的地址（默认为0.0.0.0）
-d显示目录列表（默认为true）
-i显示autoIndex（默认为true）
-g或者--gzip当启用（默认为false）时，它将./public/some-file.js.gz代替./public/some-file.js当文件的gzip压缩版本存在且请求接受gzip编码时。如果brotli也启用，它将尝试首先服务brotli。
-b或者--brotli当启用（默认为false）时，它将./public/some-file.js.br代替./public/some-file.js当文件的brotli压缩版本存在且请求接受br编码时。如果gzip也被启用，它将首先尝试提供brotli。
-e或者--ext如果没有提供默认文件扩展名（默认为html）
-s或者--silent从输出中抑制日志消息
--cors通过Access-Control-Allow-Origin标头启用CORS
-o [path]启动服务器后打开浏览器窗口。（可选）提供要打开的URL路径。例如：-o / other / dir /
-c设置缓存控制max-age标头的缓存时间（以秒为单位），例如-c1010秒（默认为3600）。要禁用缓存，请使用-c-1。
-U或--utc在日志消息中使用UTC时间格式。
--log-ip启用客户端IP地址的记录（默认值:) false。
-P或者将--proxy所有无法在本地解析的请求代理到给定的URL。例如：-P http://someurl.com
--username 基本身份验证的用户名[无]
--password 基本身份验证密码[无]
-S或--ssl启用https。
-C或--certssl cert文件的路径（默认值:) cert.pem。
-K或--keyssl密钥文件的路径（默认值:) key.pem。
-r或--robots提供/robots.txt（其内容默认为User-agent: *\nDisallow: /）
-h或--help打印此列表并退出。
```