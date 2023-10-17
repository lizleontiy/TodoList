import path from 'path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [checker({
    eslint: {
      lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
    }
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})