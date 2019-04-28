
# 不是所有的css样式都被支持

*Weex 对于长度值目前只支持像素值，不支持相对单位（em、rem）。其他都不支持，包括 %*



# 文本样式

文本类组件共享一些通用样式, 这类组件目前包括 <text> 和 <input>。

- color {color}：文字颜色
- lines {number}: 指定文本行数。仅在 <text> 组件中支持。默认值是 0 代表不限制行数。
- font-size {number}：文字大小。
- font-style {string}：字体类别。可选值 normal | italic，默认为 normal
- font-weight {string}v0.9+：字体粗细程度
- text-decoration {string}：字体装饰，可选值 none | underline | line-through，默认值为 none
- text-align {string}：对齐方式。可选值 left | center | right，默认值为 left
- font-family {string}：设置字体
- text-overflow {string}：设置内容超长时的省略样式。可选值 clip | ellipsis



# 盒子模型

Weex 盒模型基于 CSS 盒模型，每个 Weex 元素都可视作一个盒子。我们一般在讨论设计或布局时，会提到「盒模型」这个概念。

margin,border,padding,content

*Weex 盒模型的 box-sizing 默认为 border-box*

写法：
width {length}：，默认值 0
height {length}：，默认值 0

## marigin

外边距，元素和元素之间的空白距离。值类型为 length，默认值 0

可有如下写法：

- margin-left {length}：，默认值 0
- margin-right {length}：，默认值 0
- margin-top {length}：，默认值 0
- margin-bottom {length}：，默认值 0


## border

*设定边框，border 目前不支持类似这样 border: 1 solid #ff0000; 的组合写法*

可有如下写法：

border-style： 选值为 solid | dashed | dotted，默认值 solid
border-left-style {string}：可选值为 solid | dashed | dotted

border-width {length} 设定边框宽度，非负值, 默认值 0
border-left-width {length}：，非负值, 默认值 0

border-color {color}         设定边框颜色，默认值 #000000
border-left-color {color}：，默认值 #000000

border-radius {length}：    设定圆角，默认值 0
border-bottom-left-radius {length}：，非负值, 默认值 0
border-top-left-radius {length}

*目前在 <image> 组件上尚无法只定义一个或几个角的 border-radius。比如你无法在这两个组件上使用 border-top-left-radius。该约束只对 iOS 生效，Android 并不受此限制*

*尽管 overflow:hidden 在 Android 上是默认行为，但只有下列条件都满足时，一个父 view 才会去 clip 它的子 view。这个限制只对 Android 生效，iOS 不受影响。*

- 父view是div, a, cell, refresh 或 loading。
- 系统版本是 Android 4.3 或更高。
- 系统版本不是 Andorid 7.0。
- 父 view 没有 background-image 属性或系统版本是 Android 5.0 或更高。


# Flex 容器

在 Weex 中，Flexbox 是默认且唯一的布局模型，所以你不需要手动为元素添加 display: flex; 属性。

// 父亲
flex-direction
justify-content
align-items

// 子
flex 
flex {number}：值为 number 类型



#  position 定位

Weex 支持 position 定位，用法与 CSS position 类似。为元素设置 position 后，可通过 top、right、bottom、left 四个属性设置元素坐标。


position {string}：可选值为 relative | absolute | fixed | sticky，默认值为 relative。

- relative 是默认值，指的是相对定位；
- absolute 是绝对定位，以元素的容器作为参考系；
- fixed 保证元素在页面窗口中的对应位置显示；
- sticky 指的是仅当元素滚动到页面之外时，元素会固定在页面窗口的顶部。

*Weex 目前不支持 z-index 设置元素层级关系，但靠后的元素层级更高，因此，对于层级高的元素，可将其排列在后面。*

*如果定位元素超过容器边界，在 Android 下，超出部分将不可见，原因在于 Android 端元素 overflow 默认值为 hidden，但目前 Android 暂不支持设置 overflow: visible*


# transform

transform 属性向元素应用 2D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜

目前支持的 transform 声明格式

- ranslate( <number/percentage> [, <number/percentage>]?)
- translateX( <number/percentage> )
- translateY( <number/percentage> )
- scale( )
- scaleX( )
- scaleY( )
- rotate( <angle/degree> )
- rotateX( <angle/degree> ) v0.14+
- rotateY( <angle/degree> ) v0.14+
- perspective( ) Android 4.1及以上版本支持 v0.16+
- transform-origin: number/percentage/keyword(top/left/right/bottom)



# transition 

现在您可以在CSS中使用transition属性来提升您应用的交互性与视觉感受，transition中包括布局动画，即LayoutAnimation，现在布局产生变化的同时也能使用transition带来的流畅动画。transition允许CSS的属性值在一定的时间区间内平滑地过渡。

- transition-property         允许过渡动画的属性名
- transition-duration         :指定transition过渡的持续时间 (单位是毫秒)，默认值是 0
- transition-delay            :指定请求transition过渡操作到执行transition过渡之间的时间间隔 (单位是毫秒或者秒)，默认值是 0，表示没有延迟
- transition-timing-function  :描述transition过渡执行的速度曲线，默认值是 ease


transition-property可以设置的属性名：
- width	transition过渡执行的时候是否组件的宽度参与动画
- height	transition过渡执行的时候是否组件的高度参与动画
- top	transition过渡执行的时候是否组件的顶部距离参与动画
- bottom	transition过渡执行的时候是否组件的底部距离参与动画
- left	transition过渡执行的时候是否组件的左侧距离参与动画
- right	transition过渡执行的时候是否组件的右侧距离参与动画
- backgroundColor	transition过渡执行的时候是否组件的背景颜色参与动画
- opacity	transition过渡执行的时候是否组件的不透明度参与动画
- transform	transition过渡执行的时候是否组件的变换类型参与动画


transition-timing-function的取值：
- ease	transition过渡逐渐变慢的过渡效果
- ease-in	transition过渡慢速开始，然后变快的过渡效果
- ease-out	transition过渡快速开始，然后变慢的过渡效果
- ease-in-out	transition过渡慢速开始，然后变快，然后慢速结束的过渡效果
- linear	transition过渡以匀速变化
- cubic-bezier(x1, y1, x2, y2)	使用三阶贝塞尔函数中自定义transition变化过程，函数的参数值必须处于 0 到 1 之间


# 伪类

Weex 支持四种伪类：active, focus, disabled, enabled

所有组件都支持 active, 但只有 input 组件和 textarea 组件支持 focus, enabled, disabled。

同时生效的时候，优先级高覆盖优先级低

例如：input:active:enabled 和 input:active 同时生效，前者覆盖后者


# 线性渐变

Weex 支持线性渐变背景。所有组件均支持线性渐变。

可以通过 background-image 属性创建线性渐变。

background-image: linear-gradient(to top,#a80077,#66ff00);

详细参考文档：http://weex.apache.org/cn/wiki/common-styles.html#xian-xing-jian-bian-v0-10


# 阴影(box-shadow)

*box-shadow仅仅支持iOS*

Weex 支持阴影属性：active, focus, disabled, enabled inset(可选),offset-x,offset-y, blur-radius,color

