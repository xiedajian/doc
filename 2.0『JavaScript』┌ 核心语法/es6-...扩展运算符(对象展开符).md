

# ES6 的扩展运算符(对象展开符) ...

扩展运算符（ spread ）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```
console.log(...[1, 2, 3])
// 1 2 3
console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```

## 该运算符主要用于函数调用

```

function push(array, ...items) {
    array.push(...items);
}
function add(x, y) {
    return x + y;
}
var numbers = [4, 38];
add(...numbers) // 42
```

上面代码中，array.push(...items)和add(...numbers)这两行，都是函数的调用，它们的都使用了扩展运算符。该运算符将一个数组，变为参数序列。


扩展运算符与正常的函数参数可以结合使用，非常灵活

```
function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);

```

# 扩展运算符的应用

## 1.合并数组

扩展运算符提供了数组合并的新写法。

```
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];
// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]
// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

```


## 2.与解构赋值结合

扩展运算符可以与解构赋值结合起来，用于生成数组

```
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
下面是另外一些例子。
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest // [2, 3, 4, 5]
const [first, ...rest] = [];
first // undefined
rest // []:
const [first, ...rest] = ["foo"];
first // "foo"
rest // []

```

*如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。*

```
const [...butLast, last] = [1, 2, 3, 4, 5];
//  报错
const [first, ...middle, last] = [1, 2, 3, 4, 5];
//  报错

```


## 3.函数的返回值

JavaScript 的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。

```
var dateFields = readDateFields(database);
var d = new Date(...dateFields);

```

上面代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数Date。


## 4.字符串

扩展运算符还可以将字符串转为真正的数组。

```
[...'hello']
// [ "h", "e", "l", "l", "o" ]

```

*JavaScript 会将 32 位 Unicode 字符，识别为 2 个字符，采用扩展运算符就没有这个问题*


## 5.实现了 Iterator 接口的对象

任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组

```
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
```

上面代码中，querySelectorAll方法返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator 接口。


## 6.Map 和 Set

扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。

```
let map = new Map([
[1, 'one'],
[2, 'two'],
[3, 'three'],
]);
let arr = [...map.keys()]; // [1, 2, 3]
```
