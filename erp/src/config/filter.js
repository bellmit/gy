import constant from '@/config/constant';
import tools from '@/config/tools';
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
            return '已创建';
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
        if (val === 4) {
            return '已创建';
        }
        if (val === 5) {
            return '审核中';
        }
        return '';
    },

    // 销售子交割状态
    sellDeliveryItemState: function (strVal) {
        const val = parseInt(strVal);
        if (val === 0) {
            return '已创建';
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
        if (val === 4) {
            return '已创建';
        }
        if (val === 5) {
            return '审核中';
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
        if (val === 2) {
            return '袋装';
        }
        if (val === 3) {
            return '槽车';
        }
    },
    // 付款类型
    paymentType: function (pay, payChannel) {
        const val = parseInt(pay);
        let output = null;
        if (val === 0) {
            output = '先款后货';
        }
        if (val === 1) {
            output = '先货后款';
        }
        if (val === 2) {
            output = '先货后款带票交割';
        }
        if (val === 3) {
            output = '先款后货，等通知卸货';
        }
        if (val === 4) {
            output = '先款后货，指定日期付款';
        }
        if (payChannel) {
            output += ' ' + constant.paymentTypeArr1[payChannel];
        }
        return output;
    },
    // 交割方式
    deliveryType: function (type) {
        const val = parseInt(type);
        if (val === 0) {
            return '全部支持';
        }

        for (let j = 0, len = constant.deliveryList.length; j < len; j++) {
            let typeVal = constant.deliveryList[j];
            if (typeVal.id === val) {
                return typeVal.name;
            }
        }
        return '';
    },
    // 单价类型
    priceType: function (type) {
        switch (type) {
        case 1:
            return '固定价';
        case 21:
            return '公式计价-以合同为准';
        case 22:
            return '公式计价-暂定价';
        default:
            return '-';
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
        if (bizType === 1 || bizType === 4 || bizType === 5 || bizType === 6) {
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
        if (val === 3 || val === 27) {
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
        if (val === 30) {
            return '用印申请审批';
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
    // 进项票
    entryTicket: function (type) {
        const val = parseInt(type);
        if (val === 0) {
            return '无进项票';
        }
        if (val === 1) {
            return '有进项票';
        }
    },
    entryTickets: function (type) {
        const val = parseInt(type);
        if (val === 0) {
            return '在途中';
        }
        if (val === 1) {
            return '已收到';
        }
        if (val === 2) {
            return '先开销项发票';
        }
    },
    // 付款说明
    payDescStr: function (type) {
        const val = parseInt(type);
        if (val === 1) {
            return '本笔资金支出为正常交割，我司需垫资';
        }
        if (val === 2) {
            return '本笔资金支出需先收到下家款项，我司无需垫资';
        }
        if (val === 3) {
            return '分批付款，以付款明细表为准';
        }
        return '-';
    },
    // 状态
    approveType: function (type) {
        const val = parseInt(type);
        if (val === 1) {
            return '一次审批';
        }
        if (val === 2) {
            return '批次审批';
        }
        return '-';
    },
    // 业务类型
    bizType: function (type) {
        const val = parseInt(type);
        if (val === 1) {
            return '高频交易';
        }
        if (val === 4) {
            return '准现货-现货';
        }
        // if (val === 5) {
        //     return '准现货-现货';
        // }
        if (val === 6) {
            return '准现货-长约';
        }
        return '-';
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
    // 数字格式化（数量, 默认3位小数）
    numToQuantity: function (value) {
        return tools.formatNumber(value, 3, true);
    },
    // 数字转金额显示(默认两位小数, 不去掉末尾'0')
    numToCash: function (value, trimZero = false) {
        return tools.formatNumber(value, 2, trimZero);
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
            return '--';
        }
        return '跌 ' + obj + '% 补 ' + item + '%';
    },
    // 没有内容是显示为'-'
    shownull (value) {
        return value || '-';
    },

    // 预警消息的分类
    alarmTypeList (value) {
        for (let j = 0, len = constant.alarmTypeList.length; j < len; j++) {
            let bizType = constant.alarmTypeList[j];
            if (bizType.value === value) {
                return bizType.label;
            }
        }
        return '';
    },

    // 合同交易类型
    contractTransactionTypeList (value) {
        for (let j = 0, len = constant.contractTradeTypeList.length; j < len; j++) {
            let bizType = constant.contractTradeTypeList[j];
            if (bizType.id === value) {
                return bizType.name;
            }
        }
        return '';
    },

    // 进项票显示
    incomeInvoice (hasReceiptInvoice, receiptInvoiceStatus) {
        if (hasReceiptInvoice === 1) {
            if (receiptInvoiceStatus === 0) {
                return '有进项票, 在途中';
            } else if (receiptInvoiceStatus === 1) {
                return '有进项票, 已收到';
            } else {
                return '有进项票';
            }
        } else if (hasReceiptInvoice === 0) {
            if (receiptInvoiceStatus === 2) {
                return '无进项票, 先开销项发票';
            } else {
                return '无进项票';
            }
        } else {
            return '';
        }
    },

    // 操作流程
    resultCode (resultCode, executeStatus) {
        let val = constant.approveType[resultCode];
        if (executeStatus === 3) {
            val = constant.approveType[12];
        }
        return val;
    },
    // 没有内容是显示为'-'
    showline (value) {
        return value || '--';
    },
    // 显示单价
    priceDisplay (skuPrice, skuPriceType, skuPriceExpression) {
        if (skuPriceType == null || skuPriceType === undefined) {
            return '--';
        }
        const val = parseInt(skuPriceType);
        if (val === 1 && skuPrice) {
            return '固定价　' + tools.formatNumber(skuPrice, 2, true);
        } else if (val === 21) {
            if (skuPriceExpression) {
                return '公式计价-以合同为准,　' + skuPriceExpression;
            } else {
                return '公式计价-以合同为准';
            }
        } else if (val === 22 && skuPrice) {
            return '公式计价-暂定价　' + tools.formatNumber(skuPrice, 2, true);
        } else {
            return '--';
        }
    },
    // 显示保证金
    depositDisplay (depositRatio, depositType, depositAmount) {
        if (depositType == null || depositType === undefined) {
            return '--';
        }
        const val = parseInt(depositType);
        if (val === 1 && depositRatio) {
            return '按比例　' + tools.formatNumber(depositRatio, 3, true) + '%';
        } else if (val === 2 && depositAmount) {
            return '按金额　' + tools.formatNumber(depositAmount, 2, true) + '元';
        } else {
            return '--';
        }
    },
    // 订单结算状态
    orderSettlementStatus: function (type) {
        const val = parseInt(type);
        if (val === 0) {
            return '';
        }

        for (let j = 0, len = constant.odrSettlementStatus.length; j < len; j++) {
            let typeVal = constant.odrSettlementStatus[j];
            if (typeVal.status === val) {
                return typeVal.name;
            }
        }
        return '';
    },
    // 支付方式  1: 在线支付 21:银行转账、22:银行电汇、23:银行承兑汇票、24:商业承兑汇票 25、支票 26、承兑汇票
    tradeMode: function (type) {
        const val = parseInt(type);
        if (val === 1) {
            return '在线支付';
        }
        if (val === 21) {
            return '银行转账';
        }
        if (val === 22) {
            return '银行电汇';
        }
        if (val === 23) {
            return '银行承兑汇票';
        }
        if (val === 24) {
            return '商业承兑汇票';
        }
        if (val === 25) {
            return '支票';
        }
        if (val === 26) {
            return '承兑汇票';
        }
        return '-';
    },
    // 付款单状态
    paymentBillStatus: function (type, payInfo) {
        const val = parseInt(type);
        if (payInfo.uploadFileStatus) {
            return '付款已完成';
        }
        if (val === 0 || val === 3) {
            return '审批中';
        }
        if (val === 1) {
            if (payInfo.payDesc === 3 && payInfo.approveType === 1 && payInfo.payStatus === 30) {
                return '付款中(分批)';
            }
            return '已审批通过';
        }
        if (val === 2) {
            return '审批驳回';
        }
        if (val === 3) {
            return '已取消';
        }
        return '-';
    },
    // 收款单状态
    collectionBillStatus: function (type) {
        const val = parseInt(type);
        if (val === 10) {
            return '确认中';
        }
        if (val === 20) {
            return '已确认';
        }
        return '-';
    }
};
