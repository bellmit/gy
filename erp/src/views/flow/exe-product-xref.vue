<template>
  <div class="flow-list">
    <header>
      <div class="title">产品-执行人员关系</div>
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
        <span class="l">执行人员</span>
        <input type="text" placeholder="请输入" v-model="querForm.userName">
        <span class="searchicon" @click="search()"><i class="iconfont icon-search"></i></span>
      </div>
    </el-form>
    <div class="add-wrap">
      <el-button type="primary" :loading="cacheLoading"  class="gy-button-extra"   @click="syncCache">同步到缓存中 </el-button>
      <button type="button" class="gy-button-extra" @click="addBiz">添加</button>
    </div>
    <div class="div">
      <table class="gy-table">
        <thead>
        <tr>
          <th>序号</th>
          <th>业务类型</th>
          <th>产品</th>
          <th>执行员</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in exeProductXrefList" :key="index">
          <td><span>{{index+1}}</span></td>
          <td><span>{{item.bizType | businessTradeType}}</span></td>
          <td><span>{{item.productName}}</span></td>
          <td><span>{{item.userName}}</span><br>
          <td>
              <button class="gy-button-view edit" @click="dele(item)">删除</button>
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
    <el-dialog title="添加" :visible.sync="outerVisible" width="450px">
      <el-form :model="addUserForm">
        <el-form-item label="业务类型"  class="el-form-item "  :label-width="formLabelWidth" >
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
        <el-form-item  label="人员"  class="el-form-item "  :label-width="formLabelWidth">
          <el-input placeholder="请点击选择人员" v-model="addUserForm.userName" @focus="openUsrSelDlg()"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary"  @click="addXref">确 定</el-button>
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
            exeProductXrefList: null,
            currEssenceId: null,
            currXrefUser: null,
            total: 0,
            currBusinessType: null,
            products: [],
            currProductId: null,
            formLabelWidth: '120px',
            cacheLoading: false,
            propTitle: '选择用户',
            outerVisible: false, // 添加dia
            addUserForm: {
                bizType: null,
                productId: null,
                userId: null,
                userName: null,
                queryUserName: null
            }
        };
    },
    created () {
        this.search();
    },
    methods: {
        openUsrSelDlg () {
            this.$refs.myUserDlg.getUsers();
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
            // 查询产品与执行员关系
            this.$http.post(this.$api.contractEssence.exeProductXrefList, this.querForm).then((res) => {
                this.exeProductXrefList = res.data.data.rows;
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
        dele (item) {
            this.$confirm('此操作将删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //  调用删除接口
                this.$http.post(this.$api.contractEssence.delexeXrefUsers, item).then((res) => {
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
            this.$http.post(this.$api.contractEssence.addexeXrefUsers, this.addUserForm).then((res) => {
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
        syncCache () {
            this.cacheLoading = true;
            // 调用同步缓存接口
            this.$http.post(this.$api.contractEssence.syncCached).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '同步缓存成功',
                        type: 'success'
                    });
                }
                if (res.data.code !== 0) {
                    this.$message({
                        message: '同步缓存失败',
                        type: 'error'
                    });
                }
                this.cacheLoading = false;
            }).catch((e) => {
                this.cacheLoading = false;
                this.$message({
                    message: '网络异常',
                    type: 'error'
                });
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
