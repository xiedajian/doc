# 在线表格开发要点

## 目录结构

```
src
├─ components
│    ├─ combination // 页面组合用到的组件
│    │    ├─ Edit.vue // 页面组合编辑组件
│    │    └─ TypeForm.vue // 【页面组合】自定义选项编辑弹窗表单
│    ├─ index.js // 导出声明
│    ├─ render.vue // "dev-table-render" 全局组件
│    ├─ tableForm // 表单相关，主要用于工作流
│    │    ├─ index.vue // 接收配置，渲染工作流表单
│    │    └─ loader.vue // 包装了 index.vue, 增加了请求配置逻辑
│    └─ tableGenerator // 设计器相关的主要代码
│           ├─ api // 接口
│           │    └─ index.js
│           ├─ authorities // 管理页面--授权相关
│           │    ├─ index.vue
│           │    ├─ panelAll.vue
│           │    ├─ panelOrg.vue
│           │    ├─ panelRole.vue
│           │    └─ panelUser.vue
│           ├─ codeEditor // 代码编辑器简要封装，基于 codemirror
│           │    ├─ helpers
│           │    │    ├─ index.js
│           │    │    └─ template.js
│           │    ├─ index.vue
│           │    ├─ libs
│           │    │    ├─ index.js
│           │    │    └─ style.scss
│           │    ├─ simple.vue
│           │    └─ util
│           │           ├─ clipboard.js
│           │           └─ encode.js
│           ├─ config // 功能性配置组件
│           │    ├─ codeEnhancementNext.vue // 代码增强（方法、插件）
│           │    ├─ configDataPermissionNext.vue // 数据权限设置
│           │    └─ dialog
│           │           └─ functionEditor.vue // 没有被引用
│           ├─ config.js // 保留（未引用），不对外的开发用的配置文件
│           ├─ index.js // 入口，一些公共方法
│           ├─ preview // 页面展示相关
│           │    ├─ codegen // 未被引用
│           │    │    └─ templates
│           │    │           └─ renderer
│           │    │                  └─ index.js // vxe-table 自定义的渲染器代码
│           │    ├─ index.vue // 渲染器，包装了 jnpf-render 和旧版的渲染器
│           │    ├─ jnpf // 渲染器核心代码
│           │    │    ├─ helpers // 辅助方法
│           │    │    │    ├─ actionConfig.js // 控件事件配置解析，在线表格、在线表单、HTTP等等
│           │    │    │    ├─ createDialog.js // 工具方法 showDialog 
│           │    │    │    ├─ fileUpload.js // 上传控件（图片、文件）使用
│           │    │    │    ├─ makeComponentFromPlugins.js // 表格插件代码处理
│           │    │    │    ├─ util.js // 一些工具方法
│           │    │    │    └─ workflow.js // 工作流相关的特殊处理逻辑
│           │    │    ├─ options.js // tm-vxe-grid 配置项生成
│           │    │    └─ render.vue // 实际的表格渲染器
│           │    ├─ mixins // 可复用逻辑（始于v1版本）
│           │    │    ├─ base.js // 未被引用
│           │    │    ├─ codeGenerate.js // 代码增强处理，文本转函数等
│           │    │    ├─ export.js // 未引用
│           │    │    └─ workflow.js // 未引用
│           │    ├─ styles
│           │    │    └─ index.scss
│           │    └─ utils
│           │           ├─ download_import_onSuccess.js
│           │           └─ index.js
│           └─ scripts // 功能性的方法
│                  ├─ extension.js // 导入方案用，目前未实现
│                  ├─ index.js
│                  └─ render.js // vxe-table 自定义渲染器
├─ package // 源自 jnpf-parent, 设计器核心代码
│    ├─ EventActionV1.md
│    ├─ README.md
│    ├─ index.js 入口文件
│    ├─ src
│    │    ├─ api // 接口，均替换为 m1 的
│    │    │    ├─ common.js
│    │    │    ├─ onlineDev
│    │    │    │    └─ visualDev.js
│    │    │    ├─ permission
│    │    │    │    ├─ department.js
│    │    │    │    ├─ group.js
│    │    │    │    ├─ role.js
│    │    │    │    └─ user.js
│    │    │    └─ systemData
│    │    │           ├─ dataInterface.js
│    │    │           ├─ dataModel.js
│    │    │           ├─ dataSource.js
│    │    │           └─ dictionary.js
│    │    ├─ assets
│    │    │    ├─ custom-theme
│    │    │    │    ├─ fonts
│    │    │    │    │    ├─ element-icons.ttf
│    │    │    │    │    └─ element-icons.woff
│    │    │    │    └─ index.css
│    │    │    ├─ fonts
│    │    │    │    ├─ ym
│    │    │    │    │    ├─ iconfont.css
│    │    │    │    │    ├─ iconfont.ttf
│    │    │    │    │    ├─ iconfont.woff
│    │    │    │    │    └─ iconfont.woff2
│    │    │    │    └─ ym-custom
│    │    │    │           ├─ iconfont.css
│    │    │    │           ├─ iconfont.ttf
│    │    │    │           ├─ iconfont.woff
│    │    │    │           └─ iconfont.woff2
│    │    │    ├─ images
│    │    │    │    ├─ 404.png
│    │    │    │    ├─ dashboard-nodata.png
│    │    │    │    ├─ emptyElement.png
│    │    │    │    ├─ emptyPortal.png
│    │    │    │    ├─ generator
│    │    │    │    │    ├─ columnType1.png
│    │    │    │    │    ├─ columnType2.png
│    │    │    │    │    ├─ columnType3.png
│    │    │    │    │    ├─ columnType4.png
│    │    │    │    │    └─ columnType5.png
│    │    │    │    ├─ home
│    │    │    │    │    ├─ Group.png
│    │    │    │    │    ├─ Group2.png
│    │    │    │    │    ├─ Group3.png
│    │    │    │    │    ├─ anouance.png
│    │    │    │    │    ├─ ask.png
│    │    │    │    │    ├─ bg.png
│    │    │    │    │    ├─ pay.png
│    │    │    │    │    ├─ return.png
│    │    │    │    │    └─ sold.png
│    │    │    │    ├─ import.png
│    │    │    │    ├─ iphoneBg.png
│    │    │    │    ├─ loading-iframe.gif
│    │    │    │    ├─ login-banner.png
│    │    │    │    ├─ login_qr.png
│    │    │    │    ├─ login_version.png
│    │    │    │    ├─ other-login-dialog.png
│    │    │    │    ├─ portal-nodata.png
│    │    │    │    ├─ query-noData.png
│    │    │    │    ├─ settings
│    │    │    │    │    ├─ blend.png
│    │    │    │    │    ├─ classic.png
│    │    │    │    │    ├─ dark.png
│    │    │    │    │    ├─ functional.png
│    │    │    │    │    ├─ lightWhite.png
│    │    │    │    │    └─ plain.png
│    │    │    │    ├─ success.png
│    │    │    │    ├─ tiamaes-logo.png
│    │    │    │    ├─ tip.png
│    │    │    │    ├─ upload.png
│    │    │    │    ├─ xsl.png
│    │    │    │    └─ xsl1.png
│    │    │    └─ scss
│    │    │           ├─ common.scss
│    │    │           ├─ font.scss
│    │    │           └─ theme.scss
│    │    ├─ components // 全局组件
│    │    │    ├─ Charts // 似乎没用到
│    │    │    │    ├─ Keyboard.vue
│    │    │    │    ├─ LineMarker.vue
│    │    │    │    ├─ MixChart.vue
│    │    │    │    ├─ Normal.vue
│    │    │    │    └─ mixins
│    │    │    │           └─ resize.js
│    │    │    ├─ ColumnDesign // 列表设计相关
│    │    │    │    ├─ FormScript.vue
│    │    │    │    ├─ downloadBox.vue
│    │    │    │    ├─ index.scss
│    │    │    │    ├─ index.vue
│    │    │    │    ├─ main.vue
│    │    │    │    ├─ mainApp.vue
│    │    │    │    └─ uploadBox.vue
│    │    │    ├─ ColumnSettings // 可能没用
│    │    │    │    └─ index.vue
│    │    │    ├─ ExportBox // 导出功能的弹窗
│    │    │    │    └─ index.vue
│    │    │    ├─ Generator // 表单设计器（第二步)相关
│    │    │    │    ├─ components // 表单中的组件
│    │    │    │    │    ├─ Address
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ Amount
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ Calculate
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ ComSelect
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ DepSelect
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ DicSelect
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ GroupSelect
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ GroupTitle
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ InputTable
│    │    │    │    │    │    ├─ Form.vue
│    │    │    │    │    │    ├─ eventCreator.js
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ JNPFText
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ JnpfBarcode
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ JnpfButton
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ JnpfLink
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ JnpfQrcode
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ NumRange
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ PopupAttr
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ PopupSelect
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ PopupTableSelect
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ PosSelect
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ RelationForm
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ RelationFormAttr
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    ├─ RoleSelect
│    │    │    │    │    │    └─ index.vue
│    │    │    │    │    └─ Upload
│    │    │    │    │           ├─ Preview.vue
│    │    │    │    │           ├─ UploadFz.vue
│    │    │    │    │           ├─ UploadImg.vue
│    │    │    │    │           └─ vue-simple-uploader
│    │    │    │    │                  ├─ fileItem.vue
│    │    │    │    │                  ├─ fileUploader.vue
│    │    │    │    │                  └─ mixin.js
│    │    │    │    ├─ generator
│    │    │    │    │    ├─ comConfig.js
│    │    │    │    │    ├─ config.js
│    │    │    │    │    ├─ css.js
│    │    │    │    │    ├─ drawingDefalut.js
│    │    │    │    │    ├─ html.js
│    │    │    │    │    ├─ js.js
│    │    │    │    │    └─ ruleTrigger.js
│    │    │    │    ├─ index // 主界面相关
│    │    │    │    │    ├─ DialogScript.vue
│    │    │    │    │    ├─ DraggableItem.vue
│    │    │    │    │    ├─ DraggableItemApp.vue
│    │    │    │    │    ├─ FieldDialog.vue
│    │    │    │    │    ├─ FormScript.vue
│    │    │    │    │    ├─ FormScriptSelect.vue
│    │    │    │    │    ├─ Home.vue
│    │    │    │    │    ├─ JsonDrawer.vue
│    │    │    │    │    ├─ RightComponents // 表单设计右侧的组件配置面板（一些表单项）
│    │    │    │    │    │    ├─ Address.vue
│    │    │    │    │    │    ├─ Calculate.vue
│    │    │    │    │    │    ├─ Cascader
│    │    │    │    │    │    │    └─ index.vue
│    │    │    │    │    │    ├─ Checkbox.vue
│    │    │    │    │    │    ├─ Collapse.vue
│    │    │    │    │    │    ├─ ColorPicker.vue
│    │    │    │    │    │    ├─ ComInput.vue
│    │    │    │    │    │    ├─ ComRight.vue
│    │    │    │    │    │    ├─ Date.vue
│    │    │    │    │    │    ├─ DateRange-2rm.vue
│    │    │    │    │    │    ├─ Divider.vue
│    │    │    │    │    │    ├─ GroupTitle.vue
│    │    │    │    │    │    ├─ JNPFAmount.vue
│    │    │    │    │    │    ├─ JNPFText.vue
│    │    │    │    │    │    ├─ JnpfAlert.vue
│    │    │    │    │    │    ├─ JnpfLink.vue
│    │    │    │    │    │    ├─ NumInput.vue
│    │    │    │    │    │    ├─ PopupAttr.vue
│    │    │    │    │    │    ├─ PopupSelect.vue
│    │    │    │    │    │    ├─ PsdInput.vue
│    │    │    │    │    │    ├─ Radio.vue
│    │    │    │    │    │    ├─ Rate.vue
│    │    │    │    │    │    ├─ RelationForm.vue
│    │    │    │    │    │    ├─ RelationFormAttr.vue
│    │    │    │    │    │    ├─ Select.vue
│    │    │    │    │    │    ├─ Slider.vue
│    │    │    │    │    │    ├─ Switch.vue
│    │    │    │    │    │    ├─ Tab.vue
│    │    │    │    │    │    ├─ Table
│    │    │    │    │    │    │    ├─ ActionConfigForm.vue
│    │    │    │    │    │    │    ├─ AddTableForm.vue
│    │    │    │    │    │    │    └─ index.vue
│    │    │    │    │    │    ├─ Textarea.vue
│    │    │    │    │    │    ├─ Time.vue
│    │    │    │    │    │    ├─ TimeRange.vue
│    │    │    │    │    │    ├─ TreeSelect
│    │    │    │    │    │    │    ├─ TreeNodeDialog.vue
│    │    │    │    │    │    │    └─ index.vue
│    │    │    │    │    │    ├─ UploadFz.vue
│    │    │    │    │    │    ├─ UploadImg.vue
│    │    │    │    │    │    ├─ dynamicMixin.js
│    │    │    │    │    │    ├─ mixin.js
│    │    │    │    │    │    └─ tpl.vue
│    │    │    │    │    ├─ RightPanel.vue
│    │    │    │    │    ├─ StyleScript.vue
│    │    │    │    │    └─ mixins
│    │    │    │    │           └─ formSelect.js
│    │    │    │    ├─ parser // 表单解析器
│    │    │    │    │    ├─ Parser.vue
│    │    │    │    │    └─ index.js
│    │    │    │    ├─ preview // 表单设计步骤中的【预览】按钮使用
│    │    │    │    │    └─ index.vue
│    │    │    │    ├─ render // 渲染单个表单项控件使用
│    │    │    │    │    ├─ render.js
│    │    │    │    │    └─ slots
│    │    │    │    │           ├─ el-button.js
│    │    │    │    │           ├─ el-checkbox-group.js
│    │    │    │    │           ├─ el-divider.js
│    │    │    │    │           ├─ el-input.js
│    │    │    │    │           ├─ el-radio-group.js
│    │    │    │    │           └─ el-select.js
│    │    │    │    ├─ styles
│    │    │    │    │    ├─ home.scss
│    │    │    │    │    └─ index.scss
│    │    │    │    └─ utils
│    │    │    │           ├─ db.js
│    │    │    │           └─ index.js
│    │    │    ├─ Hamburger // 未引用
│    │    │    │    └─ index.vue
│    │    │    ├─ HeaderSearch // 未引用
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPF-TreeTransfer
│    │    │    │    ├─ array.js
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPF-iconBox
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPF-table // el-table 的封装
│    │    │    │    ├─ Column.vue
│    │    │    │    ├─ ColumnSettings.vue
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPF-tableOperation
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPF-topOperation
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPF-transfer
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPF-treeSelect
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPF-uploadBtn
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPF-userBox
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPF-userSelect
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPF-userTransfer
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPF-usersSelect
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPF-usersTransfer
│    │    │    │    └─ index.vue
│    │    │    ├─ JNPFEditor
│    │    │    │    ├─ monaco.vue
│    │    │    │    └─ quill.vue
│    │    │    ├─ JNPFImport
│    │    │    │    └─ index.vue
│    │    │    ├─ JsonEditor
│    │    │    │    ├─ codemirror.css
│    │    │    │    └─ index.vue
│    │    │    ├─ M1UserSelect
│    │    │    │    ├─ api.js
│    │    │    │    ├─ index.js
│    │    │    │    ├─ select.vue
│    │    │    │    └─ userSelect.vue
│    │    │    ├─ Pagination
│    │    │    │    └─ index.vue
│    │    │    ├─ PrintBrowse-unuse // 未引用
│    │    │    │    └─ index.vue
│    │    │    ├─ Process // 流程相关，部分子文件正在使用
│    │    │    │    ├─ FlowCard
│    │    │    │    │    ├─ Preview.vue
│    │    │    │    │    ├─ config.js
│    │    │    │    │    ├─ index.scss
│    │    │    │    │    ├─ index.vue
│    │    │    │    │    └─ util.js
│    │    │    │    ├─ OrgSelect
│    │    │    │    │    └─ index.vue
│    │    │    │    ├─ OrgTransfer
│    │    │    │    │    ├─ index.vue
│    │    │    │    │    └─ roleTransfer.vue
│    │    │    │    ├─ Preview.vue
│    │    │    │    └─ PropPanel
│    │    │    │           ├─ InterfaceDialog.vue // 远程接口弹窗
│    │    │    │           ├─ dataease
│    │    │    │           │    ├─ ApiAuthConfig.vue
│    │    │    │           │    ├─ ApiBody.vue
│    │    │    │           │    ├─ ApiHttpRequestForm.vue
│    │    │    │           │    ├─ ApiKeyValue.vue
│    │    │    │           │    ├─ ApiTestModel.js
│    │    │    │           │    ├─ ApiVariable.vue
│    │    │    │           │    ├─ CodeEdit.vue
│    │    │    │           │    ├─ DePwd.vue
│    │    │    │           │    ├─ None.png
│    │    │    │           │    ├─ convert.js
│    │    │    │           │    ├─ format-utils.js
│    │    │    │           │    └─ msgCfm
│    │    │    │           │           ├─ index.js
│    │    │    │           │           └─ keyEnter.js
│    │    │    │           ├─ formulaData.js
│    │    │    │           └─ formulaDialog.vue // 未使用
│    │    │    ├─ Screenfull
│    │    │    │    └─ index.vue
│    │    │    ├─ SelectDialog
│    │    │    │    └─ index.vue
│    │    │    ├─ SignImgDialog
│    │    │    │    └─ index.vue
│    │    │    ├─ SizeSelect
│    │    │    │    └─ index.vue
│    │    │    ├─ SuperQuery // 高级查询
│    │    │    │    └─ index.vue
│    │    │    ├─ Upload // 未引用
│    │    │    │    ├─ SingleImg.vue
│    │    │    │    └─ UploadFileSingle.vue
│    │    │    ├─ index.js
│    │    │    ├─ jnpf-form-tip-item
│    │    │    │    └─ index.vue
│    │    │    └─ jnpf-open-data
│    │    │           └─ index.vue
│    │    ├─ directive
│    │    │    ├─ clipboard
│    │    │    │    ├─ clipboard.js
│    │    │    │    └─ index.js
│    │    │    ├─ el-drag-dialog
│    │    │    │    ├─ drag.js
│    │    │    │    └─ index.js
│    │    │    └─ permission
│    │    │           ├─ index.js
│    │    │           └─ permission.js
│    │    ├─ filters
│    │    │    └─ index.js
│    │    ├─ lang
│    │    │    ├─ en.js
│    │    │    ├─ index.js
│    │    │    ├─ zh.js
│    │    │    └─ zhtw.js
│    │    ├─ mixins
│    │    │    └─ generator
│    │    │           ├─ common.js
│    │    │           ├─ form.js
│    │    │           └─ index.js
│    │    ├─ permission.js
│    │    ├─ router
│    │    │    ├─ index.js
│    │    │    └─ modules
│    │    │           └─ base.js
│    │    ├─ settings.js
│    │    ├─ store
│    │    │    ├─ getters.js
│    │    │    ├─ index.js
│    │    │    └─ modules
│    │    │           ├─ base.js
│    │    │           ├─ generator.js
│    │    │           └─ settings.js
│    │    ├─ utils
│    │    │    ├─ auth.js
│    │    │    ├─ clipboard.js
│    │    │    ├─ define.js
│    │    │    ├─ encode.js
│    │    │    ├─ error-log.js
│    │    │    ├─ formValidate.js
│    │    │    ├─ get-page-title.js
│    │    │    ├─ i18n.js
│    │    │    ├─ index.js
│    │    │    ├─ jnpf.js
│    │    │    ├─ message.js
│    │    │    ├─ module.js
│    │    │    ├─ notify.js
│    │    │    ├─ open-window.js
│    │    │    ├─ provider.js
│    │    │    ├─ request.js
│    │    │    ├─ scroll-to.js
│    │    │    └─ validate.js
│    │    └─ views
│    │           ├─ basic
│    │           │    └─ dynamicModel // 页面渲染
│    │           │           ├─ form // 表单
│    │           │           │    └─ index.vue
│    │           │           ├─ index.vue
│    │           │           └─ list // 列表
│    │           │                  ├─ Detail.vue // 详情表单
│    │           │                  ├─ Form.vue // 表单，新增/编辑
│    │           │                  ├─ Search.vue // 查询条件
│    │           │                  ├─ child-table-column.vue
│    │           │                  └─ index.vue // 列表，表格区域替换成了 tm-vxe-grid
│    │           ├─ common
│    │           │    └─ TableForm.vue // 选择数据表，第一步
│    │           └─ onlineDev
│    │                  └─ webDesign // 设计弹窗，第一步的表单，第二步 Generator, 第三步 ColumnDesign
│    │                         └─ Form.vue
│    ├─ static
│    │    ├─ emoji
│    │    │    ├─ 100.gif
│    │    │    ├─ 101.gif
│    │    │    ├─ 102.gif
│    │    │    ├─ 103.gif
│    │    │    ├─ 104.gif
│    │    │    ├─ 105.gif
│    │    │    ├─ 106.gif
│    │    │    ├─ 107.gif
│    │    │    ├─ 108.gif
│    │    │    ├─ 109.gif
│    │    │    ├─ 110.gif
│    │    │    ├─ 111.gif
│    │    │    ├─ 112.gif
│    │    │    ├─ 113.gif
│    │    │    ├─ 114.gif
│    │    │    ├─ 115.gif
│    │    │    ├─ 116.gif
│    │    │    ├─ 117.gif
│    │    │    ├─ 118.gif
│    │    │    ├─ 119.gif
│    │    │    ├─ 120.gif
│    │    │    ├─ 121.gif
│    │    │    ├─ 122.gif
│    │    │    ├─ 123.gif
│    │    │    ├─ 124.gif
│    │    │    ├─ 125.gif
│    │    │    ├─ 126.gif
│    │    │    ├─ 127.gif
│    │    │    ├─ 128.gif
│    │    │    ├─ 129.gif
│    │    │    ├─ 130.gif
│    │    │    ├─ 131.gif
│    │    │    ├─ 132.gif
│    │    │    ├─ 133.gif
│    │    │    ├─ 134.gif
│    │    │    ├─ 135.gif
│    │    │    ├─ 136.gif
│    │    │    ├─ 137.gif
│    │    │    ├─ 138.gif
│    │    │    ├─ 139.gif
│    │    │    ├─ 140.gif
│    │    │    ├─ 141.gif
│    │    │    ├─ 142.gif
│    │    │    ├─ 143.gif
│    │    │    ├─ 144.gif
│    │    │    ├─ 145.gif
│    │    │    ├─ 146.gif
│    │    │    ├─ 147.gif
│    │    │    ├─ 148.gif
│    │    │    ├─ 149.gif
│    │    │    ├─ 150.gif
│    │    │    ├─ 151.gif
│    │    │    ├─ 152.gif
│    │    │    ├─ 153.gif
│    │    │    ├─ 154.gif
│    │    │    ├─ 155.gif
│    │    │    ├─ 156.gif
│    │    │    ├─ 157.gif
│    │    │    ├─ 158.gif
│    │    │    ├─ 159.gif
│    │    │    ├─ 160.gif
│    │    │    ├─ 161.gif
│    │    │    ├─ 162.gif
│    │    │    ├─ 163.gif
│    │    │    ├─ 164.gif
│    │    │    ├─ 165.gif
│    │    │    ├─ 166.gif
│    │    │    ├─ 167.gif
│    │    │    ├─ 168.gif
│    │    │    ├─ 169.gif
│    │    │    ├─ 170.gif
│    │    │    ├─ 171.gif
│    │    │    ├─ 172.gif
│    │    │    ├─ 173.gif
│    │    │    ├─ 174.gif
│    │    │    ├─ 175.gif
│    │    │    ├─ 176.gif
│    │    │    ├─ 177.gif
│    │    │    ├─ 178.gif
│    │    │    ├─ 179.gif
│    │    │    ├─ 180.gif
│    │    │    ├─ 181.gif
│    │    │    ├─ 182.gif
│    │    │    ├─ 183.gif
│    │    │    ├─ 184.gif
│    │    │    ├─ 185.gif
│    │    │    ├─ 186.gif
│    │    │    ├─ 187.gif
│    │    │    ├─ 188.gif
│    │    │    ├─ 189.gif
│    │    │    ├─ 190.gif
│    │    │    ├─ 191.gif
│    │    │    ├─ 192.gif
│    │    │    ├─ 193.gif
│    │    │    ├─ 194.gif
│    │    │    ├─ 195.gif
│    │    │    ├─ 196.gif
│    │    │    ├─ 197.gif
│    │    │    ├─ 198.gif
│    │    │    ├─ 199.gif
│    │    │    ├─ 200.png
│    │    │    ├─ 201.png
│    │    │    ├─ 202.png
│    │    │    ├─ 203.png
│    │    │    ├─ 204.png
│    │    │    ├─ 205.png
│    │    │    ├─ 206.png
│    │    │    ├─ 207.png
│    │    │    ├─ 208.png
│    │    │    ├─ 209.png
│    │    │    ├─ 210.png
│    │    │    ├─ 211.png
│    │    │    ├─ 212.png
│    │    │    ├─ 213.png
│    │    │    ├─ 214.png
│    │    │    ├─ 215.png
│    │    │    ├─ 216.png
│    │    │    ├─ 217.png
│    │    │    ├─ 218.png
│    │    │    └─ 219.png
│    │    ├─ emoji.json
│    │    └─ json
│    │           ├─ element-icons.json
│    │           ├─ ymCustom.json
│    │           └─ ymIcon.json
│    └─ 现行版本事件参数结构.md
├─ utils
│    ├─ dev.js
│    ├─ errorHandler.js
│    ├─ eventBus.js
│    └─ module.js
└─ views
       ├─ combination // 表格组合
       │    ├─ Preview.vue
       │    ├─ api
       │    │    └─ index.js
       │    ├─ components
       │    │    └─ CombinationItems.vue
       │    └─ index.vue
       ├─ manage // 管理页面
       │    ├─ ResourcePublisherTmp
       │    │    ├─ README.md
       │    │    ├─ api
       │    │    │    └─ index.js
       │    │    ├─ icon.vue
       │    │    ├─ icons.js
       │    │    └─ index.vue
       │    ├─ api
       │    │    └─ index.js
       │    ├─ dialog
       │    │    ├─ MigrationResult.vue // 版本迁移功能结果展示
       │    │    ├─ TagExport.vue // 按标签导出
       │    │    ├─ TagPublisher.vue // 按标签发布
       │    │    ├─ VersionMigration.vue // 版本迁移
       │    │    ├─ databaseSelect.vue
       │    │    ├─ groupDrawer.vue
       │    │    ├─ historyEdition.vue
       │    │    └─ versionDescription.vue
       │    └─ index.vue
       └─ preview // 预览页
              └─ index.vue
```

