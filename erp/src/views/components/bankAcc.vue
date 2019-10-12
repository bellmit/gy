<template>
    <div class="addbanks">
        <el-dialog width="500px" class="order-dialoged" title="新增银行账户信息"
            :visible.sync="addBank"
            :before-close="closeDlg"
            :close-on-click-modal = "false">
            <!--<div class="order-apply"><h3>新增银行账户信息</h3></div>-->
            <div class="gy-form-group" style="width: 100%">
                <span class="l"><i>*</i>账号名称</span>
                <input type="text" v-model="creatBank.accountName" placeholder="请输入账号名称">
            </div>
            <div class="gy-form-group" style="width: 100%">
                <span class="l"><i>*</i>银行名称</span>
                <input type="text" v-model="creatBank.bankName" placeholder="请输入银行名称">
            </div>
            <div class="gy-form-group" style="width: 100%">
                <span class="l"><i>*</i>开户行名称</span>
                <input type="text" v-model="creatBank.depositBank" placeholder="请输入开户行名称">
            </div>
            <div class="gy-form-group" style="width: 100%">
                <span class="l"><i>*</i>银行账号</span>
                <input type="text" v-model="creatBank.companyAccount" placeholder="请输入银行账号">
            </div>
            <div style="clear: both"></div>
            <div class="gy-button" style="padding-right: 30px;padding-bottom: 30px;padding-top: 19px;">
                <button class="gy-button-normal" style="margin-right: 10px;" @click="closeDlg()">取消</button>
                <button class="gy-button-extra" @click="saveBankAcc()">保存</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'bankAcc',
    data () {
        return {
            addBank: false,
            creatBank: {
                companyId: null,
                accountName: null,
                bankName: null,
                companyAccount: null,
                depositBank: null
            }
        };
    },
    methods: {
        saveBankAcc () {
            this.$http.post(this.$api.payment.addBankInfo, this.creatBank).then((res) => {
                if (res.data.code === 0) {
                    // 返回到调用端
                    this.addBank = false;
                    this.creatBank.id = res.data.data.id;
                    let obj = res.data.data;
                    this.$emit('onSaveAccInfo', obj);
                    // console.log(obj);
                    this.creatBank.id = null;
                    this.creatBank.companyId = null;
                    this.creatBank.accountName = null;
                    this.creatBank.bankName = null;
                    this.creatBank.companyAccount = null;
                    this.creatBank.depositBank = null;
                } else {
                    this.$alert(res.data.code + ' ' + res.data.message);
                }
            });
        },
        closeDlg () {
            this.addBank = false;
            this.$emit('onSaveAccInfo', null);
            this.creatBank.companyId = null;
            this.creatBank.accountName = null;
            this.creatBank.bankName = null;
            this.creatBank.companyAccount = null;
            this.creatBank.depositBank = null;
        }
    }};
</script>
<style lang="scss">
    .addbanks{
        .el-dialog__header{
            padding: 0;
            height: 35px;
            line-height: 35px;
            margin-left: 16px;
            .el-dialog__title{
                font-size: 16px;
                color: #333;
                font-weight: bold;
            }
            .el-dialog__headerbtn{
                top: 10px;
                right: 16px;
            }
        }
        .el-dialog__body{
            padding: 0;
        }
        .gy-button{
            margin-top: 5px;
            text-align: right;
            padding-right: 40px;
        }
        .gy-form-group{
            padding: 8px 30px 8px 120px;
            .l{
                i{
                    color: red;
                }
            }
        }
    }
</style>
