
[官网](https://www.live2d.com)

[参考](https://haremu.com/p/205)

[参考](https://github.com/galnetwen/Live2D)


[参考：](https://www.zhangxinxu.com/wordpress/2018/05/live2d-web-webgl-js/)
[参考：](https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02)


# live2d看板娘

明明是2D平面设计风格，却有3D行为交互的效果就是live2d

采用webGL技术实现。


# live2d技术简介

Live2D是一种应用于电子游戏的绘图渲染技术，由日本Cybernoids公司开发，

通过一系列的连续图像和人物建模来生成一种类似二维图像的三维模型，

换句话说就是2D的素材实现一定程度的3D效果，但只能是一定程度3D，因为Live 2D人物无法大幅度转身。


# live2d技术在网页中呈现

live2d官方提供了很多平台的SDK（介绍见这里），包括iOS，Android，Flash，Unity，openGL等，

然后如果要在网页中呈现，则可以提供了WebGL SDK，[Cubism SDK WebGL 2.1](http://sites.cybernoids.jp/cubism-sdk2_e/webgl2-1)
选择个人，否则要钱的。

不过，官方提供下载页不稳定，常打不卡，

[官网](https://www.zhangxinxu.com/sp/demo/live2d/sdk/sample/SampleApp1/SampleApp1.html)
国内已经有一些对live2d web进行实践的先驱，他们提供的JS资源在使用上要简单的多




# github 案例

[原作者](https://github.com/galnetwen/Live2D)

具体步骤如下：

1.页面上放一个canvas：
```
<canvas id="live2d" width="280" height="250"></canvas>
```

2.引入live2d.js，例如：
```
<script src="./js/live2d.js"></script>
```

3.一行JS代码执行绑定：

```
loadlive2d("live2d", "./model.json");
```


效果就达成了，就是这么简单

最麻烦的其实是model.json

JS只是个驱动器，其实Live2D效果的实现最大的工作量是在素材资源的制作上。


案例：https://l2dwidget.js.org/dev.html