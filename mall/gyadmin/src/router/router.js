// 引入子路由
import Sub from '../frame/subroute.vue';

// 首页
// import index from '../views/shop_home.vue';
// import index from '../views/container';
import index from '../views/layout';
import login from '../views/login.vue';
// import main from '../views/main.vue';

// 基础信息管理-》菜单管理
import sysMenuList from '../views/sys/menu/list.vue';
import sysMenuManage from '../views/sys/menu/manage.vue';

// 基础信息管理-》角色管理
import sysRoleManage from '../views/sys/role/manage.vue';
import sysRoleList from '../views/sys/role/list.vue';
import invoiceList from '../views/sys/invoiceInfo/invoiceList.vue';
import invoiceAdd from '../views/sys/invoiceInfo/add.vue';

// 会员管理-》会员企业
// import memberCompanyList from '../views/member/company/list.vue';
// import memberCompanyManage from '../views/member/company/manage.vue';

// 会员管理-》会员用户
import memberPersonalList from '../views/member/personal/list.vue';
import memberPersonalManage from '../views/member/personal/manage.vue';

// 统计报表
import salesStatistics from '../views/statisticalreport/salesstatistics.vue';
import newCustomer from '../views/statisticalreport/newcustomer.vue';
import tradeCustomer from '../views/statisticalreport/tradecustomer.vue';
import commoditySale from '../views/statisticalreport/commoditysale.vue';
import userAnalysis from '../views/statisticalreport/useranalysis.vue';

// 会员管理-》会员认证
import memberCompanyList from '../views/member/company/list.vue';
import memberCompanyManage from '../views/member/company/manage.vue';
import memberCompanyView from '../views/member/company/view.vue';
import backStageUserList from '../views/member/backstageuser/list.vue';
import backStageUserManage from '../views/member/backstageuser/manage.vue';

// 仓储管理
import warehouseList from '../views/warehouse/list.vue';
import warehouseView from '../views/warehouse/createList.vue';
import warehouseAdd from '../views/warehouse/add.vue';
import warehouseEdit from '../views/warehouse/edit.vue';
import warehouseDetail from '../views/warehouse/view.vue';
import warehouseIntentionSheet from '../views/warehouse/intention-sheet.vue';
import warehouseAddSheet from '../views/warehouse/add-sheet.vue';
import warehouseDemand from '../views/warehouse/demand.vue';
import reviseSheet from '../views/warehouse/reviseSheet.vue';

// 后台类目管理
import categoryList from '../views/commodityManagement/category/list.vue';
import categoryAdd from '../views/commodityManagement/category/add.vue';
import categoryView from '../views/commodityManagement/category/view.vue';
import categoryAttribute from '../views/commodityManagement/category/attribute.vue';
import categoryParameter from '../views/commodityManagement/category/parameter.vue';

// 前台类目管理
import receptionCategoryList from '../views/commodityManagement/receptionCategory/list.vue';
import receptionCategoryAdd from '../views/commodityManagement/receptionCategory/add.vue';
import receptionCategoryView from '../views/commodityManagement/receptionCategory/view.vue';

// 产品管理
import productList from '../views/commodityManagement/product/list.vue';
import productNew from '../views/commodityManagement/product/productNew.vue';
import productAdd from '../views/commodityManagement/product/add.vue';
import productView from '../views/commodityManagement/product/view.vue';
import productParameter from '../views/commodityManagement/product/parameter.vue';
import productAttribute from '../views/commodityManagement/product/attribute.vue';
import productCommodityGeneration from '../views/commodityManagement/product/commodityGeneration.vue';

// 属性管理
import attributeList from '../views/commodityManagement/attribute/list.vue';
import attributeAdd from '../views/commodityManagement/attribute/add.vue';
import attributeView from '../views/commodityManagement/attribute/view.vue';

// 参数管理
import parameterList from '../views/commodityManagement/parameter/list.vue';
import parameterAdd from '../views/commodityManagement/parameter/add.vue';
import parameterView from '../views/commodityManagement/parameter/view.vue';

// SKU规则管理
import skuRuleList from '../views/commodityManagement/skuRule/list.vue';
import skuRuleAdd from '../views/commodityManagement/skuRule/add.vue';
import skuRuleView from '../views/commodityManagement/skuRule/view.vue';

