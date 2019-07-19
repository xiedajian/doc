
[参考](https://www.jianshu.com/p/16233d92fd6d)

场景
下拉列表有4个选项
用户按照先后排序后保存
[2, 4, 1, 3]
保存完后，按照顺序进行排序
```
let options = [
	{id: 1,name: '北京'}, 
	{id: 2,name: '上海'}, 
	{id: 3,name: '深圳'}, 
	{id: 4,name: '杭州'}, 
	];
```

思路，两个数组，排序有点困难
如果变成一个数组排序，就方便了

我们给每个option新增一个排序属性sordId
这个sordId的值就是 option的id在 showArr中的索引位置
```
      let showArr = [2, 4, 1, 3]
        options.forEach(item=>{
            let sortId = showArr.indexOf(item.id)
            item.sortId = sortId
        })
```

现在我们的options数组已经可以排序了
```
let options = [
	{id: 1,name: '北京',sortId:2}, 
	{id: 2,name: '上海',sortId:0}, 
	{id: 3,name: '深圳',sortId:3}, 
	{id: 4,name: '杭州',sortId:1}, 
	];
```

再写一个对象数组按照属性名排序的方法
```
	//按照prop属性升序排序
    function sort(prop) {
      return function (obj1, obj2) {
        var val1 = obj1[prop]
        var val2 = obj2[prop]
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1)
                val2 = Number(val2)
            }
            if (val1 < val2) {
                return -1
            } else if (val1 > val2) {
                return 1
            } else {
                return 0
            }
        }
    }
	let options = [
		{id: 1,name: '北京'}, 
		{id: 2,name: '上海'}, 
		{id: 3,name: '深圳'}, 
		{id: 4,name: '杭州'}, 
		];
    let showArr = [2, 4, 1, 3]
	options.forEach(item=>{
		let sortId = showArr.indexOf(item.id)
		item.sortId = sortId
	})
	let sortArr = options.sort(sort('sortId'))
	console.log(sortArr)
```

最后输出
```
[
	{id: 2,name: '上海',sortId:0},
	{id: 4,name: '杭州',sortId:1}, 
	{id: 1,name: '北京',sortId:2}, 
	{id: 3,name: '深圳',sortId:3}, 
];
```





