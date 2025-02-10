
# number

js 不区分 整数值 和 浮点数值， js中的所有数字均用浮点数表示

js 采用IEEE 754标准定义的64位浮点格式表示数字，意味着能表示的最大值是 9 007 199 254 740 992 (2的53次幂)


+	 -	 *	  /		% 

Math.pow ( 2, 53 )		// => 2的53次幂
Math.round ( .6 )		// => 四舍五入 1.0
Math.ceil ( .6 )		// => 向上取整 1.0
Math.floor ( .6 )		// => 向下取整 0.0
Math.abs ( -5 )			// => 绝对值 5
Math.max ( x, y, z )	// => 返回最大值	
Math.min ( x, y, z )	// => 返回最小值	
Math.random ()			// => 生成一个 0 - 1 之间的随机数
Math.PI 				// => 圆周率 
Math.E 					// => e : 自然对数的底数
Math.sqrt(3) 			// => 平方根
Math.sin(0) 			// => 三角函数
Math.cos(0) 			// => 三角函数
Math.atan(0) 			// => 三角函数
Math.log(0) 			// => 10的自然对数

无穷大的值 ： Infinity

不是数 ： NaN (not-a-number)

## 精度的问题

js 采用浮点数表示法，二进制表示法 ，平时常用的是十进制分数。 二进制无法精准的表示 类似0.1这样的数字

 （0.3 -0.2）=== （0.2-0.1）		// => false

所以建议，使用整数 分 代替 小数 元 来进行基于货币单位的运算



## toFixed()

根据小数点后指定位数将数字转为字符串

var n = 123.456;
n.toFixed(0); 	// '123'
n.toFixed(2); 	// '123.46'
n.toFixed(5); 	// '123.45600'

## parseInt() ,  parseFloat()

parseInt() 		// 只解析整数

parseInt(3.9)	// => 3

parseFloat() 	// 只解析整数

parseFloat('3.14 meter')	// => 3.14



# BigInt(原始类型)

ES11 新的原始数据类型：BigInt，表示一个任意精度的整数，可以表示超长数据，可以超出2的53次方

特别注意：

- Number类型的数字有精度限制，数值的精度只能到 53 个二进制位（相当于 16 个十进制位, 正负9007199254740992），大于这个范围的整数，就无法精确表示了。
- Bigint没有位数的限制，任何位数的整数都可以精确表示。但是其只能用于表示整数，且为了与Number进行区分，BigInt 类型的数据必须添加后缀n。
- BigInt 可以使用负号，但是不能使用正号
- number类型的数字和Bigint类型的数字不能混合计算

```
 // Number
 console.log(2 ** 53) // 9007199254740992
 console.log(Number.MAX_SAFE_INTEGER) // 9007199254740991
 
 //BigInt
 const bigInt = 9007199254740993n
 console.log(bigInt) // 9007199254740993n
 console.log(typeof bigInt) // bigint
 console.log(1n == 1) // true
 console.log(1n === 1) // false
 const bigIntNum = BigInt(9007199254740993n)
 console.log(bigIntNum) // 9007199254740993n

```


# 数值分隔符

```
let num1 = 100000;
let num2 = 100_000;

console.log(num1); // 100000
console.log(num2); // 100000

const num3 = 10.12_34_56
console.log(num3); // 10.123456

```