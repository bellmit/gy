import Vue from 'vue';
import axios from 'axios';
import { Loading } from 'element-ui';

Vue.prototype.$http = axios;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 1000 * 10;
// axios.defaults.baseURL = process.env.API_ROOT_MAIN;
axios.defaults.baseURL = 'http://uat1.chinayie.com:8091';
// axios.defaults.baseURL = 'http://192.168.10.20:8091';

let loading;

let openLoading = () => {
    loading = Loading.service({
        lock: false,
        background: 'rgba(0, 0, 0, 0.7)'
    });
};

let closeLoading = () => {
    loading.close();
};

axios.interceptors.request.use(config => {
    openLoading();
    return config;
}, err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(response => {
    closeLoading();
    if (response.data.code === 401) {
        localStorage.removeItem('userInfo');
        location.href = `./#/login`;
        return;
    }
    return response;
}, err => {
    closeLoading.close();
    return Promise.reject(err);
});

export default {
};
