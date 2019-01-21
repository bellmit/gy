<template>
  <div class="g-login" id="login">
    <div class="m-login" :class="{loading: loading}">
      <div class="logo">
        <h1>评级管理系统</h1>
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
// import {toLogin} from '../api/index';
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
                },
                {
                    userName: 'LeeManager',
                    userId: 2,
                    groupId: 0

                },
                {
                    userName: 'LiuManager',
                    userId: 3,
                    groupId: 0
                },
                {
                    userName: 'TongDirector',
                    userId: 4,
                    groupId: 1
                },
                {
                    userName: 'LeeGeneralManager',
                    userId: 5,
                    groupId: 2
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
            let username = this.userName.trim('');
            let password = this.password.trim('');
            if (!this.userName) {
                this.errMsg = '请输入用户名';
            } else if (!this.password) {
                this.errMsg = '请输入密码';
            }
            if (this.errMsg) {
                return false;
            }
            this.loading = true;
            const me = this;
            me.$http.post(me.$api.user.login, {username, password})
                .then(function (response) {
                    me.loading = false;
                    if (response.data.success) {
                        var data = response.data.data;
                        data.userId = data.id;
                        localStorage.setItem('userInfo', JSON.stringify(data));
                        let menuList = data.menuList[0].resourceAccessList || [];
                        // console.log(menuList);
                        // menuList = menuList.filter((item) => {
                        //     return item.name === '服务端评级菜单';
                        // });
                        me.$router.push({name: menuList[0].frontUrl});
                    } else {
                        me.$message('错了哦，状态码【' + response.data.message + '】 请重新访问该页面');
                    }
                }).catch(e => {
                    setTimeout(() => {
                        console.log(e);
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
