## pageX:

鼠标在页面document上的位置,从页面document左上角开始,即是以页面为参考点

## clientX:

鼠标在页面上可视区域(当前可视部分，有点类似于fixed)的位置,即是以浏览器滑动条此刻的滑动到的位置为参考点

注： 
1、如果元素位于body中，e.clientX + document.body.scrollLeft - document.body.clientLeft = e.pageX，

2、e.clientX包括了body的边框，document.body.scrollLeft也包括了body边框，body表框运算重复，减去document.body.clientLeft，即去掉重复的body边框

## screenX:

获取到的是触发点相对显示器屏幕左上角的距离

## offsetX：

获取到的是鼠标触发点相对于目标事件元素(被触发DOM)左上角的距离(确切的说是到边框外边界的距离)，其中在IE中以内容区左上角为基准点不包括边框，如果触发点在边框上会返回负值，而chrome中以边框左上角为基准点。

## layerX：

获取到的是鼠标触发点相对于offsetParent元素左上角的距离(确切的说是到边框外边界的距离)，包括中间所有元素的padding、margin、border及元素宽度值之和)，其中在IE中以内容区左上角为基准点不包括边框，如果触发点在边框上会返回负值，而chrome中以边框左上角为基准点。

注：关于offsetParent元素

1、如果当前元素的祖先元素没有进行CSS定位（position为absolute或relative），offsetParent为body。

2、如果当前元素的祖先元素(包括当前元素)中有CSS定位（position为absolute或relative），offsetParent取最近的那个祖先元素(包括当前元素)。

## **不同浏览器对这些属性的支持：**

![兼容](http://upload-images.jianshu.io/upload_images/4263048-4839f9cb471df6b2..png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
（firefox 浏览器中， offsetX 为 undefined）。firefox 获取 offsetX / offsetY 的值，需要通过 event 对象的属性 originalEvent。
![event.pageX](http://upload-images.jianshu.io/upload_images/4263048-a7bc0f2227327bde..jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![event-layerX](https://upload-images.jianshu.io/upload_images/4263048-b71369a0d1fa7bdb.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![event.x](http://upload-images.jianshu.io/upload_images/4263048-4d8eda21c064ca7d..jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
网页可见区域宽：document.body.clientWidth 
网页可见区域高：document.body.clientHeight 
网页可见区域宽：document.body.offsetWidth (包括边线的宽) 
网页可见区域高：document.body.offsetHeight (包括边线的宽) 
网页正文全文宽：document.body.scrollWidth 
网页正文全文高：document.body.scrollHeight 
网页被卷去的高：document.body.scrollTop 
网页被卷去的左：document.body.scrollLeft 
网页正文部分上：window.screenTop 
网页正文部分左：window.screenLeft 
屏幕分辨率的高：window.screen.height 
屏幕分辨率的宽：window.screen.width 
屏幕可用工作区高度：window.screen.availHeight 
屏幕可用工作区宽度：window.screen.availWidth
```

参考：[http://blog.csdn.net/lzding/article/details/45437707](http://blog.csdn.net/lzding/article/details/45437707)
