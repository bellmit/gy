<!--
    安全管理
-->
<template>
    <div>
         <div class="new-title-public">
            安全管理
        </div>
    <div class="security-manage">
        <el-tabs v-model="tabActive">
            <el-tab-pane label="修改登录密码" name="login">
                <el-form :model="loginForm" status-icon ref="loginForm" :label-width="labelWidth">
                    <el-form-item label="当前密码" prop="password">
                        <el-input type="password" v-model="loginForm.password" placeholder="请输入当前密码"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="loginForm.newPassword" placeholder="请输入新密码"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="newPassword2">
                        <el-input type="password" v-model="loginForm.newPassword2" placeholder="请输入确认新密码"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="security-manage-btn-group">
                        <div class="gy-form-button">
                            <button type="button" class="gy-button-extra" @click="submitForm('loginForm')">提交</button>
                            <button type="button" class="gy-button-normal" @click="resetForm('loginForm')">重置</button>
                        </div>
                    </el-form-item>
                </el-form>
                <div class="security-manage-lefttext">
                    <span>温馨提示：</span>为了确保交易顺利，请牢记您的密码。
                </div>
            </el-tab-pane>
            <el-tab-pane v-if="permissions" label="修改交易密码" name="second">
                <el-form :model="tradeForm" status-icon ref="tradeForm" :label-width="labelWidth">
                    <el-form-item label="交易密码">
                        <el-radio v-model="enableTradePwd" label="1">启用</el-radio>
                        <el-radio v-model="enableTradePwd" label="0">停用</el-radio>
                    </el-form-item>
                    <el-form-item label="修改密码">
                        <el-radio v-model="isModify" label="1">是<span style="visibility: hidden;">是</span></el-radio>
                        <el-radio v-model="isModify" label="0">否</el-radio>
                    </el-form-item>
                    <template v-if="isModify === '1'">
                        <el-form-item v-if="isHasTradePSW" label="当前密码" prop="password">
                            <el-input type="password" v-model="tradeForm.oldTradePwd" placeholder="请输入当前密码"
                                      auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPassword">
                            <el-input type="password" v-model="tradeForm.newTradePwd" placeholder="请输入新密码"
                                      auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认新密码" prop="newPassword2">
                            <el-input type="password" v-model="tradeForm.newTradePwd2" placeholder="请输入确认新密码"
                                      auto-complete="off"></el-input>
                        </el-form-item>
                    </template>
                    <div class="security-manage-lefttext2">
                        <span>温馨提示：</span>如果启用交易密码控制，
                        在支付和资金转出时要求输入交易密码进行验证。为了确保交易顺利，请牢记您的密码。
                       </div>
                    <el-form-item class="security-manage-btn-group">
                        <div class="gy-form-button">
                            <button type="button" class="gy-button-extra" @click="submitTrade">提交</button>
                            <button type="button" class="gy-button-normal" @click="resetForm('tradeForm')">重置</button>
                        </div>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改签约密码" name="third" v-if="permissions1">
                <el-form :model="ContractForm" status-icon ref="ContractForm" :label-width="labelWidth">
                    <el-form-item label="签约密码">
                        <el-radio v-model="enableContractPwd" label="1">启用</el-radio>
                        <el-radio v-model="enableContractPwd" label="0">停用</el-radio>
                        <span v-show="enableContractPwd === '1'"></span>
                    </el-form-item>
                    <el-form-item label="修改密码">
                        <el-radio v-model="isModify1" label="1">是<span style="visibility: hidden;">是</span></el-radio>
                        <el-radio v-model="isModify1" label="0">否</el-radio>
                    </el-form-item>
                    <template v-if="isModify1 === '1'">
                        <el-form-item v-if="isHasContractPSW" label="当前密码" prop="password">
                            <el-input type="password" v-model="ContractForm.oldContractPwd" placeholder="请输入当前密码"
                                      auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPassword">
                            <el-input type="password" v-model="ContractForm.newContractPwd" placeholder="请输入新密码"
                                      auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认新密码" prop="newPassword2">
                            <el-input type="password" v-model="ContractForm.newContractPwd2" placeholder="请输入确认新密码"
                                      auto-complete="off"></el-input>
                        </el-form-item>
                    </template>
                    <div class="security-manage-lefttext2">
                        <span>温馨提示：</span>如果启用签约密码控制，
                        在合同签约时要求输入签约密码进行验证。为了确保交易顺利，请牢记您的密码。
                    </div>
                    <el-form-item class="security-manage-btn-group">
                        <div class="gy-form-button">
                            <button type="button" class="gy-button-extra" @click="submitContract">提交</button>
                            <button type="button" class="gy-button-normal" @click="resetForm('ContractForm')">重置</button>
                        </div>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: 'securityManage',
    data () {
        return {
            id: '',
            tabActive: 'login',
            labelWidth: '100px',
            isModify: '0',
            isModify1: '0',
            companyId: '',
            enableTradePwd: '0',
            enableContractPwd: '0',
            isHasTradePSW: false,
            isHasContractPSW: false,
            loginForm: {
                id: '',
                newPassword: '',
                newPassword2: '',
                password: ''
            },
            tradeForm: {
                newTradePwd: '',
                newTradePwd2: '',
                oldTradePwd: ''
            },
            ContractForm: {
                newContractPwd: '',
                newContractPwd2: '',
                oldContractPwd: ''
            },
            permissions: false,
            permissions1: false
        };
    },
    created () {
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
            this.companyId = userInfo.companyId;
            this.id = userInfo.id;
            let val = 'bank:pay:info';
            let val1 = 'sign:password:update';
            for (let i = 0; i < userInfo.permissions.length; i++) {
                if (val === userInfo.permissions[i]) {
                    this.permissions = true;
                }
                if (val1 === userInfo.permissions[i]) {
                    this.permissions1 = true;
                }
            }
        }
        this.getTradePwd();
        this.getContractPwd();
    },
    methods: {
        submitForm (formName) {
            if (!this[formName].password) {
                this.$message({
                    type: 'error',
                    message: '请输入当前密码'
                });
                return;
            } else if (!this[formName].newPassword) {
                this.$message({
                    type: 'error',
                    message: '请输入新密码'
                });
                return;
            } else if (!this[formName].newPassword2) {
                this.$message({
                    type: 'error',
                    message: '请输入确认新密码'
                });
                return;
            } else if (this[formName].newPassword !== this[formName].newPassword2) {
                this.$message({
                    type: 'error',
                    message: '新密码和确认新密码不一致'
                });
                return;
            } else if (this[formName].password === this[formName].newPassword) {
                this.$message({
                    type: 'error',
                    message: '密码和新密码一致，请修改'
                });
                return;
            }
            if (formName === 'loginForm') {
                this.submitLogin();
            } else {
            }
        },
        submitLogin () {
            let query = Object.assign(this.loginForm, {id: this.id});
            this.$http.post(this.$api.account.resetLoginPwd, query).then(res => {
                if (res.data.code === 0) {
                    this.$message({
                        type: 'info',
                        message: '修改成功'
                    });
                    this.resetForm('loginForm');
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        },
        submitTrade () {
            let query;
            if (!this.isHasTradePSW && this.isModify === '0') {
                this.$message({
                    type: 'error',
                    message: '请设置交易密码后再启用或停用'
                });
                return;
            }
            if (this.isModify === '0') {
                query = {
                    isModify: this.isModify,
                    companyId: this.companyId,
                    oldTradePwd: '',
                    newTradePwd: '',
                    newConfirmTradePwd: '',
                    enableTradePwd: this.enableTradePwd
                };
            } else {
                if (this.isHasTradePSW && !this.tradeForm.oldTradePwd) {
                    this.$message({
                        type: 'error',
                        message: '请输入当前密码'
                    });
                    return;
                }
                if (!this.tradeForm.newTradePwd) {
                    this.$message({
                        type: 'error',
                        message: '请输入新密码'
                    });
                    return;
                } else if (!this.tradeForm.newTradePwd2) {
                    this.$message({
                        type: 'error',
                        message: '请输入确认新密码'
                    });
                    return;
                } else if (this.tradeForm.newTradePwd !== this.tradeForm.newTradePwd2) {
                    this.$message({
                        type: 'error',
                        message: '新密码和确认新密码不一致'
                    });
                    return;
                } else if (this.tradeForm.oldTradePwd === this.tradeForm.newTradePwd) {
                    this.$message({
                        type: 'error',
                        message: '密码和新密码一致，请修改'
                    });
                    return;
                }
                query = {
                    isModify: this.isModify,
                    companyId: this.companyId,
                    newConfirmTradePwd: this.tradeForm.newTradePwd2,
                    oldTradePwd: this.tradeForm.oldTradePwd,
                    newTradePwd: this.tradeForm.newTradePwd,
                    enableTradePwd: this.enableTradePwd
                };
            }
            this.$http.post(this.$api.account.resetTradePwd, query).then(res => {
                if (res.data.code === 0) {
                    this.$message({
                        type: 'info',
                        message: '修改成功'
                    });
                    this.resetForm('tradeForm');
                    this.isHasTradePSW = true;
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        },
        submitContract () {
            let query;
            if (!this.isHasContractPSW && this.isModify1 === '0') {
                this.$message({
                    type: 'error',
                    message: '请设置交易密码后再启用或停用'
                });
                return;
            }
            if (this.isModify1 === '0') {
                query = {
                    isModify: this.isModify1,
                    companyId: this.companyId,
                    oldContractPwd: '',
                    newContractPwd: '',
                    newConfirmContractPwd: '',
                    enableContractPwd: this.enableContractPwd
                };
            } else {
                if (this.isHasContractPSW && !this.ContractForm.oldContractPwd) {
                    this.$message({
                        type: 'error',
                        message: '请输入当前密码'
                    });
                    return;
                }
                if (!this.ContractForm.newContractPwd) {
                    this.$message({
                        type: 'error',
                        message: '请输入新密码'
                    });
                    return;
                } else if (!this.ContractForm.newContractPwd2) {
                    this.$message({
                        type: 'error',
                        message: '请输入确认新密码'
                    });
                    return;
                } else if (this.ContractForm.newContractPwd !== this.ContractForm.newContractPwd2) {
                    this.$message({
                        type: 'error',
                        message: '新密码和确认新密码不一致'
                    });
                    return;
                } else if (this.ContractForm.oldContractPwd === this.ContractForm.newContractPwd) {
                    this.$message({
                        type: 'error',
                        message: '密码和新密码一致，请修改'
                    });
                    return;
                }
                query = {
                    isModify: this.isModify1,
                    companyId: this.companyId,
                    newConfirmContractPwd: this.ContractForm.newContractPwd2,
                    oldContractPwd: this.ContractForm.oldContractPwd,
                    newContractPwd: this.ContractForm.newContractPwd,
                    enableContractPwd: this.enableContractPwd
                };
            }
            this.$http.post(this.$api.account.resetContractPwd, query).then(res => {
                if (res.data.code === 0) {
                    this.$message({
                        type: 'info',
                        message: '修改成功'
                    });
                    this.resetForm('ContractForm');
                    this.isHasContractPSW = true;
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        },
        resetForm (formName) {
            Object.keys(this[formName]).forEach(key => {
                this[formName][key] = '';
            });
        },
        getTradePwd () {
            this.$http.get(this.$api.account.isHasTradePwd).then(res => {
                if (res.data.code === 0) {
                    if (res.data.data.hasTradePwd) {
                        this.isHasTradePSW = true;
                    }
                    this.enableTradePwd = res.data.data.enableTradePwd.toString();
                }
            });
        },
        getContractPwd () {
            this.$http.get(this.$api.account.isHasContractPwd).then(res => {
                if (res.data.code === 0) {
                    if (res.data.data.hasContractPwd) {
                        this.isHasContractPSW = true;
                    }
                    this.enableContractPwd = res.data.data.enableContractPwd.toString();
                }
            });
        }
    }
};
</script>
<style lang="scss">
    .security-manage {
        color: #999;
        .el-tabs__item.is-active {
            color: $color-a-active;
        }
        .el-tabs__active-bar {
            background-color: red;
        }
         .el-form {
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
             .el-form-item {
                margin-bottom:0;
                flex: 0 0 50%;
                box-sizing: border-box;
           }
            .el-input {
                padding-right:30px;
            }
         }
        .el-form-item__content {
        //    line-height: 50px;
        }
        .el-tabs__content {
            padding:0 0 0 15px;
        }
    }
</style>
<style lang="scss" scoped>
    .security-manage {
        padding: 16px 3px 16px 16px;
        .gy-form-button {
            padding-right:0 ;
            button:nth-child(2) {
                margin-left:10px ;
                margin-right:30px ;
            }
        }
        .security-manage-lefttext{
            position: absolute;
            top: 85px;
            left: 16px;
            span{
                color: #EEA443
            }
        }
        .security-manage-lefttext2{
            margin-top: 5px;
            span{
                color: #EEA443
            }
        }
    }

    .security-manage-btn-group {
        flex: 0 0 100% !important;
        align-content:flex-end;
        text-align: right;
        height: 110px;
        margin-top: 30px;
    }

    .tips {
        margin-bottom: 10px;
        color: $color-a-active;

        i {
            padding-right: 10px;
        }
    }
</style>
