<template><!-- 人员选择 -->
    <div class="flow-list">
        <el-dialog
                width="800px"
                title="请选择指定人员"
                :visible.sync="isShowUser"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                append-to-body>
            <div class="search-block">
                <div class="gy-form-group tree" style="z-index: 999">
                    <span class="l">部门</span>
                    <div @click="isShowTree = !isShowTree" class="tree-box">{{currentTreeNode}}</div>
                    <el-tree v-if="isShowTree" :default-expand-all="defaultAll" :data="treeData" :props="defaultProps"
                             @node-click="handleNodeClick" @current-change="treecurrentChange"></el-tree>
                </div>
                <div class="gy-form-group">
                    <span class="l">姓名</span>
                    <el-input v-model="searchForm.username" placeholder="执行人员"></el-input>
                    <span class="searchicon" @click="getUsers"><i class="iconfont icon-search"></i></span>
                </div>
            </div>
            <el-table
                    :data="userList"
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    style="width: 100%">
                <el-table-column
                        property="usrUserId"
                        label="#"
                        width="120">
                </el-table-column>
                <el-table-column
                        property="orgName"
                        label="部门">
                </el-table-column>
                <el-table-column
                        property="userName"
                        label="人员姓名">
                </el-table-column>
            </el-table>
            <br/>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="userTotal"
                    @current-change="currentChange('user',$event)"
                    style="text-align: center">
            </el-pagination>
            <el-row :gutter="20" class="elRow">
                <el-col :span="12" :offset="16">
                    <el-button size="mini" @click="changeXrefUser(0)">取消</el-button>
                    <el-button type="warning" size="mini" @click="changeXrefUser(1)">确定</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>

</template>

<script>
export default {
    data () {
        return {
            treeData: [],
            defaultProps: {
                children: 'usrOrganizationNodes',
                label: 'name'
            },
            currentTreeNode: '点击选择部门',
            isShowUser: false,
            isShowTree: false,
            userList: [],
            userTotal: 0,
            currXrefUser: {
                innerVisible: null,
                userName: null,
                usrUserId: null
            },
            searchForm: {
                pageNum: 1,
                pageSize: 10,
                organizationId: 0,
                username: null
            },
            defaultAll: true
        };
    },
    methods: {
        getUsers () {
            this.isShowUser = true;
            if (this.treeData == null || this.treeData === undefined || this.treeData.length === 0) {
                this.$http.get(this.$api.organization.list).then(res => {
                    if (res.data.code === 0) {
                        this.treeData = res.data.data;
                        this.$http.post(this.$api.contract.getGrade, this.searchForm).then(res => {
                            if (res.data.code === 0) {
                                this.userList = res.data.data.rows;
                                this.userTotal = res.data.data.total;
                            }
                        });
                    } else {
                        this.userList = [];
                        this.userTotal = 0;
                        this.$alert(res.data.code + ' ' + res.data.message);
                    }
                });
            } else {
                this.$http.post(this.$api.contract.getGrade, this.searchForm).then(res => {
                    if (res.data.code === 0) {
                        this.userList = res.data.data.rows;
                        this.userTotal = res.data.data.total;
                    } else {
                        this.userList = [];
                        this.userTotal = 0;
                        this.$alert(res.data.code + ' ' + res.data.message);
                    }
                });
            }
        },
        // tree选择回调
        treecurrentChange () {
            this.isShowTree = !this.isShowTree;
        },
        handleNodeClick (data) {
            // 选择
            this.currentTreeNode = data.name;
            this.searchForm.organizationId = data.id;
        },
        changeXrefUser (type) {
            this.isShowUser = false;
            this.currXrefUser['type'] = type;
            this.$emit('affirmUser', this.currXrefUser);
        },
        handleCurrentChange (row) {
            this.currXrefUser = row;
        },
        currentChange (type, pageNum) {
            this.searchForm.pageNum = pageNum;
            this.getUsers();
        }
    }
};
</script>

<style lang="scss" scoped>
    .search-block {
        .search-block:nth-last-child(1) {
            position: relative;
        }
        /*.tree {*/
        /*max-height: 250px!important;*/
        /*overflow-y: auto!important;*/
        /*}*/
        .tree-box {
            width: 100%;
            display: block;
            height: 30px;
            cursor: pointer;
        }
        .searchicon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>
<style lang="scss">
    .search-block {
        .el-tree {
            overflow-y: auto;
            max-height: 250px!important;
        }
    }
</style>
