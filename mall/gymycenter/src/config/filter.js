import tools from '@/config/tools';
export default {
    minute2hour (time) {
        let hour;
        hour = (time % 60 === 0) ? time / 60 : (time / 60).toFixed(1);
        return hour;
    },
    cutstring (str, len) {
        let newstr;
        newstr = str.length > len ? (str.substring(0, len) + ' ...') : str;
        return newstr;
    },
    date: function (time, hour) { // 把时间戳格式:若有参返回年-月-日时:分:秒 若无参返回 年-月-日
        if (!time) {
            return '-';
        }
        let y, m, d, date, h, ms, s, data, hours;
        date = new Date(time);
        y = date.getFullYear();
        m = date.getMonth() + 1;
        d = date.getDate();
        h = date.getHours();
        ms = date.getMinutes();
        s = date.getSeconds();
        data = y + '-' + format(m) + '-' + format(d);
        hours = format(h) + ':' + format(ms) + ':' + format(s);
        if (hour) {
            return data + ' ' + hours;
        } else {
            return data;
        }
        function format (num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        }
    },
    datems: function (time, hour) { // 把时间戳格式:若有参返回年-月-日时:分 若无参返回 年-月-日
        if (!time) {
            return '--';
        }
        let y, m, d, date, h, ms, data, hours;
        date = new Date(time);
        y = date.getFullYear();
        m = date.getMonth() + 1;
        d = date.getDate();
        h = date.getHours();
        ms = date.getMinutes();
        data = y + '-' + format(m) + '-' + format(d);
        hours = format(h) + ':' + format(ms);
        if (hour) {
            return data + ' ' + hours;
        } else {
            return data;
        }
        function format (num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        }
    },
    // 格式化时间
    formatDate: function (date) { // 把时间戳格式:若有参返回年-月-日时:分:秒 若无参返回 年-月-日
        return (date + '').replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
    },
    dates: function (time, hour) { // 把时间戳格式:若有参返回年-月-日时:分:秒 若无参返回 年-月-日
        if (!time) {
            return '';
        }
        let y, m, d, date, h, ms, s, data, hours;
        date = new Date(time);
        y = date.getFullYear();
        m = date.getMonth() + 1;
        d = date.getDate();
        h = date.getHours();
        ms = date.getMinutes();
        s = date.getSeconds();
        data = '【' + y + '】' + '-' + '【' + format(m) + '】' + '-' + '【' + format(d) + '】';
        hours = format(h) + ':' + format(ms) + ':' + format(s);
        if (hour) {
            return data + ' ' + hours;
        } else {
            return data;
        }
        function format (num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        }
    },
    time: function timeStamp (StatusMinute) {
        var day = parseInt(StatusMinute / 60 / 24);
        var hour = parseInt(StatusMinute / 60 % 24);
        var min = parseInt(StatusMinute % 60);
        StatusMinute = '';
        if (day > 0) {
            StatusMinute = day + '天';
        }
        if (hour > 0) {
            StatusMinute += hour + '小时';
        }
        if (min > 0) {
            StatusMinute += parseFloat(min) + '分钟';
        }
        return StatusMinute;
    },
    // 支付方式
    tradeMode: function (strVal) {
        if (!strVal) {
            return '';
        }
        const val = parseInt(strVal);
        if (val === 1) {
            return '在线支付';
        }
        if (val === 21) {
            return '线下支付';
        }
        if (val === 22) {
            return '银行直付';
        }
        if (val === 3) {
            return '积分支付';
        }
        if (val === 30) {
            return '线上担保支付';
        }
        if (val === 32) {
            return '票据担保支付';
        }
        if (val === 31) {
            return '票据支付';
        }
        return '';
    },
    // 付款类型
    payMethod: function (strVal) {
        if (!strVal) {
            return '';
        }
        const val = parseInt(strVal);
        if (val === 1) {
            return '货款';
        }
        if (val === 2) {
            return '保证金';
        }
        if (val === 3) {
            return '结算';
        }
        if (val === 4) {
            return '运费';
        }
        return '';
    },
    // 付款方式
    paymentType: function (strVal) {
        const val = parseInt(strVal);
        if (val === 0) {
            return '先款后货';
        }
        if (val === 1) {
            return '先货后款';
        }
        if (val === 10) {
            return '担保交易';
        }
        return '';
    },
    // 付款单类型
    paymentStatus: function (strVal) {
        if (!strVal) {
            return '';
        }
        const val = parseInt(strVal);
        if (val === 8) {
            return '审批中';
        }
        if (val === 10) {
            return '已创建';
        }
        if (val === 20) {
            return '已确认';
        }
        if (val === 40) {
            return '已支付';
        }
        if (val === 50) {
            return '已完成';
        }
        if (val === 60) {
            return '已失效';
        }
        return '';
    },
    // 收款单类型
    collectionStatus: function (strVal) {
        if (!strVal) {
            return '';
        }
        const val = parseInt(strVal);
        if (val === 10) {
            return '已创建';
        }
        if (val === 20) {
            return '已确认';
        }
        if (val === 50) {
            return '已完成';
        }
        if (val === 60) {
            return '已失效';
        }
        return '';
    },
    // 全局千位符
    toString: function (v) {
        return parseInt(v).toLocaleString();
        // return v.toLocaleString();
    },
    // 数字转金额显示
    // numToCash: function (value, num = 2) {
    //     // 返回处理后的值
    //     value = parseFloat(value);
    //     if (value === null || value === undefined || value === '' || value === 0 || value === !NaN || !value) {
    //         value = 0;
    //         return value.toFixed(num);
    //     } else {
    //         value = value.toFixed(num);
    //         let end = value.split('.')[1];
    //         let start = value.split('.')[0];
    //         let arr = [];

    //         start = start.split('').reverse();
    //         start.map(function (elem, index) {
    //             arr.push(elem);
    //             if (index % 3 === 2 && index !== value.length - 1 && index !== start.length - 1) {
    //                 arr.push(',');
    //             }
    //         });

    //         start = arr.reverse().join('');
    //         return start + '.' + end;
    //     }
    // },
    // 数字转金额显示(默认两位小数)
    numToCash: function (value, num = 2, trimZero = false) {
        return tools.formatNumber(value, num, trimZero);
    },
    // 千分位转化
    toThousand: value => {
        let reg = /\d{1,3}(?=(\d{3})+$)/g;
        return (value + '').replace(reg, '$&,');
    },
    // 数值转换为大写
    sumInWords (num) {
        num = Number(num).toFixed(2);
        var strOutput = '';
        var strUnit = '仟佰拾亿仟佰拾万仟佰拾圆角分';
        num += '00';
        if (num.charAt(0) === '-')num = num.substring(1);
        var intPos = num.indexOf('.');
        if (intPos >= 0) num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
        strUnit = strUnit.substr(strUnit.length - num.length);
        for (var i = 0; i < num.length; i++) {
            strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
        }
        return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(
            /零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+圆/, '圆')
            .replace(/亿零{0,3}万/, '亿').replace(/^圆/, '零圆').replace(/零分$/, '整')
            .replace(/^零圆/, '').replace(/^整$/, '零圆整');
    }
};
