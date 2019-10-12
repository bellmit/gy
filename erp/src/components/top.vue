<template>
    <div class="header">
        <div  class="log">
            <img src="../assets/images/Gylogo.png">
        </div>
        <div class="info" >
            <i class="iconfont icon-user"></i>
            <span>{{userInfo.companyName}},&nbsp;&nbsp;{{userInfo.username}}</span>&nbsp;&nbsp;&nbsp;
            <span><i class="iconfont icon-iconRemind"></i></span>
            <!--<span><i class="iconfont icon-remove"></i>&nbsp;{{userInfo.account}}&nbsp;&nbsp;&nbsp;</span>-->
            <span @click="modify">修改密码</span>
            <span @click="logout()"><i class="iconfont icon-remove"></i>&nbsp;退出</span>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            userInfo: null
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        },
        modify () {
            this.$router.push({name: 'changePassword'});
        },
        logout () {
            this.$confirm('确定退出登录吗？', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定'
            }).then(() => {
                this.$http.post(this.$api.login.logout)
                    .then(res => {
                        if (res.data.code === 0) {
                            localStorage.removeItem('userInfo');
                            this.$router.push({name: 'login'});
                            return;
                        }
                        this.$alert(res.data.message, '出错了');
                    });
            });
        }
    }
};
</script>
<style scoped lang="scss">
    .header {
        height: inherit;
        width: 1200px;
        margin: 0 auto;
        background-color: #FFFFFF;
        a {
            opacity: 1;
            font-size: 14px;
            color: #FFFFFF;
        }
        .info {
            float: right;
            text-align: right;
            opacity: .6;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
        .log {
            float: left;
            top: 50%;
            position: relative;
            transform: translate(0px, -15px);
        }
        .log img {
            height: 28px;
        }
        .info {
            span {
                cursor: pointer;
                display: inline-block;
                color:  #4A4A4A;
            }
        }
    }

    .el-header {
        width: 100%;
        border: red solid 1px;
    }
</style>
<style lang="scss">
    .el-message-box__wrapper{
        .el-message-box__btns{
            text-align: right;
            .el-button--default{
                float: none;
            }
            .el-button--primary{
                margin-right: -0px;
            }
        }
    }
</style>
