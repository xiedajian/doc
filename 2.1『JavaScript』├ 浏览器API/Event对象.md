
# event属性:

event.altkey // 事件发生时 alt键是否按下
event.charCode //获取到按下键的unicode编码
event.keyCode // 获取到按下键的unicode编码
event.clientX // 获取鼠标x 轴的位置
event.clientY // 获取鼠标Y轴的位置
event.ctrlKey //事件发生时 时候按下了ctrl
event.detail // 检查鼠标点击了几次
event.offsetX //获取鼠标在事件元素中的x坐标
event.offsetY //获取鼠标在事件元素中的y坐标
event.pageX // 获取鼠标在文档中的x坐标
event.pageY // 获取鼠标在文档中的y坐标
screenX // 获取鼠标在用户显示器中的位置 不常用
screenY
event.shiftKey // 事件发生时，是否按下了shift
event.wheelDeltaX // 获取滚动条在x轴上滚动的值
event.wheelDeltaY // 获取滚动条在y轴上滚动的值



# event方法：

event.preventDefault() // 取消与当前事件关联的默认操作
event.stopPropagation() // 阻止事件在捕获，目标，冒泡阶段进行传播
event.returnValue // ie下取消默认操作
event.cancelBubble // ie 下阻止事件冒泡


# event对象：

ele.addEventListener() // 为对象注册事件
ele.removeEventListener() // 移出对象注册的事件
ele.attachEvent() // ie下的注册事件
ele.detachEvent() //ie 下移除事件