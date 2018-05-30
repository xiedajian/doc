
### .wpy文件说明
一个.wpy文件可分为三大部分，各自对应于一个标签：

- 脚本部分，即<script></script>标签中的内容，又可分为两个部分：
	- 逻辑部分，除了config对象之外的部分，对应于原生的.js文件；
	- 配置部分，即config对象，对应于原生的.json文件。
- 结构部分，即<template></template>模板部分，对应于原生的.wxml文件。
- 样式部分，即<style></style>样式部分，对应于原生的.wxss文件。


其中，小程序入口文件app.wpy不需要template，所以编译时会被忽略。.wpy文件中的script、template、style这三个标签都支持lang和src属性，lang决定了其代码编译过程，src决定是否外联代码，存在src属性且有效时，会忽略内联代码。
```
<style lang="less" src="page1.less"></style>
<template lang="wxml" src="page1.wxml"></template>
<script>
    // some code
</script>
```


##### 小程序入口app.wpy
```
<script>
import wepy from 'wepy';
export default class extends wepy.app {
    config = {
        "pages":[
            "pages/index/index"
        ],
        "window":{
            "backgroundTextStyle": "light",
            "navigationBarBackgroundColor": "#fff",
            "navigationBarTitleText": "WeChat",
            "navigationBarTextStyle": "black"
        }
    };
    onLaunch() {
        console.log(this);
    }
}
</script>

<style lang="less">
/** less **/
</style>
```
入口文件app.wpy中所声明的小程序实例继承自wepy.app类，
包含一个config属性和其它全局属性、方法、事件。
其中config属性对应原生的app.json文件，build编译时会根据config属性自动生成app.json文件，
如果需要修改config中的内容，请使用微信提供的相关API。


##### 页面page.wpy
```
<script>
import wepy from 'wepy';
import Counter from '../components/counter';

export default class Page extends wepy.page {
    config = {};
    components = {counter1: Counter};

    data = {};
    methods = {};

    events = {};
    onLoad() {};
    // Other properties
}
</script>

<template lang="wxml">
    <view>
    </view>
    <counter1></counter1>
</template>

<style lang="less">
/** less **/
</style>
```
页面文件page.wpy中所声明的页面实例继承自wepy.page类，该类的主要属性介绍如下
```
属性:	说明
config:	页面配置对象，对应于原生的page.json文件，类似于app.wpy中的config
components:	页面组件列表对象，声明页面所引入的组件列表
data:	页面渲染数据对象，存放可用于页面模板绑定的渲染数据
methods:	wxml事件处理函数对象，存放响应wxml中所捕获到的事件的函数，如bindtap、bindchange
events:	WePY组件事件处理函数对象，存放响应组件之间通过$broadcast、$emit、$invoke所传递的事件的函数
其它:	小程序页面生命周期函数，如onLoad、onReady等，以及其它自定义的方法与属性
```


##### 组件com.wpy
```
<template lang="wxml">
    <view>  </view>
</template>

<script>
import wepy from 'wepy';
export default class Com extends wepy.component {
    components = {};

    data = {};
    methods = {};

    events = {};
    // Other properties
}
</script>

<style lang="less">
/** less **/
</style>
```
组件文件com.wpy中所声明的组件实例继承自wepy.component类，除了不需要config配置以及页面特有的一些生命周期函数之外，其属性与页面属性大致相同。


#### 实例
通过前文的介绍可知，在 WePY 中，小程序被分为三个实例：小程序实例App、页面实例Page、组件实例Component。其中Page实例继承自Component。各自的声明方式如下：
```
import wepy from 'wepy';

// 声明一个App小程序实例
export default class MyAPP extends wepy.app {
}

// 声明一个Page页面实例
export default class IndexPage extends wepy.page {
}

// 声明一个Component组件实例
export default class MyComponent extends wepy.component {
}
```

#### App小程序实例
App小程序实例中主要包含小程序生命周期函数、config配置对象、globalData全局数据对象，以及其他自定义方法与属性。
```
import wepy from 'wepy';

export default class MyAPP extends wepy.app {
    customData = {};

    customFunction ()　{ }

    onLaunch () {}

    onShow () {}

    config = {}  // 对应 app.json 文件

    globalData = {}
}
```
在Page页面实例中，可以通过this.$parent来访问App实例。


#### Page页面实例和Component组件实例
由于Page页面实际上继承自Component组件，即Page也是组件。除扩展了页面所特有的config配置以及特有的页面生命周期函数之外，其它属性和方法与Component一致，因此这里以Page页面为例进行介绍
```
import wepy from 'wepy';

// export default class MyPage extends wepy.page {
export default class MyComponent extends wepy.component {
    customData = {}  // 自定义数据

    customFunction ()　{}  //自定义方法

    onLoad () {}  // 在Page和Component共用的生命周期函数

    onShow () {}  // 只在Page中存在的页面生命周期函数

    config = {};  // 只在Page实例中存在的配置数据，对应于原生的page.json文件

    data = {};  // 页面所需数据均需在这里声明，可用于模板数据绑定

    components = {};  // 声明页面中所引用的组件，或声明组件中所引用的子组件

    mixins = [];  // 声明页面所引用的Mixin实例

    computed = {};  // 声明计算属性（详见后文介绍）

    watch = {};  // 声明数据watcher（详见后文介绍）

    methods = {};  // 声明页面wxml中标签的事件处理函数。注意，此处只用于声明页面wxml中标签的bind、catch事件，自定义方法需以自定义方法的方式声明

    events = {};  // 声明组件之间的事件处理函数
}
```

