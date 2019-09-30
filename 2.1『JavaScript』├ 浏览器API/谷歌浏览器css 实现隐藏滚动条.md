```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .box {
            width: 200px;
            height: 200px;
            overflow: auto;
        }
        .item {
            width: 100px;
            height: 500px;
            background: red;
        }
        .box::-webkit-scrollbar {
            display: none;
        }
    </style>
</head>
<body>
<div class="box">
    <div class="item">sddddddddddddddddddddddds</div>
</div>
</body>
</html>
```



# 各浏览器控制滚动条

最近做了一个项目，要求各个浏览器统一滚动条的样式，不显示滚动条，但是不影响鼠标的滑动事件。

查了很多资料，ie和谷歌都是可以自定义滚动条样式的，但是ie只能改变颜色，并不能修改宽度，圆角之类的。谷歌就比较随和了，可以自定义样式。

谷歌自定义滚动条样式代码：
```
/*----- 滚动条 -------*/
::-webkit-scrollbar-track { background-color: rgba(0,0,0,0.2);  }
::-webkit-scrollbar {  width: 0px;height:8px;  background-color: #F5F5F5;border-radius: 5px;  }
::-webkit-scrollbar-thumb { /* */background: #0C4EA2;border-radius: 5px; }
::-webkit-scrollbar-corner{ background-color: #F5F5F5;}
```

ie隐藏滚动条样式代码：
```
html {
        /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
        -ms-overflow-style:none;
        /*火狐下隐藏滚动条*/
        overflow:-moz-scrollbars-none;
    }
    /*Chrome下隐藏滚动条，溢出可以透明滚动*/
    html::-webkit-scrollbar{width:0px}
```

既然，火狐不允许自定义滚动条样式，然后又长的那么丑，那还不如就隐藏了把，对于上面的代码，是隐藏不了火狐的滚动条的，经查资料，
看到一个比较投机的方法（当然也适用于其他浏览器），方法如下：

当我们的内容超出了我们的div，往往会出现滚动条，影响美观。

尤其是当我们在做一些导航菜单的时候。滚动条一出现就破坏了UI效果。  我们不希望出现滚动条，也不希望超出去的内容被放逐，就要保留鼠标滚动的效果。

 

这里介绍一个简单的方法。   大体思路是在div外面再套一个div。这个div设置overflow:hidden。  

而内容div设置 overflow-y: scroll;overflow-x: hidden;

然后再设置外层div的width小于内层div的width。

 

这个内层div其实是会出现滚动条的，所以不影响鼠标的滚动效果，而且我们看不到滚动条了。

```
<div class= "nav_wrap">  
    <ul class= "nav_ul">        
        <li class="nav_li">我是菜单1</li>  
        <li class="nav_li">我是菜单2</li>  
    </ul>  
</div>

.nav_wrap{  
    height: 400px;  
    width: 200px;  
    overflow: hidden;  
    border: 1px solid #ccc;  
    margin: 20px auto;  
}  
.nav_ul{  
    height: 100%;  
    width: 220px;  
    overflow-y: auto;  
    overflow-x: hidden;  
}  
.nav_li{  
    border: 1px solid #ccc;  
    margin: -1px;  
    height: 40px;  
    line-height: 40px;  
    text-align: center;  
    font-size: 12px;  
    width: 200px;  
}  
.btn_wrap{  
    text-align: center;  
}
```