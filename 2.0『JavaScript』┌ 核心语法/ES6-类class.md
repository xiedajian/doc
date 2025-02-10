
# class

ES6引入了Class（类）这个概念,作为对象的模板,通过class关键字,可以定义类。

基本上,ES6的class可以看作只是一个语法糖,它的绝大部分功能,ES5都可以做到,新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已


例如

```
	class Person{
	 	constructor(name, age){
	    	this.name = name;
	    	this.age = age;
	    }
	    getName(){
	    	return this.name;
	    }
	}
	var obj=new Person("laotie",88);
	console.log(obj.getName());		//laotie

```

constructor方法,这就是构造方法,而this关键字则代表实例对象。

一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象

类的构造函数，不使用new是没法调用的，会报错。

定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。、

另外，方法之间不需要逗号分隔，加了会报错。

构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面




## 传统方法

传统的javascript中只有对象，没有类的概念。它是基于原型的面向对象语言。原型对象特点就是将自身的属性共享给新对象。

如果要生成一个对象实例，需要先定义一个构造函数，然后通过new操作符来完成。

prototype 属性使您有能力向对象添加属性和方法

```
	//函数名和实例化构造名相同且大写（非强制，但这么写有助于区分构造函数和普通函数）
	function Person(name, age){
		this.name = name;
		this.age = age;
	}

	Person.prototype.getName = function(){
		return this.name;
	}
```

也就是说,ES5的构造函数Person,对应ES6的Person类的构造方法,ES6的类,完全可以看作构造函数的另一种写法


# class 类的实质

类实质上就是一个函数。类自身指向的就是构造函数。所以可以认为ES6中的类其实就是构造函数的另外一种写法！
```
console.log(typeof Person);//function
console.log(Person===Person.prototype.constructor);//true
```

以下代码说明构造函数的prototype属性，在ES6的类中依然存在着。
```
console.log(Person.prototype);//输出的结果是一个对象
```

实际上类的所有方法都定义在类的prototype属性上。代码证明下：
```
Person.prototype.say=function(){//定义与类中相同名字的方法。成功实现了覆盖！
    return "我是来证明的，你叫" + this.name+"今年"+this.age+"岁了";
}
var obj=new Person("laotie",88);
console.log(obj.say());//我是来证明的，你叫laotie今年88岁了
```



# class 类的静态方法和静态属性

## 静态方法

类的所有方法都定义在类的prototype属性上面，所有类中定义的方法都会被实例继承，如果在类方法前面加上static关键字就不会被实例继承了。

静态方法是直接通过类名来调用。

```
class Person{
	constructor(name="xf",age){
		this.name = name;
		this.age = age;
	}
	static say(){
		console.log("这是静态方法");
	}
}
//通过类名来调用静态方法
Person.say(); // 这是静态方法
```

静态方法也可以从super继承调用 ，子类调用父类的static方法也只能在静态函数中调用。
```
class Person{
	constructor(name="xf",age){
		this.name = name;
		this.age = age;
	}
	static say(){
		console.log("这是静态方法");
	}
}
//通过类名来调用静态方法
Person.say(); // 这是静态方法

//子类继承父类
class Child extends Person{
	//这里没写构造函数，那么就是默认有了空的构造函数并且默认调用了super()	
	static tell (){
	return this.say();
	//等同于 return super.say();
	}
}
let child1 = new Child();
Child.tell(); // 这是静态方法
Child.say(); // 这是静态方法

```

# 静态属性

暂时没有关键字来定义，想要实现的话就在定义完类之后直接在类上添加属性，然后获取的时候通过类名来获取这个属性。

```
class Person{
	constructor(name="xf",age){
		this.name = name;
		this.age = age;
	}
	static say(){
		console.log("这是静态方法");
	}
}
// 模拟静态属性
Person.type = "这是模拟的静态属性";
//访问静态属性
console.log(Person.type); // 这是模拟的静态属性

```

[参考](https://www.jianshu.com/p/86267fab4878)
[参考](https://blog.csdn.net/m0_38134431/article/details/84317437)