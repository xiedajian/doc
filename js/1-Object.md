

# object

hasOwnProperty() // 检查对象是否拥有一个指定名字的本地定义（而不是继承的）的属性
isPrototypeOf() // 检查当前对象是不是指定对象的原型
propertyIsEnumerable() // 检查指定名字的属性是否尊在并且可以用for/in循环枚举
toLocaleString() //返回改对象的一个本地化的字符串表示
toString()　//返回改对象的一个字符串表示
valueOf() //返回当前对象的原始值
Object.create() // 使用指定的原型及属性创建一个新的对象
Object.defineProperties() // 创建或配置指定对象的一个或多个属性
Object.defineProperty() // 创建或配置指定对象的某个属性
Object.freeze() // 将制定对象设置为不可改变
Object.getOwnPropertyDescriptor() // 查询指定对象的指定属性的特性
Object.getOwnPropertyNames() // 返回一个包含指定对象的所有非继承属性名的数组，包括不可枚举属性
Object.getPrototypeOf() // 返回指定对象的原型
Object.isExtensible() // 检查对象是否能添加到新的属性中
Object.isFrozen()　//　检查当前对象是否已冻结
Object.isSealed() // 检查指定对象是否为封闭的
Object.keys() // 返回一个包含指定对象的所有非继承可枚举属性名的数组
Object.preventExtensions() // 阻止向指定对象添加新的属性
Object.seal() // 阻止向指定对象添加新属性






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

#### Object.getPropertyNames()
 
返回除原型属性以外的所有属性（包括不可枚举的属性）名组成的数组

```
  //利用这个判断对象是否为空
  if(Object.getOwnPropertyNames(obj).length ===0)

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

### Object.assign()

用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

```
  const object1 = {
    a: 1,
    b: 2,
    c: 3
  };

  const object2 = Object.assign({c: 4, d: 5}, object1);

  console.log(object2.c, object2.d);
  // expected output: 3 5

```



# 遍历

1. 使用for..in..遍历, 循环遍历对象自身的和继承的可枚举属性(不含Symbol属性).
```
var person={fname:"Bill",lname:"Gates",age:56};

for (var key in person)
  {
	  console.log(key);
	  console.log(person[key]);
  }

```

2. 使用Object.keys()遍历, 返回一个数组, 包括对象自身的(不含继承的)所有可枚举属性(不含Symbol属性)
```

var obj = {'0':'a','1':'b','2':'c'};

Object.keys(obj).forEach(function(key){

     console.log(key,obj[key]);

});
```

3. 使用Object.getOwnPropertyNames(obj)遍历, 返回一个数组,包含对象自身的所有属性(不含Symbol属性,但是包括不可枚举属性).
```
var obj = {'0':'a','1':'b','2':'c'};
Object.getOwnPropertyNames(obj).forEach(function(key){

    console.log(key,obj[key]);

});
```

4. 使用 Reflect.ownKeys(obj) 遍历, 返回一个数组,包含对象自身的所有属性,不管属性名是Symbol或字符串,也不管是否可枚举.  
```
var obj = {'0':'a','1':'b','2':'c'};
Reflect.ownKeys(obj).forEach(function(key){

console.log(key,obj[key]);

});
```




#  实现对象继承
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
