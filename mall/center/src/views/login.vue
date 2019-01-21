<template>
    <div class="login-main">
        <div class="login-center">
            <div class="login-center-bgc" :style='"background-image: url(" + bgimag.center + ")"'>
                <div class="login-center-input-box">
                    <div class="login-center-password">密码登录</div>
                    <div class="login-center-error">{{ errorMessage }}</div>
                    <input class="login-center-input login-email login-no-member" type="text" placeholder="邮箱/会员名/手机号"
                           v-model="ruleForm.account">
                    <input class="login-center-input login-password login-no-member" type="password" placeholder="登录密码"
                           v-model="ruleForm.password" @keyup.13="submitLogin">
                    <button class="login-center-submit" @click="submitLogin">登录</button>
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark">
                                <input class="login-center-checkbox" type="checkbox" v-model="ruleForm.rememberMe"><span
                                class="login-no-member">记住我</span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark login-center-forget-passwords">
                                <router-link class="login-center-forget-password login-no-member"
                                             :to="{name: 'registerPassword'}">忘记密码?
                                </router-link>
                            </div>
                        </el-col>
                    </el-row>
                    <span class="login-no-member">还没有注册国烨会员?</span>
                    <router-link class="login-register" :to="{ path: '/register' }">立即注册</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store/index';

export default {
    name: 'login',
    data () {
        return {
            ruleForm: {
                account: '',
                password: '',
                rememberMe: false
            },
            bgimag: {
                center: require('../assets/images/logins.jpg')
            },
            fileList: [],
            errorMessage: ''
        };
    },
    created () {
        this.getLocal();
    },
    methods: {
        submitLogin () {
            if (this.ruleForm.rememberMe === true && this.ruleForm.account !== '') {
                localStorage.setItem('userNames', this.ruleForm.account);
            }
            console.log(this.ruleForm);
            this.$http.post(this.$api.login.login, this.ruleForm)
                .then(res => {
                    if (res.data.code === 0 && res.data.data) {
                        let userInfo = res.data.data;
                        localStorage.setItem('userInfo', JSON.stringify(res.data.data));
                        this.$socket.init(res.data.data.id, res.data.data.companyId);
                        store.commit('setUserinfo', res.data.data);
                        if (localStorage.getItem('jump')) {
                            history.go(-2);
                            localStorage.removeItem('jump');
                            return;
                        }
                        // if (document.referrer) {
                        //     history.go(-1);
                        // } else {
                        if (!userInfo.menuList[0]) {
                            this.$alert('未配置访问权限，请联系运营', '登陆出错');
                            // return false;
                        }
                        let navData = userInfo.menuList[0].resourceAccessList;
                        let frontUrl;
                        let firstlist = list => {
                            if (list[0].resourceAccessList.length === 0) {
                                frontUrl = list[0].frontUrl;
                            } else {
                                firstlist(list[0].resourceAccessList);
                            }
                        };
                        firstlist(navData);
                        let firstMenuData = {
                            isToFirst: true,
                            menudef: null
                        };
                        localStorage.setItem('firstMenu', JSON.stringify(firstMenuData));
                        this.$router.push({name: frontUrl});
                        // }
                        return;
                    }
                    this.$alert(res.data.message, '出错了');
                }).catch(() => {
                    console.log('出错了');
                });
        },
        getLocal () {
            if (localStorage.getItem('userNames')) {
                this.ruleForm.account = localStorage.getItem('userNames');
                this.ruleForm.rememberMe = true;
            }
        }
    }
};
</script>

<style scoped lang="scss">
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #FFFFFF;
    }

    .grid-content {
        min-height: 36px;
        width: 135px;
    }

    .login-main {
        width: 100%;
        min-width: 1200px;
    }

    .login-header {
        width: 100%;
        height: 58px;
        padding-left: 8.5%;
        line-height: 58px;
    }

    .login-header-logo {
        display: inline-block;
        min-width: 143px;
        width: 10%;
    }

    .login-header-ul {
        display: inline-block;
        min-width: 800px;
    }

    .login-header-ul li {
        float: left;
        margin-left: 40px;
    }

    .login-header-ul li a {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #333333;
    }

    .login-center-top {
        width: 100%;
        height: 74px;
    }

    .login-center {
        width: 100%;
        height: 540px;
        background: #FFFFFF;
    }

    .login-center-bgc {
        height: 540px;
        position: relative;
        background-position: center center;
        background-size: auto 100%;
        background-repeat: no-repeat;
    }

    .login-center-input-box {
        height: 350px;
        width: 320px;
        left: 50%;
        top: 50%;
        margin: -170px 0 0 279px;
        padding-left: 20px;
        background: #FFFFFF;
        border-radius: 4px;
        position: absolute;
    }

    h2 {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #000000;
    }

    .login-center-input {
        width: 280px;
        height: 35px;
        border: 1px solid #E7ECF1;
        border-radius: 4px;
        padding-left: 10px;
    }

    .login-email {
        margin-top: 28px;
    }

    .login-password {
        margin-top: 15px;
    }

    .login-center-submit {
        display: inline-block;
        width: 280px;
        height: 35px;
        background-image: linear-gradient(-225deg, #FF3511 0%, #FFA22F 100%);
        border-radius: 5px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        line-height: 35px;
        margin-top: 20px;
        cursor: pointer;
    }

    .login-center-password {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        padding-top: 15px;
    }

    .login-center-checkbox {
        margin-top: 15px;
    }

    .login-center-forget-password {
        display: inline-block;
        margin-top: 10px;
        margin-right: 5px;
    }

    .login-center-forget-passwords {
        text-align: right;
    }

    .login-no-member {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
    }

    .login-register {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #E0370F;
    }

    .clear {
        clear: both;
    }

    .login-footer {
        width: 530px;
        height: 20px;
        margin: auto;
        text-align: center;
    }

    .login-footer li {
        float: left;
        margin-left: 5px;
        line-height: 20px;
        line-height: 20px;
    }

    .login-footer li a {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #9E9E9E;
        height: 13px;
    }

    .login-footer-compony {
        text-align: center;
        width: 100%;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #9E9E9E;
    }

    .login-header-img {
        width: 141px;
        height: 35px;
        display: inline-block;
    }

    .login-center-error {
        top: 45px;
        width: 280px;
        position: absolute;
        height: 25px;
        color: red;
        font-size: 12px;
        padding-left: 10px;
    }
</style>
