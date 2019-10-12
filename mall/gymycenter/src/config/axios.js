import Vue from 'vue';
import axios from 'axios';
import stores from '../store/index';
import { MessageBox } from 'element-ui';

Vue.prototype.$http = axios;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 1000 * 10;
axios.defaults.baseURL = process.env.API_ROOT_MAIN;

axios.interceptors.request.use(function (config) {
    stores.dispatch('setShowLoading');
    return config;
}, function (err) {
    return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
    stores.dispatch('setHideLoading');
    if (response.data.code === 401) {
        localStorage.removeItem('userInfo');
        MessageBox.alert(response.data.message, '提示')
            .then(() => {
                location.href = `/my/#/login`;
            });
        return;
    }
    return response;
}, function (err) {
    return Promise.reject(err);
});

export default {
};
