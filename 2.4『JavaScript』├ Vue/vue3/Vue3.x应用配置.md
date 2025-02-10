
# Vue3.x应用配置
本章主要介绍的是Vue3.x实例中的config的配置配置项
config：包含Vue应用程序全局配置的对象，在挂载应用之前配置相应的属性。
```
const app = Vue.createApp({});
app.config = {...};
```



1、devtools（类型：Boolean，默认：true）
概述：配置是否允许开启vue-devtools检查，一般在开发环境中是true，生产环境中为false。
用法：
```
app.config.devtools = true;
```



2、errorHandler（类型：Function，参数err：错误内容，vm：对应的实例，info：Vue特定的错误信息，如某个生命周期中出现的错误）
概述：为组件在实例化或渲染过程中捕获到的错误进行处理的方法。
用法：
```
app.config.errorHandler = (err, vm, info) => {};
```




3、warnHandler（类型：Function， 参数msg：警告内容，vm：对应的实例，trace：组件的层次追踪）
概述：为Vue在运行时捕获到的警告进行处理的方法。
用法：
```
app.config.warnHandler = (msg, vm, trace) => {};
```
注意：仅在开发环境有效，生产环境中将被忽略。




4、globalProperties（类型：any）
概述：用于添加到应用程序中任何组件都能使用的全局属性，当与组件内部的属性冲突时，将优先使用组件内部的属性值。
较Vue2.x：可代替Vue2中的Vue.prototype。
用法：
```
// Vue 2.x
Vue.prototype.name = 'zhang_san';
// Vue 3.x
app.config.globalProperties.name = 'zhang_san';
app.component('child-component', {
    mounted() {
        console.log(this.name); // 'zhang_san'
    }
});
```




5、isCustomElement（类型：(tag: string) => boolean）
概述：用于来识别Vue之外的自定义元素（如，三方web组件api），如果组件或元素符合这个条件，则组件不会被实例化，Vue也不会对组件或元素发出警告信息。
用法：
```
app.config.isCustomElement = tag => tag.startsWith('ion');
```




6、optionMergeStrategies（类型：[key: string] : Function）
概述：为Vue自定义选项定义合并策略
用法
```
const app = Vue.createApp({
    mounted() {
        console.log(this.$options.hello);
    }
});

app.config.optionMergeStrategies.hello = (parent, child, vm) => {
    return `Hello, ${child}`;
};

app.mixin({
    hello: 'Vue'
});

// 'Hello,Vue'
```


7、performance（类型：boolean，默认：false）
概述：设置此项为true时，将在浏览器的devtool性能/时间线面板中启用组件的初始化，编译，渲染及修补程序跟踪。
注意：仅在开发模式和支持performance.mark api的浏览器中工作
