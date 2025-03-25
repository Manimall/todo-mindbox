import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/todo-mindbox/' : '/',
  server: {
    port: 3000,
    open: true,
    host: true
  },
  preview: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    },
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components')
    }
  },
  optimizeDeps: {
    include: [
      '@chakra-ui/react',
      '@chakra-ui/icons',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion'
    ]
  },
})
