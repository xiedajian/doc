1. BEM简介
  BEM(Block Element Modifier)是由Yandex(俄罗斯的网络服务门户之一)团队提出的一种前端命名规范，
这里讲的BEM风格是经过改良的（没有具体阅读过相关文章，不探讨有关如何改良的细节）：


Block：块
Element：元素——块的组成部分
Modifier：修饰符——表示一种形态/状态

```
.block {}
.block__element {}
.block--modifier
```


举一个很好理解的例子：
```
人            #Block
人__手          #Element
人__手--小手      #Modifier
人__手--大手      #Modifier
人__脚          #Element

人--男人        #Modifier
人--男人__手      #Element
人--男人__脚      #Element

人--女人        #Modifier
人--女人__手      #Element
人--女人__脚      #Element

```


## 2. BEM命名 vs 传统命名
  好与不好，代码为证：
 
 2.1 BEM命名
 ```
 <!-- app.vue -->
<aside class="aside">
  <!-- 显示/隐藏侧边栏 -->
  <img :class="['aside__toggle--show', {'aside__img--hide': isHide}]" />
  <ul class="aside__menu">
    <li class="aside__menu__item">首页</li>
  </ul>
</aside>
 ```