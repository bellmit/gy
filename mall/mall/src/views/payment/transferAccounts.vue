<template>
  <div class="payment">
    <!--<div class="pay">支付确认</div>-->
    <h4 class="gy-h4">支付确认</h4>
    <div class="payment-content">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <i class="el-icon-tickets"></i>
            <span class="l">支付信息</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span class="l tt">付款金额</span>
            <span></span>
          </div>
        </el-col>
        <el-col :span="20">{{amount}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span class="l tt">付款银行</span>
            <span></span>
          </div>
        </el-col>
          <!--<el-col :span="19">{{sellerAccount}}</el-col>-->
          <el-col :span="20"><img src="../../assets/images/bank.png" style="width: 110px;height: 40px;"/> </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span class="l tt">账户余额</span>
            <span></span>
          </div>
        </el-col>
          <el-col :span="20" class="font-red">{{accountObj.accountBalance}}</el-col>
      </el-row>
      <div class="mm"></div>
      <!--<button class="gy-button-normal">转入</button>-->
      <button class="gy-button-extra" @click="addBank">支付</button>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            amount: '',
            sellerAccount: '',
            sellerDepositBank: '',
            paymentId: '',
            processId: '',
            accountObj: '',
            remark: '',
            opeType: '',
            name: 'test'
        };
    },
    methods: {
        addBank () {
            let me = this;
            me.$http.post(me.$api.processes.flowAct,
                {
                    paymentId: me.paymentId,
                    processId: me.processId,
                    remark: me.remark,
                    operaType: 3,
                    accountInfo: me.accountObj
                }
            ).then(function (response) {
                if (response.data.code === 0) {
                    me.$alert('您已通过国烨网支付成功！', '操作提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            if (action === 'confirm') {
                                me.$router.push({path: '/my/payment/info', query: {paymentId: me.paymentId}});
                            }
                        }
                    });
                } else {
                    me.$alert('支付失败，' + response.data.message, '操作提示');
                    console.log(response.data.code + ' ' + response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    },
    created () {
        let me = this;
        this.amount = this.$route.params.amount;
        this.sellerAccount = this.$route.params.sellerAccount;
        this.sellerDepositBank = this.$route.params.sellerDepositBank;
        this.paymentId = this.$route.params.paymentId;
        this.processId = this.$route.params.processId;
        this.accountObj = this.$route.params.accountObj;
        this.remark = this.$route.params.remark;
        this.opeType = this.$route.params.opeType;
        this.accountNumber = this.$route.params.accountNumber;

        let params = {subAccount: me.accountNumber};
        this.$http.post(me.$api.payment.payInfoBalance, params
        ).then(function (response) {
            if (response.data.code === 0) {
                me.accountObj.accountBalance = response.data.data.accountBalance;
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
};
</script>

<style lang="scss">
    .font-red{
        color: #E0370F;
    }
  .payment{
    background-color: $color-white;
    .gy-h4{
        height: 35px;
        line-height: 35px;
        margin: 0;
        margin-left: 20px;
    }
    .payment-content{
      border-top: 1px solid $color-minor;
      position: relative;
      padding: 0 20px;
      .l{
        width: 56px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        display: inline-block;
      }
      .tt{
        margin-left: 15px;
      }
      .gy-button-extra{
        float: right;
        margin-right: 10px;
      }
      .gy-button-normal{
        float: right;
        margin-right: 15px;
      }
      .el-row{
        margin-top: 27px;
      }
      .mm{
        position: absolute;
        height: 120px;
        border: 1px solid $color-light;
        top: 85px;
        left: 130px;
      }
      .clear{
        clear: both;
      }
    }
  }
</style>
