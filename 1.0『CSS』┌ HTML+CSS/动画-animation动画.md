
http://www.w3school.com.cn/cssref/pr_animation.asp

# css3 动画

CSS3的animation属性可以像Flash制作动画一样，通过控制关键帧来控制动画的每一步，实现更为复杂的动画效果。

ainimation实现动画效果主要由两部分组成： 

1）通过类似Flash动画中的帧来声明一个动画； 

2）在animation属性中调用关键帧声明的动画。


- animation

- @keyframes 规则

使用方式：

 @keyframes 关键帧创建动画，animation绑定到一个选择器


## 浏览器支持
Internet Explorer 10、Firefox 以及 Opera 支持 animation 属性。

Safari 和 Chrome 支持替代的 -webkit-animation 属性。

注释：Internet Explorer 9 以及更早的版本不支持 animation 属性。



## @keyframes 规则

关键帧

动画是使元素从一种样式逐渐变化为另一种样式的效果。

您可以改变任意多的样式任意多的次数。

用百分比来规定变化发生的时间，或用关键词 "from" 和 "to"，等同于 0% 和 100%。

0% 是动画的开始，100% 是动画的完成。

为了得到最佳的浏览器支持，您应该始终定义 0% 和 100% 选择器。

实例:

当动画为 25% 及 50% 时改变背景色，然后当动画 100% 完成时再次改变：

```

	@keyframes myfirst
	{
	    0%   {background: red;}
	    25%  {background: yellow;}
	    50%  {background: blue;}
	    100% {background: green;}
	}
	 
	@-webkit-keyframes myfirst /* Safari 与 Chrome */
	{
	    0%   {background: red;}
	    25%  {background: yellow;}
	    50%  {background: blue;}
	    100% {background: green;}
	}

```


##  animation定义和用法

animation 属性是一个简写属性，用于设置六个动画属性：

- animation-name				规定需要 @keyframes 动画的名称
- animation-duration			规定动画完成一个周期所花费的秒或毫秒。默认是 0
- animation-timing-function		规定动画的速度曲线。默认是 "ease"。
- animation-delay				规定在动画开始之前的延迟.默认是 0。
- animation-iteration-count		规定动画应该播放的次数。默认是 1。
- animation-direction			规定是否应该轮流反向播放动画。默认是 "normal"。
- animation-play-state 			设置动画的播放状态，播放还是暂停

注释：请始终规定 animation-duration 属性，否则时长为 0，就不会播放动画了。

默认值：	none 0 ease 0 1 normal
继承性：	no
版本：	CSS3

JavaScript 语法：	

object.style.animation="mymove 5s infinite"




### animation-name

animation-name 属性为 @keyframes 动画规定名称。

JavaScript 语法：	object.style.animationName="mymove"

```
	@keyframes mymove {
		
	}

	.div{
		animation-name: mymove;
	}
```


### animation-duration			

规定动画完成一个周期所花费的秒或毫秒。默认是 0

```
	.div{
		animation-duration: 2s;
	}
```

### animation-timing-function		

规定动画的速度曲线。默认是 "ease"。

- linear				动画从头到尾的速度是相同的。	
- ease					默认。动画以低速开始，然后加快，在结束前变慢。	
- ease-in				动画以低速开始。	
- ease-out				动画以低速结束。	
- ease-in-out			动画以低速开始和结束。	
- cubic-bezier(n,n,n,n)	在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。

```
	.div{
		animation-timing-function: linear;
	}

```


### animation-delay				

规定在动画开始之前的延迟.默认是 0。


```
	.div{
		animation-delay	: 2s;
	}
```


### animation-iteration-count		

规定动画应该播放的次数。默认是 "normal"。

- n 		一个数字，定义应该播放多少次动画
- nfinite	指定动画应该播放无限次（永远）

```
	.div{
		animation-iteration-count: 1;
	}

```


### animation-direction			

规定是否应该轮流反向播放动画。默认是 "normal"。

- normal				默认值。动画按正常播放。	测试 »
- reverse				动画反向播放。	测试 »
- alternate 			动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。	测试 »
- alternate-reverse		动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放。	测试 »
- initial				设置该属性为它的默认值。请参阅 initial。	
- inherit。				从父元素继承该属性。请参阅 inherit。

```
	.div{
		animation-direction	: normal;
	}


```


### animation-play-state 属性

设置动画的播放状态，播放还是暂停


JavaScript 语法:		object.style.animationPlayState="paused"

语法

animation-play-state: paused|running;


- paused	指定暂停动画	测试 »
- running	指定正在运行的动画

```
	.div{
		animation-play-state	: paused;
	}

```






#### 完整案例

上下浮动：

```
	.div{
		-webkit-animation: float ease-in-out 3s infinite;
	    animation: float ease-in-out 3s infinite;
	}


	/* 上下浮动动画 */
	@-webkit-keyframes float {
	    0% {
	        -webkit-transform: translateY(0);
	        transform: translateY(0);
	    }
	    50% {
	        -webkit-transform: translateY(10px);
	        transform: translateY(10px);
	    }
	    100% {
	        -webkit-transform: translateY(0);
	        transform: translateY(0);
	    }
	}
	@keyframes float {
	    0% {
	        -webkit-transform: translateY(0);
	        transform: translateY(0);
	    }
	    50% {
	        -webkit-transform: translateY(10px);
	        transform: translateY(10px);
	    }
	    100% {
	        -webkit-transform: translateY(0);
	        transform: translateY(0);
	    }
	}

```



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
