import Vue from 'vue';
import elementUi from './config/element-ui';
import App from './home.vue';
import axios from './config/axios';
import router from './router/index';
import api from './config/api';
import babelPolyfill from 'babel-polyfill';
import stores from './store/index';

// API
Vue.prototype.$api = api;

/* eslint-disable no-new */
new Vue({
    router,
    axios,
    elementUi,
    babelPolyfill,
    store: stores,
    el: '#gyhome',
    render: (h) => h(App)
});
