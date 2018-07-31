

# Data

日期时间对象

用于处理日期和时间


## 创建Data对象

四种方式

```
 new Data();
 new Data(milliseconds);		
 new Data(dateString);		
 new Data(year,month,day,hours,minutes,seconds,milliseconds);		
```



## 属性

constructor     返回对创建date对象的函数原型
prototype       可以向对象添加属性和方法


## 方法

parse(datestring)           返回1970/1/1至datestring之间的毫秒数， Date.parse("March 21, 2012")
valueOf()                   返回 Date 对象的原始值,原始值返回1970年1月1日午夜以来的毫秒数
toJSON()                    以 JSON 数据格式返回日期字符串
toUTCString()               根据世界时，把 Date 对象转换为字符串
toString()                  Date 对象转换为字符串，Tue Jul 31 2018 11:35:09 GMT+0800 (中国标准时间)
toDateString()              Date 对象的日期部分转换为字符串，Tue Jul 31 2018
toTimeString()              Date 对象的时间部分转换为字符串，11:36:13 GMT+0800 (中国标准时间)
toLocaleString()            按本地时间格式转换为字符串，2018/7/31 上午11:34:20
toLocaleDateString()        日期部分按本地时间格式转换为字符串， 2018/7/31
toLocaleTimeString()        时间部分按本地时间格式转换为字符串，上午11:34:07


getFullYear()               返回年份
getMonth()                  返回当前月份（0-11）
getDate()                   返回月份的某一天（1-31）
getDay()                    返回今天是周几 （0-6） ，索引从0开始
getHours()                  返回当前小时（0-23）
getMinutes()                返回当前分钟（0-59）
getSeconds()                返回当前秒数（0-59）
getMilliseconds()           返回当前毫秒（0-999）
getTime()                   返回当前的时间戳，13位，精确到毫秒，距离1970年1月1日
getTimezoneOffset()         返回格林威治时间和本地时间之间的时差，单位是分

setFullYear()               设置Date对象年份
setMonth()                  设置Date对象当前月份（0-11）
setDate()                   设置Date对象月份的某一天（1-31）
setDay()                    设置Date对象今天是周几 （0-6） ，索引从0开始
setHours()                  设置Date对象当前小时（0-23）
setMinutes()                设置Date对象当前分钟（0-59）
setSeconds()                设置Date对象当前秒数（0-59）
setMilliseconds()           设置Date对象当前毫秒（0-999）
setTime()                   设置Date对象当前的时间戳，13位，精确到毫秒，距离1970年1月1日


getUTCDate()                UTC代表世界时间
getUTCDay()
getUTCFullYear()
getUTCHours()
getUTCMilliseconds()
getUTCMinutes()
getUTCMonth()
getUTCSeconds()


例如
```
var now = new Data();
now.getFullYear()	// => 年 ，2018
now.getMonth()		// => 月 （0 -11）
now.getData()		// => 日
now.getHours()		// => 当地时间
now.getUTCHours()	// => 使用UTC表示小时的时间，基于时区
```



