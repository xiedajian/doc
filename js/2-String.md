
### 

var len = str.length


### concat()
拼接字符串，使用 " + " 运算符来进行字符串的连接运算通常会更简便一些。

str1.concat(str2)


### indexOf(traget [,startIndex])
返回某个指定的字符串值在字符串中首次出现的位置。对大小写敏感,如果要检索的字符串值没有出现，则该方法返回 -1。

```
var index = str.indexOf(traget [,index])
```

实例：
```
var str="Hello world!"
document.write(str.indexOf("Hello") + "<br />")		// 0
document.write(str.indexOf("World") + "<br />")		// -1
document.write(str.indexOf("world"))				// 6

```



###  match() 
字符串内检索指定的值，返回一个或多个正则表达式的匹配结果组成的数组,

str.match(searchvalue)
str.match(regexp)

```
var arr = 'helloworld'.mathch('hello');		// ['hello']
null = 'helloworld'.mathch('helloed');		// null
```


### search() 
用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串,如果没有找到任何匹配的子串，则返回 -1

stringObject.search(regexp)


```
"Visit W3School!".search('W3School')	// 6
"Visit W3School!".search('W3Schooled')	// -1

```



###  replace() 
在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串

str.replace(regexp/substr,replacement)

```
	var newString = 'helloworld'.replace('hello','你好');	// 你好world
```




###  slice() 
提取字符串的某个部分，返回被提取的部分

stringObject.slice(startIndex [,endIndex])

```
var str = 'hello happy world';
var newStr = str.slice(6)		// happy world!
var newStr = str.slice(2,4)		// llo
	
```

### substr()
在字符串中抽取从 start 下标开始的指定数目的字符。

stringObject.substr(start [,length])

```
var newString = "Hello world!".substr(3);		// 'lo world!'
var newString = "Hello world!".substr(3,7);		// 'lo worl'
```

### substring()
于提取字符串中介于两个指定下标之间的字符

stringObject.substring(start [,stop])

```
var newString = "Hello world!".substring(3);		// 'lo world!'
var newString = "Hello world!".substring(3,7);		// 'lo w'
```




### split() 
用于把一个字符串分割成字符串数组

stringObject.split(separator [,howmany] )

```
var str="How are you doing today?"
var strArray = str.split(" ");		// [How,are,you,doing,today?]
var strArray = str.split("");		// [H,o,w, ,a,r,e, ,y,o,u, ,d,o,i,n,g, ,t,o,d,a,y,?]
var strArray = str.split(" ",3)		// [How,are,you]
```


### toLowerCase()	//用于把字符串转换为小写
### toUpperCase()	//用于把字符串转换为大写