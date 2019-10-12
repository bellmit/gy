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
                <div class="gy-form-group" style="z-index: 999">
                    <span class="l" style="padding-left: 0">部门</span>
                    <div @click="isShowTree = !isShowTree" class="tree-box">{{currentTreeNode}}</div>
                    <el-tree v-if="isShowTree" :default-expand-all="defaultAll" :data="treeData" :props="defaultProps"
                             @node-click="handleNodeClick" @current-change="treecurrentChange"></el-tree>
                </div>
                <div class="gy-form-group" style="padding-right: 0">
                    <span class="l">姓名</span>
                    <input type="text" v-model="searchForm.username" placeholder="请输入人员姓名"/>
                    <span class="searchicon" @click="currentChange('list')"><i class="iconfont icon-search"></i></span>
                </div>
            </div>
            <div>
              <div class="gy-table">
                <el-table
                        ref="myUserListTbl"
                        :data="userList"
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        style="width: 100%">
                    <el-table-column
                            property="orgName"
                            label="部门">
                    </el-table-column>
                    <el-table-column
                            property="userName"
                            label="人员姓名">
                    </el-table-column>
                </el-table>
              </div>
            </div>
            <span class="total-number">共 {{userTotal}} 条记录</span>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="userTotal"
                    @current-change="currentChange('user',$event)"
                    style="text-align: center">
            </el-pagination>
            <div class="foot-btn-group">
                <button type="button" class="gy-button-normal" @click="changeXrefUser(0)">取消</button>
                <button type="button" style="margin-left: 8px" class="gy-button-extra" @click="changeXrefUser(1)">确定</button>
            </div>
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
            defaultAll: true,
            defaultOrgId: null,
            defaultUserId: null
        };
    },
    methods: {
        // 这个仅由外部调用
        getUsers (defaultOrgId, defaultUserId) {
            this.searchForm.pageNum = 1;
            this.search(defaultOrgId, defaultUserId);
        },
        // 内部查询
        search (defaultOrgId, defaultUserId) {
            this.defaultOrgId = defaultOrgId;
            this.defaultUserId = defaultUserId;
            this.isShowUser = true;
            if (this.treeData == null || this.treeData === undefined || this.treeData.length === 0) {
                this.$http.get(this.$api.organization.list).then(res => {
                    if (res.data.code === 0) {
                        this.treeData = res.data.data;
                        this.selectUserList();
                    } else {
                        this.userList = [];
                        this.userTotal = 0;
                        this.$alert(res.data.code + ' ' + res.data.message);
                    }
                });
            } else {
                this.selectUserList();
            }
        },
        selectUserList () {
            this.$http.post(this.$api.contract.getGrade, this.searchForm).then(res => {
                if (res.data.code === 0) {
                    this.userList = res.data.data.rows;
                    this.userTotal = res.data.data.total;
                    // 设置默认选中的用户
                    this.setDefaultSelectedUser(this.userList, this.defaultUserId);
                } else {
                    this.userList = [];
                    this.userTotal = 0;
                    this.$alert(res.data.code + ' ' + res.data.message);
                }
            });
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
            if (type === 0) {
                // 如果是取消，则没有回调
                return false;
            }
            this.currXrefUser['type'] = type;
            this.$emit('affirmUser', this.currXrefUser);
        },
        handleCurrentChange (row) {
            this.currXrefUser = row;
        },
        currentChange (type, pageNum) {
            if (type === 'user') {
                // 翻页
                this.searchForm.pageNum = pageNum;
                this.search(this.defaultOrgId, this.defaultUserId);
            } else {
                // 查询
                this.searchForm.pageNum = 1;
                this.search(null, null);
            }
        },
        setDefaultSelectedUser (userList, defaultUserId) {
            // 设置默认选中的用户
            if (defaultUserId == null || defaultUserId === undefined ||
                userList == null || userList === undefined || userList.length === 0) {
                return false;
            }

            for (let j = 0, len = userList.length; j < len; j++) {
                let rowInfo = userList[j];
                if (defaultUserId === rowInfo.usrUserId) {
                    this.$refs.myUserListTbl.setCurrentRow(rowInfo);
                    break;
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    .search-block {
        margin-bottom: 10px;
        &:after {
          display: block;
          clear: both;
          content: ' ';
        }
        .search-block:nth-last-child(1) {
            position: relative;
        }
        .tree-box {
            width: 100%;
            display: block;
            height: 30px;
            cursor: pointer;
            border-bottom: 1px solid #e6eaea;
            padding-left: 10px;
        }
        .searchicon {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    /deep/ .el-dialog__headerbtn{
      top:10px;
      right:16px;
    }
    .foot-btn-group {
      margin-top: 20px;
      text-align: right;
    }
    .gy-form-group {
        padding-left: 38px;
         .l {
           width: 28px;
         }
    }
    .gy-form-group:nth-child(even) {
        padding-left: 68px;
         .l {
           width: 58px;
         }
    }
</style>
<style lang="scss">
    .search-block {
        .el-tree {
            overflow-y: auto;
            max-height: 250px!important;
            width: 300px;
            position:absolute;
            left:40px;
            top:40px;
            z-index:1;
            border-left: 1px solid #e6eaea;
            border-bottom: 1px solid #e6eaea;
        }
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #e0370f;
    }
</style>
