Native.js虽然强大和开放，但很多web开发者因为不熟悉原生API而难以独立完成。
这篇帖子的目的就是汇总各种写好的NJS代码，方便web开发者。
众人拾柴火焰高，有能力的开发者多多提交NJS代码，大家都会给你点赞的，我们也会为每位共享NJS代码的朋友送上200积分。

Android平台
Android动态权限申请
https://ask.dcloud.net.cn/article/35861

监听手机锁屏，解锁，开屏
http://ask.dcloud.net.cn/article/35205

直接拨打电话
http://ask.dcloud.net.cn/question/4035

将程序切换到后台
http://ask.dcloud.net.cn/question/2484

强制弹出软键盘
http://ask.dcloud.net.cn/question/2324

获取安卓设备device.uuid
http://ask.dcloud.net.cn/question/3510

获取内存及CPU信息
http://ask.dcloud.net.cn/question/2202

开启关闭蓝牙
http://ask.dcloud.net.cn/question/4720

监听蓝牙开关状态
http://ask.dcloud.net.cn/article/274

获取蓝牙设备列表
http://ask.dcloud.net.cn/question/8265

蓝牙连接票据打印机完整代码
http://ask.dcloud.net.cn/article/643

NFC数据读取
http://ask.dcloud.net.cn/question/6726

截屏
http://ask.dcloud.net.cn/question/5344

获取MAC地址
http://ask.dcloud.net.cn/question/1511

获取设备当前网速
http://ask.dcloud.net.cn/article/773

打开网络设置
http://ask.dcloud.net.cn/question/1475

打开各种系统设置界面
http://ask.dcloud.net.cn/question/14732

获取WIFI列表
http://ask.dcloud.net.cn/question/12113

调用系统控件播放视频
http://ask.dcloud.net.cn/question/614

调用os通讯录选择控件
http://ask.dcloud.net.cn/question/5783

原生日历提醒插入
http://ask.dcloud.net.cn/article/215

调用系统控件裁剪图片
http://ask.dcloud.net.cn/question/8314

复制内容到系统粘贴板
http://ask.dcloud.net.cn/question/2034

调用讯飞的文字转语音功能（TTS）
http://ask.dcloud.net.cn/question/6473

调用其它Activity后通过startActivityForResult获取返回结果
http://ask.dcloud.net.cn/question/5783

接收系统广播消息，如监听安装卸载apk的事件
http://ask.dcloud.net.cn/article/222

判断app是否安装
http://ask.dcloud.net.cn/question/7604

以监听手机飞行模式开关为例说明如何使用Native.js进行BroadcastReceiver广播
http://ask.dcloud.net.cn/question/7661

常驻Android通知栏，不用个推实现本地消息推送(Local Notification)
http://ask.dcloud.net.cn/question/2464

调用原生的socket连接
http://ask.dcloud.net.cn/question/60

启动一个原生service
http://ask.dcloud.net.cn/question/433

基于native.js的文件系统管理功能实现
http://ask.dcloud.net.cn/article/809

打开闪光灯
http://ask.dcloud.net.cn/question/19379

停止、开启个推推送功能
复制代码var pushManager = plus.android.importClass("com.igexin.sdk.PushManager");  
var context = plus.android.runtimeMainActivity();  
function enable() {  
    pushManager.getInstance().turnOnPush(context);  
}  

function disable() {  
    pushManager.getInstance().turnOffPush(context);  
}  
感谢yeahcheung分享

利用native.js获取手机gps是否开启
http://ask.dcloud.net.cn/question/11890

通过native.js设置系统墙纸
http://ask.dcloud.net.cn/article/651

监听短信验证码
http://ask.dcloud.net.cn/article/676

限制手机录像时间
http://ask.dcloud.net.cn/question/45756

Android监听电话呼入呼出
http://ask.dcloud.net.cn/article/1006

Android6以上动态权限申请
https://ask.dcloud.net.cn/article/35091

通知栏下载进度条
https://ask.dcloud.net.cn/article/503

打开应用市场
https://ask.dcloud.net.cn/article/12753

iOS平台
如何判断系统功能权限是否开启及提示用户开启权限
https://ask.dcloud.net.cn/article/35915

获取包名
复制代码var NSBundle = plus.ios.importClass('NSBundle');  
var bundle = NSBundle.mainBundle();  
console.log(bundle.bundleIdentifier());  
plus.ios.deleteObject(bundle);  
获取设备名
http://ask.dcloud.net.cn/question/14691

测试是否安装某应用
http://ask.dcloud.net.cn/question/14430

调用iOS打印API
http://ask.dcloud.net.cn/question/4226

通过native.js登入game center
见Hello H5+里Native.js部分演示及源码。
或在这里搜索“game center”，http://ask.dcloud.net.cn/docs/#http://ask.dcloud.net.cn/article/88

设置获取内容到系统粘贴板
http://ask.dcloud.net.cn/question/3720

打开页面默认弹出键盘
http://ask.dcloud.net.cn/question/2324

