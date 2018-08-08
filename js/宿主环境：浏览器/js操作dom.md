
# dom

文档对象模型（Document Object Model）

当网页被加载时，浏览器会创建页面的文档对象模型

js可以操作dom，操作dom样式，添加事件监听


## 查找获取节点

- querySelector()
- querySelectorAll()
- getElementById()
- getElementsByName()
- getElementsByTagName()
- getElementsByClassName()
- getAttribute()
- setAttribute()

```
var node     = document.querySelector("#id");
var nodeList = document.querySelectorAll(".class");
var nodeList = document.querySelectorAll("p");
var node     = document.getElementById("idName");
var nodeList = document.getElementsByTagName("tagName");
var nodeList = document.getElementsByClassName("className");
```

## 创建节点

- createElement()
- createTextNode()
- createAttribute()
- cloneNode()
- createDocumentFragment()      // 文档碎片

```
var p = document.createElement("p");
var node = document.createTextNode("这是新段落。");
p.appendChild(node);
body.appendChild(p)
```


## 修改节点  

- appendChild(node)
- insertBefore(newNode,refNode)
- replaceChild(newChild,oldChild)
- removeChild(node)                 // 删除节点

```
parent.appendChild(child);
parentNode.insertBefore(newNode, refNode);
parent.replaceChild(newChild, oldChild);
var deletedChild = parent.removeChild(node);
```


##### 修改节点属性

```
ele.attribute='new value'
ele.style.color="red";
// css中用-链接的属性，在js中用驼峰法
ele.style.backgaroundColor="red";
```

##### 修改节点内容

- innerHTML     // 元素的所有文本，包括html代码
- innerText     // 元素的自身及子代所有文本值，只是文本内容，不包括html代码
  
```
ele.innerHTML="文本内容"
ele.innerText="文本内容"
```


