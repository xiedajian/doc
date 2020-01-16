[参考](https://juejin.im/post/5b5ad3c16fb9a04fab451c9d)

# 微信小程序实现WebSocket心跳重连

小程序用到了WebSocket，小程序提供了相应的原生API，与H5的API使用方式上有一些区别，所以流行的H5的一些成熟的类库使用起来有些困难，

而原生API又存在一些缺陷，所以就自己实现了一套心跳重连机制。

> Socket心跳重连在H5中可以有类似的实现，也有成熟的第三方库，比如说stomp+websocket+sockjs可以实现更加完整的更兼容的socket连接方案,

惯例，先简单介绍一下Websocket。

# Websocket是什么

WebSocket 是一种网络通信协议。RFC6455 定义了它的通信标准。

WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。


## 为什么需要Websocket

HTTP 协议是一种无状态的、无连接的、单向的应用层协议。它采用了请求/响应模型。通信请求只能由客户端发起，服务端对请求做出应答处理。

所以当我们想服务器主动给客户端发送消息，HTTP是做不到的，我们只能使用轮询或者长轮询来实现类似的功能，

这样的方式效率低并且浪费资源，为了解决这样的问题，WebSocket诞生了。



# 小程序中的WebSocket

[微信小程序API](https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.sendSocketMessage.html)


## 为什么要做心跳重连

在使用原生WebSocket的时候，我们经常会感觉不太稳定，服务端发送的消息有时候客户端接收不到，或者是客户端发送的消息服务端接收不到，

虽然WebSocket也提供了onError和onClose的方法，但是经常会有各种未知情况导致断开连接而并不触发Error或Close事件。

这样就导致实际连接已经断开了，而客户端和服务端却不知道，还在傻傻的等着消息来。

所以我们要解决的问题就很清晰了：

保证连接状态，连接断开时让客户端与服务端都能知道，进而重连。


## 实现原理

打开连接的时候调用start开始心跳,每隔10秒向服务端发送消息"ping",服务端接收到消息后给我们回个话"pong",就好像微信聊天。

在吗?

在

在吗?

在

在吗?

在

如果超过10秒服务端还没回复“pong”，则认为连接断开的，进行重连



# 参考代码

```
let socketOpen = false
const socketMsgQueue = []
wx.connectSocket({
  url: 'test.php'
})

wx.onSocketOpen(function(res) {
  socketOpen = true
  for (let i = 0; i < socketMsgQueue.length; i++){
    sendSocketMessage(socketMsgQueue[i])
  }
  socketMsgQueue = []
})

function sendSocketMessage(msg) {
  if (socketOpen) {
    wx.sendSocketMessage({
      data:msg
    })
  } else {
    socketMsgQueue.push(msg)
  }
}


```













