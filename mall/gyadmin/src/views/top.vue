<template>
    <div class="header">
        <div  class="log">
            <img src="../assets/images/log.png">
        </div>
        <div class="info" >
            <i class="iconfont icon-remove"></i>&nbsp;{{userInfo.account}}&nbsp;&nbsp;&nbsp;<i class="iconfont icon-remove"></i>&nbsp;<a href="javascript:;" @click="setPassWord">修改密码</a>&nbsp;&nbsp;&nbsp;<i class="iconfont icon-remove"></i>&nbsp;<a href="javascript:;" @click="logout">注销</a>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            userInfo: JSON.parse(localStorage.getItem('userInfo'))
        };
    },
    created () {
    },
    methods: {
        logout () {
            this.$confirm('确定退出登录吗？', '提示')
                .then(() => {
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.replace('/');
                    this.$http.post(this.$api.user.logout).then(function (data) {
                    }).catch(function (e) {
                    });
                });
        },
        setPassWord () {
            this.$router.push({name: 'password', query: {account: this.userInfo.account}});
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
<style scoped lang="scss">
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
    }
    .el-header{
        width: 100%;
        border: red solid 1px;
    }
</style>
