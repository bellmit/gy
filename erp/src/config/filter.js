import constant from '@/config/constant';
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

        if (hour === 2) {
            hours = format(h) + ':' + format(ms);
        } else {
            hours = format(h) + ':' + format(ms) + ':' + format(s);
        }

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
    // 交割状态
    deliveryState: function (strVal) {
        const val = parseInt(strVal);
        if (val === 0) {
            return '交割中';
        }
        if (val === 1) {
            return '已完成';
        }
        if (val === 2) {
            return '未交割';
        }
        return '';
    },

    // 采购子交割状态
    buyDeliveryItemState: function (strVal) {
        const val = parseInt(strVal);
        if (val === 0) {
            return '未交割';
        }
        if (val === 1) {
            return '已完成';
        }
        return '';
    },

    // 销售子交割状态
    sellDeliveryItemState: function (strVal) {
        const val = parseInt(strVal);
        if (val === 0) {
            return '待审核';
        }
        if (val === 1) {
            return '已审核';
        }
        if (val === 2) {
            return '已驳回';
        }
        if (val === 3) {
            return '已完成';
        }
        return '';
    },

    // 包装标准
    packagingStandard: function (type) {
        const val = parseInt(type);
        if (val === 0) {
            return '散装';
        }
        if (val === 1) {
            return '桶装货';
        }
        if (val === 1) {
            return '袋装';
        }
    },
    // 交易类型
    paymentType: function (pay, payChannel) {
        const val = parseInt(pay);
        let output = null;
        if (val === 0) {
            output = '先款后货';
        }
        if (val === 1) {
            output = '先货后款';
        }
        if (payChannel) {
            output += '  ' + constant.paymentTypeArr1[payChannel];
        }
        return output;
    },
    // 交割方式
    deliveryType: function (type) {
        const val = parseInt(type);
        if (val === 0) {
            return '全部支持';
        }
        if (val === 1) {
            return '买家自提';
        }
        if (val === 2) {
            return '卖家代运';
        }
    },
    // 合同类型
    contractType: function (type) {
        const val = parseInt(type);
        if (val === 1) {
            return '双边合同';
        }
        if (val === 2) {
            return '采购合同';
        }
        if (val === 3) {
            return '销售合同';
        }
    },
    // 交易类型
    contractTradeType: function (contractType, bizTradeType) {
        const bizType = parseInt(bizTradeType);
        const val = parseInt(contractType);
        if (bizType === 1) {
            if (val === 2) {
                return '(上游交易)';
            }
            if (val === 3) {
                return '(下游交易)';
            }
        }
        if (bizType === 2) {
            if (val === 2) {
                return '(采购)';
            }
            if (val === 3) {
                return '(销售)';
            }
        }
    },
    // 业务类型
    businessTradeType: function (type1) {
        const val = parseInt(type1);
        for (let j = 0, len = constant.businessType4All.length; j < len; j++) {
            let bizType = constant.businessType4All[j];
            if (bizType.id === val) {
                return bizType.name;
            }
        }
        return '';
    },
    // 合同审批类型
    apprProcType: function (type) {
        const val = parseInt(type);
        if (val === 1) {
            return '合同要素审批';
        }
        if (val === 2) {
            return '合同审批';
        }
        if (val === 3) {
            return '付款审批';
        }
        if (val === 4) {
            return '开票审批';
        }
        if (val === 5) {
            return '收款';
        }
        if (val === 6) {
            return '收发票';
        }
        if (val === 7) {
            return '采购交割';
        }
        if (val === 8) {
            return '销售交割';
        }
        if (val === 21) {
            return '物流合同审批';
        }
        if (val === 23) {
            return '结算审批';
        }
        if (val === 24) {
            return '物流结算审批';
        }
    },
    // 付款渠道
    payChannel: function (type) {
        const val = parseInt(type);
        if (val === 1) {
            return '电汇';
        }
        if (val === 2) {
            return '银行承兑';
        }
        if (val === 3) {
            return '国内信用证';
        }
    },
    // 合同要素状态
    orderState: function (order) {
        const val = parseInt(order);
        if (val === 1) {
            return '合同要素已创建';
        }
        if (val === 2) {
            return '合同要素审核中';
        }
        if (val === 3) {
            return '合同要素已审核通过';
        }
        if (val === 4) {
            return '合同已创建';
        }
        if (val === 5) {
            return '合同审核中';
        }
        if (val === 6) {
            return '合同已审核通过';
        }
        if (val === 7) {
            return '合同要素审核驳回';
        }
        if (val === 8) {
            return '合同审核驳回';
        }
        if (val === 9) {
            return '已上传签章合同';
        }
    },
    // 交叉交割
    acrossDelivery: function (type) {
        const val = parseInt(type);
        if (val === 0 || val === undefined || isNaN(val)) {
            return '否';
        }
        if (val === 1) {
            return '是';
        }
    },
    // 状态
    deliveryStatus: function (type) {
        const val = parseInt(type);
        if (val === 0) {
            return '已提交';
        }
        if (val === 1) {
            return '已审核';
        }
        if (val === 2) {
            return '已驳回';
        }
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
    invoiceMonthValue (item, obj, bizTradeType) {
        if (item === null || item === undefined) {
            return '';
        }
        // 发票月份的显示
        const val = parseInt(item);
        if (bizTradeType === 2) {
            // 从交易商城来的数据
            if (val === 0) {
                return '交割当月';
            }
            if (val === 1) {
                return '交割次月';
            }
            if (val === 2) {
                if (obj === null || obj === undefined) {
                    return '';
                }
                return obj.provideInvoiceDays;
            }
        } else {
            if (val === 1) {
                return '交割月';
            }
            if (val === 2) {
                return '交割次月';
            }
            if (val === 3) {
                if (obj === null || obj === undefined) {
                    return '';
                }
                return '交割后' + obj.provideInvoiceDays + '工作日';
            }
        }
    },
    guaranteeAgreementValue (item, obj) {
        // 追保约定
        if (item === null || item === undefined || obj === null || obj === undefined || item === 0 || obj === 0) {
            return '无';
        }
        return '跌 ' + obj + '% 补 ' + item + '%';
    },
    // 没有内容是显示为'-'
    shownull (value) {
        return value || '-';
    }
};
