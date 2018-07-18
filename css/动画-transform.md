
# transform

3个和动画相关的属性 transform transition animation

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
