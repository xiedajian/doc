

文档： http://www.wangeditor.com/
参考： https://www.jianshu.com/p/e72e1e0612cd


# wangEditor

基于javascript和css开发的 Web富文本编辑器， 轻量、简洁、易用、开源免费

安装方式
```
点击 https://github.com/wangfupeng1988/wangEditor/releases 下载最新版
使用git下载： git clone https://github.com/wangfupeng1988/wangEditor.git
使用npm安装: npm install wangeditor （注意 wangeditor 全部是小写字母）
使用bower下载：bower install wangEditor （前提保证电脑已安装了bower）
```


# Vue中使用

安装 wangEditor
```
npm install wangeditor --save
```

封装成子组件中

```
子组件中
<template>
    <div id="wangeditor">
        <div ref="editorElem" style="text-align:left"></div>
    </div>  
</template>

<script>
  import E from 'wangeditor'
 export default {
      name: 'editorElem',
      data () {
        return {
          editorContent: '',
        }
      },
      props:['catchData'],    //接收父组件的方法
      mounted() {
          var editor = new E(this.$refs.editorElem)        //创建富文本实例
          editor.customConfig.onchange = (html) => {
              this.editorContent = html
              this.catchData(html)  //把这个html通过catchData的方法传入父组件
          }
          editor.customConfig.uploadImgServer = '你的上传图片的接口'
          editor.customConfig.uploadFileName = '你自定义的文件名'
          editor.customConfig.uploadImgHeaders = {
              'Accept': '*/*',
              'Authorization':'Bearer ' + token    //头部token
          }
          editor.customConfig.menus = [          //菜单配置
              'head',
              'list',  // 列表
              'justify',  // 对齐方式
              'bold',
              'fontSize',  // 字号
              'italic',
              'underline',
              'image',  // 插入图片
              'foreColor',  // 文字颜色
              'undo',  // 撤销
              'redo',  // 重复
            ] 
                      //下面是最重要的的方法
          editor.customConfig.uploadImgHooks = {
              before: function (xhr, editor, files) {
                  // 图片上传之前触发
                  // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                  
                  // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                  // return {
                  //     prevent: true,
                  //     msg: '放弃上传'
                  // }
              },
              success: function (xhr, editor, result) {
                  // 图片上传并返回结果，图片插入成功之后触发
                  // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
              this.imgUrl=Object.values(result.data).toString()
              },
              fail: function (xhr, editor, result) {
                  // 图片上传并返回结果，但图片插入错误时触发
                  // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
              },
              error: function (xhr, editor) {
                  // 图片上传出错时触发
                  // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
              },
              timeout: function (xhr, editor) {
                  // 图片上传超时时触发
                  // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
              },

              // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
              // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
              customInsert: function (insertImg, result, editor) {
                  // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                  // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                  // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                  let url = Object.values(result.data)      //result.data就是服务器返回的图片名字和链接
                  JSON.stringify(url)    //在这里转成JSON格式
                  insertImg(url)
                  // result 必须是一个 JSON 格式字符串！！！否则报错
              }
          }
          
          
          editor.create()  
      },

```

父组件中使用封装的组件
```
<template>
  <div id="father">
    <wangeditor :catchData="catchData"></wangeditor>
  </div>
</template>

<script>
  import wangeditor from './wangeditor'
data(){
    return{
      content:""
    }
  },
methods:{
    catchData(value){
          this.content=value      //在这里接受子组件传过来的参数，赋值给data里的参数
        }
  },
components: {
    wangeditor
   },
</script>

```



# 图片上传

文档： https://www.kancloud.cn/wangfupeng/wangeditor3/335780

默认情况下，编辑器不会显示“上传图片”的tab，因为你还没有配置上传图片的信息。
