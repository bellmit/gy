import Vue from 'vue';
import elementUi from './config/element-ui';
import App from './App.vue';
import router from './router/index';
import stores from './store/index';
import axios from './config/axios';
import api from './config/api';
import echarts from 'echarts';
import md5 from 'js-md5';
import filters from './config/filter';
import tools from './config/tools';
import babelPolyfill from 'babel-polyfill';

// API
Vue.prototype.$api = api;

// MD5
Vue.prototype.$md5 = md5;

// 全局函数
Vue.prototype.$tools = tools;

// echarts
Vue.prototype.$echarts = echarts;

// Filter
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

/* eslint-disable no-new */
new Vue({
    router,
    axios,
    elementUi,
    babelPolyfill,
    store: stores,
    el: '#gycrm',
    render: (h) => h(App)
});
