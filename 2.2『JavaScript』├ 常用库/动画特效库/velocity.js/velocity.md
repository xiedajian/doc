[github](https://github.com/julianshapiro/velocity)
官网： http://velocityjs.org/

# velocity

Velocity 是一个简单易用、高性能、功能丰富的轻量级JS动画库。

它能和 jQuery 完美协作，并和$.animate()有相同的 API， 但它不依赖 jQuery，可单独使用。 

Velocity 不仅包含了 $.animate() 的全部功能， 还拥有：颜色动画、转换动画(transforms)、循环、 缓动、SVG 动画、和 滚动动画 等特色功能。

它比 $.animate() 更快更流畅，性能甚至高于 CSS3 animation， 是 jQuery 和 CSS3 transition 的最佳组合，

它支持所有现代浏览器，最低可兼容到 IE8 和 Android 2.3。

cdn:  
```
<script src="https://cdn.bootcss.com/velocity/2.0.4/velocity.min.js"></script>
```

npm
```
npm install velocity-animate@beta
```

## 使用

// 和 jq.animate 一样的API
$(selector).animate(styles,speed,easing,callback)

$(selector).velocity(styles,speed,easing,callback)
