<!--
    订单状态流程
-->
<template>
    <div class="order-step">
        <template>
            <div style="margin-left: -5px">
                <i v-show="stepData.title === '失效'" class="iconfont icon-dingdanxinxi left_i"></i>
                <i v-show="stepData.title === '签约'" class="iconfont icon-qianyue left_i "></i>
                <i v-show="stepData.title === '收款与交割'" class="iconfont icon-shoukuanyujiaoge left_i "></i>
                <span class="right_span">{{ stepData.title }}</span>
            </div>
            <div class="order-step-list" v-if="stepData.list && stepData.list.length > 0">
                <gy-step :step="index+1" :showLine="stepData.list && !(index === stepData.list.length - 1)"
                         :isRight="stepData.list && (index === stepData.list.length - 1)"
                         :isActive="stepData.list && (index === stepData.list.length - 1)" :isDone="stepData.done"
                         v-for="(item, index) in stepData.list" :key="index">
                    <div class="order-step-info">
                        <div v-html="item.name"></div>
                        <span>{{ item.remark }}</span>
                    </div>
                </gy-step>
            </div>
            <div class="order-btn-group">
                <span class="newspan"><strong class="wxts">温馨提示：</strong>{{ stepData.tips }}</span>
                <div v-if="viewContract" class="contract-view" @click="showContractAlls">合同预览<i
                    class="iconfont icon-ca"></i></div>
                <button class="gy-button-views" style="cursor:pointer;font-size: 14px;" v-if="isApproving" @click="openApprListDlg">查看审批流程</button>
                <button v-for="(item, index) in btnList" :key="index" @click="orderOperation(item.function, item)"
                        :class="{'gy-button-normal': true, 'gy-button-extra': index === btnList.length - 1 }">{{
                    item.button }}
                </button>
            </div>
            <el-dialog title="发货" :visible.sync="billFormVisible" width="750px" class="dialog">
                <el-form :model="billForm" size="mini">
                    <div class="base-info">
                        <dl>
                            <dt>买家</dt>
                            <dd>{{orderData.buyerCompanyName}}</dd>
                        </dl>
                        <dl>
                            <dt>订单号</dt>
                            <dd>{{orderData.odrOrderSn}}</dd>
                        </dl>
                        <dl>
                            <dt>交割库</dt>
                            <dd>{{orderData.orderItemList && orderData.orderItemList[0].deliveryWarehouseName}}</dd>
                        </dl>
                        <dl>
                            <dt>交割库地址</dt>
                            <dd>{{orderData.orderItemList && orderData.orderItemList[0].deliveryDetailedAddress}}</dd>
                        </dl>
                        <dl>
                            <dt>交付方式</dt>
                            <dd>{{orderData.deliveryType === 1 ? '买家自提' : '卖家代运'}}</dd>
                        </dl>
                        <dl>
                            <dt>上传相关凭证</dt>
                            <dd>
                                <gy-upload :url="imgApi" v-model="billFormData.voucher"></gy-upload>
                            </dd>
                        </dl>
                    </div>
                    <table class="gy-table hqd-table">
                        <thead>
                        <tr>
                            <th>品名</th>
                            <th>订单数量（吨）</th>
                            <th>已出库数量（吨）</th>
                            <th>本次出库数量（吨）</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tr v-for="(item, index) in orderData.orderItemList" :key="index">
                            <td>{{item.skuName}}</td>
                            <td class="align-r">{{item.skuQuantity}}</td>
                            <td class="align-r">{{ item.quantityIssued | numToCash(3) }}</td>
                            <td class="align-r"><input v-model="billFormData.outNum"></td>
                            <td class="align-c">-</td>
                        </tr>
                    </table>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <!--<el-checkbox v-if="orderData.isBatchDelivery === 1" v-model="isDeliveryFinish">如果货已发完，请点击发货完成，直接进入结算环节。</el-checkbox>-->
                    <button class="gy-button-extra" @click="billSubmit">提交</button>
                    <button v-if="orderData.isBatchDelivery === 1" class="gy-button-normal" @click="billDone">发货已完成
                    </button>
                    <i v-if="orderData.isBatchDelivery === 1" style="position: absolute;right:22px;margin-top:-14px;" class="iconfont icon-tishi2" title="如果本次发货后已全部发完，点击后将强制结束发货进入结算流程。"></i>
                </div>
            </el-dialog>

            <transition name="fade">
                <gy-contract :show-btn="contractForm.showBtn" :show-contract.sync="contractForm.showContract"
                             :file="contractForm.contractUrl" @handlechapter="contractPwd"></gy-contract>
            </transition>

            <el-dialog title="提示" width="400px" class="settle-dialogs"
                       :visible.sync="cashData.visible">
                <div class="settleInfo-applys"><h3>发票上传</h3></div>
                <gy-upload :url="imgApi" v-model="cashData.img"></gy-upload>
                <span slot="footer" class="dialog-footer">
                    <button class="gy-button-extra" @click="sureUrls">确认</button>
                </span>
            </el-dialog>

            <!-- 合同预览使用的dialog上传图片 -->
            <el-dialog title="合同" width="600px" class="settle-dialogs"
                       :visible.sync="signUnderLineData.visible">

                <gy-upload v-if="orderData.orderType === 'sell'" :url="newimgApi"
                           v-model="signUnderLineData.list"></gy-upload>

                <div v-else class="previewer-img">
                    <img @click="showPreviewer" v-if="item.filePath.indexOf('.pdf') === -1" v-for="(item, index) in signUnderLineData.list" :src="item.url" :key="index" alt="">
                    <a :href="item.filePath" target="_blank" v-else>
                        <img :src="pdfThumbnail" alt="">
                    </a>
                </div>

                <span slot="footer" class="dialog-footer">
                    <button class="gy-button-extra" @click="signUnderLine">确认</button>
                </span>
            </el-dialog>

            <!-- 预览图片 -->
            <el-dialog title="图片预览" :visible.sync="previewerImg.visible" width="800px" height="800px">
                <el-carousel ref="previewerImg" trigger="click" :autoplay="false">
                    <el-carousel-item v-for="(item, index) in previewerImg.list" :key="index">
                        <img class="previewer-img-detail" :src="item.url">
                    </el-carousel-item>
                </el-carousel>
            </el-dialog>
            <!--验证签约密码-->
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
                <el-form ref="form" label-width="70px">
                    <el-form-item label="签约密码" prop="account">
                        <el-input v-model="contractPasswd" type="password"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                        <div class="gy-form-button">
                            <button type="button" class="gy-button-extra" @click="testContractPwd">确定</button>
                            <button type="button" class="gy-button-normal" @click="dialogVisible = false">取消</button>
                        </div>
                </span>
            </el-dialog>
        </template>
        <!-- 审批历史 弹窗组件 -->
        <approveHistory ref="myApprHisDlg"></approveHistory>
        <!-- 合同预览图片 -->
        <el-dialog title="图片预览" :visible.sync="previewerImgOrder.visible" width="600px" hight="1000px">
            <el-carousel ref="previewerImgOrder" trigger="click" :autoplay="false" v-show="previewerImgOrder.list.length!=0">
                <el-carousel-item v-for="(item, index) in previewerImgOrder.list" :key="index">
                    <img class="previewer-img-detail" :src="item.filepath" style="width: 100%;height: 100%">
                </el-carousel-item>
            </el-carousel>
            <img v-show="previewerImgOrder.list.length==0" src="@/assets/images/fp.png" alt="" style="width: 100%;height: 100%">
        </el-dialog>
        <!-- 确认收货弹出 -->
        <el-dialog
            class='hqd-dialog base-info'
            title="货权交割信息"
            :visible.sync="hqdialogVisible"
            :close-on-click-modal="true"
            :close-on-press-escape="true"
            width="750px">
            <div class='clearfix'>
                <dl>
                    <dt>买家</dt>
                    <dd>{{orderData.buyerCompanyName}}</dd>
                </dl>
                <dl>
                    <dt>订单号</dt>
                    <dd>{{orderData.odrOrderSn}}</dd>
                </dl>
                <dl>
                    <dt>交割库</dt>
                    <dd>{{orderData.orderItemList && orderData.orderItemList[0].deliveryWarehouseName}}</dd>
                </dl>
                <dl>
                    <dt>交割库地址</dt>
                    <dd>{{orderData.orderItemList && orderData.orderItemList[0].deliveryDetailedAddress}}</dd>
                </dl>
                <dl>
                    <dt>交付方式</dt>
                    <dd>{{orderData.deliveryType === 1 ? '买家自提' : '卖家代运'}}</dd>
                </dl>
                <dl class="hqdpz">
                    <dt>货权单凭证</dt>
                    <dd v-if="img && img.indexOf('.pdf') !== -1">
                        <a :href="item.filePath" v-for="item in imgList" :key="item.createdDate" target="_blank"><img src="../../../assets/images/pdf.png" alt=""></a>
                    </dd>
                    <dd v-else>
                        <img v-if="img" :src="img" alt="" @click="showImg">
                    </dd>
                </dl>
            </div>
            <table class="gy-table hqd-table">
                <thead>
                <tr>
                    <th>品名</th>
                    <th>订单数量（吨）</th>
                    <th>发货数量（吨）</th>
                    <th>签收数量（吨）</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in hqdData.deliveryOrderItemList" :key="index">
                    <td>{{item.skuName}}</td>
                    <td class="align-r">{{item.skuQuantity}}</td>
                    <td class="align-r">{{item.quantityPlanned}}</td>
                    <td class="align-r">
                        <input v-model="item.quantityLoading">
                    </td>
                    <td class="align-c">-</td>
                </tr>
                </tbody>
            </table>
            <div class="footer">
                <span>
                    <strong class="wxts">温馨提示：</strong>请收到货后，在确认收货！确认收货后款项就会打给对方。
                </span>
                <button class="gy-button-extra fr" @click="confirmReceipt">确认收货</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import gyUpload from '@/components/upload';
