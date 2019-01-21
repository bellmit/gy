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
                <el-col :span="20">{{amount | numToCash(2) }}元</el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span class="l tt">付款银行</span>
                        <span></span>
                    </div>
                </el-col>
                <!--<el-col :span="19">{{sellerAccount}}</el-col>-->
                <el-col :span="20"><img :src="smallIcon" style="width: 110px;height: 40px;"/></el-col>
            </el-row>
            <el-row style="display: none;">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span class="l tt">账户余额</span>
                        <span></span>
                    </div>
                </el-col>
                <el-col :span="20" class="font-red">￥{{accountBalance | numToCash(2) }}元</el-col>
            </el-row>
            <div class="mm"></div>
            <!--<button class="gy-button-normal">转入</button>-->
            <div style="margin-top: 20px;margin-left: 15px;color: #f00;font-size: 20px;text-align: center;">系统升级中，暂停支付，开通时间另行通知！</div>
            <button class="gy-button-extra" @click="judgePayment" style="display: none;">支付</button>
            <div class="clear"></div>
        </div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
            <el-form ref="form" label-width="70px">
                <el-form-item label="支付密码" prop="account">
                    <el-input v-model="tradePwd" type="password"></el-input>
                </el-form-item>
             </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addBank(1)">确 定</el-button>
            </span>
        </el-dialog>

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
            name: 'test',
            dialogVisible: false,
            tradePwd: '',
            bankId: null,
            smallIcon: '',
            accountBalance: ''
        };
    },
    methods: {
        judgePayment () {
            let me = this;
            me.$http.get(me.$api.account.isHasTradePwd
            ).then(function (response) {
                if (response.data.code === 0) {
                    // enableTradePwd  '启用交易密码(0:停用,1:启用)';1是支持在线支付密码，支持在线支付密码的时候需要弹出支付密码层
                    if (response.data.data.enableTradePwd && Number(response.data.data.enableTradePwd) === 1) {
                        me.popPassword(); //  enableTradePwd  '启用交易密码(0:停用,1:启用)';1是支持在线支付密码，支持在线支付密码的时候需要弹出支付密码层
                    } else {
                        me.addBank(0);
                    }
                } else {
                    me.$alert('支付失败，' + response.data.message, '操作提示');
                    // console.log(response.data.code + ' ' + response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        popPassword () {
            this.dialogVisible = true;
        },
        // 1.payType为0时接口不需要传tradePwd字段因为不需要支付密码，payType为1时接口需要传tradePwd字段因为需要支付密码
        // 2.enableTradePwd  '启用交易密码(0:停用,1:启用)';1是支持在线支付密码，支持在线支付密码的时候需要弹出支付密码层
        addBank: function (payType) {
            let me = this;
            if (me.amount && me.accountObj && me.accountBalance) {
                if (me.amount > me.accountBalance) {
                    me.$alert('您的账户余额不足，请充值！', '操作提示');
                    return;
                }
            }
            let statusCommand = 'PAY_COMPLETED';
            let parm = {
                paymentId: me.paymentId,
                processId: me.processId,
                remarks: me.remark,
                operaType: 3,
                status_command: statusCommand,
                accountInfo: me.accountObj
            };
            if (payType === 1) {
                if (me.tradePwd.length < 1) {
                    me.$alert('请输入密码！', '操作提示');
                    return;
                }
                parm.tradePwd = me.tradePwd;
            }
            me.$http.post(me.$api.processes.flowAct,
                parm
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
        // bankId zx 1   pa 2
        // const me = this;
        // 判断有无缓存;
        console.log(this.$route.params.accountObj);
        console.log(this.$route.params.accountObj === undefined);
        if (this.$route.params.accountObj === undefined) {
            this.bankId = parseInt(sessionStorage.getItem('bankIdHC'));
            this.amount = sessionStorage.getItem('amountHC');
        } else {
            this.bankId = this.$route.params.accountObj.bankId;
            sessionStorage.setItem('bankIdHC', this.$route.params.accountObj.bankId);
            this.amount = this.$route.params.amount;
            sessionStorage.setItem('amountHC', this.$route.params.amount);
        }
        this.sellerAccount = this.$route.params.sellerAccount;
        this.sellerDepositBank = this.$route.params.sellerDepositBank;
        this.paymentId = this.$route.params.paymentId;
        this.processId = this.$route.params.processId;
        this.accountObj = this.$route.params.accountObj;
        this.remark = this.$route.params.remark;
        this.opeType = this.$route.params.opeType;
        this.accountNumber = this.$route.params.accountNumber;
        this.$http.post(this.$api.payment.companyAccount, {}).then(res => {
            if (res.data.code === 0) {
                // zx
                if (this.bankId === 1) {
                    console.log(res.data.data[0]);
                    console.log(res.data.data[0].smallIcon);
                    this.smallIcon = res.data.data[0].smallIcon;
                    console.log(this.smallIcon);
                    this.accountBalance = res.data.data[0].accountBalance;
                    // console.log(res.data.data[0]);
                }
                // pa
                if (this.bankId === 2) {
                    this.smallIcon = res.data.data[1].smallIcon;
                    this.accountBalance = res.data.data[1].accountBalance;
                }
            }
        });
        // let params = {subAccount: me.accountNumber};
        // this.$http.post(me.$api.payment.payInfoBalance, params
        // ).then(function (response) {
        //     if (response.data.code === 0) {
        //         me.accountObj.accountBalance = response.data.data.accountBalance;
        //         console.log(me.accountObj.accountBalance);
        //     }
        // }).catch(function (error) {
        //     console.log(error);
        // });
    }

};
</script>

<style lang="scss">
    .font-red {
        color: #E0370F;
    }

    .payment {
        background-color: $color-white;
        .gy-h4 {
            height: 35px;
            line-height: 35px;
            margin: 0;
            margin-left: 20px;
        }
        .payment-content {
            border-top: 1px solid $color-minor;
            position: relative;
            padding: 0 20px;
            .l {
                width: 56px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                display: inline-block;
            }
            .tt {
                margin-left: 15px;
            }
            .gy-button-extra {
                float: right;
                margin-right: 10px;
            }
            .gy-button-normal {
                float: right;
                margin-right: 15px;
            }
            .el-row {
                margin-top: 27px;
            }
            .mm {
                position: absolute;
                height: 120px;
                border: 1px solid $color-light;
                top: 85px;
                left: 130px;
            }
            .clear {
                clear: both;
            }
        }
    }
</style>
