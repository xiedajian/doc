

### 
开发中避免不了传输数据与展示数据不同，直接修改原数据显然是不合适。
小程序目前没有过滤器，只能通过自己来模拟


### 方法1
通过自定义函数来过滤

```
data : {
  time : 1511748300571
}

 get time (){    
  return FormatUtil.getDate(this.data.time);
}

```


### 方法2 wxs
>  微信小程序的架构分为 app-service 和 page-frame，分别运行于不同的线程。你在开发时写的所有 JS 都是运行在 app-service 线程里的，而每个页面各自的 WXML/WXSS 则运行在 page-frame 中。app-service 与 page-frame 之间通过桥协议通信（包括 setData 调用、canvas指令和各种DOM事件），涉及消息序列化、跨线程通信与evaluateJavascript()。这个架构的好处是：分开了业务主线程和显示界面，即便业务主线程非常繁忙，也不会阻塞用户在 page-frame 上的交互。一个小程序可以有多个 page-frame （webview），页面间切换动画比SPA更流畅。坏处是：在 page-frame 上无法调用业务 JS。跨线程通信的成本很高，不适合需要频繁通信的场景。业务 JS 无法直接控制 DOM。
作者：鲁小夫
链接：https://www.zhihu.com/question/64322737/answer/223446446

wxs 目前主要是增强 wxml 标签的表达能力

ps : 因为运行在不同线程所以 js与wxs 不能相互引用的. 这就有可能在js中使用公共方法 在wxs中需要重新写一份(为了共享filter) 造成代码冗余.

通过wxs 实现共享filter: 例如格式化星座

```
//  filter/astrologyFilter.wxs 文件
  module.exports = {
    format: function (astrologyNum) {
      switch (resText) {
        case 1:
          return "水瓶座";
        case 2:
          return "双鱼座";
        case 3:
          return "白羊座";
        case 4:
          return "金牛座"; 
        case 5:
          return "双子座";
        case 6:
          return "巨蟹座";
        case 7:
          return "狮子座";
        case 8:
          return "处女座";
        case 9:
          return "天秤座";
        case 10:
          return "天蝎座";
        case 11:
          return "射手座";
        case 12:
          return "摩羯座";
        default: return '未知';
      }
    }
  }


  // 在业务页面wxml中引用wxs
  <wxs module="astFilter" src="../../rescources/filter/astrologyFilter.wxs"></wxs>
  {{astFilter.format(astrology)}}
```
