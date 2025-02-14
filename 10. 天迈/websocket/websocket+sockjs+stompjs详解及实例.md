
# http与websocket

http超文本传输协议，大家都非常熟悉，http有1.0、1.1、 2.0几个版本，
从http1.1起，默认都开启了Keep-Alive，保持连接持续性，

简单地说，当一个网页打开完成后，客户端和服务器之间用于传输http数据的TCP连接不会关闭，

如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接，这样就降低了资源的消耗优化性能，
但是Keep-Alive也是有时间限制的，还有一个客户端只能主动发起请求才能获取返回数据，并不能主动接收后台推送的数据，
websocket便应运而生。

websocket 是 html5 新增加特性之一，目的是浏览器与服务端建立全双工的通信方式，
解决 http 请求-响应带来过多的资源消耗，同时对特殊场景应用提供了全新的实现方式，
比如聊天、股票交易、游戏等对对实时性要求较高的行业领域。

http与websocket都是基于TCP(传输控制协议)的，websocket可以看做是对http协议的一个补充


# SockJs

SockJS是一个JavaScript库，为了应对许多浏览器不支持WebSocket协议的问题，设计了备选SockJs。

SockJS 是 WebSocket 技术的一种模拟。

SockJS会尽可能对应 WebSocket API，但如果WebSocket 技术不可用的话，会自动降为轮询的方式


# Stompjs
STOMP—— Simple Text Oriented Message Protocol——面向消息的简单文本协议。
SockJS 为 WebSocket 提供了 备选方案。
但无论哪种场景，对于实际应用来说，这种通信形式层级过低。 
STOMP协议，来为浏览器 和 server 间的 通信增加适当的消息语义。


# WebSocket、SockJs、STOMP三者关系
简而言之，WebSocket 是底层协议，SockJS 是WebSocket 的备选方案，也是底层协议，而 STOMP 是基于 WebSocket（SockJS）的上层协议。

1、HTTP协议解决了 web 浏览器发起请求以及 web 服务器响应请求的细节，假设 HTTP 协议 并不存在，只能使用 TCP 套接字来 编写 web 应用。

2、直接使用 WebSocket（SockJS） 就很类似于 使用 TCP 套接字来编写 web 应用，因为没有高层协议，就需要我们定义应用间所发送消息的语义，还需要确保连接的两端都能遵循这些语义；

3、同HTTP在TCP 套接字上添加请求-响应模型层一样，STOMP在WebSocket 之上提供了一个基于帧的线路格式层，用来定义消息语义；







