import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwind from 'tailwindcss'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins:[tailwind()]
    }
  },
  resolve: {
    alias: {
      '@Utils': path.resolve(__dirname, 'src/utils'),
    }
  }

})
