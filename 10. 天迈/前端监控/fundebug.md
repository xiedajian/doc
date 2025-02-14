[fundebug](https://www.fundebug.com/)
[vue接入](https://www.fundebug.com/project/integrate)
[视频录屏重现](https://blog.fundebug.com/2018/05/21/fundebug_release_black_tech_replay/)


# fundebug

```
npm install fundebug-javascript fundebug-vue
```

在main.js中引入fundebug-javascript与fundebug-vue
```
import * as fundebug from "fundebug-javascript";
import FundebugVue from "fundebug-vue";
fundebug.apikey = "526492e6ceb4df42ca187e81ae32df356c077ed68b6faaec90779e6d6ca8495e"
new FundebugVue(fundebug).installVueErrorHandler(Vue); // Vue 2.x 
createApp(App).use(new FundebugVue(fundebug)).x.x.mount("#app"); // Vue 3.x
```

接入录屏
如果您需要使用录屏功能，请继续接入revideo插件！
```
npm install fundebug-revideo
```

在js文件中导入
```
require('fundebug-revideo');
```

选择脚本引入
```
<script src="https://js.fundebug.cn/fundebug.revideo.0.7.1.min.js"></script>
```