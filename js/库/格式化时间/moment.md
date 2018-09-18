
npm 文档：https://www.npmjs.com/package/moment
官网：



# moment

Moment.js 是一个 JavaScript 日期处理类库,用于解析、检验、操作、以及显示日期



# 安装

```
npm install moment
```



# 格式化日期

var moment = require('moment');

当前时间：
```
moment().format('YYYY-MM-DD HH:mm:ss'); //2014-09-24 23:36:09 
```

今天是星期几：
```
moment().format('d'); //3 
```

转换当前时间的Unix时间戳：
```
moment().format('X'); 
```



# 相对时间

20120901相对当前日期是2年前
```
moment("20120901", "YYYYMMDD").fromNow(); //2 years ago 
```

7天后的日期：
```
moment().add('days',7).format('YYYY年MM月DD日'); //2014年10月01日 
```

9小时后的时间：
```
moment().add('hours',9).format('HH:mm:ss'); 
```



