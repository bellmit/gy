<template>
    <div class="page">
        <div class="gy-h4">角色列表</div>
        <div class="search-wrapper gy-form">
          <div class="gy-form-group">
            <span class="l">角色名称</span>
            <input type="text" v-model="inputName" placeholder="请输入角色名称">
            <i class="iconfont icon-search" @click="searchGood"></i>
          </div>
        </div>
        <div class="btn-group">
          <button v-if="isAuth('sys:role:add')" @click="$router.push({name: 'sysRoleManage'})" class="gy-button-extra">添加</button>
          <button class="gy-button-normal" @click="editAll" v-if="isAuth('sys:role:edit')">编辑</button>
          <button class="gy-button-normal" @click="deleteAll" v-if="isAuth('sys:role:batch_delete')">批量删除</button>
        </div>
        <div class="m-panel">
            <table class="gy-table">
                <thead>
                <tr>
                    <th>
                    <label class="u-checkbox">
                    <input type="checkbox" v-model="checkedAll"  @click.stop="changeState">
                    <span>#</span>
                    </label>
                    </th>
                    <th>ID</th>
                    <th>角色名称</th>
                    <th>角色编码</th>
                    <th>创建时间</th>
                    <!--<th>操作</th>-->
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in list" :key="index">
                    <td>
                    <label class="u-checkbox">
                    <input type="checkbox" v-model="checkModel" :value="item.id">
                    <span></span>
                    </label>
                    </td>
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.roleCode}}</td>
                    <td>{{item.createDate | date(true)}}</td>
                    <!--<td>-->
                        <!--<router-link :to="{ path: 'manage', query: {id: item.id}}">-->
                            <!--<button class="gy-button-normal warning">修改</button>-->
                        <!--</router-link>&nbsp;&nbsp;&nbsp;-->
                        <!--<button class="gy-button-normal selected" @click="deleteGood(item.id)">删除</button>-->
                    <!--</td>-->
                </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination-wrapper">
          <div class="pagination-total">共 {{total}} 条</div>
          <!-- 翻页 -->
        <el-pagination
          background
          :page-size="pageSize"
          :pager-count="pageCount"
          :total="total"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          style="margin-top: 40px;"
          @current-change="turnPage">
        </el-pagination>
      </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            pageSize: 10,
            pageCount: 5,
            total: 0,
            currentPage: 1,
            searchName: '',
            inputName: '',
            list: [],
            checkedAll: false,
            checkModel: []
        };
    },
    watch: {
        checkModel: {
            handler () {
                this.checkedAll = (this.checkModel.length === this.list.length);
            },
            deep: true
        }
    },
    methods: {
        getList (currentPage) {
            if (!this.isAuth('sys:role:list')) return;
            this.$http.post(this.$api.role.list, {
                'pageNum': currentPage,
                'pageSize': this.pageSize,
                'name': this.searchName
            }).then((data) => {
                if (data.data.code === 0) {
                    this.list = data.data.data.list;
                    // 设置分页信息
                    this.total = data.data.data.total;
                    this.currentPage = data.data.data.pageNum;
                    // 设置check
                    this.cancelCheck();
                }
            }).catch((e) => {
            });
        },
        turnPage (currentPage) {
            this.getList(currentPage);
        },
        searchGood () {
            this.searchName = this.inputName;
            this.getList(1);
        },
        deleteGood (id) {
            this.$confirm('<span><i class="iconfont icon-message-warning"></i>此操作将永久删除, 是否继续?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.$http.put(this.$api.role.delete + id).then((data) => {
                    if (data.data.code === 0) {
                        this.$message.success('删除成功!');
                        this.getList(1);
                    }
                });
            }).catch(() => {
            });
        },
        deleteAll () {
            if (this.checkModel.length < 1) {
                this.$message.warning('请选择删除项！');
                return;
            }
            this.$confirm('<span><i class="iconfont icon-message-warning"></i>此操作将删除, 是否继续?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                let dataObj = {
                    'roleIdList': this.checkModel
                };
                this.$http({
                    url: this.$api.role.delete,
                    method: 'put',
                    data: dataObj
                }).then(({data}) => {
                    if (data.code === 0) {
                        this.getList(1);
                        this.$message.success('操作成功!');
                    }
                });
            }).catch(() => {
            });
        },
        editAll () {
            if (this.checkModel.length !== 1) {
                this.$message.warning('不能多选且只能选择一个编辑项！');
            } else {
                this.$router.push({path: 'manage', query: {id: this.checkModel.toString()}});
            }
        },
        cancelCheck (e) {
            this.checkedAll = false;
            this.checkModel = [];
        },
        changeState (e) {
            this.checkedAll = !this.checkedAll;
            this.checkModel = [];
            if (this.checkedAll) {
                this.list.forEach((obj) => {
                    this.checkModel.push(obj.id);
                });
            }
        }
    },
    created () {
        this.getList(1);
    }
};
</script>
<style scoped lang="scss">
@import './../../../styles/module/list';
.gy-form-group {
  padding-left: 66px;
  .l {
    width: 56px;
  }
}
.gy-form-group:nth-child(odd) {
  padding-right: 30px;
}
.gy-form-group:nth-child(even) {
  padding-left: 96px;
  .l {
    width: 86px;
    padding-left: 30px;
  }
}
</style>