## 备注
### 1. 全局组件

jnpf 下的全局组件集中在两个位置：

- packages\online-dev-table\src\package\src\components\ 多数组件未实际用到
- packages\online-dev-table\src\package\src\components\Generator\components 表单内定义的控件，如关联表格、设计子表等等

### 2. 代码增强
从界面上看，包含多个位置，可以简单分为两类：
- 纯代码

  - 函数：`runtimeInjection.methods`
  - 插件:  `runtimeInjection.plugins`

  - ![image-20231017102544244](https://s2.loli.net/2023/10/17/vSUfmNM3dk5EF8x.png)

- 配置式

  - 工具栏：`runtimeInjection.buttons.toolbar`
  - 操作列: `runtimeInjection.buttons.operation`
  - 表单-自定义: `runtimeInjection.buttons.footer`
  - 表单按钮：`enhance.click.actionConfig`, `enhance.click.actionType`

 按钮事件配置解析，源代码实现有3个位置：

- packages\online-dev-table\src\components\tableGenerator\preview\jnpf\helpers\actionConfig.js
- packages\online-dev-table\src\package\src\components\Generator\parser\Parser.vue
- packages\online-dev-table\src\package\src\components\Generator\components\InputTable\eventCreator.js：设计子表中的工具栏是自定义的，单独处理



### 3. 钩子函数
通过 `$_callHook` 定义, 在表格渲染的特定时机执行的函数. 现有:
- $_beforeCreateOptions: tm-vxe-grid options 生成前
- $_optionsReady: tm-vxe-grid options 生成完成, 可部分定制 `options.columns` 等属性
- $_initSearchList: 搜索条件配置数据初始化完成, **查询条件是单独实现的,不是 tm-vxe-grid 内置的**
- $_beforeAjaxQuery: 表格列表查询接口请求前, 处理查询参数
- $_beforeInsert: 新增表单请求发起前
- $_afterInsertRequest: 新增请求成功后
- $_beforeUpdate: 编辑表单请求发起前
- $_afterUpdateRequest: 编辑请求成功后
- $_afterDeleteRequest: 删除请求成功后(删除请求参数是固定的唯一字符串数组, 不提供删除前钩子)
- $_onModalShow: 表单弹窗打开(前), 新增、编辑、详情等

### 4. 拦截器
内部处理函数: `$_hasInterceptor`, `$_callInterceptor`. 支持在代码增强-函数定义下列方法替换内置的处理逻辑:
- $_interceptorSave: 替换表单保存
- $_interceptorDelete 替换列表删除

### 5. 工作流

- packages\online-dev-table\src\components\tableGenerator\preview\jnpf\helpers\workflow.js
- 固定插入 【流程状态】、【流程发起时间】
- 重写了【详情】、【编辑】、【新增】按钮

### 6. 工具方法

showDialog, 页面内通过 `this.` 调用

- packages\online-dev-table\src\components\tableGenerator\preview\jnpf\helpers\createDialog.js
- 支持在线表格、组件、插件

### 7. 设计子表

基于 jnpf 原有代码，增加了弹窗表单、工具栏

- packages\online-dev-table\src\package\src\components\Generator\components\InputTable\index.vue

### 8. 关联表格

基于 jnpf 原有的关联表单改造，表格渲染重写，增加了一些属性

- packages\online-dev-table\src\package\src\components\Generator\components\RelationForm\index.vue

### 9. 上传文件

替换上传接口，增加了 path, channel, rename 等属性

- packages\online-dev-table\src\package\src\components\Generator\components\Upload\UploadFz.vue

### 10. 上传图片

替换上传接口，增加了 path, channel, rename 等属性

- packages\online-dev-table\src\package\src\components\Generator\components\Upload\UploadImg.vue

### 11. 点击事件配置

类型共8种，按照所处位置，可配置类型不同

- packages\online-dev-table\src\package\src\components\Generator\index\FormScriptSelect.vue

### 12. 表格渲染器

由两部分构成，jnpf 外壳 +自定义表格区域。

- packages\online-dev-table\src\components\tableGenerator\preview\jnpf\render.vue: 渲染器，重写实现了表格和自定义按钮的处理逻辑
- packages\online-dev-table\src\package\src\views\basic\dynamicModel\index.vue： `dynamicModel` 组件，支持列表、表单(暂未实现) 两种类型
- packages\online-dev-table\src\package\src\views\basic\dynamicModel\list\index.vue：列表组件，将原有的表格区域替换为 tm-vxe-grid, 保留查询条件、左侧树、表单等

### 13. jnpf 原始代码
- http://192.168.250.101/ve-group/jnpf/tree/master/jnpf-web