// 商品发布管理
import resourcesList from '../views/commodityManagement/resources/list.vue';
import resourcesAdd from '../views/commodityManagement/resources/add.vue';
import resourcesView from '../views/commodityManagement/resources/view.vue';
import purchaseList from '../views/commodityManagement/resources/purchaselist.vue';
import purchaseDetail from '../views/commodityManagement/resources/purchasedetail.vue';
import purchaseAdd from '../views/commodityManagement/resources/purchaseadd.vue';

//  订单管理
import createOrder from '../views/order/add.vue';
import orderList from '../views/order/list.vue';
import orderDetail from '../views/order/detail.vue';

// 推广
import recommend from '../views/generalize/recommend.vue';
import AD from '../views/generalize/AD.vue';
import news from '../views/generalize/news.vue';
import newsAdd from '../views/generalize/newsAdd.vue';
import price from '../views/generalize/price.vue';
import priceMyadd from '../views/generalize/priceMyadd.vue';

// 智运
import vehicleList from '../views/transport/vehicle/list';
import vehicleAdd from '../views/transport/vehicle/add';
import vehicleDetail from '../views/transport/vehicle/detail';
import driverList from '../views/transport/driver/list';
import driverAdd from '../views/transport/driver/add';
import driverDetail from '../views/transport/driver/detail';
import transportBid from '../views/transport/bid';
import shipping from '../views/transport/shipping';
import transportBidDetail from '../views/transport/biddetail';
import transportOrder from '../views/transport/order';
import transportOrderDetail from '../views/transport/orderdetail';
import transportDispatch from '../views/transport/dispatchDetail';
import companyList from '../views/transport/company/list';
import companyEdit from '../views/transport/company/edit';

// 订单补录及查看
import orderAdditionalList from '../views/orderAdditional/list.vue';
import orderAdditionalAdd from '../views/orderAdditional/add.vue';
import orderAdditionalDetail from '../views/orderAdditional/detail.vue';

// 密码修改
import password from '../views/sys/password.vue';

// 路由分类管理
import integralRoute from './integral';
import integralLevel from './integralLevel';

// 供应链服务管理
import supplyAdmin from '../views/supplyAdmin/supplyList';
import supplyDetail from '../views/supplyAdmin/supplyDetail';
import gradeDetail from '../views/supplyAdmin/gradeDetail';

// 供应链金融
import supplyFormDetail from '../views/supplyChainFinance/customerApplicationForm';

// 奖励管理
import rewardList from '../views/reward/list';
import rewardView from '../views/reward/view';

// 资金流水
import capitalFlow from '../views/capital/capitalFlow';

// 子账户查询
import subaccountQuery from '../views/capital/subaccount-query';

// 数据统计
import dataStatistics from '../views/dataStatistics/echarts';

// 撮合交易
import dealMakeList from '../views/dealMake/list';
import dealMakeDetail from '../views/dealMake/detail';

// 日志查询
import userLog from '../views/userLog';
import platfromLog from '../views/userLog/platfromLog';

// 帮助中心

import helpCenterList from '../views/helpCenter/list';
import helpCenterAdd from '../views/helpCenter/add';
import helpCenterEdit from '../views/helpCenter/edit';

