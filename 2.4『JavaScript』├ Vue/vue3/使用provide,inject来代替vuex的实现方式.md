[原文](https://www.jianshu.com/p/bae3b6ff6194)

# Vue3.x使用provide/inject来代替vuex的实现方式

本章我们将介绍的是如何在vue3.x中使用provide/inject来代替vuex；
1、前言：在使用vuex的时候，第一，往往会将一些简单的逻辑复杂化。第二，vuex本身就存在学习成本，包括使用方式，语法，以及整个状态管理的流程。所以在选择的时候会有所顾虑。
2、概述：在vue3中，我们将使用vue自带的provide和inject来实现全局状态管理，理由是：整个状态管理的主体代码结构和一般组件中的代码结构完全一致；不需要再单独去学习，会用provide和inject即可。
3、思路：首先我们将在src下创建一个store的模块，来管理全局的状态、api调用、表单模板配置；然后将全局的状态进行合并并导出；再在App.vue下使用provide来全局注入；最后在各个组件中使用inject来调用对应的状态即可。
4、实现步骤一：目录结构

```
src
--store
----modules
------user // 例如为用户的状态管理
--------api 
----------index.js // 用户的api接口配置
--------index.js // 用户的状态管理配置
--------model.js // 用户的表单模块配置
----index.js // 合并所有状态
```

5、实现步骤二：具体代码
```
// src/store/index.js
import _ from 'lodash';

const contexts = require.context('./modules', true);
let modules = {};
contexts.keys().forEach(key => {
  if (_.includes(key, 'index.js') && !_.includes(key, 'api')) {
    const module = contexts(key).default;
    Object.assign(modules, module);
  }
});
export default modules;

```

```
// src/store/modules/api/index.js
// 主要是存放对应模块的api接口配置
```

```
// src/store/modules/user/index.js
import { ref } from 'vue';
import api from './api';

const namespace = 'user';
const r = ac => `store/${namespace}/${ac}`;

export const GETTER_USER = r('GETTER_USER');
export const GET_USER = r('GET_USER');
export const CHANGE_USER = r('CHANGE_USER');

const storeModel = api => {
  const user = ref({});

  const getUser = () => {
    setTimeout(() => {
      user.value = {
        name: 'zhang_san',
        age: 18,
        address: '成都市',
        phone: '18888888888'
      };
    }, 1000);
  };

  const changeUser = name => {
    user.value.name = name;
  };

  return {
    [GETTER_USER]: user,
    [GET_USER]: getUser,
    [CHANGE_USER]: changeUser
  };
};

export default storeModel(api);

```

6、实现步骤三：App.vue
```
import store from '@/store';
import _ from 'lodash';

// ...
setup() {
    _.each(store, (item, index) => {
      provide(index, item);
    });
}
// ...
```

7、实现步骤四：组件中使用（这里只是写在一个组件中，实际效果无差别）


```
<template>
  <div class="first-children-comp">
    <p @click="getUser">获取用户信息</p>
    <p @click="changeUser">修改用户信息</p>
    <span>用户信息：{{user.name}}</span>
  </div>
</template>

import { GETTER_USER, GET_USER, CHANGE_USER } from 'store/modules/user';

// ...
setup(props, context) {
    const user = inject(GETTER_USER);
    const storeGetUSer = inject(GET_USER);
    const storeChangeUser = inject(CHANGE_USER);
    // 获取用户
    const getUser = () => {
      storeGetUSer();
    };
    // 修改用户
    const changeUser = () => {
      storeChangeUser('zhao_liu');
    };
    return { getUser, changeUser };
}
// ...
```