


## vxe-form

```
<vxe-form
      ref="form"
      :data="formData"
      :items="formItems"
      @submit="onSubmit"
    >
    </vxe-form>
<script>
export default {
	 data() {
		 formData: {
		    fast: []
		},
		formItems: [
			{
			  field: "fast",
			  title: "快车业务",
			  span: 12,
			  itemRender: {
				name: "$checkbox",
				options: [
				  { label: "定点", value: "fixedStatus" },
				  { label: "包车", value: "charterStatus" },
				  { label: "拼车", value: "carpoolStatus" }
				]
			  }
			}
		],	  
	 }
}	 
</script>
```
上面是一个简单的表单，用到了 vxe-form 自带的表单项 $checkbox （内置的通常都是$k开头）


## 使用 element-ui 表单项

以 element-ui 级联选择器 el-cascader 为例, 在上面的案例 formItems 中增加一项，渲染器设置为 "ElCascader"

```
formItems: [
	{
	  field: "fast",
	  title: "快车业务",
	  span: 12,
	  itemRender: {
		name: "$checkbox",
		options: [
		  { label: "定点", value: "fixedStatus" },
		  { label: "包车", value: "charterStatus" },
		  { label: "拼车", value: "carpoolStatus" }
		]
	  }
	},
	{
	  field: "cityCode",
	  title: "城市名称",
	  span: 12,
	  itemRender: {
		name: "ElCascader",
		props: {
		  placeholder: "请选择",
		  clearable: true,
		  filterable: true,
		  showAllLevels: true,
		  options: [],
		  props: {
			multiple: false,
			emitPath: false,
			checkStrictly: true,
			filterable: true,
			value: "areaCode",
			label: "areaName"
		  }
		},
		events: {
		  change: (a, b) => {
			console.log(a, b);
		  }
		}
	  },
	  visible: type === "add"
	},
],	  
```
上面的例子中 itemRender 为 ElCascader， props 为 el-cascader 文档中的属性。 监听的方法变为了写在 events 中
