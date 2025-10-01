import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(`${process.cwd()}/.env`, '')

  return {
    base: `/${env.VITE_BUCKET_NAME}/`,
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      watch: {
        usePolling: true // ensures file changes in mounted volumes are detected
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      css: false,
      globals: true,
      include: ['src/tests/unit/*.{test,spec}.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
      },
    }
  }
})
