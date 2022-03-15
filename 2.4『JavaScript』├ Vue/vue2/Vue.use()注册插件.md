


# Vue.use(plugin, arguments)

将插件注册到Vue对象上，而且只能注册一次。这就十分类似于单例模式，但不是严格意义上的单例模式。

这里之所以说Vue.use使用了单例模式的设计理念，是因为组件在Vue上只被允许注册一次。


参数：plugin(Function | Object)

如果vue安装的组件类型必须为Function或者是Object

如果是个对象，必须提供install方法

如果是一个函数，会被直接当作install函数执行

install函数接受参数，默认第一个参数为Vue,其后参数为注册组件时传入的arguments

声明：
```
    export const testObj = {
        install(Vue, arg) {
            
        }
    }
    export const testFn = founction(Vue, arg) {
        
    }
```

使用：
```
    import { testObj, testFn } from 'test.js'
    Vue.use(testObj, arg)
    Vue.use(testFn, arg)
```

建议组件采用第一种写法，根据use源码，当采用第二种写法时，this指针指向null



# 官方use源码

// Vue源码文件路径：src/core/global-api/use.js
```
import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```

分析
```
import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
 Vue.use = function (plugin: Function | Object) {
     
        //首先检查Vue对象当前的_installedPlugins属性是否存在，
        //如果存在，那就去判断已经注册的组件中是否包含即将要注册的组件。
        //如果是，那么直接结束，不用继续往下执行。附带说一下。在条件不满足的情况下，
        //Vue.use返回的不是null，而是this。注意我们是在Vue.use方法中使用this，因此this指向Vue。
        //返回this可以使用链式调用。
        
   const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
   if (installedPlugins.indexOf(plugin) > -1) {
     return this
   }
    
        // 每一个函数默认都有一个arguments参数，我们可以以数组下标的方式(arguments[0])，访问其中的参数
        // 但是arguments并不是一个数组。但是接下来我们希望通过apply的方式将Vue.use的参数转嫁给plugin函 
        // 数plugin.install或者plugin函数，因此必须将arguments转换成真正的数组，因为apply接收数组。
        
   const args = toArray(arguments, 1)
   args.unshift(this)
    //将Vue对象拼接到数组头部
   if (typeof plugin.install === 'function') {
    //如果组件是对象，且提供install方法，调用install方法将参数数组传入，改变`this`指针为该组件
     plugin.install.apply(plugin, args)
   } else if (typeof plugin === 'function') {
    //如果传入组件是函数，这直接调用，但是此时的`this`指针只想为`null` 
     plugin.apply(null, args)
   }
   
        // 注册完成的以后，需要将已经注册的插件备份到installedPlugins当中。
        // 下一次重复注册的时候就直接返回。
   installedPlugins.push(plugin)
   return this
 }
}



/**
 *  辅助函数
 *  将类似于数组的对象转换成数组对象。
 */
export function toArray (list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}
```

从源码中我们可以发现vue首先判断这个插件是否被注册过，不允许重复注册。

并且接收的plugin参数的限制是Function | Object两种类型。
对于这两种类型有不同的处理。

如果我们传入的plugin(Vue.use的第一个参数)的install是一个方法。也就是说如果我们传入一个对象，对象中包含install方法，那么我们就调用这个plugin的install方法并将整理好的数组当成参数传入install方法中。 => plugin.install.apply(plugin, args)

如果我们传入的plugin就是一个函数,那么我们就直接调用这个函数并将整理好的数组当成参数传入。 => plugin.apply(null, args)

之后给这个插件添加至已经添加过的插件数组中，标示已经注册过 => installedPlugins.push(plugin)
最后返回Vue对象。



# 总结

编写插件的时候可以有两种方式。

一种是将这个插件的逻辑封装成一个对象最后将最后在install编写业务代码暴露给Vue对象。
这样做的好处是可以添加任意参数在这个对象上方便将install函数封装得更加精简，可拓展性也比较高。

还有一种则是将所有逻辑都编写成一个函数暴露给Vue。
其实两种方法原理都一样，无非第二种就是将这个插件直接当成install函数来处理。

个人觉得第一种方式比较合理。

```
export const Plugin = {
    install(Vue) {
        Vue.component...
        Vue.mixins...
        Vue...
        // 我们也可以在install里面执行其他函数，Vue会将this指向我们的插件
        console.log(this)  // {install: ...,utils: ...}
        this.utils(Vue)    // 执行utils函数
        console.log(this.COUNT) // 0
    },
    utils(Vue) {
        Vue...
        console.log(Vue)  // Vue
    },
    COUNT: 0    
}
// 我们可以在这个对象上添加参数，最终Vue只会执行install方法，而其他方法可以作为封装install方法的辅助函数

const test = 'test'
export function Plugin2(Vue) {
    Vue...
    console.log(test)  // 'test'
    // 注意如果插件编写成函数形式，那么Vue只会把this指向null，并不会指向这个函数
    console.log(this)  // null
}
// 这种方式我们只能在一个函数中编写插件逻辑，可封装性就不是那么强了
```




