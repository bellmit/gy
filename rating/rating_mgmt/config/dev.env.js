'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    // API_ROOT_MAIN: '"http://192.168.33.224:8083"' // 朱兆文
    API_ROOT_MAIN: '"http://192.168.10.20:8083"' // 服务器
    // API_ROOT_MAIN: '"http://192.168.33.181:8083"' // 宝哥
    // API_ROOT_MAIN: '"http://192.168.33.236:8084"' // 宁波

    // API_ROOT_MAIN: '"http://192.168.10.15:8083"' // CRM
    // API_ROOT_MAIN: '"http://192.168.33.233:8083"' // 开海

    // API_ROOT_MAIN: '"http://192.168.33.243:8083"' // CRM
    // API_ROOT_MAIN: '"http://192.168.33.243:8083"' // leilei
});
