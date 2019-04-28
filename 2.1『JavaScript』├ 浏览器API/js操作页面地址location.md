
# window Location

window.location 对象包含有关当前 URL 的信息

用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面。


window.location 对象在编写时可不使用 window 这个前缀

对象属性：

- location.href 		设置或返回当前页面完整的 URL

- location.host         设置或返回当前 URL 的域名和端口号

- location.hostname 	设置或返回当前 URL 的域名

- location.pathname 	设置或返回当前 URL 的路径部分

- location.port 		设置或返回当前 URL 的端口部分 （80 或 443）

- location.protocol 	设置或返回当前 URL 的 web 协议（http:// 或 https://）
 
- location.search       设置或返回当前 URL 的查询部分（问号 ? 之后的部分）

- location.hash         设置或返回当前 URL 的锚部分（从 # 号开始的部分）


对象方法：

- assign(URL)           载入一个新的文档
  
- reload([bool])        重新载入当前文档,类似于浏览器上的刷新页面按钮。参数true会清缓存
  
- replace(newURL)       用一个新文档取代当前文档