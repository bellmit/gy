<template>
    <div class="g-login" id="login">
        <div class="m-login" :class="{loading: loading}">
            <div class="logo">
                <h1>管理系统</h1>
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
            Copyright 2018 FastMall Rong360
        </div>
    </div>
</template>
<script>
export default {
    name: 'login',
    data () {
        return {
            errMsg: '',
            userName: 'admin',
            password: 'Aa123456',
            loading: false
        };
    },
    methods: {
        clearMsg () {
            this.errMsg = '';
        },
        toSubmit: function () {
            this.errMsg = '';
            let userName = this.userName;
            let password = this.password;
            if (!this.userName) {
                this.errMsg = '请输入用户名';
            } else if (!this.password) {
                this.errMsg = '请输入密码';
            }
            if (this.errMsg) {
                return false;
            }
            // this.loading = true;
            let _this = this;
            this.$http.post(this.$api.user.login, {
                'account': userName,
                'password': password
            }).then((data) => {
                if (data.data.code === 0) { // member:personal:update
                    // 返回空数据前端添加空对象避免出错。
                    if (data.data.data.menuList.length < 1) { data.data.data.menuList.push({}); }
                    localStorage.setItem('userInfo', JSON.stringify(data.data.data));
                    localStorage.setItem('menus', JSON.stringify(data.data.data.menuList[0].resourceAccessList || []));
                    localStorage.setItem('permissions', JSON.stringify(data.data.data.permissions || []));
                    this.$router.push({name: 'dataStatistics'});
                } else {
                    // _this.$message(data.data.message);
                    _this.$message(data.data.message);
                    // _this.loading = false;
                }
            }).catch((e) => {
                setTimeout(() => {
                    this.errMsg = e;
                    this.loading = false;
                }, 900);
            });
        }
    }
};
</script>
<style scoped lang="scss">
</style>
