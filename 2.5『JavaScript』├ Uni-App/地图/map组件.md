[map](https://uniapp.dcloud.io/component/map.html)


# map 组件

uni-app 自带的地图展示组件 `<map>`, 无需引入各依赖，直接使用。

- APP		高德原生APP版SDK。分别申请安卓，ios的key。配到 manifest.json > APP模块配置 > Maps > 高德地图key
- H5		腾讯地图，需申请webkey，配到 manifest.json > h5配置 > 定位于地图 > 腾讯地图key
- 微信mp	腾讯地图，无需申请。自定义样式时 需按小程序文档去腾讯地图申请



## 其中 APP 版地图最为麻烦

开发期间：HBuilderX标准基座默认使用高德地图SDK，可以直接真机运行测试，此时配置的应用包名、签名信息不生效，正式发布前请提交云端

自定义基座：需使用自己申请的key

发布期间：需使用自己申请的key，App模块配置需提交云端打包后才能生效




[APP端使用地图指南](https://uniapp.dcloud.io/tutorial/app-maps.html)


## APP申请高德key

[高德开放平台](https://lbs.amap.com/) 登录进入控制台 - 创建应用 - 创建key

安卓需要资料
- 发布版安全码SHA1				# HbuilderX 使用云端证书 打包的应用可登录DCloud开发者中心控制台查看证书详情，包含SHA1
- PackageName


ios需要资料
- 安全码Bundle ID


