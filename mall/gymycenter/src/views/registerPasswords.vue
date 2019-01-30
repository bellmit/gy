<template>
    <div class="register-main-bagk">
        <div class="register-main">
            <h3><i class="iconfont icon-backpassword"></i><span class="register-logo">找回密码</span></h3>
            <form action="javascript:;">
                <div class="gy-form">
                    <div class="gy-form-group">
                        <span class="l">设置新密码</span>
                        <input v-model="password" type="password" placeholder="请设置登录密码">
                        <p class="gy-form-group-explain" v-bind:class="{active:isActivePassword}">{{verificationPassword}}</p>
                    </div>
                </div>
                <div class="gy-form">
                    <div class="gy-form-group">
                        <span class="l"></span>
                        <span class="gy-form-group-security">安全程度</span>
                        <span class="gy-form-group-security-highlight gy-form-group-security-highlight-first"
                              v-bind:class="{activeWeak:isActiveWeak}"></span>
                        <span class="gy-form-group-security-highlight"
                              v-bind:class="{activeMiddle:isActiveMiddle}"></span>
                        <span class="gy-form-group-security-highlight"
                              v-bind:class="{activeStrong:isActiveStrong}"></span>
                    </div>
                </div>
                <div class="gy-form">
                    <div class="gy-form-group">
                        <span class="l">重新输入</span>
                        <input v-model="passwords" type="password" placeholder="请设置登录密码">
                        <p class="gy-form-group-explain" v-bind:class="{active:isActivePasswords}">{{verificationPasswords}}</p>
                    </div>
                </div>
                <div class="gy-form gy-form-button">
                    <div class="gy-form-group gy-form-agrees gy-form-register">
                        <span class="l"></span>
                        <button class="gy-button-extra gy-submit" @click="registerPassword()">提交</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'register',
    data () {
        return {
            password: '',
            passwords: '',
            isActiveWeak: false,
            isActiveMiddle: false,
            isActiveStrong: false,
            verificationPassword: '包含大小写字母和数字，不能使用特殊字符，8-20个字符',
            verificationPasswords: '包含大小写字母和数字，不能使用特殊字符，8-20个字符',
            isActivePassword: false,
            isActivePasswords: false,
            phone: '',
            graphicVerificationCode: '',
            phoneVerificationCode: '',
            rePassword: {
                userType: 0
            }
        };
    },
    created () {
        this.phone = this.$route.query.phone;
        this.phoneVerificationCode = this.$route.query.phoneVerificationCode;
        this.graphicVerificationCode = this.$route.query.graphicVerificationCode;
        console.log(this.phone);
    },
    methods: {
        registerPassword () {
            let that = this;
            if (that.password === '') {
                that.verificationPassword = '不能为空';
                that.isActivePassword = true;
                return;
            }
            if (that.passwords === '') {
                that.verificationPasswords = '不能为空';
                that.isActivePasswords = true;
                return;
            }
            if (that.verificationPassword !== '') {
                return;
            }
            if (that.verificationPasswords !== '') {
                return;
            }
            that.rePassword.phone = that.phone;
            that.rePassword.newPassword = that.password;
            that.rePassword.newPassword2 = that.passwords;
            that.rePassword.phoneVerificationCode = that.phoneVerificationCode;
            that.rePassword.graphicVerificationCode = that.graphicVerificationCode;
            that.$http.post(that.$api.register.password, that.rePassword)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.$router.push({name: 'registerFish'});
                    } else {
                        that.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                });
        }
    },
    watch: {
        password: function (rule, value) {
            let that = this;
            if (rule === '') {
                that.isActivePassword = true;
                that.verificationPassword = '必填项';
            } else {
                that.isActivePassword = true;
                if (rule.length < 8 || rule.length > 20) {
                    that.verificationPassword = '请填写8到20个字符';
                    that.isActiveWeak = false;
                    that.isActiveMiddle = false;
                    that.isActiveStrong = false;
                } else if (/^[0-9]+$/.test(rule)) {
                    that.verificationPassword = '不能全是数字';
                } else {
                    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
                    if (!reg.test(rule)) {
                        that.verificationPassword = '包含大小写字母和数字，不能使用特殊字符，8-20个字符';
                    } else {
                        that.isActivePassword = false;
                        that.verificationPassword = '';
                        if (rule.length >= 8 && rule.length <= 12) {
                            that.isActiveWeak = true;
                        } else if (rule.length > 12 && rule.length <= 15) {
                            that.isActiveMiddle = true;
                        } else {
                            that.isActiveStrong = true;
                        }
                    }
                }
            }
        },
        passwords: function (rule, value) {
            let that = this;
            console.log(that.passwords);
            if (rule === '') {
                that.isActivePasswords = true;
                that.verificationPasswords = '必填项';
            } else {
                that.isActivePasswords = true;
                if (rule.length < 8 || rule.length > 20) {
                    that.verificationPasswords = '请填写8到20个字符';
                } else if (/^[0-9]+$/.test(rule)) {
                    that.verificationPasswords = '不能全是数字';
                } else {
                    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
                    if (!reg.test(rule)) {
                        that.verificationPasswords = '包含大小写字母和数字，不能使用特殊字符，8-20个字符';
                    } else {
                        if (that.password !== that.passwords) {
                            that.isActivePasswords = true;
                            that.verificationPasswords = '两次输入的密码不一致，请重新输入';
                        } else {
                            that.isActivePasswords = false;
                            that.verificationPasswords = '';
                        }
                    }
                }
            }
        }
    }
};
</script>
<style lang="scss" scoped>
    .register-main-bagk {
        width: 100%;
        height: 670px;
        background: #FFF;
        margin: 25px 0 66px 0;
        position: relative;
        .register-main {
            left: 50%;
            margin-left: -600px;
            height: auto;
            width: 1200px;
            position: absolute;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: $border-radius-base;
            .register-logo {
                display: inline-block;
                margin-left: 14px;
            }
            .gy-form-button {
                margin-bottom: 20px;
            }
            .gy-form {
                padding: 0;
                input {
                    height: 40px;
                }
                .gy-form-phone {
                    position: relative;
                }
                .gy-form-agrees {
                    position: relative;
                }
                .gy-form-group {
                    width: 100%;
                    input[type=text] {
                        width: 500px !important;
                        margin-left: 36px;
                    }
                    input[type=password] {
                        width: 500px !important;
                        margin-left: 36px;
                    }
                    .active {
                        color: red;
                    }
                    .activeWeak {
                        background-color: green !important;
                    }
                    .activeMiddle {
                        background-color: green !important;
                    }
                    .activeStrong {
                        background-color: green !important;
                    }
                    input[type=password] {
                        width: 500px !important;
                        margin-left: 30px;
                    }
                    #gy-form-group-phone {
                        width: 381px !important;
                    }
                    #gy-form-group-img {
                        width: 370px !important;
                    }
                    .changone {
                        cursor: pointer;
                    }
                    .gy-form-group-imgs {
                        display: inline-block;
                        width: 105px;
                        height: 40px;
                        margin-left: 22px;
                        border: 1px solid $color-border;
                    }
                    .gy-form-group-security {
                        margin-left: 30px;
                        display: inline-block;
                        font-size: $body-font-size;
                        color: $color-main;
                    }
                    .gy-form-group-phone-code {
                        display: inline-block;
                        width: 120px;
                        height: 40px;
                        background: #D1D2D5;
                        position: absolute;
                        top: 10px;
                        left: 512px;
                        text-align: center;
                        line-height: 40px;
                        cursor: pointer;
                    }
                    .gy-form-group-explain-code {
                        margin-left: 165px !important;
                    }
                    .gy-form-group-security-highlight {
                        display: inline-block;
                        width: 40px;
                        height: 8px;
                        background: #D8D8D8;
                        margin-left: 8px;
                        border-radius: $border-radius-small;
                    }
                    .gy-form-group-security-highlight-first {
                        margin-left: 15px;
                    }
                    .gy-form-group-agreement {
                        font-size: $body-font-size;
                        color: red;
                    }
                    .gy-form-upgrade {
                        color: #4A90E2;
                        margin-left: 29px;;

                    }
                    .l {
                        display: inline-block;
                        color: $color-main;
                        font-size: 16px;
                        font-family: $body-font-family;
                        width: 120px;
                        height: 22px;
                        padding-left: 40px;
                    }
                    .gy-form-group-explain {
                        display: inline-block;
                        margin-left: 33px;
                    }
                    .gy-form-agree {
                        display: inline-block;
                        position: absolute;
                        top: 7px;
                    }
                    .gy-form-group-checkbox {
                        width: 16px;
                        height: 16px;
                        margin-left: 27px;
                        margin-right: 16px;
                    }
                    .gy-form-register {
                        position: relative;
                    }
                    .gy-submit {
                        position: absolute;
                        left: 568px;
                    }
                }
            }
        }
    }
</style>
