
参考文档：[https://blog.csdn.net/yulle/article/details/79568828](https://blog.csdn.net/yulle/article/details/79568828)



#ADB

ADB，即 Android Debug Bridge，它是 Android 开发/测试人员不可替代的强大工具，也是 Android 设备玩家的好玩具。

注：有部分命令的支持情况可能与 Android 系统版本及定制 ROM 的实现有关。



# 基本用法
命令语法
adb 命令的基本语法如下：
```
$ adb [-d|-e|-s <serialNumber>] <command>
```



例如通过adb把 apk 包安装到设备上

1.检测连接的设备
```
$ adb devices

List of devices attached
cf264b8f    device
```
输出里的 cf264b8f 就是设备,device —— 设备已连接

2.安装本地包到设备
```
$ adb -s cf264b8f install "D:\test.apk"
```

3.卸载apk
```
$ adb uninstall test.apk
```