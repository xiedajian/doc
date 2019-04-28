


# WebView介绍

Android WebView在Android平台上是一个特殊的View， 基于webkit引擎、展现web页面的控件，这个类可以被用来在你的app中仅仅显示一张在线的网页，还可以用来开发浏览器。

WebView内部实现是采用渲染引擎来展示view的内容，提供网页前进后退，网页放大，缩小，搜索。

Android的Webview在低版本和高版本采用了不同的webkit版本内核，4.4后直接使用了Chrome。

现在很多APP都内置了Web网页，比如说很多电商平台，淘宝、京东、聚划算等等。

WebView比较灵活，不需要升级客户端，只需要修改网页代码即可。

一些经常变化的页面可以用WebView这种方式去加载网页。

例如中秋节跟国庆节打开的页面不一样，如果是用WebView显示的话，只修改修改html页面就行，而不需要升级客户端。

Webview功能强大，可以直接使用html文件（本地sdcard/assets目录），还可以直接加载url，使用JavaScript可以html跟原生APP互调。



# 作用

- 显示和渲染Web页面

- 直接使用html文件（网络上或本地assets中）作布局

- 可和JavaScript交互调用

>WebView控件功能强大，除了具有一般View的属性和设置外，还可以对url请求、页面加载、渲染、页面交互进行强大的处理。




# 加载html四种方式

```
webView.loadUrl("http://139.196.35.30:8080/OkHttpTest/apppackage/test.html");//加载url

webView.loadUrl("file:///android_asset/test.html");//加载asset文件夹下html

//方式3：加载手机sdcard上的html页面
webView.loadUrl("content://com.ansen.webview/sdcard/test.html");

//方式4 使用webview显示html代码
webView.loadDataWithBaseURL(null,"<html><head><title> 欢迎您 </title></head>" +
        "<body><h2>使用webview显示 html代码</h2></body></html>", "text/html" , "utf-8", null);

```



# WebViewClient与WebChromeClient区别

使用WebView基本都会使用这两个类，那他们有哪些区别呢？

WebViewClient主要帮助WebView处理各种通知、请求事件的，有以下常用方法： 
- onPageFinished 页面请求完成 
- onPageStarted 页面开始加载 
- shouldOverrideUrlLoading 拦截url 
- onReceivedError 访问错误时回调，例如访问网页时报错404，在这个方法回调的时候可以加载错误页面。

WebChromeClient主要辅助WebView处理Javascript的对话框、网站图标、网站title、加载进度等，有以下常用方法。 
- onJsAlert webview不支持js的alert弹窗，需要自己监听然后通过dialog弹窗 
- onReceivedTitle 获取网页标题 
- onReceivedIcon 获取网页icon 
- onProgressChanged 加载进度回调




# 简单使用

因为需要加载网页url，所以需要在AndroidManifest.xml中添加访问网络权限。
```
<uses-permission android:name="android.permission.INTERNET" />
```

布局文件:activity_main.xml
```
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

    <ProgressBar
        android:id="@+id/progressbar"
        style="@android:style/Widget.ProgressBar.Horizontal"
        android:layout_width="match_parent"
        android:layout_height="3dip"
        android:max="100"
        android:progress="0"
        android:visibility="gone"/>
</FrameLayout>
```

外层FrameLayout，里面有WebView跟ProgressBar，WebView的宽高匹配父类，ProgressBar横向进度条，高度3dip，按照FrameLayout布局规则，ProgressBar会覆盖在WebView之上，默认是隐藏不显示。







# Android：WebView与 JS 交互方式 

Android与JS通过WebView互相调用方法，实际上是：

- Android去调用JS的代码

- JS去调用Android的代码

> 二者沟通的桥梁是WebView

对于Android调用JS代码的方法有2种： 

1. 通过WebView的loadUrl（） 

2. 通过WebView的evaluateJavascript（）


对于JS调用Android代码的方法有3种： 

1. 通过WebView的addJavascriptInterface（）进行对象映射 

2. 通过 WebViewClient 的shouldOverrideUrlLoading ()方法回调拦截 url 

3. 通过 WebChromeClient 的onJsAlert()、onJsConfirm()、onJsPrompt（）方法回调拦截JS对话框alert()、confirm()、prompt（） 消息





