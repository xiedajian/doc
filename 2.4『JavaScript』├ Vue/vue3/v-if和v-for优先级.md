
# v-if和v-for优先级

当v-if和v-for同时作用于一个元素上时:
Vue2.x中v-for的优先级会高于v-if；
Vue3.x中v-if的优先级会高于v-for；
使用禁忌：Vue3.x中不能将v-for和v-if放在同一个元素上。只能使用v-for嵌套v-if使用
使用建议：官方建议使用计算属性来处理，即提高性能，又能兼容Vue3.x。