import gyStep from '@/components/step';
import gyContract from '@/components/contract';
import approveHistory from '../../../components/approveHistory';

const orderType = {
    buy: '买方',
    sell: '卖方'
};

export default {
    name: 'orderStep',
    components: {
        gyStep, gyUpload, gyContract, approveHistory
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
                        },
                        {
                            name: '失效',
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
            hqdialogVisible: false,
            confirmDeliveryList: [],
            mockList: [
                {
                    id: 0,
                    val: 'is'
                }
            ],
            consignment: {},
            pdfThumbnail: require('../../../assets/images/pdf.png'),
            previewerImg: {
                visible: false,
                list: []
            },
            newimgApi: '',
            imgApi: '',
            billFormVisible: false,
            sellerbillForm: [],
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
                list: []
            },
            previewerImgOrder: {
                list: [],
                visible: false
            },
            viewContract: false, // 查看合同
            isUseContractPSW: false,
            dialogVisible: false,
            contractPasswd: '',
            isApproving: false, // 是否正在合同审批中
            apprTargetType: 0, // 审批对象类型(因为签约和结算都用到这个'order-step'，所以要做区分)
            hqdData: [],
            img: null,
            imgList: [],
            isRefund: {
                visible: false,
                list: []
            },
            isDeliveryFinish: false
        };
    },
    computed: {
        btnList () {
            if (this.stepData.btnList && this.stepData.btnList.length > 0) {
                let that = this;
                return this.stepData.btnList.filter(item => {
                    // item.button = item.button.slice(2);
                    if (item.function === 'sellerReviewContract' && this.orderData.orderType === 'sell') {
                        that.viewContract = true;
                    } else if (item.function === 'buyerReviewContract' && this.orderData.orderType === 'buy') {
                        that.viewContract = true;
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
    watch: {
        'contractForm.showContract' (newValue, oldValue) {
        },
        'orderData.orderStatus': {
            handler (newValue, oldValue) {
                if (newValue === 3) {
                    if (this.orderData.orderType === 'sell') {
                        this.$router.push({name: 'sellerSettle', query: {orderId: this.orderData.id}});
                    } else {
                        this.$router.push({name: 'buyerSettle', query: {orderId: this.orderData.id}});
                    }
                }
            },
            deep: true
        }
    },
    methods: {
        orderOperation (fun, data) {
            this[fun](data);
        },
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
            this.$http.get(`${this.$api.order.contractCreate}/${this.orderData.id}/contracts/getDocUrl`).then((res) => {
                if (res.data.code === 0) {
                    this.contractForm.contractUrl = res.data.data && res.data.data.filepath[0];
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        },
        showContractAll () {
            let orderId = this.orderData.id;
            this.$http.get(this.$api.invoice.DocUrl + orderId + '/contracts/getDocUrl')
                .then((res) => {
                    if (res.data.code === 0) {
                        this.previewerImgOrder.list = res.data.data.fileList;
                        this.previewerImgOrder.visible = true;
                    }
                });
        },
        // 修改
        showContractAlls () {
            if (this.orderData.orderType === 'buy') {
                this.getCountract();
            } else {
                this.getCountract();
            }
        },
        contractPwd () {
            if (this.isUseContractPSW) {
                this.dialogVisible = true;
            } else {
                this.contractSign();
            }
        },
        testContractPwd () {
            let query = {
                contractPwd: this.contractPasswd
            };
            this.$http.post(this.$api.order.contractPwd, query).then(res => {
                if (res.data.code === 0) {
                    this.dialogVisible = false;
                    this.contractPasswd = '';
                    this.contractSign();
                } else {
                    this.$message({
                        type: 'info',
                        message: res.data.message
                    });
                }
            });
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
        // 卖方线上签约  卖方
        sellerSignOnline (data) {
            this.contractForm.showContract = true;
            this.contractForm.btnData = data;
            this.coutractCreate();
            this.contractForm.showBtn = true;
        },
        // 卖方找物流  卖方
        sellerSearchForLogistics (data) {
            this.$router.push({
                name: 'transportFind',
                query: {trade: true, enquiryFromId: this.orderData.id, skuCode: this.orderData.orderItemList[0].skuCode, skuName: this.orderData.orderItemList[0].skuName}
            });
        },
        // 卖方查看合同  卖方
        sellerReviewContract (data) {
            this.contractForm.showBtn = false;
            this.getCountract(data);
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
            this.$http.get(`trade/v1/orders/${this.orderData.id}/deliveryQuantity`).then((res) => {
                this.billFormData.outNum = res.data.data.orderItemList[0].quantityPlanned || 0;
            });
            this.billFormData.voucher = [];
            this.billFormVisible = true;
            this.sellerbillForm = data;
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
            //
            this.$router.push({name: 'sellerSettle', query: {orderId: this.orderData.id, dialogVisible: true}});
        },
        // 卖方结算付款  卖方
        sellerSettlementPayment (data) {
            //
            this.$router.push({name: 'sellerSettle', query: {orderId: this.orderData.id, dialogVisible: true}});
        },
        // 卖方查看结算  卖方
        sellerViewSettlement (data) {
            //
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
            this.contractForm.showBtn = true;
            this.getCountract(data, true);
        },
        // 买方驳回合同  买方
        buyerRejectOrder (data) {
            this.orderSign(data, 0);
        },
        // 买方找物流  买方
        buyerSearchForLogistics (data) {
            this.$router.push({
                name: 'transportFind',
                query: {trade: true, enquiryFromId: this.orderData.id, skuCode: this.orderData.orderItemList[0].skuCode, skuName: this.orderData.orderItemList[0].skuName}
            });
        },
        // 买方查看合同  买方
        buyerReviewContract (data) {
            this.contractForm.showBtn = false;
            this.getCountract(data);
        },
        // 买方保证金付款  买方
        buyerPayDepositBill (data) {
            this.$router.push({
                name: 'createPayment',
                query: {orderNo: this.orderData.odrOrderSn, orderType: 1, billType: 1, payMethod: 2}
            });
        },
        // 买方催发货  买方
        buyerAskForTransport (data) {
            // 不做
        },
        // 买方付货款  买方
        buyerPayment (data) {
            this.$router.push({
                name: 'createPayment',
                query: {orderNo: this.orderData.odrOrderSn, orderType: 1, billType: 1, payMethod: 1}
            });
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
            var that = this;
            that.$confirm('<span><i class="iconfont icon-message-warning"></i>如果您的货已发完，可以强制结束，进入结算环节，是否确认发货完成？</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                let params = {
                    odrOrderId: that.orderData.id,
                    allowedFunctionsId: data.id
                };
                that.$http.post(that.$api.order.deliveries, params).then(res => {
                    if (res.data.code === 0) {
                        that.$message({
                            type: 'info',
                            message: res.data.message
                        });
                        location.reload();
                        return;
                    }
                    that.$message(res.data.message);
                });
            });
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
            this.$http.get(`trade/v1/order/${this.orderData.id}/contracts/getDocUrl`).then((res) => {
                if (res.data.code === 0) {
                    this.contractForm.btnData = data;
                    if (res.data.data.isOnline === 1) {
                        this.contractForm.showContract = true;
                        this.contractForm.btnData = data;
                        this.contractForm.contractUrl = res.data.data.filepath[0];
                    } else {
                        this.signUnderLineData.visible = true;
                        this.signUnderLineData.list = [];
                        res.data.data.filepath.map(item => {
                            let path;
                            path = (item.indexOf('.pdf') === -1) ? item : this.pdfThumbnail;
                            this.signUnderLineData.list.push({
                                filePath: item,
                                url: path
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
            // if (Number(this.billFormData.outNum) === 0) {
            //     this.$message.error('请输入本次出库数量，数量不能为0');
            //     return;
            // }
            this.$alert('请确认已上传发货凭证，并准确填写本次发货数量。提交后无法修改。', '提示', {type: 'warning'}).then(() => {
                let deliveryOrderItemList = [];
                this.orderData.orderItemList.map(item => {
                    deliveryOrderItemList.push(Object.assign(item, {
                        quantityPlanned: this.billFormData.outNum
                    }));
                });
                if (this.billFormData.voucher && this.billFormData.voucher[0] && this.billFormData.voucher[0].filePath) {
                    let voucher = [];
                    for (let val of this.billFormData.voucher.values()) {
                        voucher.push({
                            filePath: val && val.filePath
                        });
                    }
                    this.consignment = {
                        isDeliveryFinish: this.isDeliveryFinish ? 1 : 0,
                        allowedFunctionsId: this.sellerbillForm.id,
                        odrOrderId: this.orderData.id,
                        deliveryMethod: this.orderData.deliveryType,
                        estimatedArrivalEndTimestamp: this.orderData.orderItemList && this.orderData.orderItemList[0].deliveryEndDate,
                        estimatedArrivalStartTimestamp: this.orderData.orderItemList && this.orderData.orderItemList[0].deliveryBeginDate,
                        deliveryOrderFileList: voucher,
                        deliveryOrderItemList: deliveryOrderItemList,
                        loadingWarehouseAddress: deliveryOrderItemList[0].deliveryDetailedAddress
                    };
                } else {
                    this.consignment = {
                        isDeliveryFinish: this.isDeliveryFinish ? 1 : 0,
                        allowedFunctionsId: this.sellerbillForm.id,
                        odrOrderId: this.orderData.id,
                        deliveryMethod: this.orderData.deliveryType,
                        estimatedArrivalEndTimestamp: this.orderData.orderItemList && this.orderData.orderItemList[0].deliveryEndDate,
                        estimatedArrivalStartTimestamp: this.orderData.orderItemList && this.orderData.orderItemList[0].deliveryBeginDate,
                        deliveryOrderFileList: [],
                        deliveryOrderItemList: deliveryOrderItemList,
                        loadingWarehouseAddress: deliveryOrderItemList[0].deliveryDetailedAddress
                    };
                }
                this.$http.post(this.$api.order.deliveries, this.consignment).then((res) => {
                    if (res.data.code === 0) {
                        this.billFormVisible = false;
                        this.$emit('updateData');
                    }
                });
            });
        },
        // 发货完成
        billDone () {
            this.isDeliveryFinish = true;
            this.billSubmit();
        },
        showImg () {
            this.previewerImgOrder.visible = true;
            this.imgList.map(item => {
                item['filepath'] = item.filePath;
            });
            this.previewerImgOrder.list = this.imgList;
        },
        // 买方确认收货按钮
        confirmDelivery (data) {
            var that = this;
            if (data.id === 58) {
                that.$confirm('<span><i class="iconfont icon-message-warning"></i>确认收货后前一笔货款将支付给对方，是否确认？</span>', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true
                }).then(() => {
                    let params = {
                        allowedFunctionsId: data.id,
                        odrOrderId: that.orderData.id
                    };
                    that.$http.post(this.$api.order.deliveries, params).then(res => {
                        if (res.data.code === 0) {
                            that.$message({
                                type: 'info',
                                message: res.data.message
                            });
                            location.reload();
                            return;
                        }
                        that.$message(res.data.message);
                    });
                });
            } else if (data.id === 53) {
                that.hqdialogVisible = true;
                that.confirmDeliveryList = data;
                that.$http.get(that.$api.order.confirm + that.orderData.id).then(res => {
                    if (res.data.code === 0) {
                        that.hqdData = res.data.data[0];
                        that.img = that.hqdData.deliveryOrderFileList.length !== 0 && that.hqdData.deliveryOrderFileList[0].filePath;
                        that.hqdData.deliveryOrderFileList.length !== 0 && (that.imgList = that.hqdData.deliveryOrderFileList);
                        return;
                    }
                    that.$message(res.data.message);
                });
            }
        },
        // 确认收货
        confirmReceipt () {
            let params = {
                deliveryOrderId: this.hqdData.deliveryOrderId,
                allowedFunctionsId: this.confirmDeliveryList.id,
                odrOrderId: this.orderData.id,
                deliveryOrderItemList: []
            };
            this.hqdData.deliveryOrderItemList.map(item => {
                params.deliveryOrderItemList.push({
                    deliveryOrderItemId: item.deliveryOrderItemId,
                    quantityUnloading: Number(item.quantityLoading)
                });
            });
            this.$http.post(this.$api.order.deliveries, params).then(res => {
                if (res.data.code === 0) {
                    this.hqdialogVisible = false;
                    this.$message({
                        type: 'info',
                        message: res.data.message
                    });
                    location.reload();
                    return;
                }
                this.$message(res.data.message);
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
        },
        getContractPwd () {
            this.$http.get(this.$api.account.isHasContractPwd).then(res => {
                if (res.data.code === 0) {
                    this.isUseContractPSW = res.data.data.enableContractPwd === 1;
                }
            });
        },
        checkApproveStatus () {
            // 检查审批状态，如果是正在审批中则显示'查看审批流程'的链接
            // 这里由于vue加载次序的问题，还没有'orderData'的值，只能再取一次
            this.$http.get(this.$api.sale.detail + '/' + this.$route.query.orderId).then((res) => {
                this.apprTargetType = 0;
                if (res.data.code === 0) {
                    if (res.data.data.orderStatus === 1) {
                        this.apprTargetType = 2;
                    } else if (res.data.data.orderStatus === 3) {
                        this.apprTargetType = 21;
                    }
                    if (this.apprTargetType !== 0) {
                        let params = {targetId: this.$route.query.orderId, targetType: this.apprTargetType, subSysType: 1};
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
            let params = {targetId: this.orderData.id, targetType: this.apprTargetType, subSysType: 1};
            let user = JSON.parse(localStorage.getItem('userInfo'));
            if (user) {
                params.affiliatedCompanyId = user.companyId;
            }
            if (params.affiliatedCompanyId == null || params.affiliatedCompanyId === undefined || params.affiliatedCompanyId === 0) {
                this.$alert('未获取到当前用户所在公司信息，不能查询审批操作记录');
                return false;
            }

            this.$refs.myApprHisDlg.getAppHisList(params);
        },
        // 申请退款
        buyerApplyRefund (data) {
            this.applyRefund('请确认是否申请退款？', data);
        },
        // 同意退款
        sellerAgreeRefund (data) {
            this.applyRefund('请确认是否同意退款申请？', data);
        },
        // 驳回退款
        sellerRejectRefund (data) {
            this.applyRefund('请确认是否驳回退款申请', data);
        },
        applyRefund (text, data) {
            var that = this;
            that.$confirm('<span><i class="iconfont icon-message-warning"></i>' + text + '</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                let params = {
                    odrOrderId: that.orderData.id,
                    allowedFunctionsId: data.id
                };
                that.$http.post(that.$api.order.deliveries, params).then(res => {
                    if (res.data.code === 0) {
                        that.$message({
                            type: 'info',
                            message: res.data.message
                        });
                        location.reload();
                        return;
                    }
                    that.$message(res.data.message);
                });
            });
        }
    },
    created () {
        this.getContractPwd();
        // 更改合同上传图片的路径
        this.newimgApi = this.$api.salesOrde.upload;
    },
    mounted () {
        this.checkApproveStatus();
    }
};
</script>

<style lang="scss">
    .order-step .el-carousel__item {
        overflow: auto;
    }
    .order-step .el-carousel__container{height:600px}
    .order-step .el-checkbox{margin-right:0;}
    .order-step .el-checkbox__input.is-checked+.el-checkbox__label{color: #606266;}
    .order-step{
        .el-dialog__footer{
            padding: 0 30px 30px;
       }
    }
    .hqd-dialog {
        .el-dialog__body {
            padding: 20px 16px 30px;
        }
    }
</style>
<style lang="scss" scoped>
    @import '../../../styles/mixin/_index.scss';
    .hqd-dialog {
        .gy-form-group {
            .l {
                padding-left: 0;
            }
        }
        table {
            margin-top: 10px;
        }
        .footer {
            margin-top: 20px;
            span {
                color: #666;
                font-size: 14px;
                strong {
                    color: #EEA443;
                    font-weight: bold;
                }
            }
        }
    }
    .hqdpz img {
        width: 32px;
        height: auto;
    }
    .base-info dl {
        width: 50%;
        float: left;
        font-size: $small-font;
        text-align: left;
        min-height: 30px;
        margin: 0;
        dt {
            width: 85px;
            float: left;
            margin: auto 10px;
            color: $color-title;
            font-size: 14px;
        }
        dd {
            float: left;
            color: $color-main;
            padding-left: 10px;
            font-size: 14px;
            img {
                width: 30px;
                height: 20px;
                margin-left: 10px;
                border: 1px solid $color-border;
                border-radius: $border-radius-small;
                cursor: pointer;
            }
        }
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
        color: #4A90e2;
        font-size: 14px;
        cursor: pointer;
        i {
            margin-left: 3px;
            font-size: 12px;
            color: inherit;
        }
    }

    .order-step {
        h3 {
            font-size: 16px;
            line-height: 2;
            margin: 0 auto;
            font-weight: normal;
        }
        .left_i{
            font-size: 12px;
            color: #333;
            margin-right: 4px;
            vertical-align: bottom;
        }
        .right_span{
            font-size: 14px;
            font-weight: bold;
            color: #333;
        }
    }

    .order-step-info {
        font-size: 12px;
        padding: 10px 0;
    }

    .order-step-list {
        @extend %clearfix;
        padding-top: 20px;
        padding-left: 20px;
        .step-box {
            float: left;
        }
    }
    .order-btn-group {
        padding-left: 20px;
        position: relative;
        margin-top: 20px;
        .wxts{
            color: #EEA443;
            font-size: 14px;
            font-weight: bold;
        }
        .gy-button-normal {
            float: right;
            margin-left: 10px;
        }

        span {
            line-height: 30px;
        }
        .newspan{
            font-size: 14px;
            color: #666;
        }
    }

    .previewer-img {
        img {
            height: 60px;
            width: 60px;
            border-radius: 5px;
            border: 1px solid $color-border;
            margin-right: 10px;
        }
    }

    .previewer-img-detail {
        width: 100%;
    }
    .gy-form-button {
        padding-right: 0;
    }
    .title-fh{
        td{
            font-weight: bold;
        }
    }
</style>
