
import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons(),
    presetUno(),
  ],
  shortcuts: {
    'd-btn': 'flex items-center border px-4 py-2 text-lg rounded-md hover:bg-white/3',
  },
})
