// 引入子路由
import Sub from '../frame/subroute.vue';

import empty from '@/views/other/empty.vue';

// 首页
// import index from '../views/shop_home.vue';
// 资源单列表-详情-发布
import resourceList from '../views/resources/list.vue';
import createResources from '../views/resources/add.vue';
import resourcesDetail from '../views/resources/detail.vue';

// 创建订单
import createOrder from '../views/order/add.vue';

import building from '../views/building';

// 买家
import buyerSettle from '../views/orderSettle/settleConfirm.vue';
// 卖家
import sellerSettle from '../views/orderSettle/settleInfo.vue';
// 卖家/店铺管理/企业介绍维护
import shopView from '../views/shop/index.vue';
import shopImg from '../views/shop/img.vue';
import shopCompany from '../views/shop/company.vue';

// 销售列表
import salesList from '../views/order/sales-list.vue';
import reAdd from '../views/order/re-add.vue';
import edit from '../views/order/edit.vue';
// 销售详情
import salesDetail from '../views/order/sales-detail.vue';
// 采购详情
import purchaseDetail from '../views/order/purchase-detail.vue';
// 采购单据管理
import purchaseBills from '../views/order/purchaseBills.vue';
import saleschaseBills from '../views/order/saleschaseBills.vue';
// 开票中心
import billingCenterList from '../views/billingCenter/list.vue';
import billingCenterDetail from '../views/billingCenter/detail.vue';
// 采购列表
import purchaseList from '../views/order/purchase-list.vue';
import addResource from '../views/order/addResource.vue';
import addInvoice from '../views/order/addInvoice.vue';
import invoiceApplicationDetail from '../views/order/invoice-application-detail.vue';
// 采购需求列表、详情、发布
import demandList from '../views/order/demand-list.vue';
import demandDetail from '../views/order/demand-detail.vue';
// 注册 登录
import register from '../views/register.vue';
import registerPassword from '../views/retrievePassword.vue';
import registerPasswords from '../views/registerPasswords.vue';
import registerFish from '../views/registerFish.vue';
import login from '../views/login.vue';
import news from '../views/news.vue';

import container from '../views/container.vue';

// 付款单
import createPayment from '../views/payment/createPayment';
import paymentList from '../views/payment/paymentList.vue';
import paymentConfirm from '../views/payment/paymentConfirm.vue';
import paymentInfo from '../views/payment/paymentInfo';
import confirmOfflinePay from '../views/payment/confirmOfflinePay';
import confirmOnlinePay from '../views/payment/confirmOnlinePay.vue';
import toPay from '../views/payment/toPay.vue';
import transferAccounts from '../views/payment/transferaccounts';

// 收款单
import collectionList from '../views/payment/collectionList.vue';
// import confirmedCollectionOffline from '../views/payment/collectionInfo.vue';
// import unconfirmCollectionOffline from '../views/payment/collectionConfirm.vue';
import collectionConfirm from '../views/payment/collectionConfirm.vue';
import collectionInfo from '../views/payment/collectionInfo.vue';

// 报表
import inAndOut from '../views/report/inAndOut';
import collectionSummary from '../views/report/collectionSummary';// 应收汇总
import collectionDetail from '../views/report/collectionDetail';
import paymentSummary from '../views/report/paymentSummary';
import payDetail from '../views/report/paymentDetail';
import statisticContainer from '../views/report/statisticContainer';
import tradeList from '../views/report/tradeList';

// 资金账户
import accountMoney from '../views/account/money';
import newBank from '../views/account/newbank';
import accountRole from '../views/account/role';
import grant from '../views/account/grant';
import accountCompany from '../views/account/company/list';
import accountCompanyAdd from '../views/account/company/add';
import accountCompanyView from '../views/account/company/view';
import accountSub from '../views/account/sub-list';
import accountSecurityManage from '../views/account/security-manage';
import rollOut from '../views/account/rollOut';
import ecitic from '../views/account/ecitic';
import internalTransfer from '../views/account/internalTransfer';
import organizationalStructure from '../views/organizationalStructure/organizational-structure';
import postManagement from '../views/organizationalStructure/postManagement';
import invoiceInfo from '../views/account/invoice-info'; // 发票公司信息

