
[Web 播放 H.265视频](https://www.jackpu.com/web-bo-fang-h265/)
[通过WebAssembly在移动端解码H.265](https://cloud.tencent.com/developer/article/1453425)
[硬件编码相关知识(H264,H265)](https://juejin.im/post/5a8fe8876fb9a0635a65799b)



# H.265

H.265,又称HEVC(全称High Efficiency Video Coding，高效率视频编码)，是ITU-T H.264/MPEG-4 AVC标准的继任者。
相比H.264，H.265拥有更高的压缩率，也就意味着同样码率（又称比特率是指每秒传送的比特(bit)数。
单位为bps(Bit Per Second)，比特率越高，每秒传送数据就越多，画质就越清晰），
H.265的画质会更清晰，更高的压缩率就能使用更低的存储和传输成本。，相对于大家熟知的 H.264 ，平均可以带来接近于 50% 的宽度节省。

这对于我们做视频的开发者而言，无疑我们可以在同等流量下拿到更多的 Buffer,无论是直播还是视频播放都是非常有收益的事情。

兼容性奇差，当前主流浏览器均不支持H.265原生视频播放，不能再生成环境直接使用



## 播放 H265

前面介绍了 H265 所带来的优点，当然我们今天主要还是介绍如何播放 H265;

我们可以使用软解来播放 H265，当然这会增加 JS bundle 和 内存消耗，但是也是一个 Hack Way。

[libde265.js](https://www.libde265.org/blog/2014/04/10/libde265-js-javascript-hevch-265-bitstream-decoder/#)

libde265.js 是一个通过 JS 来解码 H.265 视频的库，它通过将 视频的 frame data 转化为 rgba 像素，然后绘制到 Canvas 上。

我们看下怎么使用;

```
<canvas id="canvas"></canvas>

<script src="./libde265.min.j"></script>  
<script>  
var VIDEO_URL = 'h265-test-640.mp4'  
var video = document.getElementById('canvas')  
 // var fpsWrap = document.querySelector('.hevc-fps')
  var status = document.querySelector('.hevc-status')
  var playback = function (event) {
    // event.preventDefault()
    if (player) {
      player.stop()
    }

    player = new libde265.RawPlayer(video)
    player.set_status_callback(function (msg, fps) {
      player.disable_filters(true)
      console.log(msg);
      switch (msg) {
        case 'loading':
          status.innerHTML = 'Loading movie...'
          break
        case 'initializing':
          status.innerHTML = 'Initializing...'
          break
        case 'playing':
          status.innerHTML = 'Playing...'
          break
        case 'stopped':
          status.innerHTML = 'stopped'
          break
        case 'fps':
          // fpsWrap.innerHTML = Number(fps).toFixed(2) + ' fps'
          break
        default:
          status.innerHTML = msg
      }
    })
    player.playback(VIDEO_URL)
  }
  playback()
</script>  
```


*当然这个只是黑科技，你会发现这个视频，音轨没有解析*



[华为云播放器h265解码器](https://support.huaweicloud.com/playersdk-live/zh-cn_topic_0181656066.html)