/**
 * 工具类的全局函数定义
 */

// 数字转金额显示(默认两位小数)
const formatNumber = function (value, num, trimZero) {
    // 返回处理后的值
    value = parseFloat(value);
    let rstVal = '';
    if (value === null || value === undefined || value === '' || value === 0 || value === !NaN || !value) {
        value = 0;
        rstVal = value.toFixed(num);
    } else {
        let isMinus = 0;
        if (value < 0) {
            isMinus = 1;
            value = value * -1;
        }
        value = value.toFixed(num);
        let end = value.split('.')[1];
        let start = value.split('.')[0];
        let arr = [];

        start = start.split('').reverse();
        start.map(function (elem, index) {
            arr.push(elem);
            if (index % 3 === 2 && index !== value.length - 1 && index !== start.length - 1) {
                arr.push(',');
            }
        });

        start = arr.reverse().join('');
        if (isMinus) {
            start = '-' + start;
        }
        rstVal = start + '.' + end;
    }
    if (trimZero && rstVal.indexOf('.') > 0) {
        while (rstVal.lastIndexOf('0') === rstVal.length - 1) {
            rstVal = rstVal.substring(0, rstVal.length - 1);
        }
        if (rstVal.lastIndexOf('.') === rstVal.length - 1) {
            rstVal = rstVal.substring(0, rstVal.length - 1);
        }
    }
    return rstVal;
};

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
    let o = {
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
    for (let k in o) {
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
    if (!(/^1[3456789]\d{9}$/.test(value))) {
        return false;
    } else {
        return true;
    }
};

// 身份证号验证
const verifyIdCard = function (code) {
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code))) {
        return false;
    } else {
        return true;
    }
};

// 保留N位小数
const toFixedFn = function (data, val) {
    let numbers = '';
    for (let i = 0; i < val; i++) {
        numbers += '0';
    }
    let s = 1 + numbers;
    let spot = '.' + numbers;
    let value = Math.round(parseFloat(data) * s) / s;
    let d = value.toString().split('.');
    if (d.length === 1) {
        value = value.toString() + spot;
        return value;
    }
    if (d.length > 1) {
        if (d[1].length < 2) {
            value = value.toString() + '0';
        }
        return value;
    }
};

// 下载附件
let exporttoExcel = function (that, url, data, fileName, defaultTimeout) {
    let postParams = {responseType: 'blob'};
    if (defaultTimeout) {
        postParams.timeout = defaultTimeout;
    }
    that.$http.post(url, data, postParams).then(res => {
        if (res.data.type.indexOf('application/json') === 0) {
            // 这种情况下是后台返回了错误信息，不是正常的blob数据
            let blob = new Blob([res.data]);
            let reader = new FileReader();
            reader.readAsText(blob, 'utf-8');
            reader.onload = function (e) {
                let jsonObj = JSON.parse(reader.result);
                that.$message.error('下载文件时出错:  ' + jsonObj.message + '(errCode=' + jsonObj.code + ')');
            };
            return;
        }

        if (res.data.size > 0) {
            if (fileName == null || fileName === undefined) {
                // 如果前端页面未指定文件名，则使用后台传回的
                fileName = decodeURI(res.headers.filename);
            }
            var blob = new Blob([res.data]);
            if (window.navigator.msSaveOrOpenBlob) {
                // 兼容IE10
                navigator.msSaveBlob(blob, fileName);
            } else {
                let url = window.URL.createObjectURL(blob);
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
            }
            return;
        }
        that.$message.error('没有文件可下载');
    });
};

/**
 * 验证用户是否有指定权限
 * @param resName 权限编码，多个时逗号分隔
 */
let hasBizAuth = function (resName) {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo == null || userInfo === undefined) {
        console.log('hasBizAuth 用户未登录');
        return false;
    }
    let user = JSON.parse(userInfo);
    if (user && user.permissions) {
        if (resName.indexOf(',') > 0) {
            let roleArr = resName.split(',');
            for (var i in roleArr) {
                if (user.permissions.indexOf(roleArr[i]) > -1) {
                    return true;
                }
            }
        } else {
            if (user.permissions.indexOf(resName) > -1) {
                return true;
            }
        }
        console.log('hasBizAuth 用户无权限 account=' + user.account);
    } else {
        console.log('hasBizAuth 用户无登录信息 ' + userInfo);
    }
    return false;
};

// 文件上传时专用，根据文件路径或名称获取文件类型，(目前支持图片/pdf/word/excel)
let getFileTypeAlias = function (resName) {
    let fileTypeAlias = null;
    let fileName = resName.toLowerCase();
    if (fileName.lastIndexOf('.pdf') > 1) {
        fileTypeAlias = 'pdf';
    } else if (fileName.lastIndexOf('.doc') > 1 || fileName.lastIndexOf('.docx') > 1) {
        fileTypeAlias = 'word';
    } else if (fileName.lastIndexOf('.xls') > 1 || fileName.lastIndexOf('.xlsx') > 1) {
        fileTypeAlias = 'excel';
    } else {
        // 默认为图片，除非以后要支持其他格式
        fileTypeAlias = 'img';
    }
    return fileTypeAlias;
};

let convertDateEnd = function (dateVal) {
    if (dateVal) {
        dateVal = dateVal + 86399999;
    }
    return dateVal;
};

// 定义外部输出
export default {
    formatNumber,
    parseDate,
    formatDate,
    verifyMobile,
    toFixedFn,
    verifyIdCard,
    exporttoExcel,
    hasBizAuth,
    getFileTypeAlias,
    convertDateEnd
};
