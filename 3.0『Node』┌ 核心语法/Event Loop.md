# Node 的 Event Loop: 6个阶段

- timer 阶段: 执行到期的`setTimeout / setInterval`队列回调
- I/O 阶段: 执行上轮循环残流的`callback`
- idle, prepare
- poll: 等待回调
	- 1. 执行回调
	- 2. 执行定时器
		- 如有到期的`setTimeout / setInterval`， 则返回 timer 阶段
		- 如有`setImmediate`，则前往 check 阶段
- check
	- 执行`setImmediate`
- close callbacks