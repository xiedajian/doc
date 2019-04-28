

# CommonJS 规范

CommonJS是服务器端模块的规范，Node.js采用了这个规范。

主要内容如下：
1.定义模块：一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义为global（全局）对象的属性
2.模块输出： 模块只有一个出口，module.exports对象，我们需要把模块希望输出的内容放入该对象
3.加载模块： 加载模块使用require方法，该方法读取一个文件并执行，返回文件内部的module.exports对象


# AMD 规范

AMD 即Asynchronous Module Definition，中文名是异步模块定义的意思

它是一个在浏览器端模块化开发的规范，模块和依赖可以异步加载，对浏览器端较为适用。
可以说AMD是专门为浏览器中的javascript环境设计的规范。

语法如下：
```
define(id?, dependencies?, factory)
```


# CMD 规范

CMD 即Common Module Definition通用模块定义，CMD规范是国内发展出来的，

就像AMD有个requireJS，CMD有个浏览器的实现SeaJS，SeaJS要解决的问题和requireJS一样，只不过在模块定义方式和模块加载（可以说运行、解析）时机上有所不同。

语法如下：
```
define(id?, deps?, factory)
```

AMD与CMD的区别
1.对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。
2.CMD 推崇依赖就近，AMD 推崇依赖前置。
3.AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹


## UMD

通用模块规范

既然CommonJs和AMD风格一样流行，似乎缺少一个统一的规范。所以人们产生了这样的需求，希望有支持两种风格的“通用”模式，于是通用模块规范（UMD）诞生了。

不得不承认，这个模式略难看，但是它兼容了AMD和CommonJS，同时还支持老式的“全局”变量规范：

```
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    //    方法
    function myFunc(){};

    //    暴露公共方法
    return myFunc;
}));
```


# 如何编写一个通用规范的库

第一步：理解匿名自执行函数
```
(function()())
```

第一步：给匿名自执行函数传参
```
(function(global)(this));
(function(global,factory)(this,function(){}));
```
上面传递 this(浏览器中即window对象) 给global，自己定义的函数内容传递给了factory函数


第三步：兼容 CMD, AMD, 和直接挂载 window 写法, 例如把自己定义函数在浏览器挂载到window.MyPackage
```
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.MyPackage = factory());
}(this,function(){return 'MyPackage'}))
```

第四步：需要不依赖其他的库的话，就不需要往下看了
需要自己的函数依赖其他的库，例如jquery
```
(function(global,factory)(this,function($){}));
```
加上兼容
```
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = global || self, global.MyPackage = factory(global.jquery));
}(this,function($){return 'MyPackage')}))
```

保持跟上面例子一样的模式，下面是更复杂的例子，它依赖了jquery,lodash并且暴露多个方法:
```
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'),require('lodash')) :
  typeof define === 'function' && define.amd ? define(['jquery','lodash'], factory) :
  (global = global || self, global.MyPackage = factory(global.jquery,global._));
}(this,function($,_){
	console.log('MyPackage')
	
	function a(){};    //    私有方法，因为它没被返回 (见下面)
	function b(){};    //    公共方法，因为被返回了
	function c(){};    //    公共方法，因为被返回了
	
	//    暴露公共方法
	return {
	    b: b,
	    c: c
	}
}))
```
