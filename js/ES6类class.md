
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

```

constructor方法,这就是构造方法,而this关键字则代表实例对象。

一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象

类的构造函数，不使用new是没法调用的，会报错。

定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。、

另外，方法之间不需要逗号分隔，加了会报错。

构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面




## 传统方法

传统方法是通过构造函数,定义并生成新对象,prototype 属性使您有能力向对象添加属性和方法

```
	function Person(name, age){
		this.name = name;
		this.age = age;
	}

	Person.prototype.getName = function(){
		return this.name;
	}
```

也就是说,ES5的构造函数Person,对应ES6的Person类的构造方法,ES6的类,完全可以看作构造函数的另一种写法


## class的静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

说明:静态方法只能在静态方法中调用,不能再实例方法中调用

```
	class Person{
	 	constructor(name, age){
	    	this.name = name;
	    	this.age = age;
	    }
	    getName(){
	    	return this.name;
	    }
	    static getDage(){
	    	return this.age;
	    }
	}

```
