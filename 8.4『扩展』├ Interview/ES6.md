

## let和const

在ES5中var定义的变量会提升到作用域中所有的函数与语句前面，而ES6中let定义的变量则不会，let声明的变量会在其相应的代码块中建立一个暂时性死区，直至变量被声明。
let和const都能够声明块级作用域，用法和var是类似的，let的特点是不会变量提升，而是被锁在当前块中。


symbol
但是ES6出来之后，新增了一种数据类型，名叫symbol，像它的名字表露的一样，意味着独一无二，意思是每个 Symbol类型都是独一无二的，不与其它 Symbol 重复。
可以通过调用 Symbol() 方法将创建一个新的 Symbol 类型的值，这个值独一无二，不与任何值相等。
```
var mySymbol=Symbol();
console.log(typeof mySymbol) //"symbol"
```



## Map和Set

Map和Set都叫做集合，但是他们也有所不同。
Set常被用来检查对象中是否存在某个键名，Map集合常被用来获取已存的信息。

Set是有序列表，含有相互独立的非重复值。

Array和Set对比:
都是一个存储多值的容器，两者可以互相转换，但是在使用场景上有区别。如下:
Array的indexOf方法比Set的has方法效率低下
Set不含有重复值（可以利用这个特性实现对一个数组的去重）
Set通过delete方法删除某个值，而Array只能通过splice。两者的使用方便程度前者更优
Array的很多新方法map、filter、some、every等是Set没有的（但是通过两者可以互相转换来使用）

Object和Map对比:
Object是字符串-值，Map是值-值
Object键为string类型,Map的键是任意类型
手动计算Object尺寸,Map.size可以获取尺寸
Map的排序是插入顺序
Object有原型，所以映射中有一些缺省的键。可以理解为Map=Object.create(null)

Set操作集合:
```
let set = new Set()
// Set转化为数组
let arr = Array.from(set)
let arr = [...set]
// 实例属性（继承自Set）
set.constructor === Set 
set.size 
// 操作方法
set.add(1) // 添加一个值
set.delete(1) //删除一个值
set.has(1) //判断是否有这个值（Array中的indexOf）
set.clear() //清除所有值
// 获取用于遍历的成员方法(Set的遍历顺序就是插入顺序)
set.keys() // 返回键名的遍历器
set.values() // 返回键值得遍历器
set.entries() // 返回键值对的遍历器
set.forEach() // 循环遍历每个值(和Array的方法一致)
for (let key of set.keys()){}
for (let val of set.values()){}
for (let entry of set.entries()){}
// 使用数组方法来处理set值
set = new Set(arr)
set = new Set([...set].map((x) => x = x * 2))
set = new Set([...set].filter((x) => x > 2))
```

Map的方法集合
```
let map = new Map()
// 实例属性(继承自Map)
map.constructor === Map
map.size
// 操作方法
map.set(1,2)
map.get(1)
map.delete(1)
map.has(1)
map.clear()
// 遍历方法
map.keys()
map.values()
map.entries()
map.forEach()
// Map和数组的转换
map = new Map([['key','val'],[2,1]]) // 要求双成员数组
let arr = [...map]
// 值得注意的是Map的键是跟内存绑定的
map.set([1], 's')
map.get([1])
let arr = [1]
let arr1 = [1]
map.set(arr, 's')
map.get(arr)
map.set(arr1, 's')
map.get(arr1)
```



## 函数的默认参数

```
function a(num = 6, callback = function (data) {console.log('ES6: ', data)}) {
  callback(num * num)
}
```


## 箭头函数

箭头函数中this的使用跟普通函数也不一样，在JavaScript的普通函数中，都会有一个自己的this值

箭头函数：
1、箭头函数没有this，函数内部的this来自于父级最近的非箭头函数，并且不能改变this的指向。
2、箭头函数没有super
3、箭头函数没有arguments
4、箭头函数没有new.target绑定。
5、不能使用new
6、没有原型
7、不支持重复的命名参数。


## ES6对象新增方法  Object.assign()

Object.assign()方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象

Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。
因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，
应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。
String类型和 Symbol 类型的属性都会被拷贝

合并对象
```
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };
var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
```

合并具有相同属性的对象
```
var o1 = { a: 1, b: 1, c: 1 };
var o2 = { b: 2, c: 2 };
var o3 = { c: 3 };
var obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
```



## ES6字符串新增的方法

模板字符串
```
var name="cala";
var age=22;
console.log(`hello,I'am ${name},my age is ${age}`)
```

includes(str, index)：如果在字符串中检测到指定文本，返回true，否则false。
```
let t = 'abcdefg'
if(t.includes('cde')) {
  console.log(2)
}
//true
```

startsWith(str, index)：如果在字符串起始部分检测到指定文本，返回true，否则返回false。
```
let t = 'abcdefg'
if(t.startsWith('ab')) {
  console.log(2)
}
//true
```

endsWith(str, index)：如果在字符串的结束部分检测到指定文本，返回true，否则返回false。
```
let t = 'abcdefg'
if(t.endsWith('fg')) {
  console.log(2)
}
//true
```


## ES6给数组添加新方法

find()：传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它，并且终止搜索。
```
const arr = [1, "2", 3, 3, "2"]
console.log(arr.find(n => typeof n === "number")) // 1
```

findIndex()：传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它的下标，终止搜索。
```
const arr = [1, "2", 3, 3, "2"]
console.log(arr.findIndex(n => typeof n === "number")) // 0
```

fill()：用新元素替换掉数组内的元素，可以指定替换下标范围。
```
arr.fill(value, start, end)
```

copyWithin()：选择数组的某个下标，从该位置开始复制数组元素，默认从0开始复制。也可以指定要复制的元素范围。
```
arr.copyWithin(target, start, end)

const arr = [1, 2, 3, 4, 5]
console.log(arr.copyWithin(3)) // [1,2,3,1,2] 从下标为3的元素开始，复制数组，所以4, 5被替换成1, 2

const arr1 = [1, 2, 3, 4, 5]
console.log(arr1.copyWithin(3, 1)) // [1,2,3,2,3] 从下标为3的元素开始，复制数组，指定复制的第一个元素下标为1，所以4, 5被替换成2, 3

const arr2 = [1, 2, 3, 4, 5]
console.log(arr2.copyWithin(3, 1, 2)) // [1,2,3,2,5] 从下标为3的元素开始，复制数组，指定复制的第一个元素下标为1，结束位置为2，所以4被替换成2
```





