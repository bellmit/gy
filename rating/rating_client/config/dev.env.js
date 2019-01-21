'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    // API_ROOT_MAIN: '"http://192.168.33.224:8083"', // 朱兆文
    // API_ROOT_MAIN: '"http://192.168.10.20:8084"' // 客户端
    // API_ROOT_MAIN: '"http://192.168.33.181:8083"' // 宝哥
    // API_ROOT_MAIN: '"http://192.168.33.236:8084"' // 宁波

    // API_ROOT_MAIN: '"http://192.168.10.15:8083"' // CRM
    // API_ROOT_MAIN: '"http://192.168.33.236:8083"' // 宁波

    // API_ROOT_MAIN: '"http://192.168.33.243:8083"' // CRM
    // API_ROOT_MAIN: '"http://192.168.33.243:8084"' // leilei
    // API_ROOT_MAIN: '"http://192.168.33.236:8089"' // 宁波
    API_ROOT_MAIN: '"http://192.168.33.233:8084"' // 开海
    // API_ROOT_MAIN: '""'
});
