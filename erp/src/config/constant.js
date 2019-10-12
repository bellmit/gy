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
    orderStatus: ['', '合同要素已创建', '合同要素审核中', '合同要素已审核通过', '合同已创建', '合同审核中', '合同已审核通过',
        '合同要素审核驳回', '合同审核驳回', '已上传签章合同', '创建合同时驳回', '分配执行时驳回', '合同已锁定', '合同要素修改完成'],
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
        },
        {
            name: '创建合同时驳回',
            id: 10
        },
        {
            name: '分配执行时驳回',
            id: 11
        },
        {
            name: '合同已锁定',
            id: 12
        },
        {
            name: '合同要素修改完成',
            id: 13
        }
    ],
    // 交易(合同类型)
    contractTypeList: [
        {
            name: '双边合同',
            id: 1
        },
        {
            name: '单边采购合同',
            id: 2
        },
        {
            name: '单边销售合同',
            id: 3
        }
    ],
    // 业务类型
    bizType4CreateEss: [
        {
            name: '高频交易',
            id: 1
        },
        {
            name: '准现货-现货',
            id: 4
        },
        // {
        //     name: '准现货-现货',
        //     id: 5
        // },
        {
            name: '准现货-长约',
            id: 6
        }
    ],
    // 合同交易类型
    contractTradeTypeList: [
        {
            name: '过单',
            id: 1
        },
        {
            name: '高频',
            id: 2
        },
        {
            name: '流量',
            id: 3
        },
        {
            name: '现货',
            id: 4
        },
        {
            name: '合约',
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
            name: '准现货-现货',
            id: 4
        },
        // {
        //     name: '准现货-现货',
        //     id: 5
        // },
        {
            name: '准现货-长约',
            id: 6
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
            name: '准现货-现货',
            id: 4
        },
        // {
        //     name: '准现货-现货',
        //     id: 5
        // },
        {
            name: '准现货-长约',
            id: 6
        },
        {
            name: '用印',
            id: 7
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
    // 质量标准
    qualityStandards: [
        {
            name: '国标'
        },
        {
            name: '生产商标准'
        },
        {
            name: '符合GBT 4649-2018聚酯级标准'
        }
    ],
    // 追保基准
    baselineRecovery: [
        {
            name: '安讯思'
        },
        {
            name: 'CCF'
        },
        {
            name: '卓创'
        },
        {
            name: '隆众网'
        }
    ],
    // 地区
    address: [
        {
            name: '华东地区'
        },
        {
            name: '华南地区'
        }
    ],
    //
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
    // 付款方式
    paymentType: [
        {
            name: '先款后货',
            id: 0
        },
        {
            name: '先货后款',
            id: 1
        },
        {
            name: '先货后款带票交割',
            id: 2
        },
        {
            name: '先款后货，等通知卸货',
            id: 3
        },
        {
            name: '先款后货，指定日期付款',
            id: 4
        }
    ],
    paymentType4Buy: [
        {
            name: '先款后货',
            id: 0
        },
        {
            name: '先货后款',
            id: 1
        }
    ],
    // 付款方式
    paymentTypeArr: ['先款后货', '先货后款', '先货后款带票交割'],
    // 支付结算方式
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
    // 支付结算方式
    paymentTypeArr1: ['', '电汇', '银行承兑', '国内信用证'],
    // 交割方式  7:货转  8:其他
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
            name: '第三方仓库，CA交割',
            id: 3
        },
        {
            name: '第三方仓库，货权转移',
            id: 4
        },
        {
            name: '需方自提，出库交割',
            id: 5
        },
        {
            name: '供方送达，入库交割',
            id: 6
        }
    ],
    deliveryCreateEssList: [
        {
            name: '第三方仓库，CA交割',
            id: 3
        },
        {
            name: '第三方仓库，货权转移',
            id: 4
        },
        {
            name: '需方自提，出库交割',
            id: 5
        },
        {
            name: '供方送达，入库交割',
            id: 6
        }
    ],
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
    // 付款时间段
    paymentDateFlag: [
        {
            id: 1,
            name: '付款时间段'
        },
        {
            id: 2,
            name: '截止日期'
        }
    ],
    // 包装标准
    packagingStandard: ['散水', '桶装', '袋装'],
    // 审批状态
    approveType: ['未审批', '审批通过', '审批驳回', '已创建', '已上传', '未执行', '已执行', '已支付', '已开票', '未分配', '已分配', '已驳回', '已锁定', '执行中', '付款中', '已结清'],
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
        },
        {
            id: 30,
            value: '用印申请审批'
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
    ],

    // 预警消息的分类
    alarmTypeList: [
        {
            value: 0,
            label: '请选择'
        },
        {
            value: 40,
            label: '商品总库存超限报警'
        },
        {
            value: 41,
            label: '高频交易商品总库存超限报警'
        },
        {
            value: 46,
            label: '准现货交易商品总库存超限报警'
        },
        {
            value: 42,
            label: '临时库存保存时间报警'
        },
        {
            value: 43,
            label: '已过交割期报警'
        },
        {
            value: 44,
            label: '已过收款期报警'
        }
    ],

    // 订单结算状态(这里不存在结算'未提交'的状态)
    odrSettlementStatus: [
        {
            name: '全部',
            status: null
        },
        {
            name: '复核中',
            status: 30
        },
        {
            name: '驳回',
            status: 40
        },
        {
            name: '待结款',
            status: 50
        },
        {
            name: '结算完成',
            status: 60
        }
    ]
};
