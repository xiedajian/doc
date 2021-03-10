# Lottie-前端实现AE动效

> 阅读时间 10~15min

项目背景
----

项目中为了优化用户体验加入了几处微交互动画，过期的流程都是设计输出合成的雪碧图，前端通过序列帧实现动画效果，如下图动画效果：

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a2cbed97f593?imageslim)

序列帧：

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a2cf392eaa37?imageView2/0/w/1280/h/960/ignore-error/1)

动画效果：

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a2d27f0cd849?imageslim)

序列帧：

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a2db758542b6?imageView2/0/w/1280/h/960/ignore-error/1)

帧动画的**缺点和局限性**比较明显，合成的雪碧图文件大，且在不同屏幕分辨率下可能会失真。经调研发现，Lottie是个简单、高效且性能高的动画方案。

**[Lottie](https://airbnb.io/lottie/)**是可应用于Android, iOS, Web和Windows的库，通过**Bodymovin**解析[AE](https://www.adobe.com/products/aftereffects.html)动画，并导出可在移动端和web端渲染动画的**json文件**。换言之，设计师用AE把动画效果做出来，再用Bodymovin导出相应地json文件给到前端，前端使用Lottie库就可以实现动画效果。

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a2e481b521c0?imageView2/0/w/1280/h/960/ignore-error/1)

Bodymovin插件的安装与使用
-----------------

1.  关闭AE
    
