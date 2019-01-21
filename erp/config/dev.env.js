'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT_MAIN: '"http://192.168.10.211:8095"'
  API_ROOT_MAIN: '"http://www.chinayie.com:8095"'
});

