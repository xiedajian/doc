

# tm-vxe-table 方法

## getType

- this.$refs.table.getType()		 // add, edit, detail


## getGrid

- this.$refs.table.getGrid()		 // 获取到原生的 vxe-table ref


## getCheckedRecords

- this.$refs.table.getGrid()		 // 获取选中的行记录

源码：
```
    getCheckedRecords() {
      const $grid = this.getGrid();
      if ($grid) {
        return [
          ...$grid.getCheckboxRecords(true),
          ...$grid.getCheckboxReserveRecords(true)
        ];
      }
      return [];
    },
```



## setSelectOptions

- this.$refs.table.setSelectOptions(result, options = [])		 // 设置下拉类型表单项的options

源码：
```
    setSelectOptions(result, options = []) {
      if (result && result.itemRender) {
        if (result.itemRender.name === "ElCascader") {
          result.itemRender.props.options = options;
        } else {
          result.itemRender.options = options;
        }
      }
    },
```


## setLoading

- this.$refs.table.setLoading(bool)		 // 设置表格是否加载状态


## resize

- this.$refs.table.resize({width,height})		 // resize表格尺寸

> 内部 resize-detector 自动监听容器触发 resize 方法

源码：
```
    resize(data) {
      data = data || {
        width: this.$el.clientWidth,
        height: this.$el.clientHeight
      };
      if (typeof this.options.height === "undefined") {
        let height = 0;
        if (this.maxHeight === "auto") {
          const offset =
            this.skin === "round"
              ? this.formConfig.items && this.formConfig.enabled !== false
                ? 26
                : 10
              : 0;
          height = data.height - offset;
        } else if (this.maxHeight > 0) {
          height = this.maxHeight;
        }
        if (height > 0) {
          this.$set(this.options, "maxHeight", height);
        }
      }
      this.$emit("resize", data);
    },
```


## initItemRender

- this.$refs.table.initItemRender(itemRender)		 // 重置表单项配置

源码：
```
    initItemRender(itemRender) {
      if (itemRender) {
        if (typeof itemRender.options === "function") {
          const options = itemRender.options();
          itemRender.options = Array.isArray(options) ? options : [];
        }
        if (["ElInputNumber", "ElInput"].includes(itemRender.name)) {
          const { props, attrs } = itemRender;
          if (!attrs) {
            itemRender.attrs = {};
          }
          ["placeholder", "maxlength"].forEach((key) => {
            if (props?.[key]) {
              itemRender.attrs[key] = props[key];
              this.$delete(itemRender.props, key);
            }
          });
        }
      }
    },
```


## refresh

- this.$refs.table.refresh()		 // 刷新表格 （保留分页等信息）

源码：
```
    refresh() {
      this.getGrid().commitProxy("query");
    },
```


## reload

- this.$refs.table.reload()		 // 重置表格 （重置分页等信息）

源码：
```
    reload() {
      this.getGrid().commitProxy("reload");
    },
```


## submit		内置弹窗-表单时-提交时调用-校验表单

- this.$refs.table.submit()		 // 重置表格 （重置分页等信息）

源码：
```
    submit() {
      const $form = this.getModalForm();
      if ($form) {
        $form
          .validate()
          .then(() => {
            this.onSubmit({ data: this.getModalFormData(), $form });
          })
          .catch(() => null);
      }
    },
```


## onSubmit		内置弹窗-表单时-提交时submit校验通过后调用

- this.$refs.table.onSubmit({data})		 // 重置表格 （重置分页等信息）

源码：
```
    onSubmit({ data }) {
      this.loading = true;
      const { save, onSaveMessage } = this.ajax;
      if (typeof save === "function") {
        save({
          body: {
            [this.isAdd ? "insertRecord" : "updateRecord"]: data
          },
          params: this.params
        })
          .then((res) => {
            if (typeof onSaveMessage === "function") {
              onSaveMessage(res);
            } else {
              this.$modal.message({
                content: res.message || this.$_t("保存成功"),
                status: "success"
              });
            }
            this.hideModal();
            this.refresh();
          })
          .catch(() => null)
          .finally(() => {
            this.loading = false;
          });
      }
    }
```



# Mixins


## search  搜索表单模块

- addSearchFormRule(field, rule)
- deleteSearchFormRule(field)
- getSearchFormItem(key) 		// 获取搜索表单的表单项 key不传时查全部
- setSearchOptions(key, options)	// 设置某个表单项的下拉框options


## modal	弹窗模块

- getModal
- getModalForm
- getModalFormData()
- setModalFormData(data = {})		// 此方法可以设置弹窗表单数据（重置为空，改变单个）
- setModalFormItemData(key, value)
- getModalFormItems(source)
- getModalFormDefaultData()
- setModalOptions(key, options)
- addModalFormRule(field, rule)
- deleteModalFormRule(field)
- getModalFormItem(key)
- showModal(options = {})	// 显示弹窗
```
    // 显示弹窗
    showModal(options = {}) {
      const { params, component, modalType, ...rest } = options;
      if (params) {
        this.params = params;
      }
      if (component) {
        this.component = component;
      }
      if (modalType) {
        this.type = modalType;
      }
      this.modal = Object.assign({}, defaultModal, rest);
      this.$nextTick().then(() => {
        this.show = true;
      });
    }
```
