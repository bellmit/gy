<template>
  <div>
    <div class="recommend news">
        <div class="container">
            <h3 class="gy-h3">热门价格</h3>
            <div class="list">
                <div class="operation-menu">
                    <router-link :to="{ name: 'generalize-price-myadd' }" class="gy-button-extra">新增</router-link>
                    <button @click="edit" class="gy-button-normal">编辑</button>
                    <button @click="del" class="gy-button-normal">删除</button>
                </div>
                <table class="gy-table">
                    <thead>
                    <tr>
                        <th>选择</th>
                        <td>价格名字</td>
                        <td>价格数值</td>
                        <td>价格单位</td>
                        <td>价格时间</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in newsList.indexList" :key="index">
                        <th><input type="checkbox" :checked="checkedList.indexOf(item.id) >= 0" @change="handleCheckChange(item.id,item.indexName,item.unitValue)"></th>
                        <td>{{item.indexName}}</td>
                        <td>{{item.indexNum}}</td>
                        <td>{{item.unitValue}}</td>
                        <td>{{item.indexDate}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="pagination" v-if="newsList.indexCount > newsList.pageSize">
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :current-page.sync = "newsList.pageNo"
                      :page-size="newsList.pageSize"
                      :total="newsList.indexCount"
                      @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
    <!--编辑弹窗-->
    <div class="price">
      <el-dialog width="40%" title="编辑价格" :visible.sync="priceEDI">
        <el-form :model="formedit"  :rules="rules" ref="formedit">
          <el-row :gutter="10">
            <div class="pricetc1">{{indexName}}    ({{indexNamedw}})</div>
            <div class="pricetc2">
              <el-form-item prop="indexNumvalue">
                <el-input v-model="formedit.indexNumvalue"></el-input>
              </el-form-item>
            </div>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="gy-button-extra" type="primary" @click="priceEDIBtn('formedit')">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script>
export default {
    data () {
        return {
            newsList: [],
            newsData: {
                keywords: null,
                pageNum: 1,
                pageSize: 10
            },
            checkedList: [],
            priceEDI: false,
            formedit: {
                indexNumvalue: ''
            },
            indexName: '',
            indexNamedw: '',
            rules: {
                indexNumvalue: [
                    { required: true, pattern: /^\d+(\.\d{2})?$/, message: '只能输入数字', trigger: 'blur' }
                ]
            }
        };
    },
    created () {
        this.getNewsList(1);
    },
    methods: {
        getNewsList (n) {
            this.newsData.pageNum = n;
            this.$http.post(this.$api.market.priceList, this.newsData)
                .then(res => {
                    this.newsList = res.data.data;
                });
        },
        handleCurrentChange: function (r) {
            this.getNewsList(r);
        },
        handleCheckChange (id, indexName, indexNamedw) {
            let idx = this.checkedList.indexOf(id);
            idx >= 0 ? this.checkedList.splice(idx, 1) : this.checkedList.push(id);
        },
        edit () {
            let that = this;
            for (let i = 0; i < this.newsList.indexList.length; i++) {
                if (this.newsList.indexList[i].id === this.checkedList[0]) {
                    this.indexName = this.newsList.indexList[i].indexName;
                    this.indexNamedw = this.newsList.indexList[i].unitValue;
                }
            }
            that.verify(that, function () {
                that.priceEDI = true;
            });
        },
        priceEDIBtn (formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    that.$http.post(that.$api.market.priceUP, {
                        'id': this.checkedList[0],
                        'indexNum': this.formedit.indexNumvalue
                    })
                        .then(function (res) {
                            if (res.data.code === 0) {
                                that.getNewsList();
                                that.priceEDI = false;
                                that.checkedList = [];
                                that.indexName = '';
                                that.indexNamedw = '';
                                that.formedit.indexNumvalue = '';
                            } else {
                                that.priceEDI = false;
                                that.$alert(res.data.message, '出错了');
                            }
                        });
                }
            });
        },
        del () {
            let that = this;
            // that.newsList.indexList.forEach(item => {
            //     item.id === that.checkedList[0];
            // });
            that.verify(that, function () {
                that.$confirm('确认删除选择的热门价格吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$http.get(that.$api.market.priceDel + '/' + that.checkedList[0])
                        .then(function (res) {
                            if (res.data.code === 0) {
                                that.getNewsList();
                                that.checkedList = [];
                            } else {
                                that.$alert(res.data.message, '出错了');
                            }
                        });
                }).catch(() => {
                });
            });
        },
        verify (that, callback) {
            if (that.checkedList.length === 0) {
                that.$alert('请选择一条热门价格', '提示');
                return;
            }
            if (that.checkedList.length > 1) {
                that.$alert('只能选择一条热门价格', '提示');
                return;
            }
            typeof callback === 'function' && callback();
        }
    }
};
</script>
<style lang="scss" scoped>
    .recommend.news{
        .container{
            padding: 25px 35px;
        }
        .gy-h3{
            font-weight: normal;
            margin: 0;
        }
        .operation-menu{
            text-align: right;
            margin-bottom: 10px;
        }
    }
  .price{
    .pricetc1{
      float: left;
      width: 35%;
      text-align: center;
    }
    .pricetc2{
      float: left;
      width: 50%;
    }
  }
</style>
