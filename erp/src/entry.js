import Vue from 'vue';
import babelPolyfill from 'babel-polyfill';
import elementUi from '@/config/element-ui';
import App from '@/App.vue';
import router from '@/router/index';
import stores from '@/store/index';
import axios from '@/config/axios';
import api from '@/config/api';
import filters from '@/config/filter';
import tools from './config/tools';
import constant from '@/config/constant';

// API
Vue.prototype.$api = api;

// STORE
Vue.prototype.$store = stores;

// STORE
Vue.prototype.$constant = constant;

// 全局函数
Vue.prototype.$tools = tools;

Vue.prototype.$filters = filters;

// Filter
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

// 自定义指令（注意：这个定义必须写在"new Vue()"之前）
Vue.directive('gyAuth', {
    bind (el, binding) {
        function hasAuth (resName) {
            let userInfo = localStorage.getItem('userInfo');
            if (userInfo == null || userInfo === undefined) {
                return false;
            }
            let user = JSON.parse(userInfo);
            if (user && user.permissions) {
                if (user.permissions.indexOf(resName) > -1) {
                    return true;
                }
            }
            return false;
        }
        if (!hasAuth(binding.value)) {
            el.style.display = 'none';
        }
    }
});

/* eslint-disable no-new */
new Vue({
    router,
    axios,
    elementUi,
    store: stores,
    babelPolyfill,
    el: '#gyerp',
    render: (h) => h(App)
});
