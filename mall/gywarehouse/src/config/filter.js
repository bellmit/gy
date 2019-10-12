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
    // 全局千位符
    toString (v) {
        return parseInt(v).toLocaleString();
        // return v.toLocaleString();
    },
    // 数字转金额显示
    numToCash (value, num = 2, isToFixed = 1) {
        if (value === '-') {
            return '-';
        }
        // 返回处理后的值
        value = parseFloat(value);
        if (value === null || value === undefined || value === '' || value === 0 || value === !NaN || !value) {
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
            if (isToFixed) {
                return start + '.' + end;
            } else {
                return start;
            }
        }
    },
    // 没有内容是显示为'-'
    shownull (value) {
        return value || '-';
    },
    // 手机号码隐藏显示'*'
    showstart (phone) {
        if (typeof phone === 'string') {
            return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }
    },
    // 公司中间隐藏显示'*'
    companystart (company) {
        if (company) {
            let nPhone = company.substr(0, 2) + '************' + company.substring(company.length - 2, company.length);
            return nPhone;
        }
    }
};
