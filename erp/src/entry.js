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
import inputCheckFunc from '@/utils/cont-ess-validate';

// API
Vue.prototype.$api = api;

// STORE
Vue.prototype.$store = stores;

// STORE
Vue.prototype.$constant = constant;

// 全局函数
Vue.prototype.$tools = tools;
Vue.prototype.$inputCheckFunc = inputCheckFunc;
Vue.prototype.$filters = filters;

// 全局自定义指令 'v-focus'
Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
    }
});
// Filter
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

// 自定义指令（注意：这个定义必须写在"new Vue()"之前）
// 备注：该指令不能用在'template'标签上，会不起作用，原因还未调查，切记！
Vue.directive('gyAuth', {
    bind (el, binding) {
        if (!tools.hasBizAuth(binding.value)) {
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
