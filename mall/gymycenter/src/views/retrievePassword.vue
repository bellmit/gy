<template>
    <div class="register-main-bagk">
        <div class="register-main">
            <h3><i class="iconfont icon-backpassword"></i><span class="register-logo">找回密码</span></h3>
            <form action="javascript:;">
                <div class="gy-form">
                    <div class="gy-form-group">
                        <span class="l">手机号码</span>
                        <input v-model="phoneNumber" type="text" placeholder="请输入注册所用的手机号">
                        <p class="gy-form-group-explain" v-bind:class="{active:isActivePhone}">{{verificationPhone}}</p>
                    </div>
                </div>
                <div class="gy-form">
                    <div class="gy-form-group">
                        <span class="l">图片验证码</span>
                        <input v-model="graphicVerificationCode" id="gy-form-group-img" type="text"
                               placeholder="请输入图形验证码">
                        <img  @click="refreshGraphic" v-if="graphicVerificationCodee" :src='"data:image/jpeg;base64," + graphicVerificationCodee'
                             class="gy-form-group-imgs">
                        <p class="gy-form-group-explain">看不清? <span class="changone" @click="refreshGraphic">点击换一张</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span v-bind:class="{active:isGraphicVerificationCode}">{{overVerificationG}}</span></p>
                    </div>
                </div>
                <div class="gy-form">
                    <div class="gy-form-group gy-form-phone">
                        <span class="l">短信验证码</span>
                        <input v-model="phoneVerificationCode" id="gy-form-group-phone" type="text"
                               placeholder="请输入您收到的验证码">
                        <span @click="getPhoneClick()" :disabled="codeDisabled" class="gy-form-group-phone-code">{{ verificationNumber }}</span>
                        <p class="gy-form-group-explain gy-form-group-explain-code" v-bind:class="{active:isPhoneVerificationCode}">{{overVerification}}</p>
                    </div>
                </div>
                <div class="gy-form gy-form-button">
                    <div class="gy-form-group gy-form-agrees gy-form-register">
                        <span class="l"></span>
                        <button class="gy-button-extra gy-submit" @click="submit()">提交</button>
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
            phoneVerificationCode: '',
            graphicVerificationCode: '',
            phoneNumber: '',
            graphicVerificationCodee: '',
            verificationPhone: '',
            verificationNumber: '获取验证码',
            overVerificationG: '',
            overVerification: '',
            // 是否禁用按钮
            codeDisabled: false,
            timer: null,
            isActivePhone: false,
            iGraphicVerificationCode: false,
            isGraphicVerificationCode: false,
            iPhoneVerificationCode: false,
            isPhoneVerificationCode: false,
            count: 0,
            TIME_COUNT: 60
        };
    },
    created () {
        this.getGraphic();
    },
    methods: {
        // 验证码倒计时
        getCode () {
            if (!this.timer) {
                this.count = this.TIME_COUNT;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= this.TIME_COUNT) {
                        this.count--;
                        this.verificationNumber = this.count + ' s';
                    } else {
                        this.codeDisabled = true;
                        this.verificationNumber = '获取验证码';
                        this.overVerification = '';
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000);
            }
        },
        refreshGraphic () {
            let that = this;
            that.$http.get(that.$api.register.graphic + '?a=' + new Date().getTime())
                .then(res => {
                    that.graphicVerificationCodee = res.data.data;
                });
        },
        getGraphic () {
            let that = this;
            that.$http.get(that.$api.register.graphic)
                .then(res => {
                    that.graphicVerificationCodee = res.data.data;
                });
        },
        getPhone () {
            let registerPhone = this.phoneNumber;
            let that = this;
            that.getCode();
            that.$http.get(that.$api.register.phoneNumber + '/' + registerPhone)
                .then(function (res) {
                }).catch(() => {
                    console.log('出错了');
                });
        },
        getPhoneClick () {
            if (this.phoneNumber === '') {
                this.verificationPhone = '请填写手机号';
                this.isActivePhone = true;
                return;
            }
            this.isActivePhone = false;
            if (this.count > 0) {
                this.overVerification = '验证码发送中,请耐心等待';
                return;
            }
            this.getPhone();
        },
        testPhone () {
            let that = this;
            that.$http.get(that.$api.register.testPhone + '/' + that.phoneVerificationCode)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.iPhoneVerificationCode = true;
                        that.overVerification = '';
                    } else {
                        that.isPhoneVerificationCode = true;
                        that.overVerification = res.data.message.slice(5, 19);
                    }
                });
        },
        testGraphic () {
            let that = this;
            that.$http.get(that.$api.register.testGraphic + '/' + that.graphicVerificationCode)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.iGraphicVerificationCode = true;
                        that.overVerificationG = '';
                    } else {
                        that.isGraphicVerificationCode = true;
                        that.overVerificationG = res.data.message.slice(5, 19);
                    }
                });
        },
        submit () {
            let that = this;
            if (that.phoneNumber === '') {
                that.verificationPhone = '不能为空';
                that.isActivePhone = true;
                return false;
            }
            if (that.graphicVerificationCode === '') {
                return;
            }
            if (that.phoneVerificationCode === '') {
                return;
            }
            if (that.verificationPhone !== '') {
                return;
            }
            if (that.iPhoneVerificationCode === false) {
                return;
            }
            if (that.iGraphicVerificationCode === false) {
                return;
            }
            // that.register.phone = that.phoneNumber;
            that.$router.push({name: 'registerPasswords',
                query: {
                    phone: that.phoneNumber,
                    phoneVerificationCode: that.phoneVerificationCode,
                    graphicVerificationCode: that.graphicVerificationCode
                }
            });
        }
    },
    watch: {
        phoneNumber: function (rule, value) {
            let that = this;
            if (rule === '') {
                that.isActivePhone = true;
                that.verificationPhone = '手机号不能为空';
            } else {
                that.isActivePhone = true;
                if (rule !== '') {
                    let reg = /^1[3456789]\d{9}$/;
                    if (!reg.test(rule)) {
                        that.verificationPhone = '请输入有效的手机号码';
                    } else {
                        that.isActivePhone = false;
                        that.verificationPhone = '';
                    }
                }
            }
        },
        graphicVerificationCode: function (rule, value) {
            let that = this;
            if (rule.length === 4) {
                that.testGraphic();
            }
        },
        phoneVerificationCode: function (rule, value) {
            let that = this;
            if (rule.length === 4) {
                that.testPhone();
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
                        width: 110px;
                        height: 40px;
                        background: #D1D2D5;
                        position: absolute;
                        top: 10px;
                        left: 566px;
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
                        left: 613px;
                        top:20px;
                    }
                }
            }
        }
    }
</style>
