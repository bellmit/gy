// 常量定义
export default {

    // 支付方式
    tradeMode: [{
        value: '',
        label: '全部'
    }, {
        value: '1',
        label: '在线支付'
    }, {
        value: '21',
        label: '线下支付'
    }, {
        value: '22',
        label: '银行直付'
    }],

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

    // 交易订单状态
    orderStatusTrade: [{
        value: '',
        label: '全部'
    }, {
        value: '1',
        label: '签约'
    }, {
        value: '2',
        label: '收款与交割'
    }, {
        value: '3',
        label: '结算与复核'
    }, {
        value: '4',
        label: '完成'
    }, {
        value: '5',
        label: '失效'
    }],
    // 物流订单状态
    orderStatusLogistics: [{
        value: '',
        label: '全部'
    }, {
        value: '0',
        label: '待承运方签约'
    }, {
        value: '1',
        label: '待托运方签约'
    }, {
        value: '2',
        label: '签约失败'
    }, {
        value: '3',
        label: '合同执行'
    }, {
        value: '4',
        label: '合同待结算'
    }, {
        value: '5',
        label: '合同待确认'
    }, {
        value: '6',
        label: '结算被驳回'
    }, {
        value: '7',
        label: '待支付'
    }, {
        value: '8',
        label: '已完成'
    }],

    // 付款单状态
    paymentStatus: [{
        value: '',
        label: '全部'
    }, {
        value: '10',
        label: '已创建'
    }, {
        value: '20',
        label: '已确认'
    }, {
        value: '40',
        label: '已支付'
    }, {
        value: '50',
        label: '已完成'
    }, {
        value: '60',
        label: '已失效'
    }, {
        value: '8',
        label: '审批中'
    }],

    // 收款单状态
    collectionStatus: [{
        value: '',
        label: '全部'
    }, {
        value: '10',
        label: '未确认'
    }, {
        value: '20',
        label: '已确认'
    }, {
        value: '60',
        label: '已失效'
    }],

    // 审批状态
    approveType: ['未审批', '审批通过', '审批驳回', '已创建', '已上传', '未执行', '已执行', '已支付', '已开票']

};
