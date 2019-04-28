[文档](http://www.runoob.com/jsref/dom-obj-video.html)

# Video 对象

Video 对象是 HTML5 中的新对象。

Video 对象表示 HTML <video> 元素。


# 访问 Video 对象
您可以通过使用 getElementById() 来访问 <video> 元素：

```
var x = document.getElementById("myVideo");
```

# 创建 Video 对象
您可以通过使用 document.createElement() 方法来创建 <video> 元素：

```
var x = document.createElement("VIDEO");
```





# h5 播放视频


## 实时记录播放进度

```
audio.ontimeupdate = function () {
            
            if(window.localStorage) {
                var courseId = $('#courseId').val();

                playBackCache[courseId] = audio.currentTime;
                localStorage.setItem('playBackCache' , JSON.stringify(playBackCache));
            }
        };
        
```