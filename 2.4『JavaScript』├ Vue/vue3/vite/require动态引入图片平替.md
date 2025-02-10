

# webpack (vue-cli) 使用 require 动态c引入图片

```
<CarouselItem v-for="(item,index) of carouselData" :key="index">
    <img :src="require(`../../lib/Carousel/assets/${item.img_name}`)" />
</CarouselItem>
```


在 vite 中会报错 require is not defined

原因是以为 require 会通过 wabpack 编译兼容，但是vite不会编译


# Vite 静态资源处理的方法 new URL(url, import.meta.url)

> [Vite 静态资源处理](https://vitejs.cn/guide/assets.html)


import.meta.url 是一个 ESM 的原生功能，会暴露当前模块的 URL。
将它与原生的 URL 构造器 组合使用，在一个 JavaScript 模块中，通过相对路径我们就能得到一个被完整解析的静态资源 URL：
```
const imgUrl = new URL('./img.png', import.meta.url).href

document.getElementById('hero-img').src = imgUrl
```

这在现代浏览器中能够原生使用 - 实际上，Vite 并不需要在开发阶段处理这些代码！

这个模式同样还可以通过字符串模板支持动态 URL：
```
function getImageUrl(name) {
  return new URL(`./dir/${name}.png`, import.meta.url).href
}
```
在生产构建时，Vite 才会进行必要的转换保证 URL 在打包和资源哈希后仍指向正确的地址。
