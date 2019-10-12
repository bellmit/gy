<template>
  <!-- 付款单确认画面(包含在线支付和线下支付) -->
  <div class="userCenter-main createPayment">
      <div class="userCenter-main-tit">
      <div class="userCenter-main-tit-left">
        <span class="userCenter-main-tit-left-tit">付款单</span>
        <span class="userCenter-main-tit-left-no">付款单号：{{payNo}}</span>
      </div>
      <!--<div class="userCenter-main-tit-right">-->
        <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
          <!--<el-breadcrumb-item>付款申请</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item class="createPayment-main-tit-right">财务付款</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item >收款确认</el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
      <!--</div>-->
    </div>
      <div class="createPayment-status createPayment-common clearfix">
          <div class="createPayment-status-left">
            <div>
              <i class="el-icon-tickets"></i>
              <span class="createPayment-status-left-tit">付款单状态</span>
            </div>
              <div class="createPayment-status-left-billStatus">
                  <step step="1" :isActive='this.payStatus >= -1' showLine='' :isDone="this.payStatus >= -1">
                      <div class="createPayment-status-left-billStatus-unconfirm">
                          <span>付款申请</span>
                      </div>
                  </step>
                  <step step="2" :isActive="this.payStatus >= 10" isRight="true" showLine='true' :isDone="this.payStatus >= 10">
                      <div class="createPayment-status-left-billStatus-confirmed">
                          <span>财务付款</span>
                      </div>
                  </step>
                  <step step="3" :isActive="this.payStatus >= 20" isRight="true" showLine='true' :isDone="this.payStatus >= 20">
                      <div class="createPayment-status-left-billStatus-confirmed">
                          <span>收款确认</span>
                      </div>
                  </step>
                  <step step="4" :isActive="this.payStatus >= 50" isRight="true" showLine='true' :isDone="this.payStatus >= 50">
                      <div class="createPayment-status-left-billStatus-confirmed">
                          <span>已完成</span>
                      </div>
                  </step>
              </div>
          </div>
          <div class="createPayment-status-right fr">
            <button @click="auditingPayment(3)" class="createPayment-status-right-submit btn-active" v-if="tradeMode == 1">支付</button>
            <button @click="auditingPayment(1)" class="createPayment-status-right-submit btn-active" v-else>确认</button>
            <button @click="auditingPayment(2)" class="createPayment-status-right-submit btn">驳回</button>
          </div>
      </div>

      <div class="createPayment-detail createPayment-common">
          <div>
              <i class="el-icon-tickets"></i>
              <span class="createPayment-detail-tit">付款信息</span>
          </div>
          <div class="content-info">
              <el-row class="my-row">
                  <el-col :span="3" class="font-weight">本次支付货款 </el-col>
                  <el-col :span="9"><span style="color:red;">{{amount}}</span> 元</el-col>
                  <el-col :span="2" class="font-weight">付款方式</el-col>
                  <el-col :span="10">{{paymentTerms}}</el-col>
              </el-row>
              <el-row class="my-row">
                  <el-col :span="3" class="font-weight">付款企业</el-col>
                  <el-col :span="9">{{buyerCorpName}}&nbsp;</el-col>
                  <el-col :span="2" class="font-weight">收款企业</el-col>
                  <el-col :span="10">{{sellerCorpName}}<a href="###" class="createPayment-seller-contact"><i class="iconfont icon-chat"></i>和我联系</a></el-col>
              </el-row>
              <el-row class="my-row">
                  <el-col :span="3" class="font-weight">付款银行</el-col>
                  <el-col :span="6">
                      <!--{{buyerDepositBank}}-->
                      <el-select v-model="accountNumber" :placeholder="defaultAccountName" @change="chooseBank($event)" >
                          <el-option
                            v-for="(account, itemIndex) in buyerAccounts"
                            filterable
                            allow-create
                            :key="itemIndex"
                            :label="account.bankName"
                            :value="account.bankAccount">
                          </el-option>
                      </el-select>
                  </el-col>
                  <el-col :span="3">&nbsp;</el-col>
                  <el-col :span="2" class="font-weight">收款银行</el-col>
                  <el-col :span="10">{{sellerDepositBank}}</el-col>
              </el-row>
              <el-row class="my-row">
                  <el-col :span="3" class="font-weight">付款账号</el-col>
                  <el-col :span="9">{{accountNumber}}&nbsp;</el-col>
                  <el-col :span="2" class="font-weight">收款账号</el-col>
                  <el-col :span="10">{{sellerAccount}}&nbsp;</el-col>
              </el-row>
              <el-row class="my-row">
                  <el-col :span="3" class="font-weight">付款凭证</el-col>
                  <el-col :span="21">
                      <!--<div class="createPayment-attachment-items">-->
                          <!--<a class="createPayment-attachment-item" v-for="attachment in attachments" :key="attachment.tit" href="attachment.url">-->
                              <!--<img class="createPayment-attachment-item-img" :src="attachment.imgUrl" />-->
                              <!--<div class="createPayment-attachment-item-right">-->
                                  <!--<p class="createPayment-attachment-item-right-name">{{attachment.tit}}</p>-->
                                  <!--<span class="createPayment-attachment-item-right-look">点击查看</span>-->
                              <!--</div>-->
                          <!--</a>-->
                      <!--</div>-->
                      <el-upload
                        action="api"
                        :auto-upload="true"
                        :data="{paymentId:paymentId}"
                        list-type="picture-card"
                        :file-list="fileList"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :http-request="uploadImg">

                          <i class="el-icon-plus"></i>
                      </el-upload>
                  </el-col>
              </el-row>
              <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <el-row class="my-row">
                  <el-col :span="3" class="font-weight">备注</el-col>
                  <el-col :span="19">
                      <el-input
                        type="textarea"
                        autosize
                        placeholder="备注信息"
                        v-model="remark">
                      </el-input>
                  </el-col>
              </el-row>
          </div>
      </div>
      <!--END 公司列表-->
      <transition name="fade" >
          <div class="pop-comapny" v-show="showPop">
              <div class="pop-main">
                  <h3>提交信息</h3>

                  <div class="pop-inner">
                      <!--<div class="tips">-->
                      <!--<i class="iconfont icon-tipserror"></i><span>公司上传认证信息有误，请重新提交！<a href="" class="highlight">联系客服</a></span>-->
                      <!--</div>-->
                      <form action="javascript:;">
                          <div class="gy-form">
                              <div class="gy-form-group">
                                  <span class="l"><strong>*</strong>账号名称：</span>
                                  <input type="text" name="accountName"  v-model="accountNameVal">
                              </div>
                              <div class="gy-form-group">
                                  <span class="l"><strong>*</strong>银行名称</span>
                                  <input type="text" name="bankName" v-model="bankName">
                              </div>
                              <div class="gy-form-group">
                                  <span class="l"><strong>*</strong>银行账号</span>
                                  <input type="text" name="companyAccount" v-model="companyAccount">
                              </div>
                              <div class="gy-form-group">
                                  <span class="l"><strong>*</strong>开户行名称</span>
                                  <input type="text" name="depositBank" v-model="depositBank">
                              </div>
                              <div class="gy-form-button">
                                  <button class="gy-button-extra" @click="addBank">提交</button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
              <span class="mask" @click="showPop = false"></span>
          </div>
      </transition>
      <!--END Pop Company-->
  </div>
