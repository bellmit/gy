// 常量定义
export default {

    // 推荐分类
    positionList: [
        {
            value: 0,
            label: '-'
        }, {
            value: 10,
            label: '平台首页-热门推荐(商品)（上部）'
        }, {
            value: 20,
            label: '平台首页-推荐店铺（下部）'
        }, {
            value: 30,
            label: '商城首页-推荐商品（上部）'
        }, {
            value: 31,
            label: '商城首页-化工商城'
        }, {
            value: 32,
            label: '商城首页-油品商城'
        }, {
            value: 33,
            label: '商城首页-塑料商城'
        }, {
            value: 34,
            label: '商城首页-其他商品'
        }, {
            value: 40,
            label: '商城首页-热门推荐(店铺)（上部）'
        }, {
            value: 41,
            label: '商城首页-热门店铺（下部）'
        }, {
            value: 50,
            label: '商城首页-热门资讯'
        }, {
            value: 51,
            label: '仓储首页-推荐仓储(公司)（底部）'
        }, {
            value: 52,
            label: '物流首页-推荐物流(公司)（底部）'
        }
    ],
    // 推荐分类（资源单）
    positionListCommodity: [
        {
            value: 0,
            label: '-'
        }, {
            value: 10,
            label: '平台首页-热门推荐(商品)（上部）'
        }, {
            value: 30,
            label: '商城首页-推荐商品（上部）'
        }, {
            value: 31,
            label: '商城首页-化工商城'
        }, {
            value: 32,
            label: '商城首页-油品商城'
        }, {
            value: 33,
            label: '商城首页-塑料商城'
        }, {
            value: 34,
            label: '商城首页-其他商品'
        }
    ],
    // 推荐分类（店铺）
    positionListData: [
        {
            value: 0,
            label: '-'
        }, {
            value: 20,
            label: '平台首页-推荐店铺（下部）'
        }, {
            value: 40,
            label: '商城首页-热门推荐(店铺)（上部）'
        }, {
            value: 41,
            label: '商城首页-热门店铺（下部）'
        }, {
            value: 51,
            label: '仓储首页-推荐仓储(公司)（底部）'
        }, {
            value: 52,
            label: '物流首页-推荐物流(公司)（底部）'
        }
    ],
    // 推荐分类（资讯）
    positionListInfo: [
        {
            value: 0,
            label: '-'
        }, {
            value: 50,
            label: '商城首页-热门资讯'
        }
    ],
    // 推荐项目
    itemList: [
        {
            value: 0,
            label: '-'
        }, {
            value: 1,
            label: '商品'
        }, {
            value: 2,
            label: '店铺'
        },
        {
            value: 4,
            label: '资讯'
        }
    ],
    // 区域分类
    regionalClassification: [
        {
            name: '全部',
            val: null
        },
        {
            name: '东北',
            val: 1
        },
        {
            name: '华北',
            val: 2
        },
        {
            name: '华东',
            val: 3
        },
        {
            name: '华南',
            val: 4
        },
        {
            name: '华中',
            val: 5
        },
        {
            name: '西南',
            val: 6
        }
    ],
    // 审核状态
    auditStatusList: [
        {
            label: '全部',
            value: 0
        },
        {
            label: '待审核',
            value: 1
        },
        {
            label: '已通过',
            value: 3
        },
        {
            label: '未通过',
            value: 2
        }
    ],
    rejectReason: [
        {label: '凭证/发票与实际订单不符，请重新上传'},
        {label: '凭证/发票拍摄不完整或模糊，无法查看，请重新上传'},
        {label: '凭证/发票有涂改，影响内容真实性，请确认后重新上传'},
        {label: '凭证/发票有缺失，请尽快补充上传'},
        {label: '其他'}
    ],
    // 审核状态 运输订单
    auditStatusListTrans: [
        {
            label: '全部',
            value: 0
        },
        {
            label: '已完成',
            value: 2
        },
        {
            label: '未完成',
            value: 1
        }
    ],
    rejectReasonTrans: [
        {label: '单据与实际运输单不符，请重新上传'},
        {label: '单据拍摄不完整或模糊，无法查看，请重新上传'},
        {label: '单据有涂改，影响内容真实性，请确认后重新上传'},
        {label: '单据有缺失，请尽快补充上传'}
    ],
    // 图表颜色
    chartsColor: ['#F45A0E', '#FFB926', '#60AEFF', '#67D2D2', '#435188', '#975FE4', '#FF6383', '#DE336C', '#89E3C1', '#B1EE74'],
    // 图表数据tab
    dateType: ['', '当日', '当周', '当月', '总体']
};
