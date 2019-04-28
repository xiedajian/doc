
# Base64

从IE10+浏览器开始，所有浏览器就原生提供了Base64编码解码方法，

不仅可以用于浏览器环境，Service Worker环境也可以使用。


方法名就是atob和btoa，具体语法如下：



# 1. Base64解码

```
var decodedData = window.atob && atob('emhhbmd4aW54dQ==');;
```


# 2. Base64编码

```
var encodedData = window.btoa(stringToEncode);
```


# 中文编码可能有问题

可以尝试中文先encode转码和decode编码：
```
btoa(unescape(encodeURIComponent(str)))
```

# 任意文件Base64编码

借助FileReader对象和readAsDataURL方法，我们可以把任意的文件转换为Base64 Data-URI。假设我们的文件对象是file，则转换的JavaScript代码如下：

```
var reader = new FileReader();
reader.onload = function(e) {
  // e.target.result就是该文件的完整Base64 Data-URI
};
reader.readAsDataURL(file);
```



# IE8/IE9的polyfill

base64.js
```
;(function () {

  var object =
    typeof exports != 'undefined' ? exports :
    typeof self != 'undefined' ? self : // #8: web workers
    $.global; // #31: ExtendScript

  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  function InvalidCharacterError(message) {
    this.message = message;
  }
  InvalidCharacterError.prototype = new Error;
  InvalidCharacterError.prototype.name = 'InvalidCharacterError';

  // encoder
  // [https://gist.github.com/999166] by [https://github.com/nignag]
  object.btoa || (
  object.btoa = function (input) {
    var str = String(input);
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars, output = '';
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      str.charAt(idx | 0) || (map = '=', idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
      charCode = str.charCodeAt(idx += 3/4);
      if (charCode > 0xFF) {
        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      block = block << 8 | charCode;
    }
    return output;
  });

  // decoder
  // [https://gist.github.com/1020396] by [https://github.com/atk]
  object.atob || (
  object.atob = function (input) {
    var str = String(input).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
    if (str.length % 4 == 1) {
      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = '';
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  });

}());
```

实际使用，我们可以借助IE条件注释无缝对接。
```
<!--[if IE]>
<script src="./base64.js"></script>
<![endif]-->
```