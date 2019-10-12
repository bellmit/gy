<!--
    订单状态流程
-->

<template>
    <div class="order-step">
        <div v-if="orderData.orderStatus === 5">
            {{ orderData.orderType === 'buy' ? '您已驳回订单，请重新创建订单' : '买方已驳回订单，请重新创建订单。' }}
        </div>
        <template v-else>
            <div class="">
                <i class="el-icon-tickets"></i>
                <span>{{ stepData.title }}</span>
            </div>
            <div class="order-step-list" v-if="stepData.list && stepData.list.length > 0">
                <gy-step :step="index+1" :showLine="stepData.list && !(index === stepData.list.length - 1)" :isRight="stepData.list && (index === stepData.list.length - 1)" :isActive="stepData.list && (index === stepData.list.length - 1)" :isDone="stepData.done" v-for="(item, index) in stepData.list" :key="index">
                    <div class="order-step-info">
                        <div v-html="item.name"></div>
                        <span>{{ item.remark }}</span>
                    </div>
                </gy-step>
            </div>
            <div class="order-btn-group">
                <span><strong>温馨提示：</strong>{{ stepData.tips }}</span>
                <div v-if="viewContract" class="contract-view" @click="showContractAll">合同预览<i class="iconfont icon-ca"></i></div>
                <button v-for="(item, index) in btnList" :key="index" @click="orderOperation(item.function, item)" :class="{'gy-button-normal': true, 'gy-button-extra': index === btnList.length - 1 }">{{ item.button }}</button>
                <!--<button  @click="buyerConfirmContract" class="gy-button-normal">测试签约</button>-->
            </div>

            <el-dialog title="发货" :visible.sync="billFormVisible" width="400px" class="dialog">
                <el-form :model="billForm" size="mini">
                    <div class="base-info">
                        <dl>
                            <dt>买家:</dt>
                            <dd>{{orderData.buyerCompanyName}}</dd>
                        </dl>
                        <dl>
                            <dt>订单号:</dt>
                            <dd>{{orderData.odrOrderSn}}</dd>
                        </dl>
                        <dl>
                            <dt>交割库:</dt>
                            <dd>{{orderData.orderItemList && orderData.orderItemList[0].deliveryWarehouseName}}</dd>
                        </dl>
                        <dl>
                            <dt>交割库地址</dt>
                            <dd>{{ orderData.orderItemList && orderData.orderItemList[0].deliveryDetailedAddress}}</dd>
                        </dl>
                        <dl>
                            <dt>交付方式</dt>
                            <dd>{{orderData.deliveryType === 0 ? '买家自提、卖家代运都可以' : orderData.deliveryType === 1 ? '买家自提' : '卖家代运'}}</dd>
                        </dl>
                        <dl>
                            <dt>上传货权单凭证</dt>
                            <dd>
                                <gy-upload :url="imgApi" v-model="billFormData.voucher"></gy-upload>
                            </dd>
                        </dl>
                    </div>
                    <table>
                        <tr>
                            <td>品名</td>
                            <td>订单数量</td>
                            <td>已出库数量</td>
                            <td>本次出库数量</td>
                            <td>操作</td>
                        </tr>
                        <tr v-for="(item, index) in orderData.orderItemList" :key="index">
                            <td>{{item.skuName}}</td>
                            <td>{{item.skuQuantity}}吨</td>
                            <td>{{quantityIssued ? quantityIssued :0}}吨</td>
                            <td><input type="number" v-model="billFormData.outNum" > 吨</td>
                            <td>删除</td>
                        </tr>
                    </table>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <button class="gy-button-extra" @click="billSubmit" >提交</button>
                </div>
            </el-dialog>

            <transition name="fade">
                <gy-contract :show-btn="contractForm.showBtn" :show-contract.sync="contractForm.showContract" :file="contractForm.contractUrl" @handlechapter="contractSign"></gy-contract>
            </transition>

            <el-dialog title="提示" width="400px" class="settle-dialogs"
                       :visible.sync="cashData.visible">
                <div class="settleInfo-applys"><h3>发票上传</h3></div>
                <gy-upload :url="imgApi" v-model="cashData.img"></gy-upload>
                <span slot="footer" class="dialog-footer">
                    <button class="gy-button-extra" @click="sureUrls">确认</button>
                </span>
            </el-dialog>

            <el-dialog title="合同" width="400px" class="settle-dialogs"
                       :visible.sync="signUnderLineData.visible">

                <gy-upload v-if="orderData.orderType === 'sell'" :url="imgApi" v-model="signUnderLineData.list"></gy-upload>

                <div v-else class="previewer-img">
                    <img @click="showPreviewer" v-for="(item, index) in signUnderLineData.list" :src="item.url" :key="index" alt="">
                </div>

                <span slot="footer" class="dialog-footer">
                    <button class="gy-button-extra" @click="signUnderLine">确认</button>
                </span>
            </el-dialog>

            <!-- 预览图片 -->
            <el-dialog title="图片预览" :visible.sync="previewerImg.visible" width="400px">
                <el-carousel ref="previewerImg" trigger="click" :autoplay="false">
                    <el-carousel-item v-for="(item, index) in previewerImg.list" :key="index">
                        <img class="previewer-img-detail" :src="item.url">
                    </el-carousel-item>
                </el-carousel>
            </el-dialog>
        </template>
    </div>
