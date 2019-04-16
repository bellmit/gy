<template>
    <div class="account-list">
        <div class="account-tit">
            员工账户管理
        </div>
        <!-- 列表 -->
        <div class="table-box">
            <table class="gy-table">
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>用户名</th>
                    <th>手机号</th>
                    <th>角色名称</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody v-if="list.length !== 0">
                <tr v-for="(item, index) in list" :key="index">
                    <td>{{ item.username }}</td>
                    <td>{{ item.account }}</td>
                    <td>{{ item.phone }}</td>
                    <td>
                        <template v-for="(it, ind) in item.roleModelList">
                            {{ ind === 0 ? it.name : ',' + it.name }}
                        </template>
                    </td>
                    <td class="caoz">
                        <button v-show="!item.isAdmin" class="gy-button-view" @click="dialogList(item)">授权</button>
                    </td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                    <td colspan="8" style="text-align: center;">没有找到可显示的数据...</td>
                </tr>
                </tbody>
            </table>
            <div class="departmentName">共 {{total}} 条记录</div>
            <!-- 分页 -->
            <el-pagination
                    v-if="total !== 0"
                    background
                    :total="total"
                    :current-page="pageNum"
                    layout="prev, pager, next"
                    @current-change="turnPage">
            </el-pagination>
            <!-- 授权 dialog -->
            <el-dialog
                    title="角色授权"
                    class="AddressManagement"
                    :visible.sync="authenDialog.visible"
                    width="700px">
                <el-form @submit.native.prevent>
                    <el-form-item label="选择角色">
                        <el-checkbox :indeterminate="authenDialog.isIndeterminate" v-model="authenDialog.checkAll"
                                    @change="handleCheckAllAuthen">全选
                        </el-checkbox>
                        <el-checkbox-group v-model="authenDialog.checkedRoles" @change="handleCheckedRoleChange">
                            <div class="new-checkbox" v-for="(item, index) in authenDialog.roleList" :key="index"><el-checkbox :label="item.id">
                                <span>{{item.name }}</span>
                            </el-checkbox></div>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item class="authen-btn">
                        <button class="gy-button-extra mr10" @click="setAuthenRole" plain>保存</button>
                        <button class="gy-button-normal" @click="authenDialog.visible = false" plain>取消</button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: 'account-list',
    data () {
        return {
            total: 1, // 总条数
            pageNum: 1, // 当前条数
            list: [], // 员工信息列表
            authenDialog: {
                visible: false,
                checkAll: false,
                userId: '',
                checkedRoles: [],
                isIndeterminate: true,
                roleList: []
            } // 授权列表
        };
    },
    watch: {
        'authenDialog.checkedRoles': {
            handler (newValue, oldValue) {
            },
            deep: true
        }
    },
    created () {
        this.init();
        this.getRoleList();
    },
    methods: {
        init () {
            let query = {
                pageSize: 10,
                pageNum: this.pageNum
            };
            this.$http.post(this.$api.role.accoutList, query).then(res => {
                if (res.data.code === 0) {
                    this.list = res.data.data.list;
                    this.total = res.data.data.total;
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch((e) => {
                console.log('出错了' + e);
            });
        },
        getRoleList () {
            this.$http.get(this.$api.role.getRoleList).then(res => {
                if (res.data.code === 0) {
                    this.authenDialog.roleList = res.data.data;
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch((e) => {
                console.log('出错了' + e);
            });
        },
        // 点击授权
        dialogList (data) {
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
        // 全选
        handleCheckAllAuthen (val) {
            let data = [];
            this.authenDialog.roleList.map(item => {
                data.push(item.id);
            });
            this.authenDialog.checkedRoles = val ? data : [];
            this.authenDialog.isIndeterminate = false;
        },
        // 选择角色
        handleCheckedRoleChange (value) {
            let checkedCount = value.length;
            this.authenDialog.checkAll = checkedCount === this.authenDialog.checkedRoles.length;
            this.authenDialog.isIndeterminate = checkedCount > 0 && checkedCount < this.authenDialog.roleList.length;
        },
        // 授权保存
        setAuthenRole () {
            this.$http.post(this.$api.role.authsBtn, {
                userId: this.authenDialog.userId,
                roleIdList: this.authenDialog.checkedRoles
            })
                .then(res => {
                    if (res.data.code === 0) {
                        this.init();
                        this.$message({
                            type: 'success',
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
        // 切换分页
        turnPage (v) {
            this.pageNum = v;
            this.init();
        }
    }
};
</script>

<style scoped lang="scss">
.account-list{
    .mr10{
        margin-right: 10px;
    }
    .table-box{
        padding:20px 16px;
    }

    .account-tit{
        padding: 3px 16px;
        font-size: 16px;
        color: #333333;
        font-weight: bold;
        border-bottom: 1px solid #E7ECF1;
    }
    .gy-table{
        margin-top: 15px 0 0 0;
    }
    .selectFont{
        margin-right:10px;
    }
    .authen-btn{
        text-align: right;
        margin-bottom: 0px;
    }
    .dialogList{
        min-width:700px;
    }
    .caoz {
        text-align: center;
    }
}
</style>
<style lang="scss">
    .account-list{
        .AddressManagement {
            .el-dialog__header {
                border-bottom: 1px solid #DCE0E4;
                padding: 15px;
            }
            .el-dialog__body {
                padding: 10px 30px 30px 30px;
            }
            .new-checkbox{
                margin:0;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                text-align: left;
                width: 33.3%;
                height: 40px;
                line-height: 40px;
                float: left;
            }
        }
    }

</style>
