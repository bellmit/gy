'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // API_ROOT_MAIN: '"http://192.168.10.129:8081"',
    API_ROOT_MAIN: '"http://192.168.10.132:8081"',
    // API_ROOT_MAIN: '"http://192.168.33.233:8081"',
    // API_ROOT_MAIN: '"http://192.168.33.222:8081"',
    SOCKETIO: '"http://192.168.10.129:9092"',
    REGULATORYACCOUNT: '"15000091544186"',
    PINGANDIANZIHUIDANURL: '"https://my-st1.orangebank.com.cn/corporbank/attachedStandBookBillInput.do"'
});
