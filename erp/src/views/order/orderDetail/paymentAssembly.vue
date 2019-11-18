// 收付
<template>
    <div class="paymentDetails">
        <!--新建收款-->
        <el-dialog width="1200px" class="order-dialog"
                   :close-on-click-modal = "false"
                   :before-close="handleCloseReceivables"
                   :visible.sync="orderData.newReceiptsdialog">
            <div class="order-apply">
                <div class="title">新建收款</div>
            </div>
            <div class="block clearfix">
                <div class="gy-form-group">
                    <span class="l spanLeft">下游公司</span>
                    <span class="left-align">{{downstreamInfo.buyerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l spanLeft">产品名称</span>
                    <span class="left-align">{{orderIds.prodName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l spanLeft">付款方式</span>
                    <span class="left-align">{{downstreamInfo.paymentType | paymentType(downstreamInfo.payChannel)}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l spanLeft">合同金额(元)</span>
                    <span class="left-align red" v-if="receliverAmount.isFormulaPrice">公式计价</span>
                    <span class="left-align" v-else>{{orderIds.saleTotal | numToCash}}</span>
                </div>
                <div class="gy-form-group">
                      <span class="l"><i>*</i>收款类型</span>
                    <input type="radio" name="ddd" v-model="recMethodAmount"
                           :disabled="receliverAmount.goodPaymentStatus === 2" value="1">货款
                    <input type="radio" name="ddd" v-model="recMethodAmount"
                           :disabled="receliverAmount.depositStatus === 2" value="2">保证金
                    <input type="radio" name="ddd" v-model="recMethodAmount"
                           :disabled="receliverAmount.appendDepositStatus === 2" value="5">追加保证金
                </div>
                <div class="gy-form-group">
                    <span class="l spanLeft">待收金额(元)</span>
                    <span class="left-align" v-if="receliverAmount.isFormulaPrice">--</span>
                    <span class="left-align" v-else>{{receliverAmount.needCollectionAmount | numToCash}}</span>
                </div>
                <div class="gy-form-group" v-if="receliverAmount.isFormulaPrice && recMethodAmount == 1">
                    <span class="l spanLeft">合同数量(吨)</span>
                    <span class="left-align">{{downstreamInfo.skuQuantity | numToQuantity}}</span>
                </div>
                <div class="gy-form-group" v-if="receliverAmount.isFormulaPrice && recMethodAmount == 1">
                    <span class="l"><i>*</i>收款数量(吨)</span>
                    <input type="number" class="gy-input" v-model="newReceiptsList.applyQuantities" placeholder="请输入收款数量">
                </div>
                <!-- newReceiptsList.collectionType == 1 货款类型 -->
                <div class="gy-form-group" v-if="receliverAmount.isFormulaPrice && recMethodAmount == 1">
                    <span class="l spanLeft">暂定价(元/吨)</span>
                    <!-- TODO -->
                    <input class="gy-input" v-model="newReceiptsList.tempPrice" :readonly="downstreamInfo.skuPriceType == 22" type="text" placeholder="请输入暂定价">
                </div>
                <div class="gy-form-group">
                    <span class="l"><i>*</i>本次收款金额(元)</span>
                    <input type="text" v-model="receliverAmount.payTotal"
                           :disabled="recMethodAmount === 2">
                </div>
                <div class="gy-form-group">
                    <span class="l spanLeft">下游付款凭证</span>
                    <gy-file-upload ref="sFileUpload" @callbackFileUpload="onCallbackSaleFileUpload"></gy-file-upload>
                </div>
            </div>
            <!-- 进度条 -->
            <div v-if="!isSubmit">
                <operation-process :elStepList="stepArr"></operation-process>
            </div>
            <div style="margin-top: 10px;text-align: right;padding-bottom: 30px;padding-right: 30px;">
                <button style="margin-right: 6px;" v-if="!paymentGuan" class="gy-button-normal" @click="handleCloseReceivables()">取消</button>
                <button style="margin-right: 6px;" v-if="paymentGuan" class="gy-button-normal" @click="handleCloseReceivables()">关闭</button>
                <button v-if="isSubmit" class="gy-button-extra" @click="createReceiptsSingle()">提交</button>
            </div>
        </el-dialog>
        <!--新建付款-->
        <el-dialog width="1200px" class="order-dialog"
                   :before-close="handleClosePayment"
                   :close-on-click-modal = "false"
                   :visible.sync="orderData.dialogVisible">
            <div class="order-apply">
                <div class="title">新建付款</div>
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft">产品名称</span>
                <span class="left-align">{{orderIds.prodName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>申请日期</span>
                <div class="searchDate">
                    <div class="d input-date">
                        <el-date-picker
                                v-model="creatPaymentForm.appalyPaymentTime"
                                type="date"
                                :disabled="isShowDs"
                                value-format="timestamp"
                                placeholder="申请日期"
                        >
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>付款单位</span>
                <span class="left-align">{{upstreamInfo.buyerCompanyName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>计划付款日期</span>
                <div class="searchDate">
                    <div class="d input-date">
                        <el-date-picker
                                v-model="creatPaymentForm.planPayTime"
                                type="date"
                                :disabled="isShowDs"
                                value-format="timestamp"
                                placeholder="计划付款日期"
                        >
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>收款单位</span>
                <span class="left-align">{{upstreamInfo.sellerCompanyName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>收款开户行</span>
                <el-select class="input-date" v-model="creatPaymentForm.sellerDepositBank" :disabled="isShowDs" placeholder="请选择收款银行账户" @change="changeBlank">
                  <el-option
                    v-for="item in newBank"
                    :key="item.bankAccId"
                    :label="item.depositBankName"
                    :value="item.bankAccId">
                  </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l spanLeft">合同金额(元)</span>
                <span class="left-align red" v-if="paymentAmount.isFormulaPrice">公式计价</span>
                <span class="left-align" v-else>{{orderIds.buyTotal | numToCash}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>收款银行账号</span>
                <input type="text" v-model="creatPaymentForm.sellerAccount" :disabled="isShowDs" readonly>
            </div>
            <div class="gy-form-group" v-if="paymentAmount.isFormulaPrice">
                <span class="l spanLeft">合同数量(吨)</span>
                <span class="left-align">{{upstreamInfo.skuQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>付款方式</span>
                <input type="radio" v-model="creatPaymentForm.tradeMode" :disabled="isShowDs" value="22">银行电汇
                <input type="radio" v-model="creatPaymentForm.tradeMode" :disabled="isShowDs" value="26">承兑汇票
            </div>
            <!-- 保证金的话 没有申请付款数量和暂定价. 申请金额不能输入 只能展示 -->
            <div class="gy-form-group" v-if="paymentAmount.isFormulaPrice && payMethodAmount == 1">
                <span class="l"><i>*</i>申请付款数量(吨)</span>
                <input class="gy-input" v-model="applyQuantities" :disabled="isShowDs" type="number" min="0" placeholder="请输入申请付款数量">
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>用途</span>
                <div style="display: inline-block">
                    <input type="radio" v-model="payMethodAmount" value="1" name="ttt"
                           :disabled="paymentAmount.goodPaymentStatus === 2 || isShowDs">货款
                </div>
                <div style="display: inline-block"
                     v-if="upstreamInfo.depositAmount !== null || upstreamInfo.depositAmount !== ''">
                    <input type="radio" v-model="payMethodAmount" value="2" name="ttt"
                           :disabled="paymentAmount.depositStatus === 2 || isShowDs">保证金
                </div>
                <div style="display: inline-block"
                     v-if="upstreamInfo.depositAmount !== null || upstreamInfo.depositAmount !== ''">
                    <input type="radio" v-model="payMethodAmount" value="5" name="ttt"
                           :disabled="paymentAmount.appendDepositStatus === 2 || isShowDs">追加保证金
                </div>
            </div>
            <div class="gy-form-group cl" v-if="paymentAmount.isFormulaPrice && payMethodAmount == 1">
                <span class="l spanLeft">暂定价(元/吨)</span>
                <input class="gy-input" v-model="tempPrice" :readonly="upstreamInfo.skuPriceType == 22" :disabled="isShowDs" type="number" placeholder="请输入暂定价">
            </div>
            <div class="gy-form-group" v-if="permiseCreate === 2">
                <span class="l">已提交金额(元)</span>
                <span>{{paymentAmount.submitedAmount | numToCash}}</span>
            </div>
            <div class="gy-form-group" style="float: right; height: 90px;" :class="{'cl': permiseCreate === 2}">
                <span class="l"><i>*</i>付款说明</span>
                <input type="radio" v-model="creatPaymentForm.payDesc" :disabled="isShowDs" value="1">本笔资金支出为正常交割，我司需垫资 <br>
                <input type="radio" v-model="creatPaymentForm.payDesc" :disabled="isShowDs" value="2">本笔资金支出需先收到下家款项，我司无需垫资 <br>
                <input type="radio" v-model="creatPaymentForm.payDesc" :disabled="isShowDs" value="3">分批付款，以付款明细表为准
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>申请金额(元)</span>
                <span v-if="payMethodAmount === '2'">{{paymentAmount.payTotal}}</span>
                <input v-else type="text" :aria-disabled="paymentAmount.depositStatus === 1" v-model="paymentAmount.payTotal"
                :disabled="isShowDs" placeholder="请输入申请金额">
            </div>
            <div class="gy-form-group" style="height: auto">
                <span class="l spanLeft">备注</span>
                <textarea cols="40" rows="4" style="width:406px" v-model="remarks" :disabled="isShowDs"></textarea>
            </div>
            <div class="gy-form-group" :class="{'cl': permiseCreate === 2}" v-if="creatPaymentForm.payDesc === '3' || creatPaymentForm.payDesc === 3">
                <span class="l"><i>*</i>审批类型</span>
                <input type="radio" v-model="creatPaymentForm.approveType" value="1" :disabled="isShowDs">一次审批
                <input type="radio" v-model="creatPaymentForm.approveType" value="2" :disabled="isShowDs">批次审批
            </div>
            <div style="clear: both"></div>
            <p class="wxtip" v-if="permiseCreate === 3"><span class="l">温馨提示：</span>付款审批中, 请在审批完成后再提交付款。</p>
            <p class="wxtip" v-if="permiseCreate === 4"><span class="l">温馨提示：</span>已提交付款, 请等待财务付款。</p>
            <!-- 多次提交 -->
            <table class="gy-table" v-if="permiseCreate === 2">
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
            <div v-if="!isSubmit2">
                <operation-process :elStepList="stepArr2"></operation-process>
            </div>
            <div style="margin-top: 50px;text-align: right;padding-bottom: 30px;padding-right: 30px;">
                <button style="margin-right: 6px;" v-if="!paymentRecelice" class="gy-button-normal" @click="orderData.dialogVisible = false">取消</button>
                <button style="margin-right: 6px;" v-if="paymentRecelice" class="gy-button-normal" @click="orderData.dialogVisible = false">关闭</button>
                <!-- 创建付款申请单 -->
                <button v-if="isSubmit2 && permiseCreate === 1" class="gy-button-extra" @click="billOfPayment()">提交</button>
                <!-- 提交分批付款 -->
                <button class="gy-button-extra" @click="addFkdSubmit" v-if="isaddFkdSubmit && permiseCreate === 2">提交</button>
                <button class="gy-button-extra gray" v-if="permiseCreate === 3 || permiseCreate === 4">提交</button>
            </div>
        </el-dialog>
        <!-- 申请确认 -->
        <el-dialog
            title="申请确认"
            class="applyConfirmation-wrap"
            :close-on-click-modal="false"
            :visible.sync="applyConfirmation"
            width="30%">
            <p class="title">申请的付款数量已超出合同约定，确认提交吗？</p>
            <p>合同数量：{{upstreamInfo.skuQuantity | numToQuantity}}吨</p>
            <p>已申请数量：{{(upstreamInfo.skuQuantity - paymentAmount.leftPayQuantities) | numToQuantity}}吨</p>
            <p>本次申请数量：{{applyQuantities | numToQuantity}}吨</p>
            <p>暂定价：{{tempPrice | numToCash(true)}}元</p>
            <p>申请付款金额：<span style="color: red;">{{paymentAmount.payTotal | numToCash}}</span>元</p>
            <div style="margin-top: 10px;text-align: right;">
                <button style="margin-right: 6px;" class="gy-button-normal" @click="applyConfirmation = false, this.orderData.dialogVisible = true">取消</button>
                <button class="gy-button-extra" @click="commonPost(isPost=true)">提交</button>
            </div>
        </el-dialog>
        <bank-acc ref="bankAcc" @onSaveAccInfo="popupPaySubmission"></bank-acc>
    </div>
</template>

<script>
import gyStep from '@/components/step1';
import bankAcc from './../../components/bankAcc';
import operationProcess from '@/components/stepElement';
import gyFileUpload from './../../components/gyFileUpload';

export default {
    components: {bankAcc, gyStep, operationProcess, gyFileUpload},
    name: 'paymentAssembly',
    props: {
        orderData: Object,
        orderIds: Object,
        upstreamInfo: Object, // 上游-采购
        downstreamInfo: Object // 下游-销售
    },
    data () {
        return {
            applyQuantities: null, // 申请付款数量
            tempPrice: null, // 暂定价手动修改
            applyConfirmation: false, // 申请确认弹出框
            isPost: false,
            depositType: null, // '保证金类型:1:按保证金比例 2:按金额';
            skuPriceExpression: null, // '单价表达式';
            // ------------------------
            isShowDs: false,
            paidAmount: 0,
            isaddFkdSubmit: true,
            permiseCreate: null, // 1: 允许创建新的付款单  2: 允许提交付款请求给财务 3: (提交付款页面:审批中)不允许提交付款请求给财务 4: (提交付款页面:财务付款中/未付完)不允许再次提交付款请求给财务
            paymentAmountRadio: 1,
            id: null,
            purchaseOrderId: null,
            saleOrderId: null,
            paymentNwes: [], // 新增付款
            newReceiptsList: {
                collectionType: null, // 收款类型
                collectionAmount: null,
                erpBuyerPaymentFileModelList: [],
                skuQuantity: null, // 合同数量
                applyQuantities: null, // 收款数量
                skuPrice: null, // 暂定价显示
                tempPrice: null // 暂定价手动修改
            }, // 新建收款单
            creatPaymentForm: {
                appalyPaymentTime: new Date(),
                planPayTime: new Date(),
                sellerAccount: null,
                sellerDepositBank: null,
                payMethod: null,
                sellerCorpName: null,
                payTotal: null,
                tradeMode: null,
                handlerUserName: null,
                payDesc: null,
                approveType: null,
                payInfoList: [
                    {payAmount: null, description: null}
                ]
                // applyQuantities: null,
                // tempPrice: null
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
            paymentAmount: {
                isFormulaPric: null,
                payTotal: null
            }, // 付款
            receliverAmount: {}, // 收款
            payMethodAmount: null,
            recMethodAmount: null,
            autosUpload: false,
            remarks: null,
            payBillInfo4Multi: {} // 一次审批多次付款时才有用
        };
    },
    created () {
    },
    mounted () {
        this.id = this.orderIds.id;
    },
    methods: {
        // 初始化收款对话框数据
        initReceiptView (saleOrderId) {
            this.isSubmit = true;
            this.receliverAmount.payTotal = null;
            this.getreceliveApplicationAmount(saleOrderId);
        },
        // 初始化付款对话框数据
        initPaymentView (purchaseOrderId, sellerCompanyId) {
            this.isSubmit2 = true;
            this.remarks = null;
            this.paymentAmount.payTotal = null;
            this.getpaymentApplicationAmount(purchaseOrderId);
            this.newPaymentBankAssembly(sellerCompanyId);
        },
        // 关闭弹出框-收款
        handleCloseReceivables () {
            this.orderData.newReceiptsdialog = false;
            this.$emit('ivoiceList');
            if (this.newReceiptsList.erpBuyerPaymentFileModelList.length !== 0 && this.$refs.upload) {
                this.$refs.upload.clearFiles();
            }
            this.newReceiptsList.erpBuyerPaymentFileModelList = [];
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
        newPaymentBankAssembly (sellerCompanyId) {
            this.$http.post(this.$api.payment.newBank, {'companyId': sellerCompanyId}).then((res) => {
                if (res.data.code === 0) {
                    this.newBank = res.data.data;
                }
            });
        },
        // 添加开户行
        changeBlank (selAccInfo) {
            if (selAccInfo === 0) {
                this.$refs.bankAcc.addBank = true;
                this.$refs.bankAcc.creatBank.companyId = this.upstreamInfo.sellerCompanyId; // 这里是上游公司ID
                this.$refs.bankAcc.creatBank.accountName = this.upstreamInfo.sellerCompanyName;
            }
            for (let i = 0; i < this.newBank.length; i++) {
                if (selAccInfo === this.newBank[i].bankAccId) {
                    this.creatPaymentForm.sellerAccount = this.newBank[i].bankAccount;
                    this.creatPaymentForm.sellerDepositBankId = this.newBank[i].bankAccId;
                    this.creatPaymentForm.sellerDepositBank = this.newBank[i].depositBankName;
                }
            }
        },
        // 弹出框选择单条-提交
        popupPaySubmission (accInfo) {
            if (accInfo == null || accInfo === undefined) {
                this.creatPaymentForm.sellerAccount = null;
                this.creatPaymentForm.sellerDepositBankId = null;
                this.creatPaymentForm.sellerDepositBank = null;
                return;
            }
            this.creatPaymentForm.sellerDepositBank = accInfo.depositBank;
            this.creatPaymentForm.sellerDepositBankId = accInfo.id;
            this.creatPaymentForm.sellerAccount = accInfo.companyAccount;

            this.newPaymentBankAssembly(this.orderIds.sellerCompanyId);
        },
        // 收款时,下游付款凭证-回调
        onCallbackSaleFileUpload (fileList) {
            this.newReceiptsList.erpBuyerPaymentFileModelList = [];
            fileList.forEach((e) => {
                this.newReceiptsList.erpBuyerPaymentFileModelList.push({fileUrl: e.fileUrl});
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
            if (!this.receliverAmount.isFormulaPrice) {
                let needCollAmountVal = Number(this.$tools.formatNumber(this.receliverAmount.needCollectionAmount, 2));
                if (needCollAmountVal === 0) {
                    this.$message({
                        message: '已无待收金额，无需提交',
                        type: 'error'
                    });
                    return;
                }
                if (needCollAmountVal < 0) {
                    this.$message({
                        message: '数据错误，待收金额为负数',
                        type: 'error'
                    });
                    return;
                }
            }
            if (this.recMethodAmount === null) {
                this.$message({
                    message: '请选择收款类型',
                    type: 'error'
                });
                return;
            }
            if (this.receliverAmount.isFormulaPrice && Number(this.recMethodAmount) === 1) {
                // 只有公式计价,且在收货款时才验证
                if (Number(this.receliverAmount.leftReceiptQuantity) <= 0) {
                    this.$message.error('申请收款数量已超出合同数量，不可再收款');
                    return;
                }
                if (!this.newReceiptsList.applyQuantities || this.newReceiptsList.applyQuantities <= 0) {
                    this.$message({
                        message: '收款数量不能为空且不能小于等于0',
                        type: 'error'
                    });
                    return;
                }
                if (Number(this.newReceiptsList.applyQuantities) > Number(this.receliverAmount.leftReceiptQuantity)) {
                    this.$message({
                        message: '申请收款数量不能大于剩余可收款总数量',
                        type: 'error'
                    });
                    return;
                }
                if (this.newReceiptsList.tempPrice) {
                    if (this.newReceiptsList.tempPrice <= 0) {
                        this.$message({
                            message: '暂定价不能小于等于0',
                            type: 'error'
                        });
                        return;
                    }
                }
            }
            if (this.receliverAmount.payTotal === '' || this.receliverAmount.payTotal === undefined) {
                this.$message({
                    message: '请输入本次收款金额',
                    type: 'error'
                });
                return;
            }
            if (this.receliverAmount.payTotal <= 0) {
                this.$message({
                    message: '请输入大于零的收款金额',
                    type: 'error'
                });
                return;
            }

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

                    this.$emit('ivoiceList');
                    // 禁用文件上传
                    if (this.$refs.sFileUpload) {
                        this.$refs.sFileUpload.endUpload();
                    }
                    // 收款
                    let query = {
                        targetId: res.data.data,
                        targetType: 5
                    };
                    this.isSubmit = false;
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
            if (this.creatPaymentForm.planPayTime === null) {
                this.$message({
                    message: '请选择计划付款日期',
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
            if (this.creatPaymentForm.tradeMode === null) {
                this.$message({
                    message: '请选择付款方式',
                    type: 'error'
                });
                return;
            }
            if (this.paymentAmount.isFormulaPrice && Number(this.payMethodAmount) === 1) {
                // 只有公式计价,且在付货款时才验证
                if (Number(this.paymentAmount.leftPayQuantities) <= 0) {
                    this.$message.error('申请付款数量已超出合同数量，不可再申请付款');
                    return;
                }
                if (!this.applyQuantities || this.applyQuantities <= 0) {
                    this.$message({
                        message: '申请付款数量不能为空且不能小于等于0',
                        type: 'error'
                    });
                    return;
                }
                if (this.tempPrice) {
                    if (this.tempPrice <= 0) {
                        this.$message({
                            message: '暂定价不能小于等于0',
                            type: 'error'
                        });
                        return;
                    }
                }
            }
            if (this.payMethodAmount === null || this.payMethodAmount === 0) {
                this.$message({
                    message: '请选择用途',
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
            if (this.paymentAmount.payTotal === null || this.paymentAmount.payTotal === '' || this.paymentAmount.payTotal === undefined) {
                this.$message({
                    message: '请输入申请金额',
                    type: 'error'
                });
                return;
            }
            if (this.paymentAmount.payTotal <= 0) {
                this.$message({
                    message: '请输入大于零申请金额',
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
            if (Number(this.creatPaymentForm.payDesc) === 3 && this.creatPaymentForm.approveType == null) {
                this.$message({
                    message: '分批付款时请选择审批类型',
                    type: 'error'
                });
                return;
            }
            if (!this.paymentAmount.isFormulaPrice && (this.payMethodAmount === '1' || this.payMethodAmount === 1)) {
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
            }
            if (this.paymentAmount.isFormulaPrice) {
                // 公式计价时，付款数量超出合同数量要提示
                if (this.applyQuantities > Number(this.paymentAmount.leftPayQuantities)) {
                    this.orderData.dialogVisible = false;
                    this.applyConfirmation = true;
                    return;
                }
            }
            this.commonPost();
        },
        commonPost () {
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
            if (this.isPost) {
                this.applyConfirmation = false;
            }
            this.creatPaymentForm['applyQuantities'] = this.applyQuantities;
            this.creatPaymentForm['tempPrice'] = this.tempPrice;

            this.$http.post(this.$api.order.newPayment, this.creatPaymentForm).then((res) => {
                if (res.data.code === 0) {
                    // this.remarks = null;
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
        // 提交付款请求给财务
        addFkdSubmit () {
            if (this.creatPaymentForm.payInfoList.length === 0) {
                this.$message({
                    message: '请填写付款金额',
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
            Number(this.paymentAmount.submitedAmount);
            !this.paymentAmount.submitedAmount && (this.paymentAmount.submitedAmount = 0);
            if ((this.paymentAmount.submitedAmount + sumInfoList) > orderIdsTotal) {
                this.$message({
                    message: '分批付款总额不能大于申请金额',
                    type: 'error'
                });
                return;
            }
            let params = {
                'contEssId': this.orderIds.id,
                'purchaseOrderId': this.orderIds.purchaseOrderId,
                'paymentId': this.payBillInfo4Multi.id,
                'payInfoList': this.creatPaymentForm.payInfoList
            };
            this.$http.post(this.$api.payment.saveErpPaymentInfo, params).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    this.paymentRecelice = true;
                    this.isSubmit2 = false;
                    this.isaddFkdSubmit = false;
                    // 付款
                    let query = {
                        targetId: res.data.data.multiPayId,
                        targetType: 27
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
        // 付款申请金额---
        getpaymentApplicationAmount (val) {
            let that = this;
            this.creatPaymentForm.sellerDepositBank = null; // 收款开户行
            this.creatPaymentForm.sellerAccount = null; // 收款银行账号
            this.payMethodAmount = null; // 用途
            this.creatPaymentForm.tradeMode = null; // 付款方式
            this.paymentAmount.payTotal = null; // 申请金额
            this.creatPaymentForm.payDesc = null; // 付款说明
            this.remarks = null; // 备注
            this.isSubmit2 = true;
            this.paymentRecelice = false;
            this.$http.get(this.$api.payment.paymentApplicationAmount + '/' + val).then((res) => {
                if (res.data.code === 0) {
                    that.paymentAmount = res.data.data;
                    that.paidAmount = 0;
                    if (that.paymentAmount.paymentModelDtos && that.paymentAmount.paymentModelDtos.list && that.paymentAmount.paymentModelDtos.list.length > 0) {
                        let data = that.paymentAmount.paymentModelDtos.list[0];
                        that.creatPaymentForm.sellerDepositBank = data.sellerDepositBank;
                        that.paidAmount = data.paidAmount;
                        that.creatPaymentForm.sellerAccount = data.sellerAccount;
                        that.creatPaymentForm.tradeMode = data.tradeMode;
                        that.creatPaymentForm.payDesc = data.payDesc;
                        that.creatPaymentForm.approveType = data.approveType;
                        that.payMethodAmount = data.payMethod;
                    }
                    // 控制"货款/保证金/追加保证金"3个radio框的显示(选中或不可用等)
                    if (that.paymentAmount.depositStatus === 1) {
                        that.payMethodAmount = '2';
                    } else if (that.paymentAmount.appendDepositStatus === 1) {
                        that.payMethodAmount = '5';
                    } else if (that.paymentAmount.goodPaymentStatus === 1) {
                        that.payMethodAmount = '1';
                    }
                    that.applyQuantities = that.paymentAmount.leftPayQuantities; // 剩余应付数量
                    that.tempPrice = that.paymentAmount.formulaTempPrice;
                    if (that.paymentAmount.leftAmount === 0) {
                        that.paymentAmount.payTotal = 0;
                    }
                    if (that.paymentAmount.leftAmount) {
                        that.paymentAmount.payTotal = Number(that.paymentAmount.leftAmount); // 申请金额由后台计算传回，前端不做特殊处理
                    }
                    that.permiseCreate = that.paymentAmount.permiseCreate;

                    if (that.permiseCreate === 2) {
                        // 可以提交付款
                        that.isShowDs = true;
                        let payDtos = that.paymentAmount.paymentModelDtos;
                        if (payDtos) {
                            let payList = payDtos.list;
                            if (payList && payList.length > 0) {
                                that.payBillInfo4Multi = payList[0];
                            }
                        }
                        // 每次开始提交付款时初始值为空
                        that.isaddFkdSubmit = true;
                        that.creatPaymentForm.payInfoList = [{payAmount: null, description: null}];
                    } else if (that.permiseCreate === 1) {
                        that.isShowDs = false;
                        // 这时画面没有初始值
                        that.creatPaymentForm.sellerAccount = null;
                        that.creatPaymentForm.sellerDepositBank = null;
                        that.creatPaymentForm.payDesc = null;
                        that.creatPaymentForm.tradeMode = null;
                        that.creatPaymentForm.approveType = null;
                    } else if (that.permiseCreate === 3 || that.permiseCreate === 4) {
                        that.isShowDs = true;
                    }
                } else {
                    that.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        // 收款
        getreceliveApplicationAmount (val) {
            let that = this;
            this.recMethodAmount = null; // 收款类型
            this.receliverAmount.payTotal = null; // 本次收款金额
            this.isSubmit = true;
            this.paymentGuan = false;
            if (this.$refs.sFileUpload) {
                this.$refs.sFileUpload.init();
            }
            this.$http.get(this.$api.invoice.createCollectView + '/' + val).then((res) => {
                if (res.data.code === 0) {
                    that.receliverAmount = res.data.data;
                    // 控制"货款/保证金/追加保证金"3个radio框的显示(选中或不可用等)
                    if (that.receliverAmount.depositStatus === 1) {
                        that.recMethodAmount = '2';
                    } else if (that.receliverAmount.goodPaymentStatus === 1) {
                        that.recMethodAmount = '1';
                    } else if (that.receliverAmount.appendDepositStatus === 1) {
                        that.recMethodAmount = '5';
                    }

                    that.newReceiptsList.applyQuantities = that.receliverAmount.leftReceiptQuantity;
                    that.newReceiptsList.tempPrice = that.receliverAmount.formulaTempPrice;
                    if (that.receliverAmount.needCollectionAmount) {
                        that.receliverAmount.payTotal = Number(that.receliverAmount.needCollectionAmount); // 申请金额由后台计算传回，前端不做特殊处理
                    }
                } else {
                    that.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        }
    },
    watch: {
        // 创建付款单时切换付款类型
        'payMethodAmount' (rule, value) {
            if (rule === '1' && this.paymentAmount.leftAmount) {
                this.paymentAmount.payTotal = this.$tools.toFixedFn(Number(this.paymentAmount.leftAmount), 2);
            }
            if (rule === '5') {
                this.paymentAmount.payTotal = this.$tools.toFixedFn(this.paymentAmount.appendDepositAmount, 2);
            }
        },
        // 创建付款单时，付款金额随付款数量和暂定价而改变
        'applyQuantities' (newValue, oldValue) {
            if (newValue != null && newValue !== undefined && this.permiseCreate === 1) {
                if (this.paymentAmount.isFormulaPrice && this.payMethodAmount === '1') {
                    // 是公式计价-付货款的场景, 注意，这里减去的是保证金，不是所有已付金额
                    if (this.tempPrice) {
                        this.paymentAmount.payTotal = this.$tools.toFixedFn(Number(newValue) * Number(this.tempPrice) - Number(this.paymentAmount.paymentValidDeposit), 2);
                    }
                }
            }
        },
        'tempPrice' (newValue, oldValue) {
            if (newValue && Number(newValue) !== 0) {
                if (this.paymentAmount.isFormulaPrice && this.payMethodAmount === '1' && this.permiseCreate === 1) {
                    // 是公式计价-付货款的场景
                    if (this.applyQuantities) {
                        this.paymentAmount.payTotal = this.$tools.toFixedFn(Number(this.applyQuantities) * Number(newValue) - Number(this.paymentAmount.paymentValidDeposit), 2);
                    }
                }
            }
        },
        'creatPaymentForm.payDesc' (newv, oldv) {
            // 选择分批付款时，设置审批类型的缺省值
            this.creatPaymentForm.approveType = Number(newv) === 3 ? 1 : null;
        },
        // 创建收款单时，收款金额随收款数量和暂定价而改变
        'newReceiptsList.applyQuantities' (newValue, oldValue) {
            if (newValue != null && newValue !== undefined) {
                if (this.receliverAmount.isFormulaPrice && this.recMethodAmount === '1') {
                    // 是公式计价-收货款的场景
                    if (this.newReceiptsList.tempPrice) {
                        this.receliverAmount.payTotal = this.$tools.toFixedFn(Number(this.newReceiptsList.tempPrice) * Number(newValue) - Number(this.receliverAmount.collectionValidDeposit), 2);
                    }
                }
            }
        },
        'newReceiptsList.tempPrice' (newValue, oldValue) {
            if (newValue && Number(newValue) !== 0) {
                if (this.receliverAmount.isFormulaPrice && this.recMethodAmount === '1') {
                    // 是公式计价-收货款的场景
                    if (this.newReceiptsList.applyQuantities) {
                        this.receliverAmount.payTotal = this.$tools.toFixedFn(Number(this.newReceiptsList.applyQuantities) * Number(newValue) - Number(this.receliverAmount.collectionValidDeposit), 2);
                    }
                }
            }
        },
        // 创建收款单时切换收款类型
        recMethodAmount (newValue, oldValue) {
            if (newValue === '1' && this.receliverAmount.needCollectionAmount) {
                this.receliverAmount.payTotal = this.$tools.toFixedFn(this.receliverAmount.needCollectionAmount, 2);
            }
            if (newValue === '5') {
                this.receliverAmount.payTotal = this.$tools.toFixedFn(this.receliverAmount.appendDepositAmount, 2);
            }
        },
        remarks (newValue, oldValue) {
            if (newValue && newValue.length > 2500) {
                this.$message({
                    message: '付款备注最多可填写2500字',
                    type: 'warning'
                });
                return;
            }
            this.remarks && (this.creatPaymentForm.remarks = this.remarks.substr(0, 2500));
        }
    }
};
</script>

<style scoped lang="scss">
    .paymentDetails {
        .mt {
            margin-top: 50px;
        }
        .wxtip {
            padding-left: 36px;
            margin-bottom: 20px;
            .l {
                color: $color-highlight;
            }
        }
        .gray {
            color: $color-minor;
            background-color: $color-white;
            border-color: $color-minor;
            border: 1px solid $color-minor;
        }
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
    .applyConfirmation-wrap {
        .title {
            font-size: 17px;
            margin-bottom: 5px;
        }
    }
</style>
<style lang="scss">
    .paymentDetails {
        .el-dialog__headerbtn {
            top: 9px;
        }
        .input-date {
            .el-input__inner {
                font-size: 14px;
            }
        }
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
                    margin-top: -35px;
                }
            }
            .gy-form-group{
                padding: 10px 40px 10px 154px;
            }
            .gy-form-group .l{
                width: 145px;
                i{
                  color: red;
                }
            }
            .red {
                color: red;
            }
            .spanLeft{
                margin-left: 6px;
            }
            .left-align {
                padding-left: 10px;
            }
        }
    }
</style>
