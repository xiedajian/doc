
参考：https://segmentfault.com/a/1190000013538791

# web容器
什么是web容器？我们以nginx服务器为例，安装好nginx服务器后，我们在可以找到nginx的一个根目录，往这个根目录放入静态文件，如图片、xxx.html，可以找浏览器上访问得到，这个目录我们可以称为web容器。

但在nodejs中本质上是没有web容器的（后面可以做路由解析，做到像nginx服务器那样的web容器）


#那node是怎样呈现静态页面的？

利用fs模块来读取test.html的内容，成功后回调输出。

```
var http = require('http')
var fs = require('fs')

var server= http.createServer(function(req,res)){
    fs.readFile('./test.html),function(err,data){
        res.writehead(200)
        res.end(data)
    })
}

server.listen(3000,"127.0.0.1")
```

路由是如何区分呢,通过 req.url 来区分

```
var http = require('http')
var fs = require('fs')

var server= http.createServer(function(req,res)){
    if(req.url = '/test.html'){
        fs.readFile('./test.html),function(err,data){
            res.writehead(200)
            res.end(data)
        })
    }
    else if(req.url = '/test2.html'){
        fs.readFile('./test2.html),function(err,data){
            res.writehead(200)
            res.end(data)
        })
    }
    else{
        
            res.end('找不到')
    }

}

server.listen(3000,"127.0.0.1")
```


上面代码的效果是通过nodejs的路由设计实现的；

nodejs 是没有web容器，不像php与nginx结合可直接访问静态文件；

nodejs每一次访问都要做顶层路由设计（图片、css等都要做路由设计，后面学习框架，如express,它已经帮我们做了很多路由设计，不用自己每访问一个静态资源、或路由都自己去实现）。

用nodejs做一个静态资源服务器，要做一堆的路由设计，在nodejs中如果看到一个路由是/yuan；

就不要想着其一定有一个对应的yuan物理文件夹;

有可能是统一目录或者更深！

url和真实物理文件夹是没有关系的，而是通过nodejs路由设计关联起来的。




