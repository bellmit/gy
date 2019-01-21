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
    // 推广-图片状态
    imgStatus: function (v) {
        const val = parseInt(v);
        if (val === 0) {
            return '无效';
        }
        if (val === 1) {
            return '有效';
        }
        return '';
    },
    // 推广-推荐分类
    postionType: function (v) {
        const val = parseInt(v);
        if (val === 10) {
            return '平台首页-热门推荐(商品)（上部）';
        }
        if (val === 20) {
            return '平台首页-推荐店铺（下部）';
        }
        if (val === 30) {
            return '商城首页-推荐商品（上部）';
        }
        if (val === 31) {
            return '商城首页-化工商城';
        }
        if (val === 32) {
            return '商城首页-油品商城';
        }
        if (val === 33) {
            return '商城首页-塑料商城';
        }
        if (val === 34) {
            return '商城首页-其他';
        }
        if (val === 40) {
            return '商城首页-热门推荐(店铺)（上部）';
        }
        if (val === 41) {
            return '商城首页-热门店铺（下部）';
        }
        if (val === 50) {
            return '商城首页-最新资讯';
        }
        if (val === 51) {
            return '仓储首页-推荐仓储(公司)（底部）';
        }
        if (val === 52) {
            return '物流首页-推荐物流(公司)（底部）';
        }
        return '';
    },
    // 推广-推荐项目
    itemType: function (v) {
        const val = parseInt(v);
        if (val === 1) {
            return '商品';
        }
        if (val === 2) {
            return '店铺';
        }
        if (val === 3) {
            return '产品';
        }
        if (val === 4) {
            return '资讯';
        }
        return '';
    },
    // 推广-广告分类
    positionADType: function (v) {
        const val = parseInt(v);
        if (val === 1) {
            return '平台首页环腰广告';
        } else if (val === 2) {
            return '商城首页推荐位广告';
        } else if (val === 3) {
            return '积分商城广告';
        }
        return '';
    },
    // 数字转金额显示
    numToCash: function (value, num = 2) {
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
            return start + '.' + end;
        }
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
        data = y + '-' + format(m) + '-' + format(d) + ' ';
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
    formatDate (val, model = 'YYYY-MM-DD hh:mm:ss') {
        const fNum = (n) => parseInt(n, 10) < 10 ? `0${n}` : `${n}`;
        if (typeof val === 'string') {
            val = val.replace(/-/g, '/');
        }
        const date = new Date(val);
        const chinese = ['一', '二', '三', '四', '五', '六', '日'];
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const week = date.getDay();
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const time = date.getTime();
        if (model === 'time' || model === 'Time') {
            return time;
        }
        model = model.replace(/YYYY/, year);
        model = model.replace(/YY/, (year + '').slice(2));
        model = model.replace(/MM/, fNum(month));
        model = model.replace(/M/, month);
        model = model.replace(/[wW]+/, `星期${chinese[week]}`);
        model = model.replace(/DD/, fNum(day));
        model = model.replace(/D/, day);
        model = model.replace(/hh/, fNum(hour));
        model = model.replace(/h/, hour);
        model = model.replace(/mm/, fNum(minute));
        model = model.replace(/m/, minute);
        model = model.replace(/ss/, fNum(second));
        model = model.replace(/s/, second);
        return model;
    },
    toMoney (val = 0) {
        return parseFloat(val.toFixed(2)).toLocaleString();
    },
    valid: function (valStal) {
        const val = parseInt(valStal);
        if (val === null || val === undefined || val === '' || val === !NaN) {
            return '';
        }
        if (val === 1) {
            return '可用';
        }
        if (val === 0) {
            return '不可用';
        }
    },
    orderState: function (val) {
        const v = parseInt(val);
        if (v === null || v === undefined || v === '' || v === !NaN) {
            return '';
        }
        if (v === 4) {
            return '成功';
        }
        if (v === 5) {
            return '失效';
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
    }
};
