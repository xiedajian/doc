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
	// 父元素
	display:flex 		使用flex弹性布局
	flex-direction		定义子元素在父容器中排序的主轴方向
	justify-content		内容对齐方式
	align-items			元素在侧轴（纵轴）方向上的对齐方式
	flex-wrap			指定弹性盒子的子元素换行方式
	align-content 

	// 弹性子元素属性
	order			设置弹性容器内弹性子元素的属性
	align-self		用于设置弹性元素自身在侧轴（纵轴）方向上的对齐方式
	flex 			用于指定弹性子元素如何分配空间


```

### flex-direction
定义子元素在父容器中排序的主轴方向
[  row | row-reverse | column | column-reverse ]
- row： 				x轴，默认的排列方式。
- row-reverse：		反转横向排列（右对齐，从后往前排，最后一项排在最前面。
- column： 			y轴排列。
- column-reverse：	反转纵向排列，从后往前排，最后一项排在最上面


### justify-content		
内容对齐方式
flex-start | flex-end | center | space-between | space-around
- flex-start		弹性项目向行头紧挨着填充,默认值
- flex-end			弹性项目向行尾紧挨着填充
- flex-center		弹性项目居中紧挨着填充。（如果剩余的自由空间是负的，则弹性项目将在两个方向上同时溢出)
- space-between		弹性项目平均分布在该行上
- space-around		弹性项目平均分布在该行上，两边留有一半的间隔空间


### align-items			
元素在侧轴（纵轴）方向上的对齐方式



###	flex-wrap			
指定弹性盒子的子元素换行方式



### 使用
父元素 display:flex ，子元素 flex：1 配合使用

