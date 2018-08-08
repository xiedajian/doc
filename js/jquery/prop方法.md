


# prop

prop() 方法设置或返回被选元素的属性和值

当该方法用于返回属性值时，则返回第一个匹配元素的值。

当该方法用于设置属性值时，则为匹配元素集合设置一个或多个属性/值对


*注意：prop() 方法应该用于检索属性值，例如 DOM 属性（如 selectedIndex, tagName, nodeName, nodeType, ownerDocument, defaultChecked, 和 defaultSelected）。*

*如需检索 HTML 属性，请使用 attr() 方法代替*

*如需移除属性，请使用 removeProp() 方法。*



# 语法

```
$(selector).prop(property)
$(selector).prop(property,value)
$(selector).prop(property,function(index,currentvalue))     // 规定返回要设置的属性值的函数。
$(selector).prop({property:value, property:value,...})
```


## prop() attr() 的不同

- 对于HTML元素本身就带有的固有属性，在处理时，使用prop方法。
- 对于HTML元素我们自己自定义的DOM属性，在处理时，使用attr方法。

prop() 和 attr() 可能返回不同的值

```
<input id="check1" type="checkbox" checked="checked">
<label for="check1">Check me</label>
<p id="p1"></p>



$("button").click(function(){
    $("#p1").html("attr('checked'): " + $("input").attr('checked')
                    + "<br>prop('checked'): " + $("input").prop('checked'));
});
```