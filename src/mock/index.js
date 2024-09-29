// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
// if (import.meta.env.NODE_ENV !== 'production' || import.meta.env.VUE_APP_PREVIEW === 'true') {

// 使用同步加载依赖
// 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
console.log('[antd-pro] mock mounting')
import Mock from 'mockjs2'
// require('./services/user')
import './services/user'

Mock.setup({
    timeout: 800 // setter delay time
})
console.log('[antd-pro] mock mounted')
// }
