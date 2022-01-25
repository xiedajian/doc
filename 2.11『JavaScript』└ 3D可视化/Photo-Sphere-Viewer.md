
[文档](https://photo-sphere-viewer.js.org/)
[github](https://github.com/mistic100/Photo-Sphere-Viewer)
[参考](https://www.jianshu.com/p/78208c73a896)


# photo-sphere-viewer

photo-sphere-viewer 是一个用于显示照片球面全景图的JavaScript库，是一个基于three.js的全景插件

特点
1、能添加锚点
2、可以调用陀螺仪
3、可以加载单张和六张的全景图
4、功能丰富，使用简单

> 调用陀螺仪需要 引用 DeviceOrientationControls.js 这是three.js的 一个js插件

```
npm i photo-sphere-viewer
```


使用：
```
<template>
  <div id="viewer"></div>
</template>
<script>
    import {Viewer} from 'photo-sphere-viewer'
    import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
    export default {
        data(){
            return{
                viewer:'',
                imgurl1:require('../assets/1.webp'),
            }
        },
        mounted(){
            this.viewer = new Viewer({
                container:document.querySelector('#viewer'),
                panorama:this.imgurl1,
                size:{
                    width: '100vw',
                    height: '50vh',
                },
            });
        }
    }
</script>
```