
# 1. JavaScript静态页面值传递之URL篇

能过URL进行传值.把要传递的信息接在URL上

```
var url=location.search;
var Request = new Object();

if(url.indexOf("?")!=-1)
{
	var str = url.substr(1)　//去掉?号
　　strs = str.split("&");

	for(var i=0;i<strs.length;i++)
	{
	 　 Request[strs[i ].split("=")[0]]=unescape(strs[ i].split("=")[1]);
	}
}

alert(Request["username"])
alert(Request["sex"])
```

```
String.prototype.getQuery = function(name)
{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = this.substr(this.indexOf("?")+1).match(reg);
	if (r!=null) return unescape(r[2]); return null;
}

var str ="www.jb51.net/index.htm?a=1&b=1&c=测试测试";
console.log(str.getQuery("a"));
```

优点:取值方便.可以跨域.
缺点:值长度有限制


# 2. Cookie 页面值传递

a.html
```
var Days = 30; //此 cookie 将被保存 30 天
var exp　= new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
location.href = "b.htm"; //接收页面.
```

b.html
```
function getCookie(name)
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr !=null) return unescape(arr[2]); return null;
}

console.log(getCookie("baobao"));
```

优点:可以在同源内的任意网页内访问.生命期可以设置.
缺点:值长度有限制.



# 3. Window.open 页面值传递

这两窗口之间存在着关系.父窗口 parent.html 打开子窗口son.html

子窗口可以通过 window.opener 指向父窗口.这样可以访问父窗口的对象.

son.html
```
var parentText = window.opener.document.all.maintext.value;

console.log(parentText)
```

优点:取值方便.只要window.opener指向父窗口,就可以访问所有对象.不仅可以访问值,还可以访问父窗口的方法.值长度无限制.

缺点:两窗口要存在着关系.就是利用window.open打开的窗口.不能跨域.