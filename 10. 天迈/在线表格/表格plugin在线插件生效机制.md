```
// 用来将在线写的 plugin 字符串声明成全局组件
export function createComponent(plugins, {pageId, versionId}) {
    if (!Array.isArray(plugins)) return;
    const prefix = getComponentPrefix(pageId, versionId);
    plugins.forEach((plugin) => {
        const { name, _codeString } = plugin;
        if (_codeString && typeof _codeString == "string") {
          const options = makeComponentOptions(atou(_codeString));
          // console.log('create component', prefix + name, options);
          getVue().component(prefix + name, options);
        }
    });
}

export function getComponentPrefix(pageId, versionId) {
  return `m1-${pageId}-${versionId}-`;
}

export function getSource(type, source) {
    const reg = new RegExp(`<${type}[^>]*>`);
    let content = source;
    let matches = content.match(reg);
    if (matches) {
        let start = content.indexOf(matches[0]) + matches[0].length;
        let end = content.lastIndexOf(`</${type}`);
        return content.slice(start, end);
    }
}

// const compiler = require('vue-template-compiler')
export function makeComponentOptions(source) {
    if (typeof source !== 'string') {
        if (process.env.NODE_ENV !== 'production') {
            console.error('代码模板的数据格式不正确: ', source);
        }
        return
    }

    const template = getSource("template", source);
    if (!template) {
        console.error('代码片段找不到 template 标签，请检查: ', source);
        return;
    };
    let script = getSource("script", source);
    if (script) {
        script = script.replace(/export default/, "return");
    }

    let options = new Function(script)();
    // const res = compiler.compile(template)
    // console.log('make component :', template, res)
    options.template = template;

    return options;
}

const cssId = 'custom-table-template-css';

export function createStyle(id, source) {
    if (!source) return;
    // 处理 style
    const css = getSource("style", source);
    if (css) {
        const style = document.createElement("style");
        style.id = id || cssId;
        style.innerHTML = css;
        document.getElementsByTagName("head")[0].appendChild(style);
    }
}

export function removeStyle(id) {
    const $target = document.getElementById(id || cssId);
    if ($target) $target.parentNode.removeChild($target);
}
```

设计时存储的是字符串，使用时先转化为全局组件。

