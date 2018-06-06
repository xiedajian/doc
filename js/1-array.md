

### 常用属性
```
len = arr.length;    //数组的长度（元素个数）

prototype               // prototype 属性使您有能力向对象添加属性和方法。
```


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


### 数组合并
newArr= arr1.concat(arr2, arr3...)     //  数组1合并数组2、3... 返回新的数组

// 参数也可以是具体的值
var a = [1,2,3];
document.write(a.concat(4,5));



### 数组分割  （pop ，shift，splice，slice  ）

1. lastDeleEle = arr.pop ()     //从数组最后一项，并返回移除的项
2. firstDeleEle = arr.shift()      // 数组删除第一个元素，并返回移除的项

3. slice() 方法 不改变原数组，截取原数组的一部分返回新数组

newArray = arr.slice (startIndex [,endIndex]) 

4. splice () 改变原数组，数组从startIndex索引开始删除deletecount数量的元素，并在startIndex索引位置添加新的元素，然后返回被删除的项目数组。
```
deleItemsArr = arr.splice (startIndex, deletecount, newItem1,newItem2...)  
```


### 数组添加元素  （push，unshift，splice ）
```
newLength = arr.push(ele1, ele2...)   //将新的元素ele添加到数组末尾 ，返回新的长度
newLength = arr.unshift(ele1, ele2...)   //将新的元素ele添加到数组开头 ，返回新的长度
deleItemsArr = arr.splice (startIndex, deletecount, newItem1,newItem2...)      // 改变原数组，数组从startIndex索引开始删除deletecount数量的元素，并在startIndex索引位置添加新的元素，然后返回被删除的项目数组。
```


### 遍历
```
for(var i=0;i<arr.length;i++){
 console.log(arr[i]);
}
```
```
for (x in arr){
    console.log(arr[x]);
}
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