</template>

<script>
import gyUpload from '@/components/upload';
import gyStep from '@/components/step';
import gyContract from '@/components/contract';

const orderType = {
    buy: '买方',
    sell: '卖方'
};

export default {
    name: 'orderStep',
    components: {
        gyStep, gyUpload, gyContract
    },
    props: {
        stepData: {
            type: Object,
            default: function () {
                return {
                    tips: '温馨提示内容',
                    active: 0,
                    title: '标题',
                    done: false,
                    list: [
                        {
                            name: '签约',
                            remark: '备注'
                        },
                        {
                            name: '实施',
                            remark: '备注'
                        },
                        {
                            name: '结算',
                            remark: '备注'
                        },
                        {
                            name: '支付',
                            remark: '备注'
                        },
                        {
                            name: '完成',
                            remark: '备注'
                        }
                    ],
                    btnList: [
                        {
                            name: '签约',
                            function: 'wancheng'
                        },
                        {
                            name: '实施',
                            function: 'wancheng'
                        }
                    ]
                };
            }
        },
        orderData: {
            type: Object,
            default: function () {
                return {
                    orderType: 'buy' // buy 买方 sell 卖方
                };
            }
        },
        quantityIssued: Number
    },
    data () {
        return {
            previewerImg: {
                visible: false,
                list: []
            },
            imgApi: '',
            billFormVisible: false,
            billForm: {},
            billFormData: {
                voucher: [],
                outNum: 1
            },
            btnAllowedList: [],
            contractForm: {
                showBtn: false,
                showContract: false,
                btnData: {},
                contractUrl: ''
            },
            // 保证金发票
            cashData: {
                visible: false,
                img: []
            },
            signUnderLineData: {
                visible: false,
                list: [
                    // {
                    //     filepath: 'http://img3.imgtn.bdimg.com/it/u=3597382613,1842885761&fm=27&gp=0.jpg'
                    // },{
                    //     filepath: 'http://img2.imgtn.bdimg.com/it/u=1337856628,2826638814&fm=27&gp=0.jpg'
                    // },{
                    //     filepath: 'http://img1.imgtn.bdimg.com/it/u=61561371,604619965&fm=27&gp=0.jpg'
                    // }
                ]
            },
            viewContract: false // 查看合同
        };
    },
    computed: {
    },
    watch: {
        'contractForm.showContract' (newValue, oldValue) {
        },
        'orderData.orderStatus': {
            handler (newValue, oldValue) {
                if (newValue === 3 && this.orderData.orderType === 'buy') { this.$router.push({name: 'sellerSettle', query: { orderId: this.orderData.id }}); }
            },
            deep: true
        },
        btnList () {
            if (this.stepData.btnList && this.stepData.btnList.length > 0) {
                return this.stepData.btnList.filter(item => {
                    // item.button = item.button.slice(2);
                    if (item.function === 'sellerReviewContract' && this.orderData.orderType === 'sell') {
                        this.viewContract = true;
                    } else if (item.function === 'buyerReviewContract' && this.orderData.orderType === 'buy') {
                        this.viewContract = true;
                    } else {
                        item.button = item.button.replace(/卖方|买方/g, '');
                        return item.tradeSide === orderType[this.orderData.orderType];
                    }
                });
            } else {
                return [];
            }
        }
    },
    methods: {
        // 保证金发票提交
        sureUrls () {
            this.cashData.img.map(item => {
                item.orderId = this.orderData.id;
                item.invoiceUrl = item.filePath;
            });
            this.$http.post(this.$api.invoice.sellerSavaInvoice, {
                orderInvoiceModelList: this.cashData.img
            }).then((res) => {
                if (res.data.code === 0) {
                    this.cashData.visible = false;
                    // this.$router.push({name: 'sellerSettle', query: { orderId: this.orderData.id }});
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            }).catch(() => {
                console.log('出错了');
            });
        },
        getBtnFunction () {
            // 获取所有按钮
            this.$http.get(this.$api.order.allowedFunctions).then((res) => {
                if (res.data.code === 0) {
                    this.btnAllowedList = res.data.data;
                }
            });
        },
        // 创建合同
        coutractCreate () {
            this.$http.get(`${this.$api.order.contractCreate}/${this.orderData.id}/ca`).then((res) => {
                if (res.data.code === 0) {
                    this.contractForm.contractUrl = res.data.data && res.data.data.docUrl;
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        },
        showContractAll () {
            if (this.orderData.orderType === 'buy') {
                this.getCountract();
            } else {
                this.getCountract();
            }
        },
        // 盖章合同
        contractSign () {
            let userId = this.orderData.orderType === 'buy' ? 2 : 1;
            let orderStatus = userId;
            this.$http.post(`${this.$api.order.contractCreate}/${this.orderData.id}/sign/${userId}/contracts`).then((res) => {
                if (res.data.code === 0) {
                    this.contractForm.contractUrl = res.data.data && res.data.data.path;
                    this.contractForm.showBtn = false;
                    // this.signUnderLineData.visible = false;
                    this.orderSign(this.contractForm.btnData, orderStatus);
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        },
        orderOperation (fun, data) {
            this[fun](data);
        },
        // 卖方线上签约  卖方
        sellerSignOnline (data) {
            this.contractForm.showContract = true;
            this.contractForm.btnData = data;
            this.coutractCreate();
            this.contractForm.showBtn = true;
        },
        // 卖方找物流  卖方
        sellerSearchForLogistics (data) {
            this.$router.push({name: 'transportFind', query: {trade: true, skuCode: this.orderData.orderItemList[0].skuCode}});
        },
        // 卖方查看合同  卖方
        sellerReviewContract (data) {
            this.getCountract(data);
            // if(true) {
            //     this.contractForm.showContract = true;
            //     this.contractForm.btnData = data;
            //     this.coutractCreate();
            //     this.contractForm.showBtn = false;
            // } else {
            //     this.getCountract();
            // }
        },
        // 卖方保证金催款  卖方
        sellerAskForDeposit (data) {
            // 先不做
        },
        // 卖方保证金发票  卖方
        sellerDepositInvoice (data) {
            this.cashData.visible = true;
        },
        // 卖方发货买方
        sellerStartDelivery (data) {
            this.billFormVisible = true;
        },
        // 卖方催货款  卖方
        sellerAskForPayment (data) {
            // 不要了
        },
        // 卖方货款发票  卖方
        sellerPaymentInvoice (data) {
            this.cashData.visible = true;
        },
        // 卖方结算卖方
        sellerStartSettlement (data) {
            // 找丁行
            this.$router.push({name: 'sellerSettle', query: { orderId: this.orderData.id, dialogVisible: true }});
        },
        // 卖方结算付款  卖方
        sellerSettlementPayment (data) {
            // 找丁行
            this.$router.push({name: 'sellerSettle', query: { orderId: this.orderData.id, dialogVisible: true }});
        },
        // 卖方查看结算  卖方
        sellerViewSettlement (data) {
            // 找丁行
        },
        // 卖方结算催款  卖方
        sellerAskForSettlement (data) {
            // 不做
        },
        // 卖方完成卖方
        sellerFinish (data) {
            // 不知道怎么做
            // 同测
        },
        // 买方确认合同  买方
        buyerConfirmContract (data) {
            // if(true) {
            //     this.contractForm.showContract = true;
            //     this.contractForm.btnData = data;
            //     this.coutractCreate();
            //     this.contractForm.showBtn = true;
            // } else {
            this.getCountract(data, true);
            // }
        },
        // 买方驳回合同  买方
        buyerRejectOrder (data) {
            this.orderSign(data, 0);
        },
        // 买方找物流  买方
        buyerSearchForLogistics (data) {
            this.$router.push({name: 'transportFind', query: {trade: true, skuCode: this.orderData.orderItemList[0].skuCode}});
        },
        // 买方查看合同  买方
        buyerReviewContract (data) {
            this.getCountract(data);
            // if(true) {
            //     this.contractForm.showContract = true;
            //     this.contractForm.btnData = data;
            //     this.coutractCreate();
            //     this.contractForm.showBtn = false;
            // } else {
            //     this.getCountract();
            // }
        },
        // 买方保证金付款  买方
        buyerPayDepositBill (data) {
            this.$router.push({name: 'createPayment', query: { orderNo: this.orderData.odrOrderSn, orderType: 1, billType: 1, payMethod: 2 }});
        },
        // 买方催发货  买方
        buyerAskForTransport (data) {
            // 不做
        },
        // 买方付货款  买方
        buyerPayment (data) {
            this.$router.push({name: 'createPayment', query: { orderNo: this.orderData.odrOrderSn, orderType: 1, billType: 1, payMethod: 1 }});
        },
        // 买方确认结算  买方
        buyerConfirmSettlement (data) {
            // 找丁行
        },
        // 买方驳回结算  买方
        buyerRejectSettlement (data) {
            // 找丁行
        },
        // 买方查看结算  买方
        buyerViewSettlement (data) {
            // 找丁行
        },
        // 买方结算付款  买方
        buyerSettlementPayment (data) {
            // 找丁行
        },
        // 买方结算催款  买方
        buyerAskForSettlement (data) {
            // 不做
        },
        // 买方完成买方
        buyerFinish (data) {
            // 调接口
        },
        // 卖方结束发货  卖方
        sellerEndDelivery (data) {
            // 等接口
            // this.$http.post(this.$api.order.sign, {
            //         orderId: this.orderData.orderId,
            //         orderStatus: 0
            //     }).then(function (res) {
            //         if(res.data.code === 0) {
            //             // this.$router.push({name: ''})
            //             // this.$emit('updateData');
            //         }
            //     });
        },
        // 卖方线下签约  卖方
        sellerSignOffline (data) {
            // 跳转页面
            this.contractForm.btnData = data;
            this.signUnderLineData.visible = true;
        },
        // 订单签约
        orderSign (data) {
            let userId = this.orderData.orderType === 'buy' ? 2 : 1;
            let orderStatus = userId;
            this.$http.post(this.$api.order.sign, {
                orderId: this.orderData.id,
                allowedFunctionsId: data.id,
                orderStatus: orderStatus
            }).then((res) => {
                if (res.data.code === 0) {
                    this.$emit('updateData');
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        },
        getCountract (data, status) {
            // v1/order/233/contracts/getDocUrl
            this.$http.get(`trade/v1/order/${this.orderData.id}/contracts/getDocUrl`).then((res) => {
                if (res.data.code === 0) {
                    this.contractForm.btnData = data;
                    if (res.data.data.isOnline === 1) {
                        // this.contractForm.showContract = true;
                        //
                        // // this.coutractCreate();
                        // this.contractForm.showBtn = status || false;

                        this.contractForm.showContract = true;
                        this.contractForm.btnData = data;
                        this.contractForm.contractUrl = res.data.data.filepath[0];
                        this.contractForm.showBtn = true;
                    } else {
                        this.signUnderLineData.visible = true;
                        this.signUnderLineData.list = [];
                        res.data.data.filepath.map(item => {
                            this.signUnderLineData.list.push({
                                filePath: item,
                                url: item
                            });
                        });
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        },
        // 创建货权单
        billSubmit () {
            let deliveryOrderItemList = [];
            this.orderData.orderItemList.map(item => {
                deliveryOrderItemList.push(Object.assign(item, {
                    quantityPlanned: this.billFormData.outNum
                }));
            });
            this.$http.post(this.$api.order.delivery, {
                odrOrderId: this.orderData.id,
                deliveryMethod: this.orderData.deliveryType,
                estimatedArrivalEndTimestamp: this.orderData.orderItemList && this.orderData.orderItemList[0].deliveryBeginDate,
                estimatedArrivalStartTimestamp: this.orderData.orderItemList && this.orderData.orderItemList[0].deliveryEndDate,
                deliveryOrderFileModel: [
                    {
                        filePath: this.billFormData.voucher && this.billFormData.voucher[0] && this.billFormData.voucher[0].filePath,
                        quantityPlanned: this.billFormData.outNum,
                        skuCode: this.orderData.orderItemList && this.orderData.orderItemList[0].skuCode,
                        skuName: this.orderData.orderItemList && this.orderData.orderItemList[0].skuName
                    }
                ],
                deliveryOrderItemList: deliveryOrderItemList
            }).then((res) => {
                if (res.data.code === 0) {
                    this.billFormVisible = false;
                    // if(res.data.data.isDeliveryFinish === 1) {
                    //     this.$router.push({name: 'sellerSettle', query: { orderId: this.orderData.id }})
                    // } else {
                    this.$emit('updateData');
                    // }
                }
            });
        },
        // 线下签约
        signUnderLine () {
            if (this.signUnderLineData.list.length === 0) {
                this.$message({
                    type: 'error',
                    message: '请上传合同'
                });
                return;
            }

            let orderContractFileList = [];
            this.signUnderLineData.list.map(item => {
                orderContractFileList.push({
                    filepath: item.filePath
                });
            });
            console.log(orderContractFileList, this.signUnderLineData.list);
            let orderStatus = this.orderData.orderType === 'buy' ? 2 : 1;

            this.$http.post(`trade/v1/order/${this.orderData.id}/contracts/create`, {
                orderContractFileList: orderContractFileList
            }).then((res) => {
                if (res.data.code === 0) {
                    this.signUnderLineData.visible = false;
                    this.signUnderLineData.list = [];
                    this.orderSign(this.contractForm.btnData, orderStatus);
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        },
        showPreviewer () {
            this.previewerImg.visible = true;
            this.previewerImg.list = this.signUnderLineData.list;
        }
    }
};
</script>

<style lang="scss">
    .order-step .el-carousel__item {
        overflow: auto;
    }
</style>

<style lang="scss" scoped>
    .order-btn-group {
        position: relative;
    }
    .contract-view {
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -3em;
        width: 6em;
        padding-top: 4px;
        /*line-height: 3em;*/
        text-align: center;
        color: blue;
        font-size: 12px;

        i {
            margin-left: 3px;
            font-size: 12px;
            color: inherit;
        }
    }

    .order-step {
        /*padding-top: 20px;*/

        h3 {
            font-size: 16px;
            line-height: 2;
            margin: 0 auto;
            font-weight: normal;
        }
    }

    .order-step-info {
        font-size: 12px;
        padding: 10px 0;
    }

    .order-step-list {
        padding-top: 20px;
        .step-box {
            float: left;
        }
    }

    .order-btn-group {
        .gy-button-normal {
            float: right;
            margin-left: 10px;
        }

        span {
            line-height: 30px;
        }
    }

    .previewer-img {
        img {
            width: 80px;
            margin-right: 10px;
        }
    }

    .previewer-img-detail {
        width: 100%;
    }
</style>
