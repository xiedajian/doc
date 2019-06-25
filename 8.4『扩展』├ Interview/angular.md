

## 使用Angular 2，和使用Angular 1相比。有什么优势？
Angular 2是一个平台，不仅是一种语言
更好的速度和性能
更简单的依赖注入
模块化。跨平台
具备ES6和Typescript的优点。
灵活的路由，具备延迟载入功能
更easy学习


## 请解释Angular 2应用程序的生命周期hooks是什么？

ngOnChanges：当Angular设置其接收当前和上一个对象值的数据绑定属性时响应。
ngOnInit：在第一个ngOnChange触发器之后，初始化组件/指令。这是最常用的方法，用于从后端服务检索模板的数据。
ngDoCheck：检测并在Angular上下文发生变化时执行。每次更改检测运行时，会被调用。
ngOnDestroy：在Angular销毁指令/组件之前清除。取消订阅可观察的对象并脱离事件处理程序，以避免内存泄漏。


## Angular 2中的路由工作原理是什么？

路由是能够让用户在视图/组件之间导航的机制。Angular 2简化了路由，并提供了在模块级（延迟载入）下配置和定义的灵活性。 

Angular应用程序具有路由器服务的单个实例。而且每当URL改变时。对应的路由就与路由配置数组进行匹配。在成功匹配时，它会应用重定向，此时路由器会构建ActivatedRoute对象的树。同一时候包括路由器的当前状态。在重定向之前，路由器将通过执行保护（CanActivate）来检查是否同意新的状态。

Route Guard仅仅是路由器执行来检查路由授权的接口方法。

保护执行后，它将解析路由数据并通过将所需的组件实例化到<router-outlet> </ router-outlet>中来激活路由器状态。



## 什么是事件发射器？它是怎样在Angular 2中工作的？

简而言之，EventEmitter是在@ angular/core模块中定义的类，由组件和指令使用，用来发出自定义事件。
```
@output() somethingChanged = new EventEmitter();
```

可以通过模块的任何一个组件，使用订阅方法来实现事件发射的订阅。
```
myObj.somethingChanged.subscribe(val) => this.myLocalMethod(val));
```



## angular4有哪些常用指令？

ngClass

ngStyle

ngIf

ngFor

ngSwitch


## angular4 的生命周期

ngOnChanges

ngOnInit

ngDoCheck

ngOnDestroy



## 什么是延迟加载？如何在Angular 2中启用延迟加载？

每个Angular应用程序必须有一个叫AppModule的主模块。代码应该根据应用程序业务案例分为不同的子模块（NgModule）。

我们不需要在根模块中导入或声明延迟加载模块。
将路由添加到顶层路由（app.routing.ts）并设置loadChildren。loadChildren会从根文件夹中获取绝对路径。RouterModule.forRoot（）会获取routes数组并配置路由器。
在子模块中导入模块特定路由。
在子模块路由中，将路径指定为空字符串“”，也就是空路径。RouterModule.forChild会再次采用路由数组为子模块组件加载并配置路由器。
然后，导出const路由：ModuleWithProviders = RouterModule.forChild（routes）;



## 什么是Shadow DOM？它如何帮助Angular 2更好地执行？

Shadow DOM是HTML规范的一部分，它允许开发人员封装自己的HTML标记，CSS样式和JavaScript。Shadow DOM以及其它一些技术，使开发人员能够像<audio>标签一样构建自己的一级标签，Web组件和API。
总的来说，这些新的标签和API被称为Web组件。Shadow DOM通过提供了更好的关注分离，通过其它的HTML DOM元素实现了更少的样式与脚本的冲突。

因为shadow DOM本质上是静态的，同时也是开发人员无法访问的，所以它是一个很好的候选对象。因为它缓存的DOM将在浏览器中呈现得更快，并提供更好的性能。
此外，还可以相对很好地管理shadow DOM，同时检测Angular 2应用的改变，并且可以有效地管理视图的重新绘制。



## Observables和Promises的核心区别是什么？

从堆栈溢出就是一个区别： 

当异步操作完成或失败时，Promise会处理一个单个事件。

Observable类似于（在许多语言中的）Stream，当每个事件调用回调函数时，允许传递零个或多个事件。
通常Observable比Promise更受欢迎，因为它不但提供了Promise特性，还提供了其它特性。
使用Observable可以处理0,1或多个事件。你可以在每种情况下使用相同的API。
Observable是可取消的，这相比于Promise也具有优势。
如果服务器的HTTP请求结果或其它一些异步操作不再需要，则Observable的订阅者可以取消订阅，而Promise将最终调用成功或失败的回调，即使你不需要通知或其提供的结果。
Observable提供像map，forEach，reduce之类的类似于数组的运算符，还有强大的运算符，如retry（）或replay（）等，使用起来是相当方便的。

Promises：
返回单个值
不可取消

Observables：
可以使用多个值
可取消
支持map，filter，reduce和类似的操作符
ES 2016提议的功能
使用反应式扩展（RxJS）
根据时间的变化，数组成员可以异步获取