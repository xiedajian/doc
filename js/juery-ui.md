

### drag 和 drap
draggable()是被拖动的元素 
droppable()是盛放被拖动元素的容器 

最简单例子：
```html
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
<div id="draggable" class="ui-widget-content">
  <p>Drag me to my target--from ifxoxo.com</p>
</div>
<div id="droppable" class="ui-widget-header">
  <p>Drop here  -- from ifxoxo.com</p>
</div>
<script>
  $(function() {
    // 初始化#draggable 可以被拖动
    $( "#draggable" ).draggable();  
   // 初始化，有东西拖到#droppable时，弹出alert窗口  
   $( "#droppable" ).droppable({   
      drop: function( event, ui ) { 
          alert("has drop!--from ifxoxo.com");
      }
    });
  });
  </script>

```


#### draggable()函数的参数

```
	$( "#draggable" ).draggable({
			 // 开始拖动
		     start: function(event, ui){ alert(this); },
		     // 正在拖动
             drag: function(event, ui) { alert(this); },
             // 拖动结束
             stop: function(event, ui) { alert(this); },
             // 在选择器约束的元素内拖动 选择器, 元素, 字符串, 数组
             containment: 'parent',  //parent: 只能在父容器内拖动 
             // 延时
             delay: 500,
             //
             distance:
             // 是否给draggable元素增加 ui-draggable这个css的class
             addClasses: true,
             // 控制元素 只能沿 X轴|Y轴 移动
             axis：false,		// [类型]String [支持] ‘x’, ‘y’, false
             //
             opacity
             //
             helper:
             //
             handle
	}); 

```


#### droppable()函数的参数
```
	$('.selector').droppable({  
			// 在允许的draggable对象开始拖动时触发
            activate: function(event, ui) { ... },
            // 在允许的draggable对象停止拖动时触发
            deactivate: function(event, ui) { ... },
            // 在允许的draggable对象”经过”这个droppable对象时触发
            over: function(event, ui) { ... },
            // 在允许的draggable对象离开 这个droppable对象时触发
            out: function(event, ui) { ... },
            // 在允许的draggable对象填充进这个droppable对象时触发
            drop: function(event, ui) { ... },
            // 允许被放下来的元素
            accept: '#someid',
            // 一个被允许的draggable对象悬停在droppable对象上时添加的class
            hoverClass: 'drophover'
	  });

```



#### drappable的超级详细参数
1、回调函数
有start, stop, drag等事件，这些函数都接受两个参数：event和ui。
event: 浏览器原生的事件 ； ui: 一个JQuery的ui对象。
其中ui 有以下属性：
a) ui.helper: 正在拖动的元素的JQuery包装对象, ui.helper.context可以获取到原生的DOM元素.
b) ui.position: ui.helper(也就是我们要拖动的元素)相对于父元素(包含自己的元素, 如果是顶层, 对应body)的偏移, 值是一个对象{top, left}—-也就是可以用ui.position.top获取到该元素与父元素的top当前偏移
c) ui.offset: 与ui.position同意, 这里表示的是和浏览器内容区域左上边界的偏移(注意, 是内容区域, 而不是html的body区域. html的body在默认情况下, 各种浏览器中都会相对offset有偏移的.)
(1) start: 拖动开始, 指鼠标按下, 开始移动.
(2) drag: 拖动过程中鼠标移动.
(3) stop: 拖动结束.
[代码示例]
初始化时设置事件.
$(‘.selector’).draggable({
start: function(event, ui){ alert(this); },
drag: function(event, ui) { alert(this); },
stop: function(event, ui) { alert(this); }
});

2、常用参数(选项)
(1)addClasses
[类型]Boolean(布尔值)
[默认值]true
[产生影响]
用来设置是否给draggable元素通过ui-draggable样式才装饰它. 主要为了在通过.draggable()初始化很多(成百个)元素的时候优化性能考虑, 但是, 这个选项的设置, 不会影响ui-draggable-dragging样式改变拖动过程样式.
true表示ui-draggable样式被添加到该元素.
false表示ui-draggable样式不被添加到该元素.
[代码示例]draggable其他选项的初始化,
$(‘.selector’).draggable({ addClasses: false });
将.selector选择器选中的元素渲染成为一个可拖动控件, 不为其添加ui-draggable样式

(2)appendTo:
[类型]Element, Selector(HTML元素对象或选择器)
[默认值]‘parent’ 父元素
[产生影响]
用来指定控件在拖动过程中ui.helper的容器, 默认情况下, ui.helper使用和初始定义的draggable相同的容器, 也就是其父元素.
[代码示例]
$(‘.selector’).draggable({ appendTo: ‘body’ });

