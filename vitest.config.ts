/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";
import path from 'path'
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, './src/utils'),
      '@utils/': path.resolve(__dirname, './src/utils/'),
    },
  },
})
