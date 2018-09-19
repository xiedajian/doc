

#  transition

过渡效果 


> CSS3的过渡功能就像是一种黄油，可以让CSS的一些变化变得平滑。因为原生的CSS过渡在客户端需要处理的资源要比用JavaScript和Flash少的多，所以才会更平滑。


transition的属性

- transition-property 			指定要过渡的css属性

- transition-duration 			指定完成过渡要花费的时间，默认值为0秒

- transition-timing-function 	指定过渡函数，liner ：匀速 ease-in：减速 ease-out：加速 ease-in-out：先加速再减速 cubic-bezier：三次贝塞尔曲线

- transition-delay 				指定过渡开始的延迟时间


属性可以分开写，也可以一起写

transition: <transition-property> || <transition-duration> || <transition-timing-function> || <transition-delay>

	

### 可以更改的属性、

不是所有属性都能过渡，只有属性具有一个中间点值才具备过渡效果

列表： http://oli.jp/2010/css-animatable-properties/

### 触发过渡

单纯的代码不会触发任何过渡操作，需要通过用户的行为（如点击，悬浮等）触发，可触发的方式有： 
:hoever :focus :checked 媒体查询触发 JavaScript触发


### 局限性

transition的优点在于简单易用，但是它有几个很大的局限。

（1）transition需要事件触发，所以没法在网页加载时自动发生。 

（2）transition是一次性的，不能重复发生，除非一再触发。 

（3）transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。 

（4）一条transition规则，只能定义一个属性的变化，不能涉及多个属性。 

CSS Animation就是为了解决这些问题而提出的。


### 需要兼容

```
	.postcard:hover {
	  -webkit-transition-property: -webkit-transform;
	     -moz-transition-property:    -moz-transform;
	      -ms-transition-property:     -ms-transform;
	       -o-transition-property:      -o-transform;
	          transition-property:         transform;
	}

```
案例：

```
	img{
	    height:15px;
	    width:15px;
	    transition: 1s 1s height ease;/*合在一起*/
	}
	//或者：
	img{
	    height：15px;
	    width: 15px;
	    transition-property: height;
	    transition-duration: 1s;
	    transition-delay: 1s;
	    transition-timing-function: ease;/*属性分开写*/
	}

	img:hover{
	    height: 450px;
	    width: 450px;
	}


```


### 

## 3个和动画相关的属性 transform transition animation

其中 transform 描述了元素静态样式

而transition 和 animation 却都能实现动画效果。

所以三者之中transform 常常配合后两者使用

但后两者又有什么区别呢？

不同点：

1.  触发条件不同。transition通常和hover等事件配合使用，由事件触发。animation则和gif动态图差不多，立即播放。

2. 循环。 animation可以设定循环次数。

3. 精确性。 animation可以设定每一帧的样式和时间。tranistion 只能设定头尾。 animation中可以设置每一帧需要单独变化的样式属性， transition中所有样式属性都要一起变化。

4. 与javascript的交互。animation与js的交互不是很紧密。tranistion和js的结合更强大。js设定要变化的样式，transition负责动画效果，天作之合，比之前只能用js时爽太多。

结论：

1. 如果要灵活定制多个帧以及循环，用animation.

2. 如果要简单的from to 效果，用 transition.

3. 如果要使用js灵活设定动画属性，用transition.
