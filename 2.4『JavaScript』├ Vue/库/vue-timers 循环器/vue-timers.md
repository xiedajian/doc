[npm](https://www.npmjs.com/package/vue-timers)


# vue-timers

集中管理页面的时间循环器



# 安装

 Use CDN
```
<script src="https://cdn.jsdelivr.net/npm/vue-timers/dist/vue-timers.umd.js"></script>
```

```
npm install vue-timers
```


# 注册

1.Global import
```
import VueTimers from 'vue-timers'

Vue.use(VueTimers)
```

2.2. Or use mixin
```
import {mixin as VueTimers} from 'vue-timers'

export default {
  mixins: [VueTimers]
}
```



# 使用

```
export default {
  timers: {
    log: { time: 1000, autostart: true }
  },
  methods: {
    log () {
      console.log('Hello world')
    }
  }
}
```

3种声明方式:

对象：
```
export default {
  timers: {
    log: { time: 1000, ...options }
  }
}
```

数组：
```
export default {
  timers: [
    { name: 'log', time: 1000, ...options }
  ]
}
```

帮助函数
```
import { timer } from 'vue-timers'
 
export default {
  timers: [
    timer('log', 1000, { ...options })
  ]
}
```



# 配置

Timer object
```
{
  // Name of timer
  // Default: timer key (with object notation)
  name: String,

  // Tick callback or method name from component
  // Note: callback is binded to component instance
  // Default: name
  callback: Function/String,

  // Autostart timer from created hook
  // Default: false
  autostart: Boolean,

  // Set true to repeat (with setInterval) or false (setTimeout)
  // Default: false
  repeat: Boolean,

  // Set true to call first tick immediate 
  // Note: repeat must be true too
  // Default: false
  immediate: Boolean,

  // Time between ticks
  // Default: 1000
  time: Number
  
  // Switch timer`s status between activated and deactivated
  // Default: false
  isSwitchTab: Boolean
}
```


修改配置，例如时间间隔
```
this.timers.log.time = 2000
```

>  修改之后应该执行  restart timer 应用新的配置 `this.$timer.restart('log')`


## 方法

```
// Starts `log` timer
this.$timer.start('log')

// Stops `log` timer
this.$timer.stop('log')

// restart `log` timer
this.$timer.restart('log')
```

## 获取当前状态

```
this.timers.log.isRunning
```