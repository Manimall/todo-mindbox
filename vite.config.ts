import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@chakra-ui/react', '@chakra-ui/icons'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
    },
  },
  base: '/todo-mindbox/',
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  }
})
