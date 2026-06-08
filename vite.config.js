import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/hw5/',
  plugins: [vue()],
  build: {
    outDir: 'dist',          // 強制輸出到根目錄的 dist 資料夾
    emptyOutDir: true,       // 打包前先清空舊檔案
    assetsDir: 'assets',     // 確保 JS/CSS 放在 assets 子目錄內
  }
})
