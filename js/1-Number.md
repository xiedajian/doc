
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



