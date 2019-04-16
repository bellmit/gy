'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // API_ROOT_MAIN: '"http://uat1.chinayie.com:8091"'
    // API_ROOT_MAIN: '"http://192.168.33.243:8091"' // 戚爱雷
    API_ROOT_MAIN: '"http://192.168.10.20:8091"'
});
