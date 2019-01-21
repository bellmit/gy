<template>
  <div class="page">
    <div class="gy-h4">个人用户</div>
    <div class="search-wrapper gy-form">
      <div class="gy-form-group">
        <span class="l">用户名</span>
        <input type="text" v-model="userName" placeholder="请输入用户名">
      </div>
      <div class="gy-form-group">
        <span class="l">手机号</span>
        <input type="text" v-model="phone" placeholder="请输入手机号">
      </div>
      <div class="gy-form-group">
        <span class="l">账号名</span>
        <input type="text" v-model="account" placeholder="请输入账号名">
        <i class="iconfont icon-search" @click="searchGood"></i>
      </div>
    </div>
    <div class="btn-group">
      <button class="gy-button-extra" @click="editAll" v-if="isAuth('member:personal:edit')">编辑</button>
      <button class="gy-button-normal" @click="deleteAll" v-if="isAuth('member:personal:batch_stop')">批量停用</button>
      <button class="gy-button-normal" @click="startAll" v-if="isAuth('member:personal:batch_start')">批量启用</button>
      <!--<router-link :to="{ name: 'sysRoleManage',}"><button class="gy-button-normal">添加</button></router-link>&nbsp;-->
    </div>
    <div class="m-panel">
      <table class="gy-table">
        <thead>
        <tr>
          <th>
            <label class="u-checkbox">
              <input type="checkbox" v-model="checkedAll" @click.stop="changeState">
              <span>#</span>
            </label>
          </th>
          <th>账号名</th>
          <th>用户名</th>
          <th>邮件</th>
          <th>手机号</th>
          <th>性别</th>
          <th>密码修改</th>
          <th>是否停用</th>
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
            {{item.id}}
          </td>
          <td>{{item.account}}</td>
          <td>{{item.username}}</td>
          <td>{{item.email}}</td>
          <td>{{item.phone}}</td>
          <td>
            <el-tag v-if="item.sex === 0" size="small" type="success">男</el-tag>
            <el-tag v-else-if="item.sex === 1" size="small" type="warning">女</el-tag>
          </td>
          <td><a href="javascript:;" @click="setPassWord(item)">重置密码</a></td>
          <td>
            <el-tag v-if="item.valid === 0" size="danger">停用</el-tag>
            <el-tag v-if="item.valid === 1" size="success">启用</el-tag>
          </td>
          <!--<td>-->
          <!--<router-link :to="{ path: 'manage', query: {id: item.id}}">-->
          <!--<button class="gy-button-normal warning">修改</button>-->
          <!--</router-link>&nbsp;&nbsp;&nbsp;-->
          <!--<button class="gy-button-normal selected" @click="deleteGood(item.id)">停用</button>-->
          <!--</td>-->
        </tr>
        </tbody>
      </table>
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
            userName: '',
            phone: '',
            account: '',
            searchName: '',
            searchPhone: '',
            searchAccount: '',
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
        setPassWord (item) {
            this.$router.push({name: 'password', query: {id: item.id, account: item.account}});
        },
        getList (currentPage) {
            let params = {
                'pageNum': currentPage,
                'pageSize': this.pageSize,
                'username': this.searchName,
                'phone': this.searchPhone,
                'account': this.searchAccount
            };
            if (!this.isAuth('member:personal:list')) return;
            this.$http.post(this.$api.memberPersonal.list, params)
                .then((data) => {
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
            this.searchName = this.userName;
            this.searchPhone = this.phone;
            this.searchAccount = this.account;
            this.getList(1);
        },
        deleteGood (id) {
            this.$confirm('<span><i class="iconfont icon-message-warning"></i>是否继续?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.$http.put(this.$api.memberPersonal.stop + id).then((data) => {
                    if (data.data.code === 0) {
                        this.$message.success('操作成功!');
                        this.getList(1);
                    }
                });
            }).catch(() => {
            });
        },
        startAll () {
            if (this.checkModel.length < 1) {
                this.$message.warning('请选择操作项！');
                return;
            }
            let dataObj = {
                'userIdList': this.checkModel
            };
            this.$http({
                url: this.$api.memberPersonal.start,
                method: 'put',
                data: dataObj
            }).then(({data}) => {
                if (data.code === 0) {
                    this.getList(1);
                    this.$message.success('操作成功!');
                }
            }).catch((e) => {
            });
        },
        deleteAll () {
            if (this.checkModel.length < 1) {
                this.$message.warning('请选择操作项！');
                return;
            }
            this.$confirm('<span><i class="iconfont icon-message-warning"></i>此操作将停用, 是否继续?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                let dataObj = {
                    'userIdList': this.checkModel
                };
                this.$http({
                    url: this.$api.memberPersonal.stop,
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
        changeState () {
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
  padding-left: 52px;
  .l {
    width: 42px;
  }
}
.gy-form-group:nth-child(odd) {
  padding-right: 30px;
}
.gy-form-group:nth-child(even) {
  padding-left: 82px;
  .l {
    width: 72px;
    padding-left: 30px;
  }
}
</style>
