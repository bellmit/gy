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
import constant from './config/constant';
import echarts from 'echarts';
import babelPolyfill from 'babel-polyfill';
import { isAuth } from '@/utils';
// 富文本编辑器

// API
Vue.prototype.$api = api;

// MD5
Vue.prototype.$md5 = md5;

// 全局方法
Vue.prototype.$tools = tools;

// constant
Vue.prototype.$constant = constant;

// Filter
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

// 挂载全局
Vue.prototype.isAuth = isAuth; // 权限方法

// echarts
Vue.prototype.$echarts = echarts;

// 路由跳转回到顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

/* eslint-disable no-new */
new Vue({
    router,
    axios,
    elementUi,
    babelPolyfill,
    store: stores,
    el: '#gyadmin',
    render: (h) => h(App)
});
