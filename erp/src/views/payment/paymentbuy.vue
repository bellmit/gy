<!-- 付款审批 -->
<template>
    <div class="paydetail-wrapper my-payment">
        <div class="essential-information">
            <p class="paydetail-title">基本信息</p>
            <pay-cont :list="list"></pay-cont>
        </div>
        <div class="receivables-information">
            <p class="paydetail-title">付款信息</p>
            <div class="essential-wrapper pay-detail essential-row-float">
                    <div class="essential-item">
                        <div class="essential-title">申请金额(元)</div>
                        <div class="essential-text">{{sales.payTotal|numToCash}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">申请日期</div>
                        <div class="essential-text">{{sales.createdDate | date}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">收款单位</div>
                        <div class="essential-text">{{sales.sellerCorpName}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">合同金额</div>
                        <div class="essential-text">{{sales.tracontractAmount|numToCash}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">开户行</div>
                        <div class="essential-text">{{sales.sellerDepositBank}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">付款用途</div>
                        <div class="essential-text">{{sales.payMethodStr}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">银行账号</div>
                        <div class="essential-text">{{sales.sellerAccount}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">经办人</div>
                        <div class="essential-text">{{sales.createUserName}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">付款方式</div>
                        <div class="essential-text">{{sales.tradeModeStr}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">付款单编号</div>
                        <div class="essential-text">{{sales.payNumber}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">付款说明</div>
                        <div class="essential-text">{{sales.payDescStr}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">备注</div>
                        <div class="essential-text">{{sales.remarks}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">状态</div>
                        <div class="essential-text">{{sales.approveStatusStr}}</div>
                    </div>
                <!-- 付款银行及账号 -->
                    <div class="essential-item" v-if="isUpdated">
                        <div class="essential-title">付款银行</div>
                        <div class="essential-text">{{sales.buyerDepositBank}}</div>
                    </div>
                    <div class="essential-item" v-if="isUpdate">
                        <div class="essential-title"><span class="isMust">*</span>付款银行</div>
                        <el-select v-model="payingBankInfo.buyerDepositBank" placeholder="请选择" @change="changeBlank">
                            <el-option
                                    v-for="item in newBank"
                                    :key="item.bankAccId"
                                    :label="item.depositBankName"
                                    :value="item.bankAccId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="essential-item" v-if="isUpdated">
                        <div class="essential-title">出账日期</div>
                        <div class="essential-text">{{sales.payTime | date}}</div>
                    </div>
                    <div class="essential-item" v-if="isUpdate">
                        <div class="essential-title"><span class="isMust">*</span>付款凭证</div>
                        <div class="essential-text">
                            <template v-for="(item, index) in  ContImg">
                                <div class="contImgItem" :key="item">
                                    <img class="upload-img" :src="item" width="52" height="52" alt="">
                                    <div>
                                        <i @click="deleteImg(index)" class="el-icon-delete"></i>
                                    </div>
                                </div>
                            </template>
                            <el-upload class="avatar-uploader"
                                       action=""
                                       :http-request="upload"
                                       :show-file-list="false"
                                       :before-upload="beforeAvatarUpload">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="essential-item" v-if="isUpdate" style="height: 50px">
                      <div class="essential-title">出账日期</div>
                      <el-date-picker
                        v-model="appalyPaymentTime"
                        type="date"
                        value-format="timestamp"
                        placeholder="日期">
                      </el-date-picker>
                    </div>
                    <div class="essential-item" v-if="isUpdated">
                        <div class="essential-title"><i class="i" style="color: red">* </i>付款凭证</div>
                        <div class="essential-text">
                            <span v-if="sales.paymentVoucher && sales.paymentVoucher.length !== 0" @click="showImg('', 1)"><i class="iconfont icon-photo"></i></span>
                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                        </div>
                    </div>
            </div>
            <div class="essential-information" v-if="sales.payDesc === 3">
                <p class="paydetail-title">分批付款明细</p>
                <div class="essential-wrapper paybuy-fpfkmx">
                    <table class="gy-table">
                        <thead>
                        <tr>
                            <th style="width: 80px">序号</th>
                            <th style="width: 120px">付款金额(元)</th>
                            <th style="width: 200px">备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in sales.payInfoList" :key="index">
                            <td>{{index+1}}</td>
                            <td>{{item.payAmount | numToCash}}</td>
                            <td>{{item.description}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="essential-information" v-if="isPass">
            <p class="paydetail-title">审批备注</p>
            <div class="essential-wrapper">
                <div class="essential-row">
                    <div class="essential-item">
                        <div class="essential-text">
              <textarea name="" class="gy-textarea" v-model="remarks" placeholder="请填写审批备注" id="" cols="30"
                        rows="10"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
            <template v-if="isPass">
                <button class="gy-button-normal" @click="reject">驳回</button>
                <button class="gy-button-extra confirmations" @click="approveSub('1')">通过</button>
            </template>
            <button class="gy-button-extra confirmations" v-if="isUpdate" @click="submit">保存</button>
        </div>
        <div class="essential-information">
            <p class="paydetail-title">操作流程</p>
            <div class="essential-wrapper">
                <table class="gy-table box">
                    <thead>
                    <tr>
                        <th style="width: 80px">序号</th>
                        <th style="width: 120px">操作人</th>
                        <th style="width: 280px">操作时间</th>
                        <th style="width: 200px">操作结果</th>
                        <th style="width: 200px">备注</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in history" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{item.username}}</td>
                        <td>{{item.createdDate | date(item.createdDate)}}</td>
                        <td>{{$constant.approveType[item.resultCode]}}</td>
                        <td>{{item.msg}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <bank-acc ref="bankAcc" @onSaveAccInfo="popupPaySubmission"></bank-acc>
        <dialog-img v-if="dialogVisible" @closedialogvisible="closedialogvisible" :dialogVisible="dialogVisible" :dialogImg="fileList"></dialog-img>
    </div>
</template>

<script>
import payCont from './pay-cont';
import dialogImg from './../components/dialogImg';
import bankAcc from './../components/bankAcc';
export default {
    components: {payCont, dialogImg, bankAcc},
    data () {
        return {
            list: {
                id: null, // 合同要素ID
                contEssenceStatus: null, // 合同要素状态
                bizType: null, // 业务类型
                contractType: null, // 单边交易
                createdName: null, // 创建人
                businessManagerId: null, // 业务操作人ID
                businessManagerName: null, // 业务操作人名称
                orderStatus: null, // 订单状态
                createdDate: null, // 创建时间（格式：yyyy-MM-dd HH:mm:ss）
                planBuyDlvyDat: null, // 交割日期(买家)
                planSaleDlvyDate: null, // 交割日期(卖家)
                buyerInfo: {
                    orderSn: null
                },
                sellerInfo: {
                    orderSn: null
                }
            },
            sales: {
                sellerCorpName: null, // 上游公司名称(和收款单位一样)
                tracontractAmount: null, // 合同金额
                payTotal: null, // 申请金额
                payMethodStr: null, // 用途 1：货款 2：保证金 5:追加保证金
                createdDate: null, // 申请日期
                payTime: null, // 出账日期
                sellerDepositBank: null, // 开户行
                sellerAccount: null, // 银行账户
                tradeMode: null, // 付款方式 1: 在线支付 线下支付目前有以下子分类： 21:银行转账、22:银行直付、23:银行承兑汇票、24:商业承兑汇票
                tradeModeStr: null, // 付款方式 1: 在线支付 线下支付目前有以下子分类： 21:银行转账、22:银行直付、23:银行承兑汇票、24:商业承兑汇票
                shouldPaymentTotal: null, // 应付款金额
                hadPaymentTotal: null, // 已付款金额
                needPaymentTotal: null, // 待付款金额
                createUserName: null, // 经办人
                approveStatusStr: null, // 状态 0:未审批 1:已审批通过 2:审批驳回 3：审批中 这里缺省值设为'1'是为了确保兼容现有数据
                approveStatus: null, // 状态
                paymentVoucher: null, // 付款凭证
                remarks: null, // 备注
                payDescStr: null, // 付款说明 1:本地资金支出为正常支出,我司需垫资 2:本地资金支出需先收到下家款项,我司无需垫资 3:分批付款,以付款明细表为准
                payNumber: null,
                uploadFileStatus: null
            },
            remarks: null, // 备注
            history: [],
            ContImg: [], // 付款凭证
            isPass: false, // 是否审核通过
            isUpdate: false, // 是否上传付款凭证
            isUpdated: false, // 付款凭证是否已上传
            newBank: [], // 新增银行账号
            payingBankInfo: {
                buyerDepositBank: null
            },
            dialogVisible: false,
            fileList: [],
            appalyPaymentTime: new Date().getTime()
        };
    },
    created () {
        this.getdetailOrder();
        this.getdetail();
        this.approve1History();
    },
    methods: {
        // 查询付款银行
        newPaymentBankAssembly () {
            this.$http.post(this.$api.payment.newBank, {'companyId': this.list.targetCorpId}).then((res) => {
                if (res.data.code === 0) {
                    this.newBank = res.data.data;
                }
            });
        },
        // 切换付款银行
        changeBlank (selAccInfo) {
            if (selAccInfo === 0) {
                this.$refs.bankAcc.addBank = true;
                this.$refs.bankAcc.creatBank.companyId = this.list.targetCorpId; // 这里是我方公司ID
                this.$refs.bankAcc.creatBank.accountName = this.list.targetCorpName;
            }
            for (let i = 0; i < this.newBank.length; i++) {
                if (selAccInfo === this.newBank[i].bankAccId) {
                    this.payingBankInfo.buyerBankAccount = this.newBank[i].bankAccount;
                    this.payingBankInfo.buyerDepositBankId = this.newBank[i].bankAccId;
                    this.payingBankInfo.buyerDepositBank = this.newBank[i].depositBankName;
                }
            }
        },
        // 新增银行-提交
        popupPaySubmission (accInfo) {
            if (accInfo == null || accInfo === undefined) {
                this.payingBankInfo.buyerBankAccount = null;
                this.payingBankInfo.buyerDepositBank = null;
                return;
            }
            this.payingBankInfo.buyerDepositBank = accInfo.depositBank;
            this.payingBankInfo.buyerDepositBankId = accInfo.id;
            this.payingBankInfo.buyerBankAccount = accInfo.companyAccount;
            this.$refs.bankAcc.addBank = false;
            this.newPaymentBankAssembly();
        },
        // 收款详情
        getdetail () {
            let that = this;
            let query = {
                purchaseOrderId: that.$route.query.purchaseOrderId, // 采购订单ID
                paymentId: that.$route.query.payId // 付款单ID
            };
            this.$http.post(this.$api.payment.getDetail, query).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    that.sales = response.data.data.list[0];
                    that.isUpdated = that.sales.approveStatus === 1 && that.sales.uploadFileStatus === 1;
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 合同要素详情
        getdetailOrder () {
            let that = this;
            this.$http.get(this.$api.payment.getDetailOrder + this.$route.query.contEssId).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    that.list = response.data.data;
                    that.approveJurisdiction();
                    that.getVoucherJurisdiction();
                    that.newPaymentBankAssembly();
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 上传凭证权限
        getVoucherJurisdiction () {
            let that = this;
            this.$http.post(this.$api.apprProc.hasBizPermission, {targetType: 106}).then(function (response) {
                if (response.data.code === 0) {
                    if (that.sales.approveStatus === 1 && that.sales.uploadFileStatus === 0) {
                        that.isUpdate = true;
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 付款审批权限
        approveJurisdiction () {
            let that = this;
            let params = {
                targetId: that.$route.query.payId,
                targetType: 3
            };
            this.$http.post(this.$api.apprProc.hasApproveAuth, params).then(function (response) {
                if (response.data.code === 0) {
                    if (that.sales.approveStatus === 3) {
                        that.isPass = true;
                    }
                } else {
                    that.isPass = false;
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 审批
        approveSub (type) {
            let that = this;
            let params = {
                id: this.$route.query.payId, // 付款单ID
                contEssId: this.$route.query.contEssId,
                operaType: type, // 审批结果（1：同意 2：驳回）
                remarks: this.remarks// 审批备注
            };
            this.$http.post(this.$api.payment.buy, params).then(function (response) {
                if (response.data.code === 0) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                }
                that.$router.go(-1);
            }).catch((e) => {
                console.log(e);
            });
        },
        // 付款审批记录
        approve1History () {
            let that = this;
            let params = {
                targetId: this.$route.query.payId, // 付款单ID
                targetType: 3
            };
            this.$http.post(this.$api.contract.approve1History, params).then(function (res) {
                if (res.data.code === 0) {
                    that.history = res.data.data;
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        beforeAvatarUpload (file) {
            // if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
            //     this.$message({
            //         showClose: true,
            //         message: `文件扩展名错误`,
            //         type: 'error'
            //     });
            //     return false;
            // }
        },
        // 上传付款凭证
        upload (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.url || this.$api.upload.imgUpload, formData, headers)
                .then(res => {
                    if (res.data.code === 0) {
                        that.ContImg.push(res.data.data);
                    }
                });
        },
        // 保存付款凭证
        submit () {
            let that = this;
            if (this.ContImg.length === 0) {
                that.$message({
                    message: '请先上传付款凭证',
                    type: 'error'
                });
                return false;
            }
            if (!this.payingBankInfo.buyerDepositBank) {
                this.$message({
                    message: '请先选择付款银行',
                    type: 'error'
                });
                return false;
            }
            if (this.appalyPaymentTime === null) {
                this.$message({
                    message: '请选择申请日期',
                    type: 'error'
                });
                return false;
            }
            let params = {
                appalyPaymentTime: this.appalyPaymentTime, // 申请日期
                purchaseOrderId: this.$route.query.purchaseOrderId,
                contEssId: this.$route.query.contEssId,
                paymentId: this.$route.query.payId, // 付款ID
                paymentVoucher: '', // 付款凭证路径
                allowedFunctionsId: 36 // 审批ID
            };
            Object.keys(this.ContImg).forEach(e => {
                params.paymentVoucher += this.ContImg[e] + ',';
            });
            params.paymentVoucher = params.paymentVoucher.substr(0, params.paymentVoucher.length - 1);
            params.contEssId = this.$route.query.contEssId;
            params.buyerAccount = this.payingBankInfo.buyerAccount;
            params.buyerDepositBankId = this.payingBankInfo.buyerDepositBankId;
            params.buyerDepositBank = this.payingBankInfo.buyerDepositBank;
            this.$http.post(this.$api.payment.voucher, params)
                .then(res => {
                    if (res.data.code === 0) {
                        that.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    }
                    that.$router.go(-1);
                });
        },
        reject () {
            this.$confirm('确认驳回?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.approveSub(2);
            });
        },
        deleteImg (idx) {
            this.ContImg.splice(idx, 1);
        },
        showImg (idx, type) {
            this.dialogVisible = true;
            let arr = [];
            switch (type) {
            case 1:
                this.sales.paymentVoucher.split(',').forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.fileList = arr;
                break;
            case 3:
                this.list.sellerInfo.fileAttachList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.fileList = arr;
                break;
            case 4:
                this.list.sellerInfo.fileDocUrl.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.fileList = arr;
                break;
            case 5:
                this.list.buyerInfo.fileAttachList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.fileList = arr;
                break;
            case 6:
                this.list.buyerInfo.fileDocUrl.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.fileList = arr;
                break;
            case 7:
                this.list.sellerInfo.fileAttachCertifiedList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.fileList = arr;
                break;
            case 8:
                this.list.buyerInfo.fileAttachCertifiedList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.fileList = arr;
                break;
            default:
                this.fileList = [];
                break;
            }
        },
        closedialogvisible () {
            this.dialogVisible = false;
        }
    },
    provide () {
        return {
            showImg: this.showImg
        };
    }
};
</script>

<style lang="scss" scoped>
  .my-payment {
    overflow: hidden;
    margin-top: 20px;
    padding: 0 16px;
  }
  .paybuy-fpfkmx {
      .gy-table {
          width: 400px;
      }
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .essential-row-float .essential-item .essential-title {
    flex: 0 0 100px;
  }
  .isMust {
     left: -10px;
  }
</style>
<style lang="scss">
    .paydetail-wrapper {
        .el-upload {
            border: 1px solid #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .el-upload:hover {
            border-color: #409EFF;
        }
        .order-dialoged {
            .el-dialog__header {
                font-weight: bold;
                padding: 0;
            }
            .el-dialog__body {
                margin: 10px 0;
                padding: 10px 20px;
            }
            .order-apply {
                h3 {
                    margin: 10px 0;
                }
            }
            .gy-form-group{
                padding: 10px 40px 10px 125px;
                span{
                    i{
                        color: $color-highlight;
                    }
                }
            }
            .gy-form-group .l{
                width: 120px;
            }
        }
    }
</style>
