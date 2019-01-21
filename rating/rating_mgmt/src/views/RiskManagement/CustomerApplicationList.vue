<!--申请查看评级审核列表-->
<template>
    <div class="customer-list">
        <div class="select">
            <ul>
                <li :class="{ active: newIndex==1 }" @click="toggleTabs(1)">待审批({{number.unApprovaled}})</li>
                <li :class="{ active: newIndex==0 }" @click="toggleTabs(0)">已审批({{number.approvaled}})</li>
            </ul>
            <div class="search-box">
                <input type="search" v-model="parameter.data.keywords" placeholder="请输入客户名称">
                <button @click="search" class="gy-button-extra"><i class="iconfont icon-search"></i></button>
            </div>
        </div>
        <table class="gy-table">
            <tr>
                <th>发起请求公司名称</th>
                <th>公司地址</th>
                <th>被查看公司名称</th>
                <th>被查看公司地址</th>
                <th>申请日期</th>
                <th style="width:114px;text-align: center" v-if="newIndex==1">操作</th>
                <th style="width:124px;" v-else-if="newIndex==0">审批日期</th>
            </tr>
            <tr v-for="(item , index) in list" :key=index>
                <td>{{item.usrCompanyName}}</td>
                <td>{{item.userCompanyAddress}}</td>
                <td>{{item.counterpartyName}}</td>
                <td>{{item.counterpartyAddress}}</td>
                <td>{{item.applyTime|date}}</td>
                <td class="text-center" v-if="item.approvalStatus===1">
                    <button class="gy-button-view" @click="approval(item)" >审批</button>
                </td>
                <td  v-else>
                    {{item.approvalTime|date}}
                </td>
            </tr>
        </table>
        <div class="total">共{{total}}条记录</div>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :total=total>
        </el-pagination>
    </div>
</template>
<script>
export default {
    name: 'customer-list',
    data () {
        return {
            newIndex: 1,
            keywords: '',
            pageNum: 1,
            value: '',
            isEdit: false,
            total: 0,
            parameter: {
                pageNum: 1,
                pageSize: 10,
                data: {
                    keywords: '',
                    approvalStatus: 1
                }
            },
            number: 0,
            list: []
        };
    },
    created () {
        this.getInfo();
        this.getNubmer();
    },
    methods: {
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = this.pageNum;
            this.getInfo();
        },
        getInfo () {
            this.$http.post(this.$api.customer.appList, this.parameter).then((res) => {
                if (res.data.code === 0) {
                    this.list = res.data.data.list;
                    this.total = res.data.data.total;
                    this.pageNum = res.data.data.pageNum;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getNubmer () {
            this.$http.post(this.$api.customer.getNumber, this.parameter).then((res) => {
                if (res.data.code === 0) {
                    this.number = res.data.data;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        approval (item) {
            this.$http.put(this.$api.customer.approval, {
                id: item.id
            }).then((res) => {
                if (res.data.code === 0) {
                    this.$message('操作成功');
                    this.getInfo();
                    this.getNubmer();
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        toggleTabs (index) {
            this.newIndex = index;
            if (index === 1) {
                this.parameter.data.approvalStatus = 1;
            } else {
                this.parameter.data.approvalStatus = 2;
            }
            this.getInfo();
            this.getNubmer();
        },
        search () {
            this.getInfo();
        }
    }
};
</script>
<style scoped lang="scss">

</style>
