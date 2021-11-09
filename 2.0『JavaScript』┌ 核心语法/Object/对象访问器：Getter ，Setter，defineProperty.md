[JavaScript 对象访问器](https://www.w3school.com.cn/js/js_object_accessors.asp)


# JavaScript 访问器（Getter 和 Setter）

Getter 和 Setter 允许您定义对象访问器（被计算的属性）。


## Getter（get 关键词）
本例使用 lang 属性来获取 language 属性的值。
```
var person = {
  firstName: "Bill",
  lastName : "Gates",
  language : "en",
  get lang() {
    return this.language;
  }
};

console.log(person.lang)	// "en"
```


## Setter（set 关键词)
本例使用 lang 属性来设置 language 属性的值。
```
var person = {
  firstName: "Bill",
  lastName : "Gates",
  language : "",
  set lang(lang) {
    this.language = lang;
  }
};

// 使用 setter 来设置对象属性：
person.lang = "en";

console.log(person.lang)	// "en"
```


### 函数与 Getter 区别

```
var person = {
  firstName: "Bill",
  lastName : "Gates",
  fullName : function() {
    return this.firstName + " " + this.lastName;
  },
  get fullName() {
      return this.firstName + " " + this.lastName;
  }
};
```

以函数形式访问 fullName：person.fullName()
以属性形式访问 fullName：person.fullName


### 案例
读写对象的某个属性时，都转化为大写操作
```
var person = {
  firstName: "Bill",
  lastName : "Gates",
  language : "en",
  get lang() {
    return this.language.toUpperCase();
  },
  set lang(lang) {
    this.language = lang.toUpperCase();
   }
};

// 使用 getter 来设置对象属性：
person.lang = "en";

console.log(person.lang)	// "EN"
```


##  Object.defineProperty()

Object.defineProperty() 方法也可用于添加 Getter 和 Setter：

```
// 定义对象
var obj = {language : 'en'};

// 定义 setters
Object.defineProperty(obj, "lang", {
  get : function () {return this.language.toUpperCase();},
  set : function (value) {this.language = value.toUpperCase();}
});
```

