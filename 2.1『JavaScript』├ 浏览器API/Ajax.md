

# 发送ajax

```javascript

    <script>
    
          
                // 发送ajax请求
                // console.log("发送ajax get请求")
                // 1.创建ajax核心对象XMLHttpRequest对象
                var xhr = new XMLHttpRequest()
                // 2.注册回调函数
                // 这是回调函数，这个函数在readyState属性的状态值发生改变的时候被调用
                xhr.onreadystatechange = function(){
                    // 这里回调函数会被调用多次
                    // 0-1-2-3-4 
                    // console.log(xhr.readyState)
                    if(this.readyState == 4){
                        // 响应结束
                        // 响应结束后一边会有一个HTTP的状态码，
                        // HTTP状态码常见的包括200成功  404找不到  500服务器内部错误
                        // 获取HTTP的状态码
                        // console.log(this.status)
                        if(this.status == 404){
                            alert("您访问的资源不存在")
                        }else if(this.status == 500){
                            alert("服务器错误")
                        }else if(this.status == 200){
                            // alert("响应成功")
                            // 完成响应成功了
                            // alert(this.responseText) 以普通文本响应
                            // 把响应信息放入myDiv中
                            document.getElementById("myDiv").innerHTML = this.responseText
                        }
                    }
                }
                // 3.开启通道(open只是浏览器和服务器建立连接，通道打开不会发送请求)
                // open方法
                // open(method,url,async,user,psw)
                // method:请求的方式，GET,POST 也可以是其他请求方式
                // url：请求的路径
                // async：true或者false  true表示一个异步请求，false表示一个同步请求
                // user：用户名  pwd：密码   用户名和密码是进行身份认证的，说明要想访问这个服务器上的资源
                // 可能会需要提供一些口令才能访问，需不需要用户名密码，主要看服务器
                xhr.open("GET","/url",true)
                // 4.发送请求
                xhr.send()
       
       
    </script>
```

