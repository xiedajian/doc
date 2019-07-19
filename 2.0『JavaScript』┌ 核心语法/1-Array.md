
# 数组对象 Array 

Array 对象用于在单个的变量中存储多个值。


# 新建数组

方式1：使用 Array 构造函数：

var array = new Array(值1,值2,值3);      //直接实例化

var array = new Array(size);           //创建数组并指定长度


方式2：使用数组字面量表示法隐式创建：

var arr4 = []; //创建一个空数组
var arr5 = [20]; // 创建一个包含1项的数组
var arr6 = ["lily","lucy","Tom"]; // 创建一个包含3个字符串的数组



# Array 对象属性

constructor
length
prototype



## length 属性

length 属性可设置或返回数组中元素的数目。

```
arrayObject.length

```

> 注意：arrayObject.length 并不能可靠的返回数组中元素的真实个数。length 返回的是最大的整数下标+1 ，如果key不是数字~返回就是0了~

数组的 length 属性总是比数组中定义的最后一个元素的下标大 1。对于那些具有连续元素，而且以元素 0 开始的常规数组而言，属性 length 声明了数组中的元素的个数。

数组的 length 属性在用构造函数 Array() 创建数组时被初始化。给数组添加新元素时，如果必要，将更新 length 的值。

设置 length 属性可改变数组的大小。如果设置的值比其当前值小，数组将被截断，其尾部的元素将丢失。如果设置的值比它的当前值大，数组将增大，新的元素被添加到数组的尾部，它们的值为 undefined。



### 是否为数组

1. typeof $arr		// Object

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

# js中判断数组中是否包含某元素的方法

## indexOf

arr.indexOf(某元素)：未找到则返回 -1,找到了返回元素的索引坐标。

实际用法：if(arr.indexOf(某元素) > -1){//则包含该元素}


##  includes() 方法

includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。

```
arr.includes(searchElement)
arr.includes(searchElement, fromIndex)				// fromIndex可选。从该索引处开始查找
```

```
['runoob', 'google', 'taobao'].includes('runoob'); 		// true 
['runoob', 'google', 'taobao'].includes('baidu'); 		// false 
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

Array.from() 方法有一个可选参数 mapFn，让你可以在最后生成的数组上再执行一次 map 方法后再返回。

也就是说 Array.from(obj, mapFn, thisArg) 就相当于 Array.from(obj).map(mapFn, thisArg), 除非创建的不是可用的中间数组。
 
 这对一些数组的子类,如  typed arrays 来说很重要, 因为中间数组的值在调用 map() 时需要是适当的类型。


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
arr.forEach(function(value,idex,array){
	console.log('key:' + i);
	console.log('value:' + v);
	value = 'newValue'; 	//
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