// 智运
import consignBid from '../views/transport/consign/bid';
import transportFind from '../views/transport/consign/find';
import transportDispatch from '../views/transport/accept/dispatch';
import transportDispatchEdit from '../views/transport/accept/dispatchEdit';
import transportDispatchDetail from '../views/transport/accept/dispatchDetail';
import consignBidDeatail from '../views/transport/consign/biddetail';
import acceptBid from '../views/transport/accept/bid';
import acceptBidDetail from '../views/transport/accept/biddetail';
import transparentOrder from '../views/transport/order';
import transparentOrderDetail from '../views/transport/orderdetail';
import transBillsManagement from '../views/transport/billsManagement';
import transparentSettlement from '../views/transport/settlement';
import transparentSettlementDetail from '../views/transport/settlementDetail';
import transportUser from '../views/transport/transportUser/list';
import transportUserInfo from '../views/transport/transportUser/transportInfo';
import transportUserDetail from '../views/transport/transportUser/transportDetail';
import vehicleList from '../views/transport/vehicle/list';
import vehicleAdd from '../views/transport/vehicle/add';
import vehicleDetail from '../views/transport/vehicle/detail';
import deliverNotice from '../views/transport/deliverNotice';
import boatList from '../views/transport/boat/list';
import boatAdd from '../views/transport/boat/add';
import transmissionRange from '../views/transport/transmissionRange';

// 报表中心1
import statementView from '../views/statement/index';
import statementDeal from '../views/statement/deal';

// 积分中心
import integralView from '../views/IntegralCenter/index';
import pointlist from '../views/IntegralCenter/list';
import pointlistdetail from '../views/IntegralCenter/orderDetail';
import myIntegral from '../views/IntegralCenter/myIntegral';
import integralDetail from '../views/IntegralCenter/integralDetail';
import IntegraIExplanation from '../views/IntegralCenter/IntegralExplanation';

// 地址管理
import address from '../views/AddressManagement/address';

// 供应链服务
import supplyList from '../views/supplyList/list';
import addList from '../views/supplyList/add';
import viewList from '../views/supplyList/view';
import customerApplicationForm from '../views/supplyList/customerApplicationForm';
import customerList from '../views/supplyList/customerList';

// 仓储
import warehousing from '../views/warehousing';
import requisition from '../views/warehousing/requisition';
import requisitionAdd from '../views/warehousing/add';

// 法务服务
import forensicServices from '../views/forensicServices/forensicServices';

// 撮合交易
import marriedDealOrder from '../views/marriedDeal/order/list';
import marriedDealOrderDetail from '../views/marriedDeal/order/detail';
import marriedDealOrderCreate from '../views/marriedDeal/order/create';
import marriedDealOrderParseCreate from '../views/marriedDeal/order/parse-create';
import marriedDealMain from '../views/marriedDeal/main';
import marriedDataChart from '../views/marriedDeal/data-chart';
import marriedMatchStatement from '../views/marriedDeal/match-statement';
import marriedDealSet from '../views/marriedDeal/set';
import recommendation from '../views/marriedDeal/recommendation';
import recommendationDetails from '../views/marriedDeal/recommendationDetails';

// 帮助
import help from '../views/help.vue';

// 风控中心
import businessAccess from '../views/windControlCenter/businessAccess';
import accessReplication from '../views/windControlCenter/accessReplication';

// 评级
import RatingManagement from '../views/ratingManagement/RatingManagement';
import RatingForm from '../views/ratingManagement/ratingForm';
import ratingView from '../views/ratingManagement/ratingView';

