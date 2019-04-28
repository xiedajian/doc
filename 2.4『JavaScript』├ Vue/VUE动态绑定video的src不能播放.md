

# VUE动态绑定video的src不能播放


给video绑定个ref值
```
<video ref='video' controls>
 
您的浏览器不支持 video元素。
 
</video>
```


在需要动态绑定的方法里用$refs动态设置src
```
this.$refs.video.src = res.data.video_url
```