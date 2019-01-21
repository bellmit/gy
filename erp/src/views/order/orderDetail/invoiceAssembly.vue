// 发票
<template>
    <div class="invoiceDetails">
        <!--开票-->
        <el-dialog width="1200px" class="order-dialogs"
                   :before-close="handleCloseTicketOpening"
                   :visible.sync="orderData.dialogVisibles">
            <div class="order-apply">
                <div class="title">申请开票</div>
            </div>
            <div class="block clearfix">
                <div class="gy-form-group">
                    <span class="l"><i>*</i>开票单位名称</span>
                    <input type="text" v-model="invoicePurchase.buyerCompanyName">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>申请日期</span>
                    <div class="searchDate">
                        <div class="d">
                            <el-date-picker
                                    v-model="applyList.applicationDate"
                                    type="date"
                                    value-format="timestamp"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>税号</span>
                    <input type="text" v-model="invoiceCollection.corpTaxCode" placeholder="请输入税号">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>开票数量(吨)</span>
                    <input type="text" v-model="initialData.quantity" placeholder="请输入开票数量">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>开户银行</span>
                    <el-select v-model="applyList.buyerBankName" placeholder="请选择开户银行账户" @change="changeBlank">
                        <el-option
                                v-for="item in newBank"
                                :key="item.bankAccId"
                                :label="item.depositBankName"
                                :value="item.bankAccId">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>开票总金额(元)</span>
                    <input type="text" v-model="initialData.amount" placeholder="请输入开票总金额">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>银行账号</span>
                    <input type="text" v-model="applyList.buyerBankAccount" readonly>
                </div>
                <div class="gy-form-group">
                    <span class="l">品名</span>
                    <span>{{orderMessage.prodName}}</span>
                </div>
                <div style="clear: both"></div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>转让货权总数量(吨)</span>
                    <input type="text" v-model="initialData.deliveredProductQuantity" placeholder="请输入转让货权总数量">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>商品税务编码</span>
                    <template>
                        <el-select v-model="applyList.productTaxCode" placeholder="请选择">
                            <el-option
                                    v-for="item in commodCode"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <div style="clear: both"></div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>已收上游发票(元)</span>
                    <input type="text" v-model="initialData.receiptInvoiceAmount" placeholder="请输入本笔业务已收到上游发票总金额">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>进项票</span>
                    <template>
                        <el-select v-model="applyList.hasReceiptInvoice" placeholder="请选择" style="width: 49%"
                                   @change="entryTicket()">
                            <el-option
                                    v-for="item in entryoptions"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                    <template>
                        <el-select v-model="applyList.receiptInvoiceStatus" placeholder="请选择" style="width: 49%">
                            <el-option
                                    v-for="item in entryoptionTwo"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <div style="clear: both"></div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>经办人</span>
                    <input type="text" v-model="applyList.operationUserName" placeholder="请输入经办人">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>采购交割凭证</span>
                    <span v-if="Array.prototype.isPrototypeOf(invoiceCollection.purchaseDeliverys )  && invoiceCollection.purchaseDeliverys.length > 0"
                          @click="showImg(1)">
                    <i class="iconfont icon-photo"></i>
                  </span>
                    <span v-else>未上传</span>
                </div>
                <div style="clear: both"></div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>销售交割凭证</span>
                    <span v-if="Array.prototype.isPrototypeOf(invoiceCollection.salesDeliverys)  && invoiceCollection.salesDeliverys.length > 0"
                          @click="showImg(2)">
                    <i class="iconfont icon-photo"></i>
                  </span>
                    <span v-else>未上传</span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>收款凭证</span>
                    <span v-if="Array.prototype.isPrototypeOf(invoiceCollection.collections )  && invoiceCollection.collections.length > 0"
                          @click="showImg(3)">
                    <i class="iconfont icon-photo"></i>
                  </span>
                    <span v-else>未上传</span>
                </div>
            </div>
            <!-- 进度条 -->
            <div class="step-title" v-if="!isSubmit">操作流程</div>
            <div class="delivery-step" v-if="!isSubmit">
                <gy-step :step="index+1"
                         :isActive="stepArr && (index === 0)"
                         :doubleLength="stepArr"
                         :isRight="stepArr && (index === stepArr.length - 1)"
                         :showLine="stepArr"
                         :isDone="stepArr && (index === 0)"
                         v-for="(item, index) in stepArr"
                         :key="index">
                    <div class="order-step-info">
                        <div>{{item.username}}</div>
                        <span>{{item.actionDesc}}</span>
                    </div>
                </gy-step>
            </div>
            <div style="margin-top: 10px;text-align: right;padding-bottom: 30px;padding-right: 30px;">
                <button class="gy-button-normal" @click="orderData.dialogVisibles = false"><span
                        v-if="isSubmit">取消</span><span v-else>关闭</span></button>
                <button v-if="isSubmit" class="gy-button-extra" @click="applyTicket()">提交</button>
            </div>
            <dialog-img v-if="dialogVisiblesss" @closedialogvisible="closedialogvisible"
                        :dialogVisible="dialogVisiblesss" :dialogImg="fileList"></dialog-img>
        </el-dialog>
        <!-- 收票 -->
        <el-dialog width="1200px" class="order-dialog"
                   :before-close="handleCloseCollectTickets"
                   :visible.sync="orderData.collectTicketsdialog">
            <div class="order-apply">
                <div class="title">收票</div>
            </div>
            <div class="block clearfix">
                <div class="gy-form-group">
                    <span class="l"><i>*</i>上游公司</span>
                    <!--<input type="text" v-model="collectList.sellerName">-->
                    <input type="text" v-model="invoiceSale.sellerCompanyName">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>收票日期</span>
                    <div class="searchDate">
                        <div class="d">
                            <el-date-picker
                                    v-model="collectList.receiptDate"
                                    type="date"
                                    value-format="timestamp"
                                    placeholder="收票日期"
                            >
                            </el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">品名</span>
                    <span>{{invoiceSale.prodName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">数量(吨)</span>
                    <span>{{invoiceSale.skuQuantity}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">单价(含税/元)</span>
                    <span>{{invoiceSale.skuPrice | numToCash}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">发票总金额(元)</span>
                    <!--<input type="text" v-model="collectList.amount">-->
                    <input type="text" v-model="invoiceSale.invoiceTotalAmount">
                </div>
                <div class="gy-form-group" style="width: 100%">
                    <span class="l"><i>*</i>收票凭证</span>
                    <el-upload
                            action="api"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :http-request="settleInfoImg">
                        <i class="el-icon-plus"></i>
                        <enlarge-image :data-enlarge="enlargeImageObejct"></enlarge-image>
                    </el-upload>
                </div>
            </div>
            <!-- 进度条 -->
            <div class="step-title" v-if="!isSubmit2">操作流程</div>
            <div class="delivery-step" v-if="!isSubmit2">
                <gy-step :step="index+1"
                         :isActive="stepArr2 && (index === 0)"
                         :doubleLength="stepArr2"
                         :isRight="stepArr2 && (index === stepArr2.length - 1)"
                         :showLine="stepArr2"
                         :isDone="stepArr2 && (index === 0)"
                         v-for="(item, index) in stepArr2"
                         :key="index">
                    <div class="order-step-info">
                        <div>{{item.username}}</div>
                        <span>{{item.actionDesc}}</span>
                    </div>
                </gy-step>
            </div>
            <div style="margin-top: 10px;text-align: right;padding-bottom: 30px;padding-right: 30px;">
                <button class="gy-button-normal" @click="orderData.collectTicketsdialog = false"><span v-if="isSubmit2">取消</span><span
                        v-else>关闭</span></button>
                <button v-if="isSubmit2" class="gy-button-extra" @click="collecTicket()">提交</button>
            </div>
        </el-dialog>
        <bank-acc ref="bankAcc" @onSaveAccInfo="popupPaySubmission"></bank-acc>
    </div>
</template>

<script>
import gyStep from '@/components/step1';
import dialogImg from './../../components/dialogImg';
import bankAcc from './../../components/bankAcc';
import enlargeImage from './../../components/enlargeImage';
export default {
    components: {dialogImg, gyStep, bankAcc, enlargeImage},
    props: {
        orderData: Object,
        orderMessage: Object,
        orderIds: Object,
        invoiceSale: Object,
        invoicePurchase: Object,
        initialData: Object,
        commodCode: Array,
        invoiceCollection: Object
    },
    data () {
        return {
            payStatus: 1,
            dialogVisiblesss: false,
            id: null,
            purchaseOrderId: null,
            saleOrderId: null,
            collectTicketReceipt: [], // 发票-收
            collectTickets: [], // 发票-开
            applyList: {
                hasReceiptInvoice: null,
                operationUserName: null,
                productTaxCode: null,
                deliveredProductBillToFinance: 0,
                buyerBankName: null,
                buyerBankAccount: null,
                buyerTaxCode: null,
                applicationDate: null,
                buyerName: null,
                payInfoList: [],
                productSettlementBill: [],
                receiptVoucher: [],
                receiptInvoiceStatus: null
            }, // 申请开票
            collectList: {
                amount: null,
                receiptDate: null,
                sellerName: null,
                receiptInvoiceUrlList: []
            }, // 新建收票
            dialogVisibles: false, // 开票
            collectTicketsdialog: false, // 收票
            entryoptions: [{
                id: 0,
                label: '无进项票'
            }, {
                id: 1,
                label: '有进项票'
            }],
            entryoptionTwo: [],
            entryoptionTwoYes: [{
                id: 0,
                label: '在途中'
            }, {
                id: 1,
                label: '已收到'
            }],
            entryoptionTwoNo: [{
                id: 2,
                label: '先开销项发票'
            }],
            ComentList: { // 收票货权交割单
                receiptList: []
            },
            reapingVoucherComentList: { // 收割凭证
                receiptList: []
            },
            deliveryBillComentList: { // 销售交割单
                receiptList: []
            },
            newBank: [], // 开户行
            handleCheckChangeList: {},
            newDateInvoiceAssembly: '',
            invoiceDeliveryCollection: {},
            fileList: [],
            isSubmit: true,
            isSubmit2: true,
            stepArr: [],
            stepArr2: [],
            threadRunTag: true,
            enlargeImageObejct: {
                dialogImageUrl: '',
                dialogVisibleImg: false
            } // 存放显示图片
        };
    },
    mounted () {
        this.newDateInvoiceAssembly = new Date();
        this.collectList.receiptDate = Date.parse(this.newDateInvoiceAssembly);
        this.applyList.applicationDate = Date.parse(this.newDateInvoiceAssembly);
        let applyListName = JSON.parse(localStorage.getItem('userInfo'));
        this.applyList.operationUserName = applyListName.username;
        this.newPaymentBankAssembly();
    },
    methods: {
        // 收票凭证---放大
        handlePictureCardPreview (file) {
            this.enlargeImageObejct.dialogImageUrl = file.url;
            this.enlargeImageObejct.dialogVisibleImg = true;
        },
        // 关闭弹出框-收票
        handleCloseCollectTickets () {
            this.orderData.collectTicketsdialog = false;
            this.$emit('ivoiceList');
        },
        // 关闭弹出框-开票
        handleCloseTicketOpening () {
            this.orderData.dialogVisibles = false;
            this.$emit('ivoiceList');
        },
        // 查询付款银行
        newPaymentBankAssembly () {
            this.$http.post(this.$api.payment.newBank, {'companyId': this.orderIds.buyerCompanyId}).then((res) => {
                if (res.data.code === 0) {
                    this.newBank = res.data.data;
                }
            });
        },
        // 添加开户行
        changeBlank (selAccInfo) {
            if (selAccInfo === 0) {
                this.$refs.bankAcc.addBank = true;
                this.$refs.bankAcc.creatBank.companyId = this.orderIds.buyerCompanyId; // 这里是下游公司ID
                this.$refs.bankAcc.creatBank.accountName = this.orderIds.buyerCompanyName;
            }
            for (let i = 0; i < this.newBank.length; i++) {
                if (selAccInfo === this.newBank[i].bankAccId) {
                    this.applyList.buyerBankAccount = this.newBank[i].bankAccount;
                    this.applyList.buyerBankName = this.newBank[i].depositBankName;
                }
            }
        },
        // 弹出框选择单条-提交
        popupPaySubmission (accInfo) {
            if (accInfo == null || accInfo === undefined) {
                this.applyList.buyerBankAccount = null;
                this.applyList.buyerBankName = null;
                return;
            }
            this.applyList.buyerBankName = accInfo.depositBank;
            this.applyList.buyerBankAccount = accInfo.companyAccount;
            this.$refs.bankAcc.addBank = false;
            this.newPaymentBankAssembly();
        },
        // 进项票
        entryTicket () {
            if (this.applyList.hasReceiptInvoice === 1) {
                this.applyList.receiptInvoiceStatus = null;
                this.entryoptionTwo = this.entryoptionTwoYes;
            }
            if (this.applyList.hasReceiptInvoice === 0) {
                this.applyList.receiptInvoiceStatus = null;
                this.entryoptionTwo = this.entryoptionTwoNo;
            }
        },
        // 收款凭证
        settleInfoImg (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.upload.imgUpload, formData, headers)
                .then(function (res) {
                    that.collectList.receiptInvoiceUrlList.push(res.data.data);
                });
        },
        // 收款凭证
        reapingVoucher (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.upload.imgUpload, formData, headers)
                .then(function (res) {
                    that.reapingVoucherComentList.receiptList.push(res.data.data);
                });
        },
        // 销售交割单
        deliveryBill (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.upload.imgUpload, formData, headers)
                .then(function (res) {
                    that.deliveryBillComentList.receiptList.push(res.data.data);
                });
        },
        // 发票-收
        collectTicketSreceipt () {
            let that = this;
            that.$http.get(that.$api.invoice.getDetail + '/' + that.purchaseOrderId)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.collectTicketReceipt = res.data.data;
                    }
                });
        },
        // 发票-开
        collectTicketsSales () {
            let that = this;
            that.$http.get(that.$api.invoice.getDetails + '/' + that.saleOrderId)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.collectTickets = res.data.data;
                    }
                });
        },
        // 申请开票
        applyTicket () {
            if (Array.prototype.isPrototypeOf(this.invoiceCollection.purchaseDeliverys) && this.invoiceCollection.purchaseDeliverys.length > 0) {
                this.applyList.deliveredProductBillToFinance = 1;
            }
            if (this.applyList.deliveredProductBillToFinance * 1 === 0) {
                this.$message({
                    message: '采购交割凭证未上传无法开票，请上传采购交割凭证后再开票',
                    type: 'error'
                });
                return;
            }
            if (this.invoicePurchase.buyerCompanyName === '') {
                this.$message({
                    message: '请输入开票单位',
                    type: 'error'
                });
                return;
            }
            if (this.applyList.applicationDate === null) {
                this.$message({
                    message: '请选择日期',
                    type: 'error'
                });
                return;
            }
            this.applyList.buyerTaxCode = this.invoiceCollection.corpTaxCode;
            if (this.applyList.buyerTaxCode === null || this.applyList.buyerTaxCode === '') {
                this.$message({
                    message: '请输入税号',
                    type: 'error'
                });
                return;
            }
            if (this.applyList.buyerBankAccount === null || this.applyList.buyerBankAccount === '') {
                this.$message({
                    message: '请输入银行账号',
                    type: 'error'
                });
                return;
            }
            if (this.applyList.buyerBankName === null || this.applyList.buyerBankName === '') {
                this.$message({
                    message: '请输入开户银行',
                    type: 'error'
                });
                return;
            }
            if (this.initialData.quantity === '') {
                this.$message({
                    message: '请输入开票数量',
                    type: 'error'
                });
                return;
            }
            if (this.initialData.amount === '') {
                this.$message({
                    message: '请输入开票总金额',
                    type: 'error'
                });
                return;
            }
            if (this.initialData.deliveredProductQuantity === '') {
                this.$message({
                    message: '请输入转让货权总数量',
                    type: 'error'
                });
                return;
            }
            if (this.applyList.deliveredProductBillToFinance === null) {
                this.$message({
                    message: '请选择采购交割凭证是否已上传',
                    type: 'error'
                });
                return;
            }
            if (this.initialData.receiptInvoiceAmount === '') {
                this.$message({
                    message: '请输入本笔业务已收到上游发票总金额',
                    type: 'error'
                });
                return;
            }
            if (this.applyList.productTaxCode === null) {
                this.$message({
                    message: '请输入商品税务编码',
                    type: 'error'
                });
                return;
            }
            if (this.applyList.operationUserName === null) {
                this.$message({
                    message: '请输入经办人',
                    type: 'error'
                });
                return;
            }
            if (this.applyList.hasReceiptInvoice === null || this.applyList.receiptInvoiceStatus === null) {
                this.$message({
                    message: '请选择进项票',
                    type: 'error'
                });
                return;
            }
            if (this.applyList.deliveredProductBillToFinance === '1') {
                this.applyList.deliveredProductBillToFinance = 1;
            } else {
                this.applyList.deliveredProductBillToFinance = 0;
            }
            this.applyList.skuQuantity = this.initialData.quantity;
            this.applyList.amount = this.initialData.amount;
            this.applyList.deliveredProductQuantity = this.initialData.deliveredProductQuantity;
            this.applyList.receiptInvoiceAmount = this.initialData.receiptInvoiceAmount;
            this.applyList.quantity = this.invoicePurchase.skuQuantity;
            this.applyList.buyerName = this.invoicePurchase.buyerCompanyName;
            this.applyList.receiptVoucherList = this.reapingVoucherComentList.receiptList;
            this.applyList.productSettlementBillList = this.deliveryBillComentList.receiptList;
            this.applyList.salesOrderId = this.orderMessage.saleOrderId;
            this.applyList.buyerId = this.orderMessage.buyerCompanyId;
            this.applyList.productName = this.orderMessage.prodName;
            this.applyList.contEssId = this.orderMessage.id;
            if (this.threadRunTag) {
                this.threadRunTag = false;
                this.$http.post(this.$api.invoice.applyInvoice, this.applyList).then((res) => {
                    if (res.data.code === 0) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });

                        this.$emit('ivoiceList');
                        this.isSubmit = false;
                        // this.stepArr = res.data.data;
                        let query = {
                            targetId: res.data.data.targetId,
                            targetType: 4
                        };
                        this.isSubmit = false;
                        this.$http.post(this.$api.invoice.getInvoiceHistory, query).then((res) => {
                            if (res.data.code === 0) {
                                this.stepArr = res.data.data;
                                this.stepArr.forEach((e, idx) => {
                                    e['step'] = idx;
                                });
                            }
                        });
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: 'error'
                        });
                    }
                    this.threadRunTag = true;
                }).catch((e) => {
                    this.$message({
                        message: '网络异常',
                        type: 'error'
                    });
                    this.threadRunTag = true;
                });
            }
        },
        // 新建收票
        collecTicket () {
            if (this.invoiceSale.sellerCompanyName === '') {
                this.$message({
                    message: '请输入上游公司',
                    type: 'error'
                });
                return;
            }
            if (this.collectList.receiptDate === null) {
                this.$message({
                    message: '请输入收票日期',
                    type: 'error'
                });
                return;
            }
            if (this.invoiceSale.invoiceTotalAmount === '') {
                this.$message({
                    message: '请输入发票总金额',
                    type: 'error'
                });
                return;
            }
            if (this.invoiceSale.invoiceTotalAmount === null) {
                this.$message({
                    message: '请输入发票总金额',
                    type: 'error'
                });
                return;
            }
            if (this.collectList.receiptInvoiceUrlList.length === 0) {
                this.$message({
                    message: '请上传收票凭证',
                    type: 'error'
                });
                return;
            }
            this.collectList.sellerId = this.orderMessage.sellerCompanyId;
            this.collectList.sellerName = this.invoiceSale.sellerCompanyName;
            this.collectList.amount = this.invoiceSale.invoiceTotalAmount;
            this.collectList.productName = this.orderMessage.prodName;
            this.collectList.quantity = this.invoiceSale.skuQuantity;
            this.collectList.productUnitPrice = this.invoiceSale.skuPrice;
            this.collectList.purchaseOrderId = this.orderMessage.purchaseOrderId;
            this.collectList.contEssId = this.orderMessage.id;
            this.$http.post(this.$api.invoice.createCollect, this.collectList).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    // this.collectList = {};
                    // this.collectList.amount = null;
                    // this.collectList.receiptDate = null;
                    // this.collectList.sellerName = null;
                    // this.collectList.receiptInvoiceUrlList = [];
                    this.$emit('ivoiceList');
                    let query = {
                        targetId: res.data.data.targetId,
                        targetType: 6
                    };
                    this.isSubmit2 = false;
                    // this.stepArr2 = res.data.data;
                    this.$http.post(this.$api.invoice.getInvoiceHistory, query).then((res) => {
                        if (res.data.code === 0) {
                            this.stepArr2 = res.data.data;
                            this.stepArr2.forEach((e, idx) => {
                                e['step'] = idx;
                            });
                        }
                    });
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        closedialogvisible () {
            this.dialogVisiblesss = false;
        },
        showImg (type) {
            let arr = [];
            this.dialogVisiblesss = true;
            switch (type) {
            case 1:
                this.invoiceCollection.purchaseDeliverys.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.fileList = arr;
                break;
            case 2:
                this.invoiceCollection.salesDeliverys.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.fileList = arr;
                break;
            case 3:
                this.invoiceCollection.collections.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.fileList = arr;
                break;
            default:
                this.dialogVisiblesss = false;
                break;
            }
        }
    },
    watch: {
        orderIds (newValue, oldValue) {
            this.newPaymentBankAssembly();
        }
    }
};
</script>

