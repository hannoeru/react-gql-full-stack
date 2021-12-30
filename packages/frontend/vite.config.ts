import { resolve } from 'path'
import { defineConfig } from 'vite'
import Preact from '@preact/preset-vite'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Preact(),
    Unocss(),
  ],
})
