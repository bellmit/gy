<template>
  <div class="createPayment">
    <div class="userCenter-main-tit">
      <div class="userCenter-main-tit-left">
        <span class="userCenter-main-tit-left-tit">付款单</span>
        <!--<span class="userCenter-main-tit-left-no"></span>-->
      </div>
      <!--<div class="userCenter-main-tit-right">-->
        <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
          <!--<el-breadcrumb-item class="createPayment-main-tit-right" >付款申请</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item>财务付款</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item>收款确认</el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
      <!--</div>-->
    </div>
      <div class="createPayment-status createPayment-common clearfix">
      <div class="createPayment-status-left">
        <div>
          <i class="el-icon-tickets"></i>
          <span class="createPayment-status-left-tit">付款单状态</span>
        </div>
        <!--<div class="createPayment-status-left-billStatus">-->
          <!--<step step="1" isActive="true">-->
            <!--<div class="createPayment-status-left-billStatus-active">申请中</div>-->
          <!--</step>-->
        <!--</div>-->
          <div class="createPayment-status-left-billStatus">
              <step step="1" isActive='1' showLine=''>
                  <div class="createPayment-status-left-billStatus-unconfirm">
                      <span>付款申请</span>
                  </div>
              </step>
              <step step="2" isActive="" isRight="true" showLine='true'>
                  <div class="createPayment-status-left-billStatus-confirmed">
                      <span>财务付款</span>
                  </div>
              </step>
              <step step="3" isActive="" isRight="true" showLine='true'>
                  <div class="createPayment-status-left-billStatus-confirmed">
                      <span>收款确认</span>
                  </div>
              </step>
              <step step="4" isActive="" isRight="true" showLine='true'>
                  <div class="createPayment-status-left-billStatus-confirmed">
                      <span>已完成</span>
                  </div>
              </step>
          </div>
      </div>
      <div class="createPayment-status-right fr" v-if="showActButton === 1">
        <button @click="submitForm" class="createPayment-status-right-submit btn-active">提交</button>
        <button class="createPayment-status-right-cancel btn" @click="cancel">取消</button>
      </div>
    </div>
  <div class="createPayment-detail createPayment-common">
          <div>
              <i class="el-icon-tickets"></i>
              <span class="createPayment-detail-tit">收款信息</span>
          </div>
          <div class="content-info">
              <el-row class="my-row">
                  <el-col :span="4" class="font-weight">本次付款金额 </el-col>
                  <el-col :span="9">
                    <el-input
                    v-model="amount"
                    type="number"
                    debounce="50"
                    @input="hanldeInput"
                    placeholder="请输入金额"
                    class="createPayment-detail-amount-input">
                      <!--<template slot="append">元</template>-->
                  </el-input> 元</el-col>
                  <el-col :span="2" class="font-weight">收款企业</el-col>
                  <el-col :span="9">{{sellerCompany}} <!--<a href="###" class="createPayment-seller-contact"><i class="iconfont icon-chat"></i>和我联系</a>--> </el-col>
              </el-row>
              <el-row class="my-row">
                  <el-col :span="4" class="font-weight" v-if="((payMethod==1)||(payMethod==2))">剩余应付货款金额</el-col>
                  <el-col :span="9" v-if="((payMethod==1)||(payMethod==2))">
                      {{balance}}
                  </el-col>
                  <el-col :span="((payMethod==3)||(payMethod==4))?4:2" class="font-weight">收款银行</el-col>
                  <el-col :span="7">
                      <el-select v-model="accountNumber" :placeholder="defaultAccountName" @change="chooseBank($event)" >
                          <el-option
                            v-for="(account, itemIndex) in sellerAccounts"
                            filterable
                            allow-create
                            :key="itemIndex"
                            :label="account.bankName"
                            :value="account.bankAccount">
                          </el-option>
                      </el-select>
                  </el-col>
              </el-row>
              <el-row class="my-row">
                  <el-col :span="4" class="font-weight">收款账号</el-col>
                  <el-col :span="20">{{accountNumber?accountNumber:defaultAccountNumber}}&nbsp;</el-col>
              </el-row>
              <el-row class="my-row">
                  <el-col :span="4" class="font-weight">付款方式</el-col>
                  <el-col :span="20">{{paymentTerms}}</el-col>
              </el-row>
              <el-row class="my-row">
                  <el-col :span="3" class="font-weight">备注</el-col>
                  <el-col :span="18">
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
    name: 'createPayment',
    components: {step},
    data () {
        return {
            payNo: '',
            total: 0, // 总货款
            amount: 0, // 本次支付的金额
            depositRatio: 0, // 保证金比率
            depositAmount: 0, // 保证金金额
            paidTotal: 10,
            paidTotalVal: 0,
            totalVal: 0,
            depositAmountVal: 0,
            accountNumber: '',
            accountObj: {},
            sellerCompanyId: '',
            sellerCompany: '',
            sellerAccounts: [{bankName: '', bankAccount: ''}],
            paymentTerms: '',
            remark: '',
            orderNumber: '',
            orderType: 0,
            payBillType: 0, // 付款单类型
            payMethod: 0, // 付款类型
            showActButton: 1,
            showPop: false,
            accountNameVal: '',
            bankName: '',
            companyAccount: '',
            depositBank: '',
            orderId: '',
            userId: '',
            startSettlementOrderMsg: {}
        };
    },
    created: function () {
        this.getOrderInfo();
        this.getAccounts();
        this.orderId = this.$route.query.orderId;
        this.userId = this.$route.query.userId;
    },
    computed: {
        balance: function () {
            return (this.totalVal - this.amount - this.paidTotalVal).toFixed(2);
        },
        defaultAccountName: function () {
            return this.sellerAccounts[0].bankName;
        },
        defaultAccountNumber: function () {
            return this.sellerAccounts[0].bankAccount;
        }
    },
    methods: {
        addBank () {
            const me = this;
            this.$http.post('/trade/account/v1/companies/addBankInfo', {
                companyId: me.sellerCompanyId,
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
        hanldeInput () {
            const reg = /^(0{2,}|-)/;
            const amountString = this.amount.toString();
            if (this.amount > this.total || this.amount < 0 || reg.test(amountString)) {
                this.open();
                this.amount = '';
            }
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
            this.accountObj = this.sellerAccounts.filter(account => account.bankAccount === bankAccount)[0];
        },
        cancel () {
            this.$router.back(-1);
            // history.go(-1);
            // console.log(this.$router.back(-1));
            // console.log(history.go(-1));
        },
        submitForm () {
            // 提交请求，保存付款单
            const me = this;
            me.$http.post(me.$api.payment.createPayment,
                {
                    payTotal: me.amount,
                    orderType: me.orderType,
                    orderNumber: me.orderNumber,
                    payBillType: me.payBillType,
                    payMethod: me.payMethod,
                    accountInfo: me.accountObj
                }
            ).then(function (response) {
                if (response.data.code === 0) {
                    // fixme -- 应该回到原来的业务画面（订单业务）
                    // me.$router.push({name: 'toPay', params: { payMethod: me.payMethod }});
                    this.$router.push({path: '/my/payment/list'});
                    me.showActButton = 0;
                    me.postStartSettlementOrderMsg();
                } else {
                    me.$alert(response.data.code + ' ' + response.data.message);
                    console.log(response.data.code + ' ' + response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        postStartSettlementOrderMsg () {
            let that = this;
            that.startSettlementOrderMsg.orderId = that.orderId;
            that.startSettlementOrderMsg.userId = that.userId;
            that.$http.post(that.$api.order.startSettlementOrderMsg, that.startSettlementOrderMsg)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.$router.back(-1);
                    }
                    // that.SettlementOrderMsg = res.data.data.msg;
                    // that.orderNumber = res.data.data.orderNumber;
                    // that.settleBalance = res.data.data.settleBalance;
                }).catch(() => {
                    console.log('出错了');
                });
        },
        getOrderInfo () {
        // 从订单页面的路由获取订单编号等信息
            const me = this;
            me.amount = me.$route.query.amount;
            console.log(me.amount);
            me.orderNumber = me.$route.query.orderNo;
            me.orderType = me.$route.query.orderType; // 1
            me.payBillType = parseInt(me.$route.query.billType); // 1 付款 2 退款
            me.payMethod = parseInt(me.$route.query.payMethod); // 3
        },
        getAccounts () {
        // 根据订单编号获取收款账户信息
            const me = this;
            me.$http.post(me.$api.payment.orderInfo4Pay,
                {
                    orderNumber: me.orderNumber,
                    orderType: me.orderType,
                    payBillType: me.payBillType,
                    payMethod: me.payMethod
                }
            ).then(function (response) {
                if (response.data.code === 0) {
                    // 这里以后要判断订单类型
                    let resData = response.data.data;
                    me.sellerCompany = resData.targetCorpName;
                    me.sellerCompanyId = resData.targetCorpId;
                    me.sellerAccounts = resData.bankInfoList;
                    me.accountObj = me.sellerAccounts[0];
                    me.accountNumber = me.sellerAccounts[0].accountNumber;
                    me.amount = resData.amount;
                    me.total = resData.total;
                    me.depositRatio = resData.depositRatio;
                    me.depositAmount = resData.depositAmount;
                    me.totalVal = resData.totalVal;
                    me.paidTotal = resData.paidTotal;
                    me.paidTotalVal = resData.paidTotalVal;
                    me.depositAmountVal = resData.depositAmountVal;
                    // me.paymentTerms = resData.paymentTerms;
                    me.paymentTerms = paymentMethod(response.data.data.transactionType, response.data.data.isBatchDelivery);
                } else {
                    me.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
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
    display: inline-block;
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
    width: 50%;
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
</style>
<style lang="scss" scoped>
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
    .el-textarea {
      margin-left: 20px;
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
