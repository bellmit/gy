<template>
  <div class="flow-list">
    <header>
      <div class="title">产品-业务人员关系</div>
    </header>
    <el-form :inline="true" :model="querForm" class="clearfix demo-form-inline search">
      <div class="gy-form-group">
          <span class="l">业务类型</span>
          <el-select v-model="querForm.bizType" @change="changeBizType4List()" clearable placeholder="请选择">
            <el-option
              v-for="item in $constant.businessType4Erp"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
      </div>
      <div class="gy-form-group">
          <span class="l">商品</span>
          <el-select v-model="querForm.productId" clearable placeholder="请选择">
            <el-option
              v-for="item in products"
              :key="item.prodId"
              :label="item.prodName"
              :value="item.prodId">
            </el-option>
          </el-select>
      </div>
      <div class="gy-form-group">
          <span class="l">业务人员</span>
          <input type="text" placeholder="请输入业务人员" v-model="querForm.userName">
          <span class="searchicon" @click="search"><i class="iconfont icon-search"></i></span>
      </div>
    </el-form>
    <div class="add-wrap">
      <button type="button" class="gy-button-extra" @click="addBiz">添加</button>
    </div>
    <div class="div">
      <table class="gy-table">
        <thead>
        <tr>
          <th>序号</th>
          <th>业务类型</th>
          <th>产品</th>
          <th>业务员</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in bizProductXrefList" :key="index">
          <td><span>{{index+1}}</span></td>
          <td><span>{{item.bizType | businessTradeType}}</span></td>
          <td><span>{{item.productName}}</span></td>
          <td><span>{{item.userName}}</span><br>
          <td class="caoz">
              <button class="gy-button-view edit" @click="dele(item.id)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange('xref',$event)"
      @prev-click="prevClick('xref',$event)"
      @next-click="nextClick('xref',$event)">
    </el-pagination>
    <el-dialog title="添加" :visible.sync="outerVisible" class="addBizDlg" width="450px">
      <el-form :model="addUserForm">
        <el-form-item label="业务类型" class="el-form-item" :label-width="formLabelWidth" >
          <el-select v-model="addUserForm.bizType" @change="changeBizType4Add()" clearable placeholder="请选择">
            <el-option
              v-for="item in $constant.bizType4CreateEss"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="商品"  class="el-form-item " :label-width="formLabelWidth" >
          <el-select v-model="addUserForm.productId" clearable placeholder="请选择">
            <el-option
              v-for="item in products"
              :key="item.prodId"
              :label="item.prodName"
              :value="item.prodId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="人员"  class="el-form-item"  :label-width="formLabelWidth">
          <input type="text" placeholder="请点击选择人员" v-model="addUserForm.userName" @click="openUsrSelDlg()" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class="gy-button-normal" @click="outerVisible = false">取 消</button>
        <button class="gy-button-extra" @click="addXref">确 定</button>
      </div>
    </el-dialog>
    <userList ref="myUserDlg" @affirmUser="affirmUser"></userList>
  </div>
</template>
<script>
import userList from '@/components/selectPersonnel';
export default {
    components: {
        userList
    },
    data () {
        return {
            querForm: {
                pageNo: 1,
                pageSize: 10,
                bizType: null,
                productId: null,
                userName: null
            },
            addUserForm: {
                bizType: null,
                productId: null,
                userId: null,
                userName: '',
                queryUserName: ''
            },
            quyUserForm: {
                pageNo: 1,
                pageSize: 10,
                organizationId: 2,
                username: null
            },
            bizProductXrefList: null,
            currEssenceId: null,
            currXrefUser: null,
            total: 0,
            outerVisible: false,
            currBusinessType: null,
            products: [],
            currProductId: null,
            propTitle: '选择用户',
            formLabelWidth: '120px'
        };
    },
    created () {
        this.search();
    },
    methods: {
        openUsrSelDlg () {
            this.$refs.myUserDlg.getUsers(null, this.addUserForm.userId);
        },
        affirmUser (data) {
            // 0 取消 1 确定
            if (data.type === 1) {
                this.addUserForm.userName = data.userName;
                this.addUserForm.userId = data.usrUserId;
            }
        },
        currentChange (type, pageNum) {
            this.changePage(type, pageNum);
        },
        search () {
            // 查询产品与业务员关系
            this.$http.post(this.$api.contractEssence.bizProductXrefList, this.querForm).then((res) => {
                this.bizProductXrefList = res.data.data.rows;
                this.total = res.data.data.total;
            }).catch((e) => {
                console.log(e);
            });
        },
        changePage (type, pageNum) {
            if (type === 'xref') {
                this.querForm.pageNo = pageNum;
                this.search();
            }
        },
        addBiz () {
            this.outerVisible = true;
            this.quyUserForm.username = null;
            this.addUserForm.bizType = null;
            this.addUserForm.productId = null;
            this.addUserForm.userName = null;
        },
        changeBizType4List () {
            // 查询业务类型支持的交易商品
            this.$http.get(this.$api.contract.getBizTradeProdList + '?bizId=' + this.querForm.bizType).then((res) => {
                this.products = res.data.data;
            }).catch((e) => {
                console.log(e);
            });
        },
        changeBizType4Add () {
            // 查询业务类型支持的交易商品
            this.$http.get(this.$api.contract.getBizTradeProdList + '?bizId=' + this.addUserForm.bizType).then((res) => {
                this.products = res.data.data;
            }).catch((e) => {
                console.log(e);
            });
        },
        dele (id) {
            this.$confirm('此操作将删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            //  调用删除接口
                this.$http.post(this.$api.contractEssence.delbizXrefUsers, {id: id}).then((res) => {
                    if (res.data.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.search();
                    }
                    if (res.data.code !== 0) {
                        this.$message({
                            type: 'error',
                            message: '删除失败'
                        });
                        console.log('删除失败');
                    }
                }).catch((e) => {
                    this.$message({
                        type: 'error',
                        message: '网络异常'
                    });
                    console.log(e);
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        addXref () {
            if (!this.check()) return false;
            //  调用添加接口
            this.$http.post(this.$api.contractEssence.addbizXrefUsers, this.addUserForm).then((res) => {
                if (res.data.code === 0) {
                    this.outerVisible = false;
                    this.search();
                }
                if (res.data.code !== 0) {
                    console.log('添加失败');
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        check () {
            if (!this.addUserForm.bizType) {
                this.$message({
                    message: '请选择业务类型',
                    type: 'error'
                });
                return false;
            }
            if (!this.addUserForm.productId) {
                this.$message({
                    message: '请选择商品',
                    type: 'error'
                });
                return false;
            }
            if (!this.addUserForm.userName) {
                this.$message({
                    message: '请选择执行人员',
                    type: 'error'
                });
                return false;
            }
            return true;
        }
    }
};
</script>
<style lang="scss" scoped>
  .dialog-footer {
    button:nth-child(1) {
      margin-right: 10px;
    }
  }
  .caoz {
      text-align: center !important;
      padding: 0 10px !important;
  }
</style>
<style lang="scss">
  .flow-list {
    .el-dialog__close {
      position: absolute;
      right: 1px;
      top: -8px;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    .addBizDlg {
      .el-dialog__body {
      padding-bottom: 10px;
      }
    }
  }
</style>
