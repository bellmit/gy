import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$http = axios;
// axios.defaults.withCredentials = true;
axios.defaults.timeout = 600000;
axios.defaults.baseURL = process.env.API_ROOT_MAIN;
axios.interceptors.request.use(function (config) {
    return config;
}, function (err) {
    return Promise.reject(err);
});
axios.interceptors.response.use(function (response) {
    return response;
}, function (err) {
    return Promise.reject(err);
});

export default {
};
