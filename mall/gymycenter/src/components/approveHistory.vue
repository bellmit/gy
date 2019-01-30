<template><!-- 查看审批历史 -->
    <div class="approve-histroy">
        <el-dialog width="800px" title="审批情况" :visible.sync="showHisDlg"
                   :close-on-click-modal="true"
                   :close-on-press-escape="true">
        <div>
            <table class="gy-table">
                <thead>
                <tr>
                    <th style="width: 60px">序号</th>
                    <th style="width: 120px">审批人</th>
                    <th style="width: 100px">状态</th>
                    <th style="width: 150px">时间</th>
                    <th style="width: 200px">备注</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in history" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.username}}</td>
                    <td>{{$constant.approveType[item.resultCode]}}</td>
                    <td>{{item.createdDate | date(item.createdDate)}}</td>
                    <td>{{item.msg}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'approveHistory',
    data () {
        return {
            showHisDlg: false,
            history: null
        };
    },
    methods: {
        getAppHisList (params) {
            this.$http.post(this.$api.processes.approveHistory, params).then((res) => {
                if (res.data.code === 0) {
                    this.showHisDlg = true;
                    this.history = res.data.data;
                } else {
                    this.$alert(res.data.code + ' ' + res.data.message);
                }
            });
        }
    }
};
</script>
<style lang="scss">
 .approve-histroy{
     .el-dialog__title{
         font-weight: bold;
         font-size: 16px;
         color: #333;
     }
     .el-dialog__body{
         padding: 20px 16px 30px;
     }
     .el-dialog__headerbtn{
         right: 16px;
     }
 }
</style>
<style lang="scss" scoped>
    th{
        text-align: center;
    }
    td{
        text-align: center;
    }
</style>
