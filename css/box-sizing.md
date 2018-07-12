

# box-sizing

在CSS中，你设置一个元素的 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width "width 属性指定了元素内容区的宽度. 内容区在元素padding，border和margin里面。") 与 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height "height 指定元素内容区高度。 内容区 content area 在元素padding, border, and margin 的里面。") 只会应用到这个元素的内容区。如果这个元素有任何的 [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border "CSS的border属性是一个用于设置各种单独的边界属性的简写属性。border可以用于设置一个或多个以下属性的值： border-width, border-style, border-color。") 或 [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding "padding属性设置一个元素的内边距，padding 区域指一个元素的内容和其边界之间的空间，该属性不能为负值。") ，绘制到屏幕上时的盒子宽度和高度会加上设置的边框和内边距值。这意味着当你调整一个元素的宽度和高度时需要时刻注意到这个元素的边框和内边距。当我们实现响应式布局时，这个特点尤其烦人。


**`box-sizing `**属性用于更改用于计算元素宽度和高度的默认的 [CSS 盒子模型](https://developer.mozilla.org/en-US/docs/CSS/Box_model "CSS/Box_model")。可以使用此属性来模拟不正确支持CSS盒子模型规范的浏览器的行为。
```
/* 关键字 值 */
box-sizing: content-box;
box-sizing: border-box;

/* 全局 值 */
box-sizing: inherit;
box-sizing: initial;
box-sizing: unset;
```
#### content-box
默认值，标准盒子模型。 width 与 height 只包括内容的宽和高， 不包括边框（border），内边距（padding），外边距（margin）。注意: 内边距, 边框 & 外边距 都在这个盒子的外部。 比如. 如果 .box {width: 350px}; 而且 {border: 10px solid black;} 那么在浏览器中的渲染的实际宽度将是370px;
尺寸计算公式：width = 内容的宽度，height = 内容的高度。宽度和高度都不包含内容的边框（border）和内边距（padding）。
#### border-box
 width 和 height 属性包括内容，内边距和边框，但不包括外边距。这是当文档处于 Quirks模式 时Internet Explorer使用的盒模型。注意，填充和边框将在盒子内 , 例如, .box {width: 350px; border: 10px solid black;} 导致在浏览器中呈现的宽度为350px的盒子。内容框不能为负，并且被分配到0，使得不可能使用border-box使元素消失。
这里的维度计算为：
width = border + padding + 内容的  width，
height = border + padding + 内容的 height。


参考：[https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)
