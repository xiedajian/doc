

参考文档： https://www.86886.wang/detail/5b8e6081f03d630ba8725892


# vue 服务端渲染

大多数Vue项目要支持SSR应该是为了SEO考虑，毕竟对于WEB应用来说，搜索引擎是一个很大的流量入口。

Vue SSR现在已经比较成熟了，但是如果是把一个SPA应用改造成SSR应用，成本还是有些高的，这工作量无异于重构前端。

另外对前端的技术要求也是挺高的，需要对Vue比较熟悉，还要有Node.js 和 webpack 的应用经验。


所谓服务端渲染，指的是把vue组件在服务器端渲染为组装好的HTML字符串，然后将它们直接发送到浏览器，最后需要将这些静态标记"激活"为客户端上完全可交互的应用程序。


## 服务端渲染的优点

更好的SEO，搜索引擎爬虫可以抓取渲染好的页面

更快的内容到达时间（首屏加载更快），因为服务端只需要返回渲染好的HTML，这部分代码量很小的，所以用户体验更好

## 服务端渲染的缺点

首先就是开发成本比较高，比如某些声明周期钩子函数（如beforeCreate、created）能同时运行在服务端和客户端，因此第三方库要做特殊处理，才能在服务器渲染应用程序中运行。

由于服务端渲染要用Nodejs做中间层，所以部署项目时，需要处于Node.js server运行环境。在高流量环境下，还要做好服务器负载和缓存策略



# 方案

nuxt.js       # 基于 Vue.js 的服务端渲染应用框架

easywebpack   # 基于 Vue.js 的服务端渲染应用框架



# 原理解析

### 第一步：编写entry-client.js和entry-server.js

entry-client.js只在浏览器环境下执行，所以需要显示调用$mount方法，挂载DOM节点

```
import Vue from 'vue';
import App from './App.vue';
import createStore from './store/index.js';

function createApp() {
  const store = createStore();
  const app = new Vue({
      store,
      render: h => h(App)
  });
  return {app, store}
}

const { app, store } = createApp();

// 使用window.__INITIAL_STATE__中的数据替换整个state中的数据，这样服务端渲染结束后，客户端也可以自由操作state中的数据
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

app.$mount('#app');
```

entry-server.js需要导出一个函数，在服务端渲染期间会被调用
```
import Vue from 'vue';
import App from './App.vue';
import createStore from './store/index.js';

export default function(context) {
  // context是上下文对象
  const store = createStore();
  let app = new Vue({
    store,
    render: h => h(App)
  });

  // 找到所有 asyncData 方法
  let components = App.components;
  let asyncDataArr = []; // promise集合
  for (let key in components) {
    if (!components.hasOwnProperty(key)) continue;
    let component = components[key];
    if (component.asyncData) {
      asyncDataArr.push(component.asyncData({store})) // 把store传给asyncData
    }
  }
  // 所有请求并行执行
  return Promise.all(asyncDataArr).then(() => {
    // context.state 赋值成什么，window.__INITIAL_STATE__ 就是什么
    // 这下你应该明白entry-client.js中window.__INITIAL_STATE__是哪来的了，它是在服务端渲染期间被添加进上下文的
    context.state = store.state;
    return app;
  });
};
```

### 第二步：配置webpack

webpack配置比较简单，但是也需要针对client和server端单独配置

webpack.client.conf.js显然是用来打包客户端应用的

```
module.exports = merge(base, {
  entry: {
    client: path.join(__dirname, '../entry-client.js')
  }
});
```

webpack.server.conf.js用来打包服务端应用，这里需要指定node环境
```
module.exports = merge(base, {
  target: 'node', // 指定是node环境
  entry: {
    server: path.join(__dirname, '../entry-server.js')
  },
  output: {
    filename: '[name].js', // server.js
    libraryTarget: 'commonjs2' // 必须按照 commonjs规范打包才能被服务器调用。
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.ssr.html'),
      filename: 'index.ssr.html',
      files: {
        js: 'client.js'
      }, // client.js需要在html中引入
      excludeChunks: ['server'] // server.js只在服务端执行，所以不能打包到html中
    })
  ]
});
```

### 第三步：启动服务

打包完成后就可以启动服务了，在start.js中我们需要把server.js加载进来，然后通过renderToString方法把渲染好的html返回给浏览器

```
const bundle = fs.readFileSync(path.resolve(__dirname, 'dist/server.js'), 'utf-8');
const renderer = require('vue-server-renderer').createBundleRenderer(bundle, {
  template: fs.readFileSync(path.resolve(__dirname, 'dist/index.ssr.html'), 'utf-8') // 服务端渲染数据
});

server.get('*', (req, res) => {
  renderer.renderToString((err, html) => {
    // console.log(html)
    if (err) {
      console.error(err);
      res.status(500).end('服务器内部错误');
      return;
    }
    res.end(html);
  })
});
```















