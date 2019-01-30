<template>
    <div class="account-sub">
        <div class="new-title-public">
            授权管理
        </div>
        <div class="mytable">
            <table class="gy-table">
                <thead>
                <tr class="title">
                    <td width="15%">姓名</td>
                    <td width="15%">用户名</td>
                    <td width="15%">手机号</td>
                    <td width="35%">角色名称</td>
                    <td width="20%">操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in tableData.data" :key="index">
                    <td width="10%">{{ item.username }}</td>
                    <td width="10%">{{ item.account }}</td>
                    <td width="10%">{{ item.phone }}</td>
                    <td width="35%">
                    <template v-for="(it, ind) in item.roleModelList">
                    {{ ind === 0 ? it.name : ',' + it.name }}
                    </template>
                    </td>
                    <td width="20%">
                        <template v-if="item.isAdmin !== 1">
                            <el-button @click="showAuthenDialog(item)" type="text" size="small">授权</el-button>
                            <!--<el-button @click="removeData(item)" type="text" size="small">移除</el-button>-->
                        </template>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="totaljl">
                共{{page.total}}条记录
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
        <el-dialog
            title="角色授权"
            :visible.sync="authenDialog.visible"
            width="500">
            <el-form>
                <el-form-item label="选择角色">
                    <el-checkbox :indeterminate="authenDialog.isIndeterminate" v-model="authenDialog.checkAll"
                                 @change="handleCheckAllAuthen">全选
                    </el-checkbox>
                    <el-checkbox-group v-model="authenDialog.checkedRoles" @change="handleCheckedRoleChange">
                        <el-checkbox style="margin:0;width: 220px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align: center" v-for="(item, index) in authenDialog.roleList" :label="item.id" :key="index"><el-tooltip :content="item.name" placement="top-start" effect="light">
                               <span> {{item.name }}</span>
                        </el-tooltip>
                        </el-checkbox>
                    </el-checkbox-group>
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
                total: 110
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
            this.authenDialog.checkAll = checkedCount === this.authenDialog.checkedRoles.length;
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
            td{
                text-align: center;
            }
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
    }

    .user-item {
        width: 33%;
        display: inline-block;
    }
</style>
<style lang="scss">
    .account-sub{
        .el-dialog__body{
            padding: 10px 30px 30px;
        }
        .el-form-item{
            margin-bottom: 0px;
        }
    }
</style>
