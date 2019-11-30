

# Date

Date对象，是操作日期和时间的对象

用于处理日期和时间



# 构造函数创建Date对象

四种方式

```
 new Date();					// 返回一个表示本地日期和时间的Date对象
 new Date(milliseconds);		// 把时间戳(毫秒数)转换为Date对象
 new Date(dateString);			// 把字符串转换为Date对象,字符串的格式主要有两种：yyyy/MM/dd HH:mm:ss  yyyy-MM-dd HH:mm:ss
 new Date(year,month,day,hours,minutes,seconds,milliseconds);			// 把年月日、时分秒转换为Date对象
```


## new Date(dateString)

把字符串转换为Date对象
dateString {string} 字符串的格式主要有两种：

1. yyyy/MM/dd HH:mm:ss （推荐）：若省略时间，返回的Date对象的时间为 00:00:00。
2. yyyy-MM-dd HH:mm:ss ：若省略时间，返回的Date对象的时间为 08:00:00(加上本地时区)。若不省略时间，此字符串在IE中会转换失败!

```
var dt = new Date('2014/12/25'); // yyyy/MM/dd
console.log(dt); // => {Date}: Thu Dec 25 2014 00:00:00 GMT+0800 (中国标准时间)

dt = new Date('2014/12/25 12:00:00'); // yyyy/MM/dd HH:mm:ss
console.log(dt); // => {Date}: Thu Dec 25 2014 12:00:00 GMT+0800 (中国标准时间)

dt = new Date('2014-12-25'); // yyyy-MM-dd (注意：加上了东8区的时区)
console.log(dt); // => {Date}: Thu Dec 25 2014 08:00:00 GMT+0800 (中国标准时间)

dt = new Date('2014-12-25 12:00:00'); // yyyy-MM-dd HH:mm:ss (注意：此转换方式在IE中会报错！)
console.log(dt); // => {Date}: Thu Dec 25 2014 12:00:00 GMT+0800 (中国标准时间)
```


##  new Date(year,month,day,hours,minutes,seconds,milliseconds)

参数：

①year {int} ：年份；4位数字。如：1999、2014

②month {int} ：月份；2位数字。从0开始计算，0表示1月份、11表示12月份。

③day {int} 可选：号； 2位数字；从1开始计算，1表示1号。

④hours {int} 可选：时；2位数字；取值0~23。

⑤minutes {int} 可选：分；2位数字；取值0~59。

⑥seconds {int} 可选：秒；2未数字；取值0~59。

⑦milliseconds {int} 可选：毫秒；取值0~999。

```
var dt = new Date(2014, 11); // 2014年12月(这里输入的月份数字为11)`
console.log(dt); // => {Date}: Mon Dec 01 2014 00:00:00 GMT+0800 (中国标准时间)

dt = new Date(2014, 11, 25); // 2014年12月25日
console.log(dt); // => {Date}: Thu Dec 25 2014 00:00:00 GMT+0800 (中国标准时间)

dt = new Date(2014, 11, 25, 15, 30, 40); // 2014年12月25日 15点30分40秒`
console.log(dt); // => {Date}: Thu Dec 25 2014 15:30:40 GMT+0800 (中国标准时间)

dt = new Date(2014, 12, 25); // 2014年13月25日(这里输入的月份数字为12，表示第13个月，跳转到第二年的1月)`
console.log(dt); // => {Date}: Sun Jan 25 2015 00:00:00 GMT+0800 (中国标准时间)
```


# 实例方法

Date对象的实例方法主要分为2种形式：本地时间和UTC时间。

同一个方法，一般都会有此2种时间格式操作(方法名带UTC的，就是操作UTC时间)，这里主要介绍对本地时间的操作。

```
parse(datestring)           返回1970/1/1至datestring之间的毫秒数， Date.parse("March 21, 2012")
valueOf()                   返回 Date 对象的原始值,原始值返回1970年1月1日午夜以来的毫秒数,与getTime()一样
toJSON()                    以 JSON 数据格式返回日期字符串
toUTCString()               根据世界时，把 Date 对象转换为字符串
toString()                  Date 对象转换为字符串，{string}: Tue Jul 31 2018 11:35:09 GMT+0800 (中国标准时间)
toDateString()              Date 对象的日期部分转换为字符串，Tue Jul 31 2018
toTimeString()              Date 对象的时间部分转换为字符串，11:36:13 GMT+0800 (中国标准时间)
toLocaleString()            按本地时间格式转换为字符串，2018/7/31 上午11:34:20
toLocaleDateString()        日期部分按本地时间格式转换为字符串， 2018/7/31
toLocaleTimeString()        时间部分按本地时间格式转换为字符串，上午11:34:07


