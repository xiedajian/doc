
[npm](https://www.npmjs.com/package/js-cookie)



cookie的作用无需多言，自己封装一个cookie，不停地复制黏贴页颇为麻烦，

在这里，有npm为我们封装好的插件

js-cookie: https://www.npmjs.com/package/js-cookie。



# js-cookie

js-cookie是一个简单的，轻量级的处理cookies的js API。


# 引用方法:

1.直接饮用cdn：<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>

2.本地下载下来后：<script src="/path/to/js.cookie.js"></script>

3.模块化开发时: 
```
npm install js-cookie --save

import Cookies from 'js-cookie'
```



# API


## set创建

如果你通过set方法，传入Array或类似对象，而不是简单的string，那么js-cookie会将你传入的数据用JSON.stringify转换为string保存。

```
//创建简单的cookie
Cookies.set('name', 'value');
//创建有效期为7天的cookie
Cookies.set('name', 'value', { expires: 7 });
//为当前页创建有效期7天的cookie
Cookies.set('name', 'value', { expires: 7, path: '' });
```

set方法支持的属性
expires 
定义有效期。如果传入Number，那么单位为天，你也可以传入一个Date对象，表示有效期至Date指定时间。默认情况下cookie有效期截止至用户退出浏览器。

path 
string，表示此cookie对哪个地址可见。默认为”/”。

domain 
string，表示此cookie对哪个域名可见。设置后cookie会对所有子域名可见。默认为对创建此cookie的域名和子域名可见。

secure 
true或false，表示cookie传输是否仅支持https。默认为不要求协议必须为https。



## 取值
```
Cookies.get('name'); // => 'value'
Cookies.get('nothing'); // => undefined
//获取所有cookie
Cookies.get(); // => { name: 'value' }
```

## 删除值
```
Cookies.remove('name');

//如果值设置了路径，那么不能用简单的delete方法删除值，需要在delete时指定路径
Cookies.set('name', 'value', { path: '' });
Cookies.remove('name'); // 删除失败
Cookies.remove('name', { path: '' }); // 删除成功
//注意，删除不存在的cookie不会报错也不会有返回
```

## 命名空间

如果担心不小心修改掉Cookies中的数据，可以用noConflict方法定义一个新的cookie。

```
var Cookies2 = Cookies.noConflict();
Cookies2.set('name', 'value');
```