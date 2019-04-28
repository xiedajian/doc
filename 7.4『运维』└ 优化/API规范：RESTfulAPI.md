

# API

先说说API

API大家应该都知道吧，简称接口嘛。随着现在移动互联网的火爆，手机软件，也就是APP几乎快爆棚了。

几乎任何一个网站或者应用都会出一款iOS或者Android APP，相比网页版的体验，APP确实各方面性能要好很多。

那么现在问题来了。比如QQ空间网站，如果我想获取一个用户发的说说列表。

QQ空间网站里面需要这个功能。 

Andoid APP里面也需要这个功能。 

ios APP里面也需要这个功能。

现在就有三套，那么按照传统的开发网站的结构，你就要写3套获取用户说说列表的功能。

也就是需要在3个地方都写连接MySQL,查询mysql,可想而知是非常浪费时间和经历的，而且安全性能很差，你可以想象你把连接mysql的配置写在android里面，是多么危险的一件事情。

所以！当当当当！ API 就诞生了~

API就是为了解决这种情况而诞生，由一个地方统一提供API接口，哪个平台想使用就直接调用这个API接口来或许信息就可以了。

比如：获取QQ空间用户发的说说列表：
QQ Zone web: https://api.qzone.com/user/getUserFeedList?from=web 
QQ Zone Android: https://api.qzone.com/user/getUserFeedList?from=android 
QQ Zone iOS: https://api.qzone.com/user/getUserFeedList?from=ios

你看。我就写了一次代码接口。就可以供3个地方同时使用，我仅仅是用了from参数加以区别，可能每个平台想要的数据不一样。

这样不仅更加安全，快捷，最主要是分工更快速了。一个人专门写接口，另外一个人只需要知道如何调用就可以了，完全不需要知道是如何实现的。




# RESTFUL API

上面简单的说了API 的由来以及使用API带来的好处，好东西大家一用就会出问题，用的人一多就会出现各种不同的规范，

API也一样，虽然都是调用API，但是，写法却千差万别，维护起来很是麻烦，

比如：同样是调用QQ空间用户说说列表，就可能有以下好几种写法：

```
https://api.qzone.com/user/getUserFeedList?from=web 
https://api.qzone.com?m=user&c=getUserFeedList?from=web 
https://qzone.com/api/user/getUserFeedList?from=web 
https://qzone.com?m=api&c=user&a=getUserFeedList?from=web
```

你看，看上去千差万别，各种状况都有，后期维护是个大问题，

再就是请求方式也不对，有些喜欢用POST ,然后所有的请求都是POST, 有些喜欢用GET ,不管多大的数据量都用GET去请求，可想而知，全都乱了套。

那么有没有一个行业标准来规范和约束这些具体的东西呢？或者说是实施的比较好的？

当然有。RESTFUL API的结构设计就诞生了。

REST 意思是：表述性状态传递（英文：Representational State Transfer）
```
REST是英文representational state transfer(表象性状态转变)或者表述性状态转移

概念很抽象，Rest是web服务的一种架构风格

就是用URL定位资源，用HTTP描述操作。

URL定位资源，用HTTP动词（GET,POST,DELETE,DETC）描述操作

REST主要是用于定义接口名，接口名一般是用名次写，不用动词

在设计web接口的时候，REST主要是用于定义接口名，接口名一般是用名次写，不用动词，那怎么表达“获取”或者“删除”或者“更新”这样的操作呢——用请求类型来区分。
```

简单来说，RESTful API 是基于HTTP协议产生的一种相对简单的API设计方案，属于无状态传输。

RESTful 的核心是 everything is a “resource”，所有的HTTP action，都应该是相应resource上可以被操作和处理的，

而API 就是对资源的管理操作，而这个具体操作是由 HTTP action 指定的。

RESTful API 是目前比较成熟的一套网络应用程序的API设计理论，RESTful API 的出现使前后端设备之间进行交互时可以按照这个设计更规范、更容易交流。

在一个RESTful系统里，客户端向服务端发起索取资源的操作只能通过HTTP协议语义来进行交互。最常用的HTTP协议语义有以下5个：

  ● GET : 从服务器取出资源（一项或多项）
  ● POST：在服务器新建一个资源
  ● PUT：在服务器更新资源（客户端提供完整资源数据）
  ● DELETE：从服务器删除资源
  ● HEAD : 从服务器获取报头信息（不是资源）
  
## WEB服务接收与返回的互联网资源类型

客户端与服务端进行交互响应时，需要规定双方能够接受何种类型的媒体表现形式，最常见的以application开头的媒体格式类型有：

  ● application/json： JSON数据格式
  ● application/xhtml+xml：XHTML格式
  ● application/xml： XML数据格式
  ● application/atom+xml：Atom XML聚合格式   
   
部分小白看到这儿可能就会迷糊：RESTful Api 设计与上面提到的资源类型有何关系？

我们以地下党和接头人对接的场景为例，解释下，什么是资源类型？它和API设计有何关系：

地下党A和接口人B见面，双方约定，以敲三下门作为接头暗号，暗号对了就放行。

(这里敲门、敲三下的约定就类似于RESTful Api设计里面的“HTTP协议”，只有按照这个协议约定，合作才能继续进行。)

听到三声敲门声，双方确定是自己人。事先，双方就已经确定以何种方式与对方交流最新情报：中文？英文？粤语？这些方式必须是对方能接收并破译的形式。

（这里的中文、英文、粤语就类似于客户端和服务器交互时使用的资源类型，API设计中只有使用合理的资源类型，才能让客户端获取到可以读取的资源。）

怎么样？这么一解释，是不是通俗易懂啦！



# API设计原则

1、URL

  ● URL中应尽量使用名词，尽量避免使用动词；

  ● 应该尽量将API部署在专用域名之下；
	```
		https://api.example.com
	```
  ● 如果确定 API 很简单，不会有进一步扩展，可以考虑放在主域名下；
	```
		https://example.org/api/
	```
  ● 应该将API 的版本号放入URL，或者将版本号放在HTTP头信息中；
	```
		https://api.example.com/v1/
	```

2、路径

路径又称"终点"（endpoint），表示API的具体网址。

在RESTful架构中，每个网址代表一种资源，所以网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。

一般来说，数据库中的表都是同种记录的”集合"（collection），所以API中的名词也应该使用复数。

举例来说，有一个API提供动物园（zoo）的信息，还包括各种动物和雇员的信息，则它的路径应该设计成下面这样。

  ● https://api.example.com/v1/zoos
  ● https://api.example.com/v1/animals
  ● https://api.example.com/v1/employees


3、找到特定领域的媒体类型，根据特定的领域来设计媒体类型

在《RESTful Web APIs》一书中提及到当你想要发布一个API的时候，首先要做的就是找到一个已有的特定领域特定设计。重复造轮子是没有意义的。

在数据返回格式方面，大部分的网站优先提供Xml、JSON的数据返回，Google定义的GData就是在Atom基础上作了扩展，还有一些网站提供了php的数据返回。


4、其他

  ● 易拓展性：一个易拓展的API设计方案，可以让你延缓实现功能，因为“如果需要的话，后面再添加也很方便”。不需要的功能就不添加；

  ● 灵活性：API应该具有足够的灵活性来支持上层UI；

  ● 可移植性：这个API可以运行在任何操作系统上；

  ● API应该对程序员友好，并且在浏览器地址栏容易输入；



参考资料： 
RESTful API 设计最佳实践 
RESTful API 设计指南
https://www.zybuluo.com/phper/note/79184
https://sanwen8.cn/p/2ddcbVD.html



