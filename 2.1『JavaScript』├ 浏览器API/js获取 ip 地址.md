

```
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
//   微信html 也可用此获取ip
console.log(returnCitySN["cip"])
console.log(returnCitySN["cid"])
console.log(returnCitySN["cname"])
</script>  
```


# address.js

[npm](https://www.npmjs.com/package/address)
[github](https://github.com/node-modules/address)


安装
```
npm install address
```

使用
```
var address = require('address');

// default interface 'eth' on linux, 'en' on osx.
address.ip();   // '192.168.0.2'
address.ipv6(); // 'fe80::7aca:39ff:feb0:e67d'
address.mac(function (err, addr) {
  console.log(addr); // '78:ca:39:b0:e6:7d'
});

// local loopback
address.ip('lo'); // '127.0.0.1'

// vboxnet MAC
address.mac('vboxnet', function (err, addr) {
  console.log(addr); // '0a:00:27:00:00:00'
});
```