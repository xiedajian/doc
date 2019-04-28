
# 安卓签名


## 生成签名市场

```
keytool -genkey -alias demo.keystore -keyalg RSA -validity 40000 -keystore demo.keystore
```


说明：
		-genkey 产生密钥
       -alias demo.keystore       别名 demo.keystore
       -keyalg RSA                使用RSA算法对签名加密
       -validity 40000            有效期限4000天
       -keystore                  demo.keystore


## 使用签名对app进行签名

```
D:\>jarsigner -verbose -keystore demo.keystore -signedjar demo_signed.apk demo.apk demo.keystore
```

说明：
    -verbose                           输出签名的详细信息
    -keystore  demo.keystore           密钥库位置
    -signedjar demo_signed.apk demo.apk demo.keystore               正式签名，三个参数中依次为 签名后产生的文件demo_signed，要签名的文件demo.apk和密钥库demo.keystore.



## 用zipalign(压缩对齐)优化你的APK文件  (位于android-sdk-windows\build-tools\25.0.2目录下)

```
cd  G:\androidSDK\android-sdk-windows\build-tools\25.0.2
zipalign -v 4 demo_signed.apk final.apk
```
例如：
```
G:\androidSDK\android-sdk-windows\build-tools\25.0.2>zipalign -v 4 F:/web/KmfApp2.0/platforms/android/build/outputs/apk/android-armv7-release.apk  F:\web\KmfApp2.0\platforms\android\build\outputs\apk\ipvpKmf2.0.apk
```





# Android 7.0 引入一项新的应用签名方案 APK Signature Scheme v2


Android 7.0 引入一项新的应用签名方案 APK Signature Scheme v2，它能提供更快的应用安装时间和更多针对未授权 APK 文件更改的保护。在默认情况下，Android Studio 2.2 和 Android Plugin for Gradle 2.2 会使用 APK Signature Scheme v2 和传统签名方案来签署您的应用。





# bug解决

adb命令安装提示[INSTALL_PARSE_FAILED_NO_CERTIFICATES]

知道是签名问题，用百度找了好久，也没解决问题，最后用google搜索找到了，是android sutdio 重2.2之后有了新的机制：






## 安卓权限设置   

位于\platforms\android\AndroidManifest.xml
