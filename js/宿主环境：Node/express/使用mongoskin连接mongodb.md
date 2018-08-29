










# 坑

1. 报错：
Invalid schema, expected `mongodb` or `mongodb+srv`
Error: Invalid schema, expected `mongodb` or `mongodb+srv`
    at module.exports (F:\web\www\node\express-ejs\node_modules\mongodb\lib\url_parser.js:21:21)


解决：
将
var db = require('mongoskin').db('localhost:27017/express_db');
加上
var db = require('mongoskin').db('localhost:27017/express_db',{useNewUrlParser:true});


2. 报错：
Invalid connection string
MongoParseError: Invalid connection string

