

EJS npm: https://www.npmjs.com/package/ejs

# EJS 模块引擎

EJS 是后台模板，可以把我们数据库和文件读取的数据显示到 Html 页面上面


它是一个第三方模块，需要通过 npm 安装

```
https://www.npmjs.com/package/ejs
```

# Nodejs 中使用：

```
ejs.renderFile(filename, data, options, function(err, str){
// str => Rendered HTML string
});
```
 

# EJS 常用标签

• <% %>     流程控制标签
• <%= %>    输出标签
• <%- %>    输出标签（HTML字符串会被浏览器解析）


```
<a href="<%= url %>"><img src="<%= imageURL %>" alt=""></a>
```

```
<ul>
    <% for(var i = 0 ; i < news.length ; i++){ %>
        <li><%= news[i] %></li>
    <% } %>
</ul>
```



# 常用方法

## render

## renderFile

## compile