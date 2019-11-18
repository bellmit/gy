<template><!-- 岗位(角色)选择 -->
    <div class="flow-list">
      <el-dialog
      width="800px"
      title="请选择岗位"
      :visible.sync="isShowUser"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      append-to-body>
      <div class="search-block">
        <div class="gy-form-group">
          <span class="l">岗位名称</span>
          <el-input v-model="searchForm.name" placeholder="岗位名称"></el-input>
          <span class="searchicon" @click="getRoles"><i class="iconfont icon-search"></i></span>
        </div>
      </div>
      <el-table
        :data="userList"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column
          property="id"
          label="No."
          width="120">
        </el-table-column>
        <el-table-column
          property="name"
          label="岗位名称">
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
        <el-col :span="12" :offset="19" style="margin-top:20px;">
            <button type="button" class="gy-button-normal" @click="changeXrefUser(0)">取消</button>
            <button type="button" style="margin-left: 10px" class="gy-button-extra" @click="changeXrefUser(1)">确定</button>
        </el-col>
      </el-row>
    </el-dialog>
    </div>

</template>

<script>
export default {
    data () {
        return {
            isShowUser: false,
            userList: [],
            userTotal: 0,
            currXrefUser: {
                innerVisibleRole: null,
                userName: null,
                usrUserId: null,
                organizationId: null
            },
            searchForm: {
                pageNum: 1,
                pageSize: 10,
                name: null
            }
        };
    },
    methods: {
        getRoles () {
            this.isShowUser = true;
            this.$http.post(this.$api.contract.getRoleList, this.searchForm).then(res => {
                if (res.data.code === 0) {
                    this.userList = res.data.data.list;
                    this.userTotal = res.data.data.total;
                } else {
                    this.userList = [];
                    this.userTotal = 0;
                    this.$alert(res.data.code + ' ' + res.data.message);
                }
            });
        },
        handleNodeClick (data) {
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
            this.$emit('affirmRole', this.currXrefUser);
        },
        handleCurrentChange (row) {
            this.currXrefUser = row;
        },
        currentChange (type, pageNum) {
            this.searchForm.pageNum = pageNum;
            this.getRoles();
        }
    }
};
</script>

<style lang="scss" scoped>
  .search-block {
    .search-block:nth-last-child(1) {
      position: relative;
    }
      .tree {
          max-height: 250px!important;
          overflow-y: auto!important;
      }
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
