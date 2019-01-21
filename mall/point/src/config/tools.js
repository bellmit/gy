/**
 * 工具类的全局函数定义
 */

// 把时间戳数值格式输出为'yyyyMMdd'格式
const parseDate = (obj) => {
    if (obj === '' || obj == null) {
        return '';
    }
    const date = new Date(obj);
    const y = 1900 + date.getYear();
    const m = '0' + (date.getMonth() + 1);
    const d = '0' + date.getDate();
    return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length);
};

// 格式化js的Date对象
const formatDate = function (obj, format) {
    var o = {
        'M+': obj.getMonth() + 1, // month
        'd+': obj.getDate(), // day
        'h+': obj.getHours(), // hour
        'm+': obj.getMinutes(), // minute
        's+': obj.getSeconds(), // second
        'q+': Math.floor((obj.getMonth() + 3) / 3), // quarter
        'S': obj.getMilliseconds() // millisecond
    };
    let rstlStr = format;
    if (/(y+)/.test(rstlStr)) {
        rstlStr = rstlStr.replace(RegExp.$1,
            (obj.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(rstlStr)) {
            rstlStr = rstlStr.replace(RegExp.$1,
                RegExp.$1.length === 1 ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return rstlStr;
};

// 手机号验证
const verifyMobile = function (value) {
    if (!(/^1[345789]\d{9}$/.test(value))) {
        return false;
    } else {
        return true;
    }
};

// 邮编验证
const verzipCode = function (value) {
    if (!(/^[0-9]{6}$/.test(value))) {
        return false;
    } else {
        return true;
    }
};

// 保留N位小数
const toFixedFn = function (value, n) {
    if (value % 1 === 0) {
        return value;
    } else {
        return value.toFixed(n).replace(/0+$/g, '');
    }
};

let downloadFile = function (that, url, pa, name) {
    that.$http({
        method: 'post',
        url: url,
        responseType: 'blob',
        data: pa
    }).then(res => {
        // let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'}, name);
        // let objectUrl = URL.createObjectURL(blob);
        // window.location.href = objectUrl;
        let blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        downloadElement.download = name; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
    });
};

// 定义外部输出
export default {
    parseDate,
    formatDate,
    verifyMobile,
    verzipCode,
    toFixedFn,
    downloadFile
};
