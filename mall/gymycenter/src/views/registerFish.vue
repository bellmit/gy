<template>
    <div class="register-main-bagk">
        <div class="register-main">
            <h3><i class="iconfont icon-backpassword"></i><span class="register-logo">找回密码</span></h3>
            <div class="register-teain">
                <span><i class="iconfont icon-fishRegister"></i></span><br>
                <span class="register-teain-span">新密码设置成功!</span><br>
                <span>请牢记您的新密码，以后将使用新密码登录</span><br>
                <button class="gy-button-extra register-fish" @click="registerLogin">立即登录</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'registerFish',
    methods: {
        registerLogin () {
            this.$router.push({name: 'login'});
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
            .register-teain {
                font-family: $body-font-family;
                text-align: center;
                .icon-fishRegister {
                    font-size: 30px;
                    color: $color-highlight;
                }
                .register-teain-fister {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                    text-align: center;
                    line-height: 30px;
                    background-color: red;
                }
                .register-fish {
                    margin-top: 68px;
                }
                .register-teain-span {
                    font-weight: bold;
                }
            }
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
