


作为技术主管，你会不会一直在考虑要不要上vue3？疑虑无非以下几点

1.老项目都是vue2写的，上了vue3，怎么跟vue2的代码进行融合？
2.老项目vue2太大了，不想全部翻成3，但是ts真香，特别适合团队开发，怎么搞？
3.新开工程用的vue3新技术研发出来的，老板一看不错！给其中原来老项目也加上这个模块，继续卖！咱要不要把代码降级？

赶紧上vue3，使用vue-demi，打穿vue2-vue3的壁垒，这么操作直接解决上面所讲的三个问题。


# vue-demi

Vue Demi是一个让你可以开发同时支持Vue2和3的通用的Vue库的开发工具，而无需担心用户安装的版本。

当用户要创建一个Vue插件/库时，只需将vue-demi安装为依赖项并将其导入，然后像之前一样发布你的插件/库，用户的软件包就会变得通用。

Vue Demi使用了NPM钩子postinstall。当用户安装所有包后，脚本将开始检查已安装的Vue版本，并根据Vue版本返回对应的代码。在使用Vue 2时，如果没有安装@vue/composition-api，它也会自动安装.

Vue Demi，取自法语“半”，旨在成为一种开发辅助工具，帮助你在不同Vue版本间实现无缝过渡。它通过自动安装所需插件，并根据用户环境导出适当的Vue和Composition API，让你的代码库无需顾虑版本差异。

Vue Demi采用了多种策略来适应不同Vue版本：

对于Vue 2.6及以下，它导出vue和@vue/composition-api。
在Vue 2.7中，由于Composition API已内建，它只导出vue。
对于Vue 3及以上版本，它同样导出vue，并提供了Vue 2的set和del API的polyfill。
此外，项目还提供了一些额外API，如isVue2和isVue3，以区分运行时环境，以及Vue2对象，用于访问Vue 2的全局API。
