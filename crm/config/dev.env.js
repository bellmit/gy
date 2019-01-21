'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // API_ROOT_MAIN: '"http://192.168.33.163:8091"' // 张凯
    // API_ROOT_MAIN: '"http://192.168.33.224:8091"' // 朱兆文
    // API_ROOT_MAIN: '"http://192.168.33.181:8091"' // 王万宝
    // API_ROOT_MAIN: '"http://192.168.10.15:8091"' // 15
    API_ROOT_MAIN: '"http://192.168.10.20:8091"' // 20

});
