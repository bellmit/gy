import Vue from 'vue';
import elementUi from './config/element-ui';
import App from './App.vue';
import router from './router/index';
import stores from './store/index';
import axios from './config/axios';
import api from './config/api';
import filters from './config/filter';
import babelPolyfill from 'babel-polyfill';

// API
Vue.prototype.$api = api;

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
    el: '#gywarehouse',
    render: (h) => h(App)
});
