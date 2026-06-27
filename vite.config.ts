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
    rollupOptions: {
      output: {
        // 拆分大型 3D/动画依赖，避免 Lanyard lazy chunk 过大、改善并行加载与缓存命中
        manualChunks: {
          three: ['three'],
          'react-three-fiber': ['@react-three/fiber'],
          'react-three-drei': ['@react-three/drei'],
          'react-three-rapier': ['@react-three/rapier', '@dimforge/rapier3d-compat'],
          meshline: ['meshline'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          // 排除 Lanyard 文件：react-dev-locator 会给 JSX 注入 trae-inspector-*
          // 属性，meshline 的 meshLineMaterial/meshLineGeometry 不在插件内置的
          // three 元素白名单里，R3F 会把这些属性当成 three 对象的嵌套属性链应用
          // （material.trae.inspector...）而崩溃。排除该文件可避免注入。
          ['react-dev-locator', { excludes: [/Lanyard/] }],
        ],
      },
    }),
    tsconfigPaths()
  ],
})
