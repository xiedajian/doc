即使使用jquery，还是要做兼容的，其实，只有在jquery封装的事件方法里使用event才可以不考虑兼容

### 1. event

   IE：直接使用event就行，为保险起见，写成window.event；
   FF：window.event要报错，提示undefined，经查询，发现要用参数引导才能使用；
   原生js兼容写法： 
 
```
function foo(event){
    var evt = event || window.event;
}
```
   如果有引入jquery：
```
$(".btn").click(function(event){
    alert(event.type);
})
 ```

### 2. event.target属性: 获取触发事件的元素对象

    原生js:
  ```
function foo(event){
    var evt = window.event||event;
    var targetObj = evt.target||evt.srcElement;
}
```
 jquery写法:
```
$(".btn").click(function(event){
    alert(event.target);
})
``` 
### 3.event.preventDefault  阻止事件默认行为 
```
event.preventDefault ? (event.preventDefault()) : (event.returnValue = false);
```
### 4.event.stopPropagation 阻止事件冒泡 
```
event.stopPropagation ? (event.stopPropagation()) :  (event.cancelBubble = true);
```
### 5.addEventListener 
```
 // 添加事件
        if (element.addEventListener) {  
            element.addEventListener(type, hanlder, false);  
        }  
        else if (element.attachEvent) {  
            element.attachEvent('on' + type, hanlder);  
        }  
        else {  
            element['on' + type] = hanlder;  
        }  

   // 删除事件  
        if (element.removeEventListener) {  
            element.removeEventListener(type, hanlder, false);  
        }  
        else if (element.detachEvent()) {  
            element.detachEvent('on' + type, hanlder);  
        }  
        else {  
            element['on' + type] = null;  
        }  
```
