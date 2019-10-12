import Vue from 'vue';
import App from './App.vue';
import stores from './store/index';
import axios from './config/axios';
import babelPolyfill from 'babel-polyfill';
import Router from 'vue-router';

Vue.use(Router);

/* eslint-disable no-new */
new Vue({
    store: stores,
    axios,
    babelPolyfill,
    el: '#gymycenter',
    render: (h) => h(App)
});
