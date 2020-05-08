参考：https://blog.csdn.net/suwu150/article/details/75250749


# pick()和omit()函数

## pick()函数

    调用格式：_.pick(object, *keys) 
    该函数的功能是：返回一个只有列入挑选key属性的对象。其中，参数object为JSON格式的对象，*keys表示多个需要挑选出来的key属性。示例如下

```
const _ = require('lodash/object');
const originObject = {
  A: 1,
  B: 2,
  C: 3,
  D: 4
};
const newObject = _.pick(originObject, 'B', 'C');
console.log(originObject);
console.log(newObject);
```

输出结果如下图所示:

```
:originObject:
{ A: 1, B: 2, C: 3, D: 4 }
newObject:
{ B: 2, C: 3 }
```


在上述代码中，先定义一个名为originObject的对象，该对象中包含4个属性，分别为A、B、C、D；然后调用pick()函数，挑选key的属性为B、C，并将返回的对象赋予变量newObject；最后，在控制台输出该对象的内容。从输出结果中可以看出，挑选key属性后，返回一个新的对象，该对象包含被挑选的全部key属性和value值。

在学习了基本的pick方法之后,我们还能够进行了解一下pickBy,显而易见,就是通过某一属性进行挑选,

```
const _ = require('lodash');
const originObject = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: '5',
  F: true
};
const newObject = _.pickBy(originObject, _.isString);
console.log('originObject:');
console.log(originObject);
console.log('newObject:');
console.log(newObject);
```

输出结果为:

```
originObject:
{ A: 1, B: 2, C: 3, D: 4, E: '5', F: true }
newObject:
{ E: '5' }
```

在上面的结果中,在旧对象中挑选出了是字符串的对象E,其他的对象没有被选出



# omit()函数

    调用格式：_.omit(object, *keys) 
    该函数的功能是：返回一个没有列入排除key属性的对象。其中，参数object为JSON格式的对象，*keys表示多个需要排除掉的key属性。示例如下。
```
const _ = require('lodash/object');
const originObject = {
  A: 1,
  B: 2,
  C: 3,
  D: 4
};
const newObject = _.omit(originObject, 'B', 'C');
console.log('originObject:');
console.log(originObject);
console.log('newObject:');
console.log(newObject);
输出结果如下所示:
originObject:
{ A: 1, B: 2, C: 3, D: 4 }
newObject:
{ A: 1, D: 4 }
```
      在上述代码中，调用omit()函数，排除key的属性为B、C，将返回的对象赋予变量newObject，并在控制台输出该对象的内容。从输出结果可以看出，因为排除了key属性B和C，最后返回的新对象中仅包含了key属性A和D的名称和对应值。


同理,我们也能够了解omitBy方法的使用,

```
const _ = require('lodash');
const originObject = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: '5',
  F: true
};
const newObject = _.omitBy(originObject, _.isString);
console.log('originObject:');
console.log(originObject);
console.log('newObject:');
console.log(newObject);
输出结果如下面所示:
originObject:
{ A: 1, B: 2, C: 3, D: 4, E: '5', F: true }
newObject:
{ A: 1, B: 2, C: 3, D: 4, F: true }
```

由上面结果可以看出,仅仅限制住了是字符串的对象,其余对象仍旧返回到新的对象中