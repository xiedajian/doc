

# 全局属性

Infinity        代表正无穷大的数值
NaN             代表某个值不是数字（not a number）
undefined       代表未定义的值


# 全局函数

encodeURI(uri)             编码(, / ? : @ & = + $ # 等具有特殊含义的ASCII符号是不会进行转义)，可用encodeURIComponent()
decodeURI(uri)             解码某个URI，对应 encodeURI() 函数编码
encodeURIComponent(uri)    编码，该方法不会对 ASCII 字母和数字进行编码，以及- _ . ! ~ * ' ( )
decodeURIComponent(uri)    解码某个URI，对应 encodeURIComponent() 函数编码
escape(str)                编码，不会对 ASCII 字母和数字进行编码，以及 * @ - _ + . / 
unescape(str)              解码，对应escape（）







# encodeURI 与 encodeURIComponent 区别

encodeURI ， encodeURIComponent ，escape 三者都是js对字符串进行编码，主要对比一下区别




## escape(str)

除了 ASCII 字母、数字和特定的符号外，对传进来的字符串全部进行转义编码，因此如果想对URL编码，最好不要使用此方法。

escape不会编码的字符有69个：*，+，-，.，/，@，_，0-9，a-z，A-Z

> ECMAScript 3中已经不提倡使用这个函数了，所以我们还是少用吧

使用场景：最好是单纯对非URI的string需要编码的时候使用它

## encodeURI() 对 URI 进行完整的编码，因此对以下在 URI 中具有特殊含义的 ASCII 标点符号（, / ? : @ & = + $ #），encodeURI() 函数是不会进行转义的

使用encodeURI()编码后的结果是除了空格之外的其他字符都原封不动，只有空格被替换成了%20

##    encodeURIComponent()

而encodeURIComponent()方法则会使用对应的编码替换所有非字母数字字符

encodeURIComponent() 方法在编码单个 URIComponent（指请求参 数）应当是最常用的，它可以将参数中的中文、特殊字符进行转义，而不会影响整个URL


参考：
https://blog.csdn.net/baidu_33033415/article/details/62882479
https://blog.csdn.net/luman1991/article/details/54980722