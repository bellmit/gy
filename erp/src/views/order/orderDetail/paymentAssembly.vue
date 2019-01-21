// 收付
<template>
    <div class="paymentDetails">
        <!--新建收款-->
        <el-dialog width="1200px" class="order-dialog"
                   :before-close="handleCloseReceivables"
                   :visible.sync="orderData.newReceiptsdialog">
            <div class="order-apply">
                <div class="title">新建收款</div>
            </div>
            <div class="block clearfix">
                <div class="gy-form-group">
                    <span class="l">下游公司</span>
                    <span>{{orderMessage.buyerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">产品名称</span>
                    <span>{{orderMessage.skuName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">付款方式</span>
                    <span>{{orderMessage.paymentType | paymentType}}/{{orderMessage.payChannel | payChannel}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">合同金额(元)</span>
                    <span>{{orderMessage.contractAmount | numToCash}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>收款类型</span>
                    <input type="radio" name="ddd" v-model="recMethodAmount"
                           :disabled="recMethodAmount === '2'" value="1">货款
                    <input type="radio" name="ddd" v-model="recMethodAmount" :disabled="true" value="2">保证金
                    <input type="radio" name="ddd" v-model="recMethodAmount"
                           :disabled="recMethodAmount === '2' || receliverAmount.collectionType === 3" value="5">追加保证金
                </div>
                <div class="gy-form-group">
                    <span class="l">待收金额(元)</span>
                    <span>{{orderMessage.collectionAmount | numToCash}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>本次收款金额(元)</span>
                    <input type="text" v-model="receliverAmount.payTotal"
                           :disabled="recMethodAmount === 2">
                </div>
                <div class="gy-form-group">
                    <span class="l">下游付款凭证</span>
                    <el-upload
                            action="api"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreviewReceivables"
                            :on-remove="beforeRemove"
                            :http-request="receiptVoucher">
                        <i class="el-icon-plus"></i>
                        <enlarge-image :data-enlarge="enlargeImageObejct"></enlarge-image>
                    </el-upload>
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
                <button style="margin-right: 6px;" v-if="!paymentGuan" class="gy-button-normal" @click="orderData.newReceiptsdialog = false">取消</button>
                <button style="margin-right: 6px;" v-if="paymentGuan" class="gy-button-normal" @click="orderData.newReceiptsdialog = false">关闭</button>
                <button v-if="isSubmit" class="gy-button-extra" @click="createReceiptsSingle()">提交</button>
            </div>
        </el-dialog>
        <!--新建付款-->
        <el-dialog width="1200px" class="order-dialog"
                   :before-close="handleClosePayment"
                   :visible.sync="orderData.dialogVisible">
            <div class="order-apply">
                <div class="title">新建付款</div>
            </div>
            <div class="gy-form-group">
                <span class="l">产品名称</span>
                <span>{{orderIds.prodName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>申请日期</span>
                <div class="searchDate">
                    <div class="d">
                        <el-date-picker
                                v-model="creatPaymentForm.appalyPaymentTime"
                                type="date"
                                value-format="timestamp"
                                placeholder="申请日期"
                        >
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>收款单位</span>
                <span>{{orderMessagies.sellerCompanyName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>收款开户行</span>
                <el-select v-model="creatPaymentForm.sellerDepositBank" placeholder="请选择收款银行账户" @change="changeBlank">
                  <el-option
                    v-for="item in newBank"
                    :key="item.bankAccId"
                    :label="item.depositBankName"
                    :value="item.bankAccId">
                  </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l">合同金额(元)</span>
                <span>{{orderIds.buyTotal | numToCash}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>收款银行账号</span>
                <input type="text" v-model="creatPaymentForm.sellerAccount" readonly>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>用途</span>
                <div style="display: inline-block">
                    <input type="radio" v-model="payMethodAmount" value="1" name="ttt"
                           :disabled="paymentAmount.goodPaymentStatus === 2">货款
                </div>
                <div style="display: inline-block"
                     v-if="orderMessagies.depositAmount !== null || orderMessagies.depositAmount !== ''">
                    <input type="radio" v-model="payMethodAmount" value="2" name="ttt"
                           :disabled="paymentAmount.depositStatus === 2">保证金
                </div>
                <div style="display: inline-block"
                     v-if="orderMessagies.depositAmount !== null || orderMessagies.depositAmount !== ''">
                    <input type="radio" v-model="payMethodAmount" value="5" name="ttt"
                           :disabled="paymentAmount.appendDepositStatus === 2">追加保证金
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>付款方式</span>
                <input type="radio" v-model="creatPaymentForm.tradeMode" value="25">支票
                <input type="radio" v-model="creatPaymentForm.tradeMode" value="22">银行电汇
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>申请金额(元)</span>
                <input type="text" :aria-disabled="paymentAmount.depositStatus === 1" v-model="paymentAmount.payTotal"
                       placeholder="请输入申请金额">
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>付款说明</span>
                <input type="radio" v-model="creatPaymentForm.payDesc" value="1">本笔资金支出为正常交割，我司需垫资 <br>
                <input type="radio" v-model="creatPaymentForm.payDesc" value="2">本笔资金支出需先收到下家款项，我司无需垫资 <br>
                <input type="radio" v-model="creatPaymentForm.payDesc" value="3">分批付款，以付款明细表为准
            </div>
            <div class="gy-form-group" style="margin-top:-34px">
                <span class="l">备注</span>
                <textarea cols="40" rows="7" v-model="creatPaymentForm.remarks"></textarea>
            </div>
            <div style="clear: both"></div>
            <table class="gy-table" v-if="creatPaymentForm.payDesc === '3' || creatPaymentForm.payDesc === 3">
                <thead>
                <tr>
                    <th>#</th>
                    <th>付款金额(元)</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in creatPaymentForm.payInfoList" :key="index">
                    <td>{{index + 1}}</td>
                    <td><input type="text" v-model="item.payAmount" placeholder="请输入付款金额"></td>
                    <td><input type="text" v-model="item.description" placeholder="请输入备注"></td>
                    <td>
                        <span @click="addClick()" style="cursor: pointer">+</span><br>
                        <span v-if="creatPaymentForm.payInfoList.length > 1" @click="delectClick(index)"
                              style="cursor: pointer">-</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <!-- 进度条 -->
            <div class="step-title" v-if="!isSubmit2">操作流程</div>
            <div class="delivery-step" v-if="!isSubmit2" style="overflow-x: auto">
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
                <button style="margin-right: 6px;" v-if="!paymentRecelice" class="gy-button-normal" @click="orderData.dialogVisible = false">取消</button>
                <button style="margin-right: 6px;" v-if="paymentRecelice" class="gy-button-normal" @click="orderData.dialogVisible = false">关闭</button>
                <button v-if="isSubmit2" class="gy-button-extra" @click="billOfPayment()">提交</button>
            </div>
        </el-dialog>
        <bank-acc ref="bankAcc" @onSaveAccInfo="popupPaySubmission"></bank-acc>
    </div>
</template>

<script>
import gyStep from '@/components/step1';
import bankAcc from './../../components/bankAcc';
import enlargeImage from './../../components/enlargeImage';
export default {
    components: {bankAcc, gyStep, enlargeImage},
    name: 'paymentAssembly',
    props: {
        orderData: Object,
        orderMessage: Object,
        orderIds: Object,
        initialData: Object,
        orderMessagies: Object,
        orderPurchase: Object
    },
    data () {
        return {
            paymentAmountRadio: 1,
            id: null,
            purchaseOrderId: null,
            saleOrderId: null,
            paymentNwes: [], // 新增付款
            newReceiptsList: {
                collectionType: null,
                collectionAmount: null,
                erpBuyerPaymentFileModelList: []
            }, // 新建收款单
            creatPaymentForm: {
                appalyPaymentTime: new Date(),
                sellerAccount: null,
                sellerDepositBank: null,
                payMethod: null,
                sellerCorpName: null,
                payTotal: null,
                tradeMode: null,
                handlerUserName: null,
                payDesc: null,
                payInfoList: [
                    {payAmount: null, description: null},
                    {payAmount: null, description: null}
                ]
            }, // 新建付款单
            dialogVisible: false, // 新建付款
            newReceiptsdialog: false, // 新建收款
            paymentReceivables: [], // 收付款-收款
            collectionList: [], // 收付款-收款
            newBank: [], // 新增银行账号
            payStatus: 1,
            isSubmit: true,
            isSubmit2: true,
            stepArr: [],
            stepArr2: [],
            paymentRecelice: false,
            paymentGuan: false,
            paymentAmount: {}, // 付款
            receliverAmount: {}, // 收款
            payMethodAmount: null,
            recMethodAmount: null,
            enlargeImageObejct: {
                dialogImageUrl: '',
                dialogVisibleImg: false
            } // 存放显示图片
        };
    },
    mounted () {
        this.id = this.orderIds.id;
        this.$nextTick(function () {
            this.newReceiptsList.collectionType = this.orderMessage.collectionType === 2 ? 2 : 1;
        });
    },
    methods: {
        // 图片浏览
        handlePictureCardPreviewReceivables (file) {
            this.enlargeImageObejct.dialogImageUrl = file.url;
            this.enlargeImageObejct.dialogVisibleImg = true;
        },
        // 移除
        handleRemove (file, fileList) {
            console.log(file);
            console.log(fileList);
            console.log(this.newReceiptsList.erpBuyerPaymentFileModelList);
        },
        beforeRemove (file, fileList) {
            console.log(this.newReceiptsList.erpBuyerPaymentFileModelList);
        },
        // 关闭弹出框-收款
        handleCloseReceivables () {
            this.orderData.newReceiptsdialog = false;
            this.$emit('ivoiceList');
        },
        // 关闭弹出框-付款
        handleClosePayment () {
            this.orderData.dialogVisible = false;
            this.$emit('ivoiceList');
        },
        // 分笔付款 -- 添加 -- 删除
        addClick () {
            let addObj = {};
            addObj.payAmount = null;
            addObj.description = null;
            this.creatPaymentForm.payInfoList.push(addObj);
        },
        // 删除
        delectClick (index) {
            this.creatPaymentForm.payInfoList.splice(index, 1);
            if (this.creatPaymentForm.payInfoList.length === 0) {
                this.creatPaymentForm.payDesc = null;
            }
        },
        // 查询付款银行
        newPaymentBankAssembly () {
            this.$http.post(this.$api.payment.newBank, {'companyId': this.orderIds.sellerCompanyId}).then((res) => {
                if (res.data.code === 0) {
                    this.newBank = res.data.data;
                }
            });
        },
        // 添加开户行
        changeBlank (selAccInfo) {
            if (selAccInfo === 0) {
                this.$refs.bankAcc.addBank = true;
                this.$refs.bankAcc.creatBank.companyId = this.orderIds.sellerCompanyId; // 这里是上游公司ID
                this.$refs.bankAcc.creatBank.accountName = this.orderMessagies.sellerCompanyName;
            }
            for (let i = 0; i < this.newBank.length; i++) {
                if (selAccInfo === this.newBank[i].bankAccId) {
                    this.creatPaymentForm.sellerAccount = this.newBank[i].bankAccount;
                    this.creatPaymentForm.sellerDepositBank = this.newBank[i].depositBankName;
                }
            }
        },
        // 弹出框选择单条-提交
        popupPaySubmission (accInfo) {
            if (accInfo == null || accInfo === undefined) {
                this.creatPaymentForm.sellerAccount = null;
                this.creatPaymentForm.sellerDepositBank = null;
                return;
            }
            this.creatPaymentForm.sellerDepositBank = accInfo.depositBank;
            this.creatPaymentForm.sellerAccount = accInfo.companyAccount;
            this.$refs.bankAcc.addBank = false;
            this.newPaymentBankAssembly();
        },
        // 下游付款凭证
        receiptVoucher (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.upload.imgUpload, formData, headers)
                .then(function (res) {
                    that.newReceiptsList.erpBuyerPaymentFileModelList.push({
                        fileUrl: res.data.data
                    });
                });
        },
        // 收付款-收款
        paymentColl () {
            let that = this;
            that.$http.get(that.$api.payment.getDetailCollection + that.saleOrderId)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.collectionList = res.data.data;
                    }
                });
        },
        // 创建收款单
        createReceiptsSingle () {
            if (this.newReceiptsList.collectionType === null) {
                this.$message({
                    message: '请选择收款类型',
                    type: 'error'
                });
                return;
            }
            if (this.receliverAmount.payTotal === '' || this.receliverAmount.payTotal === undefined) {
                this.$message({
                    message: '请输入本次收款金额',
                    type: 'error'
                });
                return;
            }
            // if (this.newReceiptsList.collectionDate === null) {
            //     this.$message({
            //         message: '请选择到账日期',
            //         type: 'error'
            //     });
            //     return;
            // }
            // if (this.newReceiptsList.collectionChecked === '0') {
            //     this.newReceiptsList.collectionChecked = 0;
            // } else if (this.newReceiptsList.collectionChecked === '1') {
            //     this.newReceiptsList.collectionChecked = 1;
            // }
            if (this.recMethodAmount === '1') {
                this.newReceiptsList.collectionType = 1;
            } else if (this.recMethodAmount === '2') {
                this.newReceiptsList.collectionType = 2;
            } else if (this.recMethodAmount === '5') {
                this.newReceiptsList.collectionType = 5;
            }
            this.newReceiptsList.collectionAmount = this.receliverAmount.payTotal;
            this.newReceiptsList.orderId = this.orderIds.saleOrderId;
            this.newReceiptsList.contractId = this.orderIds.id;
            this.$http.post(this.$api.order.createReceipts, this.newReceiptsList).then((res) => {
                if (res.data.code === 0) {
                    this.paymentGuan = true;
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    // this.newReceiptsList = {};
                    // this.newReceiptsList.collectionType = null;
                    // // this.newReceiptsList.collectionChecked = 0;
                    // this.newReceiptsList.collectionAmount = null;
                    // this.newReceiptsList.erpBuyerPaymentFileModelList = [];
                    this.$emit('ivoiceList');
                    // 收款
                    let query = {
                        targetId: res.data.data,
                        targetType: 5
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
            });
        },
        // 创建付款单
        billOfPayment () {
            if (this.creatPaymentForm.appalyPaymentTime === null) {
                this.$message({
                    message: '请选择申请日期',
                    type: 'error'
                });
                return;
            }
            if (this.orderMessagies.sellerCompanyName === '') {
                this.$message({
                    message: '请输入收款单位',
                    type: 'error'
                });
                return;
            }
            if (this.creatPaymentForm.sellerDepositBank === null || this.creatPaymentForm.sellerDepositBank === '') {
                this.$message({
                    message: '请输入收款开户行',
                    type: 'error'
                });
                return;
            }
            if (this.creatPaymentForm.sellerAccount === null || this.creatPaymentForm.sellerAccount === '') {
                this.$message({
                    message: '请输入收款银行账号',
                    type: 'error'
                });
                return;
            }
            if (this.payMethodAmount === null || this.payMethodAmount === 0) {
                this.$message({
                    message: '请选择用途',
                    type: 'error'
                });
                return;
            }
            if (this.creatPaymentForm.tradeMode === null) {
                this.$message({
                    message: '请选择付款方式',
                    type: 'error'
                });
                return;
            }
            if (this.paymentAmount.payTotal === null || this.paymentAmount.payTotal === '' || this.paymentAmount.payTotal === undefined) {
                this.$message({
                    message: '请输入申请金额',
                    type: 'error'
                });
                return;
            }
            if (this.paymentAmount.payTotal === 0 || this.paymentAmount.payTotal === '0') {
                this.$message({
                    message: '申请金额不能为0',
                    type: 'error'
                });
                return;
            }
            if (this.creatPaymentForm.payDesc === null) {
                this.$message({
                    message: '付款说明为必选项',
                    type: 'error'
                });
                return;
            }
            if (this.payMethodAmount === '1' || this.payMethodAmount === 1) {
                this.payMethodAmount = 1;
                let checkGoodsAmountPayment = null;
                // 合同金额 - 需要付款金额  + 保证金金额 + 申请货款金额
                checkGoodsAmountPayment = (this.orderIds.buyTotal - this.paymentAmount.leftAmount) + Number(this.paymentAmount.payTotal);
                if (checkGoodsAmountPayment >= this.orderIds.buyTotal * 1.05) {
                    this.$message({
                        message: '抱歉，申请金额核算已超出合同金额的5%，无法提交申请',
                        type: 'warning'
                    });
                    return;
                }
            } else if (this.payMethodAmount === '2' || this.payMethodAmount === 2) {
                this.payMethodAmount = 2;
                // 合同金额 - 需要付款金额  + 申请保证金额
                // let checkContractAmountPayment = null;
                // checkContractAmountPayment = (this.orderIds.buyTotal - this.paymentAmount.leftAmount) + Number(this.paymentAmount.payTotal);
                // if (checkContractAmountPayment >= this.orderIds.buyTotal * 1.05) {
                //     this.$message({
                //         message: '抱歉，申请金额核算已超出合同金额的5%，无法提交申请',
                //         type: 'warning'
                //     });
                //     return;
                // } else {
                //     this.$message({
                //         message: '申请金额已超出待付货款，请知晓',
                //         type: 'info'
                //     });
                // }
            } else if (this.payMethodAmount === '5' || this.payMethodAmount === 5) {
                this.payMethodAmount = 5;
            }
            if (this.creatPaymentForm.tradeMode === '25') {
                this.creatPaymentForm.tradeMode = 25;
            }
            if (this.creatPaymentForm.tradeMode === '22') {
                this.creatPaymentForm.tradeMode = 22;
            }
            if (this.creatPaymentForm.payDesc === '1') {
                this.creatPaymentForm.payDesc = 1;
            } else if (this.creatPaymentForm.payDesc === '2') {
                this.creatPaymentForm.payDesc = 2;
            } else if (this.creatPaymentForm.payDesc === '3' || this.creatPaymentForm.payDesc === 3) {
                this.creatPaymentForm.payDesc = 3;
                if (this.creatPaymentForm.payInfoList.length < 2) {
                    this.$message({
                        message: '需要分批，至少分两批以上',
                        type: 'error'
                    });
                    return;
                }
                let sumInfoList = 0;
                for (let i = 0; i < this.creatPaymentForm.payInfoList.length; i++) {
                    let payAmounts = null;
                    payAmounts = Number(this.creatPaymentForm.payInfoList[i].payAmount);
                    sumInfoList = sumInfoList + payAmounts;
                    if (this.creatPaymentForm.payInfoList[i].payAmount === null || this.creatPaymentForm.payInfoList[i].payAmount === undefined || this.creatPaymentForm.payInfoList[i].payAmount === '') {
                        this.$message({
                            message: '请填写付款金额',
                            type: 'error'
                        });
                        return;
                    }
                }
                let orderIdsTotal = null;
                orderIdsTotal = Number(this.paymentAmount.payTotal);
                if (sumInfoList !== orderIdsTotal) {
                    this.$message({
                        message: '分批金额总和，应该等于申请金额',
                        type: 'error'
                    });
                    return;
                }
            }
            this.creatPaymentForm.payMethod = this.payMethodAmount;
            this.creatPaymentForm.payTotal = this.paymentAmount.payTotal;
            this.creatPaymentForm.contEssId = this.orderIds.id;
            this.creatPaymentForm.purchaseOrderId = this.orderIds.purchaseOrderId;
            this.creatPaymentForm.saleOrderId = this.orderIds.saleOrderId;
            this.creatPaymentForm.sellerCorpName = this.orderIds.sellerCompanyName;
            this.creatPaymentForm.sellerCorpId = this.orderIds.sellerCompanyId;
            this.creatPaymentForm.buyerCompId = this.orderIds.buyerCompanyId;
            this.creatPaymentForm.buyerCorpName = this.orderIds.buyerCompanyName;
            this.creatPaymentForm.orderType = 3;
            this.creatPaymentForm.approveStatus = 3;
            this.$http.post(this.$api.order.newPayment, this.creatPaymentForm).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });

                    this.paymentRecelice = true;
                    this.$emit('ivoiceList');
                    // 付款
                    let query = {
                        targetId: res.data.data.targetId,
                        targetType: 3
                    };
                    this.isSubmit2 = false;
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
        // 付款申请金额---
        getpaymentApplicationAmount (val) {
            console.log(val);
            this.$http.get(this.$api.payment.paymentApplicationAmount + '/' + val).then((res) => {
                if (res.data.code === 0) {
                    this.paymentAmount = res.data.data;
                    if (this.paymentAmount.depositStatus === 1) {
                        this.paymentAmount.payTotal = this.paymentAmount.leftAmount;
                        this.payMethodAmount = '2';
                        console.log(this.payMethodAmount);
                    } else if (this.paymentAmount.appendDepositStatus === 1) {
                        this.payMethodAmount = '5';
                        this.paymentAmount.payTotal = this.paymentAmount.leftAmount;
                        console.log(this.payMethodAmount);
                    } else if (this.paymentAmount.goodPaymentStatus === 1) {
                        this.payMethodAmount = '1';
                        this.paymentAmount.payTotal = this.paymentAmount.leftAmount;
                        console.log(this.payMethodAmount);
                    }
                }
            });
        },
        getreceliveApplicationAmount (val) {
            this.$http.get(this.$api.invoice.createCollectView + '/' + val).then((res) => {
                if (res.data.code === 0) {
                    this.receliverAmount = res.data.data;
                    // recMethodAmount
                    if (this.receliverAmount.collectionType === 2) {
                        this.receliverAmount.payTotal = this.receliverAmount.depositAmount;
                        this.recMethodAmount = '2';
                    } else if (this.receliverAmount.collectionType === 1) {
                        this.recMethodAmount = '1';
                        this.receliverAmount.payTotal = this.receliverAmount.needCollectionAmount;
                    } else if (this.receliverAmount.collectionType === 3) {
                        this.recMethodAmount = '1';
                        this.receliverAmount.payTotal = this.receliverAmount.needCollectionAmount;
                    }
                }
            });
        }
    },
    watch: {
        payMethodAmount: function (rule, value) {
            if (rule === '1') {
                this.paymentAmount.payTotal = this.paymentAmount.leftAmount;
            }
            if (rule === '5') {
                this.paymentAmount.payTotal = this.paymentAmount.appendDepositAmount;
            }
        },
        orderIds (newValue, oldValue) {
            this.newPaymentBankAssembly();
        }
    }
};
</script>

<style scoped lang="scss">
    .paymentDetails {
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
            margin: 20px 0px;
            padding: 50px 20px;
            overflow-y: auto;
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
                text-align: center;
                width: 150px;
                margin-left: 55px;
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
        .gy-table{
            width: 95%;
        }
        .add {
            position: absolute;
            cursor: pointer;
            right: 35px;
            top: 715px;
        }
        .delete{
            position: absolute;
            cursor: pointer;
            right: 35px;
            top: 735px;
        }
    }

</style>
<style lang="scss">
    .paymentDetails {
        .el-tabs {
            .lll {
                width: 100%;
                height: 340px;
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
            .gy-form-group{
                padding: 10px 40px 10px 154px;
                span{
                    i{
                        color: $color-highlight;
                    }
                }
            }
            .gy-form-group .l{
                width: 116px;
            }
        }
    }
</style>
