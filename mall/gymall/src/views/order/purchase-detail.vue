<template>
    <div class="order-detail">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">采购订单</span>
                <span>订单号：{{info.odrOrderSn}}</span>
                <div class="bright">
                    <ul class="order-state">
                        <li :class="{active:info.orderStatus===1}">签约 ></li>
                        <li :class="{active:info.orderStatus===2}">付款与交割 ></li>
                        <li :class="{active:info.orderStatus===3}">结算与复核 ></li>
                        <li :class="{acitve:info.orderStatus===4}">完成</li>
                    </ul>
                </div>
            </div>
            <gy-order-step @updateData="getInfo" :step-data="stepData" :order-data="orderData"></gy-order-step>
        </el-card>
        <el-card class="box-card" style="margin-top:10px">
            <p class="state-title"><i class="iconfont icon-info"></i>  订单信息</p>
            <el-row>
                <el-col :span="24">
                    <div class="base-info">
                        <dl>
                            <dt>卖家</dt>
                            <dd>{{info.sellerCompanyName}}
                                <!--<span class="im-talk"><i class="iconfont icon-im"></i>和我联系</span>-->
                            </dd>
                        </dl>
                        <dl>
                            <dt>免仓期</dt>
                            <dd>{{info.warehouseFreeDays}}天</dd>
                        </dl>
                        <dl>
                            <dt>交付方式</dt>
                            <dd>{{info.deliveryType === 0 ? '买家自提、卖家代运都可以' : info.deliveryType === 1 ? '买家自提' : '卖家代运'}}</dd>
                        </dl>
                        <dl>
                            <dt>是否分批</dt>
                            <dd>{{info.isBatchDelivery === 0 ? '否' :'是'}}</dd>
                        </dl>
                        <dl>
                            <dt>溢短装</dt>
                            <dd>±{{info.shortOverflowRate}}%</dd>
                        </dl>
                        <dl>
                            <dt>付款方式</dt>
                            <dd>{{info.transactionType === 0 ? '先款后货' : '先货后款'}}</dd>
                        </dl>
                        <dl>
                            <dt>保证金</dt>
                            <dd>{{info.depositRatio}}%</dd>
                        </dl>

                        <dl>
                            <dt>追加保证金</dt>
                            <dd>跌{{info.depositRatioSubtract}}%补{{info.depositRatioAppend}}%</dd>
                        </dl>
                        <dl>
                            <dt>发票</dt>
                            <dd>{{info.provideInvoiceType ? '交割月发票':'交割次月' }}<img :src=icon></dd>
                        </dl>
                        <dl>
                            <dt>货源</dt>
                            <dd>{{info.skuOrigin}}</dd>
                        </dl>
                        <dl>
                            <dt>质量标准</dt>
                            <dd>{{info.qualityStandard}}</dd>
                        </dl>
                        <dl>
                            <dt>包装标准</dt>
                            <dd>
                                <template v-if="info.packagingStandard==0">
                                    散水
                                </template>
                                <template v-else-if="info.packagingStandard==1">
                                    桶装货
                                </template>
                                <template v-else-if="info.packagingStandard==2">
                                    袋装货
                                </template>
                            </dd>
                        </dl>
                        <dl>
                            <dt>数量验收标准</dt>
                            <dd>
                                <template v-if="info.acceptanceStandard">
                                    签收数量
                                </template>
                                <template v-else>
                                    出库数量
                                </template>
                            </dd>
                        </dl>
                        <dl>
                            <dt>业务联系人</dt>
                            <dd>{{info.buyerContact}}</dd>
                        </dl>
                        <dl>
                            <dt>合同编号</dt>
                            <dd>3647840<img :src=icon></dd>
                        </dl>
                        <dl>
                            <dt>业务联系方式</dt>
                            <dd>{{info.sellerContactMobile}}</dd>
                        </dl>
                    </div>
                </el-col>
            </el-row>
            <div class="tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="订单明细" name="first">
                        <table>
                            <tr>
                                <td>商品名称</td>
                                <td>单价</td>
                                <td>数量</td>
                                <td>交货期</td>
                                <td>交割地</td>
                                <td>总额</td>
                            </tr>
                            <tr v-for="(item, index) in orderItemList" :key="index">
                                <td>{{item.skuName}}</td>
                                <td>{{info.intCurrencyMark}}{{item.skuPrice |numToCash}}/{{item.infUnitOfMeasureDisplayName}}</td>
                                <td>{{item.skuQuantity |numToCash(3)}}{{item.infUnitOfMeasureDisplayName}}</td>
                                <td>{{item.deliveryBeginDate| date}}至{{item.deliveryEndDate|date}}</td>
                                <td>{{item.deliveryWarehouseName}}</td>
                                <td>{{info.intCurrencyMark}}{{item.skuTotalAmount |numToCash }}</td>
                            </tr>
                        </table>
                        <div class="total-detail">
                            <dl>
                                <dt>货款总额:</dt>
                                <dd>{{info.intCurrencyMark}}{{info.settlementTotal | numToCash}}</dd>
                            </dl>
                            <dl>
                                <dt>保证金总额:</dt>
                                <dd>{{info.intCurrencyMark}}{{info.depositAmount| numToCash}}</dd>
                            </dl>
                            <hr/>
                            <dl>
                                <dt>总额:</dt>
                                <dd>{{info.intCurrencyMark}}{{info.totalAmount| numToCash}}</dd>
                            </dl>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="付款明细" name="second">
                        <table>
                            <tr>
                                <td>付款单号</td>
                                <td>付款日期</td>
                                <td>付款金额</td>
                                <td>付款类型</td>
                                <td>侍款单状态</td>
                                <td>操作</td>
                            </tr>
                            <tr v-for="(item ,index ) in payList" :key="index">
                                <td>{{item.payNumber}}</td>
                                <td>{{item.payTime | date }}</td>
                                <td>{{item.payTotal |numToCash}}</td>
                                <td>
                                    {{item.payMethod === 1 ? '货款':item.payMethod === 2 ? '保证金': '结算'}}
                                </td>
                                <td>{{payStatus[item.payStatus]}}</td>
                                <td><router-link :to="{name: 'paymentInfo', query:{paymentId:item.id}}" class="yel">查看</router-link></td>
                            </tr>
                        </table>
                    </el-tab-pane>
                    <el-tab-pane label="货物交割" name="three">
                        <table class="transaction">
                            <tr>
                                <td style="width:280px">商品</td>
                                <td>发货数量</td>
                                <td>签收数量</td>
                                <td style="width:228px">发货仓库</td>
                                <td>操作</td>
                            </tr>
                            <tbody v-for="(item, index) in transactionInfo" :key="index">
                            <tr class="update-title">
                                <td colspan="6">单号:{{item.deliveryOrderCode}}</td>
                            </tr>
                            <tr class="ge" v-for="(order, index) in item.deliveryOrderItemList" :key="index">
                                <td class="tleft">
                                    <div class="img-box">
                                        <img :src=src1 alt=""></div>
                                    {{order.skuName}}<br>/{{order.unitOfMeasureDisplayName}}<br>{{order.quantityPlanned}}{{order.unitOfMeasureDisplayName}}</td>
                                <td>{{order.quantityLoading |numToCash(3)}} {{order.unitOfMeasureDisplayName}}<br></td>
                                <td>{{order.quantityUnloading |numToCash(3)}}{{order.unitOfMeasureDisplayName}}</td>
                                <td>发货仓库：{{item.loadingWarehouseName}}<br>发货时间：{{item.estimatedArrivalStart | date(1)}}<br>签收时间：{{item.estimatedArrivalEnd | date(1)}}</td>
                                <td>
                                   <router-link :to="{}"> <button class="gy-button-normal">查看</button></router-link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </el-tab-pane>
                    <el-tab-pane label="物流明细" name="four">
                        <table>
                            <tr>
                                <td>运输单号</td>
                                <td>订单时间</td>
                                <td>承运商</td>
                                <td>品名</td>
                                <td>数量</td>
                                <td>装货地</td>
                                <td>卸货地</td>
                                <td>状态</td>
                                <td>操作</td>
                            </tr>
                            <tbody  v-for="(item,index) in logistics" :key="index">
                            <tr v-for="(tran,index) in item.consignmentNoteItemList" :key="index">
                                <td>{{item.consignmentNoteCode }}</td>
                                <td>{{item.createdDate | date}}</td>
                                <td>{{item.carrierName}}</td>
                                <td>{{tran.skuName}}</td>
                                <td>{{tran.skuQuantity ||numToCash(3)}}</td>
                                <td>{{item.loadingWarehouseAddress }}</td>
                                <td>{{item.unloadingWarehouseAddress }}</td>
                                <td>{{item.consignmentNoteStatus }}</td>
                                <!--id-->
                                <td><router-link :to={} class="gy-button-view">查看调度</router-link></td>
                            </tr>
                            </tbody>
                        </table>
                    </el-tab-pane>

                </el-tabs>
            </div>
        </el-card>
    </div>
