<template>
  <div class="gy-login">
      <div class="login-header">
           <img src="../../assets/images/gylogo.png">
           <span>评级系统</span>
      </div>
      <div class="content">
        <img src="../../assets/images/logins.jpg" alt="">
        <div class="login_con">
          <div class="title">密码登录</div>
          <input type="text"  v-model="userName" placeholder="用户名" class="login-input">
          <input type="password" v-model="password" placeholder="密码" class="login-input">
           <button  @click.stop="toSubmit"  class="login-submit">登录</button>
        </div>
      </div>
        <!-- <div class="foot">
           <div>关于我们|联系我们|交易流程说明|发布供求信息|开通交易权限|企业文化|公司介绍|E</div>
      &copy; Copyright 2018 FastMall Rong360
    </div> -->
  </div>
</template>

<script>
// import {toLogin} from '../api/index';
export default {
    name: 'login',
    data () {
        return {
            userName: '',
            password: '',
            loading: false
        };
    },
    methods: {
        toSubmit: function () {
            let username = this.userName.trim('');
            let password = this.password.trim('');
            if (!this.userName) {
                this.$message('请输入用户名');
                return false;
            } else if (!this.password) {
                this.$message('请输入密码');
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
                        localStorage.setItem('userInfoClient', JSON.stringify(data));
                        me.$router.push({name: 'RatingManagement', query: {flag: 1}});
                    } else {
                        me.$message('错了哦，状态码【' + response.data.message + '】 请重新访问该页面');
                    }
                }).catch(e => {
                    setTimeout((e) => {
                        console.log(e);
                        me.$message(e.data.message);
                        me.loading = false;
                    }, 900);
                });
        }
    }
};

</script>

<style scoped lang="scss">
  .gy-login {
     width: 100%;
     height: 100%;
      .login-header {
        width: 100%;
        background-color: #fff;
        height: 59px;
        line-height: 59px;
        img {
            width: 146px;
            height: 34px;
            margin-left:25px ;
            vertical-align: middle;
          }
        span {
            margin-left:20px;
            display: inline-block;
            color: #333;
            font-size: 20px;
            font-weight: 700;
        }
      }
      .content {
        width: 100%;
        height: 540px;
        position: relative;
        img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        .login_con {
          width: 314px;
          height: 354px;
          background-color: #fff;
          border-radius: 10px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 100px;
          z-index: 99;
          .title {
            color: #666;
            font-size: 20px;
            font-weight: 700;
            margin: 23px 0 23px 17px;
          }
          .login-input {
            width: 280px;
            height: 35px;
            border: 1px solid #e7ecf1;
            border-radius: 4px;
            padding-left: 10px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #999;
            margin-left:17px;
            margin-bottom:20px ;
          }
          .login-submit {
            display: inline-block;
            width: 280px;
            height: 35px;
            background-image: linear-gradient(-225deg,#ff3511,#ffa22f);
            border-radius: 5px;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #fff;
            text-align: center;
            line-height: 35px;
            margin-left: 17px;
            cursor: pointer;
            border: none;
            outline: none;
          }
        }
      }
  }
</style>
