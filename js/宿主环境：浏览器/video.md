

# h5 播放视频


## 实时记录进度

```
audio.ontimeupdate = function () {
            
            if(window.localStorage) {
                var courseId = $('#courseId').val();

                playBackCache[courseId] = audio.currentTime;
                localStorage.setItem('playBackCache' , JSON.stringify(playBackCache));
            }
        };
        
```