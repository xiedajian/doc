

路由取值和跳转

```
<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
// 获取路由信息
console.log(route.query.id);
// 编程式路由跳转
const jump = ()=> {
  router.push({ path: `/about` , query:{id:'xxx}});
};
</script>


```