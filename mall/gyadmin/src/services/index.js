const services = {};

const req = require.context('./interface', false, /\.js$/);
const fileNameReg = /\w+(?=\.js$)/; // 捕获文件名正则
const moduleNames = req.keys().map(key => key.match(fileNameReg)); // 获得文件名数组
req.keys().map(req).forEach((item, index) => {
    services[moduleNames[index]] = item.default || item; // 循环添加 module
});

export default services;
