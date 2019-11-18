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
      <button class="gy-button-normal mr0" @click="startAll" v-if="isAuth('member:personal:batch_start')">批量启用</button>
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
          <th>注册时间</th>
          <th>注册来源</th>
          <th>是否停用</th>
          <th>操作</th>
          <!--<th>操作</th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in list" :key="index" @dblclick='$tools.dbCheckItem(item, checkModel)'>
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
            <span v-if="item.sex === 0">男</span>
            <span v-else-if="item.sex === 1">女</span>
          </td>
          <td>{{item.createDate | date(1)}}</td>
          <td>{{item.source}}</td>
          <td>
            <span v-if="item.valid === 0">停用</span>
            <span v-if="item.valid === 1">启用</span>
          </td>
          <td style="text-align: center;"><span @click="setPassWord(item)" class="gy-button-view">重置密码</span></td>
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
                        this.list.forEach(item => {
                            item['flag'] = false;
                        });
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
                this.$message.error('请选择操作项！');
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
                this.$message.error('请选择操作项！');
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
                this.$message.error('不能多选且只能选择一个编辑项！');
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
.search-wrapper .icon-search{
    right: 0;
}
</style>