getFullYear()               返回年份,4位数字
getMonth()                  返回当前月份（0-11），索引从0开始
getDate()                   返回月份的日期值（1-31）
getDay()                    返回今天是周几 （0-6） ，索引从0开始，0为星期天，1为星期一
getHours()                  返回当前小时（0-23）
getMinutes()                返回当前分钟（0-59）
getSeconds()                返回当前秒数（0-59）
getMilliseconds()           返回当前毫秒（0-999）
getTime()                   返回当前的时间戳，13位，精确到毫秒，距离 '1970/01/01 00:00:00' 的毫秒值
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
```

例如:
```
var now = new Date();
now.getFullYear()	// => 年 ，2018
now.getMonth()		// => 月 （0 -11）
now.getDate()		// => 日
now.getHours()		// => 当地时间
now.getUTCHours()	// => 使用UTC表示小时的时间，基于时区
```



# 静态方法

```
Date.now()						// 返回当前时间的时间戳，与 `new Date().getTime()` 和 `new Date().valueOf()` 一样
Date.parse(dateString)			// 把字符串转换为Date对象的时间戳， 相当于 `new Date(dateString).getTime()`
```

案例：
```
console.log(Date.now()); // => 1419431519276
console.log(Date.parse('2014/12/25 12:00:00')); // => 1419480000000
console.log(Date.parse('2014-12-25 12:00:00')); // => 1419480000000  (注意：此转换方式在IE中返回NaN！)
```


# 两个new Date() 对象可直接比较大小

```
var dt1 = new Date('2015/12/01');
var dt2 = new Date('2015/12/25');
console.log(dt1 > dt2); // => false
```

# 常用封装函数

```
//+---------------------------------------------------  
//| 求两个时间的天数差 日期格式为 YYYY-MM-dd   
//+---------------------------------------------------  

function daysBetween(DateOne,DateTwo)  
{   
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));  
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);  
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));  
  
    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));  
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);  
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));  
  
    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);   
    return Math.abs(cha);  
}  
```


```
//---------------------------------------------------  
// 判断闰年  
//---------------------------------------------------  

Date.prototype.isLeapYear = function()   
{   
    return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));   
}  
```


```
//---------------------------------------------------  
// 日期格式化  
// 格式 YYYY/yyyy/YY/yy 表示年份  
// MM/M 月份  
// W/w 星期  
// dd/DD/d/D 日期  
// hh/HH/h/H 时间  
// mm/m 分钟  
// ss/SS/s/S 秒  
//---------------------------------------------------  

Date.prototype.Format = function(formatStr)   
{   
    var str = formatStr;   
    var Week = ['日','一','二','三','四','五','六'];  
  
    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
  
    str=str.replace(/MM/,this.getMonth()>9?this.getMonth().toString():'0' + this.getMonth());   
    str=str.replace(/M/g,this.getMonth());   
  
    str=str.replace(/w|W/g,Week[this.getDay()]);   
  
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
    str=str.replace(/d|D/g,this.getDate());   
  
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
    str=str.replace(/h|H/g,this.getHours());   
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
    str=str.replace(/m/g,this.getMinutes());   
  
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
    str=str.replace(/s|S/g,this.getSeconds());   
  
    return str;   
}   
```


```
//+---------------------------------------------------  
//| 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串  
//+---------------------------------------------------  

Date.prototype.DateDiff = function(strInterval, dtEnd) {   
    var dtStart = this;  
    if (typeof dtEnd == 'string' )//如果是字符串转换为日期型  
    {   
        dtEnd = StringToDate(dtEnd);  
    }  
    switch (strInterval) {   
        case 's' :return parseInt((dtEnd - dtStart) / 1000);  
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
    }  
}  
```


```
//+---------------------------------------------------  
//| 日期时间检查  
//| 格式为：YYYY-MM-DD HH:MM:SS  
//+---------------------------------------------------  

function CheckDateTime(str)  
{   
    var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;   
    var r = str.match(reg);   
    if(r==null)return false;   
    r[2]=r[2]-1;   
    var d= new Date(r[1],r[2],r[3],r[4],r[5],r[6]);   
    if(d.getFullYear()!=r[1])return false;   
    if(d.getMonth()!=r[2])return false;   
    if(d.getDate()!=r[3])return false;   
    if(d.getHours()!=r[4])return false;   
    if(d.getMinutes()!=r[5])return false;   
    if(d.getSeconds()!=r[6])return false;   
    return true;   
}   
```