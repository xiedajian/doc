
文档： https://cn.vuejs.org/v2/api/?#keep-alive

# keep-alive

<keep-alive></keep-alive>这个组件

<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们

和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。


## 简单实例


通一个tab切换来测试  <keep-alive>

```

<template>
    <div class="test">
        <div class="testNav">
            <div :class="{'selected':tab === 1,'testTitle':true}" @click="toTab(1)">标题一</div>
            <div :class="{'selected':tab === 2,'testTitle':true}"  @click="toTab(2)">标题二</div>
        </div>
        <div class="container">
            <keep-alive>
                <Test1 v-if="tab === 1">
                </Test1>
                <Test2 v-else>
                </Test2>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import Test1 from './test1.vue';
    import Test2 from './test2.vue';
    export default {
        data() {
            return {
                tab: 1,
            };
        },
        components: {
            Test1,
            Test2,
        },
        methods: {
            toTab(index) {
                this.tab = index;
            },
        },
    }
</script>

<style lang="less">
.test {
    width: 100%;
    .testNav {
        height: 60px;
        line-height: 60px;
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        .testTitle {
            flex: 1;
            text-align: center;
        }
        .selected {
            color: red;
        }
    }
}
</style>

```

组件test1：

```
<template>
  <div class="test1">
      test1
      {{testInfo1}}
  </div>
</template>

<script>
    export default {
        data() {
            return {
                testInfo1: '',
            };
        },
        activated() {
            console.log('测试1被激活');
        },
        deactivated() {
            console.log('测试1被缓存');
        },
        created() {
            setTimeout(() => {
                this.testInfo1 = '这是测试一的数据';
            }, 2000);
        },
    }
</script>

```

组件test2：

```
<template>
  <div>
      test2
      {{testInfo2}}
  </div>
</template>

<script>
    export default {
        data() {
            return {
                testInfo2: '',
            }
        },  
        activated() {
            console.log('测试2被激活');
        },
        deactivated() {
            console.log('测试2被缓存');
        },
        created() {
            setTimeout(() => {
                this.testInfo2 = '这是测试二的数据';
            }, 2000);
        },
    }
</script>

```