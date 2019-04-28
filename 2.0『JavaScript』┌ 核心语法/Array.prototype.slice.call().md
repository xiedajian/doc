## Array.prototype.slice.call()方法详解

在很多时候经常看到Array.prototype.slice.call()方法，比如Array.prototype.slice.call(arguments)，下面讲一下其原理：

### 1、基本讲解
### 
1.在JS里Array是一个类 slice是此类里的一个方法 ，那么使用此方法应该Array.prototype.slice这么去用 

slice从字面上的意思很容易理解就是截取（当然你不是英肓的话） 这方法如何使用呢? 

arrayObj.slice(start, [end]) 很显然是截取数组的一部分。

2.我们再看call

 call([thisObj[,arg1[arg2[[argN]]]]]) 
thisObj是一个对象的方法 
arrg1~argN是参数

那么Array.prototype.slice.call(arguments,1);这句话的意思就是说把调用方法的参数截取出来。 
如：

 function test(a,b,c,d) 
   { 
      var arg = Array.prototype.slice.call(arguments,1); 
      alert(arg); 
   } 
   test("a","b","c","d"); //b,c,d
   
   
 ###  2、疑惑解答
 
 Array.prototype.slice.call(arguments, 1)，不就是等于 arguments.slice(1) 吗？像前者那样写具体的好处是什么？这个很多js新手最疑惑的地方。那为什么呢？
 
 
 因为arguments并不是真正的数组对象，只是与数组类似而已，所以它并没有slice这个方法，而Array.prototype.slice.call(arguments, 1)可以理解成是让arguments转换成一个数组对象，让arguments具有slice()方法。要是直接写arguments.slice(1)会报错。
 
 typeof arguments==="Object" //而不是 "Array"
 
 
 ###  3.真正原理
 
 Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组，除了IE下的节点集合（因为ie下的dom对象是以com对象的形式实现的，js对象与com对象不能进行转换） 
 
 ```
 var a={length:2,0:'first',1:'second'};//类数组,有length属性，长度为2，第0个是first，第1个是second
console.log(Array.prototype.slice.call(a,0));// ["first", "second"],调用数组的slice(0);

var a={length:2,0:'first',1:'second'};
console.log(Array.prototype.slice.call(a,1));//["second"]，调用数组的slice(1);

var a={0:'first',1:'second'};//去掉length属性，返回一个空数组
console.log(Array.prototype.slice.call(a,0));//[]

function test(){
  console.log(Array.prototype.slice.call(arguments,0));//["a", "b", "c"]，slice(0)
  console.log(Array.prototype.slice.call(arguments,1));//["b", "c"],slice(1)
}
test("a","b","c");
 ```
 
 补充： 
将函数的实际参数转换成数组的方法

方法一：var args = Array.prototype.slice.call(arguments);

方法二：var args = [].slice.call(arguments, 0);

方法三：
```
var args = []; 
for (var i = 1; i < arguments.length; i++) { 
    args.push(arguments[i]);
}
```
最后，附个转成数组的通用函数
```
var toArray = function(s){
    try{
        return Array.prototype.slice.call(s);
    } catch(e){
        var arr = [];
        for(var i = 0,len = s.length; i < len; i++){
            //arr.push(s[i]);
               arr[i] = s[i];  //据说这样比push快
        }
         return arr;
    }
}
```

版权声明：本文为小平果原创文章，转载请注明：http://blog.csdn.net/i10630226
 