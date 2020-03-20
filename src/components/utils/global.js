export default {
    install(Vue, options) {
        let baseURL;
        // // 地址配置更改至static->urlCofig.js
        if (process.env.NODE_ENV === 'development') {
            baseURL = window.gl_host.SERVICE_DEVELPMENT_PATH;
        // 编译环境
        } else {
            // 测试环境
            if (process.env.type === 'test') {
                baseURL = window.gl_host.SERVICE_TEST_PATH;
            // 正式环境
            } else {
                baseURL = window.gl_host.SERVICE_PRODUCTION_PATH;
            }
        };
        Vue.prototype.global = {
            uploadUrl: baseURL
        }
    }
}


