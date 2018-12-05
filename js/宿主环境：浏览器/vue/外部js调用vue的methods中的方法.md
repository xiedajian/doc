

 一行代码的事情, methods里面定义的方法, 需要赋值给window
 
 
 比如
 
 ```
 export default {
 	data() {
 		return {
 			title: '首页',
 		}
 	},
	 mounted() {
		 // methods里面定义的方法, 需要赋值给window
		window.jingli = this.jingli;
	 },
	 methods: {
		 jingli() {
		 	console.log(111);
		 },
	 }
}
 ```
 
 这样就可以通过调用 jingli() 来调用 vue 的methods 中的 jingli()
 