

navigator对象，提供浏览器及操作系统等信息。


```
var sUserAgent = navigator.userAgent.toLowerCase();
var IsIpad = sUserAgent.match(/ipad/i) == "ipad"; 				//ipad
var IsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os"; //iphone
var IsMidp = sUserAgent.match(/midp/i) == "midp";
var IsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"; 	//uc
var IsUc = sUserAgent.match(/ucweb/i) == "ucweb";
var IsAndroid = sUserAgent.match(/android/i) == "android"; 		//android
var IsCE = sUserAgent.match(/windows ce/i) == "windows ce";
var IsWM = sUserAgent.match(/windows mobile/i) == "windows mobile"; //模拟器
```

```
function isWeixinBrowser() {
            return (/micromessenger/.test(ua)) ? true : false;
}
		
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

```



# brower.js

该库旨在帮助您检测用户拥有的浏览器，并为您提供方便的API，以便根据浏览器以某种方式过滤用户。

[npm](https://www.npmjs.com/package/bowser)
[github](https://github.com/lancedikson/bowser)

安装
```
npm i bowser
```

引用
```
const Bowser = require("bowser"); // CommonJS

import * as Bowser from "bowser"; // TypeScript

import Bowser from "bowser"; // ES6 (and TypeScript with --esModuleInterop enabled)
```

使用
```
const browser = Bowser.getParser(window.navigator.userAgent);

console.log(`The current browser name is "${browser.getBrowserName()}"`);
// The current browser name is "Internet Explorer"
```

or
```
const impression = new Impression();

const browser = Bowser.getParser(window.navigator.userAgent);
const browserInfo = browser.getBrowser();
impression.brName = browserInfo.name;
impression.brVer = browserInfo.version;
```

or
```
const browser = Bowser.getParser(window.navigator.userAgent);
impression.userTechData = browser.parse();
console.log(impression.userTechData);

// outputs
{
  browser: {
    name: "Internet Explorer"
    version: "11.0"
  },
  os: {
    name: "Windows"
    version: "NT 6.3"
    versionName: "8.1"
  },
  platform: {
    type: "desktop"
  },
  engine: {
    name: "Trident"
    version: "7.0"
  }
}
```