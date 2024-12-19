/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
//declare声明宣告， 声明一个ambient module(即:没有内部实现的 module声明)
declare module 'views/index。vue'
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
//vite-env.d.ts

/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
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
