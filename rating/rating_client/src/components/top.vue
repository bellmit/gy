<template>
    <div class="header">
        <div  class="log">
            <img src="../assets/images/gylogo.png">
            <span>{{userInfo.companyName}}</span>
        </div>
        <div class="info" >
            <i class="iconfont icon-remove"></i>&nbsp;{{userInfo.account}}&nbsp;<i class="iconfont icon-remove"></i>&nbsp;<a href="javascript:;" @click="logout">注销</a>
        </div>
    </div>
</template>
<script>

export default {
    data: function () {
        return {
            userInfo: JSON.parse(localStorage.getItem('userInfoClient'))
        };
    },
    created () {
    },
    methods: {
        logout () {
            this.$confirm('是否退出登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.clear();
                this.$router.push({name: 'login'});
                this.$http.post(this.$api.user.logout).then(function (data) {
                    console.log(data);
                }).catch(function (e) {
                });
                this.$message({
                    type: 'success',
                    message: '退出登录!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        setPassWord () {
            let id = this.userInfo.id;
            this.$router.push({name: 'password', query: {id: id, account: this.userInfo.account}});
            // this.$router.go(0);
        },
        downloadFile () {
            this.$http.post('platform/v1/offers/exportExcel', {responseType: 'arraybuffer', chartset: 'utf-8'})
                .then(res => {
                    let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
                    let objectUrl = URL.createObjectURL(blob);
                    window.location.href = objectUrl;
                });
        }
    }
};
</script>
<style  lang="scss">
    .header{
      width: 1200px;
      margin: 0 auto;
      height: inherit;
      padding: 0 10px;
      background-color: #fff;
      vertical-align: middle;
        a{
            opacity: 1;
            font-size: 14px;
            color: #000;
        }
        .info{
            float: right;
            height: 54px;
            line-height: 54px;
            // height: 100%;
            text-align: right;
            color: #000;
            vertical-align: middle;
        }
        .log{
            float:left;
            top: 50%;
            position: relative;
            transform:translate(0px, -15px);
            img {
                width: 146px;
                height: 34px;
            }
            span {
                margin-left:20px;
            }
        }
    .el-header{
        width: 100%;
    }
    }
    .el-button {
        // background-color: #f2ac4c!important;
        // border:1px solid transparent!important;
        &:hover {
             /*border:1px solid red!important;*/
             color: red!important;
             background-color: #fff!important;
        }
    }
    .el-button--primary {
        background-color: #f2ac4c!important;
        border:1px solid transparent!important;
        &:hover {
             border:1px solid red!important;
             color: #fff!important;
             background-color: #f2ac4c!important;
        }
    }
</style>
