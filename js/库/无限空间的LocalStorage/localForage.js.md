[github](https://github.com/localForage/localForage)

[npm](https://www.npmjs.com/package/localforage)



# localForage

ocalForage是一个快速而简单的JavaScript存储库。

localForage通过使用异步存储（IndexedDB或WebSQL）和简单localStorage的API 来改善Web应用程序的离线体验。

```
npm install localforage

import localForage from "localforage";
或
import * as localForage from "localforage";
或
import localForage = require("localforage");
```

```
<script src="localforage/dist/localforage.js"></script>
<script>localforage.getItem('something', myCallback);</script> 
```

# 使用

```
localforage.setItem('key', 'value', function (err) {
  // if err is non-null, we got an error
  localforage.getItem('key', function (err, value) {
    // if err is non-null, we got an error. otherwise, value is the value
  });
});
```

 Promise:
```
localforage.setItem('key', 'value').then(function () {
  return localforage.getItem('key');
}).then(function (value) {
  // we got our value
}).catch(function (err) {
  // we got an error
});
```

配置
```
localforage.config({
    driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
    name        : 'myApp',
    version     : 1.0,
    size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description : 'some description'
});
```