export default {
    minute2hour: function (time) {
        let hour;
        hour = (time % 60 === 0) ? time / 60 : (time / 60).toFixed(1);
        return hour;
    },
    cutstring: function (str, len) {
        let newstr;
        newstr = str.length > len ? (str.substring(0, len) + ' ...') : str;
        return newstr;
    },
    date: function (time, hour) { // 把时间戳格式:若有参返回年-月-日时:分:秒 若无参返回 年-月-日
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
    // 交付方式
    deliveryType: function (strVal) {
        const val = parseInt(strVal);
        if (val === 0) {
            return '全部支持';
        }
        if (val === 1) {
            return '买家自提';
        }
        if (val === 2) {
            return '卖家代运';
        }
        return '';
    },
    // 付款方式
    payMentsType: function (strVal) {
        const val = parseInt(strVal);
        if (val === 0) {
            return '全部支持';
        }
        if (val === 1) {
            return '先货后款';
        }
        if (val === 2) {
            return '先款后货';
        }
        return '';
    },
    // 数字转金额显示
    numToCash: function (value, num = 2) {
        // 返回处理后的值
        value = parseFloat(value);
        if (value === null || value === undefined || value === '' || value === 0 || value === !NaN || value === !NaN || !value) {
            value = 0;
            return value.toFixed(num);
        } else {
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
            return start + '.' + end;
        }
    }
};
