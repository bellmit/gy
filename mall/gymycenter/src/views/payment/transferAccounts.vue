<template>
    <div class="payment">
        <div class="new-title-public">
            支付确认
        </div>
        <div>
            <div class="center-box1">
                <i class="iconfont icon-dingdanxinxi mewmyicon"></i> <span class="mewmyfont">支付信息</span>
            </div>
            <div class="center-box2">
                <el-row :gutter="60">
                    <el-col :span="12" class="list-top">
                        <el-row v-if="deductFlag === 0">
                            <el-col :span="5" class="list-left-span">付款金额</el-col>
                            <el-col :span="19" class="list-right-span">{{amount | numToCash(2) }}元</el-col>
                        </el-row>
                        <el-row v-else>
                            <el-col :span="5" class="list-left-span">实付金额</el-col>
                            <el-col :span="19" class="list-right-span">{{customerPayMoney}}元 （已积分抵扣{{pointMoney}}元）</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="list-top">
                        <el-row>
                            <el-col :span="5" class="list-left-span">付款银行</el-col>
                            <el-col :span="19"><img :src="smallIcon" style="width: 110px;height: 40px;margin-top: -15px;"/></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="list-top">
                        <el-row>
                            <el-col :span="5" class="list-left-span">账户余额</el-col>
                            <el-col :span="19" class="list-right-span">{{accountBalance | numToCash(2) }}元</el-col>
                        </el-row>
                    </el-col>
                    <!--<el-col :span="12" v-show="bankId==2" class="list-top">-->
                        <!--<el-row>-->
                            <!--<el-col :span="5" class="list-left-span">支付密码</el-col>-->
                            <!--<el-col :span="19" class="list-right-span">-->
                                <!--<input type="password" placeholder="请输入" class="gy-input" v-model="transmissionPass">-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                    <!--</el-col>-->
                </el-row>
                <el-row class="mybtn">
                    <button class="gy-button-extra" @click="judgePayment">支付</button>
                </el-row>
            </div>
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
            accountBalance: '',
            transmissionPass: '',
            fromFinance: false,
            deductFlag: '',
            customerPayMoney: '',
            deductAmount: '',
            pointMoney: '',
            guaranteed: 0
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
        paySuccess (data) {
            if (Number(data.gatherTotal) < Number(data.applyAmount)) {
                this.$confirm(`您已支付成功！申请总金额${data.applyAmount.toFixed(2)}元，已累计付款${data.gatherTotal.toFixed(2)}元，是否继续付款？`, '提示', {type: 'warning'})
                    .then(() => {
                        this.$router.push({path: '/my/payment/confirm', query: {paymentId: this.paymentId, fromFinance: 1}});
                    }).catch(() => {
                        this.$router.push({path: '/my/payment/info', query: {paymentId: data.id}});
                    });
                return;
            }
            this.$alert('您已支付成功！', '操作提示', {
                confirmButtonText: '确定',
                callback: action => {
                    if (action === 'confirm') {
                        this.$router.push({path: '/my/payment/info', query: {paymentId: data.id}});
                    }
                }
            });
        },
        // 1.payType为0时接口不需要传tradePwd字段因为不需要支付密码，payType为1时接口需要传tradePwd字段因为需要支付密码
        // 2.enableTradePwd  '启用交易密码(0:停用,1:启用)';1是支持在线支付密码，支持在线支付密码的时候需要弹出支付密码层
        addBank (payType) {
            let me = this;
            // if (me.amount > me.accountBalance) {
            //     me.$alert('您的账户余额不足，请充值！', '操作提示');
            //     return;
            // }
            let statusCommand = 'PAY_COMPLETED';
            let parm = {
                paymentId: me.paymentId,
                processId: me.processId,
                remarks: me.remark,
                operaType: 3,
                status_command: statusCommand,
                accountInfo: me.accountObj,
                transmissionPass: me.transmissionPass,
                payTotal: this.amount,
                deductAmount: this.deductAmount,
                customerPayMoney: this.customerPayMoney,
                deductFlag: this.deductFlag
            };
            if (me.guaranteed === 1) {
                parm.operaType = 5;
            }
            if (payType === 1) {
                if (me.tradePwd.length < 1) {
                    me.$alert('请输入密码！', '操作提示');
                    return;
                }
                parm.tradePwd = me.tradePwd;
            }
            if (me.fromFinance) {
                me.$http.post(me.$api.payment.repay, {
                    payTotal: this.amount,
                    masterFlag: 2,
                    masterPaymentId: me.paymentId,
                    accountInfo: me.accountObj,
                    remarks: me.remark,
                    deductAmount: this.deductAmount,
                    customerPayMoney: this.customerPayMoney,
                    deductFlag: this.deductFlag
                }).then(function (response) {
                    if (response.data.code === 0) {
                        me.paySuccess(response.data.data);
                    } else {
                        me.$alert('支付失败，' + response.data.message, '操作提示');
                        console.log(response.data.code + ' ' + response.data.message);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            } else {
                let paySrvUrl = null;
                if (parm.processId) {
                    paySrvUrl = me.$api.processes.flowAct;
                } else {
                    // 担保支付的确认(财务分批时不走流程引擎)
                    paySrvUrl = me.$api.payment.grdConfirmOnlinePay;
                }
                me.$http.post(paySrvUrl, parm
                ).then(function (response) {
                    if (response.data.code === 0) {
                        me.paySuccess(response.data.data);
                        // me.$alert('您已通过国烨网支付成功！', '操作提示', {
                        //     confirmButtonText: '确定',
                        //     callback: action => {
                        //         if (action === 'confirm') {
                        //             me.$router.push({path: '/my/payment/info', query: {paymentId: me.paymentId}});
                        //         }
                        //     }
                        // });
                    } else {
                        me.$alert('支付失败，' + response.data.message, '操作提示');
                        console.log(response.data.code + ' ' + response.data.message);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    },
    created () {
        // bankId zx 1   pa 2
        // const me = this;
        // 判断有无缓存;
        // this.bankId=2 为平安银行
        console.log(sessionStorage.getItem('amountHC'));
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
        this.guaranteed = this.$route.params.guaranteed;
        this.accountNumber = this.$route.params.accountNumber;
        this.fromFinance = Number(this.$route.params.fromFinance) === 1;
        this.deductFlag = Number(this.$route.params.deductFlag);
        this.customerPayMoney = Number(this.$route.params.customerPayMoney);
        this.deductAmount = Number(this.$route.params.deductAmount);
        this.pointMoney = Number(this.$route.params.pointMoney);
        this.$http.post(this.$api.payment.companyAccount, {}).then(res => {
            if (res.data.code === 0) {
                // zx
                console.log(this.bankId);
                // this.bankId = 2;
                for (let i = 0; i < res.data.data.length; i++) {
                    console.log(res.data.data[i]);
                    if (this.bankId === 1) {
                        // 中信
                        for (let j = 0; j < res.data.data.length; j++) {
                            if (res.data.data[i].bankId === 1) {
                                this.smallIcon = res.data.data[i].smallIcon;
                                this.accountBalance = res.data.data[i].actualBalance;
                            }
                        }
                    } else if (this.bankId === 2) {
                        for (let j = 0; j < res.data.data.length; j++) {
                            if (res.data.data[i].bankFlag === 1) {
                                this.smallIcon = res.data.data[i].smallIcon;
                                this.accountBalance = res.data.data[i].actualBalance;
                            }
                        }
                    }
                }
                // if (this.bankId === 1) {
                //     this.smallIcon = res.data.data[0].smallIcon;
                //     this.accountBalance = res.data.data[0].accountBalance;
                //     // console.log(res.data.data[0]);
                // }
                // if (this.bankId === 2) {
                //     // bankFlag
                //     for (let i = 0; i < res.data.data.length; i++) {
                //         console.log(res.data.data[i].alias);
                //         if (res.data.data[i].alias) {
                //
                //         }
                //     }
                //     // this.smallIcon = res.data.data[1].smallIcon;
                //     // this.accountBalance = res.data.data[1].accountBalance;
                // }
            }
        });
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
        }
    }
</style>
<style lang="scss" scoped>
    .payment{
        .center-box1{
            padding: 20px 0 0 10px;
        }
        .center-box2{
            padding: 20px 30px;
        }
        .mybtn{
            margin-top: 20px;
            text-align: right;
        }
    }
</style>
