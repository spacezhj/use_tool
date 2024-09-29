import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

//创建 axios 实例
const service = axios.create({
    // baseURL: import.meta.env.VITE_APP_BASE_API,
    baseURL: "/api",
    timeout: 50000,

})

service.interceptors.request.use(
    (config:AxiosRequestConfig) => {
        // console.log(config)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (response:AxiosResponse) => {
        // console.log(response)
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default service
