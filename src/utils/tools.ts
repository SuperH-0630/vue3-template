export function getEnv() {
  return import.meta.env
}

/**
 * 获取图片路径
 * @param path
 */
export function getImageUrl(path: string) {
  interface Modules {
    [key: string]: any
  }

  const modules: Modules = import.meta.glob(
    '/(src|public)/**/*.{bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp,jpeg}',
    { eager: true }
  )
  return modules[path]?.default ?? null
}