// 配置路由
export default [
    {
        path: '*',
        redirect: login
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登录',
            unLogin: 'true'
        }
    },
    {
        path: '/index',
        name: 'index',
        component: index,
        meta: {
            title: '管理'
        },
        children: [
            //  数据统计
            {
                path: '/dataStatistics/echarts',
                name: 'dataStatistics',
                component: dataStatistics,
                meta: {
                    title: '数据统计'
                }
            },
            //  产品管理 -start=========================
            {
                path: '/product/list',
                name: 'productList',
                component: productList,
                meta: {
                    title: '产品列表'
                }
            },
            {
                path: '/product/productNew',
                name: 'productNew',
                component: productNew,
                meta: {
                    title: '生成商品'
                }
            },
            {
                path: '/product/add',
                name: 'productAdd',
                component: productAdd,
                meta: {
                    title: '产品'
                }
            },
            {
                path: '/product/view',
                name: 'productView',
                component: productView,
                meta: {
                    title: '产品详情'
                }
            },
            {
                path: '/product/parameter',
                name: 'productParameter',
                component: productParameter,
                meta: {
                    title: '产品参数'
                }
            },
            {
                path: '/product/attribute',
                name: 'productAttribute',
                component: productAttribute,
                meta: {
                    title: '产品属性'
                }
            },
            {
                path: '/product/commodityGeneration',
                name: 'productCommodityGeneration',
                component: productCommodityGeneration,
                meta: {
                    title: '商品生成'
                }
            },
            //  产品管理 -end============================
            //  后台类目列表
            {
                path: '/category/list',
                name: 'categoryList',
                component: categoryList,
                meta: {
                    title: '后台类目列表'
                }
            },
            {
                path: '/category/add',
                name: 'categoryAdd',
                component: categoryAdd,
                meta: {
                    title: '后台类目'
                }
            },
            {
                path: '/category/view',
                name: 'categoryView',
                component: categoryView,
                meta: {
                    title: '后台类目查看'
                }
            },
            {
                path: '/category/attribute',
                name: 'categoryAttribute',
                component: categoryAttribute,
                meta: {
                    title: '后台类目属性'
                }
            },
            {
                path: '/category/parameter',
                name: 'categoryParameter',
                component: categoryParameter,
                meta: {
                    title: '后台类目参数'
                }
            },
            //  后台类目列表 -end============================

            //  前台类目列表 ============================
            {
                path: '/receptionCategory/list',
                name: 'receptionCategoryList',
                component: receptionCategoryList,
                meta: {
                    title: '前台类目列表'
                }
            },
            {
                path: '/receptionCategory/add',
                name: 'receptionCategoryAdd',
                component: receptionCategoryAdd,
                meta: {
                    title: '前台类目'
                }
            },
            {
                path: '/receptionCategory/view',
                name: 'receptionCategoryView',
                component: receptionCategoryView,
                meta: {
                    title: '前台类目查看'
                }
            },
            //  前台类目列表 -end============================
            // 参数管理
            {
                path: '/parameter/list',
                name: 'parameterList',
                component: parameterList,
                meta: {
                    title: '参数列表'
                }
            },
            {
                path: '/parameter/add',
                name: 'parameterAdd',
                component: parameterAdd,
                meta: {
                    title: '参数添加'
                }
            },
            {
                path: '/parameter/view',
                name: 'parameterView',
                component: parameterView,
                meta: {
                    title: '参数查看'
                }
            },
            // 参数管理 -end============================
            // 规则管理
            {
                path: '/sku/list',
                name: 'skuRuleList',
                component: skuRuleList,
                meta: {
                    title: 'SKU规则列表'
                }
            },
            {
                path: '/sku/add',
                name: 'skuRuleAdd',
                component: skuRuleAdd,
                meta: {
                    title: 'SKU规则添加'
                }
            },
            {
                path: '/sku/view',
                name: 'skuRuleView',
                component: skuRuleView,
                meta: {
                    title: 'SKU规则查看'
                }
            },
            // 规则管理 -end============================
            // 属性管理 -start============================
            {
                path: '/attribute/list',
                name: 'attributeList',
                component: attributeList,
                meta: {
                    title: '属性列表'
                }
            },
            {
                path: '/attribute/add',
                name: 'attributeAdd',
                component: attributeAdd,
                meta: {
                    title: '属性'
                }
            },
            {
                path: '/attribute/view',
                name: 'attributeView',
                component: attributeView,
                meta: {
                    title: '属性详情'
                }
            },
            // 属性管理 -end============================
            // 商品发布管理 -start============================
            {
                path: '/resources/list',
                name: 'resourcesList',
                component: resourcesList,
                meta: {
                    title: '供应列表'
                }
            },
            {
                path: '/resources/add',
                name: 'resourcesAdd',
                component: resourcesAdd,
                meta: {
                    title: '供应添加'
                }
            },
            {
                path: '/resources/purchaseadd',
                name: 'purchaseAdd',
                component: purchaseAdd,
                meta: {
                    title: '求购添加'
                }
            },
            {
                path: '/resources/purchaselist',
                name: 'purchaseList',
                component: purchaseList,
                meta: {
                    title: '求购列表'
                }
            },
            {
                path: '/resources/purchasedetail',
                name: 'purchaseDetail',
                component: purchaseDetail,
                meta: {
                    title: '求购列表详情'
                }
            },
            {
                path: '/resources/view',
                name: 'resourcesView',
                component: resourcesView,
                meta: {
                    title: '供应列表详情'
                }
            },
            // 商品发布管理 -end============================
            // 订单管理 -end============================
            {
                path: '/order/add',
                name: 'createOrder',
                component: createOrder,
                meta: {
                    title: '发起订单'
                }
            },
            {
                path: '/order/list',
                name: 'orderList',
                component: orderList,
                meta: {
                    title: '订单列表'
                }
            },
            {
                path: '/order/detail',
                name: 'orderDetail',
                component: orderDetail,
                meta: {
                    title: '订单详情'
                }
            },
            // 订单管理 -end============================
            // 订单补录及查看 -start============================
            {
                path: '/orderAdditionalList/list',
                name: 'orderAdditionalList',
                component: orderAdditionalList,
                meta: {
                    title: '订单列表'
                }
            },
            {
                path: '/orderAdditionalList/add',
                name: 'orderAdditionalAdd',
                component: orderAdditionalAdd,
                meta: {
                    title: '新增订单'
                }
            },
            {
                path: '/orderAdditionalList/detail',
                name: 'orderAdditionalDetail',
                component: orderAdditionalDetail,
                meta: {
                    title: '订单详情'
                }
            },
            // 订单补录及查看 -end============================
            // orderAdditionalList
            {
                path: 'sys/menu/list',
                name: 'sysMenuList',
                component: sysMenuList,
                meta: {
                    title: '菜单列表'
                }
            },
            {
                path: 'sys/menu/manage',
                name: 'sysMenuManage',
                component: sysMenuManage,
                meta: {
                    title: '菜单管理'
                }
            },
            {
                path: 'sys/role/list',
                name: 'sysRoleList',
                component: sysRoleList,
                meta: {
                    title: '角色列表'
                }
            },
            {
                path: 'sys/role/manage',
                name: 'sysRoleManage',
                component: sysRoleManage,
                meta: {
                    title: '角色管理'
                }
            },
            {
                path: 'sys/invoice/list',
                name: 'invoiceList',
                component: invoiceList,
                meta: {
                    title: '发票公司信息'
                }
            },
            {
                path: 'sys/invoice/add',
                name: 'invoiceAdd',
                component: invoiceAdd,
                meta: {
                    title: '发票公司信息'
                }
            },
            {
                path: 'member/company/list',
                name: 'memberCompanyList',
                component: memberCompanyList,
                meta: {
                    title: '企业用户'
                }
            },
            {
                path: 'member/company/manage',
                name: 'memberCompanyManage',
                component: memberCompanyManage,
                meta: {
                    title: '企业用户管理'
                }
            },
            {
                path: 'member/company/view',
                name: 'memberCompanyView',
                component: memberCompanyView,
                meta: {
                    title: '企业用户审核'
                }
            },
            {
                path: 'member/backstageuser/list',
                name: 'backStageUserList',
                component: backStageUserList,
                meta: {
                    title: '后台用户列表'
                }
            },
            {
                path: 'member/backstageuser/manage',
                name: 'backStageUserManage',
                component: backStageUserManage,
                meta: {
                    title: '后台用户管理'
                }
            },
            {
                path: 'member/personal/list',
                name: 'memberPersonalList',
                component: memberPersonalList,
                meta: {
                    title: '个人用户列表'
                }
            },
            {
                path: 'member/personal/manage',
                name: 'memberPersonalManage',
                component: memberPersonalManage,
                meta: {
                    title: '个人用户管理'
                }
            },
            {
                path: 'statisticalreport/salesstatistics',
                name: 'salesStatistics',
                component: salesStatistics,
                meta: {
                    title: '销售统计表'
                }
            },
            {
                path: 'statisticalreport/newcustomer',
                name: 'newCustomer',
                component: newCustomer,
                meta: {
                    title: '新客户报表'
                }
            },
            {
                path: 'statisticalreport/tradecustomer',
                name: 'tradeCustomer',
                component: tradeCustomer,
                meta: {
                    title: '交易客户报表'
                }
            },
            {
                path: 'statisticalreport/commoditysale',
                name: 'commoditySale',
                component: commoditySale,
                meta: {
                    title: '商品销售表'
                }
            },
            {
                path: 'statisticalreport/useranalysis',
                name: 'userAnalysis',
                component: userAnalysis,
                meta: {
                    title: '用户分析表'
                }
            },
            {
                path: 'warehouse/list',
                name: 'warehouseList',
                component: warehouseList,
                meta: {
                    title: '仓储公司'
                }
            },
            {
                path: 'warehouse/view',
                name: 'warehouseView',
                component: warehouseView,
                meta: {
                    title: '仓储公司详细信息'
                }
            },
            {
                path: 'warehouse/add',
                name: 'warehouseAdd',
                component: warehouseAdd,
                meta: {
                    title: '添加仓储公司'
                }
            },
            {
                path: 'warehouse/edit',
                name: 'warehouseEdit',
                component: warehouseEdit,
                meta: {
                    title: '编辑仓储公司'
                }
            },
            {
                path: 'warehouse/Detail',
                name: 'warehouseDetail',
                component: warehouseDetail,
                meta: {
                    title: '仓储公司基本信息'
                }
            },
            {
                path: 'warehouse/IntentionSheet',
                name: 'warehouseIntentionSheet',
                component: warehouseIntentionSheet,
                meta: {
                    title: '仓储供应单'
                }
            },
            {
                path: 'warehouse/AddSheet',
                name: 'warehouseAddSheet',
                component: warehouseAddSheet,
                meta: {
                    title: '发布仓储供应单'
                }
            },
            {
                path: 'warehouse/demand',
                name: 'warehouseDemand',
                component: warehouseDemand,
                meta: {
                    title: '仓储需求单'
                }
            },
            {
                path: 'warehouse/reviseSheet',
                name: 'reviseSheet',
                component: reviseSheet,
                meta: {
                    title: '修改仓储供应单'
                }
            },
            // 推广 -start============================
            {
                path: 'generalize/recommend',
                name: 'generalize-recommend',
                component: recommend,
                meta: {
                    title: '推广管理'
                }
            },
            {
                path: 'generalize/AD',
                name: 'generalize-AD',
                component: AD,
                meta: {
                    title: '广告位管理'
                }
            },
            {
                path: 'generalize/news',
                name: 'generalize-news',
                component: news,
                meta: {
                    title: '资讯管理'
                }
            },
            {
                path: 'generalize/news/add',
                name: 'generalize-news-add',
                component: newsAdd,
                meta: {
                    title: '资讯管理'
                }
            },
            {
                path: 'generalize/price',
                name: 'generalize-price',
                component: price,
                meta: {
                    title: '热门价格'
                }
            },
            {
                path: 'generalize/price/myadd',
                name: 'generalize-price-myadd',
                component: priceMyadd,
                meta: {
                    title: '新增价格'
                }
            },
            {
                path: 'sys/password',
                name: 'password',
                component: password,
                meta: {
                    title: '修改密码'
                }
            },
            {
                path: '/transport',
                name: 'transport',
                component: Sub,
                meta: {
                    title: '智运'
                },
                children: [
                    {
                        path: 'driver',
                        name: 'driverList',
                        component: driverList,
                        meta: {
                            title: '驾驶员/押运员管理'
                        }
                    },
                    {
                        path: 'driver/add',
                        name: 'driverAdd',
                        component: driverAdd,
                        meta: {
                            title: '驾驶员/押运员管理'
                        }
                    },
                    {
                        path: 'driver/detail',
                        name: 'driverDetail',
                        component: driverDetail,
                        meta: {
                            title: '驾驶员/押运员详情'
                        }
                    },
                    {
                        path: 'vehicle',
                        name: 'vehicleList',
                        component: vehicleList,
                        meta: {
                            title: '车辆管理'
                        }
                    },
                    {
                        path: 'vehicle/detail',
                        name: 'vehicleDetail',
                        component: vehicleDetail,
                        meta: {
                            title: '车辆管理'
                        }
                    },
                    {
                        path: 'vehicle/add',
                        name: 'vehicleAdd',
                        component: vehicleAdd,
                        meta: {
                            title: '车辆管理'
                        }
                    },
                    {
                        path: 'bid',
                        name: 'transportBid',
                        component: transportBid,
                        meta: {
                            title: '物流询价单'
                        }
                    },
                    {
                        path: 'shipping',
                        name: 'shipping',
                        component: shipping,
                        meta: {
                            title: '船运需求单'
                        }
                    },
                    {
                        path: 'bid/detail',
                        name: 'transportBidDetail',
                        component: transportBidDetail,
                        meta: {
                            title: '物流询价单详情'
                        }
                    },
                    {
                        path: 'order',
                        name: 'transportOrder',
                        component: transportOrder,
                        meta: {
                            title: '运输订单'
                        }
                    },
                    {
                        path: 'order/detail',
                        name: 'transportOrderDetail',
                        component: transportOrderDetail,
                        meta: {
                            title: '运输订单详情'
                        }
                    },
                    {
                        path: 'dispatch',
                        name: 'transportDispatch',
                        component: transportDispatch,
                        meta: {
                            title: '输运详情'
                        }
                    },
                    {
                        path: 'company/list',
                        name: 'companyList',
                        component: companyList,
                        meta: {
                            title: '物流公司'
                        }
                    },
                    {
                        path: 'company/edit',
                        name: 'companyEdit',
                        component: companyEdit,
                        meta: {
                            title: '编辑物流公司'
                        }
                    }
                ]
            },
            {
                path: '/dealMake',
                name: 'dealMake',
                component: Sub,
                children: [
                    {
                        path: 'list',
                        name: 'dealMakeList',
                        component: dealMakeList,
                        meta: {
                            title: '撮合订单'
                        }
                    },
                    {
                        path: 'detail',
                        name: 'dealMakeDetail',
                        component: dealMakeDetail,
                        meta: {
                            title: '撮合订单详情'
                        }
                    }
                ]
            },
            {
                path: '/supply/list',
                name: 'supplyAdmin',
                component: supplyAdmin,
                meta: {
                    title: '供应链申请管理'
                }
            },
            {
                path: '/supply/detail',
                name: 'supplyDetail',
                component: supplyDetail,
                meta: {
                    title: '供应链申请详情'
                }
            },
            {
                path: '',
                name: '',
                component: Sub,
                meta: {
                    title: '供应链申请管理'
                },
                children: [
                    {
                        path: '/supply/formDetail',
                        name: 'supplyFormDetail',
                        component: supplyFormDetail,
                        meta: {
                            title: '客户申请单'
                        }
                    }
                ]
            },
            {
                path: '/supply/gradeDetail',
                name: 'gradeDetail',
                component: gradeDetail,
                meta: {
                    title: '评级详情'
                }
            },
            {
                path: '/reward/list',
                name: 'rewardList',
                component: rewardList,
                meta: {
                    title: '奖励管理'
                }
            },
            {
                path: '/reward/view',
                name: 'rewardView',
                component: rewardView,
                meta: {
                    title: '奖励明细'
                }
            },
            {
                path: '/capital/flow',
                name: 'capitalFlow',
                component: capitalFlow,
                meta: {
                    title: '流水查询'
                }
            },
            {
                path: '/capital/subaccountQuery',
                name: 'subaccountQuery',
                component: subaccountQuery,
                meta: {
                    title: '子账户查询'
                }
            },
            {
                path: '/userLog',
                name: 'userLog',
                component: userLog,
                meta: {
                    title: '日志查询'
                },
                children: [{
                    path: '/userLog/platfromLog',
                    name: 'platfromLog',
                    component: platfromLog,
                    meta: {
                        title: '后台日志'
                    }
                }]
            },
            {
                path: '/helpCenter',
                name: 'helpCenter',
                component: Sub,
                children: [{
                    path: '/list',
                    name: 'helpCenterList',
                    component: helpCenterList,
                    meta: {
                        title: '帮助主题'
                    }
                },
                {
                    path: '/add',
                    name: 'helpCenterAdd',
                    component: helpCenterAdd,
                    meta: {
                        title: '目录'
                    }
                },
                {
                    path: '/edit',
                    name: 'helpCenterEdit',
                    component: helpCenterEdit,
                    meta: {
                        title: '主题'
                    }
                }]
            },
            ...integralRoute,
            ...integralLevel
        ]
    }
];
