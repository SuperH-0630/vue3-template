import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import {ElMessage} from "element-plus"
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
      return Promise.resolve(response)
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