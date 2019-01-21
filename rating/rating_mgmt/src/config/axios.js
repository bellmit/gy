import Vue from 'vue';
import axios from 'axios';
// import { MessageBox } from 'element-ui';
// import router from '@/router/index';
import store from '../store/index';

Vue.prototype.$http = axios;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
axios.defaults.baseURL = process.env.API_ROOT_MAIN;
axios.interceptors.request.use(function (config) {
    store.dispatch('setShowLoading');
    return config;
}, function (err) {
    return Promise.reject(err);
});
axios.interceptors.response.use(function (response) {
    store.dispatch('setHideLoading');
    if (response.data.code === 401) {
        localStorage.removeItem('userInfo');
        // MessageBox.alert(response.data.message, '提示')
        //     .then(() => {
        // router.push({name: 'login'});
        // localStorage.removeItem('userInfo');
        //     });
    }
    return response;
}, function (err) {
    return Promise.reject(err);
});

export default {
};
