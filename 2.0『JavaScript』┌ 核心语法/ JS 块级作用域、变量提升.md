
# JS 块级作用域、变量提升

答案：

1.块级作用域
JS 中作用域有：全局作用域、函数作用域。没有块作用域的概念。ECMAScript 6(简称 ES6)中新增了块级作用域。块作用域由 { } 包括，if 语句和 for 语句里面的{ }也属于块作用域。

2.变量提升
如果变量声明在函数里面，则将变量声明提升到函数的开头
如果变量声明是一个全局变量，则将变量声明提升到全局作用域的开头



解析：
```
<script type="text/javascript">
	{
		var a = 1;
		console.log(a); // 1
	}
	console.log(a); // 1
	// 可见，通过var定义的变量可以跨块作用域访问到。

	(function A() {
		var b = 2;
		console.log(b); // 2
	})();
	// console.log(b); // 报错，
	// 可见，通过var定义的变量不能跨函数作用域访问到

	if(true) {
		var c = 3;
	}
	console.log(c); // 3
	for(var i = 0; i < 4; i++) {
		var d = 5;
	};
	console.log(i);	// 4   (循环结束i已经是4，所以此处i为4)
	console.log(d); // 5
	// if语句和for语句中用var定义的变量可以在外面访问到，
	// 可见，if语句和for语句属于块作用域，不属于函数作用域。

	{
		var a = 1;
		let b = 2;
		const c = 3;

		{
			console.log(a);		// 1	子作用域可以访问到父作用域的变量
			console.log(b);		// 2	子作用域可以访问到父作用域的变量
			console.log(c);		// 3	子作用域可以访问到父作用域的变量

			var aa = 11;
			let bb = 22;
			const cc = 33;
		}

		console.log(aa);	// 11	// 可以跨块访问到子 块作用域 的变量
		// console.log(bb);	// 报错	bb is not defined
		// console.log(cc);	// 报错	cc is not defined
	}
</script>
```


## 拓展：var、let、const 的区别

- var 定义的变量，没有块的概念，可以跨块访问, 不能跨函数访问。
- let 定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问。
- const 用来定义常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改。
- 同一个变量只能使用一种方式声明，不然会报错


```
<script type="text/javascript">
	// 块作用域
	{
		var a = 1;
		let b = 2;
		const c = 3;
		// c = 4; // 报错

		// let a = 'a';	// 报错  注：是上面 var a = 1; 那行报错
		// var b = 'b';	// 报错：本行报错
		// const a = 'a1';	// 报错  注：是上面 var a = 1; 那行报错
		// let c = 'c';	// 报错：本行报错

		var aa;
		let bb;
		// const cc; // 报错
		console.log(a); // 1
		console.log(b); // 2
		console.log(c); // 3
		console.log(aa); // undefined
		console.log(bb); // undefined
	}
	console.log(a); // 1
	// console.log(b); // 报错
	// console.log(c); // 报错

	// 函数作用域
	(function A() {
		var d = 5;
		let e = 6;
		const f = 7;
		console.log(d); // 5
		console.log(e); // 6  (在同一个{ }中,也属于同一个块，可以正常访问到)
		console.log(f); // 7  (在同一个{ }中,也属于同一个块，可以正常访问到)
	})();
	// console.log(d); // 报错
	// console.log(e); // 报错
	// console.log(f); // 报错
</script>
```
