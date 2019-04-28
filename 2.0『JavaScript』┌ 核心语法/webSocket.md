
# webSocket

WebSocket 是一种网络通信协议

WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议

WebSocket与http协议一样都是基于TCP的，所以他们都是可靠的协议，Web开发者调用的WebSocket的send函数在browser 的实现中最终都是通过TCP的系统接口进行传输的。WebSocket和Http协议一样都属于应用层的协议

```
	var ws = new WebSocket("wss://echo.websocket.org");

	ws.onopen = function(evt) { 
	  console.log("Connection open ..."); 
	  ws.send("Hello WebSockets!");
	};

	ws.onmessage = function(evt) {
	  console.log( "Received Message: " + evt.data);
	  ws.close();
	};

	ws.onclose = function(evt) {
	  console.log("Connection closed.");
	};      

```


### webSocket.readyState

readyState属性返回实例对象的当前状态，共有四种。

```
	CONNECTING：值为0，表示正在连接。
	OPEN：值为1，表示连接成功，可以通信了。
	CLOSING：值为2，表示连接正在关闭。
	CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
```
下面是一个示例。

```
	switch (ws.readyState) {
	  case WebSocket.CONNECTING:
	    // do something
	    break;
	  case WebSocket.OPEN:
	    // do something
	    break;
	  case WebSocket.CLOSING:
	    // do something
	    break;
	  case WebSocket.CLOSED:
	    // do something
	    break;
	  default:
	    // this never happens
	    break;
	}
```

### webSocket.onopen
实例对象的onopen属性，用于指定连接成功后的回调函数。


ws.onopen = function () {
  ws.send('Hello Server!');
}
如果要指定多个回调函数，可以使用addEventListener方法。


ws.addEventListener('open', function (event) {
  ws.send('Hello Server!');
});



### webSocket.onclose
实例对象的onclose属性，用于指定连接关闭后的回调函数。

```
	ws.onclose = function(event) {
	  var code = event.code;
	  var reason = event.reason;
	  var wasClean = event.wasClean;
	  // handle close event
	};

	ws.addEventListener("close", function(event) {
	  var code = event.code;
	  var reason = event.reason;
	  var wasClean = event.wasClean;
	  // handle close event
	});
```


### webSocket.onmessage
实例对象的onmessage属性，用于指定收到服务器数据后的回调函数。

```
	ws.onmessage = function(event) {
	  var data = event.data;
	  // 处理数据
	};

	ws.addEventListener("message", function(event) {
	  var data = event.data;
	  // 处理数据
	});
```
注意，服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）。

```
	ws.onmessage = function(event){
	  if(typeof event.data === String) {
	    console.log("Received data string");
	  }

	  if(event.data instanceof ArrayBuffer){
	    var buffer = event.data;
	    console.log("Received arraybuffer");
	  }
	}
```
除了动态判断收到的数据类型，也可以使用binaryType属性，显式指定收到的二进制数据类型。

```
	// 收到的是 blob 数据
	ws.binaryType = "blob";
	ws.onmessage = function(e) {
	  console.log(e.data.size);
	};

	// 收到的是 ArrayBuffer 数据
	ws.binaryType = "arraybuffer";
	ws.onmessage = function(e) {
	  console.log(e.data.byteLength);
	};
```

### webSocket.send()
实例对象的send()方法用于向服务器发送数据。

发送文本的例子。

```
	ws.send('your message');
```

发送 Blob 对象的例子。

```
	var file = document
	  .querySelector('input[type="file"]')
	  .files[0];
	ws.send(file);
```

发送 ArrayBuffer 对象的例子。

```
	// Sending canvas ImageData as ArrayBuffer
	var img = canvas_context.getImageData(0, 0, 400, 320);
	var binary = new Uint8Array(img.data.length);
	for (var i = 0; i < img.data.length; i++) {
	  binary[i] = img.data[i];
	}
	ws.send(binary.buffer);
```

### webSocket.bufferedAmount

实例对象的bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。

```
	var data = new ArrayBuffer(10000000);
	socket.send(data);

	if (socket.bufferedAmount === 0) {
	  // 发送完毕
	} else {
	  // 发送还没结束
	}
```

### webSocket.onerror
实例对象的onerror属性，用于指定报错时的回调函数。

```
	socket.onerror = function(event) {
	  // handle error event
	};

	socket.addEventListener("error", function(event) {
	  // handle error event
	});
```
