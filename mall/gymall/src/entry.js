import Vue from 'vue';
import elementUi from './config/element-ui';
import App from './App.vue';
import router from './router/index';
import stores from './store/index';
import axios from './config/axios';
import api from './config/api';
import md5 from 'js-md5';
import filters from './config/filter';
import tools from './config/tools';
import echarts from 'echarts';
import babelPolyfill from 'babel-polyfill';
import lazyLoad from 'vue-lazyload';

Vue.use(lazyLoad);

// echarts
Vue.prototype.$echarts = echarts;
// API
Vue.prototype.$api = api;

// MD5
Vue.prototype.$md5 = md5;

// 全局函数
Vue.prototype.$tools = tools;

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
    el: '#gymall',
    render: (h) => h(App)
});
