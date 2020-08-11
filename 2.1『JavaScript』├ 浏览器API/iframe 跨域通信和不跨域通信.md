

# iframe 跨域通信和不跨域通信

## 不跨域通信

主页面
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
  </head>
  <body>
    <iframe
      name="myIframe"
      id="iframe"
      class=""
      src="flexible.html"
      width="500px"
      height="500px"
    >
    </iframe>
  </body>
  <script type="text/javascript" charset="utf-8">
    function fullscreen() {
      alert(1111);
    }
  </script>
</html>
```
子页面 flexible.html
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
  </head>
  <body>
    我是子页面
  </body>
  <script type="text/javascript" charset="utf-8">
    // window.parent.fullScreens()
    function showalert() {
      alert(222);
    }
  </script>
</html>
```
1、主页面要是想要调取子页面的 showalert 方法
```
myIframe.window.showalert();
```
2、子页面要掉主页面的 fullscreen 方法
```
window.parent.fullScreens();
```
3、js 在 iframe 子页面获取父页面元素:
```
window.parent.document.getElementById("元素id");
```
4、js 在父页面获取 iframe 子页面元素代码如下:
```
window.frames["iframe_ID"].document.getElementById("元素id");
```


## 跨域通信

使用postMessage

子页面
```
window.parent.postMessage("hello", "http://127.0.0.1:8089");
```
父页面接收
```
window.addEventListener("message", function(event) {
  alert(123);
});
```
