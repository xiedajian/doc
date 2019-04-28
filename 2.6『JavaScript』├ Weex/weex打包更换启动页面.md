


Weex 修改安卓生成apk默认的启动页面详细方法。

开始配置好weex运行之后，apk的欢迎页面是一个默认的蓝色背景 字体旋转的启动页面


我们在实际项目中不可能用这样的启动页面，所以需要改成自己公司宣传图的背景，网上找了都没有weex修改欢迎页面的内容，

所以自己就参考安卓开发启动页面的相关代码修改weex的启动页面，步骤如下：

1、进入项目目录：\platforms\android\app\src\main\res? 新建文件夹：drawable

2、把背景图片放到?drawable 文件夹里面去，我这边的图片文件名是 bg.jpg

3、打开文件夹?\platforms\android\app\src\main\res\layout 找到 activity_splash.xml 文件，用编辑器打开

4、修改 FrameLayout 节点的background 属性为：@drawable/bg

修改前：
```
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
             xmlns:tools="http://schemas.android.com/tools"
             android:layout_width="match_parent"
             android:layout_height="match_parent"
             android:id="@+id/container"
             android:background="#0099cc"
             tools:context="com.alibaba.weex.com.alibaba.app.SplashActivity">

    <TextView android:id="@+id/fullscreen_content"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:keepScreenOn="true"
              android:textColor="#33b5e5"
              android:textStyle="bold"
              android:textSize="50sp"
              android:gravity="center"
              android:text="@string/dummy_content"/>
</FrameLayout>
```

修改后：
```
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
             xmlns:tools="http://schemas.android.com/tools"
             android:layout_width="match_parent"
             android:layout_height="match_parent"
             android:id="@+id/container"
             android:background="@drawable/bg"
             tools:context="com.alibaba.weex.com.alibaba.app.SplashActivity">

    <TextView android:id="@+id/fullscreen_content"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:keepScreenOn="true"
              android:textColor="#33b5e5"
              android:textStyle="bold"
              android:textSize="50sp"
              android:gravity="center"
              android:text="@string/dummy_content"/>
</FrameLayout>
```

5、重新运行安卓调试命令查看效果