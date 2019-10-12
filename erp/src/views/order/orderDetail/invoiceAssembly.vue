// 发票
<template>
    <div class="invoiceDetails">
        <!--开票-->
        <el-dialog width="1200px" class="order-dialogs"
                    :close-on-click-modal = "false"
                   :before-close="handleCloseTicketOpening"
                   :visible.sync="orderData.dialogVisibles">
            <div class="order-apply">
                <div class="title">申请开票</div>
            </div>
            <div class="block clearfix">
                <div class="gy-form-group">
                    <span class="l"><i>*</i>开票单位名称</span>
                    <input type="text" v-model="downstreamInfo.buyerCompanyName">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>申请日期</span>
                    <div class="searchDate">
                        <div class="d">
                            <el-date-picker class="input-date"
                                    v-model="applyList.applicationDate"
                                    type="date"
                                    value-format="timestamp">
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
                    <el-select v-model="applyList.buyerBankName" placeholder="请选择开户银行账户" @change="changeBlank" class="input-date">
                        <el-option
                                v-for="item in newBank"
                                :key="item.bankAccId"
                                :label="item.depositBankName"
                                :value="item.bankAccId">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>开票金额(元)</span>
                    <input type="text" v-model="initialData.amount" placeholder="请输入开票金额">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>银行账号</span>
                    <input type="text" v-model="applyList.buyerBankAccount" readonly>
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>品名</span>
                    <input type="text" v-model="applyList.productName">
                </div>
                <div style="clear: both"></div>
                <div class="gy-form-group">
                    <span class="l spanLeft"><span>转让货权总数量(吨)</span></span>
                    <input type="text" v-model="initialData.deliveredProductQuantity" placeholder="请输入转让货权总数量">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>商品税务编码</span>
                    <template>
                         <!-- @change="changeProdTaxCode" -->
                        <el-select v-model="applyList.productTaxCode" placeholder="请选择" class="input-date">
                            <el-option
                                    v-for="item in commodCode"
                                    :key="item.id"
                                    :label="item.taxCode"
                                    :value="item.taxCode">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <div style="clear: both"></div>
                <div class="gy-form-group">
                    <span class="l spanLeft">已收上游发票(元)</span>
                    <input type="text" v-model="initialData.receiptInvoiceAmount" placeholder="请输入本笔业务已收到上游发票总金额">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>进项票</span>
                    <template>
                        <el-select v-model="applyList.hasReceiptInvoice" placeholder="请选择" style="width: 49%" class="input-date"
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
                        <el-select v-model="applyList.receiptInvoiceStatus" placeholder="请选择" style="width: 49%" class="input-date">
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
                    <span class="l spanLeft">采购交割凭证</span>
                    <span v-if="Array.prototype.isPrototypeOf(invoiceCollection.purchaseDeliverys)  && invoiceCollection.purchaseDeliverys.length > 0" class="left-align"
                          @click="showImg(invoiceCollection.purchaseDeliverys)">
                    <i class="iconfont icon-photo"></i>
                  </span>
                    <span v-else class="left-align">未上传</span>
                </div>
                <div style="clear: both"></div>
                <div class="gy-form-group">
                    <span class="l spanLeft">销售交割凭证</span>
                    <span v-if="Array.prototype.isPrototypeOf(invoiceCollection.salesDeliverys)  && invoiceCollection.salesDeliverys.length > 0" class="left-align"
                          @click="showImg(invoiceCollection.salesDeliverys)">
                    <i class="iconfont icon-photo"></i>
                  </span>
                    <span v-else class="left-align">未上传</span>
                </div>
                <div class="gy-form-group">
                    <span class="l spanLeft">收款凭证</span>
                    <span v-if="Array.prototype.isPrototypeOf(invoiceCollection.collections)  && invoiceCollection.collections.length > 0" class="left-align"
                          @click="showImg(invoiceCollection.collections)">
                    <i class="iconfont icon-photo"></i>
                  </span>
                    <span v-else class="left-align">未上传</span>
                </div>
                <div class="gy-form-group" style="clear: both;">
                    <span class="l spanLeft"><i></i>附件</span>
                    <div class="left-align">
                        <gy-file-upload ref="pFileUpload" @callbackFileUpload="onCallbackEnclosureFileUpload"></gy-file-upload>
                    </div>
                </div>
                <div class="gy-form-group" style="height:auto">
                    <span class="l spanLeft">备注</span>
                    <textarea v-model="remark" placeholder="请输入备注" cols="40" rows="4" style="width:406px"></textarea>
                </div>
            </div>
            <!-- 进度条 -->
            <div v-if="!isSubmit">
                <operation-process :elStepList="stepArr"></operation-process>
            </div>
            <div style="margin-top: 50px;text-align: right;padding-bottom: 30px;padding-right: 30px;">
                <button style="margin-right: 6px;" class="gy-button-normal" @click="orderData.dialogVisibles = false"><span
                        v-if="isSubmit">取消</span><span v-else>关闭</span></button>
                <button v-if="isSubmit" class="gy-button-extra" @click="applyTicket()">提交</button>
            </div>
        </el-dialog>
        <!-- 收票 -->
        <el-dialog width="1200px" class="order-dialog"
                    :close-on-click-modal = "false"
                   :before-close="handleCloseCollectTickets"
                   :visible.sync="orderData.collectTicketsdialog">
            <div class="order-apply">
                <div class="title">收票</div>
            </div>
            <div class="block clearfix">
                <div class="gy-form-group">
                    <span class="l"><i>*</i>上游公司</span>
                    <input type="text" v-model="upstreamInfo.sellerCompanyName">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>收票日期</span>
                    <div class="searchDate">
                        <div class="d">
                            <el-date-picker class="input-date"
                                    v-model="collectList.receiptDate"
                                    type="date"
                                    value-format="timestamp"
                                    placeholder="收票日期">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l spanLeft">品名</span>
                    <span class="left-align">{{upstreamInfo.prodName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l spanLeft">数量(吨)</span>
                    <span class="left-align">{{upstreamInfo.skuQuantity|numToQuantity}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l spanLeft">单价(元/吨)</span>
                    <span class="left-align red" v-if="upstreamInfo.skuPriceType === 21 || upstreamInfo.skuPriceType === 22">公式计价</span>
                    <span class="left-align" v-else>{{upstreamInfo.skuPrice | numToCash(true)}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>发票总金额(元)</span>
                    <input type="text" v-model="collectList.amount">
                </div>
                <div class="gy-form-group" style="width: 100%">
                    <span class="l"><i>*</i>收票凭证</span>
                    <div class="left-align">
                        <gy-file-upload ref="pFileUpload" @callbackFileUpload="onCallbackBuyFileUpload"></gy-file-upload>
                    </div>
                </div>
            </div>
            <!-- 进度条 -->
            <div v-if="!isSubmit2">
                <operation-process :elStepList="stepArr2"></operation-process>
            </div>
            <div style="margin-top: 10px;text-align: right;padding-bottom: 30px;padding-right: 30px;">
                <button style="margin-right: 6px;" class="gy-button-normal" @click="orderData.collectTicketsdialog = false"><span v-if="isSubmit2">取消</span><span
                        v-else>关闭</span></button>
                <button v-if="isSubmit2" class="gy-button-extra" @click="collecTicket()">提交</button>
            </div>
        </el-dialog>
        <bank-acc ref="bankAcc" @onSaveAccInfo="popupPaySubmission"></bank-acc>
        <gy-file-view ref="buyInvoiceFileView"></gy-file-view>
    </div>
</template>

<script>
import gyStep from '@/components/step1';
import dialogImg from './../../components/dialogImg';
import bankAcc from './../../components/bankAcc';
import operationProcess from '@/components/stepElement';
import gyFileView from './../../components/gyFileView';
import gyFileUpload from './../../components/gyFileUpload';

export default {
    components: {dialogImg, gyStep, bankAcc, operationProcess, gyFileView, gyFileUpload},
    props: {
        orderData: Object,
        orderIds: Object,
        upstreamInfo: Object, // 上游-采购
        downstreamInfo: Object // 下游-销售
    },
    data () {
        return {
            initialData: {},
            invoiceCollection: {},
            payStatus: 1,
            id: null,
            purchaseOrderId: null,
            saleOrderId: null,
            collectTicketReceipt: [], // 发票-收
            collectTickets: [], // 发票-开
            applyList: {
                hasReceiptInvoice: null,
                operationUserName: null,
                productTaxCode: null,
                productName: null,
                deliveredProductBillToFinance: 0,
                buyerBankName: null,
                buyerBankAccount: null,
                buyerTaxCode: null,
                applicationDate: null,
                buyerName: null,
                payInfoList: [],
                productSettlementBill: [],
                receiptVoucher: [],
                receiptInvoiceStatus: null,
                remark: null
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
            remark: null,
            commodCode: []
        };
    },
    mounted () {
        this.newDateInvoiceAssembly = new Date();
        this.collectList.receiptDate = Date.parse(this.newDateInvoiceAssembly);
        this.applyList.applicationDate = Date.parse(this.newDateInvoiceAssembly);
    },
    methods: {
        // 创建收票页面时获取初始数据
        initCollectTicketsView (purchaseOrderId) {
            this.isSubmit2 = true;
            this.collectTicketsReceipt(purchaseOrderId);
        },
        // 创建开票页面时获取初始数据
        initInvoiceView (purchaseOrderId, saleOrderId, productId, prodName, buyerCompanyId) {
            // 先初始化输入项数据
            this.isSubmit = true;
            let applyUser = JSON.parse(localStorage.getItem('userInfo'));
            this.applyList.operationUserName = applyUser.username;
            this.applyList.productName = prodName;
            this.commodityTaxCode(productId);
            this.newPaymentBankAssembly(buyerCompanyId);
            this.InitializationData(saleOrderId);
            this.getInvoiceDeliveryCollection(saleOrderId, purchaseOrderId);
        },
        // 获取页面带取数据
        InitializationData (saleOrderId) {
            this.$http.get(this.$api.invoice.pageBringInData + saleOrderId).then((res) => {
                if (res.data.code === 0) {
                    this.initialData = res.data.data;
                    this.initialData.quantitys = this.initialData.quantity;
                    this.initialData.amount = this.$tools.toFixedFn(this.initialData.amount, 2);
                    if (this.downstreamInfo.skuPriceType === 21 || this.downstreamInfo.skuPriceType === 22) {
                        this.initialData.amount = null;
                    }
                    this.initialData.amounts = this.initialData.amount;
                    this.handleInitData();
                }
            });
        },
        // 获取交割凭证和收款凭证
        getInvoiceDeliveryCollection (saleOrderId, purchaseOrderId) {
            this.$http.post(this.$api.invoice.getInvoiceDeliveryCollection, {'salesOrderId': saleOrderId, 'purchaseOrderId': purchaseOrderId})
                .then((res) => {
                    if (res.data.code === 0) {
                        this.invoiceCollection = res.data.data;
                    }
                });
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
        newPaymentBankAssembly (buyerCompanyId) {
            this.$http.post(this.$api.payment.newBank, {'companyId': buyerCompanyId}).then((res) => {
                if (res.data.code === 0) {
                    this.newBank = res.data.data;
                    if (this.newBank.length === 2) {
                        this.applyList.buyerBankId = this.newBank[0].bankAccId;
                        this.applyList.buyerBankName = this.newBank[0].depositBankName;
                        this.applyList.buyerBankAccount = this.newBank[0].bankAccount;
                    }
                }
            });
        },
        // 商品税务编码
        commodityTaxCode (productId) {
            this.applyList.productTaxCode = null;
            this.$http.post(this.$api.invoice.commodityCode, {'productId': productId}).then((res) => {
                if (res.data.code === 0) {
                    this.commodCode = res.data.data;
                    if (this.commodCode.length === 1) {
                        this.applyList.productTaxCode = this.commodCode[0].taxCode;
                        this.applyList.productName = this.commodCode[0].productName;
                    }
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
                    this.applyList.buyerBankId = this.newBank[i].bankAccId;
                    this.applyList.buyerBankAccount = this.newBank[i].bankAccount;
                    this.applyList.buyerBankName = this.newBank[i].depositBankName;
                }
            }
        },
        // 弹出框选择单条-提交
        popupPaySubmission (accInfo) {
            if (accInfo == null || accInfo === undefined) {
                this.applyList.buyerBankId = null;
                this.applyList.buyerBankAccount = null;
                this.applyList.buyerBankName = null;
                return;
            }
            this.applyList.buyerBankId = accInfo.bankAccId;
            this.applyList.buyerBankName = accInfo.depositBank;
            this.applyList.buyerBankAccount = accInfo.companyAccount;

            this.newPaymentBankAssembly(this.initialData.buyerId);
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
        // 收票凭证－回调
        onCallbackBuyFileUpload (fileList) {
            this.collectList.receiptInvoiceUrlList = [];
            fileList.forEach((e) => {
                this.collectList.receiptInvoiceUrlList.push(e.fileUrl);
            });
        },
        onCallbackEnclosureFileUpload (fileList) {
            this.applyList.invoiceApplicationFiles = [];
            fileList.forEach((e) => {
                this.applyList.invoiceApplicationFiles.push(e.fileUrl);
            });
        },
        // 发票-收
        collectTicketsReceipt (purchaseOrderId) {
            let that = this;
            that.$http.get(that.$api.invoice.getDetail + '/' + purchaseOrderId)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.collectTicketReceipt = res.data.data;

                        if (that.upstreamInfo.skuPriceType === 21) {
                            that.collectList.amount = null;
                        } else {
                            that.collectList.amount = that.$tools.toFixedFn(Number(that.upstreamInfo.skuQuantity * that.upstreamInfo.skuPrice), 2);
                        }
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
                // this.$message({
                //     message: '采购交割凭证未上传无法开票，请上传采购交割凭证后再开票',
                //     type: 'error'
                // });
                // return;
            }
            if (this.downstreamInfo.buyerCompanyName === '') {
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
            if (this.applyList.productName === null || this.applyList.productName === '') {
                this.$message({
                    message: '请输入品名',
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
            if (this.initialData.quantity === '' || this.initialData.quantity == null || this.initialData.quantity === undefined) {
                this.$message({
                    message: '请输入开票数量',
                    type: 'error'
                });
                return;
            }
            if (this.initialData.quantity <= 0) {
                this.$message({
                    message: '开票数量不能为0或为负数',
                    type: 'error'
                });
                return;
            }
            if (this.initialData.amount === '' || this.initialData.amount == null || this.initialData.amount === undefined) {
                this.$message({
                    message: '请输入开票金额',
                    type: 'error'
                });
                return;
            }
            if (this.initialData.amount <= 0) {
                this.$message({
                    message: '开票金额不能为0或为负数',
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
            if (this.initialData.quantity > this.initialData.quantitys) {
                this.$message({
                    message: '超出可开票数量',
                    type: 'error'
                });
                return;
            }
            if (this.initialData.quantity <= 0) {
                this.$message({
                    message: '开票数量不能小于等于零',
                    type: 'error'
                });
                return;
            }
            if (this.downstreamInfo.skuPriceType === 1 && this.initialData.amount > this.initialData.amounts) {
                // 正常固定价时才验证开票总金额
                this.$message({
                    message: '超出可开票总金额',
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
            this.applyList.quantity = this.downstreamInfo.skuQuantity;
            this.applyList.buyerName = this.downstreamInfo.buyerCompanyName;
            this.applyList.receiptVoucherList = this.reapingVoucherComentList.receiptList;
            this.applyList.productSettlementBillList = this.deliveryBillComentList.receiptList;
            this.applyList.salesOrderId = this.orderIds.saleOrderId;
            this.applyList.buyerId = this.downstreamInfo.buyerCompanyId;
            this.applyList.contEssId = this.orderIds.id;
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

                        let query = {
                            targetId: res.data.data.targetId,
                            targetType: 4
                        };
                        this.$http.post(this.$api.contract.approve1History, query).then((res) => {
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
            if (this.upstreamInfo.sellerCompanyName === '') {
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
            if (this.collectList.amount === '') {
                this.$message({
                    message: '请输入发票总金额',
                    type: 'error'
                });
                return;
            }
            if (this.collectList.amount === null) {
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
            this.collectList.sellerId = this.upstreamInfo.sellerCompanyId;
            this.collectList.sellerName = this.upstreamInfo.sellerCompanyName;
            this.collectList.productName = this.orderIds.prodName;
            this.collectList.quantity = this.upstreamInfo.skuQuantity;
            this.collectList.productUnitPrice = this.upstreamInfo.skuPrice;
            this.collectList.purchaseOrderId = this.orderIds.purchaseOrderId;
            this.collectList.contEssId = this.orderIds.id;
            this.$http.post(this.$api.invoice.createCollect, this.collectList).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });

                    this.$emit('ivoiceList');
                    // 禁用文件上传
                    this.$refs.pFileUpload.endUpload();
                    let query = {
                        targetId: res.data.data.targetId,
                        targetType: 6
                    };
                    this.isSubmit2 = false;

                    this.$http.post(this.$api.contract.approve1History, query).then((res) => {
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

        showImg (fileList) {
            this.$refs.buyInvoiceFileView.open4MultiFile(fileList);
        },
        handleInitData () {
            // 进项票选项
            if (this.initialData.receiptInvoiceAmount > 0) {
                this.applyList.hasReceiptInvoice = this.entryoptions[1].id;
                this.entryoptionTwo = this.entryoptionTwoYes;
                this.applyList.receiptInvoiceStatus = this.entryoptionTwoYes[1].id;
            } else {
                this.applyList.hasReceiptInvoice = this.entryoptions[0].id;
                this.entryoptionTwo = this.entryoptionTwoNo;
                this.applyList.receiptInvoiceStatus = this.entryoptionTwoNo[0].id;
            }
        },
        initUploadFileData () {
            // 初始化附件上传的数据(目前只有收票时上传发票)
            if (this.$refs.pFileUpload) {
                this.$refs.pFileUpload.init();
            }
        }
        // changeProdTaxCode (val) {
        //     if (this.commodCode) {
        //         for (var s = 0; s < this.commodCode.length; s++) {
        //             if (val === this.commodCode[s].taxCode) {
        //                 this.applyList.productName = this.commodCode[s].productName;
        //             }
        //         }
        //     }
        // }
    },
    watch: {
        remark (newValue, oldValue) {
            if (newValue.length > 2500) {
                this.$message({
                    message: '备注最多可填写2500字',
                    type: 'warning'
                });
                return;
            }
            this.applyList.remark = this.remark.substr(0, 2500);
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
        .step-box:nth-child(0){
            margin-left: -75px!important;
        }
        .line:nth-child(0){
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
        .spanLeft{
            margin-left: 6px;
        }
        .input-date {
            .el-input__inner {
                font-size: 14px;
            }
        }
        .left-align {
            padding-left: 10px;
        }
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
                    margin-top: -36px;
                }
            }
            .gy-form-group {
                padding: 10px 40px 10px 169px;
                .l {
                    i {
                        color: red;
                    }
                }
            }
            .gy-form-group .l {
                width: 162px;
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
                    margin-top: -36px;
                }
            }
            .gy-form-group {
                padding: 10px 40px 10px 135px;
            }
            .gy-form-group .l {
                width: 130px;
                i{
                   color: red;
                }
            }
            .red {
                color: red;
            }
        }
    }
</style>
