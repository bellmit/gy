<template>
    <div class="header">
        <div  class="log">
            <img src="../assets/images/log.png">
        </div>
        <div class="info" >
            <i class="iconfont icon-remove"></i>&nbsp;{{userInfo.account}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-remove"></i>&nbsp;<a href="javascript:;" @click="logout">注销</a>
        </div>
    </div>
</template>
<script>

export default {
    data: function () {
        return {
            userInfo: JSON.parse(localStorage.getItem('userInfo'))
            // userInfo: {
            //     account: 'admin'
            // }

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
      height: inherit;
      padding: 0 10px;
        background-color: #2F2F2F;

        a{
            opacity: 1;
            font-size: 14px;
            color: #FFFFFF;
        }
        .info{
            float: right;
            height: 100%;
            text-align: right;
            opacity: .6;
            color: #FFFFFF;
            position: relative;
            transform:translate(0px,50%);
        }
        .log{
            float:left;
            top: 50%;
            position: relative;
            transform:translate(0px, -15px);
        }
    .el-header{
        width: 100%;
        border: red solid 1px;
    }
    }
    .el-button {
        // background-color: #f2ac4c!important;
        // border:1px solid transparent!important;
        &:hover {
             border:1px solid red!important;
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
