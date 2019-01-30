
[npm](https://www.npmjs.com/package/qrcode)

# qrcode

安装
```
npm i QRCode

```

引用
```
var QRCode = require('qrcode')
或
import QRCode from 'qrcode'
或
<script src="/build/qrcode.min.js"></script>

```

使用 QRCode.toCanvas 方法
```
<canvas id="canvas"></canvas>

import QRCode from 'qrcode'

var canvas = document.getElementById('canvas')
QRCode.toCanvas(canvas, 'https://www.baidu.com', function (error) {
	if (error) console.error(error)
	console.log('QRCode success!');
})

```
