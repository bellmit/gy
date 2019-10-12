'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_ROOT_MAIN: '"http://192.168.33.232:8081"',
    SOCKETIO: '"http://192.168.10.129:9092"'
});
