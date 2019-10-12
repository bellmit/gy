import Vue from 'vue';
import elementUi from '@/config/element-ui';
import App from '@/App.vue';
import router from '@/router/index';
import stores from '@/store/index';
import axios from '@/config/axios';
import api from '@/config/api';
import filters from '@/config/filter';
import babelPolyfill from 'babel-polyfill';
import tools from './config/tools';

// API
Vue.prototype.$api = api;

// 全局函数
Vue.prototype.$tools = tools;

// STORE
Vue.prototype.$store = stores;

// Filter
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

/* eslint-disable no-new */
new Vue({
    router,
    axios,
    elementUi,
    store: stores,
    babelPolyfill,
    el: '#gypoint',
    render: (h) => h(App)
});
