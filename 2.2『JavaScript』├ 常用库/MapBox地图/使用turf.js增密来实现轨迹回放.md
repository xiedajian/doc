[原文](https://juejin.im/post/5cfc98e351882515ba0eefe1)



# Mapbox轨迹回放

 轨迹回放是webgis中的常见功能，是一种被客户喜闻乐见的GIS动画。
    动画是一种短时间内不停重绘达到不断运动的效果。本文中轨迹回放就是事先计算好所需要的点，后面再进行播放。
    整体的思路也不复杂，设定总共有一千个点插入，计算出来每个点间隔的步长，我们只要往大于步长的每条线段中插入需要点就好，小于等于步长的线段则取用它的尾部节点。
只有两点的线段进行增密就很简单了，求出线段长度除以步长的倍数，用倍数进行循环，使用turf.along计算出每次要插入的点，当线段不能整除步长时，需要将线段的最后一点插入增密线段中。


```
var step = parseInt(distance/splitLength)
var leftLength= distance -step*splitLength
var rings=[]
var route = turf.lineString([from.geometry.coordinates,to.geometry.coordinates])
for(let i=1;i<=step;i++){
    let nlength=i*splitLength
    let pnt = turf.along(route, nlength, { units: 'kilometers' });
    rings.push(pnt.geometry.coordinates)
    }
if(leftLength>0){
    rings.push(to.geometry.coordinates)
}

```

案例：查看 案例-轨迹回放