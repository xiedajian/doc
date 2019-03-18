[npm](https://www.npmjs.com/package/bowser)



# bowser

浏览器检测器，该库旨在帮助您检测用户拥有的浏览器，并为您提供方便的API，以便根据浏览器以某种方式过滤用户

也方便用于收集用户的设备信息

```
npm i bowser
```


# 使用

```
import Bowser from "bowser";

const bowser = Bowser.getParser(window.navigator.userAgent);

// 浏览器类型
// console.info(bowser.getBrowserName());
// 操作系统类型：
// console.info(bowser.getOSName());
// 平台类型：
// console.info(bowser.getPlatformType());

// 更详细的API可查看
// console.log(bowser)

```