2.  下载并安装ZXP installer
    
    [aescripts.com/learn/zxp-i…](https://aescripts.com/learn/zxp-installer/)
    
3.  下载最新版bodymovin插件  
    [github.com/airbnb/lott…](https://github.com/airbnb/lottie-web/blob/master/build/extension/bodymovin.zxp)
    
4.  把下载好的bodymovin.zxp拖到ZXP installer  
    ![](https://user-gold-cdn.xitu.io/2019/3/17/1698a2ea49ab631f?imageView2/0/w/1280/h/960/ignore-error/1)
    
5.  打开AE，在菜单**首选项->常规**中勾选:ballot\_box\_with\_check:允许脚本写入文件和访问网络（否则输出JSON文件时会失败）
    
6.  在AE中制作动画，打开菜单窗口->拓展->Bodymovin，勾选要输出的动画，并设置输出文件目录，点击render  
    ![](https://user-gold-cdn.xitu.io/2019/3/17/1698a3048ee9a477?imageView2/0/w/1280/h/960/ignore-error/1) 打开输出目录会看到生成的JSON文件，若动画里导入了外部图片，则会在images中存放JSON中引用的图片
    

前端使用lottie
----------

静态URL  
[cdnjs.com/libraries/l…](https://cdnjs.com/libraries/lottie-web)

NPM

```
npm install lottie-web 
```

调用loadAnimation

```
lottie.loadAnimation({
    container: element,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'data.json' 
}); 
```

vue-lottie
----------

也可以在vue中使用lottie

```
import lottie from '../lib/lottie';
import * as favAnmData from '../../raw/fav.json';

export default {
    props: {
        options: {
            type: Object,
            required: true
        },
        height: Number,
        width: Number,
    },

    data () {
        return {
            style: {
                width: this.width ? `${this.width}px` : '100%',
                height: this.height ? `${this.height}px` : '100%',
                overflow: 'hidden',
                margin: '0 auto'
            }
        }
    },

    mounted () {
        this.anim = lottie.loadAnimation({
                container: this.$refs.lavContainer,
                renderer: 'svg',
                loop: this.options.loop !== false,
                autoplay: this.options.autoplay !== false,
                animationData: favAnmData,
                assetsPath: this.options.assetsPath,
                rendererSettings: this.options.rendererSettings
            }
        );
        this.$emit('animCreated', this.anim)
    }
} 
```

loadAnimation参数
---------------

container

用于渲染动画的HTML元素，需确保在调用loadAnimation时该元素已存在

renderer

渲染器，可选值为'svg'（默认值）/'canvas'/'html'。svg支持的功能最多，但html的性能更好且支持3d图层。[各选项值支持的功能列表在此](https://github.com/airbnb/lottie-web/wiki/Features)

loop

默认值为true。可传递需要循环的特定次数

autoplay

自动播放

path

JSON文件路径

animationData

JSON数据，与path互斥

name

传递该参数后，可在之后通过lottie引用该动画实例

rendererSettings

可传递给renderer实例的特定设置，[具体可看](https://github.com/airbnb/lottie-web/wiki/Renderer-Settings)

Lottie动画监听
----------

Lottie提供了用于监听动画执行情况的事件：

*   complete
*   loopComplete
*   enterFrame
*   segmentStart
*   config\_ready(初始配置完成)
*   data\_ready（所有动画数据加载完成）
*   DOMLoaded（元素已添加到DOM节点）
*   destroy

可使用addEventListener监听事件

```
// 动画播放完成触发
anm.addEventListener('complete', anmLoaded);

// 当前循环播放完成触发 
anm.addEventListener('loopComplete', anmComplete);
    
// 播放一帧动画的时候触发 
anm.addEventListener('enterFrame', enterFrame); 
```

控制动画播放速度和进度
-----------

可使用anm.pause和anm.play暂停和播放动画，调用anm.stop则会停止动画播放并回到动画第一帧的画面。

使用anm.setSpeed(speed)可调节动画速度，而anm.goToAndStop(value, isFrame)和anm.goToAndPlay可控制播放特定帧数，也可结合anm.totalFrames控制进度百分比，比如可传anm.totalFrames - 1跳到最后一帧。

```
anm.goToAndStop(anm.totalFrames - 1, 1); 
```

这样的好处是可以把相关联的JSON文件合并，通过anm.goToAndPlay控制动画状态的切换，如下图例中一个JSON文件包含了2个动画状态的数据：

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a34c3e54a44d?imageslim)

图片资源
----

JSON文件里assets设置了对图片的引用：

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a3ad913345e2?imageView2/0/w/1280/h/960/ignore-error/1)

若想统一修改静态资源路径或者设置成绝对路径，可在调用loadAnimation时传入assetsPath参数：

```
lottie.loadAnimation({
    container: element,
    renderer: 'svg',
    path: 'data.json',
    assetsPath: 'URL’  // 静态资源绝对路径
}); 
```

功能支持列表
------

即使用bodymovin成功输出了JSON文件（没有报错），也会出现动效不如预期的情况，比如这是在AE中构建的形象图：

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a3c370a518f4?imageView2/0/w/1280/h/960/ignore-error/1)

但在页面中渲染效果是这样的：

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a3ce5fdb253d?imageslim)

这是因为使用了不支持的Merge Paths功能

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a3dd0bc50a51?imageView2/0/w/1280/h/960/ignore-error/1)

因此对设计师而言，创建Lottie动画和往常制作AE动画有所不同，此[文档](https://airbnb.io/lottie/supported-features.html)记录了Bodymovin支持输出的AE功能列表，动画制作前需跟设计师沟通好，根据动画加载平台来确认可使用的AE功能。

### 尽量遵循官方文档里对设计过程的[指导和建议](http://airbnb.io/lottie/after-effects/general-tips.html)：

*   动画简单化。创建动画时需时刻记着保持JSON文件的精简，比如尽可能地绑定父子关系，在相似的图层上复制相同的关键帧会增加额外的代码，尽量不使用占用空间最多的路径关键帧动画。诸如自动跟踪描绘、颤动之类的技术会使得JSON文件变得非常大且耗性能。
*   建立形状图层。将AI、EPS、SVG和PDF等资源转换成形状图层否则无法在Lottie中正常使用，转换好后注意删除该资源以防被导出到JSON文件。
*   设置尺寸。在AE中可设置合成尺寸为任意大小，但需确保导出时合成尺寸和资源尺寸大小保持一致。
*   不使用表达式和特效。Lottie暂不支持。
*   注意遮罩尺寸。若使用alpha遮罩，遮照的大小会对性能产生很大的影响。尽可能地把遮罩尺寸维持到最小。
*   动画调试。若输出动画破损，通过每次导出特定图层来调试出哪些图层出了问题。然后在github中附上该图层文件提交问题，选择用其他方式重构该图层。
*   不使用混合模式和亮度蒙版。
*   不添加图层样式。
*   全屏动画。设置比想要支持的最宽屏幕更宽的导出尺寸。
*   设置空白对象。若使用空白对象，需确保勾选可见并设置透明度为0%否则不会被导出到JSON文件。

预览效果
----

由于以上所说的功能支持问题会导致输出动画效果不确定性，设计师和前端之间有个动画效果联调的过程，为了提高联调效率，设计师可先进行初步的效果预览，再把文件交付给前端。

### 方法1:输出预览HTML文件

渲染前设置所要渲染的文件

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a3e481ac28f0?imageView2/0/w/1280/h/960/ignore-error/1)

勾选☑️Demo选项

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a3ef8e788e71?imageView2/0/w/1280/h/960/ignore-error/1)

在输出的文件目录中就可找到可预览的demo.html文件

### 方法2:LottieFiles分享平台

把生成的JSON文件传到LottieFiles平台，可播放、暂停生成文件的动画效果，可设置图层颜色、动画速度，也可以下载lottie preview客户端在iOS或Android机子上预览。

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a3f9330dda08?imageView2/0/w/1280/h/960/ignore-error/1)

