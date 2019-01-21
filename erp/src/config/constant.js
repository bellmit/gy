export default {
    // 收款状态选项
    paymentStatusSell: [
        {
            name: '全部',
            status: null
        },
        {
            name: '未收款',
            status: 0
        },
        {
            name: '收款中',
            status: 1
        },
        {
            name: '已完成',
            status: 2
        }
    ],
    paymentStatusBuy: [
        {
            name: '全部',
            status: null
        },
        {
            name: '未付款',
            status: 0
        },
        {
            name: '付款中',
            status: 1
        },
        {
            name: '已完成',
            status: 2
        }
    ],
    // 订单状态(合同要素)
    orderStatus: ['', '合同要素已创建', '合同要素审核中', '合同要素已审核通过', '合同已创建', '合同审核中', '合同已审核通过', '合同要素审核驳回', '合同审核驳回', '已上传签章合同'],
    // 订单状态(合同要素)
    orderStatusList: [
        {
            name: '全部',
            id: null
        },
        {
            name: '合同要素审核中',
            id: 2
        },
        {
            name: '合同要素已审核通过',
            id: 3
        },
        {
            name: '合同审核中',
            id: 5
        },
        {
            name: '合同已审核通过',
            id: 6
        },
        {
            name: '合同要素审核驳回',
            id: 7
        },
        {
            name: '合同审核驳回',
            id: 8
        },
        {
            name: '已上传签章合同',
            id: 9
        }
    ],
    // 单边交易(合同类型)
    contractTypeList: [
        {
            name: '采购合同',
            id: 2
        },
        {
            name: '销售合同',
            id: 3
        }
    ],
    // 业务类型
    bizType4CreateEss: [
        {
            name: '请选择',
            id: null
        },
        {
            name: '高频交易',
            id: 1
        },
        {
            name: '准现货-流量',
            id: 4
        },
        {
            name: '准现货-现货',
            id: 5
        }
    ],
    businessType4Top: [
        {
            name: '全部',
            id: null
        },
        {
            name: '高频交易',
            id: 1
        },
        {
            name: '集采分销',
            id: 2
        },
        {
            name: '准现货',
            id: 3
        }
    ],
    businessType4Erp: [
        {
            name: '全部',
            id: null
        },
        {
            name: '高频交易',
            id: 1
        },
        {
            name: '准现货',
            id: 3
        },
        {
            name: '准现货-流量',
            id: 4
        },
        {
            name: '准现货-现货',
            id: 5
        }
    ],
    businessType4All: [
        {
            name: '全部',
            id: null
        },
        {
            name: '高频交易',
            id: 1
        },
        {
            name: '集采分销',
            id: 2
        },
        {
            name: '准现货',
            id: 3
        },
        {
            name: '准现货-流量',
            id: 4
        },
        {
            name: '准现货-现货',
            id: 5
        }
    ],
    // 货源
    sourceGoods: [
        {
            name: '进口'
        },
        {
            name: '国产'
        },
        {
            name: '自定义'
        }
    ],
    // 长约
    downstreamLongTerm: [
        {
            name: '长合约',
            id: 1
        },
        {
            name: '非长合约',
            id: 2
        }
    ],
    // 交易类型
    paymentType: [
        {
            name: '先款后货',
            id: 0
        },
        {
            name: '先货后款',
            id: 1
        }
    ],
    // 交易类型
    paymentTypeArr: ['先款后货', '先货后款'],
    // 交易类型
    paymentType1: [
        {
            name: '电汇',
            id: 1
        },
        {
            name: '银行承兑',
            id: 2
        },
        {
            name: '国内信用证',
            id: 3
        }
    ],
    // 交易类型
    paymentTypeArr1: ['', '电汇', '银行承兑', '国内信用证'],
    // 交割方式
    deliveryList: [
        {
            name: '买方自提',
            id: 1
        },
        {
            name: '卖方送到',
            id: 2
        },
        {
            name: 'CA交割',
            id: 3
        }
    ],
    // 交割方式
    deliveryStr: ['', '买方自提', '卖方送到', 'CA交割'],
    // 交割时间段
    deliveryDateFlag: [
        {
            id: 1,
            name: '交割时间段'
        },
        {
            id: 2,
            name: '截止日期'
        }
    ],
    // 包装标准
    packagingStandard: ['散水', '桶装', '袋装'],
    // 审批状态
    approveType: ['未审批', '审批通过', '审批驳回', '已创建', '已上传', '未执行', '已执行', '已支付', '已开票'],
    // 发票月份
    provideInvoice: ['', '交割月', '交割次月', '交割后'],
    // 付款类型
    collectionType: ['', '货款', '保证金', '结算', '运费', '追补保证金'],

    // 合同审批类型
    apprProcTypeCateList: [
        {
            id: 1,
            value: '合同要素审批'
        },
        {
            id: 2,
            value: '合同审批'
        },
        {
            id: 3,
            value: '付款审批'
        },
        {
            id: 4,
            value: '开票审批'
        },
        {
            id: 5,
            value: '收款'
        },
        {
            id: 6,
            value: '收发票'
        },
        {
            id: 7,
            value: '采购交割'
        },
        {
            id: 8,
            value: '销售交割'
        },
        {
            id: 21,
            value: '物流合同审批'
        },
        {
            id: 23,
            value: '结算审批'
        },
        {
            id: 24,
            value: '物流结算审批'
        }
    ],
    // 商品列表 -- TODO 这里以后要改成从后端传入
    products: [
        {
            id: 1,
            value: '乙二醇                 '
        },
        {
            id: 2,
            value: '甲醇'
        },
        {
            id: 3,
            value: '二甘醇'
        },
        {
            id: 59,
            value: '苯乙烯'
        },
        {
            id: 93,
            value: 'PTA'
        },
        {
            id: 335,
            value: '双酚A'
        }
    ],
    imgType: ['jpg', 'jpeg', 'png', 'gif'],
    fileType: ['doc', 'docx'],
    // 审批人/执行人的分配方式
    distMatchTypeList: [
        {
            value: 0,
            label: '请选择'
        },
        {
            value: 1,
            label: '指定人员'
        },
        {
            value: 2,
            label: '按岗位'
        },
        {
            value: 3,
            label: '条件匹配'
        }
    ]
};
