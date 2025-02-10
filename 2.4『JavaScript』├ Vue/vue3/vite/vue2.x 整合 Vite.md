
[vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2)

# vite-plugin-vue2 适配 vue2

```
yarn add -D vite
yarn add -D sass
yarn add -D vite-plugin-vue2
```

接下来，创建配置文件vite.config.js
```
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        createVuePlugin()
    ],
    resolve: {
        alias: {
            "@components": resolve(__dirname, "./src/components"),
            "@/": resolve(__dirname, "./src")
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                ui: resolve(__dirname, 'src/pages/ui/index.html'),
            },
        }
    },
    
})
```


package.json
```
"scripts":{
	"dev": "vite",
}
```