<template>
    <div class="page">
      <div class="gy-h4">后台用户</div>
      <div class="search-wrapper gy-form">
        <div class="gy-form-group">
          <span class="l">账号名</span>
          <input type="text" v-model="account" placeholder="请输入账号名">
        </div>
        <div class="gy-form-group">
          <span class="l">手机号</span>
          <input type="text" v-model="phone" placeholder="请输入手机号">
        </div>
        <div class="gy-form-group">
          <span class="l">用户名</span>
          <input type="text" v-model="userName" placeholder="请输入用户名">
        </div>
        <div class="gy-form-group qystatus">
          <span class="l">启用状态</span>
          <el-radio-group v-model="valid">
            <el-radio :label="''">全部</el-radio>
            <el-radio class="qystatus-radio-c" :label="1">启用</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
          <i class="iconfont icon-search" @click="searchGood"></i>
        </div>
      </div>
      <div class="btn-group">
        <button class="gy-button-extra" v-if="isAuth('member:backstageuser:add')" @click="$router.push({path: 'manage'})">添加</button>
        <!--<button class="gy-button-normal" @click="editAll" v-if="isAuth('member:backstageuser:edit')">编辑</button>测试要求上面不放编辑按钮-->
        <button class="gy-button-normal" @click="deleteAll" v-if="isAuth('member:backstageuser:batch_stop')">批量停用</button>
        <button class="gy-button-normal mr0" @click="startAll" v-if="isAuth('member:backstageuser:batch_start')">批量启用</button>
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
                    <th>账号名</th>
                    <th>用户名</th>
                    <th>邮件</th>
                    <th>手机号</th>
                    <th>性别</th>
                    <th>是否停用</th>
                    <th style="text-align: center;">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in list" :key="index" @dblclick.stop='$tools.dbCheckItem(item, checkModel)'>
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
                    <td>
                        <span v-if="item.valid === 0">停用</span>
                        <span v-if="item.valid === 1">启用</span>
                    </td>
                    <td style="text-align: center;">
                    <router-link :to="{ path: 'manage', query: {id: item.id}}" v-if="isAuth('member:backstageuser:edit')" class="gy-button-view">编辑</router-link>
                    <!--<a href="javascript:;" @click="showRoleList(item)" v-if="isAuth('member:backstageuser:authorization')">授权</a>&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="setPassWord(item)" v-if="isAuth('member:backstageuser:password')">重置密码</a>-->
                    <span @click="showRoleList(item)" class="gy-button-view">授权</span>
                    <span @click="setPassWord(item)" class="gy-button-view">重置密码</span>
                    </td>
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
        <el-dialog
          title="角色权限"
          :visible.sync="dialogVisible"
          width="30%">
            <label v-for="(item) in roleList" v-bind:key="item.id">
                <input type="checkbox" v-model="roleSelected" :value="item.id">
                <span>{{item.name}}</span>&nbsp;
            </label>
            <br><br>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveRoleID">确 定</el-button>
        </el-dialog>
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
            checkModel: [],
            valid: '',
            roleList: '',
            roleSelected: [],
            dialogVisible: false,
            id: 0
        };
    },
    watch: {
        checkModel: {
            handler (newV, oldV) {
                this.checkedAll = (this.checkModel.length === this.list.length);
            },
            deep: true
        }
    },
    methods: {
        saveRoleID () {
            let dataObj = {
                'id': this.id,
                'roleIdList': this.roleSelected,
                'userType': 1
            };
            this.$http({
                url: this.$api.memberBackStageUser.author,
                method: 'post',
                data: dataObj
            }).then(({data}) => {
                if (data.code === 0) {
                    this.$router.push({path: 'list'});
                    this.$message.success('保存成功!');
                }
            }).catch((e) => {
            });
            this.dialogVisible = false;
        },
        setPassWord (item) {
            this.$router.push({name: 'password', query: {id: item.id, account: item.account}});
        },
        showRoleList (item) {
            this.id = item.id;
            this.$http.get(this.$api.memberBackStageUser.info + item.id)
                .then((data) => {
                    if (data.data.code === 0) {
                        this.roleSelected = data.data.data.roleIdList;
                        this.dialogVisible = true;
                    }
                })
                .catch((e) => {
                });
        },
        getRoleList () {
            this.$http.get(this.$api.memberBackStageUser.roleList)
                .then((data) => {
                    if (data.data.code === 0) {
                        this.roleList = data.data.data;
                    }
                })
                .catch((e) => {
                });
        },
        getList (currentPage) {
            if (!this.isAuth('member:backstageuser:list')) return;
            this.$http.post(this.$api.memberBackStageUser.list, {
                'pageNum': currentPage,
                'pageSize': this.pageSize,
                'username': this.searchName,
                'phone': this.searchPhone,
                'account': this.searchAccount,
                'valid': this.valid
            }).then((data) => {
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
                url: this.$api.memberPersonal.startUser,
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
                    url: this.$api.memberPersonal.stopUser,
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
        this.getRoleList(); // 获取权限列表；
    }
};
</script>
<style scoped lang="scss">
@import './../../../styles/module/list';
.search-wrapper {
  .icon-search {
    top: 1px;
    left: 400px;
  }
}
.cell-text-align-right{
    text-align: right;
}
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
<style lang="scss">
  .qystatus {
    .el-radio {
      margin: 0;
    }
    .qystatus-radio-c {
      margin: 0 60px;
    }
    .icon-search {
      right: 145px !important;
    }
  }
</style>