</template>

<script>
import gyOrderStep from './components/order-step';
import {mapGetters} from 'vuex';

export default {
    name: 'purchaseDetail',
    components: { gyOrderStep },
    data () {
        return {
            orderId: this.$route.query.orderId,
            stepData: {},
            orderData: {},
            activeName: 'first',
            orderStatusStepModel: [],
            orderStatusStepitem: {},
            src1: require('../../assets/images/default1.jpg'),
            src: require('../../assets/images/default.jpg'),
            icon: require('../../assets/images/icon-piao.png'),
            isSign: true, // 只有签约时值为true
            info: {},
            transactionInfo: {},
            payList: {},
            item: [],
            orderItemList: [],
            logistics: {},
            stepList: [
                {
                    id: 1,
                    name: '收货',
                    active: true
                },
                {
                    id: 2,
                    name: '付款',
                    active: false
                }
            ],
            payStatus: {
                10: '已创建',
                20: '确认',
                30: '支付中',
                40: '已支付',
                50: '已完成',
                60: '已作废'
            }
        };
    },
    computed: mapGetters([
        'socket'
    ]),
    watch: {
        socket: {
            handler: function (newValue, oldValue) {
                if (newValue.msg) {
                    let data = JSON.parse(newValue.msg);
                    data.orderId === this.$route.query.orderId && this.getInfo();
                }
            },
            deep: true
        }
    },
    created () {
        let that = this;
        that.getInfo(); // 基础信息
        that.transaction(); // 交割
        that.logisticss(); // 物流
    },
    methods: {
        getInfo () {
            let that = this;
            that.$http.get(that.$api.sale.detail + '/' + that.orderId).then((res) => {
                let rsData = res.data.data;
                let currentStatusName = rsData.currentOrderExecuteStageModel && rsData.currentOrderExecuteStageModel.orderExecuteSubStatusModel && rsData.currentOrderExecuteStageModel.orderExecuteSubStatusModel.buyerWorkFlowStatus;
                let currentStatus = [
                    {
                        name: currentStatusName && currentStatusName.replace(/\\n/g, '<br>'),
                        remark: ''
                    }
                ];
                let list = [];

                if (rsData.currentOrderExecuteStageModel) {
                    if (rsData.currentOrderExecuteStageModel.id === 1) {
                        list = currentStatus;
                    } else {
                        let listData = [];
                        rsData.orderStatusHistoryModelList.map(item => {
                            item.name = item.buyerWorkFlowStatus;
                            listData.push(item);
                        });
                        listData = listData.filter(item => {
                            item.name = item.buyerWorkFlowStatus && item.buyerWorkFlowStatus.replace(/\\n/g, '<br>');
                            return rsData.currentOrderExecuteStageModel.id === item.orderExecuteStageId && item.buyerWorkFlowStatus;
                        });
                        list = listData;
                    }
                }
                this.stepData = {
                    active: 0,
                    done: false,
                    title: rsData.currentOrderExecuteStageModel && rsData.currentOrderExecuteStageModel.name,
                    tips: rsData.currentOrderExecuteStageModel && rsData.currentOrderExecuteStageModel.orderExecuteSubStatusModel && rsData.currentOrderExecuteStageModel.orderExecuteSubStatusModel.buyerMessage,
                    list: list,
                    btnList: (rsData.currentOrderExecuteStageModel && rsData.currentOrderExecuteStageModel.orderExecuteSubStatusModel && rsData.currentOrderExecuteStageModel.orderExecuteSubStatusModel.allowedFunctionsModelList) || []
                };
                this.orderData = Object.assign({orderType: 'buy'}, rsData);

                that.info = Object.assign(that.info, res.data.data);
                that.orderItemList = res.data.data && res.data.data.orderItemList;
                that.orderStatusStepModel = res.data.data && res.data.data.orderStatusStepModelList;
                that.getPayDetail();
            });
        },
        getPayDetail () {
            let that = this;
            that.$http.post(that.$api.payment.paymentList, {
                orderNumber: that.info.odrOrderSn,
                orderType: 1
            }).then(function (res) {
                console.log(res);
                if (res.data.code === 0) {
                    that.payList = res.data.data.rows;
                }
            });
        },
        transaction () { // 交割
            let that = this;
            that.$http.get(that.$api.order.transaction + that.orderId).then(function (res) {
                that.transactionInfo = res.data.data;
            });
        },
        logisticss () { // 物流
            this.$http.post(this.$api.transport.orderList, {
                data: {
                    id: this.orderId,
                    valid: 1
                }
            }).then(res => {
                this.logistics = res.data.code === 0 ? (res.data.data && res.data.data.list) || [] : [];
            });
        },
        handleClick (tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
<style  lang="scss">
    .order-detail{
        .el-card__header {
            padding: 10px 20px;
            .title {
                color: $color-title;
                font-size: 16px;
                font-weight: 700;
                margin-right: 24px
            }
        }
        .im-talk{ color:$color-highlight;
                cursor: pointer;
                padding-left:10px;
                .iconfont{
                    color:$color-highlight;
                    padding-right:2px;
                }
        }
        .iconfont{font-weight: lighter;color:$color-minor;}
        .sign .line{height:0;}
        .bright{float:right;}
        .order-state{
            li {
                float:left;
                width:auto;
                color:$color-minor;
                padding-left:6px;
                &.active{
                    color:$color-highlight
                }
            }
        }
        .billStatus {
            width: 30%;
            display: flex;
            padding:20px;
            min-height: 100px
        }
        .billStatus-active {
            margin-left: -10px;
        }
        .billStatus-unactive {
            position: relative;
            span {
                position: absolute;
                top: 17px;
                left: 64px;
                white-space: nowrap;
                color:$color-minor;
            }
        }
        .yel{
            color:$color-highlight
        }
        .base-info{margin:10px;}
        .base-info dl{
            width:50%;
            float:left;
            font-size: $small-font;
            text-align: left;
            min-height: 30px;
            margin:0;
            dt{
                width:80px;
                float:left;
                margin: auto 10px;
                color:$color-title;
            };
            dd{
                float:left;
                color:$color-main;
                padding-left:10px;
                img{
                    width:30px;
                    height:30px;
                    margin-left:10px;
                    border:1px solid $color-border;
                    border-radius: $border-radius-small;
                    cursor:pointer;
                }
            }
        }

        .billStatus-active{
            position: absolute;
            width: 70px;
            text-align: center;
            margin-left: -24px;
            font-size: 10px;
            color:$color-minor;
        }
        .active .billStatus-active{
            color:#000;
        }
        .state-pannel{position:relative}
        .state-pannel .tips{position: absolute;bottom:0px;left:10px;color:#2A2A2A}
        .tips span:first-child{color:#EEA443}
        .tips span.bill{color:#4A90E2;padding-left:5px}
        .tips img{width:35px;height:35px;vertical-align: bottom;margin-left:10px;}
        .tabs {
            margin-top:50px;
            .el-tabs__item.is-active {
                position: relative;
                bottom: -1px;
                z-index: 20;
                box-sizing: border-box;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                border: 1px solid $color-border;
                border-bottom: 1px solid #fff;
                color: $color-title;
            }

            .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
                padding-left: 20px;
            }

            .el-tabs--top .el-tabs__item.is-top:last-child {
                padding-right: 20px;
            }

            .el-tabs__item:hover {
                color: $color-title;
            }

            .el-tabs__item {
                color: $color-main;
            }

            .el-tabs__nav-wrap::after {
                height: 1px;
            }

            .el-tabs__active-bar {
                background-color: #fff;
            }
            .el-tabs__header{
                margin:0;
            }
            table{
                width:100%;
                border-collapse: collapse;
                border:1px solid $color-border;
                color:$color-main;
                font-size: $small-font;
            }
            table tr:nth-child(odd) td{
                background-color:#F2F3F7 ;
            }
            table tr:first-child td{
                padding-left:10px;
                height:40px;
                background-color:#EEF3F8 ;
            }
            table td{
                height:40px;
                line-height:16px;
                padding-left:10px;
            }
            table .ge td{
                line-height:20px;
            }
            .transaction tr:not(:first-child) td{border:1px solid $color-border}
            .transaction tr td{padding:10px;text-align: center;  }
            .transaction  tr.update-title td{background:#fbfbfc;text-align: left;padding:0 10px 0;}
            .transaction tr td.tleft{text-align: left;padding-left:10px;}
            td .img-box{
                float:left;
                border:1px solid $color-border;
                margin-right:20px;
                img{
                    width:58px;
                    height:58px;
                }
            }
        }
        .total-detail{
            float:right;
            width:230px;
            margin:20px;
            dl{
                font-size:$small-font;
                color:$color-title;
                overflow: hidden;
                height:26px;
            }
            dl:last-child{
                font-size: $body-font-size;
                color:$color-title;
                font-weight:bold;
            }
            hr{
                height:1px;
                border:none;
                border-top:1px solid $color-border;
            }
            dt,dd{
                float:left;
                text-align: right;
            }
            dt{
                width:92px;
            }
            dd{
                width:88px;
                text-align: left;
                margin-left:44px;
            }
        }
        .el-card__body{
            padding:10px 20px;
        }
    }

</style>
