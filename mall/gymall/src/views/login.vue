<template>
    <div class="login-main">
        <div class="login-header">
            <div class="login-header-logo">
                <img src="" alt="">
                <span>大宗交易商品一站式跨境电商平台</span>
            </div>
            <ul class="login-header-ul">
                <li id="gy-header-two-center-first">
                    <i class="iconfont icon-home-page"></i>
                    <a href="">首页</a>
                </li>
                <li>
                    <i class="iconfont icon-shopping-mall"></i>
                    <a href="">商城</a>
                    <i class="iconfont icon-down-arrow"></i>
                </li>
                <li>
                    <i class="iconfont icon-storage"></i>
                    <a href="">仓储</a>
                </li>
                <li>
                    <i class="iconfont icon-logistics"></i>
                    <a href="">物流</a>
                </li>
            </ul>
            <div class="clear"></div>
        </div>
        <div class="login-center">
            <div class="login-center-input-box">
                <div class="login-center-password">密码登录</div>
                <div class="login-center-error"></div>
                <input class="login-center-input login-email login-no-member" type="text" placeholder="邮箱/会员名/手机号" v-model="ruleForm.account">
                <input class="login-center-input login-password login-no-member" type="text" placeholder="登录密码" v-model="ruleForm.password">
                <div class="login-center-submit" @click="submit">登录</div>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-dark">
                            <input class="login-center-checkbox" type="checkbox" v-model="ruleForm.rememberMe"><span class="login-no-member">记住我</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-dark">
                            <span class="login-center-forget-password login-no-member">忘记密码?</span><br>
                        </div>
                    </el-col>
                </el-row>
                <span class="login-no-member">还没有注册国烨会员?</span><router-link class="login-register" :to="{ path: '/register' }">立即注册</router-link>
            </div>
        </div>
        <ul class="login-footer">
            <li><a>关于我们</a></li>
            <li class="login-footer-line"><a>联系我们</a></li>
            <li class="login-footer-line"><a>交易流程说明</a></li>
            <li class="login-footer-line"><a>发布供求信息</a></li>
            <li class="login-footer-line"><a>开通交易权限</a></li>
            <li class="login-footer-line"><a>企业文化</a></li>
            <li class="login-footer-line"><a>公司介绍</a></li>
            <li class="login-footer-line"><a>English Site</a></li>
        </ul>
        <div class="clear"></div>
        <div class="login-footer-compony">copyright&nbsp;2015_2017&nbsp;上海国烨跨境电子商务有限公司</div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            ruleForm: {
                account: '',
                password: '',
                rememberMe: false
            }
        };
    },
    mounted () {
        this.getCookie();
    },
    methods: {
        submit () {
            let that = this;
            // 判断复选框是否被勾选 勾选则调用配置cookie方法
            if (that.ruleForm.rememberMe === true) {
                console.log('rememberMe == true');
                // 传入账号名，密码，和保存天数3个参数
                that.setCookie(that.ruleForm.account, that.ruleForm.password, 7);
            } else {
                console.log('清空Cookie');
                // 清空Cookie
                that.clearCookie();
            }
            // 与后端请求代码，本功能不需要与后台交互所以省略
            console.log('登陆成功');
            console.log(that.ruleForm);
            that.$http.post(that.$api.login.login, this.ruleForm)
                .then(function (res) {
                    console.log('登录成功');
                }).catch(() => {
                    console.log('出错了');
                });
        },
        // 设置cookie
        setCookie (c_name, c_pwd, exdays) {
            var exdate = new Date(); // 获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); // 保存的天数
            // 字符串拼接cookie
            window.document.cookie = 'account' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString();
            window.document.cookie = 'userPwd' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString();
        },
        // 读取cookie
        getCookie: function () {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; '); // 这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); // 再次切割
                    // 判断查找相对应的值
                    if (arr2[0] === 'account') {
                        this.ruleForm.account = arr2[1]; // 保存到保存数据的地方
                    } else if (arr2[0] === 'userPwd') {
                        this.ruleForm.password = arr2[1];
                    }
                }
            }
        },
        // 清除cookie
        clearCookie: function () {
            this.setCookie('', '', -1); // 修改2值都为空，天数为负1天就好了
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
    .login-main{
        width: 100%;
        min-width: 1200px;
    }
    .login-header{
        width: 100%;
        height: 58px;
        padding-left: 8.5%;
    }
    .login-header-logo{
        display: inline-block;
        min-width: 143px;
        width: 10%;
    }
    .login-header-ul{
        display: inline-block;
        min-width: 800px;
    }
    .login-header-ul li{
        float: left;
        margin-left: 40px;
    }
    .login-header-ul li a{
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #333333;
    }
    .login-center{
        width: 100%;
        height:540px;
        background: #EDC12D;
        padding-top: 74px;
    }
    .login-center-input-box{
        width: 23%;
        height: 350px;
        min-width: 320px;
        margin-left: 64%;
        padding-left: 20px;
        background: #FFFFFF;
        border-radius: 4px;
        position: relative;
    }
    h2{
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #000000;
    }
    .login-center-input{
        width: 280px;
        height: 35px;
        border: 1px solid #E7ECF1;
        border-radius: 4px;
        padding-left: 10px;
    }
    .login-email{
        margin-top: 28px;
    }
    .login-password{
        margin-top: 15px;
    }
    .login-center-submit{
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
        cursor:pointer;
    }
    .login-center-password{
        font-size: 16px;
        font-weight: bold;
        color: #333;
        padding-top: 15px;
    }
    .login-center-checkbox{
        margin-top: 15px;
    }
    .login-center-forget-password{
        display: inline-block;
        margin-top: 10px;
    }
    .login-no-member{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
    }
    .login-register{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #E0370F;
    }
    .clear{
        clear: both;
    }
    .login-footer{
        width: 530px;
        height: 20px;
        margin: auto;
        text-align: center;
    }
    .login-footer li{
        float: left;
        margin-left: 5px;
        line-height: 20px;
        line-height: 20px;
    }
    .login-footer li a{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #9E9E9E;
        height: 13px;
    }
    .login-footer-compony{
        text-align: center;
        width: 100%;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #9E9E9E;
    }
    /*.login-footer-line{*/
        /*border-left: 1px solid #9E9E9E;*/
    /*}*/
    .login-center-error{
        top: 45px;
        width: 280px;
        position: absolute;
        height: 25px;
        color: red;
        font-size: 12px;
        padding-left: 10px;
    }
</style>
