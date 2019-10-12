<template>
    <div class="approve-invoice my-invoice">
        <gy-contract :query="form"></gy-contract>
        <div class="title">开票信息</div>
        <!--开票详情页查看页-->
        <div class="block-wrap clearfix"  v-if="params.showPageInfo">
            <div class="gy-form-group">
                <span class="l">开票单位名称</span>
                <span>{{ticketAuditInformationsd.buyerName}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">品名</span>
              <span>{{ticketAuditInformationsd.productName}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">申请日期</span>
              <span>{{ticketAuditInformationsd.date | date}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">开票数量(吨)</span>
              <span>{{ticketAuditInformationsd.quantity|numToQuantity}}{{ticketAuditInformationsd.quantityUnitName}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">税号</span>
              <span>{{ticketAuditInformationsd.buyerTaxCode}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">开票总金额(元)</span>
              <span>{{ticketAuditInformationsd.amount | numToCash}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">开户银行</span>
              <span>{{ticketAuditInformationsd.buyerBankName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">发票月份</span>
                <span>{{ticketAuditInformationsd.provideInvoiceType|invoiceMonthValue(ticketAuditInformationsd)}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">银行账号</span>
              <span>{{ticketAuditInformationsd.buyerBankAccount}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft">品名</span>
                <span>{{ticketAuditInformationsd.productName}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">商品税务编号</span>
              <span>{{ticketAuditInformationsd.productTaxCode}}</span>
            </div>
          <div class="gy-form-group">
            <span class="l">转让货权总数量(吨)</span>
            <span>{{ticketAuditInformationsd.deliveredProductQuantity|numToQuantity}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">进项票</span>
            <span>{{ticketAuditInformationsd.hasReceiptInvoice|incomeInvoice(ticketAuditInformationsd.receiptInvoiceStatus)}}</span>
          </div>
          <div class="gy-form-group my-group">
            <span class="l">已收上游发票(元)</span>
            <span>{{ticketAuditInformationsd.receiptInvoiceAmount | numToCash}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">经办人</span>
            <span>{{ticketAuditInformationsd.operationUserName}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">收款凭证</span>
            <span v-if="ticketAuditInformationsd.collectionFileList && ticketAuditInformationsd.collectionFileList.length !== 0"
                  @click="showImg(ticketAuditInformationsd.collectionFileList)"><i class="iconfont icon-photo"></i></span>
            <span v-else><i class="iconfont icon-photo-null"></i></span>
          </div>
          <div class="gy-form-group">
            <span class="l">销售交割凭证</span>
            <span v-if="ticketAuditInformationsd.deliveredUrlList && ticketAuditInformationsd.deliveredUrlList.length !== 0"
                  @click="showImg(ticketAuditInformationsd.deliveredUrlList)"><i class="iconfont icon-photo"></i></span>
            <span v-else><i class="iconfont icon-photo-null"></i></span>
          </div>
          <div class="gy-form-group">
            <span class="l">采购交割凭证</span>
            <span v-if="ticketAuditInformationsd.productSettlementBillList && ticketAuditInformationsd.productSettlementBillList.length !== 0"
                  @click="showImg(ticketAuditInformationsd.productSettlementBillList)"><i class="iconfont icon-photo"></i></span>
            <span v-else><i class="iconfont icon-photo-null"></i></span>
          </div>
          <div class="gy-form-group"  v-if="ticketAuditInformationsd.status === 70 || ticketAuditInformationsd.status === 60">
            <span class="l">开票凭证</span>
            <span v-if="ticketAuditInformationsd.invoiceVoucherList && ticketAuditInformationsd.invoiceVoucherList.length !== 0" @click="showImg(ticketAuditInformationsd.invoiceVoucherList)"><i class="iconfont icon-photo"></i></span>
            <span v-else><i class="iconfont icon-photo-null"></i></span>
          </div>
          <div class="gy-form-group">
            <span class="l">附件</span>
            <span v-if="ticketAuditInformationsd.invoiceApplicationFiles && ticketAuditInformationsd.invoiceApplicationFiles.length !== 0" @click="showImg(ticketAuditInformationsd.invoiceApplicationFiles)"><i class="iconfont icon-photo"></i></span>
            <span v-else><i class="iconfont icon-photo-null"></i></span>
          </div>
          <div class="gy-form-group"  v-if="ticketAuditInformationsd.status === 70">
            <span class="l">快递单号</span>
            <span>{{ticketAuditInformationsd.expressCode}}</span>
          </div>
          <div class="gy-form-group" v-if="ticketAuditInformationsd.status === 60 && doneFlg === 0">
            <span class="l"><i>*</i>快递单号</span>
            <input type="text" v-model="courierNumberObj.expressCode" placeholder="请填写快递单号">
          </div>
           <div class="gy-form-group">
            <span class="l">状态</span>
            <div class="text-overflow">{{ticketAuditInformationsd.statusDesc}}</div>
          </div>
          <div class="gy-form-group" style="clear:both">
            <span class="l">备注</span>
            <div class="text-overflow">{{ticketAuditInformationsd.remark}}</div>
          </div>
        </div>
        <!--开票详情页修改页重新提交-->
        <div class="block-wrap clearfix"  v-else>
            <div class="gy-form-group">
                <span class="l spanLeft"><i>*</i>开票单位名称</span>
                <input type="text" v-model="applyList.buyerName">
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft"><i>*</i>申请日期</span>
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
                <span class="l spanLeft"><i>*</i>开票数量(吨)</span>
                <input type="text" v-model="applyList.skuQuantity" placeholder="请输入开票数量">
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft"><i>*</i>税号</span>
                <input type="text" v-model="applyList.buyerTaxCode" placeholder="请输入税号">
            </div>
            <div class="gy-form-group" style="clear:both">
                <span class="l spanLeft"><i>*</i>开票总金额(元)</span>
                <input type="text" v-model="applyList.amount" placeholder="请输入开票总金额">
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft"><i>*</i>开户银行</span>
                <el-select v-model="applyList.buyerBankName" placeholder="请选择开户银行账户" @change="changeBlank" class="input-date">
                    <el-option
                        v-for="item in newBank"
                        :key="item.bankAccId"
                        :label="item.depositBankName"
                        :value="item.bankAccId">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group" style="clear:both">
                <span class="l spanLeft"><i>*</i>银行账号</span>
                <input type="text" v-model="applyList.buyerBankAccount" readonly>
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft"><i>*</i>品名</span>
                <input type="text" v-model="applyList.productName">
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft"><i>*</i>商品税务编码</span>
                <template>
                    <el-select v-model="applyList.productTaxCode" placeholder="请选择" class="input-date" @change="changeProdTaxCode">
                        <el-option
                            v-for="item in commodCode"
                            :key="item.id"
                            :label="item.taxCode"
                            :value="item.taxCode">
                        </el-option>
                    </el-select>
                </template>
            </div>
            <div class="gy-form-group">
                <span class="l"><span>转让货权总数量(吨)</span></span>
                <input type="text" v-model="applyList.deliveredProductQuantity" placeholder="请输入转让货权总数量">
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft"><i>*</i>进项票</span>
                <template>
                    <el-select v-model="applyList.hasReceiptInvoice" placeholder="请选择" style="width: 49%" class="input-date" @change="entryTicket()">
                        <el-option
                            v-for="item in entryoptions"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </template>
                <template>
                    <el-select v-model="receiptInvoiceStatus" placeholder="请选择" style="width: 49%" class="input-date" @change="entryTicket1()">
                        <el-option
                            v-for="item in entryoptionTwo"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </template>
            </div>
            <div class="gy-form-group my-group">
                <span class="l">已收上游发票(元)</span>
                <input type="text" v-model="applyList.receiptInvoiceAmount" placeholder="请输入本笔业务已收到上游发票总金额">
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft"><i>*</i>经办人</span>
                <input type="text" v-model="applyList.operationUserName" placeholder="请输入经办人">
            </div>
            <div class="gy-form-group">
                <span class="l">收款凭证</span>
                <span v-if="ticketAuditInformationsd.collectionFileList && ticketAuditInformationsd.collectionFileList.length !== 0"
                      @click="showImg(ticketAuditInformationsd.collectionFileList)"><i class="iconfont icon-photo"></i></span>
                <span v-else><i class="iconfont icon-photo-null"></i></span>
            </div>
            <div class="gy-form-group">
                <span class="l">销售交割凭证</span>
                <span v-if="ticketAuditInformationsd.deliveredUrlList && ticketAuditInformationsd.deliveredUrlList.length !== 0"
                      @click="showImg(ticketAuditInformationsd.deliveredUrlList)"><i class="iconfont icon-photo"></i></span>
                <span v-else><i class="iconfont icon-photo-null"></i></span>
            </div>
            <div class="gy-form-group">
                <span class="l">采购交割凭证</span>
                <span v-if="ticketAuditInformationsd.productSettlementBillList && ticketAuditInformationsd.productSettlementBillList.length !== 0"
                      @click="showImg(ticketAuditInformationsd.productSettlementBillList)"><i class="iconfont icon-photo"></i></span>
                <span v-else><i class="iconfont icon-photo-null"></i></span>
            </div>
            <div class="gy-form-group"  v-if="ticketAuditInformationsd.status === 70 || ticketAuditInformationsd.status === 60">
                <span class="l">开票凭证</span>
                <span v-if="ticketAuditInformationsd.invoiceVoucherList && ticketAuditInformationsd.invoiceVoucherList.length !== 0" @click="showImg(ticketAuditInformationsd.invoiceVoucherList)"><i class="iconfont icon-photo"></i></span>
                <span v-else><i class="iconfont icon-photo-null"></i></span>
            </div>
            <div class="gy-form-group">
                <span class="l">附件</span>
                <span v-if="ticketAuditInformationsd.invoiceApplicationFiles && ticketAuditInformationsd.invoiceApplicationFiles.length !== 0" @click="showImg(ticketAuditInformationsd.invoiceApplicationFiles)"><i class="iconfont icon-photo"></i></span>
                <span v-else><i class="iconfont icon-photo-null"></i></span>
            </div>
            <div class="gy-form-group"  v-if="ticketAuditInformationsd.status === 70">
                <span class="l">快递单号</span>
                <span>{{ticketAuditInformationsd.expressCode}}</span>
            </div>
            <div class="gy-form-group" v-if="ticketAuditInformationsd.status === 60 && doneFlg === 0">
                <span class="l"><i>*</i>快递单号</span>
                <input type="text" v-model="courierNumberObj.expressCode" placeholder="请填写快递单号">
            </div>
            <div class="gy-form-group" v-if="params.showPageInfo">
                <span class="l">状态</span>
                <div class="text-overflow">{{ticketAuditInformationsd.statusDesc}}</div>
            </div>
            <div class="gy-form-group" style="height: auto;">
                <span class="l">备注</span>
                <textarea rows="3" v-model="applyList.remark" maxlength="100" placeholder="请输入备注" class="gy-textarea"></textarea>
            </div>
        </div>
        <div class="gy-form-group" style="width: 100%" v-if="ticketAuditInformationsd.status === 50 && doneFlg === 0">
            <span class="l"><i style="color: red">*</i>发票凭证</span>
            <gy-file-upload ref="pFileUpload" @callbackFileUpload="onCallbackBuyFileUpload"></gy-file-upload>
        </div>
        <template v-if="isShow && doneFlg === 0">
            <div class="title">审批备注</div>
            <div class="block-wrap clearfix">
                <div class="tex-wrapper">
                    <textarea class="gy-textarea" v-model="remarks"></textarea>
                </div>
            </div>
        </template>
        <div class="foot" style="margin-top:20px">
            <template v-if="isDefault">
                <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
            </template>
            <!--<template v-if="params.homeFromFlg==4&&params.showPageInfo">-->
                <!--<button class="gy-button-extra" v-gy-auth="'to_make_invoice'" @click="restSubmitEdit">重新创建</button>-->
            <!--</template>-->
            <template v-if="params.homeFromFlg==4&&!params.showPageInfo">
                <button class="gy-button-normal" @click="cancleSubmit">取消</button>
                <button class="gy-button-extra" @click="applyTicket()">提交</button>
            </template>
            <template v-if="ticketAuditInformationsd.status < 50 && doneFlg === 0">
                <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
                <button class="gy-button-normal" @click="reject">驳回</button>
                <button class="gy-button-extra" @click="approvedClick(1)">通过</button>
            </template>
            <template v-if="isCanSave">
                <button class="gy-button-extra" @click="approvedClick()">保存</button>
            </template>
        </div>
        <div class="button-wrap" v-if="params.homeFromFlg===1 || params.homeFromFlg===2">
            <button class="gy-button-extra" @click="comment()">评论</button>
        </div>
        <!-- ref="operationHis" -->
        <bank-acc ref="bankAcc" @onSaveAccInfo="popupPaySubmission"></bank-acc>
        <gy-operation-history ref="operationHis"></gy-operation-history>
        <gy-comment-remark v-if="commentDiog.dialogVisibleRemark === true" :dialog = "commentDiog" :invoice="invoiceCommpany"></gy-comment-remark>
        <gy-file-view ref="contFileView"></gy-file-view>
    </div>
</template>
<script>
import gyContract from './../components/contractBasic.vue';
import gyFileView from '../components/gyFileView';
import gyFileUpload from './../components/gyFileUpload';
import gyOperationHistory from './../../components/gyOperationHistoryComment';
import gyCommentRemark from './../../components/gyCommentRemark';
import bankAcc from './../components/bankAcc';

export default {
    components: {gyContract, gyFileView, gyFileUpload, gyOperationHistory, gyCommentRemark, bankAcc},
    data () {
        return {
            ticketAuditInformationsd: {
                receiptVoucherList: [],
                invoiceVoucherUrlList: []
            },
            saleOrderId: null,
            id: null,
            purchaseOrderId: null,
            isShow: null,
            approvedList: {},
            form: {},
            doneFlg: null,
            todoId: null,
            remarks: null,
            invoiceVoucherConfirmObj: {
                invoiceApplicationId: null,
                invoiceVoucherUrlList: []
            }, // 上传发票凭证
            courierNumberObj: {
                expressCode: null,
                invoiceApplicationId: null
            }, //  快递单号
            invoiceHistoryObj: {},
            invoiceHistory: null,
            erpCollectionFileModelList: [],
            fileList: {}, // 凭证list
            params: {
                contEssId: null,
                showPageInfo: true,
                homeFromFlg: 1
            },
            applyList: {
                buyerBankId: null,
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
            },
            newBank: [], // 开户行,
            threadRunTag: true,
            commodCode: [], // 商品税务编码
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
            // 有无进项票
            receiptInvoiceStatus: null,
            commentDiog: {
                dialogVisibleRemark: false
            },
            invoiceCommpany: {
                targetType: 4,
                subSysType: 0,
                targetId: null
            },
            isDefault: false, // 该开票流程是否已完成／默认状态
            isCanSave: false // 是否可以保存
        };
    },
    mounted () {
        this.id = this.$route.query.id;
        this.saleOrderId = this.$route.query.saleOrderId;
        this.purchaseOrderId = this.$route.query.purchaseOrderId;
        this.doneFlg = parseInt(this.$route.query.doneFlg);
        this.todoId = Number(this.$route.query.todoId);
        this.ticketInfor();
        this.contrtactBase();
    },
    created () {
        this.params.contEssId = Number(this.$route.query.id);
        this.params.homeFromFlg = Number(this.$route.query.homeFromFlg);
    },
    methods: {
        entryTicket1 () {
            this.applyList.receiptInvoiceStatus = this.receiptInvoiceStatus;
        },
        // 进项票
        entryTicket () {
            this.receiptInvoiceStatus = null;
            this.applyList.receiptInvoiceStatus = null;
            if (this.applyList.hasReceiptInvoice === 1) {
                this.entryoptionTwo = this.entryoptionTwoYes;
            }
            if (this.applyList.hasReceiptInvoice === 0) {
                this.entryoptionTwo = this.entryoptionTwoNo;
            }
        },
        // 评论
        comment () {
            this.commentDiog.dialogVisibleRemark = true;
            this.invoiceCommpany.refFunc = this.$refs.operationHis.display;
            this.invoiceCommpany.refParam = {
                targetId: this.ticketAuditInformationsd.invoiceApplicationId,
                targetType: 4
            };
        },
        restSubmitEdit () {
            this.params.showPageInfo = false;
            this.showUpdateData();
            this.isDefault = false;
            this.commodityTaxCode(this.form.downstreamInfo.prdSkuId);
        },
        cancleSubmit () {
            this.params.showPageInfo = true;
            this.isDefault = true;
        },
        // 弹出框选择单条-提交
        popupPaySubmission (accInfo) {
            if (accInfo == null || accInfo === undefined) {
                this.applyList.buyerBankId = null;
                this.applyList.buyerBankAccount = null;
                this.applyList.buyerBankName = null;
                return;
            }
            this.applyList.buyerBankId = accInfo.id;
            this.applyList.buyerBankName = accInfo.bankName;
            this.applyList.buyerBankAccount = accInfo.companyAccount;
            this.newPaymentBankAssembly(this.applyList);
        },
        // 获取银行
        changeBlank (selAccInfo) {
            if (selAccInfo === 0) {
                // this.isBooleanBank = true;
                this.$refs.bankAcc.addBank = true;
                this.$refs.bankAcc.creatBank.companyId = this.applyList.buyerCompanyId;
                this.$refs.bankAcc.creatBank.accountName = this.applyList.buyerCompanyName;
            }
            for (var i = 0; i < this.newBank.length; i++) {
                if (selAccInfo === this.newBank[i].bankAccId) {
                    this.applyList.buyerBankId = this.newBank[i].bankAccId;
                    this.applyList.buyerBankAccount = this.newBank[i].bankAccount;
                    this.applyList.buyerBankName = this.newBank[i].depositBankName;
                }
            }
        },
        // 查看附件(凭证)
        showImg (list) {
            this.$refs.contFileView.open4MultiFile(list);
        },
        // 上传发票凭证-回调
        onCallbackBuyFileUpload (fileList) {
            this.invoiceVoucherConfirmObj.invoiceVoucherUrlList = [];
            fileList.forEach((e) => {
                this.invoiceVoucherConfirmObj.invoiceVoucherUrlList.push(e.fileUrl);
            });
        },
        // 提交上传发票凭证
        uploadInvoiceClick () {
            if (this.invoiceVoucherConfirmObj.invoiceVoucherUrlList.length === 0) {
                this.$message({
                    message: '请上传发票凭证',
                    type: 'error'
                });
                return;
            }
            this.invoiceVoucherConfirmObj.invoiceApplicationId = this.ticketAuditInformationsd.invoiceApplicationId;
            this.invoiceVoucherConfirmObj.todoId = this.todoId;
            this.invoiceVoucherConfirmObj.contEssId = this.id;
            this.$http.post(this.$api.invoice.uploadInvoice, this.invoiceVoucherConfirmObj).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    this.$router.go(-1);
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        // 快递单号
        courierNumberClick () {
            if (this.courierNumberObj.expressCode === null || this.courierNumberObj.expressCode === '') {
                this.$message({
                    message: '请填写快递单号',
                    type: 'error'
                });
                return;
            }
            this.courierNumberObj.invoiceApplicationId = this.ticketAuditInformationsd.invoiceApplicationId;
            this.courierNumberObj.todoId = this.todoId;
            this.courierNumberObj.contEssId = this.id;
            this.courierNumberObj.allowedFunctionsId = 39;
            this.$http.post(this.$api.invoice.courierNumber, this.courierNumberObj).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    this.$router.go(-1);
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        // 获取商品税务编码
        commodityTaxCode (item) {
            this.$http.post(this.$api.invoice.commodityCode, {'productId': item}).then((res) => {
                if (res.data.code === 0) {
                    this.commodCode = res.data.data;
                }
            });
        },
        // 开票信息
        ticketInfor () {
            let that = this;
            that.$http.get(that.$api.invoice.applyInvoices + '/' + that.$route.query.invoiceId).then(function (res) {
                if (res.data.code === 0) {
                    that.ticketAuditInformationsd = res.data.data;
                    that.invoiceCommpany.targetId = that.ticketAuditInformationsd.invoiceApplicationId;
                    that.init();
                    that.showClick();
                    that.invoiceHistoryClick();
                    if ((that.ticketAuditInformationsd.status === 50 || that.ticketAuditInformationsd.status === 60) && that.doneFlg === 0) {
                        that.isCanSave = true;
                        that.isDefault = false;
                    }
                }
            }).catch(function (error) {
                that.$message(error);
            });
        },
        showUpdateData () {
            this.applyList.buyerName = this.ticketAuditInformationsd.buyerName;
            this.applyList.applicationDate = this.ticketAuditInformationsd.date;
            this.applyList.skuQuantity = this.ticketAuditInformationsd.quantity;
            this.applyList.buyerTaxCode = this.ticketAuditInformationsd.productTaxCode;
            this.applyList.amount = this.ticketAuditInformationsd.amount;
            this.applyList.buyerBankId = this.ticketAuditInformationsd.buyerBankId;
            this.applyList.buyerCompanyId = this.ticketAuditInformationsd.buyerId;
            this.applyList.buyerCompanyName = this.ticketAuditInformationsd.buyerName;
            this.applyList.buyerBankName = this.ticketAuditInformationsd.buyerBankName;
            this.applyList.buyerBankAccount = this.ticketAuditInformationsd.buyerBankAccount;
            this.applyList.productTaxCode = this.ticketAuditInformationsd.productTaxCode;
            this.applyList.deliveredProductQuantity = this.ticketAuditInformationsd.deliveredProductQuantity;
            this.applyList.hasReceiptInvoice = this.ticketAuditInformationsd.hasReceiptInvoice;
            if (this.ticketAuditInformationsd.hasReceiptInvoice === 1) {
                this.entryoptionTwo = this.entryoptionTwoYes;
            } else {
                this.entryoptionTwo = this.entryoptionTwoNo;
            }
            this.receiptInvoiceStatus = this.ticketAuditInformationsd.receiptInvoiceStatus;
            this.applyList.receiptInvoiceStatus = this.ticketAuditInformationsd.receiptInvoiceStatus;
            this.applyList.receiptInvoiceAmount = this.ticketAuditInformationsd.receiptInvoiceAmount;
            this.applyList.operationUserName = this.ticketAuditInformationsd.operationUserName;
            this.applyList.remark = this.ticketAuditInformationsd.remark;
            this.applyList.productName = this.ticketAuditInformationsd.productName;
            this.applyList.contEssId = this.id;
            this.applyList.salesOrderId = this.saleOrderId;
            this.applyList.buyerId = this.ticketAuditInformationsd.buyerId;
            this.applyList.status = this.ticketAuditInformationsd.status;
            this.applyList.todoId = this.todoId;
            this.changeBlank();
        },
        init () {
            let that = this;
            that.$http.post(this.$api.invoice.getInvoiceDeliveryCollection, {'salesOrderId': that.saleOrderId, 'purchaseOrderId': that.purchaseOrderId})
                .then((res) => {
                    if (res.data.code === 0) {
                        that.fileList = res.data.data;
                        this.applyList.buyerTaxCode = this.fileList.corpTaxCode;
                    }
                });
        },
        // 按钮显示-这里是否显示审批按钮
        showClick () {
            let that = this;
            let params = {
                targetId: this.ticketAuditInformationsd.invoiceApplicationId,
                targetType: 4
            };
            this.$http.post(this.$api.apprProc.hasApproveAuth, params).then(function (response) {
                if (response.data.code === 0) {
                    if (that.params.homeFromFlg === 1) {
                        // 待办事项
                        that.isShow = true;
                        that.isDefault = false;
                    } else {
                        that.isShow = false;
                        that.isDefault = true;
                    }
                } else {
                    that.isShow = false;
                    that.isDefault = true;
                    if ((that.ticketAuditInformationsd.status === 50 || that.ticketAuditInformationsd.status === 60) && that.doneFlg === 0) {
                        that.isDefault = false;
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 确认
        approvedClick (item) {
        // 上传发票
            if (this.ticketAuditInformationsd.status === 50 && this.doneFlg === 0) {
                this.uploadInvoiceClick();
            } else if (this.ticketAuditInformationsd.status === 60 && this.doneFlg === 0) { // 快递单号
                this.courierNumberClick();
            } else {
                this.approvedSub(item); // 工作流
            }
        },
        approvedSub (item) {
            this.approvedList.todoId = this.todoId;
            this.approvedList.contEssId = this.id;
            this.approvedList.approved = item;
            this.approvedList.remark = this.remarks;
            this.approvedList.invoiceApplicationId = this.ticketAuditInformationsd.invoiceApplicationId;
            this.$http.post(this.$api.invoice.approveSure, this.approvedList).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    this.$router.go(-1);
                } else {
                    this.$message.error(res.data.code + ' ' + res.data.message);
                }
            });
        },
        // 合同要素基本信息
        contrtactBase () {
            let that = this;
            this.$http.get(this.$api.order.orderDetail + '/' + this.id).then((res) => {
                if (res.data.code === 0) {
                    that.form = res.data.data;
                    that.newPaymentBankAssembly(that.form);
                }
            });
        },
        reject () {
            this.$confirm('确认驳回?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.approvedSub(2);
            });
        },
        // 操作历史记录
        invoiceHistoryClick () {
            this.invoiceHistoryObj.targetId = this.ticketAuditInformationsd.invoiceApplicationId;
            this.invoiceHistoryObj.targetType = 4;
            this.$refs.operationHis.display(this.$api.contract.approve1History, this.invoiceHistoryObj);
        },
        // 查询付款银行
        newPaymentBankAssembly (val) {
            this.$http.post(this.$api.payment.newBank, {'companyId': val.buyerCompanyId}).then((res) => {
                if (res.data.code === 0) {
                    this.newBank = res.data.data;
                    if (this.newBank.length === 2) {
                        this.applyList.buyerBankName = this.newBank[0].depositBankName;
                        this.applyList.buyerBankAccount = this.newBank[0].bankAccount;
                    }
                }
            });
        },
        changeProdTaxCode (val) {
            if (this.commodCode) {
                this.applyList.productTaxCode = val;
            }
        },
        // 申请开票
        applyTicket () {
            if (!this.applyList.buyerName) {
                this.$message({
                    message: '请输入开票单位',
                    type: 'error'
                });
                return;
            }
            if (this.applyList.applicationDate === null) {
                this.$message({
                    message: '请选择申请日期',
                    type: 'error'
                });
                return;
            }
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
            if (this.applyList.quantity === '') {
                this.$message({
                    message: '请输入开票数量',
                    type: 'error'
                });
                return;
            }
            if (this.applyList.amount === '') {
                this.$message({
                    message: '请输入开票总金额',
                    type: 'error'
                });
                return;
            }
            if (this.applyList.receiptInvoiceAmount === '') {
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
            if (this.threadRunTag) {
                this.threadRunTag = false;
                this.$http.post(this.$api.invoice.applyInvoice, this.applyList).then((res) => {
                    if (res.data.code === 0) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });

                        this.$router.push({path: '/home'});
                        this.isSubmit = false;
                        // this.stepArr = res.data.data;
                        this.isSubmit = false;
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
        }
    },
    watch: {
        remarks (val) {
            if (val.length > 2500) {
                this.$message({
                    message: '审批备注最多可填写2500字',
                    type: 'warning'
                });
                this.remarks = this.remarks.substr(0, 2500);
            }
        }
    }
};
</script>
<style lang="scss">
  .approve-invoice{
      padding-bottom: 30px;
      .title{
          font-size: 14px;
          color: #333333;
          margin: 20px 20px;
          font-weight: bold;
      }
      .gy-form-group{
          padding:8px 30px 8px 172px;
          .l{
              width:155px;
              i {
                  color: red;
              }
          }
      }
      .padding_small{
          padding:0 16px;
      }
      .button-wrap {
          margin-top: 20px;
          text-align: right;
          padding-right: 30px;
          position: relative;
          .gy-button-extra{
              position: absolute;
              right: 30px;
              top: 3px;
          }
      }
      .tex-wrapper {
          padding-right: 30px;
          padding-left: 30px;
      }
      .gy-table{
          white-space:pre-line;
          font-size: 12px;
          color:#666666;
      }
      .gy-table thead td, .gy-table thead th{
          font-weight: bold;
      }
      .input-date {
          .el-input__inner {
              font-size: 14px;
          }
      }
  }
</style>