<style lang="scss" scoped>
    .invoiceDetails {
        .delivery-step {
            padding: 0 75px;
            clear: both;
            .step-box {
                float: left;
            }
            .line {
                width: 75px;
            }
            .order-step-info {
                position: relative;
                width: 170px;
                text-align: center;
            }
            .step-box:first-child {
                .order-step-info {
                    width: 95px;
                    left: -36px;
                    span {
                        display: block;
                        width: 170px;
                        position: relative;
                        left: -40px;
                    }
                }
            }
            .step-box:last-child {
                .order-step-info {
                    width: 95px;
                    left: 36px;
                    span {
                        display: block;
                        width: 170px;
                        position: relative;
                        left: -40px;
                    }
                }
            }
            &:after {
                display: block;
                content: ' ';
                clear: both;
            }
        }
        .step-box:nth-child(7){
            margin-left: -75px!important;
        }
        .line:nth-child(7){
            background-color: #ffffff!important;
        }
        .step-title {
            font-size: 16px;
            color: #333;
            font-weight: bold;
            height: 35px;
            margin-left: 16px;
            margin-top: 14px;
            line-height: 35px;
        }
        .createPayment-status-left-billStatus {
            width: 100%;
            display: flex;
            padding: 50px 20px;
            padding-top: 20px;
        }

        .createPayment-status-left-billStatus-unconfirm {
            margin-left: -24px;
            position: relative;
            left: 12px;
        }

        .createPayment-status-left-billStatus-confirmed {
            position: relative;
            width: 150px;
            float: right;
            margin-right: -12px;
            span {
                display: block;
                text-align: right;
                width: 150px;
            }
            div {
                font-size: 12px;
                text-align: center;
                width: 120px;
                float: right;
                margin-right: -40px;
            }
        }
        .createPayment-status-left-billStatus div:first-child div:last-child span {
            display: block;
            text-align: left;
        }
        .createPayment-status-left-billStatus-unconfirm:nth-child(1) div {
            font-size: 12px;
            width: 120px;
            position: absolute;
        }
    }
