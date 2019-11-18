'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    API_ROOT_MAIN: '"http://192.168.10.132:8081"',
    // API_ROOT_MAIN: '"http://192.168.10.132:8081"',
    // API_ROOT_MAIN: '"http://192.168.33.229:8081"',
    // API_ROOT_MAIN: '"https://uat.chinayie.com/api/trade"',
    SOCKETIO: '"http://192.168.10.132:9092"'
});
