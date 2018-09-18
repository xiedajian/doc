
npm文档： https://www.npmjs.com/package/screenfull



# screenfull

用于跨浏览器使用JavaScript Fullscreen API的简单包装器，可让您将页面或任何元素全屏显示。平滑浏览器实现差异。


# 安装

只有0.7 kB gzipped。

下载生产版本或开发版本。

或者采用npm

```
$ npm install --save screenfull
```


# 常用方法

.request()

Make an element fullscreen.


.exit()

Brings you out of fullscreen


.toggle()

Requests fullscreen if not active, otherwise exits


# Examples

全屏：
```
if (screenfull.enabled) {
    screenfull.request();
}
```

Fullscreen the page:

```
document.getElementById('button').addEventListener('click', () => {
    if (screenfull.enabled) {
        screenfull.request();
    } else {
        // Ignore or do something else
    }
});
```

Fullscreen an element:
```
const el = document.getElementById('target');
 
document.getElementById('button').addEventListener('click', () => {
    if (screenfull.enabled) {
        screenfull.request(el);
    }
});
```

Toggle fullscreen on a image with jQuery:
```
$('img').on('click', event => {
    if (screenfull.enabled) {
        screenfull.toggle(event.target);
    }
});
```


