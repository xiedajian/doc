
# mitt

由于Vue3.x中删除了on和off，因此不能借助于一个单独的Vue实例来实现全局事件的发布和订阅与取消订阅（也就是跨组件通讯）


mitt是一个三方库, 使用mitt来去代替发布订阅这个任务，

```
npm install  mitt
```

all（Map对象）：包含了所有订阅的事件名称，及对应的处理方法数组。
emit（方法）：触发事件，参数为（事件名（方法名），携带的参数），当- 前携带的参数只能为一个，不能为多个。
on（方法）：创建事件订阅，参数为（事件名，处理方法）。
off（方法）：取消事件订阅，参数为（事件名，处理方法）

```
import mitt from "mitt";

const bus = {};

const emitter = mitt();

bus.$on = emitter.on;
bus.$off = emitter.off;
bus.$emit = emitter.emit;

export default bus;
```