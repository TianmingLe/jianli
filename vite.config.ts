import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.glb'],
  optimizeDeps: {
    exclude: ['@dimforge/rapier3d-compat', '@react-three/rapier'],
  },
  server: {
    watch: {
      // Avoid ENOSPC in containers with low inotify limits by ignoring pnpm store
      ignored: ['**/node_modules/**', '**/.pnpm-store/**', '**/.git/**'],
    },
  },
  build: {
    sourcemap: 'hidden',
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    tsconfigPaths()
  ],
})