// 配置路由
export default [
    {
        path: '*',
        redirect: login
    },
    {
        path: '/building',
        name: 'building',
        component: building,
        meta: {
            unLogin: true
        }
    },
    {
        path: '/my',
        // name: 'container',
        component: container,
        meta: {
            title: '我的'
        },
        children: [
            // 开票中心
            {
                path: '',
                name: '',
                component: Sub,
                meta: {
                    title: '开票中心'
                },
                children: [
                    {
                        path: '/billingCenter/list',
                        name: 'billingCenterList',
                        component: billingCenterList,
                        meta: {
                            title: '开票申请单'
                        }
                    },
                    {
                        path: '/billingCenter/detail',
                        name: 'billingCenterDetail',
                        component: billingCenterDetail,
                        meta: {
                            title: '开票申请'
                        }
                    }
                ]
            },
            // 评级
            {
                path: '',
                name: '',
                component: Sub,
                meta: {
                    title: '评级管理'
                },
                children: [
                    {
                        path: '/RatingManagement/list',
                        name: 'RatingManagement',
                        component: RatingManagement,
                        meta: {
                            title: '我的评级'
                        }
                    },
                    {
                        path: '/RatingManagement/add',
                        name: 'ratingForm',
                        component: RatingForm,
                        meta: {
                            title: '我的评级'
                        }
                    },
                    {
                        path: '/ratingApplication/ratingView',
                        name: 'ratingView',
                        component: ratingView,
                        meta: {
                            title: '评级管理'
                        }
                    }
                ]
            },
            {
                path: '/forensicServices',
                name: 'forensicServices',
                component: forensicServices,
                meta: {
                    title: '法务服务'
                }
            },
            {
                path: '',
                name: '',
                component: Sub,
                meta: {
                    title: '撮合交易'
                },
                children: [
                    {
                        path: '/marriedDeal/main',
                        name: 'marriedDealMain',
                        component: marriedDealMain,
                        meta: {
                            title: '撮合主界面'
                            // itemId: '5-0'
                        }
                    },
                    {
                        path: '/marriedDeal/set',
                        name: 'marriedDealSet',
                        component: marriedDealSet,
                        meta: {
                            title: '撮合设置'
                            // itemId: '5-0'
                        }
                    },
                    {
                        path: '/marriedDeal/order/list',
                        name: 'marriedDealOrder',
                        component: marriedDealOrder,
                        meta: {
                            title: '撮合订单'
                            // itemId: '5-0'
                        }
                    },
                    {
                        path: '/marriedDeal/order/detail',
                        name: 'marriedDealOrderDetail',
                        component: marriedDealOrderDetail,
                        meta: {
                            title: '撮合订单详情'
                        }
                    },
                    {
                        path: '/marriedDeal/order/create',
                        name: 'marriedDealOrderCreate',
                        component: marriedDealOrderCreate,
                        meta: {
                            title: '生成撮合订单'
                        }
                    },
                    {
                        path: '/marriedDeal/order/parse-create',
                        name: 'marriedDealOrderParseCreate',
                        component: marriedDealOrderParseCreate,
                        meta: {
                            title: '生成撮合订单'
                        }
                    },
                    {
                        path: '/marriedDeal/dataChart',
                        name: 'marriedDataChart',
                        component: marriedDataChart,
                        meta: {
                            title: '客户统计'
                        }
                    },
                    {
                        path: '/marriedDeal/matchStatement',
                        name: 'marriedMatchStatement',
                        component: marriedMatchStatement,
                        meta: {
                            title: '撮合报表'
                        }
                    },
                    {
                        path: '/marriedDeal/recommendation',
                        name: 'recommendation',
                        component: recommendation,
                        meta: {
                            title: '引荐奖励'
                        }
                    },
                    {
                        path: '/marriedDeal/recommendationDetails',
                        name: 'recommendationDetails',
                        component: recommendationDetails,
                        meta: {
                            title: '引荐奖励明细'
                        }
                    }
                ]
            },
            // 商城资源-start=========================
            {
                path: '',
                name: '',
                component: Sub,
                meta: {
                    title: '买家中心'
                },
                children: [
                    {
                        path: '/order/list',
                        name: 'purchaseList',
                        component: purchaseList,
                        meta: {
                            title: '采购订单',
                            itemId: '0-0'
                        }
                    },
                    {
                        path: '/order/addResource',
                        name: 'addResource',
                        component: addResource,
                        meta: {
                            title: '发布需求单'
                        }
                    },
                    {
                        path: '/order/detail',
                        name: 'purchaseDetail',
                        component: purchaseDetail,
                        meta: {
                            title: '采购详情',
                            itemId: '0-0'
                        }
                    },
                    {
                        path: '/order/purchaseBills',
                        name: 'purchaseBills',
                        component: purchaseBills,
                        meta: {
                            title: '单据管理',
                            itemId: '0-0'
                        }
                    },
                    {
                        path: 'payment/create',
                        name: 'createPayment',
                        component: createPayment,
                        meta: {
                            itemId: '0-0',
                            title: '付款单'
                        }
                    },
                    {
                        path: '/order/demandList',
                        name: 'demandList',
                        component: demandList,
                        meta: {
                            itemId: '0-0',
                            title: '采购需求'
                        }
                    },
                    {
                        path: '/order/demandDetail',
                        name: 'demandDetail',
                        component: demandDetail,
                        meta: {
                            itemId: '0-0',
                            title: '需求单详情'
                        }
                    }
                ]
            },
            {
                path: '',
                name: '',
                component: Sub,
                meta: {
                    title: '卖家中心'
                },
                children: [
                    {
                        path: 'order/addInvoice',
                        name: 'addInvoice',
                        component: addInvoice,
                        meta: {
                            title: '开票申请'
                        }
                    },
                    {
                        path: 'order/invoiceApplicationDetail',
                        name: 'invoiceApplicationDetail',
                        component: invoiceApplicationDetail,
                        meta: {
                            title: '开票申请详情'
                        }
                    },
                    {
                        path: 'seller/settle',
                        name: 'sellerSettle',
                        component: sellerSettle,
                        meta: {
                            title: '销售单详情',
                            itemId: '1-0'
                        }
                    },
                    {
                        path: '/resources/list',
                        name: 'resourceList',
                        component: resourceList,
                        meta: {
                            title: '商城资源',
                            itemId: '1-1'
                        }
                    },
                    {
                        path: '/order/salesList',
                        name: 'salesList',
                        component: salesList,
                        meta: {
                            title: '销售订单',
                            itemId: '1-0'
                        }
                    },
                    {
                        path: '/order/salesDetail',
                        name: 'salesDetail',
                        component: salesDetail,
                        meta: {
                            title: '销售单详情',
                            itemId: '1-0'
                        }
                    },
                    {
                        path: '/resources/detail',
                        name: 'resourcesDetail',
                        component: resourcesDetail,
                        meta: {
                            title: '商城资源详情'
                        }
                    },
                    {
                        path: '/order/add',
                        name: 'createOrder',
                        component: createOrder,
                        meta: {
                            title: '发起订单'
                        }
                    },
                    {
                        path: '/order/reAdd',
                        name: 'reAdd',
                        component: reAdd,
                        meta: {
                            title: '发起订单'
                        }
                    },
                    {
                        path: '/order/edit',
                        name: 'edit',
                        component: edit,
                        meta: {
                            title: '发起订单'
                        }
                    },
                    {
                        path: '/order/saleschaseBills',
                        name: 'saleschaseBills',
                        component: saleschaseBills,
                        meta: {
                            title: '单据管理',
                            itemId: '0-0'
                        }
                    },
                    {
                        path: '/shop',
                        component: shopView,
                        meta: {
                            title: '店铺管理'
                        },
                        children: [
                            {
                                path: 'img',
                                name: 'img',
                                component: shopImg,
                                meta: {
                                    title: '图片管理',
                                    itemId: '1-2-0'
                                }
                            },
                            {
                                path: 'company',
                                name: 'company',
                                component: shopCompany,
                                meta: {
                                    title: '企业介绍维护',
                                    itemId: '1-2-1'
                                }
                            }
                        ]
                    },
                    {
                        path: '/resources/add',
                        name: 'createResources',
                        component: createResources,
                        meta: {
                            title: '资源管理',
                            itemId: '1-1'
                        }
                    }
                ]
            },
            {
                path: '',
                name: '',
                component: Sub,
                meta: {
                    title: '结算中心'
                },
                children: [
                    {
                        path: 'payment/list',
                        name: 'paymentList',
                        component: paymentList,
                        meta: {
                            title: '付款单',
                            itemId: '4-1-0'
                        }
                    },
                    {
                        path: 'collection/list',
                        name: 'collectionList',
                        component: collectionList,
                        meta: {
                            title: '收款单',
                            itemId: '4-2-0'
                        }
                    },
                    {
                        path: 'payment/info',
                        name: 'paymentInfo',
                        component: paymentInfo,
                        meta: {
                            title: '付款单详情',
                            itemId: '4-1-0'
                        }
                    }, {
                        path: 'collection/info',
                        name: 'collectionInfo',
                        component: collectionInfo,
                        meta: {
                            title: '收款单详情',
                            itemId: '4-2-0'
                        }
                    },
                    // 订单支付-收款单=========================
                    {
                        path: 'collection/confirm',
                        name: 'collectionConfirm',
                        component: collectionConfirm,
                        meta: {
                            title: '收款单详情',
                            itemId: '4-2-0'
                        }
                    },
                    {
                        path: 'payment/confirm',
                        name: 'paymentConfirm',
                        component: paymentConfirm,
                        meta: {
                            title: '付款单详情',
                            itemId: '4-1-0'
                        }
                    }
                ]
            },
            {
                path: '',
                name: '',
                component: Sub,
                meta: {
                    title: '权限管理'
                },
                children: [
                    {
                        path: 'role',
                        name: 'accountRole',
                        component: accountRole,
                        meta: {
                            title: '角色管理'
                            // itemId: '5-0'
                        }
                    },
                    {
                        path: 'grant',
                        name: 'grant',
                        component: grant,
                        meta: {
                            title: '授权管理'
                            // itemId: '5-0'
                        }
                    }
                ]
            },
            // 商城资源-end============================
            // 买家中心-start=========================
            {
                path: 'buyer/settle',
                name: 'buyerSettle',
                component: buyerSettle,
                meta: {
                    title: '买家-订单结算页',
                    itemId: '0-0'
                }
            },
            // 买家中心-end============================
            // 卖家中心-start=========================
            // 卖家中心-end============================

            // 结算中心--订单支付-付款单=========================
            {
                path: 'payment/transferaccounts',
                name: 'transferAccounts',
                component: transferAccounts,
                meta: {
                    title: '付款单列表',
                    itemId: '4-1-0'
                }
            },
            {
                path: 'payment/confirm1',
                name: 'confirmOfflinePay',
                component: confirmOfflinePay,
                meta: {
                    title: '已确认的线下付款单',
                    itemId: '3-1-0'
                }
            },
            {
                path: 'payment/confirm2',
                name: 'confirmOnlinePay',
                component: confirmOnlinePay,
                meta: {
                    title: '线上支付确认页',
                    itemId: '2-1-0'
                }
            },
            {
                path: 'payment/pay',
                name: 'toPay',
                component: toPay,
                meta: {
                    title: '等待财务付款',
                    itemId: '2-1-0'
                }
            },
            // 报表-交易明细=========================
            {
                path: 'report/trade/list',
                name: 'tradeList',
                component: tradeList,
                meta: {
                    title: '交易报表',
                    itemId: '2-0-0'
                }
            },

            // 报表-收支明细=========================
            {
                path: 'report/statistic',
                name: 'statisticContainer',
                component: statisticContainer,
                meta: {
                    title: '收支报表',
                    itemId: ''
                },
                children: [
                    {
                        path: 'inout',
                        name: 'inAndOut',
                        component: inAndOut,
                        meta: {
                            title: '收付汇总',
                            itemId: '4-0-1'
                        }
                    },
                    {
                        path: 'collection/summary',
                        name: 'collectionSummary',
                        component: collectionSummary,
                        meta: {
                            title: '应收汇总',
                            itemId: '2-0-1'
                        }
                    },
                    {
                        path: 'collection/detail',
                        name: 'collectionDetail',
                        component: collectionDetail,
                        meta: {
                            title: '应收明细'
                        }
                    },
                    {
                        path: 'payment/summary',
                        name: 'paymentSummary',
                        component: paymentSummary,
                        meta: {
                            title: '应付汇总',
                            itemId: '2-0-1'
                        }
                    },
                    {
                        path: 'payment/detail',
                        name: 'payDetail',
                        component: payDetail,
                        meta: {
                            title: '应付明细'
                        }
                    },
                    {
                        path: '*',
                        name: 'inAndOut1',
                        component: inAndOut,
                        meta: {
                            title: '收付汇总',
                            itemId: '20-0'
                        }
                    }
                ]
            },
            // 账户管理-资金账户=========================
            {
                path: '/account',
                name: 'account',
                component: Sub,
                meta: {
                    title: '账户管理'
                },
                children: [
                    {
                        path: 'money',
                        name: 'accountMoney',
                        component: accountMoney,
                        meta: {
                            title: '资金账户',
                            itemId: '5-0'
                        }
                    },
                    {
                        path: 'newbank',
                        name: 'newBank',
                        component: newBank,
                        meta: {
                            title: '明细记录'
                        }
                    },
                    {
                        path: 'rollOut',
                        name: 'pingan',
                        component: rollOut,
                        meta: {
                            title: '资金账户'
                        }
                    },
                    {
                        path: 'ecitic',
                        name: 'ecitic',
                        component: ecitic,
                        meta: {
                            title: '资金账户'
                        }
                    },
                    {
                        path: 'internalTransfer',
                        name: 'internalTransfer',
                        component: internalTransfer,
                        meta: {
                            title: '内部转账'
                        }
                    },
                    {
                        path: 'company',
                        component: Sub,
                        children: [
                            {
                                path: '',
                                name: 'accountCompany',
                                component: accountCompany,
                                meta: {
                                    title: '会员账户',
                                    itemId: '5-1'
                                }
                            },
                            {
                                path: 'add',
                                name: 'accountCompanyAdd',
                                component: accountCompanyAdd,
                                meta: {
                                    title: '会员账户',
                                    itemId: '5-1'
                                }
                            },
                            {
                                path: 'view',
                                name: 'accountCompanyView',
                                component: accountCompanyView,
                                meta: {
                                    title: '公司信息及功能',
                                    itemId: '5-1'
                                }
                            },
                            {
                                path: 'account/sub',
                                name: 'accountSub',
                                component: accountSub,
                                meta: {
                                    title: '员工账户管理'
                                    // itemId: '5-1'
                                }
                            },
                            {
                                path: 'account/security-manage',
                                name: 'accountSecurityManage',
                                component: accountSecurityManage,
                                meta: {
                                    title: '安全管理'
                                }
                            },
                            {
                                path: 'address',
                                name: 'address',
                                component: address,
                                meta: {
                                    title: '地址管理',
                                    itemId: ''
                                }
                            },
                            {
                                path: 'invoice/info',
                                name: 'invoiceInfo',
                                component: invoiceInfo,
                                meta: {
                                    title: '发票公司信息'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                path: '/organizational',
                component: Sub,
                meta: {
                    title: '组织架构'
                },
                children: [
                    {
                        path: '/postManagement',
                        name: 'postManagement',
                        component: postManagement,
                        meta: {
                            title: '岗位管理'
                        }
                    },
                    {
                        path: '/organizationalStructure',
                        name: 'organizationalStructure',
                        component: organizationalStructure,
                        meta: {
                            title: '组织架构管理'
                        }
                    }
                ]
            },
            // 智运
            {
                path: '/transport',
                name: 'transport',
                component: Sub,
                meta: {
                    title: '智运'
                },
                children: [
                    {
                        path: 'vehicle/list',
                        name: 'vehicleList',
                        component: vehicleList,
                        meta: {
                            title: '车辆管理',
                            itemId: '3-0-0'
                        }
                    },
                    {
                        path: 'vehicle/add',
                        name: 'vehicleAdd',
                        component: vehicleAdd,
                        meta: {
                            title: '车辆管理',
                            itemId: '3-0-0'
                        }
                    },
                    {
                        path: 'vehicle/vehicleDetail',
                        name: 'vehicleDetail',
                        component: vehicleDetail,
                        meta: {
                            title: '车辆详情',
                            itemId: '3-0-0'
                        }
                    },
                    {
                        path: 'transportUser/list',
                        name: 'transportUser',
                        component: transportUser,
                        meta: {
                            title: '驾驶员/押运员管理',
                            itemId: '3-0-1'
                        }
                    },
                    {
                        path: 'transportUser/transportInfo',
                        name: 'transportUserInfo',
                        component: transportUserInfo,
                        meta: {
                            title: '驾驶员/押运员详情',
                            itemId: '3-0-1'
                        }
                    },
                    {
                        path: 'transportUser/transportDetail',
                        name: 'transportUserDetail',
                        component: transportUserDetail,
                        meta: {
                            title: '驾驶员/押运员管理',
                            itemId: '3-0-1'
                        }
                    },
                    {
                        path: 'consign/bid',
                        name: 'consignBid',
                        component: consignBid,
                        meta: {
                            title: '承运商竞价',
                            itemId: '2-0'
                        }
                    },
                    {
                        path: 'consign/bid/detail',
                        name: 'consignBidDeatail',
                        component: consignBidDeatail,
                        meta: {
                            title: '承运商竞价详情',
                            itemId: '2-0'
                        }
                    },
                    {
                        path: 'order',
                        name: 'transparentOrder',
                        component: transparentOrder,
                        meta: {
                            title: '运输订单',
                            itemId: '2-1'
                        }
                    },
                    {
                        path: 'order/billsManagement',
                        name: 'transBillsManagement',
                        component: transBillsManagement,
                        meta: {
                            title: '单据管理',
                            itemId: '2-1'
                        }
                    },
                    {
                        path: 'order/detail',
                        name: 'transparentOrderDetail',
                        component: transparentOrderDetail,
                        meta: {
                            title: '运输订单详情',
                            itemId: '2-1'
                        }
                    },
                    {
                        path: 'settlement',
                        name: 'consignTransparentSettlement',
                        component: transparentSettlement,
                        meta: {
                            title: '运输结算单',
                            itemId: '2-2'
                        }
                    },
                    {
                        path: 'consign/find',
                        name: 'transportFind',
                        component: transportFind,
                        meta: {
                            title: '找物流',
                            itemId: '2-0'
                        }
                    },
                    {
                        path: 'accept/bid',
                        name: 'acceptBid',
                        component: acceptBid,
                        meta: {
                            title: '物流询价单',
                            itemId: '3-1'
                        }
                    },
                    {
                        path: 'accept/bid/detail',
                        name: 'acceptBidDeatail',
                        component: acceptBidDetail,
                        meta: {
                            title: '物流询价单',
                            itemId: '3-1'
                        }
                    },
                    // {
                    //     path: 'order',
                    //     name: 'transparentOrder',
                    //     component: transparentOrder,
                    //     meta: {
                    //         title: '运输订单',
                    //         itemId: '3-2'
                    //     }
                    // },
                    // {
                    //     path: 'order/detail',
                    //     name: 'transparentOrderDetail',
                    //     component: transparentOrderDetail,
                    //     meta: {
                    //         title: '运输订单详情',
                    //         itemId: '3-2'
                    //     }
                    // },
                    {
                        path: 'accept/dispatch',
                        name: 'transportDispatch',
                        component: transportDispatch,
                        meta: {
                            title: '调度单',
                            itemId: '3-2'
                        }
                    },
                    {
                        path: 'accept/dispatchEdit',
                        name: 'transportDispatchEdit',
                        component: transportDispatchEdit,
                        meta: {
                            title: '运输订单',
                            itemId: '3-2'
                        }
                    },
                    {
                        path: 'accept/dispatch/detail',
                        name: 'transportDispatchDetail',
                        component: transportDispatchDetail,
                        meta: {
                            title: '调度单详情',
                            itemId: '3-2'
                        }
                    },
                    {
                        path: 'settlement',
                        name: 'transparentSettlement',
                        component: transparentSettlement,
                        meta: {
                            title: '运输结算单',
                            itemId: '3-3'
                        }
                    },
                    {
                        path: 'settlement/detail',
                        name: 'transparentSettlementDetail',
                        component: transparentSettlementDetail,
                        meta: {
                            title: '运输结算单',
                            itemId: '3-3'
                        }
                    },
                    {
                        path: 'deliver',
                        name: 'deliverNotice',
                        component: deliverNotice,
                        meta: {
                            title: '发货通知单'
                        }
                    },
                    {
                        path: 'boat/list',
                        name: 'boatList',
                        component: boatList,
                        meta: {
                            title: '船运需求单',
                            itemId: '3-4'
                        }
                    },
                    {
                        path: 'boat/add',
                        name: 'boatAdd',
                        component: boatAdd,
                        meta: {
                            title: '发布船运需求',
                            itemId: '3-4'
                        }
                    },
                    {
                        path: 'transmissionRange',
                        name: 'transmissionRange',
                        component: transmissionRange,
                        meta: {
                            title: '运输范围',
                            itemId: '3-4'
                        }
                    }
                ]
            },
            // 供应链服务
            {
                path: '/supply',
                component: Sub,
                meta: {
                    title: '供应链服务'
                },
                children: [
                    {
                        path: 'list',
                        name: 'supplyList',
                        component: supplyList,
                        meta: {
                            title: '我的申请单'
                        }
                    },
                    {
                        path: 'add',
                        name: 'addList',
                        component: addList,
                        meta: {
                            title: '申请供应链服务'
                        }
                    },
                    {
                        path: 'view',
                        name: 'viewList',
                        component: viewList,
                        meta: {
                            title: '供应链申请单详情'
                        }
                    },
                    {
                        path: 'applicationForm',
                        name: 'customerApplicationForm',
                        component: customerApplicationForm,
                        meta: {
                            title: '客户申请单'
                        }
                    },
                    {
                        path: 'customerList',
                        name: 'customerList',
                        component: customerList,
                        meta: {
                            title: '客户申请单'
                        }
                    }
                ]
            },
            // 报表中心
            {
                path: '/statement',
                component: statementView,
                meta: {
                    title: '报表中心',
                    itemId: ''
                },
                children: [
                    {
                        path: 'deal',
                        name: 'statement-deal',
                        component: statementDeal,
                        meta: {
                            title: '交易报表',
                            itemId: '4-0'
                        }
                    }
                ]
            },
            // 积分中心
            {
                path: '/integral',
                component: integralView,
                meta: {
                    title: '积分中心',
                    itemId: ''
                },
                children: [
                    {
                        path: 'list',
                        name: 'pointlist',
                        component: pointlist,
                        meta: {
                            title: '我的兑换单',
                            itemId: ''
                        }
                    },
                    {
                        path: 'detail',
                        name: 'pointlistdetail',
                        component: pointlistdetail,
                        meta: {
                            title: '兑换单详情',
                            itemId: ''
                        }
                    },
                    {
                        path: 'myIntegral',
                        name: 'myIntegral',
                        component: myIntegral,
                        meta: {
                            title: '我的等级和积分',
                            itemId: ''
                        }
                    },
                    {
                        path: 'integralDetail',
                        name: 'integralDetail',
                        component: integralDetail,
                        meta: {
                            title: '积分明细',
                            itemId: ''
                        }
                    },
                    {
                        path: 'IntegraIExplanation',
                        name: 'IntegraIExplanation',
                        component: IntegraIExplanation,
                        meta: {
                            title: '积分说明',
                            itemId: ''
                        }
                    }
                ]
            },
            // 仓储
            {
                path: '/warehousing',
                component: warehousing,
                meta: {
                    title: '仓储',
                    itemId: ''
                },
                children: [
                    {
                        path: 'requisition',
                        name: 'requisition',
                        component: requisition,
                        meta: {
                            title: '仓储需求单',
                            itemId: ''
                        }
                    },
                    {
                        path: 'requisition/add',
                        name: 'requisitionAdd',
                        component: requisitionAdd,
                        meta: {
                            title: '发布仓储需求',
                            itemId: ''
                        }
                    }
                ]
            },
            // 风控中心
            {
                path: '',
                name: '',
                component: Sub,
                meta: {
                    title: '风控中心'
                },
                children: [
                    {
                        path: 'businessAccess',
                        name: 'businessAccess',
                        component: businessAccess,
                        meta: {
                            title: '业务准入',
                            itemId: ''
                        }
                    },
                    {
                        path: 'accessReplication',
                        name: 'accessReplication',
                        component: accessReplication,
                        meta: {
                            title: '评级详情',
                            itemId: ''
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta: {
            title: '注册',
            unLogin: true
        }
    },
    {
        path: '/news',
        name: 'news',
        component: news,
        meta: {
            title: '消息',
            unLogin: true
        }
    },
    {
        path: '/registerPassword',
        name: 'registerPassword',
        component: registerPassword,
        meta: {
            title: '找回密码-手机号',
            unLogin: true
        }
    },
    {
        path: '/registerPasswords',
        name: 'registerPasswords',
        component: registerPasswords,
        meta: {
            title: '找回密码-密码',
            unLogin: true
        }
    },
    {
        path: '/registerFish',
        name: 'registerFish',
        component: registerFish,
        meta: {
            title: '完成',
            unLogin: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登录',
            unLogin: true
        }
    },
    {
        path: '/header',
        name: 'header',
        component: empty,
        meta: {
            title: '国烨网'
        }
    },
    {
        path: '/footer',
        name: 'footer',
        component: empty,
        meta: {
            title: '国烨网'
        }
    },
    {
        path: '/help',
        name: 'help',
        component: help,
        meta: {
            title: '消息',
            unLogin: true
        }
    }
];
