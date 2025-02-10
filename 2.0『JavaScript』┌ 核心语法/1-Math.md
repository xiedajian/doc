
# Math 对象

用于执行数学任务

Math 对象不像Date 和 String 那样的对象的类，因此没有构造函数Math()

## 语法

var x = Math.PI;            // 返回PI
var y = Math.sqrt(16);      // 返回16的平方根

## 属性

Math.PI                  圆周率


## 方法

Number.isFinite(): 用来检查一个数值是否有限的，返回布尔值
Number.isNaN(): 用来检查一个数值是否是 NaN，返回布尔值
Number.isInteger(): 用来检查一个数值是否是整数，返回布尔值
Number.isSafeInteger(): 用来检查一个数值是否是“安全整数”（safe integer），返回布尔值
Number.parseInt(): 返回值的整数部分，此方法等价于 parseInt
Number.parseFloat(): 返回值得浮点数部分，此方法等价于 parseFloat

Math.ceil(x)             x向上取整
Math.floor(x)            x向下取整
Math.pow(x,y)            返回x的y次幂,也可以用 ** 代表  // Math.pow(2, 3) 可写为 2 ** 8
Math.max(x,y,z,...n)     返回最大的值
Math.min(x,y,z,...n)     返回最小的值
Math.random()            返回0-1之间的随机数
Math.round(x)            四舍五入
Math.sqrt(x)             返回x的平方根
Math.abs(x)              返回x的绝对值
Math.sign(): 返回数值类型 正数为1、负数为-1、正零 0、负零 -0、NaN

Math.sin(x)              x的正弦
Math.tan(x)              x的正切
Math.cos(x)              x的余弦
Math.acos(x)             x的反余弦值
Math.asin(x)
Math.atan(x)

```
 //Number.isFinite()
 console.log(Number.isFinite(7)); // true
 console.log(Number.isFinite(true)); // false
 
 //Number.isNaN()
 console.log(Number.isNaN(NaN)); // true
 console.log(Number.isNaN("true" / 0)); // true
 console.log(Number.isNaN(true)); // false
 
 //Number.isInteger()
 console.log(Number.isInteger(17)); // true
 console.log(Number.isInteger(17.58)); // false
 
 //Number.isSafeInteger()
 console.log(Number.isSafeInteger(3)); // true
 console.log(Number.isSafeInteger(3.0)); // true
 console.log(Number.isSafeInteger("3")); // false
 console.log(Number.isSafeInteger(3.1)); // false
 
  //Math.trunc()
 console.log(Math.trunc(13.71)); // 13
 console.log(Math.trunc(0)); // 0
 console.log(Math.trunc(true)); // 1
 console.log(Math.trunc(false)); // 0 
 
 //Math.sign()
 console.log(Math.sign(3)); // 1
 console.log(Math.sign(-3)); // -1
 console.log(Math.sign(0)); // 0
 console.log(Math.sign(-0)); // -0
 console.log(Math.sign(NaN)); // NaN
 console.log(Math.sign(true)); // 1
 console.log(Math.sign(false)); // 0
 
 //Math.abrt()
 console.log(Math.cbrt(8)); // 2
 
  //Number.parseInt()
 console.log(Number.parseInt("6.71")); // 6
 console.log(parseInt("6.71")); // 6
 
 //Number.parseFloat()
 console.log(Number.parseFloat("6.71@")); // 6.71
 console.log(parseFloat("6.71@")); // 6.71

```