LottieFiles平台还提供了很多线上公开的Lottie动画效果，可直接下载JSON文件使用

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a4039dac13f8?imageView2/0/w/1280/h/960/ignore-error/1)

交互hack
------

Lottie的不足之处是没有对应的API操纵动画层，若想做更细化的动画处理，只能直接操作节点来实现。比如当播放完左图动画进入惊讶状态后，若想实现右图随鼠标移动而控制动画层的简单效果：

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a412d4adc63a?imageslim)

开启调试面板可以看到，lottie-web通过使用标签的transform属性来控制动画：

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a41cdf12db2d?imageView2/0/w/1280/h/960/ignore-error/1)

当元素已添加到DOM节点，找到想要控制的标签，提取其transform属性的矩阵值，并使用[rematrix](https://github.com/jlmakes/rematrix)解析矩阵值。

```
onIntroDone() {
    const Gs = this.refs.svg.querySelectorAll('svg > g > g > g');
    Gs.forEach((node, i) => {
        // 过滤需要修改的节点
        ...

        // 获取transform属性值
        const styleArr = node.getAttribute('transform').split(',');
        styleArr[0] = styleArr[0].replace('matrix(', '');
        styleArr[5] = styleArr[5].replace(')', '');
        const style = `matrix(${styleArr[0]}, ${styleArr[1]}, ${styleArr[2]}, ${styleArr[3]}, ${styleArr[4]},                     ${styleArr[5]})`;

        // 使用Rematrix解析
        const transform = Rematrix.parse(style);
        this.matrices.push({
            node,
            transform,
            prevTransform: transform
      });
    }
} 
```

监听鼠标移动，设置新的transform属性值。

```
onMouseMove = (e) => {
    this.mouseCoords.x = e.clientX || e.pageX;
    this.mouseCoords.y = e.clientY || e.pageY;
      
    let x =  this.mouseCoords.x - (this.props.browser.width / 2);
    let y =  this.mouseCoords.y - (this.props.browser.height / 2);

    const diffX = (this.mouseCoords.prevX - x);
    const diffY = (this.mouseCoords.prevY - y);

    this.mouseCoords.prevX = x;
    this.mouseCoords.prevY = y;

    this.matrices.forEach((matrix, i) => {
        let translate = Rematrix.translate(diffX, diffY);
        const product = [matrix.prevTransform, translate].reduce(Rematrix.multiply);
        const css = `matrix(${product[0]}, ${product[1]}, ${product[4]}, ${product[5]}, ${product[12]}, ${product[13]})`;

        matrix.prevTransform = product;
        matrix.node.setAttribute('transform', css);
     })
  } 
```

### 进一步优化

看到一个方法，在AE中将图层命名为\*\*#id**格式，生成的SVG相应的图层id会被设置为**id\*\*，命名为\*\*.class**格式，相应的图层class会被设置为**class\*\*

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a42fea18a0bd?imageView2/0/w/1280/h/960/ignore-error/1)

试了下的确可以，如下图，因此可通过这个方法快速找到需要操作的动画层，进一步简化代码：

![](https://user-gold-cdn.xitu.io/2019/3/17/1698a4393a589b01?imageView2/0/w/1280/h/960/ignore-error/1)

小结
--

Lottie的缺点在于若在AE动画制作的过程不注意规范，会导致数据文件大、耗内存和性能的问题；Lottie-web的官方文档不够详尽，例如assetsPath参数是在看源码的时候发现的；开放的API不够齐全，无法很灵活地控制动画层。

而优点也很明显，Lottie能帮助提高开发效率，精简代码，易于调试和维护；资源文件小，输出动画效果保真；跨平台——Android, iOS, Web和Windows通用。

总的来说，Lottie的引用可以替代传统的GIF和帧动画，灵活利用好提供的属性和方法可以控制动画的播放，但需注意规范设计和开发的流程，才可以更高效地完成动画的制作与调试。

关注公众号：**【IVWEB社区】**，每周推送精品技术周刊 。

*   周刊文章集合: [weekly](https://github.com/feflow/weekly)
*   团队开源项目: [Feflow](https://github.com/feflow/feflow)

  

本文转自 [https://juejin.cn/post/6844903798452781063](https://juejin.cn/post/6844903798452781063)，如有侵权，请联系删除。
