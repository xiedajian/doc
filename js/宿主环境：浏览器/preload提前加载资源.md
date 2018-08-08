
参考文章：https://juejin.im/post/5a7fb09bf265da4e8e785c38

# preload

preload 提供了一种声明式的命令，让浏览器提前加载指定资源(加载后并不执行)，在需要执行的时候再执行。提供的好处主要是

将加载和执行分离开，可不阻塞渲染和 document 的 onload 事件
提前加载指定资源，不再出现依赖的font字体隔了一段时间才刷出

如何使用 preload
使用 link 标签创建
<!-- 使用 link 标签静态标记需要预加载的资源 -->
<link rel="preload" href="/path/to/style.css" as="style">

<!-- 或使用脚本动态创建一个 link 标签后插入到 head 头部 -->
<script>
const link = document.createElement('link');
link.rel = 'preload';
link.as = 'style';
link.href = '/path/to/style.css';
document.head.appendChild(link);
</script>

使用 HTTP 响应头的 Link 字段创建
Link: <https://example.com/other/styles.css>; rel=preload; as=style

如我们常用到的 antd 会依赖一个 CDN 上的 font.js 字体文件，我们可以设置为提前加载，以及有一些模块虽然是按需异步加载，但在某些场景下知道其必定会加载的，则可以设置 preload 进行预加载，如：
<link rel="preload" as="font"   href="https://at.alicdn.com/t/font_zck90zmlh7hf47vi.woff">
<link rel="preload" as="script" href="https://a.xxx.com/xxx/PcCommon.js">
<link rel="preload" as="script" href="https://a.xxx.com/xxx/TabsPc.js">

### 如何判断浏览器是否支持 preload

在不支持 preload 的浏览器环境中，会忽略对应的 link 标签，而若需要做特征检测的话，则：
const isPreloadSupported = () => {
  const link = document.createElement('link');
  const relList = link.relList;

  if (!relList || !relList.supports) {
    return false;
  }

  return relList.supports('preload');
};
