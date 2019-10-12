'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // API_ROOT_MAIN: '"http://uat1.chinayie.com:8091"'
    API_ROOT_MAIN: '"http://192.168.10.132:8091"'
});
