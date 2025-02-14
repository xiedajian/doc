# @tiamaes/jnpf-parent
> 在线表格，设计器部分

## 基础设置

![image-20230518172839273](https://s2.loli.net/2023/05/18/p3VfQdTDm5otGIj.png)

## 表单设置

![image-20230518172904222](https://s2.loli.net/2023/05/18/srkVTSypF1RMwdx.png)

## 列表设置

![image-20230518172928742](https://s2.loli.net/2023/05/18/1SAXNuQIU4YgLeB.png)



## 安装

```js
import JNPF from '@tiamaes/jnpf-parent';

Vue.use(JNPF, Object.assign(options, { $provider: {
        RELATIONS,
}}));
```

## src

| Path                                                         | Desc                                     | Checked |
| ------------------------------------------------------------ | ---------------------------------------- | ------- |
| src\views\onlineDev\webDesign\Form.vue                       | 设计                                     | OK      |
| src\components\ColumnDesign\downloadBox.vue                  | 下载模板设置                             | OK      |
| src\components\ColumnDesign\FormScript.vue                   | 脚本事件                                 | OK      |
| src\components\ColumnDesign\uploadBox.vue                    | 导入模板设置                             | OK      |
| src\components\ExportBox\index.vue                           | 导出数据                                 | OK      |
| src\components\Generator\components\ComSelect\index.vue      | 组织选择                                 | OK      |
| src\components\Generator\components\InputTable\Form.vue      | 设计子表表单                             | OK      |
| src\components\Generator\components\RelationForm\index.vue   | 关联表格                                 | OK      |
| src\components\Generator\components\RoleSelect\index.vue     | 角色选择                                 | OK      |
| src\components\Generator\components\Upload\Preview.vue       | 上传--预览, 疑似无用                     | OK      |
| src\components\Generator\index\DialogScript.vue              | 点击事件配置--自定义填充                 | OK      |
| src\components\Generator\index\FormScript.vue                | 表单事件编辑                             | OK      |
| src\components\Generator\index\FormScriptSelect.vue          | 点击事件配置                             | OK      |
| src\components\Generator\index\StyleScript.vue               | 表单样式                                 | OK      |
| src\components\Generator\index\RightComponents\Cascader\TreeNodeDialog.vue | 级联配置--添加选项                       | OK      |
| src\components\Generator\index\RightComponents\TreeSelect\TreeNodeDialog.vue | 树选择配置--添加选项                     | OK      |
| src\components\Generator\preview\index.vue                   | 设计器--预览                             | OK      |
| src\components\JNPFImport\index.vue                          | 批量导入                                 | OK      |
| src\components\Process\PropPanel\InterfaceDialog.vue         | 远端数据配置                             | OK      |
| src\components\Process\PropPanel\InterfaceDialogOld.vue      | ?                                        | DEL     |
| src\components\SelectDialog\index.vue                        | 设计子表，addType == 1，未启用. 动作表单 |         |
| src\components\SuperQuery\index.vue                          | 高级查询                                 | OK      |
| src\views\basic\dynamicModel\list\Detail.vue                 | 详情                                     | OK      |
| src\views\basic\dynamicModel\list\Form.vue                   | 表单                                     | OK      |
| src\views\generator\TableForm.vue                            | 数据源--数据选择                         | OK      |
| src\components\Process\PropPanel\msgDialog.vue               | 未启用，*子流程*-发送配置                | DEL     |
| src\components\SignImgDialog\index.vue                       | 未启用，电子签名                         | UNUSE   |
| src\components\Process\PropPanel\TemplateDetail.vue          | 未启用，发送模板                         | DEL     |
| src\views\generator\AddBox.vue                               | 未启用，新建功能, 展示模式：表单、列表   | DEL     |
| src\views\generator\DownloadForm.vue                         | 未启用，输出设置                         | UNUSE   |
| src\views\generator\Preview.vue                              | 未启用，代码预览                         | UNUSE   |
| src\views\generator\webForm\Form.vue                         | 未启用，功能表单                         | UNUSE   |
| src\components\Generator\components\Address\index.vue        | 未启用，地区选择                         | UNUSE   |
| src\components\Generator\components\BillRule\index.vue       | 未启用，未知                             | DEL     |
| src\components\Generator\components\DepSelect\index.vue      | 未启用，部门选择                         | UNUSE   |
| src\components\Generator\components\GroupSelect\index.vue    | 未启用，分组选择                         | UNUSE   |
| src\components\Generator\components\PopupSelect\index.vue    | 未启用，弹窗选择                         | UNUSE   |
| src\components\Generator\components\PosSelect\index.vue      | 未启用，岗位选择                         | UNUSE   |
| src\components\JNPF-enlarge\index.vue                        | 未知                                     | DEL     |
| src\components\JNPF-iconBox\index.vue                        | 图标选择, 输入控件等                     | OK      |
| src\components\JNPF-userBox\index.vue                        | 未知， 无用                              | DEL     |
| src\components\JNPF-userSelect\index.vue                     | 未启用，用户选择                         | UNUSE   |
| src\components\JNPF-usersSelect\index.vue                    | 未启用，用户选择                         | UNUSE   |
| src\components\PrintBrowse\index.vue                         | 未启用，打印预览                         | UNUSE   |
| src\components\Process\OrgTransfer\index.vue                 | 未启用                                   | UNUSE   |
| src\components\Process\PropPanel\formulaDialog.vue           | 未启用，*条件*--公式编辑                 | UNUSE   |
| src\components\Process\PropPanel\index.vue                   | 未知                                     | DEL     |
| src\components\Generator\generator\html.js                   | 未开发，弹窗模板                         |         |
| src\components\Generator\index\FieldDialog.vue               | 未启用，表字段编辑/新增                  | UNUSE   |
| src\components\Generator\index\RightComponents\Calculate.vue | 未启用，计算控件配置--编辑公式           | UNUSE   |
| src\components\Generator\index\RightComponents\Table\AddTableForm.vue | 未启用，设计子表--动作设置               | OK      |
|                                                              |                                          |         |
|                                                              |                                          |         |




## TODO

- src\components\Process\PropPanel\index.vue ?
- vxe-modal 打开时卡顿
- 高级查询中表单项替换



## 事件动作

### 一级分类：

*actionType*:

| 类型       | 编码   | 说明                                                         |
| ---------- | ------ | ------------------------------------------------------------ |
| http 请求  | ajax   | 发送 http 请求                                               |
| 弹窗       | dialog | 执行弹窗打开（内容类型：在线表单、在线表格、全局组件、表格增强插件） |
| 页面跳转   |        | 页面跳转：页面链接跳转                                       |
| 移动端扫码 |        |                                                              |
| JS 脚本    |        | 通过编写 JS 代码片段实现所需逻辑，同时支持 JS 代码内执行动作 |

### 各类型配置

#### ajax

`actionType: ajax`

**1.配置项**

| 属性名称 | 说明     | 是否必填 |
| -------- | -------- | -------- |
| api      | 请求 url | 是       |
| method   | 默认 get | 否       |
|          |          |          |

**2.请求成功操作**

| 编码     | 说明                       |      |
| -------- | -------------------------- | ---- |
| redirect | 请求成功后，跳转至某个页面 |      |
| reload   | 请求成功后，刷新目标组件   |      |
| messages | 自定义 toast 文字          |      |
| fill     | 填充表单                   |      |



#### dialog

`actionType: dialog`

![image-20230815150639869](C:\Users\Silmeria\AppData\Roaming\Typora\typora-user-images\image-20230815150639869.png)

#### link

`actionType: link`

**属性表**

| 属性名     | 类型     | 默认值 | 说明                                                         |
| ---------- | -------- | ------ | ------------------------------------------------------------ |
| actionType | `string` | `link` | 单页跳转                                                     |
| link       | `string` | `link` | 用来指定跳转地址，跟 url 不同的是，这是单页跳转方式，请指定平台内的页面。 |

#### url

**属性表**

| 属性名     | 类型      | 默认值  | 说明                                             |
| ---------- | --------- | ------- | ------------------------------------------------ |
| actionType | `string`  | `url`   | 页面跳转                                         |
| url        | `string`  | -       | 按钮点击后，会打开指定页面。可用 `${xxx}` 取值。 |
| blank      | `boolean` | `false` | 如果为 `true` 将在新 tab 页面打开。              |



### 参数

```json
{
    
}
```



### 响应

```json
{
    
}
```













https://www.tianqiapi.com/api/?appid=85841439&appsecret=EKCDLT4I&version=v9&cityid=0&city=%E9%9D%92%E5%B2%9B&ip=27.193.13.255&callback=0

- 浏览器相关：回退、前进、后退、刷新
- 刷新组件：联动刷新表单数据，即数据重新加载
- 组件状态：控制指定组件的显示/隐藏、启用/禁用、展示态/编辑态
- 组件特性动作：执行指定组件的专有动作，例如执行表单的提交动作
- 组件数据：更新指定组件的数据域