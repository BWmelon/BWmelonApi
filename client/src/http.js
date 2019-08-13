import axios from "axios";
import {Message, Loading} from 'element-ui';
import router from './router';

let loading;
function startLoading() {
    loading = Loading.service({
        lock:true,
        text:"拼命加载中...",
        background: "rgba(0,0,0,0.7)"
    })
}

function endLoading() {
    loading.close();
}

// 请求拦截
axios.interceptors.request.use(
    config => {
        // 加载动画
        startLoading();

        if(localStorage.BWmelonApiToken) {
            // 设置统一的请求头header
            config.headers.Authorization = localStorage.BWmelonApiToken;
        }
        return config;
    },
    err => {
        return Promise.reject(error)
    }
)

// 响应拦截
axios.interceptors.response.use(response => {
    // 结束加载动画
    endLoading();
    return response;
},
error => {
    // 错误信息
    endLoading();
    Message.error(error.response.data);

    // 获取错误状态码
    const { status } = err.response;
    if(status == 401) {
        Message.error("登录状态失效，请重新登录");
        // 清除token
        localStorage.removeItem("BWmelonApiToken");
        // 跳转登录页面
        router.push('/login');
    }

    return Promise.reject(error);
})

export default axios;