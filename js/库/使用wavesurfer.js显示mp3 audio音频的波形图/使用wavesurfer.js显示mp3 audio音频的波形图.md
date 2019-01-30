
[github](https://github.com/katspaugh/wavesurfer.js)

[npm](https://www.npmjs.com/package/wavesurfer.js)

[官网地址](http://wavesurfer-js.org/)



# wavesurfer.js

使用Web Audio和Canvas进行交互式导航音频可视化

wavesurfer.js仅适用于支持Web Audio的现代浏览器。



# 案例：

```
<script src="https://unpkg.com/wavesurfer.js"></script>

<div id="waveform"></div>

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
});

wavesurfer.load('audio.wav');

```