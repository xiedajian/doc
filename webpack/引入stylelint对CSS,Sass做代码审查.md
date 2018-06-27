
# stylelint是什么？

stylelint 是一个基于 Javascript 的代码审查工具，它易于扩展，支持最新的 CSS 语法，也理解类似 CSS 的语法。此外，因为它是基于 JavaScript，所以比起 Ruby 开发的 scss-lint 速度更快。

stylelint 是一个强大和现代的 CSS 审查工具，有助于开发者推行统一的代码规范，避免样式错误。stylelint 由 PostCSS 提供技术支持，所以它也可以理解 PostCSS 解析的语法，比如 SCSS。

PostCSS 是一个使用 JS 解析样式的插件集合，它可以用来审查 CSS 代码，也可以增强 CSS 的语法（比如变量和混合宏），还支持未来的 CSS 语法、行内图片等等。正因为PostCSS解析器，因此stylelint支持SCSS，Less以及新SugarSS。如果你想要实现另外一个自定义语法的支持，你可以通过PostLess得以实现！

PostCSS 的哲学是专注于处理一件事，并做到极致，目前它已经有了 200 多个插件，由于它们都是基于 JavaScript 编写的，所以运行速度非常快。


## 使用方法

上面copy写了一堆废话，其实不用我多言，既然你已经知道了stylelint那说明你已经遇到了css/scss不规范的难题且已经发现了stylelint的优点。下面，我们直接进入正题。

安装
npm install stylelint

引入
在package.json里面加入以下配置（参考），其中rules`里面是我自己加入的一些配置。
```
"stylelint": {
    "extends": "stylelint-config-standard",
    "rules": {
      "string-quotes": "single",
      "property-no-unknown": [
        true,
        {
          "ignoreProperties": [
            "composes"
          ]
        }
      ],
      "selector-pseudo-class-no-unknown": [
        true,
        {
          "ignorePseudoClasses": [
            "global"
          ]
        }
      ]
    }
  }
 ```
在这里要重点说一下stylelint-config-standard，该配置是 stylelint 的官方推荐配置，自己基于它来拓展的话会事半功倍。
