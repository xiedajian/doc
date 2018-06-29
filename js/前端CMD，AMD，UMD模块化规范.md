

## CMD



## AMD


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
保持跟上面例子一样的模式，下面是更复杂的例子，它依赖了多个组件并且暴露多个方法:

```
	(function (root, factory) {
	    if (typeof define === 'function' && define.amd) {
	        // AMD
	        define(['jquery', 'underscore'], factory);
	    } else if (typeof exports === 'object') {
	        // Node, CommonJS之类的
	        module.exports = factory(require('jquery'), require('underscore'));
	    } else {
	        // 浏览器全局变量(root 即 window)
	        root.returnExports = factory(root.jQuery, root._);
	    }
	}(this, function ($, _) {
	    //    方法
	    function a(){};    //    私有方法，因为它没被返回 (见下面)
	    function b(){};    //    公共方法，因为被返回了
	    function c(){};    //    公共方法，因为被返回了

	    //    暴露公共方法
	    return {
	        b: b,
	        c: c
	    }
	}));

```
