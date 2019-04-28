

# 怎么样让js的object里的值按照一个规则顺序输出？

在用xlsx.js导出excel文档的时候遇到了一个问题，json对象的属性没有按照字母顺序来导出，是杂乱无序的


解决方法：

由于对象是无序的，但数组是有序的，故可以利用这一点实现题主想要的效果。

用Object.keys()提取所有的属性按照你想要的排序方法排序好之后再遍历读取出对象的属性值。

这时候如果数组的每项值都是对象的 key，循环这个数组,则可达到更改对象中值显示顺序的效果
```
var obj = {
	name :"coder",
	age : 1024,
	address : "segmentfault"
};
var objKeys = Object.keys(obj);
objKeys = objKeys.sort();//这里写所需要的规则
for(var i=0;i<objKeys.length;i++){
	console.log(objKeys[i]+" : "+obj[objKeys[i]]);
}
```

[参考](https://segmentfault.com/q/1010000000765467)