</template>

<script>
import step from '../../components/step';
import { paymentMethod } from '@/utils';
export default {
    name: 'confirm-offline-pay',
    components: {step},
    data () {
        return {
            paymentId: 0,
            processId: 0,
            payStatus: 0,
            installment: false,
            payMethod: 0,
            payNo: '',
            amount: '',
            depositRatio: 0,
            accountNumber: '',
            accountObj: '',
            sellerId: '',
            sellerCorpName: '',
            sellerAccount: '',
            sellerDepositBank: '',
            buyerAccounts: [{bankName: '', bankAccount: ''}],
            buyerId: 0,
            buyerAccount: '',
            buyerDepositBank: '',
            paymentTerms: '',
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            uploadUrl: process.env.API_ROOT_MAIN + this.$api.payment.paymentConfirmUpload,
            remark: '',
            showPop: false,
            accountNameVal: '',
            bankName: '',
            companyAccount: '',
            depositBank: '',
            sellerAccounts: [{bankName: '', bankAccount: ''}],
            tradeMode: '',
            buyerCorpName: ''
        };
    },
    computed: {
        balance: function () {
            return this.total - this.amount;
        },
        defaultAccountName: function () {
            return this.buyerAccounts[0].bankName;
        },
        defaultAccountNumber: function () {
            return this.buyerAccounts[0].bankAccount;
        }
    },
    methods: {
        addBank () {
            const me = this;
            this.$http.post('/trade/account/v1/companies/addBankInfo', {
                companyId: me.buyerId,
                accountName: me.accountNameVal,
                bankName: me.bankName,
                companyAccount: me.companyAccount,
                depositBank: me.depositBank
            }).then(function (data) {
                if (data.data.code === 0) {
                    me.showPop = false;
                } else {
                    this.$message('错了哦，状态码【' + data.code + '】 请重新访问该页面');
                }
            }).catch(function (e) {
                setTimeout(() => {
                }, 900);
            });
        },
        uploadImg (file) {
            let me = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            formData.append('paymentId', me.paymentId);
            me.$http.post(me.uploadUrl, formData, headers)
                .then(function (res) {
                });
        },
        handleRemove (file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        hanldeInput () {
            const reg = /^(0{2,}|-)/;
            const amountString = this.amount.toString();
            if (this.amount > this.total || this.amount < 0 || reg.test(amountString)) {
                this.open();
                this.amount = '';
            }
        },
        openError (text) {
            this.$alert(text, {
                confirmButtonText: '确定'
            });
        },
        open () {
            this.$alert('输入的金额不能小于零或大于' + this.total, '金额输入错误', {
                confirmButtonText: '确定'
            });
        },
        chooseBank (bankAccount) {
            if (!bankAccount) {
                this.showPop = true;
                this.accountNumber = ' ';
                return;
            }
            this.accountObj = this.buyerAccounts.filter(account => account.bankAccount === bankAccount)[0];
        },
        auditingPayment (opeType) {
            // 财务审核付款单并提交结果
            const me = this;
            // 确认校验
            if (opeType === 3) {
                if (me.payStatus !== 10) {
                    this.openError('当前付款单不允许确认，请检查！');
                    return;
                // } else if (me.fileList.length === 0) {
                //     this.$message({
                //         type: 'warning',
                //         message: '请上传附件'
                //     })
                //     return;
                }
                this.$router.push({name: 'transferAccounts', params: {amount: me.amount, sellerAccount: me.sellerAccount, sellerDepositBank: me.sellerDepositBank, paymentId: me.paymentId, processId: me.processId, remark: me.remark, opeType: opeType, accountObj: me.accountObj, accountNumber: me.accountNumber}});
                return;
            }
            // 驳回校验
            if (opeType === 2) {
                if (me.payStatus !== 10) {
                    this.openError('当前付款单不允许驳回，请检查！');
                    return;
                }
            }
            // 确认校验
            if (opeType === 1) {
                if (me.payStatus !== 10) {
                    this.openError('当前付款单不允许确认，请检查！');
                    return;
                }
                // if (me.fileList.length === 0)
                // {
                //     this.openError('请上传单据附件！');
                // }
            }
            me.$http.post(me.$api.processes.flowAct,
                {
                    paymentId: me.paymentId,
                    processId: me.processId,
                    remark: me.remark,
                    operaType: opeType,
                    accountInfo: me.accountObj
                }
            ).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    me.$router.push({path: '/my/payment/info', query: {paymentId: me.paymentId}});
                } else {
                    me.$alert(response.data.code + ' ' + response.data.message);
                    console.log(response.data.code + ' ' + response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    },
    created: function () {
        // 获取付款单信息
        const me = this;
        this.imgBaseUrl = process.env.API_ROOT_MAIN + '/trade/v1/companies/images?filePath=';
        me.paymentId = me.$route.query.paymentId;
        me.$http.get(me.$api.payment.paymentInfo + me.paymentId)
            .then(function (response) {
                if (response.data.code === 0) {
                    me.processId = response.data.data.payJobId;
                    me.payStatus = response.data.data.payStatus;
                    me.payMethod = response.data.data.payMethod;
                    me.payNo = response.data.data.payNumber;
                    me.depositRatio = response.data.data.depositRatioStr;
                    me.amount = response.data.data.payTotalStr;
                    me.tradeMode = response.data.data.tradeMode;
                    me.paymentTerms = paymentMethod(response.data.data.transactionType, response.data.data.isBatchDelivery);

                    // payBillType：1 :付款；2:退款
                    if (response.data.data.payBillType === 1) {
                        me.sellerId = response.data.data.sellerId;
                        me.sellerCorpName = response.data.data.sellerCorpName;
                        me.sellerDepositBank = response.data.data.sellerDepositBank;
                        me.sellerAccount = response.data.data.sellerAccount;
                        me.buyerId = response.data.data.buyerId;
                        me.buyerAccount = response.data.data.buyerAccount;
                        me.buyerDepositBank = response.data.data.buyerDepositBank;
                        me.buyerCorpName = response.data.data.buyerCorpName;
                    } else if (response.data.data.payBillType === 2) {
                        me.sellerId = response.data.data.buyerId;
                        me.sellerCorpName = response.data.data.buyerCorpName;
                        me.sellerAccount = response.data.data.buyerAccount;
                        me.sellerDepositBank = response.data.data.buyerDepositBank;
                        me.buyerId = response.data.data.sellerId;
                        me.buyerAccount = response.data.data.sellerAccount;
                        me.buyerDepositBank = response.data.data.sellerDepositBank;
                        me.buyerCorpName = response.data.data.sellerCorpName;
                    }

                    let fileNames = response.data.data.attachments;
                    fileNames.forEach((item, index) => {
                        let obj = {};
                        let timestmp = (new Date()).valueOf();
                        obj.url = process.env.API_ROOT_MAIN + me.$api.payment.paymentImage + '?filePath=' + item + '&t=' + timestmp;
                        me.fileList.push(obj);
                    });
                    me.$http.get(me.$api.payment.payInfo4Confirm + '?buyerCompanyId=' + me.buyerId)
                        .then(function (response) {
                            if (response.data.code === 0) {
                                me.buyerAccounts = response.data.data.bankInfoList;
                                me.accountObj = me.buyerAccounts[0];
                                me.accountNumber = me.buyerAccounts[0].bankAccount;
                            }
                        });
                } else {
                    console.log(response.data.code + ' ' + response.data.message);
                }
            });
    }
};
</script>

<style lang="scss" scoped>
    .content-info{
        padding-left: 15px;
    }
    .createPayment-common {
        padding: 20px;
    }
    .createPayment-status {
        border-top: 1px solid #eee;
    }
    .createPayment-status-left-billStatus {
        width: 30%;
        display: flex;
        margin: 20px 0 0 20px;
    }
    .createPayment-status-left-billStatus-active {
        margin-left: -10px;
    }
    .createPayment-status-left-billStatus-unactive {
        position: relative;
        span {
            position: absolute;
            right: -34px;
            white-space: nowrap;
        }
    }
    .createPayment-status-left-billStatus-unconfirm {
        margin-left: -14px;
    }
    .createPayment-status-left-billStatus-confirmed {
        position: relative;
        span {
            position: absolute;
            right: -12px;
        }
    }
  .createPayment-status-right-submit {
    margin-right: 10px;
  }
  .createPayment-detail-amount {
    display: flex;
  }
  .createPayment-detail-amount-right {
    margin-left: 30px;
  }
  .createPayment-detail-amount-box {
    margin-top: 20px;
  }
  .createPayment-detail-amount-input {
    border: none;
    font-size: 20px;
  }
  .createPayment-seller {
    padding: 20px 20px 60px;
    width: 94%;
  }
  .createPayment-seller-account {
    margin: 20px 0;
  }
  .mg-top10 {
    margin-top: 10px;
  }
  .mg-top40 {
    margin-top: 40px;
  }
  .createPayment-items-bank {
    padding: 6px 40px;
    border-right: 1px solid #eee;
  }
  .createPayment-seller-account-left-fr {
    font-size: 12px;
    color: #666;
    margin-left: 50px;
    border-left: 1px solid #eee;
    padding-left: 14px;
  }
  .createPayment-trade-mode-content {
    margin: 10px 0;
  }
  .createPayment-trade-mode-desc {
    padding: 6px 10px;
    margin-left: 46px;
  }
  .createPayment-remark {
    margin: 30px 0 10px;
  }
  .createPayment-seller-contact {
    color:#E0370F;
    margin-left: 20px;
    opacity: 0.8;
    display: inline-flex;
    align-items: center;
    .icon-chat {
      margin: 0 6px 0 10px;
      font-size: 14px;
      color: #ef0505;
    }
  }
  .userCenter-main-tit-left-tit {
    color: #333;
    font-size: 16px;
  }
  .userCenter-main-tit-left-no {
    color: #666;
    font-size: 12px;
    margin-left: 20px;
    font-weight: normal;
  }
  .createPayment-detail {
    border-top: 15px solid #eee;
  }
  .createPayment-detail-tit,
  .createPayment-seller-tit,
  .createPayment-status-left-tit {
    color: $color-title;
    font-size: 14px;
    font-weight: bold;
  }
  .padding-left20 {
    padding-left: 20px;
  }
  .createPayment-items-subtit {
    color: #333;
    font-weight: bold;
    font-size: 12px;
  }
  .createPayment-detail-content {
    margin: 10px 0;
  }
  .createPayment-detail-content-amount {
    font-family: HelveticaNeue;
    font-size: 14px;
    color: #E0370F;
    margin-left: 14px;
    font-weight: 700;
  }
  .createPayment-detail-content-desc {
    font-size: 12px;
    color: #2A2A2A;
    line-height: 16px;
    opacity: 0.8;
  }
  .createPayment-attachment-items {
    display: flex;
   }
  .createPayment-attachment-item {
    display: flex;
    align-items: center;
    margin: 20px 0 0 20px;
  }
  .createPayment-attachment-item-img {
    width: 50px;
    height: 50px;
    margin-right: 8px;
  }
  .createPayment-attachment-item-right-name {
    color: #666;
  }
  .createPayment-attachment-item-right-look {
    color:  #4A90E2;
  }
  .createPayment-remark-content {
    margin-left: 20px;
  }
  .createPayment-remark-content-tips{
    margin: 20px 0 0 -20px;
    border:none;
  }
</style>
<style lang="scss" >
  .createPayment-main-tit-right {
    .el-breadcrumb__inner,
    .el-icon-arrow-right {
      color: #E0370F;
    }
  }
  .createPayment {
    .el-breadcrumb {
      font-size: 12px;
    }
  }
  .el-select-dropdown {
    left: 1361px;
  }
  .createPayment-items-bank-box {
    .el-input__inner {
      height: 30px;
      line-height: 30px;
      margin-left: 10px;
    }
    .el-select__caret {
      line-height: 30px;
    }
  }

.pop-comapny{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      .pop-main{
          position: absolute;
          width: 400px;
          height: 300px;
          left: 50%;
          top: 50%;
          border-radius: $border-radius-base;
          overflow: hidden;
          transform: translate(-50%, -50%);
          background-color: #fff;
          z-index: 2;
          .img-holder{
              border-radius: $border-radius-base;
              overflow: hidden;
              vertical-align: middle;
              display: inline-block;
              height: 100px;
              width: auto;
              border: 1px solid $color-border;
              margin-right: 10px;
          }
          .img-upload{
              vertical-align: middle;
              display: inline-block;
          }
          h3{
              line-height: 40px;
              margin: 0;
              font-size: 16px;
              color: #333;
              padding-left: 15px;
              font-weight: normal;
              border-bottom: 1px solid #e6eaea;
          }
          .tab{
              text-align: center;
              padding: 30px 0 10px;
              li{
                  border-radius: $border-radius-large;
                  display: inline-block;
                  height: 94px;
                  width: 152px;
                  background-color: #f6f6f6;
                  border: 2px solid #e2e2e2;
                  margin: 0 50px;
                  vertical-align: middle;
                  position: relative;
                  cursor: pointer;
                  dl{
                      color: $color-title;
                      position: absolute;
                      left: 0;
                      width: 100%;
                      top: 50%;
                      transform: translate(0, -50%);
                      dt{
                          font-size: 16px;
                          line-height: 1.5;
                          margin-bottom: 10px;
                      }
                      dd{
                          font-size: 12px;
                          line-height: 1;
                      }
                  }
                  &.selected{
                      background-color: #f9f3eb;
                      border-color: #e1dbd7;
                  }
              }
          }
          .ca-wrap{
              padding: 10px 20px;
              .gy-form{
                  padding: 0;
              }
              .t{
                  margin-bottom: 10px;
                  dd{
                      color: $color-minor;
                  }
              }
              .card-group{
                  div{
                      display: inline-block;
                      vertical-align: middle;
                  }
                  .card-tips{
                      display: inline-block;
                      vertical-align: middle;
                      margin-left: 10px;
                  }
              }
              .img-bank{
                  width: 120px;
                  height: auto;
              }
          }
          .tips{
              color: $color-highlight;
              padding: 10px 0 0 20px;
              font-size: 12px;
              height: 38px;
              i{
                  margin-right: 5px;
                  vertical-align: middle;
              }
              span{
                  display: inline-block;
                  vertical-align: middle;
              }
          }
          .gy-form{
              padding-top: 0;
          }
          .gy-form-group{
              padding-left: 100px;
              .l{
                  width: 100px;
              }
              .select-province{
                  width: 150px;
                  margin-right: 10px;
              }
              .address{
                  width: 265px;
              }
              &.form-group-address{
                  padding-right: 0;
              }
          }
      }
      .mask{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 1;
      }
  }
  .my-row{
      color:black;
      .el-col{
          line-height: 40px;
          /*border:red solid 1px;*/
      }
      .font-weight{
          /*font-weight: bold;*/
      }
  }
</style>
