
# js中的图片路径会出错
```
<template>
	<div>
		<div v-for="let p in peoples">
			<img :src="p.img" />
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				peoples:[
					{name:'name1',img:'/imgs/image1.png'},
					{name:'name2',img:'/imgs/image2.png'},
					]
			}
		}
	}
</script>
```

原因:js中的路径webpack未解析
解决方法：js中图片路径的使用require引入的方式。
```
<template>
	<div>
		<div v-for="let p in peoples">
			<img :src="p.img" />
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				peoples:[
					{name:'name1',img:require('/imgs/image1.png')},
					{name:'name2',img:require('/imgs/image2.png')},
					]
			}
		}
	}
</script>
```