</style>

<style lang="scss">
    .invoiceDetails {
        .el-tabs {
            .lll {
                width: 100%;
                height: 340px;
            }
        }
        .order-dialogs {
            .el-dialog__header {
                font-weight: bold;
                padding: 0px;
                .el-dialog__headerbtn{
                    top: 10px;
                    right: 16px;
                }
            }
            .el-dialog__body {
                margin: 0;
                padding: 0;
            }
            .order-apply {
                .title {
                    font-size: 16px;
                    color: #333;
                    font-weight: bold;
                    height: 35px;
                    margin-left: 16px;
                    line-height: 35px;
                }
            }
            .gy-form-group {
                padding: 10px 40px 10px 169px;
                .l {
                    i {
                        color: $color-highlight;
                    }
                }
            }
            .gy-form-group .l {
                width: 130px;
            }
        }
        .order-dialog {
            .el-dialog__header {
                font-weight: bold;
                padding: 0px;
                .el-dialog__headerbtn{
                    top: 10px;
                    right: 16px;
                }
            }
            .el-dialog__body {
                margin: 0;
                padding: 0;
            }
            .order-apply {
                .title {
                    font-size: 16px;
                    color: #333;
                    font-weight: bold;
                    height: 35px;
                    margin-left: 16px;
                    line-height: 35px;
                }
            }
            .gy-form-group {
                padding: 10px 40px 10px 135px;
                span {
                    i {
                        color: $color-highlight;
                    }
                }
            }
            .gy-form-group .l {
                width: 95px;
            }
        }
    }
</style>
