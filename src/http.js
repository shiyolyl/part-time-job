import axios from 'axios'
import router from './router/router';
import { MessageBox } from 'element-ui';

// axios 配置
axios.defaults.timeout = 50000;
let baseURL;
if (process.env.NODE_ENV === 'development') {
    baseURL = window.gl_host.SERVICE_DEVELPMENT_PATH;
// 编译环境
} else {
    // 测试环境
    if (process.env.type === 'test') {
        baseURL = window.gl_host.SERVICE_TEST_PATH;
    // 正式环境
    } else {
        baseURL = window.gl_host.SERVICE_PRODUCTION_PATH;;
    }
}
axios.defaults.baseURL = baseURL; 

// http request 拦截器
axios.interceptors.request.use(
    config => {
        config.headers = {
            'Content-Type': 'application/json'
        };
        let token = sessionStorage.token;
        if (token) {
            // config.headers.token = 'Bearer ' + token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
axios.interceptors.response.use(
    response => {
        // console.log(response)
        // if(response.data.code!==1001){
        //     if(response.data.msg!=='返回失败' && response.data.code!==1000){
        //         MessageBox.alert(response.data.msg, '提示', {
        //             confirmButtonText: '确定',
        //                 callback: action => {
        //             }
        //         });
        //     }
        // }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    window.sessionStorage.removeItem("token");
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    });
            }
        }
        return Promise.reject(error.response)
    });

export default axios;