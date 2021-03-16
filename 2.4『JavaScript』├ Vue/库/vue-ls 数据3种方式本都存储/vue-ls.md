[github](https://github.com/RobinCK/vue-ls)
[npm](https://www.npmjs.com/package/vue-ls)



# Vue的Vue-ls使用

Vue插件，用于从Vue上下文中使用本地Storage，会话Storage和内存Storage

一个vue封装的本地储存的方法。



# 安装

```
npm install vue-ls --save
```

# 使用

```
import Storage from 'vue-ls';
 
options = {
  namespace: 'vuejs__', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'local', // 存储名称: session, local, memory
};
 
Vue.use(Storage, options);
// 或 Vue.use(Storage);
 
new Vue({
    el: '#app',
    mounted: function() {
        Vue.ls.set('foo', 'boo');
        // 设置有效期
        Vue.ls.set('foo', 'boo', 60 * 60 * 1000); //有效1小时
        Vue.ls.get('foo');
        Vue.ls.get('boo', 10); // 如果没有设置boo返回默认值10 
        
        let callback = (val, oldVal, uri) => {
          console.log('localStorage change', val);
        } 
        
        Vue.ls.on('foo', callback) //侦查改变foo键并触发回调 
        Vue.ls.off('foo', callback) //不侦查
        
        Vue.ls.remove('foo'); // 移除
    }
});
```

# 全局使用
```
Vue.ls
```
# vue 上下文使用

```
this.$ls
```

# API说明

### 存储
```
Vue.ls.set(name, value, expire = null)
```
- name：唯一标识键名，在实际存储中会被拼接前缀 options.namespace 命名空间隔离
- value：要存储的值，可以为任何类型，因为会被序列化
- expire - seconds ：过期时间，单位是秒，可以不填默认为null，表示不过期

### 获取
```
Vue.ls.get(name, def = null)
```
- name：唯一标识键名
- def（ default value ）：默认值，没有查到结果时或者过期时会返回默认值null

### 删除 成功移除 true, 否则返回false.
```
Vue.ls.remove(name)
```

### 清空
```
Vue.ls.clear()
```

### 监听变化
```
Vue.ls.on(name, callback=>(newValue, oldValue, url){})
```
- callback： 回调函数，参数为：newValue, oldValue, url（页面的URL）

### 删除侦听器
```
Vue.ls.off(name, callback)
```








