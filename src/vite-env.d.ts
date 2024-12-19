/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module 'views/index.vue'

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 环境变量 TypeScript的智能提示
interface ImportMetaEnv {
  VITE_APP_TITLE: string
  VITE_APP_PORT: string
  VITE_APP_BASE_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
