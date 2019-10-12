<template>
    <div class="account-sub">
        <div class="new-title-public">
            授权管理
        </div>
        <div class="mytable">
            <table class="gy-table">
                <thead>
                <tr class="title">
                    <td>姓名</td>
                    <td>用户名</td>
                    <td>手机号</td>
                    <td>角色名称</td>
                    <td style="width: 100px;">操作 </td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in tableData.data" :key="index">
                    <td>{{ item.username }}</td>
                    <td>{{ item.account }}</td>
                    <td>{{ item.phone }}</td>
                    <td>
                        <template v-for="(it, ind) in item.roleModelList">
                            {{ ind === 0 ? it.name : ',' + it.name }}
                        </template>
                    </td>
                    <td style="width: 100px;text-align: center">
                        <template v-if="item.isAdmin !== 1">
                            <a class="gy-button-view" @click="showAuthenDialog(item)">授权</a>
                            <!--<el-button @click="removeData(item)" type="text" size="small">移除</el-button>-->
                        </template>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="totaljl">
                共 {{page.total}} 条记录
            </div>
        </div>
        <el-pagination
            background
            @size-change="handlePageSizeChange"
            @current-change="handlePageCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            layout="prev, pager, next"
            :total="page.total">
        </el-pagination>
        <el-dialog class="grant-dialog" title="角色授权" :visible.sync="authenDialog.visible">
            <el-form>
                <el-form-item label="选择角色">
                    <el-checkbox :indeterminate="authenDialog.isIndeterminate" v-model="authenDialog.checkAll"
                                 @change="handleCheckAllAuthen">全选
                    </el-checkbox>
                    <div class="fater-div">
                        <el-checkbox-group v-model="authenDialog.checkedRoles" @change="handleCheckedRoleChange">
                            <div class="new-checkbox" v-for="(item, index) in authenDialog.roleList" :key="index"><el-checkbox :label="item.id" >
                                <span :title="item.name"> {{item.name }}</span>
                            </el-checkbox></div>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <button class="gy-button-extra" @click="setAuthenRole">保存</button>
                    <button class="gy-button-normal" @click="hideAuthenDialog">取消</button>
                </el-form-item>
            </el-form>

        </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'subList',
    data () {
        return {
            myData: [],
            fhy_newshow: false,
            formSearch: {
                user: '',
                query: {}
            },
            tableData: {
                query: {
                    pageSize: 10,
                    pageNum: 1
                },
                data: []
            },
            authenDialog: {
                visible: false,
                checkAll: false,
                userId: '',
                checkedRoles: [],
                isIndeterminate: true,
                roleList: []
            },
            page: {
                currentPage: 1,
                pageSizes: [10, 20, 30, 50],
                pageSize: 10,
                total: 0
            }
        };
    },
    watch: {
        'formSearch.user': function (rule, value) {
            let reg = /^1[3456789]\d{9}$/;
            if (!reg.test(rule)) {
                this.fhy_newshow = false;
            } else {
                this.$http.get(this.$api.account.employeeSearch + rule).then(res => {
                    this.fhy_newshow = true;
                    this.myData = res.data.data;
                });
            }
        },
        'authenDialog.checkedRoles': {
            handler (newValue, oldValue) {
            },
            deep: true
        }
    },
    created () {
        this.getData();
        this.getRoleList();
    },
    methods: {
        select_new (v) {
            this.formSearch.query = v;
            this.fhy_newshow = false;
        },
        getData () {
            this.$http.post(this.$api.account.employee, this.tableData.query)
                .then(res => {
                    if (res.data.code === 0) {
                        this.page.total = res.data.data.total;
                        this.tableData.data = res.data.data && res.data.data.list;
                        this.formSearch.user = '';
                    } else {
                        this.tableData.data = [];
                        this.page.total = 0;
                    }
                });
        },
        addData () {
            let data = this.formSearch.query;
            if (!data.id) {
                this.$message({
                    type: 'info',
                    message: '请输入用户手机号码'
                });
                return;
            }
            this.$http.post(this.$api.account.employeeAdd + data.id).then(res => {
                if (res.data.code === 0) {
                    this.getData();
                    this.$message({
                        type: 'info',
                        message: '添加成功'
                    });
                    this.formSearch.query.id = null;
                } else {
                    this.$message({
                        type: 'info',
                        message: '添加失败，' + res.data.message
                    });
                }
            });
        },
        removeData (data) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.put(this.$api.account.employeeRemove + data.userId).then(res => {
                    if (res.data.code === 0) {
                        this.getData();

                        this.$message({
                            type: 'info',
                            message: '移除成功'
                        });
                    } else {
                        this.$message({
                            type: 'info',
                            message: '移除失败，' + res.data.message
                        });
                    }
                });
            });
        },
        getRoleList () {
            this.$http.get(this.$api.account.companyRoleAll2).then(res => {
                if (res.data.code === 0) {
                    this.authenDialog.roleList = res.data.data;
                } else {
                    this.authenDialog.roleList = [];
                }
            });
        },
        showAuthenDialog (data) {
            this.authenDialog.visible = true;
            this.authenDialog.userId = data.userId;
            let roleList = [];
            if (data.roleModelList.length > 0) {
                data.roleModelList.map(item => {
                    roleList.push(item.id);
                });
            }
            this.authenDialog.checkedRoles = roleList;
        },
        hideAuthenDialog (data) {
            this.authenDialog.visible = false;
        },
        setAuthenRole () {
            this.$http.post(this.$api.account.companyRoleSet2, {
                userId: this.authenDialog.userId,
                roleIdList: this.authenDialog.checkedRoles
            })
                .then(res => {
                    if (res.data.code === 0) {
                        this.getData();
                        this.$message({
                            type: 'info',
                            message: '设置权限成功'
                        });
                        this.authenDialog.visible = false;
                    } else {
                        this.$message({
                            type: 'info',
                            message: res.data.message
                        });
                    }
                });
        },
        handleCheckAllAuthen (val) {
            let data = [];
            this.authenDialog.roleList.map(item => {
                data.push(item.id);
            });
            this.authenDialog.checkedRoles = val ? data : [];
            this.authenDialog.isIndeterminate = false;
        },
        handleCheckedRoleChange (value) {
            let checkedCount = value.length;
            this.authenDialog.checkAll = checkedCount === this.authenDialog.roleList.length;
            this.authenDialog.isIndeterminate = checkedCount > 0 && checkedCount < this.authenDialog.roleList.length;
        },
        handlePageSizeChange (val) {
            this.tableData.query.pageSize = val;
            this.tableData.query.pageNum = 1;
            this.getData();
        },
        handlePageCurrentChange (val) {
            this.tableData.query.pageNum = val;
            this.getData();
        }
    }
};
</script>
<style lang="scss" scoped>
    .account-sub {
        .totaljl{
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
        padding-bottom: 20px;
        .user-select {
            width: 400px;
            margin-left: 14px;
            margin-top: 10px;
        }
        .mybtn{
            margin-top: 17px;
        }
        &-search {

        }

        .authen-btn {
            text-align: center;
        }
        .mytable{
            padding: 20px 16px;
        }
        .fhy_new{
            position: relative;
            padding-left: 30px;
            padding-top: 10px;
            margin-bottom: 10px;
            height: 59px;
            .left_div1{
                float: left;
                margin-top: 16px;
            }
            .left_div2{
                float: left;
                margin-left: 10px;
            }
            input{
                width: 400px;
            }
            ul{
                position: absolute;
                top: 55px;
                left: 30px;
                overflow: hidden;
                width: 400px;
                max-height: 300px;
                overflow: auto;
                border: 1px solid #e6eaea;
                background: #FFF;
                li{
                    float: left;
                    padding: 5px 10px;
                    width: 398px;
                }
                li:hover{
                    cursor: pointer;
                    background-color: #f5f7fa;
                    color: #4a90e2;
                }
            }
        }
        .fater-div{
            width: 740px;
            overflow: hidden;
        }
        .new-checkbox{
            margin:0;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            text-align: left;
            width: 185px;
            height: 40px;
            line-height: 40px;
            float: left;
        }
    }
    .user-item {
        width: 33%;
        display: inline-block;
    }
</style>
<style lang="scss">
    .account-sub{
        .grant-dialog{
            .el-dialog{
                width: 800px;
            }
            .el-dialog__body{
                padding: 10px 30px 30px;
            }
            .el-form-item{
                margin-bottom: 0px;
            }
            .el-dialog__headerbtn{
                right:16px;
            }
        }
    }
</style>
