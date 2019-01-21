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
                <template>
                    <div class="">
                        <i class="el-icon-tickets"></i>
                        <span>结算与复核状态</span>
                    </div>
                    <div class="createPayment-status-left-billStatus">
                        <step step="1" v-if="finshFour" :isActive='this.collectionStatus >= 10' showLine=''
                              :isDone="this.collectionStatus >= 10">
                            <div class="createPayment-status-left-billStatus-unconfirm">
                                <span>结算</span>
                            </div>
                        </step>
                        <step step="2" v-if="finshFour" :isActive="this.collectionStatus >= 50" isRight="true"
                              showLine='true' :isDone="this.collectionStatus >= 50">
                            <div class="createPayment-status-left-billStatus-confirmed">
                                <span>清余款</span>
                            </div>
                        </step>
                        <step step="1" v-if="!finshFour" :isActive="this.collectionStatus >= 10" showLine=''
                              :isDone="this.collectionStatus >= 10">
                            <div class="createPayment-status-left-billStatus-unconfirm">
                                <span>完成</span>
                            </div>
                        </step>
                    </div>
                    <p class="state-tips">
                        <span class="state-tips-first">温馨提示：</span>
                        <span>{{SettlementOrderMsg}}</span>
                        <button class="gy-button-views tt" @click="dialogVisible = true">结算明细</button>
                        <button class="gy-button-views" style="cursor:pointer" v-if="isApproving" @click="openApprListDlg">查看审批流程</button>
                    </p>
                    <div class="button-group">
                        <button class="gy-button-extra" @click="postProcesses(aa=1)" v-if="orderSure">确认</button>
                        <button class="gy-button-normal" @click="postProcesses(aa=2)" v-if="orderSure">驳回</button>
                        <button class="gy-button-extra" v-if="refundState" @click="refundPayment()">付款</button>
                        <!--<button class="gy-button-extra" v-if="refundsState">催退款</button>-->
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
                            <td>订单数量({{infUnitOfMeasureDisplayName}})</td>
                            <td>订单单价(元/{{infUnitOfMeasureDisplayName}})</td>
                            <td>订单金额(元)</td>
                            <td>发货数量({{infUnitOfMeasureDisplayName}})</td>
                            <td>结算数量({{infUnitOfMeasureDisplayName}})</td>
                            <td>结算单价(元/{{infUnitOfMeasureDisplayName}})</td>
                            <td>结算金额(元)</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in tableData" :key="index">
                            <th>{{index+1}}</th>
                            <td>{{item.productName}}</td>
                            <td>{{item.quantity|numToCash(3)}}</td>
                            <td>{{item.price|numToCash}}</td>
                            <td>{{item.totalAmount| numToCash}}</td>
                            <td>{{item.quantityLoading|numToCash(3)}}</td>
                            <td>{{item.settlementQuantity|numToCash(3)}}</td>
                            <td>{{item.settlementPrice |numToCash}}</td>
                            <td>{{item.settlementPrice * item.settlementQuantity |numToCash}}</td>
                        </tr>
                        <tr v-if="tableDataList">
                            <td colspan="4">汇总</td>
                            <td>{{sumtotalAmount |numToCash}}</td>
                            <td>{{sumquantityLoading|numToCash(3)}}</td>
                            <td colspan="2"></td>
                            <td>{{sumMun |numToCash}}</td>
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
                            <td>付款金额(元)</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in paymentList" :key="index">
                            <th>{{index+1}}</th>
                            <td>{{item.payNumber}}</td>
                            <td>{{item.createdDate | date}}</td>
                            <td>{{item.tradeMode | tradeMode}}</td>
                            <td>{{item.buyerDepositBank}}</td>
                            <td>{{item.payTotal |numToCash}}</td>
                        </tr>
                        <tr v-if="paymentListDate">
                            <td colspan="5">汇总</td>
                            <td>{{sumMpayTotal}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <h3><i class="iconfont icon-settle"></i>其他费用</h3>
                    <div class="gy-form other-charge" v-for="(item, index) in chargeData.orderSettleChargesList" :key="index">
                        <div class="gy-form-group" style="width: 48%">
                            <span class="l">结算项目</span>
                            <input type="text" class="gy-input" v-model="item.costItem">
                        </div>
                        <div class="gy-form-group" style="width: 48%">
                            <span class="l">费用金额</span>
                            <input type="text" class="gy-input" v-model="item.costCharge">
                            <span class="unit">元</span>
                        </div>
                    </div>
                    <div class="settleInfo-totol">
                        <span class="settleInfo-money">订单总金额:</span>
                        <span>{{orderMoney |numToCash}} 元</span>
                    </div>
                    <div class="settleInfo-totol">
                        <span class="settleInfo-money">已付款总金额:</span>
                        <span>{{paidMoney.toFixed(2) |numToCash}} 元</span>
                    </div>
                    <!--<div class="settleInfo-totol">-->
                        <!--<span class="settleInfo-money">申请结算总金额:</span>-->
                        <!--<span>{{settleAmount |numToCash}} 元</span>-->
                    <!--</div>-->
                    <div class="settleInfo-totol">
                        <span class="settleInfo-money">申请结算总金额:</span>
                        <span>{{settleAmount + orderSettles |numToCash}} 元</span>
                    </div>
                    <div class="settleInfo-totol">
                        <p>
                            <span class="settleInfo-money settleInfo-pay">需支付余款:</span>
                            <span
                                class="settleInfo-money-color">{{settleAmount-paidMoney + orderSettles |numToCash}} 元</span>
                            <span class="settleInfo-money settleInfo-pay">对方发货总量:</span>
                            <span class="settleInfo-money-color">{{quantityLoading}} 吨</span>
                        </p>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <button class="gy-button-normal" @click="dialogVisible = false">关闭</button>
                    </span>
                </el-dialog>
            </div>
        </el-card>
        <div class="seven_top">
            <p class="mewmyp"><i class="iconfont icon-dingdanxinxi mewmyicon"></i> <span class="mewmyfont">订单信息</span></p>
            <el-row>
                <el-col :span="24">
                    <gy-order-settle @showContract="showContract" :order-data="info" user-type="buy"></gy-order-settle>
                </el-col>
            </el-row>
            <div class="tabs mynewtabs">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="订单明细" name="first">
                        <gy-order-detail :order-data="info" :order-item-data="orderItemList"></gy-order-detail>
                    </el-tab-pane>
                    <el-tab-pane label="付款明细" name="second">
                        <gy-order-payment :order-no="info.odrOrderSn" user-type="buy"></gy-order-payment>
                    </el-tab-pane>
                    <el-tab-pane label="货物交割" name="three">
                        <gy-order-transaction @updateQuantityIssued="updateQuantityIssued" :order-data="info"
                                              :order-id="orderId" user-type="buy"></gy-order-transaction>
                    </el-tab-pane>
                    <el-tab-pane label="物流明细" name="four">
                        <gy-order-logistic :order-id="orderId" user-type="sell"></gy-order-logistic>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <!-- 审批历史 弹窗组件 -->
        <approveHistory ref="myApprHisDlg"></approveHistory>
    </div>
</template>

<script>
import step from '../../components/step';
import gyOrderStep from '../order/components/order-step';
import gyOrderInfo from '../order/components/order-info';
import gyOrderPayment from '../order/components/order-payment';
import gyOrderDetail from '../order/components/order-detail';
import gyOrderTransaction from '../order/components/order-transaction';
import gyOrderLogistic from '../order/components/order-logistic';
import gyOrderSettle from '../order/components/order-settle.vue';
import approveHistory from '../../components/approveHistory';

export default {
    name: 'settle',
    components: {
        step,
        gyOrderStep,
        gyOrderInfo,
        gyOrderDetail,
        gyOrderPayment,
        gyOrderTransaction,
        gyOrderLogistic,
        gyOrderSettle,
        approveHistory
    },
    data () {
        return {
            tradeMetch: ['线下支付', '在线支付'],
            activeName: 'first',
            userId: '',
            orderId: '',
            dialogVisible: false,
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
            finshFour: true,
            callbacksd: {
                name: 'buyerSettle',
                orderId: this.orderId
            },
            chargeData: {
                orderSettleChargesList: []
            },
            tableDatas: [],
            settleAmount2: 0,
            settleAmount1: 0,
            orderSettle: [],
            infUnitOfMeasureDisplayName: null, // 单位
            isApproving: false, // 是否正在结算审批中
            odrSettleId: null // 当前的结算ID
        };
    },
    created () {
        this.userId = JSON.parse(localStorage.getItem('userInfo')).id;
        this.orderId = this.$route.query.orderId;
        this.getOrderInfo();
        this.postStartSettlementOrderMsg();
        this.getInfo();
        if (this.$route.query.dialogVisible === 'true' || this.$route.query.dialogVisible === true) {
            this.dialogVisible = true;
        } else {
            this.dialogVisible = false;
        }
    },
    computed: {
        settleAmount: function () {
            return this.tableData.length > 0 ? this.tableData.reduce((total, item) => {
                return total + item.settlementPrice * item.settlementQuantity;
            }, 0) : 0;
        },
        orderMoney: function () {
            return this.tableData.length > 0 ? this.tableData.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0) : 0;
        },
        quantityLoading: function () {
            return this.tableData.length > 0 ? this.tableData.reduce((sum, item) => {
                return sum + item.quantityLoading;
            }, 0) : 0;
        },
        paidMoney: function () {
            return this.paymentList.length > 0 ? this.paymentList.reduce((sum, item) => {
                return sum + item.payTotal;
            }, 0) : 0;
        },
        sumtotalAmount () {
            return this.tableData.length > 0 ? this.tableData.reduce((sum, item) => {
                return sum + item.totalAmount;
            }, 0) : 0;
        },
        sumquantityLoading () {
            return this.tableData.length > 0 ? this.tableData.reduce((sum, item) => {
                return sum + item.quantityLoading;
            }, 0) : 0;
        },
        sumMun () {
            return this.tableData.length > 0 ? this.tableData.reduce((sum, item) => {
                return sum + item.settlementPrice * item.settlementQuantity;
            }, 0) : 0;
        },
        sumMpayTotal () {
            return this.tableData.length > 0 ? this.paymentList.reduce((sum, item) => {
                return sum + item.payTotal;
            }, 0) : 0;
        },
        orderSettles () {
            return this.orderSettle.length > 0 ? this.orderSettle.reduce((sum, item) => {
                return sum + parseFloat(item.costCharge);
            }, 0) : 0;
        }
    },
    methods: {
        showContract () {
            this.$refs.orderStep.buyerReviewContract();
        },
        updateQuantityIssued (data) {
            this.quantityIssued = data;
            console.log(this.quantityIssued);
        },
        refundPayment () {
            this.$router.push({
                name: 'createPayment',
                params: this.callbacksd,
                query: {
                    orderNo: this.payMent.orderNumber,
                    orderType: this.payMent.orderType,
                    payMethod: this.payMent.payMethod,
                    billType: this.payMent.billType,
                    userId: this.userId,
                    orderId: this.orderId
                }
            });
        },
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
            });
        },
        getOrderInfo () { // 获取订单信息
            let that = this;
            that.$http.post(that.$api.order.buyerSettle, {'orderId': that.orderId, 'userId': that.userId})
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.resData = res.data.data;
                        that.tableData = that.resData.itemList;
                        that.infUnitOfMeasureDisplayName = that.tableData[0].infUnitOfMeasureDisplayName;
                        that.paymentList = that.resData.paymentList;
                        that.orderSettle = that.resData.orderSettleChargesList;
                        if (that.resData.orderSettleChargesList.length > 0) {
                            that.chargeData.orderSettleChargesList = that.resData.orderSettleChargesList;
                        }
                        if (that.tableData.length > 0) {
                            for (let i = 0; i < that.tableData.length; i++) {
                                let sum = 0;
                                sum = that.tableData[i].settlementPrice * that.tableData[i].settlementQuantity;
                                that.settleAmount2 = that.settleAmount2 + sum;
                            }
                        }
                        let parseInts = 0;
                        let parseIntse = 0;
                        if (that.orderSettle.length > 0) {
                            that.orderSettleBooer = false;
                            for (let i = 0; i < that.orderSettle.length; i++) {
                                parseInts = parseInts + that.orderSettle[i].costCharge;
                            }
                        }
                        that.settleAmount1 = that.settleAmount2 + parseInts;
                        if (that.paymentList.length > 0) {
                            for (let j = 0; j < that.paymentList.length; j++) {
                                parseIntse = parseIntse + that.paymentList[j].payTotal;
                            }
                        }
                        that.settleAmountMoney = that.settleAmount1 - parseIntse;
                        if (that.tableData.length > 0) {
                            that.tableDataList = true;
                        }
                        if (that.paymentList.length > 0) {
                            that.paymentListDate = true;
                        }

                        that.checkApproveStatus(that.resData.settleId);
                    } else {
                        that.$alert(res.data.message, '提示');
                    }
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
                    } else {
                        this.$message(res.data.message);
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
                    if (res.data.data.approveStatus === 0 || res.data.data.approveStatus === 3) {
                        console.log('1111111111');
                    } else {
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
                                if (res.data.data.orderStatus === 4) {
                                    that.infofinsh = false;
                                }
                            }
                        }
                        if (res.data.data.orderStatus === 4) {
                            that.collectionStatus = 10;
                            that.finshFour = false;
                            that.finshe = false;
                            that.finshed = true;
                        }
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
        },
        checkApproveStatus (settleId) {
            // 检查审批状态，如果是正在审批中则显示'查看审批流程'的链接
            this.odrSettleId = settleId;
            let params = {targetId: settleId, targetType: 23, subSysType: 1};
            let user = JSON.parse(localStorage.getItem('userInfo'));
            if (user) {
                params.affiliatedCompanyId = user.companyId;
            }
            if (params.affiliatedCompanyId == null || params.affiliatedCompanyId === undefined || params.affiliatedCompanyId === 0) {
                this.$alert('未获取到当前用户所在公司信息，不能查询审批操作状态');
                return false;
            }
            this.$http.post(this.$api.processes.bizApproveStatus, params).then((res) => {
                if (res.data.code === 0) {
                    if (res.data.data.rsltStatus === 1) {
                        this.isApproving = true;
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        },
        openApprListDlg () {
            // 打开审批历史对话框
            let params = {targetId: this.odrSettleId, targetType: 23, subSysType: 1};
            let user = JSON.parse(localStorage.getItem('userInfo'));
            if (user) {
                params.affiliatedCompanyId = user.companyId;
            }
            if (params.affiliatedCompanyId == null || params.affiliatedCompanyId === undefined || params.affiliatedCompanyId === 0) {
                this.$alert('未获取到当前用户所在公司信息，不能查询审批操作记录');
                return false;
            }

            this.$refs.myApprHisDlg.getAppHisList(params);
        }
    }
};
</script>
<style lang="scss">
    .order {
        .unit {
            position: absolute;
            right: 40px;
            top: 10px;
        }
        .add-box {
            text-align: right;
            display: block;
            position: relative;
            i {
                position: absolute;
                cursor: pointer;
                right: 10px;
                top: -25px;
                font-size: 20px;
                color: $color-minor;
            }
        }
        .other-charge {
            padding-top: 10px;
            padding-bottom: 0;
            position: relative;
            .gy-form-group {
                padding-bottom: 0;
            }
            i {
                position: absolute;
                cursor: pointer;
                right: 10px;
                top: 50%;
                font-size: 20px;
                margin-top: -18px;
                color: $color-minor;
            }
        }
        .settleInfo-apply {
            border-bottom: 1px solid $color-light;
            h3 {
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
            span {
                width: 50px !important;
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
            .text {
                width: 18px !important;
                height: 18px !important;
            }
        }
        .settleInfo-totol {
            text-align: right;
            margin-right: 50px;
            margin-top: 15px;
            p {
                width: 240px;
                margin-right: 0px;
                border-top: 1px solid $color-light;
                display: inline-block;
            }
            span {
                display: inline-block;
                width: 115px;
                padding-right: 5px;
            }
            .settleInfo-pay {
                font-weight: bold;
            }
            .settleInfo-money-color {
                color: $color-highlight;
            }
        }
        .settle-dialog {
            .el-dialog__header {
                font-weight: bold;
                padding: 0px;
            }
            .el-dialog__body {
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
            .state-tips-first {
                color: $color-warning;
            }
            span {
                color: $color-black;
            }
            .tt {
                margin-left: 40px;
                cursor: pointer;
            }
        }
        .tabs {
            .el-tabs__item:hover {
              color: $color-title;
           }
            .el-tabs__item {
               color: $color-main;
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
                .transaction tr:not(:first-child) td {
                    border: 1px solid $color-border
                }
                .transaction tr td {
                    padding: 10px;
                    text-align: center;
                }
                .transaction tr.update-title td {
                    background: #fbfbfc;
                    text-align: left;
                    padding: 0 10px 0;
                }
                .transaction tr td.tleft {
                    text-align: left;
                    padding-left: 10px;
                    padding-top: 10px;
                }
                td .img-box {
                    float: left;
                    border: 1px solid $color-border;
                    margin: 8px 10px 10px 0px;
                    img {
                        width: 58px;
                        height: 58px;
                    }
                }
                td .tleft-box {
                    float: left;
                    margin: 10px 10px 10px 0px;
                }
            }
            table tr:nth-child(odd) td {
                background-color: #F2F3F7;
            }
            table tr:first-child td {
                height: 40px;
                background-color: #EEF3F8;
                font-weight: bold;
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

    }

</style>
