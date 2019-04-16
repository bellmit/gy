'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    SOCKETIO: '"http://192.168.10.132:9092"',
    API_ROOT_MAIN: '"http://uat1.chinayie.com:8091"'
});
