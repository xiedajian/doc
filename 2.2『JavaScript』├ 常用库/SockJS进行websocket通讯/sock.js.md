

基于webSocket通信的库主要有 socket.io，SockJS，这次用的是 SockJS。


这里我们使用sockjs-client、stomjs这两个模块，要实现webSocket通信，需要后台配合，也使用相应的模块。


## sockjs-client
sockjs-client是从SockJS中分离出来的用于客户端使用的通信模块.所以我们就直接来看看SockJS. SockJS是一个浏览器的JavaScript库,它提供了一个类似于网络的对象,SockJS提供了一个连贯的,跨浏览器的JavaScriptAPI,它在浏览器和Web服务器之间创建了一个低延迟,全双工,跨域通信通道. 你可能会问,我为什么不直接用原生的WebSocket而要使用SockJS呢?这得益于SockJS的一大特性,一些浏览器中缺少对WebSocket的支持,因此，回退选项是必要的，而Spring框架提供了基于SockJS协议的透明的回退选项。SockJS提供了浏览器兼容性,优先使用原生的WebSocket,如果某个浏览器不支持WebSocket,SockJS会自动降级为轮询.



## stomjs
STOMP(Simple Text-Orientated Messaging Protocol) 面向消息的简单文本协议;
WebSocket是一个消息架构,不强制使用任何特定的消息协议,它依赖于应用层解释消息的含义.
与HTTP不同,WebSocket是处在TCP上非常薄的一层,会将字节流转化为文本/二进制消息,因此,对于实际应用来说,WebSocket的通信形式层级过低,因此，可以在 WebSocket 之上使用STOMP协议，来为浏览器 和 server间的 通信增加适当的消息语义。

## STOMP与WebSocket 的关系:

HTTP协议解决了web浏览器发起请求以及web服务器响应请求的细节,假设HTTP协议不存在,只能使用TCP套接字来编写web应用,你可能认为这是一件疯狂的事情;
直接使用WebSocket(SockJS)就很类似于使用TCP套接字来编写web应用,因为没有高层协议,就需要我们定义应用间发送消息的语义,还需要确保连接的两端都能遵循这些语义;
同HTTP在TCP套接字上添加请求-响应模型层一样,STOMP在WebSocket之上提供了一个基于帧的线路格式层,用来定义消息语义.

## 3、代码
先安装 sockjs-client 和 stompjs
```
npm install sockjs-client
npm install stompjs
```

```
import SockJS from  'sockjs-client';
import  Stomp from 'stompjs';
export default {
    data(){
        return {
            stompClient:'',
            timer:'',
        }
    },
    methods:{
        initWebSocket() {
            this.connection();
            let that= this;
            // 断开重连机制,尝试发送消息,捕获异常发生时重连
            this.timer = setInterval(() => {
                try {
                    that.stompClient.send("test");
                } catch (err) {
                    console.log("断线了: " + err);
                    that.connection();
                }
            }, 5000);
        },  
        connection() {
            // 建立连接对象
            let socket = new SockJS('http://10.10.91.4:8081/ws');
            // 获取STOMP子协议的客户端对象
            this.stompClient = Stomp.over(socket);
            // 定义客户端的认证信息,按需求配置
            let headers = {
                Authorization:''
            }
            // 向服务器发起websocket连接
            this.stompClient.connect(headers,() => {
                this.stompClient.subscribe('/topic/public', (msg) => { // 订阅服务端提供的某个topic
                    console.log('广播成功')
                    console.log(msg);  // msg.body存放的是服务端发送给我们的信息
                },headers);
                this.stompClient.send("/app/chat.addUser",
                    headers,
                    JSON.stringify({sender: '',chatType: 'JOIN'}),
                )   //用户加入接口
            }, (err) => {
                // 连接发生错误时的处理函数
                console.log('失败')
                console.log(err);
            });
        },    //连接 后台
        disconnect() {
            if (this.stompClient) {
                this.stompClient.disconnect();
            }
        },  // 断开连接
    },
    mounted(){
        this.initWebSocket();
    },
    beforeDestroy: function () {
        // 页面离开时断开连接,清除定时器
        this.disconnect();
        clearInterval(this.timer);
    }
}
```