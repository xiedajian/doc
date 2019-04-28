

# Date

日期时间对象

用于处理日期和时间


## 创建Date对象

四种方式

```
 new Date();
 new Date(milliseconds);		
 new Date(dateString);		
 new Date(year,month,day,hours,minutes,seconds,milliseconds);		
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


例如:
```
var now = new Date();
now.getFullYear()	// => 年 ，2018
now.getMonth()		// => 月 （0 -11）
now.getDate()		// => 日
now.getHours()		// => 当地时间
now.getUTCHours()	// => 使用UTC表示小时的时间，基于时区
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