

# object


### 属性
length 	//


### 新建

1. var person = new Object();
2. var person = {};
person.name = 'xiedajian';
person.age = 20;
3. function(name,age){
		this.name = name;
		this.age = age;
   }
var p1 = new person('xiedajian',20);
var p2 = new person('sunxun',25);


## 方法

### Object.hasOwnProperty()
判断对象自身属性中是否具有指定的属性

```
var bool = obj.hasOwnProperty('name')
```
 
### Object.is()
判断两个值是否相同。




### Object.keys(obj)
返回一个对象的key组成的数组

```
let arr = ["a", "b", "c"];
console.log(Object.keys(arr));
// ['0', '1', '2']
 
/* Object 对象 */
let obj = { foo: "bar", baz: 42 },
    keys = Object.keys(obj);
console.log(keys);
// ["foo","baz"] 

```


### Object.values()
返回一个对象的value组成的数组

```
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']
 
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c']
```

### Object.entries()
返回一个对象的[key,value]组成的数组
```
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
 
const simuArray = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(simuArray)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

```

### 遍历
1. for .. in
```
var person={fname:"Bill",lname:"Gates",age:56};

for (x in person)
  {
  txt=txt + person[x];
  }

```



###  实现对象继承
/**
 * 拓展对象
 * newconfig = extend({},defaultConfig,myconfig)
 */

 function extend(target) {
  var sources = Array.prototype.slice.call(arguments, 1);

  for (var i = 0; i < sources.length; i += 1) {
    var source = sources[i];
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
