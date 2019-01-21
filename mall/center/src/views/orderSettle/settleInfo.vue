<template>
    <div class="order">
        <el-card class="box-card">
            <div slot="header" class="order-header">
                <div class="title">销售订单</div>
                <div  class="title2">订单号：{{info.odrOrderSn}}</div>
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
                        <span>付款单状态</span>
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
                        <button class="gy-button-extra" v-if="infoRefund" @click="refundPayment()">退款</button>
                        <button class="gy-button-extra" v-if="infoRefunds">确认收款</button>
                        <button class="gy-button-extra" v-if="infofinsh" @click="finsh()">完成</button>
                        <button class="gy-button-extra" v-if="infofinshs" @click="openVisible()">发票</button>
                    </div>
                    <el-dialog width="1062px" class="settle-dialog"
                               @open="handleOpen" :visible.sync="dialogVisible" @close="goback()">
                        <div class="settleInfo-apply"><h3>订单结算申请</h3></div>
                        <h3><i class="iconfont icon-settle" @click="dialogVisiblesss"></i>结算明细</h3>
                        <table class="gy-table">
                            <thead>
                            <tr>
                                <td>No</td>
                                <td>品名</td>
                                <td>订单数量</td>
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
                                <td>{{index+1}}</td>
                                <td>{{item.productName}}</td>
                                <td>{{item.quantity|numToCash(3)}}</td>
                                <td>{{item.price |numToCash}}</td>
                                <td>{{item.totalAmount |numToCash}}</td>
                                <td>{{item.quantityLoading|numToCash(3)}}</td>
                                <td>
                                    <input type="text" placeholder="请输入结算数量" :disabled="!resour"
                                           v-model="item.settlementQuantity" min="0"
                                           onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,3})?/)[0] : ''" @change="changeTheNumber(item)">
                                </td>
                                <!--<td><input type="text" placeholder="请输入结算单价" :disabled="!resour"-->
                                <!--v-model="item.settlementPrice" min="0"-->
                                <!--onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"><span></span>-->
                                <!--</td>-->
                                <td>{{item.settlementPrice}}</td>
                                <td>
                                    <input type="text" placeholder="请输入结算金额" :disabled="!resour" v-model="item.settlementAmount"
                                           onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''" @change="changeTheAmount(item)">
                                </td>
                            </tr>
                            <tr v-if="tableDataList">
                                <td colspan="4">汇总</td>
                                <td>{{sumtotalAmount |numToCash}}</td>
                                <td>{{sumquantityLoading |numToCash(3)}} </td>
                                <td colspan="2"></td>
                                <td>{{sumMun |numToCash}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <h3><i class="iconfont icon-settle"></i>收款明细</h3>
                        <table class="gy-table">
                            <thead>
                            <tr>
                                <th>No</th>
                                <td>收款单号</td>
                                <td>收款时间</td>
                                <td>支付方式</td>
                                <td>收款银行</td>
                                <td>收款金额(元)</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in paymentList" :key="index">
                                <th>{{index+1}}</th>
                                <td>{{item.payNumber}}</td>
                                <td>{{item.createdDate | date}}</td>
                                <td>{{item.tradeMode| tradeMode}}</td>
                                <td>{{item.buyerDepositBank}}</td>
                                <td>{{item.payTotal |numToCash}}</td>
                            </tr>
                            <tr v-if="paymentListDate">
                                <td colspan="5">汇总</td>
                                <td>{{sumMpayTotal |numToCash}}</td>
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
                                <input type="text" class="gy-input" v-model="item.costCharge" @change = "callSettlement" :disabled="!resour">
                                <span class="unit">元</span>
                            </div>
                            <i class="iconfont icon-minus" @click="remove(index)"></i>
                        </div>
                        <span class="add-box" v-if="resour">
                            <i class="iconfont icon-add" @click="add"></i>
                        </span>
                        <div class="settleInfo-totol">
                            <span class="settleInfo-money">订单总金额:</span>
                            <span>{{orderMoney |numToCash}} 元</span>
                        </div>
                        <div class="settleInfo-totol">
                            <span class="settleInfo-money">已收款总金额:</span>
                            <span>{{paidMoney.toFixed(2) |numToCash}} 元</span>
                        </div>
                        <div class="settleInfo-totol">
                            <span class="settleInfo-money">申请结算总金额:</span>
                            <span>{{settleAmount3 + orderSettles | numToCash}} 元</span>
                        </div>
                        <!--<div class="settleInfo-totol" v-if="!orderSettleBooer">-->
                        <!--<span class="settleInfo-money">申请结算总金额:</span>-->
                        <!--<span>{{settleAmount1 |numToCash}} 元</span>-->
                        <!--</div>-->
                        <div class="settleInfo-totol">
                            <p>
                                <span class="settleInfo-money settleInfo-pay">需对方支付:</span>
                                <span
                                        class="settleInfo-money-color">{{settleAmount3-paidMoney + orderSettles | numToCash}} 元</span>
                            </p>
                        </div>
                        <!--<div class="settleInfo-totol" v-if="!orderSettleBooer">-->
                        <!--<p>-->
                        <!--<span class="settleInfo-money settleInfo-pay">需对方支付:</span>-->
                        <!--<span-->
                        <!--class="settleInfo-money-color">{{settleAmountMoney | numToCash}} 元</span>-->
                        <!--</p>-->
                        <!--</div>-->
                        <div class="settleInfo-totol">
                            <button class="gy-button-extra" @click="handleToSettle()" v-if="resour">确认发起结算</button>
                            <button class="gy-button-extra" @click="dialogVisiblesss" v-if="!resour">关闭</button>
                        </div>
                    </el-dialog>
                    <el-dialog width="100px;" class="settle-dialogs"
                               :visible.sync="Visible">
                        <div class="settleInfo-applys"><h3>发票</h3></div>
                        <div class="img-holder" v-if="settleInfoUrl && !isReupload"
                             :style='"background-image: url(" + imgBaseUrl + settleInfoUrl + ")"'></div>
                        <el-upload
                                action="api"
                                list-type="picture-card"
                                :http-request="settleInfoImg">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <span slot="footer" class="dialog-footer">
                            <button class="gy-button-extra" @click="sureUrls">确认</button>
                        </span>
                    </el-dialog>
                </template>
            </div>
        </el-card>
        <div>
            <p class="mewmyp"><i class="iconfont icon-dingdanxinxi mewmyicon"></i> <span class="mewmyfont">订单信息</span></p>
            <el-row>
                <el-col :span="24">
                    <gy-order-settle @showContract="showContracts" :order-data="info" user-type="sell"></gy-order-settle>
                </el-col>
            </el-row>
            <div class="tabs mynewtabs">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="订单明细" name="first">
                        <gy-order-detail :order-data="info" :order-item-data="orderItemList"></gy-order-detail>
                    </el-tab-pane>
                    <el-tab-pane label="收款明细" name="second">
                        <gy-order-payment :order-no="info.odrOrderSn" user-type="sell"></gy-order-payment>
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
import gyUpload from '@/components/upload';
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
        gyUpload,
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
            orderStatus: 0, // 这里结算有两个状态，一是等待买家发起结算，二是(买家发起结算后)买家确认结算金额
            amount: 0,
            amounts: 0,
            dialogVisible: false,
            tableData: [],
            paymentList: [],
            paidAmount: '',
            orderIds: {},
            startSettlementOrderMsg: {},
            SettlementOrderMsg: '',
            orderSettleStatus: '',
            infoRefund: false,
            infoRefunds: false,
            infoPayment: false,
            completeState: false,
            orderSettleStatuSure: true,
            refundsState: false,
            Visible: false,
            dialogImageUrl: '',
            settleInfoUrl: '',
            imgBaseUrl: '',
            imgApi: '',
            cashData: {
                img: []
            },
            paymentListDate: false,
            tableDataList: false,
            payMent: {},
            orderItemList: [],
            infofinsh: false,
            infofinshs: false,
            gobacklList: false,
            info: {},
            src1: require('../../assets/images/default1.jpg'),
            src: require('../../assets/images/default.jpg'),
            icon: require('../../assets/images/icon-piao.png'),
            transactionInfo: {},
            logistics: {},
            params: {
                data: {
                    id: ''
                }
            },
            collectionStatus: 10,
            sureUrl: {
                orderInvoiceModelList: [
                    {
                        invoiceUrl: '',
                        orderId: ''
                    }
                ]
            },
            resour: true,
            finshe: true,
            finshed: false,
            finshFour: true,
            signUnderLineData: {
                orderInvoiceModelList: []
            },
            chargeData: {
                orderSettleChargesList: []
            },
            settleAmount1: 0,
            parseIntNum: 0,
            settleAmountMoney: 0,
            settleAmount2: 0,
            tableDatas: [],
            orderSettle: [],
            orderSettleBooer: true,
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
    },
    computed: {
        settleAmount3: function () {
            return this.tableData.length > 0 ? this.tableData.reduce((total, item) => {
                return total + item.settlementPrice * item.settlementQuantity;
            }, 0) : 0;
        },
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
        goback () {
            if (this.gobacklList === true) {
                this.dialogVisible = false;
            } else {
                this.$router.push({name: 'salesDetail', query: {orderId: this.orderId}});
            }
        },
        changeTheNumber (items) {
            items.settlementAmount = items.settlementPrice * items.settlementQuantity;
            if (items.settlementAmount.toString().split('.')[1].length > 2) {
                let t = items.settlementAmount.toFixed(2);
                items.settlementAmount = parseFloat(t);
            } else {
                let tt = items.settlementAmount.toFixed(2);
                items.settlementAmount = parseFloat(tt);
            }
        },
        changeTheAmount (items) {
            items.settlementPrice = items.settlementAmount / items.settlementQuantity;
            if (items.settlementPrice.toString().split('.')[1].length > 2) {
                let ttt = items.settlementPrice.toFixed(8);
                items.settlementPrice = parseFloat(ttt);
            } else {
                let tttt = items.settlementPrice.toFixed(2);
                items.settlementPrice = parseFloat(tttt);
            }
        },
        callSettlement () {
            // this.sumSettleAmount();
            this.otherExpenses();
        },
        remove: function (idx) {
            this.orderSettleBooer = false;
            this.chargeData.orderSettleChargesList.splice(idx, 1);
            this.sumSettleAmount();
            this.otherExpenses();
        },
        add () {
            this.orderSettleBooer = false;
            this.chargeData.orderSettleChargesList.push(
                {
                    costItem: null,
                    costCharge: null
                }
            );
        },
        // 计算其他费用
        otherExpenses () {
            this.orderSettle = this.chargeData.orderSettleChargesList;
            this.parseIntNum = 0;
            for (let i = 0; i < this.chargeData.orderSettleChargesList.length; i++) {
                if (this.chargeData.orderSettleChargesList[i].costCharge === null) {
                    this.chargeData.orderSettleChargesList[i].costCharge = 0;
                }
                this.parseIntNum = this.parseIntNum + parseFloat(this.chargeData.orderSettleChargesList[i].costCharge);
            }
        },
        dialogVisiblesss () {
            let that = this;
            that.dialogVisible = true;
            that.$router.push({name: 'salesList'});
        },
        refundPayment () {
            this.$router.push({
                name: 'createPayment',
                query: {
                    orderNo: this.payMent.orderNumber,
                    orderType: this.payMent.orderType,
                    payMethod: this.payMent.payMethod,
                    billType: this.payMent.billType,
                    userId: this.userId,
                    orderId: this.orderId,
                    amount: this.amounts
                }
            });
        },
        showContracts () {
            this.$refs.orderStep.buyerReviewContract();
        },
        updateQuantityIssued (data) {
            this.quantityIssued = data;
            console.log(this.quantityIssued);
        },
        finsh () {
            let that = this;
            that.$http.post(that.$api.order.fish, {orderId: that.orderId, userId: that.userId})
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.postStartSettlementOrderMsg();
                        that.finshe = false;
                        that.finshed = true;
                    }
                }).catch(() => {
                    console.log('出错了');
                });
        },
        sureUrls () {
            let that = this;
            if (that.signUnderLineData.orderInvoiceModelList.length === 0) {
                that.$message({
                    type: 'error',
                    message: '请上传发票'
                });
                return;
            }
            that.signUnderLineData.userId = that.userId;
            console.log(that.signUnderLineData);
            that.$http.post(that.$api.invoice.sellerSavaInvoice, that.signUnderLineData).then((res) => {
                if (res.data.code === 0) {
                    that.Visible = false;
                } else {
                    that.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            }).catch(() => {
                console.log('出错了');
            });
        },
        settleInfoImg (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.invoice.settleInvoice, formData, headers)
                .then(function (res) {
                    that.isReupload = true;
                    that.signUnderLineData.orderInvoiceModelList.push({
                        orderId: that.orderId,
                        invoiceUrl: res.data.data
                    });
                    console.log(that.signUnderLineData);
                });
        },
        getInfo () {
            let that = this;
            that.$http.get(that.$api.sale.detail + '/' + that.orderId)
                .then(function (res) {
                    that.info = res.data.data;
                    console.log(res.data);
                    console.log(that.info.odrOrderSn);
                    that.orderItemList = res.data.data.orderItemList;
                    if (res.data.data.orderStatus === 2) {
                        console.log(typeof (that.$route.query.dialogVisible));
                        if (that.$route.query.dialogVisible === 'true' || that.$route.query.dialogVisible === true) {
                            that.dialogVisible = true;
                        } else {
                            that.dialogVisible = false;
                        }
                        // that.dialogVisible = that.$route.query.dialogVisible;
                    }
                }).catch(() => {
                    console.log('出错了');
                });
        },
        getOrderInfo () { // 获取订单信息
            let that = this;
            console.log(that.orderId);
            that.$http.post(that.$api.order.sellerSettle, {'orderId': that.orderId, 'userId': that.userId})
                .then(function (res) {
                    if (res.data.code === 0) {
                        let resData = res.data.data;
                        that.tableData = resData.itemList;
                        that.infUnitOfMeasureDisplayName = that.tableData[0].infUnitOfMeasureDisplayName;
                        that.paymentList = resData.collectionList;
                        that.orderSettle = resData.orderSettleChargesList;
                        if (res.data.data.orderSettleChargesList.length > 0) {
                            that.chargeData.orderSettleChargesList = res.data.data.orderSettleChargesList;
                        }
                        if (that.tableData.length > 0) {
                            that.tableDataList = true;
                            for (let i = 0; i < that.tableData.length; i++) {
                                if (that.tableData[i].settlementQuantity === null) {
                                    that.tableData[i].settlementQuantity = that.tableData[i].quantity;
                                }
                                if (that.tableData[i].settlementPrice === null) {
                                    that.tableData[i].settlementPrice = that.tableData[i].price;
                                }
                                if (that.tableData[i].settlementAmount === null) {
                                    that.tableData[i].settlementAmount = that.tableData[i].totalAmount;
                                }
                            }
                        }
                        if (that.paymentList.length > 0) {
                            that.paymentListDate = true;
                        }

                        that.checkApproveStatus(resData.settleId);
                    } else {
                        this.$alert(res.data.message, '提示');
                    }
                    // throw new Error(res.data.message);
                });
        },
        openVisible () {
            this.Visible = true;
        },
        handleClick (tab, event) {
            console.log(tab, event);
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
        payClick () {
            let that = this;
            that.payMent.orderType = 1;
            that.payMent.billType = 2;
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
        postStartSettlementOrderMsg () {
            let that = this;
            that.startSettlementOrderMsg.orderId = that.orderId;
            that.startSettlementOrderMsg.userId = that.userId;
            that.$http.post(that.$api.order.startSettlementOrderMsg, that.startSettlementOrderMsg)
                .then(function (res) {
                    that.SettlementOrderMsg = res.data.data.msg;
                    that.settleBalance = res.data.data.settleBalance;
                    that.orderNumber = res.data.data.orderNumber;
                    that.orderSettleStatus = res.data.data.orderSettleStatus;
                    that.payClick();
                    if (res.data.data.approveStatus === 0 || res.data.data.approveStatus === 3) {
                        that.resour = false;
                    } else {
                        if (that.orderSettleStatus === 30) {
                            that.collectionStatus = 50;
                            that.infoPayment = true;
                            if (that.settleBalance > 0) {
                                that.refundsState = true;
                            }
                            if (that.settleBalance < 0) {
                                that.infoRefund = true;
                                that.amounts = Math.abs(that.settleBalance);
                            }
                            if (that.settleBalance === 0) {
                                that.completeState = true;
                            }
                        }
                        if (that.orderSettleStatus === 20) {
                            that.orderSettleStatuSure = false;
                        }
                        if (that.orderSettleStatus <= 10) {
                            that.resour = true;
                        } else {
                            that.resour = false;
                            that.dialogVisible = false;
                        }
                        if (res.data.data.paymentStatus === 50) {
                            that.infofinsh = true;
                            that.infofinshs = false;
                        }
                        if (res.data.data.orderStatus === 4) {
                            that.collectionStatus = 10;
                            that.finshFour = false;
                            that.finshe = false;
                            that.finshed = true;
                            that.infofinsh = false;
                            that.gobacklList = true;
                            that.infofinshs = true;
                        }
                    }
                }).catch(() => {
                    console.log('出错了');
                });
        },
        handleToSettle () {
            // 确认要发起结算
            if (this.chargeData.orderSettleChargesList.length > 0) {
                for (let i = 0; i < this.chargeData.orderSettleChargesList.length; i++) {
                    if (this.chargeData.orderSettleChargesList[i].costItem === null || this.chargeData.orderSettleChargesList[i].costCharge === null) {
                        this.$message('请填写其他费用');
                        return;
                    }
                }
            }
            const me = this;
            let items = [];
            me.tableData.map(function (item) {
                let itemMap = {};
                itemMap.orderItemId = item.orderItemId;
                itemMap.settlementPrice = item.settlementPrice;
                itemMap.settlementQuantity = item.settlementQuantity;
                itemMap.settlementAmount = item.settlementAmount;
                items.push(itemMap);
            });
            for (let i = 0; i < me.tableData.length; i++) {
                if (me.tableData[i].settlementQuantity === null || me.tableData[i].settlementAmount === null) {
                    me.$message({
                        type: 'error',
                        message: '请填写结算数量或结算单价'
                    });
                    return;
                }
            }
            me.tableData.orderSettleChargesList = me.chargeData.orderSettleChargesList;
            me.$http.post(me.$api.order.saveSettle, {
                'userId': me.userId,
                'orderId': me.orderId,
                'orderItems': items,
                'orderSettleChargesList': me.chargeData.orderSettleChargesList
            }).then(function (response) {
                if (response.data.code === 0) {
                    // let resData = response.data;
                    me.orderSettleStatus = response.data.data.orderSettleStatus;
                    me.dialogVisible = false;
                    me.postStartSettlementOrderMsg();
                    // this.$message(resData.message);
                } else {
                    me.$alert(response.data.message, '提示');
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        handleOpen () {
            this.getOrderInfo();
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
        .settleInfo-apply {
            border-bottom: 1px solid $color-light;
            h3 {
                margin: 10px 0;
            }
        }
        .settleInfo-applys {
            border-bottom: 1px solid $color-light;
            margin-bottom: 15px;
            h3 {
                margin: 10px 0;
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
        .settle-payment-detail {
            width: 60%;
            margin: 20px 0 0 20px;
        }
        .settle-payment-detail-tit {
            font-weight: bold;
            font-size: 16px;
        }
        .settle-payment-detail-tit-content {
            margin-top: 6px !important;
        }
        .settle-dialog {
            .el-dialog__header {
                padding: 0;
            }
            .el-dialog__body {
                padding-top: 3px;
            }
            input {
                width: 85%;
            }
            /*.dist{*/
            /*disabled:disabled;*/
            /*}*/
        }
        .settle-dialogs {
            .img-holder {
                margin-top: 15px;
            }
            .el-dialog__header {
                padding: 0;
            }
            .el-dialog__body {
                padding-top: 3px;
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
        .el-card__header {
            padding: 0 16px;
            height: 35px;
            line-height: 35px;
            .title {
                color: $color-title;
                font-size: 16px;
                font-weight: 700;
                margin-right: 24px;
                float: left;
            }
            .title2{
                float: left;
                font-size: 12px;
                color: #666666;
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
        .base-info dl {
            width: 50%;
            float: left;
            text-align: left;
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
            p {
                margin-top: 40px;
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
            .flow-item-4 {
                left: 300px;
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
