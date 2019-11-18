<template>
    <div class="internalTransfer">
        <div class="new-title-public">
            内部转账
        </div>
        <p class="zjzh-title1"><i class="iconfont icon-zijinzhanghuicon mewmyicon"></i> <span class="mewmyfont">内部转账</span></p>
        <div class="my-list">
            <el-row>
                <el-col :span="3" class="list-left-span">付款账户</el-col>
                <el-col :span="8" style="padding-left: 10px">
                    <el-radio @change="radioChange(paymentRadio)" v-model="paymentRadio" label="2" class="list-right-span">商户子账户</el-radio>
                    <el-radio  @change="radioChange(paymentRadio)" v-model="paymentRadio" label="1" class="list-right-span">普通子账户</el-radio>
                </el-col>
                <el-col :span="8" class="list-right-span2">余额：{{paymentValue1|numToCash}}元</el-col>
            </el-row>
            <el-row class="list-top">
                <el-col :span="3" class="list-left-span">收款账户</el-col>
                <el-col :span="8" style="padding-left: 10px">
                    <el-radio @change="radioChange2(ReceivablesRadio)" v-model="ReceivablesRadio" label="2" class="list-right-span">商户子账户</el-radio>
                    <el-radio @change="radioChange2(ReceivablesRadio)" v-model="ReceivablesRadio" label="1" class="list-right-span">普通子账户</el-radio>
                </el-col>
                <el-col :span="8" class="list-right-span2">余额：{{paymentValue2|numToCash}}元</el-col>
            </el-row>
            <el-row class="list-top refather">
               <el-col :span="3" class="list-left-span">转账金额</el-col>
                <el-col :span="9" class="list-right-span">
                   <input placeholder="请输入" class="gy-input" v-model="tranAmt">
                </el-col>
                <span class="dwchild">元</span>
            </el-row>
            <el-row class="list-top refather">
                <el-col :span="3" class="list-left-span">手机验证码</el-col>
                <el-col :span="9" class="list-right-span">
                    <input v-model="messageCheckCode"  placeholder="请输入" class="gy-input">
                </el-col>
                <span class="dwchild" @click="getcodeClick()" :disabled="codeDisabled">{{verificationNumber}}</span>
                <span class="dwchild2">（手机尾号{{payAcct.mobileTail}}）</span>
            </el-row>
            <el-row class="el-row-verification">
                <el-col :span="3" class="list-left-span list-span-null"></el-col>
                <el-col :span="9" class="list-right-span list-span-code">注：验证码有效期120秒，请及时输入。</el-col>
            </el-row>
            <el-row>
                <div class="mybtn">
                    <button class="gy-button-extra" @click="submit">确定</button>
                    <button class="gy-button-normal" @click="cancel">取消</button>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'internalTransfer',
    data () {
        return {
            tranAmt: '',
            messageCheckCode: '',
            verificationNumber: '获取验证码',
            count: 0,
            codeDisabled: false, // 禁用按钮
            TIME_COUNT: 60,
            timer: null,
            paymentRadio: '', // 付款账户radio
            ReceivablesRadio: '', // 付款账户radio
            paymentValue1: '',
            paymentValue2: '',
            ReceivablesValue: '',
            receiveMobile: '',
            payAcct: [],
            receiveAcct: []
        };
    },
    created: function () {
        this.innerTransferInfo();
    },
    methods: {
        getcodeClick () {
            if (!this.tranAmt) {
                this.$message.error('转账金额不能为空');
                return;
            }
            if (this.count > 0) {
                this.codeDisabled = true;
            } else {
                this.retrieveVerifyCode();
                if (!this.timer) {
                    this.count = this.TIME_COUNT;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= this.TIME_COUNT) {
                            this.count--;
                            this.verificationNumber = '重新获取' + this.count + ' s';
                        } else {
                            this.verificationNumber = '获取验证码';
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000);
                }
            }
        },
        // 获取信息
        innerTransferInfo () {
            this.$http.post(this.$api.payment.innerTransferInfo, {
                'fundId': this.$route.query.bankAccId
            }).then(res => {
                if (res.data.code === 0) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].bankAccId === parseInt(this.$route.query.bankAccId)) {
                            this.payAcct = res.data.data[i];
                        } else {
                            this.receiveAcct = res.data.data[i];
                        }
                    }
                    this.radiofun();
                } else {
                    // res.$message(res.data);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        radiofun () {
            // 1是普通 2 是商户
            this.paymentRadio = this.payAcct.bankFlag.toString();
            this.paymentValue1 = this.payAcct.actualBalance;
            this.ReceivablesRadio = this.receiveAcct.bankFlag.toString();
            this.paymentValue2 = this.receiveAcct.actualBalance;
        },
        radioChange (v) {
            if (v !== this.payAcct.bankFlag) {
                let tempAcct = this.payAcct;
                this.payAcct = this.receiveAcct;
                this.receiveAcct = tempAcct;
            } else {
                let tempAcct = this.receiveAcct;
                this.receiveAcct = this.payAcct;
                this.payAcct = tempAcct;
            }
            this.radiofun();
        },
        radioChange2 (v) {
            if (v !== this.receiveAcct.bankFlag) {
                let tempAcct = this.payAcct;
                this.payAcct = this.receiveAcct;
                this.receiveAcct = tempAcct;
            } else {
                let tempAcct = this.receiveAcct;
                this.receiveAcct = this.payAcct;
                this.payAcct = tempAcct;
            }
            this.radiofun();
        },
        //    获取验证码
        retrieveVerifyCode () {
            this.$http.post(this.$api.payment.retrieveVerifyCode,
                {
                    'subAcctNo': this.payAcct.bankAccount,
                    'tranAmt': this.tranAmt,
                    'fundId': this.payAcct.bankAccId
                }
            ).then(res => {
                if (res.data.code === 0) {
                    this.messageOrderNo = res.data.data.messageOrderNo;
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        //    确定转出
        submit () {
            if (!this.tranAmt) {
                this.$message.error('转账金额不能为空');
                return;
            }
            if (!this.messageCheckCode) {
                this.$message.error('手机验证码不能为空');
                return;
            }
            this.$http.post(this.$api.payment.innerTransfer,
                {
                    'subAcctNo': this.payAcct.bankAccount,
                    'tranAmt': this.tranAmt,
                    'fundId': this.payAcct.bankAccId,
                    'messageCheckCode': this.messageCheckCode,
                    'messageOrderNo': this.messageOrderNo,
                    'outSubAcctNo': this.payAcct.bankAccount,
                    'outMemberCode': this.payAcct.usrCompanyId,
                    'outFundId': this.payAcct.bankAccId,
                    'inFundId': this.receiveAcct.bankAccId
                }
            ).then(res => {
                if (res.data.code === 0) {
                    this.$alert('内部转账成功', '提示', {type: 'success'})
                        .then(() => {
                            this.innerTransferInfo();
                            this.tranAmt = '';
                            this.messageCheckCode = '';
                            // this.$router.push({name: 'accountMoney'});
                        });
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        cancel () {
            this.$router.push({name: 'accountMoney'});
        }
    }
};
</script>

<style scoped  lang="scss">
    .internalTransfer{
        .my-title{
            margin-top: 20px;
        }
        .my-list{
            padding: 20px 30px;
        }
        .zjzh-title1{
            padding: 20px 10px 0 8px;
        }
        .mybtn{
            margin-top: 50px;
            text-align: right;
        }
        .refather{
            .dwchild{
                width: 95px;
                text-align: right;
                color: #999999;
            }
            .dwchild2{
               margin-left: 10px;
                color: #999999;
            }
            .dwchild:hover{
                cursor: pointer;
            }
        }
        .el-row-verification{
            margin-top: 5px;
        }
        .list-span-null{
            height: 25px;
        }
        .list-span-code{
            padding: 0 10px;
        }
    }
</style>
