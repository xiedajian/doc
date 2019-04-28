# flex
用于设置或检索弹性盒模型对象的子元素如何分配空间


## Flex 布局是什么？

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 Flex 布局。


.box{
  display: flex;
}
行内元素也可以使用 Flex 布局。

```
	.box{
	  display: inline-flex;
	}
	Webkit 内核的浏览器，必须加上-webkit前缀。


	.box{
	  display: -webkit-flex; /* Safari */
	  display: flex;
	}
```

## 基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size


```语法
	flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;
```


## 兼容
注意: Internet Explorer 9 及更早版本不支持 flex 属性。

注意: Internet Explorer 10 通过 -ms-flex 属性来支持。 IE11 及更新版本完全支持 flex 属性 (不需要 -ms- 前缀)。

注意: Safari 6.1 (及更新浏览器) 通过 -webkit-flex 属性支持。

注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效



## 属性
```
	// 写在父元素的属性
	display:flex 		使用flex弹性布局
	flex-direction		定义子元素在父容器中排序的主轴方向
	flex-wrap			指定弹性盒子的子元素换行方式,如果一条轴线排不下，如何换行。
	flex-flow			是flex-direction 和 flex-wrap 的简写形式
	justify-content		内容对齐方式,项目在主轴上的对齐方式
	align-items			元素在侧轴（纵轴）方向上的对齐方式
	align-content 		属性用于修改 flex-wrap 属性的行为

	// 写在子元素属性
	order			排序,用整数值来定义排列顺序，数值小的排在前面。可以为负值
	flex-grow		项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
	flex-shrink		项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
	flex-basis		定义了在分配多余空间之前，项目占据的主轴空间。它的默认值为auto，即项目的本来大小
	flex 			flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选
	align-self		align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch
	margin			设置"margin"值为"auto"值，自动获取弹性容器中剩余的空间

```

### flex-direction
定义子元素在父容器中排序的主轴方向
[  row | row-reverse | column | column-reverse ]
- row： 				x轴，默认的排列方式。
- row-reverse：		反转横向排列（右对齐，从后往前排，最后一项排在最前面。
- column： 			y轴排列。
- column-reverse：	反转纵向排列，从后往前排，最后一项排在最上面



###	flex-wrap			
指定弹性盒子的子元素换行方式,如果一条轴线排不下，如何换行
nowrap|wrap|wrap-reverse|initial|inherit
- nowrap		默认，弹性容器为单行,不换行
- wrap 			弹性容器为多行，子元素会换行排列，第一行在上边
- wrap-reverse	反转wrap排列，换行，第一行在下边
- initial


### flex-flow

是flex-direction 和 flex-wrap 的简写形式

.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}


### justify-content		
内容主轴对齐方式,项目在主轴上的对齐方式
flex-start | flex-end | center | space-between | space-around
- flex-start		弹性项目向行头紧挨着填充,默认值
- flex-end			弹性项目向行尾紧挨着填充
flex-center		弹性项目居中紧挨着填充。（如果剩余的自由空间是负的，则弹性项目将在两个方向上同时溢出)
- space-between		弹性项目平均分布在该行上
- space-around		弹性项目平均分布在该行上，两边留有一半的间隔空间


### align-items			
元素在侧轴方向上的对齐方式
 flex-start | flex-end | center | baseline | stretch
- flex-start	弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界
- flex-end		弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界
- center 		弹性盒子元素在该行的侧轴（纵轴）上居中放置
- baseline		如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐
- stretch		如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制



###	align-content
属性用于修改 flex-wrap 属性的行为。类似于 align-items, 但它不是设置弹性子元素的对齐，而是设置各个行的对齐。
flex-start | flex-end | center | space-between | space-around | stretch
- stretch 		 默认。各行将会伸展以占用剩余的空间。
- flex-start 	 各行向弹性盒容器的起始位置堆叠。
- flex-end 		 各行向弹性盒容器的结束位置堆叠。
- center 		 各行向弹性盒容器的中间位置堆叠。
- space-between  各行在弹性盒容器中平均分布。
- space-around   各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。






### order
排序,用整数值来定义排列顺序，数值小的排在前面。可以为负值
```
	item:first {order:-1}
```



### flex-grow		

属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

```
	.item {
	  flex-grow: <number>; /* default 0 */
	}
```

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。



###	flex-shrink		

属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小

```
	.item {
	  flex-shrink: <number>; /* default 1 */
	}

```
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。



### flex-basis		

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（mainsize）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小


```
	.item {
	  flex-basis: <length> | auto; /* default auto */
	}


```
它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。


### flex 

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

auto | initial | none | inherit |  [ flex-grow ] || [ flex-shrink ] || [ flex-basis ]
- auto: 		计算值为 1 1 auto
- initial: 		计算值为 0 1 auto
- none：			计算值为 0 0 auto
- inherit：		从父元素继承
- [ flex-grow ]：定义弹性盒子元素的扩展比率。
- [ flex-shrink ]：定义弹性盒子元素的收缩比率。
- [ flex-basis ]：定义弹性盒子元素的默认基准值。

```
	.item {
	  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
	}

```

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。




### align-self		

用于设置弹性元素自身在侧轴（纵轴）方向上的对齐方式

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch

auto | flex-start | flex-end | center | baseline | stretch
- auto：			如果'align-self'的值为'auto'，则其计算值为元素的父元素的'align-items'值，如果其没有父元素，则计算值为'stretch'。
- flex-start：	弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界。
- flex-end：		弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界。
- center：		弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）。
- baseline：		如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐。
- stretch：		如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制


### margin
设置"margin"值为"auto"值，自动获取弹性容器中剩余的空间。所以设置垂直方向margin值为"auto"，可以使弹性子元素在弹性容器的两上轴方向都完全集中。
可以通过这个特性实现完美居中：
```
	<style> 
	.flex-container {
	    display: -webkit-flex;
	    display: flex;
	    width: 400px;
	    height: 250px;
	    background-color: lightgrey;
	}

	.flex-item {
	    background-color: cornflowerblue;
	    width: 75px;
	    height: 75px;
	    margin: auto;
	}
	</style>

	<div class="flex-container">
	  <div class="flex-item">Perfect centering!</div>
	</div>

```



