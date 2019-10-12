<template>
    <div class="g-login" id="login">
        <div class="m-login" :class="{loading: loading}">
            <div class="logo">
                <h1>ERP系统</h1>
                <h2>用户中心</h2>
                <span>LOGIN IN</span>
            </div>
            <div>
                <div class="m-tips error" v-if="errMsg" @click.stop>{{errMsg}}</div>
                <div class="m-form" @click="clearMsg" @keydown.enter="toSubmit">
                    <div class="form-group">
                        <label>用户名</label><br>
                        <input type="text" v-model="userName" style="width: 100%;line-height: 25px;">
                    </div>
                    <div class="form-group">
                        <label>密码</label><br>
                        <input type="password" v-model="password" style="width: 100%;line-height: 25px;">
                    </div>
                    <div v-if="!loading">
                        <button class="gy-button-normal" style="width: 100%;"  @click.stop="toSubmit">登录</button>
                    </div>
                    <div class="g-loading" v-if="loading">
                        <div class="bar"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            &copy; Copyright 2018 FastMall Rong360
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            errMsg: '',
            userName: '',
            password: '',
            loading: false,
            userList: [
                {
                    userName: 'WangManager',
                    userId: 1,
                    groupId: 0
                }
            ]
        };
    },
    methods: {
        clearMsg () {
            this.errMsg = '';
        },
        toSubmit: function () {
            this.errMsg = '';
            if (!this.userName) {
                this.errMsg = '请输入用户名';
                return false;
            }
            var ruleForm = {
                account: this.userName,
                password: this.password
            };
            this.$http.post(this.$api.login.login, ruleForm)
                .then(res => {
                    if (res.data.code === 0) {
                        let resmberUser = res.data.data;
                        if (res.data.data) {
                            if (!resmberUser.menuList[0]) {
                                this.$alert('未配置访问权限，请联系运营', '登录出错');
                                // return false;
                            }
                            localStorage.setItem('userInfo', JSON.stringify(resmberUser));
                        }
                        this.$router.push({name: 'home'});
                        return;
                    }
                    this.$alert(res.data.message, '出错了');
                }).catch(() => {
                    // this.$message({
                    //     message: '网络异常',
                    //     type: 'error'
                    // });
                    this.$router.push({name: 'login'});
                });
        }
    }
};
</script>

<style scoped lang="scss">
</style>
