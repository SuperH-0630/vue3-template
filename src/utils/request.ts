import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import {getXtoken, setXtoken} from "@/store/user"
import {ElMessage} from "element-plus"
import useUserStore, {isLogin} from "@/store/user"
import { ElMessageBox } from "element-plus"

export const config = {
    baseURL: import.meta.env.VITE_API_BASE || '/api'
}

const service: AxiosInstance = axios.create(config)

service.interceptors.request.use(
  (config): any => {
    const headers = {
        ...config.headers,
        'Content-Type': "application/form-data",
        "Accept": "application/json",
    }

    const xtoken = getXtoken()
    if (xtoken) {
        headers["X-Token"] = xtoken
    } else if (headers["X-Token"]) {
        delete headers["X-Token"]
    }

    return {
        ...config,
        headers: headers
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      if (response.data.code >= 1) {// 公共错误
          if (response.data.code === 1) {
              ElMessageBox.alert(response.data.msg || "您遇到了未知的错误", '提示', {
                  confirmButtonText: '好的',
                  callback: () => {},
              })
              return Promise.reject(response)
          } else if (response.data.code === 2) {
              const userStore = useUserStore()
              const router = useRouter()
              const route = useRoute()

              if (isLogin()) {
                  ElMessageBox.alert('您的登录已经过期，请重新登录。', '提示', {
                      confirmButtonText: '好的',
                      callback: () => {
                          userStore.logout()
                          ElMessage({
                              type: 'success',
                              message: '账号退出成功',
                          })
                          router.push({
                              "path": "/login",
                              "query": {
                                  "redirect": encodeURIComponent(route.fullPath),
                              },
                          })
                      },
                  })
              } else {
                  ElMessageBox.alert('请登陆后再新建操作。', '提示', {
                      confirmButtonText: '好的',
                      callback: () => {},
                  })
              }
          } else if (response.data.code === 3 || response.data.code === 4) {
              ElMessageBox.alert('你的权限不足。', '提示', {
                  confirmButtonText: '好的',
                  callback: () => {},
              })
          } else if (response.data.code === 5) {
              // 静默

              // ElMessageBox.alert('非测试模式，无法访问API。', '提示', {
              //     confirmButtonText: '好的',
              //     callback: () => {},
              // })
          }
          return Promise.reject(response)
      } else if (response.data.code <= 1) {// 针对性错误
          ElMessageBox.alert(response.data.msg || "您遇到了错误", '提示', {
              confirmButtonText: '好的',
              callback: () => {},
          })
          return Promise.reject(response)
      } else if (response.data.code === 0) {// 正常
          const newToken = response.headers["X-Token"]
          if (newToken && getXtoken()) {
              setXtoken(newToken)
          }

          return Promise.resolve(response)
      }
      return Promise.reject(response)
    }

    ElMessageBox.alert("您遇到了未知的错误", '提示', {
        confirmButtonText: '好的',
        callback: () => {},
    })
    return Promise.reject(response)

  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export type Success = Result<success>
export type SuccessData = ResultData<success>

export type Result<T = unknown> = Promise<ResultData<T>> | any
export type ResultData<T = unknown> = AxiosResponse<result<T>> | any

export interface success {
    success: boolean
}

export interface result<T = unknown> {
  message: string
  code: number
  data: T
  [key: string]: any // 任意额外数学
}

export default service