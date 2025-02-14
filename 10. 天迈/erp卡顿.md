
```html
                <!-- <vxe-select
                  v-model="tableFormData[scope.$index][cIndex].value"
                  v-bind="getConfById(head.__config__.formId, scope.$index)"
                  :rowIndex="scope.$index"

@@ -131,7 +131,29 @@
                    :value="opt[head.__config__.props.value]"
                  >
                  </vxe-option>
                </vxe-select>
                </vxe-select> -->
                <ElSelectVirtual
                  v-model="tableFormData[scope.$index][cIndex].value"
                  :list="tableFormData[scope.$index][cIndex].options"
                  :label="head.__config__.props.label"
                  :value="head.__config__.props.value"
                  :keeps-params="10"
                  v-bind="getConfById(head.__config__.formId, scope.$index)"
                  :rowIndex="scope.$index"
                  :transfer="true"
                  @blur="
                    handleFormEvent('blur', scope.$index, cIndex, 'el-select')
                  "
                  @change="
                    onFormDataChange(
                      scope.$index,
                      cIndex,
                      'vxe-select',
                      arguments
                    )
                  "
                >
                </ElSelectVirtual>
```