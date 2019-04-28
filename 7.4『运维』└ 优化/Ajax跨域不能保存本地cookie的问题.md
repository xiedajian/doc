


# Ajax跨域不能保存cookie，不能设置cookie

ajax 跨域默认是不启用cookie功能的（默认请求不带cookie）


解决办法：

需要同时设置 前端ajax 和 服务端

服务器端设置：
```
header("Access-Control-Allow-Credentials: true");   //支持跨域发送cookies
header("Access-Control-Allow-Origin: http://www.xxx.com");
```

前端ajax设置：

1、原生ajax请求方式：
```
1 var xhr = new XMLHttpRequest();  
2 xhr.open("POST", "http://xxxx.com/demo/b/index.php", true);  
3 xhr.withCredentials = true; //支持跨域发送cookies
4 xhr.send();
```

2. jquey请求：
```
$.ajax({
        type: "POST",
        url: "http://xxx.com/api/test",
        dataType: 'json',
　　　　// 允许携带证书
        xhrFields: {
             withCredentials: true
        },
　　　　// 允许跨域
        crossDomain: true,
        success:function(){
        },
        error:function(){
    }
})
```

3. axios设置：
```
 axios.defaults.withCredentials = true 
```

