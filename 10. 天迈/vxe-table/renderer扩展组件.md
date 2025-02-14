

# vxe-table使用renderer扩展

```
import { VXETable, throttle, debounce, xeUtils } from "@tiamaes/vxe-table";

VXETable.renderer.add("FormItemInput", {
  renderItemContent(h, renderOpts, params) {
    const { data, property } = params;
    const props = renderOpts.props || {};
    return [<el-input v-model={data[property]} {...{ props }} placeholder={props.placeholder}></el-input>];
  }
});
VXETable.renderer.add("Buttons", {
  renderItemContent(h, renderOpts, params) {
    const { data, property } = params;
    const config = renderOpts.config || {
      code: "query",
      click: this.btnClickEvent,
      text: i18n.t('查询')
    };
    const props = renderOpts.props || {};
    return [
      <el-button
        onClick={e => {
          config.click(config.code);
        }}
        {...{ props }}
      >
        {config.text}
      </el-button>
    ];
  }
});
VXETable.renderer.add("FormItemSelect", {
  renderItemContent(h, renderOpts, params) {
    const { data, property } = params;
    const props = renderOpts.props || {};
    const options = renderOpts.config.options || [];
    return [
      <el-select v-model={data[property]} {...{ props }}>
        {options.map(option => (
          <el-option
            key={option.value}
            label={option.label}
            value={option.value}
          ></el-option>
        ))}
      </el-select>
    ];
  }
});

VXETable.renderer.add('ElImage', {
    renderDefault(h, renderOpts, params) {
        const { row, column } = params;
        const { events } = renderOpts;
        const { property } = column;
        const url = row[property];

        // TODO el-image 扩展属性 
        const { src, fit = 'cover', alt, referrerPolicy, lazy, scrollContainer, previewSrcList = [], zIndex, styleObject } = renderOpts.props || {};
        const style = styleObject || "width: 160px; height: 90px";
        // 事件
        const { onLoad, onError } = renderOpts.events || {};

        return [
            <el-image
                style={style}
                src={src || url}
                fit={fit}
                alt={alt}
                referrer-policy={referrerPolicy}
                lazy={lazy}
                scroll-container={scrollContainer}
                preview-src-list={previewSrcList}
                z-index={zIndex}
            >
            </el-image>
        ]
    },

})


VXETable.renderer.add('ElDateTimePicker', {
    // 项内容模板
    renderItemContent(h, renderOpts, params) {
        const { data, property } = params
        const { type, defaultTime, ...props} = renderOpts.props || {};
        return [
            <el-date-picker
                v-model={data[property]}
                type="datetime"
                placeholder="选择日期时间"
                {...{ props }}
            >
            </el-date-picker>
        ]
    }
});


// ElSelect
VXETable.renderer.add('$TgElSelect', {
    // 项内容模板
    renderItemContent(h, renderOpts, params) {
        const { data, property } = params;
        const { props = {}, events = {} } = renderOpts;
        const { options = [], optionProps = {}, complexOption, filterable, clearable, filterMethod, ...rest } = props;
        const labelKey = optionProps.label || 'label';
        const valueKey = optionProps.value || 'value';

        const { change, visibleChange } = events;
        const keys = property.split('.');    
        let model = data;   
        if (keys.length > 1) {
            // 'a.b.c'
            keys.forEach((key, index) => {
                if (index < keys.length - 1) {
                    model = model[key];
                }
            })
        } 

        const callEvent = (args, event) => {
            if (typeof event == 'function') {
                event(...args);
            }
        }

        return [
            <el-select
                v-model={model[keys[keys.length - 1]]}
                filterable={filterable}
                clearable={clearable}
                placeholder="请选择"
                filterMethod={filterMethod}
                {...{ rest }}
                onChange={(...args) => callEvent(args, change)}
                on-visible-change={(...args) => callEvent(args, visibleChange)}
            >
                {
                    options.map(option => {
                        return (<el-option
                            label={option[labelKey]}
                            value={option[valueKey]}
                            key={option[valueKey]}
                        >
                            {
                                complexOption && (<div>
                                    <span style="float: left">{option[complexOption.leftKey]}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{option[complexOption.rightKey]}</span>
                                </div>)
                            }
                        </el-option>)
                    })
                }
            </el-select>
        ]
    }
});


// 密码
VXETable.renderer.add('$password', {
    // 项内容模板
    renderItemContent(h, renderOpts, params) {
        const { data, property } = params
        const props = renderOpts.props || {}
        return [
            <vxe-input
                v-model={data[property]}
                type="password"
                {...{ props }}
            >
            </vxe-input>
        ]
    }
});


VXETable.renderer.add("FormItemCascader", {
  renderItemContent(h, renderOpts, params) {
    const { data, property } = params;
    const props = renderOpts.props || {};
    const options = renderOpts.config.options || [];
    // console.log(renderOpts, params)
    return [
      <el-cascader
        v-model={data[property]}
        options={typeof options === "function" ? options() : options}
        {...{ props }}
        onChange={
          (value) => props.events.change(value)
        }
      ></el-cascader>,
    ];
  },
});

```