(3)axis:
[类型]String, Boolean(可取的值有’x', ‘y’, false)
‘x’: 只能水平拖动
‘y’: 只能垂直拖动
false: 既可以水平, 也可以垂直拖动.
[默认值]false, 不限制拖动的方向
[产生影响]
约束拖动过程中的取向.
[代码示例]
$(‘.selector’).draggable({ axis: ‘x’ });

(4)containment:
[类型]选择器, 元素, 字符串, 数组.
选择器: 只能在选择器约束的元素内拖动
元素: 只能在给定的元素内拖动
字符串:
parent: 只能在父容器内拖动
document: 在当前html文档的document下可拖动, 超出浏览器窗口范围时, 自动出现滚动条
widow: 只能在当前浏览器窗口的内容区域拖动, 拖动超出当前窗口范围, 不会导致出现滚动条…
数组: [x1, y1, x2, y2]以[开始水平坐标, 开始垂直坐标, 结束水平坐标, 结束垂直坐标]的方式划定一个区域, 只能在此区域内拖动. 这种方式指定时, 值是相对当前浏览器窗口内容区域左上角的偏移值.
false: 不限制拖动的活动范围
[默认值]false
[产生影响]
影响指定可拖动控件的活动区域.
[代码示例]
$(‘.selector’).draggable({ containment: ‘parent’ });
$(‘.selector’).draggable({ containment: ‘#demo-frame’ });

(5)cursor:
[类型]字符串.
[默认值]‘auto’
[产生影响]
影响指定可拖动控件在拖动过程中的鼠标样式, 该样式设定之后, 需要控件的原始元素支持指定的cursor样式, 如果指定的值原始元素不支持, 则使用原始元素默认的cursor样式.
[代码示例]
$(‘.selector’).draggable({ cursor: ‘crosshair’ });

(6)cursorAt:
[类型]对象
通过设置对象的top, left, right, bottom的属性值中的一个或两个来确定位置.
[默认值]false
[产生影响]
在拖动控件的过程中, 鼠标在控件上显示的位置, 值为false(默认)时, 从哪里点击开始拖动, 鼠标位置就在哪里, 如果设置了, 就会在一个相对控件自身左上角偏移位置处, 比如: .
[代码示例]
$(‘.selector’).draggable(‘option’, ‘cursorAt’, {left: 8, top: 8});
那么拖动过程中, 鼠标就会在自身的左上角向下向右各偏移8像素处

(7)delay:
[类型]整数, 单位是毫秒
[默认值]0
[产生影响]
可拖动控件从鼠标左键按下开始, 到拖动效果产生的延时. 该选项可以被用来阻止一些不期望的点击带来的无效拖动. 具体效果是: 一次拖动, 从鼠标左键按下, 到delay指定的时间, 如果鼠标左键还没有松开, 那么就认为这次拖动有效, 否则, 认为这次拖动无效.
[代码示例]
$(‘.selector’).draggable({ delay: 500 });

(8)distance:
[类型]整数, 单位是像素
[默认值]1
[产生影响]
可拖动控件从鼠标左键按下开始, 到拖动效果产生的时鼠标必须产生的位移. 该选项可以被用来阻止一些不期望的点击带来的无效拖动. 具体效果是: 一次拖动, 从鼠标左键按下, 只有当鼠标产生的位移达到distance指定的值时, 才认为是有效的拖动.
[代码示例]
$(‘.selector’).draggable({ distance: 30 });

(9)grid:
[类型]数组[x, y], x代表水平大小, y代表垂直大小, 单位是像素
[默认值]false
[产生影响]
可拖动控件拖动时采用grid的方式拖动, 也就是说拖动过程中的单位是guid选项指定的数组描述的格子那么大.
[代码示例]
$(‘.selector’).draggable({ grid: [50, 20] });

(10)handle:
[类型]选择器或元素
[默认值]false
[产生影响]
指定触发拖动的元素. 用法: 将一个id=window的div设置为可拖动控件, 设置它的handle是该div中的一个id=title的span, 那么, 就只有在id=title的span上点击拖动才是有效的. 注意: 该元素一定要是可拖动控件的子元素.
[代码示例]
$(‘.selector’).draggable({ handle: ‘h2′ });

(11)helper:
[类型]字符串或函数
字符串取值:
‘original’: 可拖动控件本身移动
‘clone’: 将可拖动控件自身克隆一个移动, 自身在原始位置不变
函数则必须返回一个DOM元素: 以函数返回的DOM元素移动展现拖动的过程.
[默认值]‘original’
[产生影响]
拖动过程中帮助用户知道当前拖动位置的元素.
[代码示例]
$(‘.selector’).draggable({ helper: ‘clone’ });
helper: function(event){
return $( “

I’m a custom helper
” );
}

(12)opacity:
[类型]浮点数值
[默认值]false
[产生影响]
拖动过程中helper(拖动时跟随鼠标移动的控件)的不透明度.
[代码示例]
$(‘.selector’).draggable({ opacity: 0.35 });

(13)revert:
[类型]Boolean, 字符串
true: 每次拖动停止之后, 元素自动回到原始位置
‘invalid’: 除非是一个droppable并且被drop(放)成功了, 才不将元素返回到原始位置.
‘valid’: 除invalid之外的其他情况.
[默认值]false
[产生影响]
影响一次拖动之后是否回归到原始位置.
[代码示例]
$(‘.selector’).draggable({ revert: true });

(14)revertDuration:
[类型]整数
[默认值]500
[产生影响]
revert(回归到原始位置)整个过程需要的时间, 单位是毫秒. 如果设置revert选项设置为false, 则忽略此属性.
[代码示例]
$(‘.selector’).draggable({ revertDuration: 1000 });

(15)scope:
[类型]字符串
[默认值]‘default’
[产生影响]
在多个draggable和droppable对象的情况下，为了防止混乱，用来和droppable的对象进行分组。
只有处在同一个分组里，droppable才会接受。
该选项描述一个范围, 和droppable的同名选项结合使用, droppable的accept选项用来设置可以接受的draggable控件, 同时, 可接受的drggable控件受scope选项约束, 必须是同一个scope中的draggable和droppable才可以互相拖放.
例如:
$(‘#draggable_a’).draggable({scope: ‘a’});
$(‘#draggable_b’).draggable({scope: ‘b’});
$(‘#droppable_a’).droppable({scope: ‘a’});
$(‘#droppable_b’).droppable({scope: ‘b’});
droppable控件的accept选项默认是’*', 看起来数draggable_a, draggable_b可以自由的放入到droppable_a和droppable_b中, 但是, 由于scope的约束, draggable_a只能放入到droppable_a, draggable_b只能发乳到droppable_b中.
注意: 这个选项就和变量的名称空间的意义类似. 默认值是’default’, 说明如果不指定, 大家都还是有scope的, 名字是default而已.
[代码示例]
$(‘.selector’).draggable({ scope: ‘tasks’ });

(16)scroll:
[类型]Boolean
[默认值]true
[产生影响]
如果设置为true, 在拖动过程中超出可拖动控件容器的时候, 容器自动增加滚动条
[代码示例]
$(‘.selector’).draggable({ scroll: false });

(17)scrollSensitivity:
[类型]整数值
[默认值]20
[产生影响]
滚动条的敏感度.
下面所属的鼠标指针是指在draggable控件移动过程中, 鼠标所处位置.
鼠标指针和与draggable控件所在容器的边距离为多少的时候, 滚动条开始滚动.
[代码示例]
$(‘.selector’).draggable({ scrollSensitivity: 40 });

(18)scrollSpeed:
[类型]整数值
[默认值]20
[产生影响]
由于scrollSensitivity导致的滚动发生时, 滚动条一次滚动多少像素值.
[代码示例]
$(‘.selector’).draggable({ scrollSpeed: 40 });

(19)snap
:
[类型]Boolean, 选择器
[默认值]false
[产生影响]
吸附功能, 设置为true等价与设置选择器.ui-draggable, 具体效果是在选择器指定的所有元素上, 当前的draggable控件都可以实现吸附功能, 吸附就是拖动过程中, 靠近但是还没有挨上目标组件是, 自动的将正在拖动的组件吸过去.
[代码示例]
$(‘.selector’).draggable({ snap: true });

(20)snapMode:
[类型]字符串, 可选值如下
‘inner’: 在指定的元素内部可以吸附
‘outer’: 在指定元素外部可以吸附
‘both’: 里面外面都可以吸附.
[默认值]‘both’
[产生影响]
设定吸附时候的模式.
[代码示例]
$(‘.selector’).draggable({ snapMode: ‘outer’ });

(21)snapTolerance:
[类型]整数
[默认值]20
[产生影响]
设定离目标对象的边多少像素的时候, 进行吸附.
[代码示例]
$(‘.selector’).draggable({ snap: true });

(22)stack:
[类型]对象{group: ‘.selector’, min: 50}
[默认值]false
[产生影响]
一次初始化一组draggable控件的时候, 将其中的一些draggable控件以给定选择器选择, 作为一组, 这时, 这一组draggable控件就可以实现当前被拖动的始终在最前效果, min用来指定这一组的z-index值的最小值.
[代码示例]
$(‘.selector’).draggable({ stack: { group: ‘products’, min: 50 } });

(23)zIndex:
[类型]整数
[默认值]false
[产生影响]
拖动时的helper(跟随鼠标移动的控件)的z-index值. z-index就是css中的层叠层数, 数值越大, 越在上层.
[代码示例]
$(‘.selector’).draggable({ zIndex: 2700 });



#### droppable的超级详细参数说明
1、事件
（1）activate
[产生影响]
这个事件会在任何允许的draggable对象开始拖动时触发.
它可以用来在你想让droppable对象在可以被填充的时”亮起来”的时候.
[代码示例]
$(‘.selector’).droppable({ activate: function(event, ui) { … } });

（2）deactivate
[产生影响]
此事件会在任何允许的draggable对象停止拖动时触发.
[代码示例]
$(‘.selector’).droppable({ deactivate: function(event, ui) { … } });

（3）over
[产生影响]
此事件会在一个允许的draggable对象”经过”(根据tolerance参数的定义判断)这个droppable对象时触发.
[代码示例]
$(‘.selector’).droppable({ over: function(event, ui) { … } });

（4）out
[产生影响]
会在一个允许的draggable对象离开(根据tolerance参数的定义判断)这个droppable对象时触发.
[代码示例]
$(‘.selector’).droppable({ out: function(event, ui) { … } });

（5）drop
[产生影响]
这个事件会在一个允许的draggable对象填充进这个droppable对象时触发.
回调函数中, $(this) 表示被填充的droppable对象. ui.draggable 表示draggable对象.
[代码示例]
$(‘.selector’).droppable({ drop: function(event, ui) { … } });

2、参数（选项
）

（1）accept
[类型]Selector, Function
[默认值]‘*’
接受所有符合选择器条件的draggable对象. 如果指定了一个函数, 该函数要求为页面上每个draggable对象(符合函数第一个条件的对象)提供一个过滤器.如果要这些元素被dropable接受,该函数需要返回true.
[代码示例]
使用指定的accept参数初始化一个droppable.
$(‘.selector’).droppable({ accept: ‘.special’ });

(2)activeClass
[类型]String
[默认值]false
[产生影响]
如果指定了该参数,在被允许的draggable对象填充时,droppable会被添加上指定的样式.
[代码示例]
使用指定的activeClass参数初始化一个droppable.
$(‘.selector’).droppable({ activeClass: ‘.ui-state-highlight’ });

(3)addClasses
[类型]Boolean
[默认值]true
[产生影响]
如果设置为false, 可以防止ui-droppable类在进行时添加. 这可能会使在初始化数百个元素执行.droppable()时使性能得到理想的优化.
[代码示例]
使用指定的addClasses参数初始化一个droppable.
$(‘.selector’).droppable({ addClasses: false });

(4)greedy
[类型]Boolean
[默认值]false
[产生影响]
如果设置为true,将在嵌套的droppable对象中阻止事件的传播.（阻止事件向上冒泡）
[代码示例]
使用指定的greedy参数初始化一个droppable.
$(‘.selector’).droppable({ greedy: true });

(5)hoverClass
[类型]String
[默认值]false
[产生影响]
如果设置了该参数,将在一个被允许的draggable对象悬停在droppable对象上时向droppable对象添加一个指定的样式.
[代码示例]
使用指定的hoverClass参数初始化一个droppable.
$(‘.selector’).droppable({ hoverClass: ‘drophover’ });

(6)scope
[类型]String
[默认值]‘default’
[产生影响]
用来设置draggle对象和droppable对象的组, 除了droppable中的accept属性指定的元素外,和droppable对象相同组的draggable对象也被允许添加到droppable对象中.
[代码示例]
使用指定的scope参数初始化一个droppable.
$(‘.selector’).droppable({ scope: ‘tasks’ });

(7)tolerance
[类型]String
允许使用的值: ‘fit’, ‘intersect’, ‘pointer’, ‘touch’.
fit: draggable 完全重叠到droppable
intersect: draggable 和droppable至少重叠50%
pointer: 鼠标重叠到droppable
touch: draggable和droppable的任意重叠
[默认值]‘intersect’
[产生影响]
指定使用那种模式来测试一个draggable”经过”一个droppable对象.
[代码示例]
使用指定的tolerance参数初始化一个droppable.
$(‘.selector’).droppable({ tolerance: ‘fit’ });