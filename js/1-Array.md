


# 常用属性
```
len = arr.length;    //数组的长度（元素个数）

prototype               // prototype 属性使您有能力向对象添加属性和方法。
```


# 新建数组
var arr = new Array();
var arr = [];
arr['key'] = value;


### 是否为数组
1. typeof $arr

2. $arr instanceof Array

3. $arr.constructor==Array

4. Array.isArray(arr)方法   // 新方法

//以上各有不足，通用做法
```
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```



# 数组合并
newArr= arr1.concat(arr2, arr3...)     //  数组1合并数组2、3... 返回新的数组

// 参数也可以是具体的值
var a = [1,2,3];
document.write(a.concat(4,5));



# 数组分割  （pop ，shift，splice，slice  ）

1. lastDeleEle = arr.pop()     //删除数组最后一项（改变原数组），并返回移除的项

2. firstDeleEle = arr.shift()      // 数组删除第一个元素（改变原数组），并返回移除的项

3. slice() 方法 不改变原数组，截取原数组的一部分返回新数组

newArray = arr.slice (startIndex [,endIndex]) 

4. splice () 改变原数组，数组从startIndex索引开始删除deletecount数量的元素，并在startIndex索引位置添加新的元素，然后返回被删除的项目数组。
```
deleItemsArr = arr.splice (startIndex, deletecount, newItem1,newItem2...)  
```
	

# 数组添加元素  （push，unshift，splice ）
```
newLength = arr.push(ele1, ele2...)   //将新的元素ele添加到数组末尾 ，返回新的长度

newLength = arr.unshift(ele1, ele2...)   //将新的元素ele添加到数组开头 ，返回新的长度

deleItemsArr = arr.splice (startIndex, deletecount, newItem1,newItem2...)      // 改变原数组，数组从startIndex索引开始删除deletecount数量的元素，并在startIndex索引位置添加新的元素，然后返回被删除的项目数组。
```



### 数组排序
arr.sort(sortbyFunction)   //排序,改变原数组，没有返回值.  参数sortbyFunction为空时 按照字符码值排序

// 自定义排序 （sortbyFunction为比较函数）
```
             function fun (a,b){
            
               return b-a;
            
            }
            
            var arr = [1,100,2];
            alert(arr.sort(fun));  排序
```

// 颠倒数组中元素的顺序    （reverse）

arrayObject.reverse()      // 颠倒数组中元素的顺序，该方法会改变原来的数组，而不会创建新的数组,没有返回值



### 数组转字符串 （join，toString，toLocaleString）

```
str = Arr.join(separator)   //数组中的所有元素用separator分隔符拼接成字符串（默认用逗号分隔），返回字符串
str = Arr.toString()    //把数组转换为字符串，并返回结果  ,返回值与没有参数的 join() 方法返回的字符串相同
str = Arr.toLocaleString()    //把数组转换为本地字符串，并返回结果 ,与toString()在平时基本使用时无明显差别
```


## Array.from 

从一个类似数组或可迭代对象中创建一个新的数组实例。

- 伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）
- 可迭代对象（可以获取对象中的元素,如 Map和 Set 等）

Array.from() 方法有一个可选参数 mapFn，让你可以在最后生成的数组上再执行一次 map 方法后再返回。也就是说 Array.from(obj, mapFn, thisArg) 就相当于 Array.from(obj).map(mapFn, thisArg), 除非创建的不是可用的中间数组。 这对一些数组的子类,如  typed arrays 来说很重要, 因为中间数组的值在调用 map() 时需要是适当的类型。


```

	Array.from('foo'); 
	// ["f", "o", "o"]
	
	let s = new Set(['foo', window]); 
	Array.from(s); 
	// ["foo", window]
	
	let m = new Map([[1, 2], [2, 4], [4, 8]]);
	Array.from(m); 
	// [[1, 2], [2, 4], [4, 8]]

```





# 遍历

1、使用 for() 遍历
```
for(var i=0;i<arr.length;i++){
 console.log(arr[i]);
}
```

2、使用forEach遍历
```
arr.forEach(function(v,i,array){
	console.log('key:' + i);
	console.log('value:' + v);
});
```

3、使用for..in..遍历
```
for (var x in arr){
    console.log(arr[x]);
}
```

4、使用for-of遍历
```
// ES6 for of
var arr=[1,2,3,4,5,6];
for(var value of Arr){
    console.log(value);
} 
```

5、使用 map 遍历
```
// map
var newArray = arr.map(function(item){
	return item;
});
```

6、使用 filter 过滤遍历
```
// filter
var newArray = arr.filter(function(item){

		if(typeof item == 'number'){
			return item
		}
	});

```

7、 every 遍历数组的每一项，都返回true，才为true
```
var bool = arr.every(function(ele){
	if(typeof ele == 'string'){
	return true;
	}
})
```

8、 some()  只要数组中有一项返回true，就位true
```
var bool = arr.some(function(ele){
		if(typeof ele == 'string'){
			return true
		}
	});
```




# 数组的值传递与引用传递、

``` 
var a = [1,2,3];
var b = a;
a = [4,5,6];
alert(b);  //[1,2,3]
```

```
var a = [1,2,3];
var b = a;
a.pop();
alert(b);  //[1,2]
```

a = [4,5,6];  //改变的是a引用本身，没有改变数组对象

a.pop();//改变的是数组对象，a引用没有改变。

b = a;//该操作后，b直接指向数组对象，不是b指向a，a再指向数组。

//所以改变a引用并不会对b引用造成影响，改变数组对象可以。
