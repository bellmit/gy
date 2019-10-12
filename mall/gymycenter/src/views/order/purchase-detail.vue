<template>
    <div class="order-detail">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div class="title">采购详情</div>
                <div class="title2">订单号：{{info.odrOrderSn}}</div>
                <div class="bright">
                    <ul class="order-state">
                        <li :class="{active:info.orderStatus===1}">签约 ></li>
                        <li :class="{active:info.orderStatus===2}">付款与交割 ></li>
                        <li :class="{active:info.orderStatus===3}">结算与复核 ></li>
                        <li :class="{acitve:info.orderStatus===4}">完成</li>
                    </ul>
                </div>
            </div>
            <gy-order-step ref="orderStep" @updateData="getInfo" :step-data="stepData"
                           :order-data="orderData" :order-img="prebiewImg"></gy-order-step>
        </el-card>
        <div>
            <p class="mewmyp"><i class="iconfont icon-dingdanxinxi mewmyicon" style="font-size: 13px"></i> <span class="mewmyfont">订单信息</span></p>
            <el-row>
                <el-col :span="24">
                    <gy-order-info @showContract="showContract" :order-data="info" :order-view="previewerImgOrder" :order-img="prebiewImg" user-type="buy"></gy-order-info>
                </el-col>
            </el-row>
            <div class="tabs mynewtabs">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="订单明细" name="first">
                        <gy-order-detail :order-data="info" :order-item-data="orderItemList"></gy-order-detail>
                    </el-tab-pane>
                    <el-tab-pane label="付款明细" name="second">
                        <gy-order-payment :order-mark="info.intCurrencyMark" :order-no="info.odrOrderSn"
                                          user-type="buy"></gy-order-payment>
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
    </div>
</template>
<script>
import gyOrderStep from './components/order-step';
import gyOrderInfo from './components/order-info';
import gyOrderPayment from './components/order-payment';
import gyOrderDetail from './components/order-detail';
import gyOrderTransaction from './components/order-transaction';
import gyOrderLogistic from './components/order-logistic';
import {mapGetters} from 'vuex';

export default {
    name: 'purchaseDetail',
    components: {gyOrderStep, gyOrderInfo, gyOrderDetail, gyOrderPayment, gyOrderTransaction, gyOrderLogistic},
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
            },
            previewerImgOrder: {
                list: []
            },
            prebiewImg: {
                list: [],
                preBoolean: false
            }
        };
    },
    computed: mapGetters([
        'socket'
    ]),
    watch: {
        socket: {
            handler: function (newValue, oldValue) {
                if (newValue && newValue.msg) {
                    let data = JSON.parse(newValue.msg);
                    if (data.orderId === this.$route.query.orderId) this.getInfo();
                }
            },
            deep: true
        }
    },
    created () {
        let that = this;
        that.getInfo(); // 基础信息
    },
    methods: {
        getInfo () {
            let that = this;
            that.$http.get(that.$api.sale.detail + '/' + that.orderId).then((res) => {
                let rsData = res.data.data;
                // 判断是否为结算 跳转
                let name = rsData.orderStatus;
                if (name !== 1 && name !== 2 && name !== 5) {
                    name = 'buyerSettle';
                    const {href} = that.$router.resolve({name: name, query: {orderId: rsData.id}});
                    window.location.href = href;
                }
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
                this.orderData = Object.assign(rsData, {orderType: 'buy'});
                this.info = rsData;
                this.showContractOrder(this.info);
                this.showReceiptsImg(this.info);
                that.orderItemList = res.data.data && res.data.data.orderItemList;
                that.orderStatusStepModel = res.data.data && res.data.data.orderStatusStepModelList;
            });
        },
        updateQuantityIssued (data) {
            this.quantityIssued = data;
        },
        showContract () {
            this.$refs.orderStep.buyerReviewContract();
        },
        showContractOrder (item) {
            this.previewerImgOrder.list = [];
            this.$http.get(this.$api.invoice.DocUrl + item.id + '/contracts/getDocUrl')
                .then((res) => {
                    if (res.data.code === 0) {
                        if (res.data.data.filepath.length > 0) {
                            res.data.data.filepath.forEach((e) => {
                                let filepathObj = {
                                    fileTypeAlias: null,
                                    filepath: null
                                };
                                filepathObj.filepath = e;
                                filepathObj.fileTypeAlias = this.$tools.getFileTypeAlias(e);
                                this.previewerImgOrder.list.push(filepathObj);
                            });
                        }
                    }
                });
        },
        showReceiptsImg (item) {
            // 查看发票
            let that = this;
            that.$http.get(that.$api.invoice.sellerInvoiceImg + '/' + item.id)
                .then((res) => {
                    that.prebiewImg.list = res.data.data;
                    if (that.prebiewImg.list > 0) {
                        that.prebiewImg.list.forEach((e) => {
                            e.fileTypeAlias = this.$tools.getFileTypeAlias(e.invoiceUrl);
                        });
                    } else {
                        that.prebiewImg.preBoolean = true;
                    }
                });
        }
    }
};
</script>
<style lang="scss">
    .order-detail {
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
        .im-talk {
            color: $color-highlight;
            cursor: pointer;
            padding-left: 10px;
            .iconfont {
                color: $color-highlight;
                padding-right: 2px;
            }
        }
        .iconfont {
            font-weight: lighter;
            color: $color-minor;
        }
        .sign .line {
            height: 0;
        }
        .bright {
            float: right;
            font-size: 12px;
        }
        .order-state {
            li {
                float: left;
                width: auto;
                color: $color-minor;
                padding-left: 6px;
                &.active {
                    color: $color-highlight;
                }
            }
        }
        .billStatus {
            width: 30%;
            display: flex;
            padding: 20px;
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
                color: $color-minor;
            }
        }
        .yel {
            color: #4a90e2;
            font-size: 12px;
            border: 1px solid #4a90e2;
            border-radius: 5px;
            line-height: 12px;
            padding: 2px;
            cursor: pointer;
        }
        .billStatus-active {
            position: absolute;
            width: 70px;
            text-align: center;
            margin-left: -24px;
            font-size: 10px;
            color: $color-minor;
        }
        .active .billStatus-active {
            color: #000;
        }
        .state-pannel {
            position: relative
        }
        .state-pannel .tips {
            position: absolute;
            bottom: 0px;
            left: 10px;
            color: #2A2A2A
        }
        .tips span:first-child {
            color: #EEA443
        }
        .tips span.bill {
            color: #4A90E2;
            padding-left: 5px
        }
        .tips img {
            width: 35px;
            height: 35px;
            vertical-align: bottom;
            margin-left: 10px;
        }
        .tabs {
            .el-tabs__item:hover {
                color: $color-title;
            }

            .el-tabs__item {
                color: $color-main;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                border: 1px solid #e7ecf1;
                color: $color-main;
                font-size: $small-font;
            }
            table body:nth-child(odd) tr td {
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
            table .ge td {
                line-height: 20px;
            }

            td .img-box {
                float: left;
                border: 1px solid $color-border;
                margin-right: 20px;
                img {
                    width: 58px;
                    height: 58px;
                }
            }
        }
        .total-detail {
            float: right;
            margin: 20px 0;
            dl {
                font-size: $small-font;
                color: $color-title;
                overflow: hidden;
                height: 26px;
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
                min-width: 90px;
                text-align: right;
                margin-left: 10px;
                margin-right: 2px
            }
        }
        .el-card__body {
            padding: 20px 16px 30px 14px;
        }
    }

</style>
