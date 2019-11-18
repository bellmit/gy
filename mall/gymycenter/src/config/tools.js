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
        if (window.navigator.msSaveOrOpenBlob) {
            // 兼容IE10
            navigator.msSaveBlob(blob, name);
        } else {
            let downloadElement = document.createElement('a');
            let href = window.URL.createObjectURL(blob); // 创建下载的链接
            downloadElement.href = href;
            downloadElement.download = name; // 下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); // 点击下载
            document.body.removeChild(downloadElement); // 下载完成移除元素
            window.URL.revokeObjectURL(href); // 释放掉blob对象
        }
    });
};
let exporttoExcel = function (that, url, data, fileName) {
    that.$http.post(url, data, {responseType: 'blob', timeout: 60000}).then(res => {
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
            let blob = new Blob([res.data]);
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

let getFileTypeAlias = function (resName) {
    console.log(resName);
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

let invoiceType = {
    '01': '增值税专用发票',
    '04': '增值税普通发票纸质发票',
    '10': '增值税普通发票电子发票'
};
// 定义外部输出
export default {
    parseDate,
    formatDate,
    verifyMobile,
    toFixedFn,
    verifyIdCard,
    downloadFile,
    formatNumber,
    exporttoExcel,
    invoiceType,
    getFileTypeAlias
};