注意，对于WePY中的methods属性，因为与Vue中的使用习惯不一致，非常容易造成误解，这里需要特别强调一下：WePY中的methods属性只能声明页面wxml标签的bind、catch事件，不能声明自定义方法，这与Vue中的用法是不一致的。示例如下：

```
// 错误示例

import wepy from 'wepy';

export default class MyComponent extends wepy.component {
    methods = {
        bindtap () {
            let rst = this.commonFunc();
            // doSomething
        },

        bindinput () {
            let rst = this.commonFunc();
            // doSomething
        },

        //错误：普通自定义方法不能放在methods对象中
        customFunction () {
            return 'sth.';
        }
    };

}


// 正确示例

import wepy from 'wepy';

export default class MyComponent extends wepy.component {
    methods = {
        bindtap () {
            let rst = this.commonFunc();
            // doSomething
        },

        bindinput () {
            let rst = this.commonFunc();
            // doSomething
        },
    }

    //正确：普通自定义方法在methods对象外声明，与methods平级
    customFunction () {
        return 'sth.';
    }

}
```


### 普通组件引用
当页面需要引入组件或组件需要引入子组件时，必须在.wpy文件的<script>脚本部分先import组件文件，然后在components对象中给组件声明唯一的组件ID，接着在<template>模板部分中添加以components对象中所声明的组件ID进行命名的自定义标签以插入组件。如
```
/**
project
└── src
    ├── components
    |   └── child.wpy
    ├── pages
    |   ├── index.wpy    index 页面配置、结构、样式、逻辑
    |   └── log.wpy      log 页面配置、结构、样式、逻辑
    └──app.wpy           小程序配置项（全局公共配置、公共样式、声明钩子等）
**/

// index.wpy

<template>
    <!-- 以`<script>`脚本部分中所声明的组件ID为名命名自定义标签，从而在`<template>`模板部分中插入组件 -->
    <child></child>
</template>

<script>
    import wepy from 'wepy';
    //引入组件文件
    import Child from '../components/child';

    export default class Index extends wepy.component {
        //声明组件，分配组件id为child
        components = {
            child: Child
        };
    }
</script>
```
需要注意的是，WePY中的组件都是静态组件，是以组件ID作为唯一标识的，每一个ID都对应一个组件实例，当页面引入两个相同ID的组件时，这两个组件共用同一个实例与数据，当其中一个组件数据变化时，另外一个也会一起变化。

如果需要避免这个问题，则需要分配多个组件ID和实例。代码如下：
```
<template>
    <view class="child1">
        <child></child>
    </view>

    <view class="child2">
        <anotherchild></anotherchild>
    </view>
</template>


<script>
    import wepy from 'wepy';
    import Child from '../components/child';

    export default class Index extends wepy.component {
        components = {
            //为两个相同组件的不同实例分配不同的组件ID，从而避免数据同步变化的问题
            child: Child,
            anotherchild: Child
        };
    }
</script>
```
注意：WePY中，在父组件template模板部分插入驼峰式命名的子组件标签时，不能将驼峰式命名转换成短横杆式命名(比如将childCom转换成child-com)，这与Vue中的习惯是不一致。


#### 组件的循环渲染
当需要循环渲染WePY组件时(类似于通过wx:for循环渲染原生的wxml标签)，必须使用WePY定义的辅助标签<repeat>，代码如下：
```
/**
project
└── src
    ├── components
    |   └── child.wpy
    ├── pages
    |   ├── index.wpy    index 页面配置、结构、样式、逻辑
    |   └── log.wpy      log 页面配置、结构、样式、逻辑
    └──app.wpy           小程序配置项（全局样式配置、声明钩子等）
**/

// index.wpy

<template>
    <!-- 注意，使用for属性，而不是使用wx:for属性 -->
    <repeat for="{{list}}" key="index" index="index" item="item">
        <!-- 插入<script>脚本部分所声明的child组件，同时传入item -->
        <child :item="item"></child>
    </repeat>
</template>

<script>
    import wepy from 'wepy';
    // 引入child组件文件
    import Child from '../components/child';

    export default class Index extends wepy.component {
        components = {
            // 声明页面中要使用到的Child组件的ID为child
            child: Child
        }

        data = {
            list: [{id: 1, title: 'title1'}, {id: 2, title: 'title2'}]
        }
    }
</script>

```
页面可以引入组件，而组件还可以引入子组件。一个页面引入若干组件后，组件结构如下图：











