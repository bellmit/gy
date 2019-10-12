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

// 定义外部输出
export default {
    parseDate,
    formatDate
};
