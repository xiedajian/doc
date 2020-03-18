
# Websocket

Websocket 是一个 **持久化的协议**， 基于 http ， 服务端可以 **主动 push**

- 兼容：
	- FLASH Socket
	- 长轮询： 定时发送 ajax
	- long poll： 发送 --> 有消息时再 response

- `new WebSocket(url)`
- `ws.onerror = fn`
- `ws.onclose = fn`
- `ws.onopen = fn`
- `ws.onmessage = fn`
- `ws.send()`