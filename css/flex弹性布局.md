# flex
用于设置或检索弹性盒模型对象的子元素如何分配空间

```语法
	flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;
```

## 兼容
注意: Internet Explorer 9 及更早版本不支持 flex 属性。

注意: Internet Explorer 10 通过 -ms-flex 属性来支持。 IE11 及更新版本完全支持 flex 属性 (不需要 -ms- 前缀)。

注意: Safari 6.1 (及更新浏览器) 通过 -webkit-flex 属性支持。

## 属性
```
	// 写在父元素的属性
	display:flex 		使用flex弹性布局
	flex-direction		定义子元素在父容器中排序的主轴方向
	justify-content		内容对齐方式
	align-items			元素在侧轴（纵轴）方向上的对齐方式
	flex-wrap			指定弹性盒子的子元素换行方式
	align-content 		属性用于修改 flex-wrap 属性的行为

	// 写在子元素属性
	order			排序,用整数值来定义排列顺序，数值小的排在前面。可以为负值
	align-self		用于设置弹性元素自身在侧轴（纵轴）方向上的对齐方式
	flex 			用于指定弹性子元素如何分配空间
	margin			设置"margin"值为"auto"值，自动获取弹性容器中剩余的空间


```

### flex-direction
定义子元素在父容器中排序的主轴方向
[  row | row-reverse | column | column-reverse ]
- row： 				x轴，默认的排列方式。
- row-reverse：		反转横向排列（右对齐，从后往前排，最后一项排在最前面。
- column： 			y轴排列。
- column-reverse：	反转纵向排列，从后往前排，最后一项排在最上面


### justify-content		
内容主轴对齐方式
flex-start | flex-end | center | space-between | space-around
- flex-start		弹性项目向行头紧挨着填充,默认值
- flex-end			弹性项目向行尾紧挨着填充
- flex-center		弹性项目居中紧挨着填充。（如果剩余的自由空间是负的，则弹性项目将在两个方向上同时溢出)
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


###	flex-wrap			
指定弹性盒子的子元素换行方式
nowrap|wrap|wrap-reverse|initial|inherit
- nowrap		默认，弹性容器为单行
- wrap 			弹性容器为多行，子元素会换行排列
- wrap-reverse	反转wrap排列
- initial


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


### align-self		
用于设置弹性元素自身在侧轴（纵轴）方向上的对齐方式
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


### flex 
用于指定弹性子元素如何分配空间
auto | initial | none | inherit |  [ flex-grow ] || [ flex-shrink ] || [ flex-basis ]
- auto: 		计算值为 1 1 auto
- initial: 		计算值为 0 1 auto
- none：			计算值为 0 0 auto
- inherit：		从父元素继承
- [ flex-grow ]：定义弹性盒子元素的扩展比率。
- [ flex-shrink ]：定义弹性盒子元素的收缩比率。
- [ flex-basis ]：定义弹性盒子元素的默认基准值。
