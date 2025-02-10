
# string

## 转义字符

js字符串中，反斜线（\）有特殊的用途，表示转义，不再表示字符的字面含义了

\n 	表示一个换行符 （\u000A）
\f 	表示一个换页符 （\u000B）
\r 	表示一个回车符 （\u000D）


## length
字符串长度

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



###  replace() , replaceAll()
在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串

str.replace(regexp/substr,replacement)

replace() 方法仅替换一个字符串中某模式（pattern）的首个实例, replaceAll() 相当于增强了 replace() 的特性，全量替换

```
	var newString = 'helloworld'.replace('hello','你好');	// 你好world
```



# 字符串分割

###  slice() 
提取字符串的某个部分，返回被提取的部分

stringObject.slice(startIndex [,endIndex])

（1）截取字符串不包括 endIndex 的元素
（2）endIndex 是可选参数，没有时默认截取到结束
```
var str = 'hello happy world';
var newStr = str.slice(6)		// happy world!
var newStr = str.slice(2,4)		// ll
	
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
### startsWith(): 返回布尔值，表示参数字符串是否在原字符串的头部。
### endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
### repeat()：方法返回一个新字符串，表示将原字符串重复n次
### includes()：返回布尔值，表示是否找到了参数字符串。
### trimStart()： 方法从字符串的开头删除空格。trimLeft() 是此方法的别名。
### trimEnd()： 方法从一个字符串的末端移除空白字符。trimRight() 是这个方法的别名。
### padStart()：用于头部补全	 // "1".padStart(2, "0")); // 01
### padEnd()：用于尾部补全。