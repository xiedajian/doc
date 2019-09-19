[videojs官网](https://videojs.com/)
[github](https://github.com/videojs/video.js)
[videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)
[video.js 播放 rtsp、hls](https://juejin.im/post/5c91f8e6e51d45743908dbe6)



为什么要使用video.js？

1. PC端浏览器并不支持video直接播放m3u8格式的视频

2. 手机端各式各样的浏览器定制的video界面风格不统一，直接写原生的js控制视频兼容性较差

3. video.js解决以上两个问题，还可以有各种视频状态接口暴露，优化体验


# video.js

Videojs是一个基于JavaScript的HTML5视频播放器，当浏览器不支持时自动切换成Flashplayer播放器。

它没有依赖任何JavaScript框架，支持全屏播放和音量控制。支持HTML5和Flash的播放技术切换。

支持在桌面和移动设备上的视频播放


## video.js 7

Video.js 7 版本也放弃了对一些旧的Internet Explorer浏览器的支持，只支持IE11。

HLS封装的视频播放，videojs7默认包含hls插件，不需要引入其它插件。


## video.js 6

如果你想支持IE11以下，就不能用video 7了，可以用video 6



# 引用

首先需要在页面引用videojs的js和css文件

npm方式
```
npm i video.js

import videojs from 'video.js'
import 'video.js/dist/video-js.css'
```

传统 CDN 方式
```
<link href="https://unpkg.com/video.js/dist/video-js.min.css" rel="stylesheet">
<script src="https://unpkg.com/video.js/dist/video.min.js"></script>
```


# 使用

 有两种方法可以创建Video.js播放器并传递选项，
 但它们都以具有属性`class ="video-js"`的标准`<video>`元素开头：
 
## 方式1：auto-setup 自动初始化，通过html的 data-setup 属性进行设置

 只需使用一个HTML5 `<video>` 标签嵌入视频即可, 通过设置 data-setup 属性来是配置生效

 Video.js 接下来会读取标签然后让它在所有浏览器中都可以工作，并非只有支持 HTML5 video 的浏览器。
 
 Video.js 支持 `<video>` 元素的所有属性（如控件，预加载等），但它也支持它自己的选项。 

```
<video
    id="my-player"
    class="video-js vjs-big-play-centered"
    controls
    preload="auto"
    poster="//vjs.zencdn.net/v/oceans.png"
    data-setup='{}'>
    <source src="//media.html5media.info/video.mp4" type="video/mp4"></source>
    <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
    <source src="//media.html5media.info/video.ogv" type="video/ogg"></source>
    <p class="vjs-no-js">
    请开启Javascript脚本以便
    <a href="http://videojs.com/html5-video-support/" target="_blank">
      支持HTML5 video播放器
    </a>
    </p>
</video>
```

使用data-setup属性来设置video的一些额外的option选项，通常是JSON格式

应用了videojs必须的文件之后，我们在html把video加上去，下面代码的属性说明

- class=“video-js”：引用videojs的css
- poster：封面图地址
- data-setup：videojs其他参数
- src：视频的地址
- type：视频对应的格式，mp4对应video/mp4，webm对应webm，ogv对应video/ogg，hls对应xxx

> 播放按钮默认是在左上角，官方说这样可以不会遮挡内容的精彩部分，但是如果我们想要放到中间，增加一个 `vjs-big-play-centered` 样式就好了

如果你不想使用 auto-setup，你可以暂时不用设置 data-setup 属性，然后 js 中手动初始化一个视频元素。


## 方式2：手动 js 调用初始化播放器

首先`<video>`元素中去掉了auto-setup属性，其他不变。
```
<video
    id="my-player"
    class="video-js vjs-big-play-centered"
    controls
    preload="auto"
    poster="//vjs.zencdn.net/v/oceans.png">
    <source src="//media.html5media.info/video.mp4" type="video/mp4"></source>
    <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
    <source src="//media.html5media.info/video.ogv" type="video/ogg"></source>
    <p class="vjs-no-js">
    请开启Javascript脚本以便
    <a href="http://videojs.com/html5-video-support/" target="_blank">
      支持HTML5 video播放器
    </a>
    </p>
</video>
```

然后，使用 videojs() 方法加载Video
```
var player = videojs('my-player',{
    muted: true,
	controls : true/false,      
	height:300, 
	width:300,
	loop : true,
},function(){});
```

videojs()方法中，3个参数：
- 第一个参数是video标签的 ID
- 第二个参数是一个选项对象
- 第三个参数是一个'ready'回调。一旦 Video.js 初始化完成后，就会触发这个回调。

完整的js代码如下：
```
<script>
    var player = videojs('my-player');
    var options = {};

    var player = videojs('my-player', options, function onPlayerReady() {
      videojs.log('Your player is ready!');

      this.play(); // 开始播放

      // 监听播放结束状态
      this.on('ended', function() {
        videojs.log('Awww...over so soon?!');
      });
    });
    </script>
```



# 播放器更换皮肤

videojs可以替换皮肤的，当然也可以开发皮肤

[皮肤](https://docs.videojs.com/tutorial-skins.html)

通过覆盖css样式来实现换肤




# video.js 播放直播流

常见直播流传输协议：  *RTMP, HLS, FLV*

## 安装相关插件

```
npm install video.js 				# 安装video.js
npm install videojs-flash			# 如需播放 RTMP 流，需要安装 videojs-flash 插件
npm install videojs-contrib-hls		# 如需播放 HLS 流，需要安装 videojs-contrib-hls 插件，非原生支持的浏览器，直播服务端需要开启 CORS
```

如果两个流都需要播放，flash 插件需要安装到 hls 插件之前


我们需要引入videojs的css文件，例如在main.js中引入
```
import 'video.js/dist/video-js.css'
```


## HLS (m3u8)

HLS封装的视频播放，videojs7 默认包含hls插件，不需要引入其它插件。
videojs7 以下需要引入videojs-contrib-hls.js插件。

接着，我们在需要播放视频的页面引入js对象
```
import videojs from 'video.js'
import 'videojs-contrib-hls'
```

指定一个video容器，例如：
```
<video id="my-video" class="video-js vjs-default-skin" controls preload="auto" poster="../assets/video.png">
    <source src="http://127.0.0.1:7086/aaa/213/stream/1.m3u8" type="application/x-mpegURL">
</video>
```


最后，我们在mounted节点初始化播放器：
```
videojs('my-video', {
    bigPlayButton: false,
    textTrackDisplay: false,
    posterImage: true,
    errorDisplay: false,
    controlBar: true
}, function () {
    this.play()
})
```


完整代码
```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link href="https://unpkg.com/video.js/dist/video-js.min.css" rel="stylesheet">
        <script src="https://unpkg.com/video.js/dist/video.min.js"></script>
        <script src="https://unpkg.com/videojs-contrib-hls/dist/videojs-contrib-hls.js"></script>
    </head>
    <body>
        <video id="my-player" class="video-js" controls preload="auto" data-setup='{}'>
            <source src="hls的路劲.m3u8" type="application/x-mpegURL"></source>
        </video>
    </body>
</html>
```



# video.js 播放 RTMP, HLS


## 安装

```
npm install video.js 				# 安装video.js
npm install videojs-flash			# 如需播放 RTMP 流，需要安装 videojs-flash 插件
npm install videojs-contrib-hls		# 如需播放 HLS 流，需要安装 videojs-contrib-hls 插件，非原生支持的浏览器，直播服务端需要开启 CORS
```

如果两个流都需要播放，flash 插件需要安装到 hls 插件之前

```
<template>
    <div>
        <video id="example_video_1" class="video-js vjs-default-skin" controls preload="auto" width="1280" height="720" poster="http://vjs.zencdn.net/v/oceans.png" data-setup="{}">
            <source src="rtmp://live.hkstv.hk.lxdns.com/live/hks2" type="rtmp/flv">
        </video>
        <video id="example_video_2" class="video-js vjs-default-skin" controls preload="auto" width="1280" height="720" poster="http://vjs.zencdn.net/v/oceans.png" data-setup="{}">
        <source src="rtmp://video.zhiguaniot.com/test01/stream01?auth_key=1552979972-0-0-3502db2f66a4560c886f44c7f68e20d5" type="rtmp/flv">
        </video>
        <video id="example_video_3" class="video-js vjs-default-skin" controls preload="auto" width="1280" height="720" poster="http://vjs.zencdn.net/v/oceans.png" data-setup="{}">
        <source src="rtmp://live.hkstv.hk.lxdns.com/live/hks2" type="rtmp/flv">
        </video>
        <video id="example_video_4" class="video-js vjs-default-skin" controls preload="auto" width="1280" height="720" poster="http://vjs.zencdn.net/v/oceans.png" data-setup="{}">
        <source src="rtmp://live.hkstv.hk.lxdns.com/live/hks2" type="rtmp/flv">
        </video>
    </div>
</template>

<script>
    import Vue from "vue";
    import video from 'video.js';
    import 'videojs-flash'; 	// 引入videojs flash
    Vue.prototype.$video = video; 	// 将video.js 实例放在Vue原型上
	
	export default {
		name: 'video',
		data() {
			return {}
		},
		mounted() {
			this.playervideo('example_video_1');
			this.playervideo('example_video_2');
			this.playervideo('example_video_3');
			this.playervideo('example_video_4');
		},
		methods: {
			playervideo(id) {
				var player = this.$video(id, {}, function onPlayerReady() {
					this.play();
					this.on('ended', function() {
						console.log('Awww...over so soon?!');
					});
				});
			}
		}
	}
</script>

```



案例参考：
```
<!DOCTYPE html>
<html>
<head>
    <title>videojs支持hls直播实例</title>
    <link href="./video.css?v=bcd2ce1385" rel="stylesheet">
	<script src="./video.js?v=fc5104a2ab23"></script>
	<script src="./videojs-contrib-hls.js?v=c726b94b9923"></script>
</head>
<body>

    <video id="roomVideo" class="video-js vjs-default-skin vjs-big-play-centered" x-webkit-airplay="allow" poster="" webkit-playsinline playsinline x5-video-player-type="h5" x5-video-player-fullscreen="true" preload="auto">
        <source src="/chat/playlist.m3u8"  type="application/x-mpegURL">
    </video>

    <script type="text/javascript">
        var myPlayer = videojs('roomVideo',{
            bigPlayButton : false,
            textTrackDisplay : false,
            posterImage: true,
            errorDisplay : false,
            controlBar : false
        },function(){
            console.log(this)
            this.on('loadedmetadata',function(){
                console.log('loadedmetadata');
                //加载到元数据后开始播放视频
                startVideo();
            })

            this.on('ended',function(){
                console.log('ended')
            })
            this.on('firstplay',function(){
                console.log('firstplay')
            })
            this.on('loadstart',function(){
            //开始加载
                console.log('loadstart')
            })
            this.on('loadeddata',function(){
                console.log('loadeddata')
            })
            this.on('seeking',function(){
            //正在去拿视频流的路上
                console.log('seeking')
            })
            this.on('seeked',function(){
            //已经拿到视频流,可以播放
                console.log('seeked')
            })
            this.on('waiting',function(){
                console.log('waiting')
            })
            this.on('pause',function(){
                console.log('pause')
            })
            this.on('play',function(){
                console.log('play')
            })

        });

        var isVideoBreak;
        function startVideo() {

            myPlayer.play();

            //微信内全屏支持
            document.getElementById('roomVideo').style.width = window.screen.width + "px";
            document.getElementById('roomVideo').style.height = window.screen.height + "px";


            //判断开始播放视频，移除高斯模糊等待层
            var isVideoPlaying = setInterval(function(){
                var currentTime = myPlayer.currentTime();
                if(currentTime > 0){
                    $('.vjs-poster').remove();
                    clearInterval(isVideoPlaying);
                }
            },200)

            //判断视频是否卡住，卡主3s重新load视频
            var lastTime = -1,
                tryTimes = 0;
            
            clearInterval(isVideoBreak);
            isVideoBreak = setInterval(function(){
                var currentTime = myPlayer.currentTime();
                console.log('currentTime'+currentTime+'lastTime'+lastTime);

                if(currentTime == lastTime){
                    //此时视频已卡主3s
                    //设置当前播放时间为超时时间，此时videojs会在play()后把currentTime设置为0
                    myPlayer.currentTime(currentTime+10000);
                    myPlayer.play();

                    //尝试5次播放后，如仍未播放成功提示刷新
                    if(++tryTimes > 5){
                        alert('您的网速有点慢，刷新下试试');
                        tryTimes = 0;
                    }
                }else{
                    lastTime = currentTime;
                    tryTimes = 0;
                }
            },3000)

        }
    </script>

</body>
</html>
```



[video.js自定义皮肤](https://codepen.io/heff/pen/EarCt)

