import {ConfigEnv, defineConfig, UserConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default ({mode}: ConfigEnv): UserConfig => {
    return {
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        resolve: {
            // Vite路径别名配置
            alias: {
                '@': path.resolve('./src')
            },
            //可以忽略/index.js 不写
            extensions:['.js','.vue',".ts"]
        },
        build:{
            outDir: 'dist',
            rollupOptions:{
                input:'index.html'
            },
            minify: 'terser'
        }
    }
}
