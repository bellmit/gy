<template>
    <div class="order">
        <el-card class="box-card">
            <div slot="header" class="order-header">
                <span class="title">采购订单</span>
                <span>订单号：{{info.odrOrderSn}}</span>
                <div class="right">
                    <ul class="order-state">
                        <li>签约 ></li>
                        <li>收款与交割 ></li>
                        <li :class="{active:finshe}">结算与复核 ></li>
                        <li :class="{active:finshed}">完成</li>
                    </ul>
                </div>
            </div>
            <div class="state-pannel">
                <!--先款后货不分批-->
                <!--签约-->
                <template>
                    <div class="">
                        <i class="el-icon-tickets"></i>
                        <span>结算与复核状态</span>
                    </div>
                    <div class="createPayment-status-left-billStatus">
                        <step step="1" v-if="finshFour" :isActive='this.collectionStatus >= 10' showLine='' :isDone="this.collectionStatus >= 10">
                            <div class="createPayment-status-left-billStatus-unconfirm">
                                <span>结算</span>
                            </div>
                        </step>
                        <step step="2" v-if="finshFour" :isActive="this.collectionStatus >= 50" isRight="true" showLine='true' :isDone="this.collectionStatus >= 50">
                            <div class="createPayment-status-left-billStatus-confirmed">
                                <span>清余款</span>
                            </div>
                        </step>
                        <step step="1" v-if="!finshFour" :isActive="this.collectionStatus >= 10" showLine='' :isDone="this.collectionStatus >= 10">
                            <div class="createPayment-status-left-billStatus-unconfirm">
                                <span>完成</span>
                            </div>
                        </step>
                    </div>
                    <p class="state-tips">
                        <span class="state-tips-first">温馨提示：</span>
                        <span>{{SettlementOrderMsg}}</span>
                        <button class="gy-button-views tt" @click="dialogVisible = true">结算明细</button>
                    </p>
                    <div class="button-group">
                        <button class="gy-button-extra" @click="postProcesses(aa=1)" v-if="orderSure">确认</button>
                        <button class="gy-button-normal" @click="postProcesses(aa=2)" v-if="orderSure">驳回</button>
                        <router-link class="gy-button-extra"
                                     :to="{name: 'createPayment',query:{orderNo: payMent.orderNumber,orderType: payMent.orderType,payMethod: payMent.payMethod,billType: payMent.billType,userId:userId,orderId:orderId,amount:amounts}}"
                                     v-if="refundState">付款
                        </router-link>
                        <button class="gy-button-extra" v-if="refundsState">催退款</button>
                        <button class="gy-button-extra" v-if="infofinsh" @click="finsh">完成</button>
                    </div>
                </template>
                <el-dialog width="1062px" class="settle-dialog"
                           @open="handleOpen" :visible.sync="dialogVisible">
                    <div class="settleInfo-apply"><h3>订单结算申请</h3></div>
                    <h3><i class="iconfont icon-settle"></i> 结算明细</h3>
                    <table class="gy-table">
                        <thead>
                        <tr>
                            <th>No</th>
                            <td>品名</td>
                            <td>订单数量</td>
                            <td>订单单价</td>
                            <td>订单金额</td>
                            <td>发货数量</td>
                            <td>结算数量</td>
                            <td>结算单价</td>
                            <td>结算金额</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in tableData" :key="index">
                            <th>{{index+1}}</th>
                            <td>{{item.productName}}</td>
                            <td>{{item.quantity}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.totalAmount}}</td>
                            <td>{{item.quantityLoading}}</td>
                            <td>{{item.settlementQuantity}}</td>
                            <td>{{item.settlementPrice |numToCash}}</td>
                            <td>{{item.settlementPrice * item.settlementQuantity |numToCash}}</td>
                        </tr>
                        <tr v-if="tableDataList">
                            <td  colspan="4">汇总</td>
                            <td>{{sumtotalAmount |numToCash}}</td>
                            <td>{{sumquantityLoading}}</td>
                            <td colspan="2"></td>
                            <td >{{sumMun |numToCash}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <h3><i class="iconfont icon-settle"></i>付款明细</h3>
                    <table class="gy-table">
                        <thead>
                        <tr>
                            <th>No</th>
                            <td>付款单号</td>
                            <td>付款时间</td>
                            <td>支付方式</td>
                            <td>付款银行</td>
                            <td>付款金额</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in paymentList" :key="index">
                            <th>{{index+1}}</th>
                            <td>{{item.payNumber}}</td>
                            <td>{{item.createdDate | date}}</td>
                            <td>{{item.tradeMode}}</td>
                            <td>{{item.buyerDepositBank}}</td>
                            <td>{{item.payTotal |numToCash}}</td>
                        </tr>
                        <tr v-if="paymentListDate">
                            <td  colspan="5">汇总</td>
                            <td>{{sumMpayTotal}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="settleInfo-totol">
                        <span class="settleInfo-money">订单总金额:</span>
                        <span>{{orderMoney |numToCash}}</span>
                    </div>
                    <div class="settleInfo-totol">
                        <span class="settleInfo-money">已付款总金额:</span>
                        <span>{{paidMoney.toFixed(2) |numToCash}}</span>
                    </div>
                    <div class="settleInfo-totol">
                        <span class="settleInfo-money">申请结算总金额:</span>
                        <span>{{settleAmount |numToCash}}</span>
                    </div>
                    <div class="settleInfo-totol">
                        <p>
                            <span class="settleInfo-money settleInfo-pay">需支付余款:</span>
                            <span class="settleInfo-money-color">{{settleAmount-paidMoney.toFixed(2) |numToCash}}</span>
                            <span class="settleInfo-money settleInfo-pay">对方发货总量:</span>
                            <span class="settleInfo-money-color">{{quantityLoading}}</span>
                        </p>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <button class="gy-button-normal" @click="dialogVisible = false">关闭</button>
                    </span>
                </el-dialog>
            </div>
        </el-card>
        <el-card class="box-card">
            <p class="state-title">订单信息</p>
            <el-row>
                <el-col :span="24">
                    <div class="base-info">
                        <dl>
                            <dt>卖家</dt>
                            <dd>
                                {{info.sellerCompanyName}}
                                <a class="contact-us" href="###"><i class="iconfont icon-chat"></i> 和我联系</a>
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
                            <dd>{{info.paymentType === 1 ? '线下转账' : '线上支付'}}</dd>
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
                            <dt>合同编号</dt>
                            <dd>3647840<img :src=icon></dd>
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
                            <dd>{{info.sellerContact}}</dd>
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
                                <td>{{info.intCurrencyMark}}{{item.skuPrice}}万/{{item.infUnitOfMeasureDisplayName}}</td>
                                <td>{{item.skuQuantity}}{{item.infUnitOfMeasureDisplayName}}</td>
                                <td>{{item.deliveryBeginDate| date}}至{{item.deliveryEndDate|date}}</td>
                                <td>{{item.deliveryWarehouseName}}</td>
                                <td>{{info.intCurrencyMark}}{{item.skuTotalAmount}}万</td>
                            </tr>
                        </table>
                        <div class="total-detail">
                            <dl>
                                <dt>货款总额:</dt>
                                <dd>{{info.intCurrencyMark}}{{info.settlementTotal}}万</dd>
                            </dl>
                            <dl>
                                <dt>保证金总额:</dt>
                                <dd>{{info.intCurrencyMark}}{{info.depositAmount}}万</dd>
                            </dl>
                            <hr/>
                            <dl>
                                <dt>总额:</dt>
                                <dd>{{info.intCurrencyMark}}{{info.totalAmount}}万</dd>
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
                            <tr>
                                <td>180021545</td>
                                <td>2018-05-21</td>
                                <td>¥20.00万</td>
                                <td>保证金</td>
                                <td>已支付</td>
                                <td><router-link :to={} class="yel">查看</router-link></td>
                            </tr>
                            <tr>
                                <td>180021545</td>
                                <td>2018-05-21</td>
                                <td>¥20.00万</td>
                                <td>保证金</td>
                                <td>已支付</td>
                                <td><router-link :to={} class="yel">查看</router-link></td>
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
                                        <img :src=src1 alt="">
                                    </div>
                                    <div class="tleft-box">
                                        {{order.skuName}}<br>¥1200元/{{order.unitOfMeasureDisplayName}}<br>{{order.quantityPlanned}}{{order.unitOfMeasureDisplayName}}
                                    </div>
                                </td>
                                <td>{{order.quantityLoading}} {{order.unitOfMeasureDisplayName}}<br></td>
                                <td>{{order.quantityUnloading}}{{order.unitOfMeasureDisplayName}}</td>
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
                                <td>{{tran.skuQuantity}}</td>
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
import step from '../../components/step';
export default {
    name: 'settle',
    components: {step},
    data () {
        return {
            activeName: 'first',
            userId: '',
            orderId: this.$route.query.orderId || 1,
            dialogVisible: this.$route.query.dialogVisible || false,
            tableData: [],
            paymentList: [],
            resData: '',
            paidAmount: '',
            settleConfirm: {},
            collectionStatus: 10,
            isActiveSettlement: true,
            isActiveClear: false,
            resourcesListId: 111,
            startSettlementOrderMsg: {},
            SettlementOrderMsg: '',
            orderSettleStatus: '',
            orderNumber: '',
            amounts: 0,
            infofinsh: false,
            orderSure: false,
            refundState: false,
            refundsState: false,
            completeState: false,
            payMent: {},
            paymentListDate: false,
            tableDataList: false,
            info: {},
            orderItemList: [],
            transactionInfo: {},
            logistics: {},
            src1: require('../../assets/images/default1.jpg'),
            src: require('../../assets/images/default.jpg'),
            icon: require('../../assets/images/icon-piao.png'),
            params: {
                data: {
                    id: ''
                }
            },
            finshe: true,
            finshed: false,
            finshFour: true
        };
    },
    created () {
        this.getOrderInfo();
        this.postStartSettlementOrderMsg();
        this.getInfo();
        this.transaction();
        this.logisticss();
        this.userId = JSON.parse(localStorage.getItem('userInfo')).id;
    },
    computed: {
        settleAmount: function () {
            return this.tableData.length > 0 ? this.tableData.reduce((total, item) => { return total + item.settlementPrice * item.settlementQuantity; }, 0) : 0;
        },
        orderMoney: function () {
            return this.tableData.length > 0 ? this.tableData.reduce((total, item) => { return total + item.price * item.quantity; }, 0) : 0;
        },
        quantityLoading: function () {
            return this.tableData.length > 0 ? this.tableData.reduce((sum, item) => { return sum + item.quantityLoading; }, 0) : 0;
        },
        paidMoney: function () {
            return this.paymentList.length > 0 ? this.paymentList.reduce((sum, item) => { return sum + item.payTotal; }, 0) : 0;
        },
        sumtotalAmount () {
            return this.tableData.length > 0 ? this.tableData.reduce((sum, item) => { return sum + item.totalAmount; }, 0) : 0;
        },
        sumquantityLoading () {
            return this.tableData.length > 0 ? this.tableData.reduce((sum, item) => { return sum + item.quantityLoading; }, 0) : 0;
        },
        sumMun () {
            return this.tableData.length > 0 ? this.tableData.reduce((sum, item) => { return sum + item.settlementPrice * item.settlementQuantity; }, 0) : 0;
        },
        sumMpayTotal () {
            return this.tableData.length > 0 ? this.paymentList.reduce((sum, item) => { return sum + item.payTotal; }, 0) : 0;
        }
    },
    methods: {
        handleClick (tab, event) {
            console.log(tab, event);
        },
        finsh () {
            let that = this;
            that.$http.post(that.$api.order.fish, {orderId: that.orderId, userId: that.userId})
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.postStartSettlementOrderMsg();
                        location.reload();
                    }
                }).catch(() => {
                    console.log('出错了');
                });
        },
        getInfo () {
            let that = this;
            that.$http.get(that.$api.sale.detail + '/' + that.orderId).then(function (res) {
                that.info = res.data.data;
                that.orderItemList = res.data.data.orderItemList;
                // that.orderStatusStepModel = res.data.data.orderStatusStepModelList;
                // that.select(that.orderStatusStepModel);
            });
        },
        transaction () {
            let that = this;
            that.$http.get(that.$api.order.transaction + that.orderId).then(function (res) {
                that.transactionInfo = res.data.data;
            });
        },
        logisticss () {
            let that = this;
            that.params.data.id = that.orderId;
            that.params.data.valid = 1;
            that.$http.post(that.$api.transport.orderList, that.params).then(function (res) {
                that.logistics = res.data.data.list;
            });
        },
        getOrderInfo () { // 获取订单信息
            let that = this;
            that.$http.post(that.$api.order.buyerSettle, {'orderId': that.orderId, 'userId': that.userId})
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.resData = res.data.data;
                        that.tableData = that.resData.itemList;
                        that.paymentList = that.resData.paymentList;
                        if (that.tableData.length > 0) {
                            that.tableDataList = true;
                        }
                        if (that.paymentList.length > 0) {
                            that.paymentListDate = true;
                        }
                    }
                    throw new Error(res.data.message);
                }).catch((e) => {
                    console.log(e);
                });
        },
        postProcesses (aa) {
            let that = this;
            that.settleConfirm.orderId = that.orderId;
            that.settleConfirm.userId = that.userId;
            that.settleConfirm.processId = that.resData.processId;
            that.settleConfirm.operaType = that.aa;
            that.$http.post(that.$api.processes.flowAct, that.settleConfirm)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.postStartSettlementOrderMsg();
                    }
                    that.getOrderInfo();
                }).catch(() => {
                    console.log('1111');
                });
        },
        getSummaries (param) {
            const {columns, data} = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '汇总';
                    return;
                }
                if (index === 9) {
                    sums[index] = this.settleAmount;
                    return;
                }
                if (index === 3 || index === 4) {
                    sums[index] = '';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                }
            });

            return sums;
        },
        postStartSettlementOrderMsg () {
            let that = this;
            that.startSettlementOrderMsg.orderId = that.orderId;
            that.startSettlementOrderMsg.userId = that.userId;
            that.$http.post(that.$api.order.startSettlementOrderMsg, that.startSettlementOrderMsg)
                .then(function (res) {
                    that.SettlementOrderMsg = res.data.data.msg;
                    that.orderNumber = res.data.data.orderNumber;
                    that.settleBalance = res.data.data.settleBalance;
                    that.payClick();
                    if (res.data.data.orderSettleStatus === 20) {
                        that.orderSure = true;
                    }
                    if (res.data.data.orderSettleStatus === 10) {
                        that.orderSure = false;
                    }
                    if (res.data.data.orderSettleStatus === 30) {
                        that.collectionStatus = 50;
                        that.orderSure = false;
                        if (that.settleBalance > 0) {
                            that.refundState = true;
                            that.amounts = that.settleBalance;
                        }
                        if (that.settleBalance < 0) {
                            that.refundsState = true;
                        }
                        if (that.settleBalance === 0) {
                            that.completeState = true;
                        }
                        if (res.data.data.paymentStatus === 50) {
                            that.infofinsh = true;
                        }
                    }
                    if (res.data.data.orderStatus === 4) {
                        that.collectionStatus = 10;
                        that.finshFour = false;
                        that.finshe = false;
                        that.finshed = true;
                    }
                }).catch(() => {
                    console.log('出错了');
                });
        },
        payClick () {
            let that = this;
            that.payMent.orderType = 1;
            that.payMent.billType = 1;
            that.payMent.payMethod = 3;
            that.payMent.orderNumber = that.orderNumber;
        },
        getSummaries2 (param) {
            const {columns, data} = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '汇总';
                    return;
                }
                if (index === 5) {
                    sums[index] = this.paidMoney.toFixed(2);
                    return;
                }
                if (index === 1 || index === 2 || index === 3 || index === 4) {
                    sums[index] = '';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                }
            });

            return sums;
        },
        handleOpen () {
            // this.getOrderInfo();
        }
    }
};
</script>
<style lang="scss">
    .order {
        .settleInfo-apply{
            border-bottom: 1px solid $color-light;
            h3{
                margin: 10px 0;
            }
        }
        .createPayment-status-left-billStatus {
            width: 30%;
            display: flex;
            margin: 20px 0 0 20px;

        }
        .createPayment-status-left-billStatus-unconfirm {
            margin-left: -14px;
            span{
                width: 50px!important;
                text-align: center;
                /*margin-left: 10px;*/
            }
        }
        .createPayment-status-left-billStatus-confirmed {
            position: relative;
            span {
                position: absolute;
                left: 89px;
                width: 50px;
            }
            .text{
                width: 18px!important;
                height: 18px!important;
            }
        }
        .settleInfo-totol{
            text-align: right;
            margin-right: 50px;
            margin-top: 15px;
            p{
                width: 240px;
                margin-right: 0px;
                border-top: 1px solid $color-light;
                display: inline-block;
            }
            span{
                display: inline-block;
                width: 115px;
                padding-right: 5px;
            }
            .settleInfo-pay{
                font-weight: bold;
            }
            .settleInfo-money-color{
                color: $color-highlight;
            }
        }
        .settle-dialog {
            .el-dialog__header {
                font-weight: bold;
                padding: 0px;
            }
            .el-dialog__body{
                margin: 10px 0;
                padding: 10px 20px;
            }
        }
        .settle-dialog-total {
            margin: 20px 0;
            text-align: right;
        }
        .settle-dialog-total-tit {
            margin-right: 30px;
            font-weight: bold;
        }
        .settle-dialog-total-amount {
            min-width: 70px;
            display: inline-block;
        }
        .contact-us {
            color: #E0370F;
            margin-left: 20px;
            opacity: 0.8;
            display: flex;
            align-items: center;
            .icon-chat {
                margin: 0 6px 0 10px;
                font-size: 14px;
                color: #ef0505;
            }
        }
        .el-card__header {
            padding: 10px 20px;
            .title {
                color: $color-title;
                font-size: 16px;
                font-weight: 700;
                margin-right: 24px
            }
        }
        .order-header > .right {
            float: right;
        }
        .order-state {
            li {
                float: left;
                width: auto;
                color: $color-minor;
                padding-left: 6px;
                &.active {
                    color: $color-highlight
                }
            }
        }
        .state-tips {
            margin-top: 60px;
            .state-tips-first{
                color: $color-warning;
            }
            span {
                color: $color-black;
            }
            .tt{
                margin-left: 40px;
            }
        }
        .base-info dl {
            width: 50%;
            float: left;
            font-size: $small-font;
            text-align: left;
            margin: 0;
            dt {
                width: 80px;
                float: left;
                margin: auto 10px;
                color: $color-title;
                padding-top: 7px;
                font-weight: bold;
            }
        ;
            dd {
                float: left;
                min-height: 22px;
                line-height: 22px;
                color: $color-main;
                padding-left: 10px;
                padding-top: 7px;
                display: inline-flex;
                img{
                    width: 30px;
                    height: 30px;
                }
            }
        }
        .tabs {
            margin-top: 50px;
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
            .el-tabs__header {
                margin: 0;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                border: 1px solid $color-border;
                color: $color-main;
                font-size: $small-font;
                .transaction tr:not(:first-child) td{border:1px solid $color-border}
                .transaction tr td{padding:10px;text-align: center;  }
                .transaction  tr.update-title td{background:#fbfbfc;text-align: left;padding:0 10px 0;}
                .transaction tr td.tleft{text-align: left;padding-left:10px;padding-top: 10px;}
                td .img-box{
                    float:left;
                    border:1px solid $color-border;
                    margin: 8px 10px 10px 0px;
                    img{
                        width:58px;
                        height:58px;
                    }
                }
                td .tleft-box{
                    float: left;
                    margin: 10px 10px 10px 0px;
                }
            }
            table tr:nth-child(odd) td {
                background-color: #F2F3F7;
            }
            table tr:first-child td {
                padding-left: 10px;
                height: 35px;
                background-color: #EEF3F8;
            }
            table td {
                height: 40px;
                line-height: 16px;
                padding-left: 10px;
            }
        }
        .total-detail {
            float: right;
            width: 230px;
            margin: 20px;
            dl {
                font-size: $small-font;
                color: $color-title;
                overflow: hidden;
            }
            dl:last-child {
                font-size: $body-font-size;
                color: $color-title;
                font-weight: bold;
            }
            hr {
                height: 1px;
                border: none;
                border-top: 1px solid $color-border;
            }
            dt, dd {
                float: left;
                text-align: right;
            }
            dt {
                width: 92px;
            }
            dd {
                width: 118px;
            }
        }
        .el-card__body {
            padding: 10px 20px;
        }
        .state-pannel {
            position: relative;
            overflow: hidden;
            .button-group {
                position: absolute;
                right: 0px;
                bottom: 0px;
            }
        }
        .state-flow {
            position: relative;
            top: 10px;
            left: 10px;
            min-height: 40px;
            margin: 20px 10px;
            .icon {
                position: absolute;
                z-index: 1;
                top: -1px;
                width: 20px;
                height: 10px;
                background-color: #fff;
                border: 1px solid $color-border;
                border-radius: 0 0 50% 50%/0 0 100% 100%;
                border-top: none;
            }
            .icon-inner {
                position: absolute;
                left: 2px;
                top: -9px;
                z-index: 2;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                text-align: center;
                color: $color-minor;
                line-height: 16px;
                font-size: 12px;
                background-color: #fff;
            }
            .flow-item {
                position: relative;
            }
            .flow-item-5 {
                left: 409px;
            }
            .flow-item:not(:last-child):after {
                content: '';
                left: 20px;
                position: absolute;
                top: 50%;
                z-index: 2;
                margin-top: -1px;
                width: 42px;
                height: 1px;
                background-color: $color-border;
            }
            .flow-item:not(:first-child):before {
                content: '';
                left: -42px;
                position: absolute;
                top: 50%;
                z-index: 2;
                margin-top: -1px;
                width: 42px;
                height: 1px;
                background-color: $color-border;
            }
            .flow-item.active:before {
                background-color: $color-highlight;
            }
            .flow-item.active:after {
                background-color: $color-highlight;
            }
            .flow-item:nth-child(1) {
                left: 0px;
            }
            .flow-item:nth-child(2) {
                left: 102px;
            }
            .flow-item:nth-child(3) {
                left: 204px;
            }
            .flow-item:nth-child(4) {
                left: 306px;
            }
            .flow-item .notes {
                position: absolute;
                top: 10px;
                width: 70px;
                text-align: center;
                margin-left: -26px;
                font-size: 10px;
                color: $color-minor;
            }
            .active {
                .icon {
                    -webkit-font-smoothing: subpixel-antialiased;
                    border: 1px solid $color-highlight;
                    border-top: none;
                }
                .icon-inner {
                    box-shadow: 0px 1px 5px $color-minor;
                }
            }
        }

    }

</style>
