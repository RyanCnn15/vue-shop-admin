import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import WindiCSS from 'vite-plugin-windicss';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
        open: true,
        proxy: {
            '/api': {
                target: 'http://ceshi13.dishait.cn',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        vue(),
        WindiCSS(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
});
