[sentry](https://boards.greenhouse.io/sentry)
[github](https://github.com/getsentry/sentry-javascript)
[sentry for uniapp](https://ask.dcloud.net.cn/article/40000)
[sentry](https://sentry.io/)


# sentry

1.注册 sentry 账号
 
 创建组织，项目。配置设置。
 
 
2.接入sdk

以 vue 项目为例
```
 npm i @sentry/vue @sentry/tracing
```
main.js 使用
```
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
Sentry.init({
  Vue,
  dsn: "https://a00ce6e7f6504f39b8095d9c7a36b816@o1422984.ingest.sentry.io/6773958",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      // tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

```


3.查看监控后台即可