播放提示音
http://ask.dcloud.net.cn/question/3962

调用ios的文字转语音（TTS）
http://ask.dcloud.net.cn/question/4175

把base64数据保存为图片
http://ask.dcloud.net.cn/question/6190

设置webview滑动减速度
复制代码var webview = plus.ios.currentWebview();  
var scrollView = webview.plusGetAttribute("scrollView");  
scrollView.plusSetAttribute("decelerationRate:",0.99);  
打开ios的Wifi设置页面
http://ask.dcloud.net.cn/question/7797

判断是否开启消息通知
http://ask.dcloud.net.cn/question/4497
http://ask.dcloud.net.cn/article/35727

检测iOS是否允许使用相机(感谢小闹分享)
http://ask.dcloud.net.cn/article/188

打开应用市场
https://ask.dcloud.net.cn/article/12753

ios获取系统的时区id
复制代码var NSTimeZone = plus.ios.importClass("NSTimeZone");  
var sys = NSTimeZone.systemTimeZone();  
console.log(sys.plusGetAttribute("name"));  
状态栏显示网络请求雪花
复制代码var UIApplication = plus.ios.import("UIApplication");  
var sharedApplication = UIApplication.sharedApplication();  
sharedApplication.setNetworkActivityIndicatorVisible(true);  
plus.ios.deleteObject(sharedApplication);  
获取GPS授权状态
复制代码var CLLocationManager = plus.ios.import("CLLocationManager");  
var authorizationStatus = CLLocationManager.authorizationStatus();  
switch(authorizationStatus) {  
      case 0:  
      /// User has not yet made a choice with regards to this application  
      break;  
      case 1:  
      // This application is not authorized to use location services.  Due  
    // to active restrictions on location services, the user cannot change  
    // this status, and may not have personally denied authorization  
      break;  
      case 2:  
        // User has explicitly denied authorization for this application, or  
    // location services are disabled in Settings.  
      break;  
      case 3:  
        // User has granted authorization to use their location at any time,  
    // including monitoring for regions, visits, or significant location changes.  
      break;  
      case 4:  
       // User has granted authorization to use their location only when your app  
    // is visible to them (it will be made visible to them if you continue to  
    // receive location updates while in the background).  Authorization to use  
    // launch APIs has not been granted.  
      break;  
      case 5:  
     // This value is deprecated, but was equivalent to the new -Always value.  
      break;  
      defalut:  
      break;  
}  
获取手机存储空间
复制代码var BundleClass = plus.ios.importClass("NSBundle");  
var BundleObj = BundleClass.mainBundle();  
var filenamagerobj = plus.ios.newObject("NSFileManager");  
var FileAttr = plus.ios.invoke(filenamagerobj,"attributesOfFileSystemForPath:error:",BundleObj.bundlePath(),null);  
// NSFileSystemFreeSize 参数获取剩余空间  
// NSFileSystemSize  获取手机总存储空间  
var freeSpace = plus.ios.invoke(FileAttr,"objectForKey:","NSFileSystemFreeSize");  
var numberFormatterObj = plus.ios.newObject("NSNumberFormatter");  
var FreeSpaceStr = plus.ios.invoke(numberFormatterObj,"stringFromNumber:",freeSpace);  
var freeSpace = FreeSpaceStr / 1024/1024/1024;  
打开/关闭手机的闪光灯
复制代码function turnonLight(isOn) {  
    if(plus.os.name == "iOS") {  
        var avcaptClass = plus.ios.importClass("AVCaptureDevice");  
        if(avcaptClass) {  
            var device = avcaptClass.defaultDeviceWithMediaType("vide");  
            plus.ios.invoke(device, "lockForConfiguration:", null);  
            if(isOn) {  
                plus.ios.invoke(device, "setTorchMode:", 1);  
                plus.ios.invoke(device, "setFlashMode:", 1);  
            } else {  
                plus.ios.invoke(device, "setTorchMode:", 0);  
                plus.ios.invoke(device, "setFlashMode:", 0);  
            }  
            plus.ios.invoke(device, "unlockForConfiguration");  
        }  
    }  
};  
显示应用内的ViewController
复制代码// NewViewController为应用内创建的原生的ViewController类名,所调用页面的内容需要在原生代码中完成  
var newVCobj = plus.ios.newObject("NewViewController");  
var UIApplicationClass = plus.ios.importClass("UIApplication");  
var UIAppObj = UIApplicationClass.sharedApplication();  
var del = plus.ios.invoke(UIAppObj,"delegate");  
// 如果当前应用delegate对象包含UIWindow对象并且变量名命名为“window”可以这么写，  
// 否则需要根据实际代码情况修改  
// 应用的delegate对象也可以添加一个返回UIViewController的方法  
var appWindowObj = plus.ios.invoke(del,"window");  
var appRootController = plus.ios.invoke(appWindowObj,"rootViewController");  
plus.ios.invoke(appRootController,"presentViewController:animated:completion:",newVCobj,"YES",null);  