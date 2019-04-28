
##### 问题
当委托给一个元素添加click事件时，如果事件是委托到 document 或 body 上，并且委托的元素是默认不可点击的(如 div, span 等)，此时 click 事件会失效。
例如：
```
//加载更多
$('body').on('click','.showMoreData',function () {

})

```

##### 问题的原因
>React attaches event listeners to the document. iOS doesn't fire click events for nodes (at all) unless they seem "clickable"


> Safari真的不希望你点击任何不是<a>标签的东西。这是一个已知的问题：http : //stackoverflow.com/questions/5421659/html-label-command-doesnt-work-in-iphone-browser/6472181#6472181

大概意思就是ios不认为这个元素是可以点击的

##### 多种解决办法：
- 将 click 事件直接绑定到目标元素(即 .target ) 上
- 将目标元素换成 <a> 或者 <button> 等可点击的元素
- 给目标元素添加一个空的 onclick=""(<div class="target"onclick="">点击我!</div>)
- 把 click 改成 touchend 或 touchstart（注意加上preventDefault）
- 将 click 元素委托到非 document 或 body 的父级元素上
- 给目标元素加一条样式规则 cursor: pointer; (cursor: pointer; -webkit-tap-highlight-color: transparent;)

