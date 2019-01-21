<template>
    <div class="commodity-main">
        <div class="gy-h4">产品列表</div>
        <div class="newSearch">
          <div class="right_div">
            <div class="right_div1">
              <commodity-search :keywords.sync="keyObj.keywords" @search="searchList"></commodity-search>
            </div>
            <!--高级搜索-->
            <div class="right_div2" @click="bigSearch">
              <span>高级搜索</span>
              <i class="iconfont icon-arrow-down"></i>
            </div>
          </div>
        </div>
      <!--高级搜索条件展示-->
        <div class="bigsearchShow" v-show="bigsearchShow">
          <div class="gy-form-group">
              <div class="l">前台类目</div>
              <el-cascader style="width: 100%"
                           change-on-select
                           :options="lmlists"
                           v-model="lmlistsvalue"
                           @change="handleChange">
              </el-cascader>
          </div>
          <div class="gy-form-group">
            <div class="l">后台台类目</div>
              <el-cascader style="width: 100%"
                           change-on-select
                           :options="lmlists2"
                           v-model="lmlistsvalue2"
                           @change="handleChange2">
              </el-cascader>
          </div>
        </div>
        <div class="list">
            <div class="operation-menu">
                <button @click="$router.push({path: 'add'})" class="gy-button-extra">添加</button>
                <button @click="edit" class="gy-button-normal">编辑</button>
                <!--<button @click="del" class="gy-button-normal">删除</button>-->
                <button @click="attribute" class="gy-button-normal">属性</button>
                <!--<button @click="param" class="gy-button-normal">参数</button>-->
                <button @click="view" class="gy-button-normal">查看</button>
                <button @click="view2" class="gy-button-normal">生成商品</button>
            </div>
            <table class="gy-table">
                <thead>
                <tr>
                    <th>选择</th>
                    <td>产品名称</td>
                    <td>前台类目</td>
                    <td>后台类目</td>
                    <td>产品描述</td>
                    <td>状态</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in productInfo.list" :key="index">
                    <th><input type="checkbox" :checked="checkedList.indexOf(item.id) >= 0" @change="handleCheckChange(item.id)"></th>
                    <td>{{item.productName}}</td>
                    <td>{{item.catalogueName}}</td>
                    <td>{{item.categoryNames}}</td>
                    <td>{{item.productDescription}}</td>
                    <td>{{item.valid === 1 ? '可用' : '不可用'}}</td>
                </tr>
                </tbody>
            </table>
            <div class="pagination-wrapper" v-if="productInfo.total > productInfo.pageSize">
                <div class="pagination-total">共 {{productInfo.total}} 条</div>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :current-page.sync = "productInfo.pageNum"
                  :page-size="productInfo.pageSize"
                  :total="productInfo.total"
                  @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import commoditySearch from '../../../components/commoditysearch.vue';
export default {
    data () {
        return {
            productInfo: '',
            keyObj: {
                keywords: ''
            },
            checkedList: [],
            bigsearchShow: false,
            lmlists: [],
            lmlists2: [],
            lmlistsvalue: [],
            lmlistsvalue2: [],
            mycevalue: '',
            mycevalue22: ''
        };
    },
    components: {
        commoditySearch
    },
    created () {
        this.getList();
        this.childSearchList();
        this.childSearchList2();
    },
    methods: {
        // 查询类目以及子类目
        childSearchList () {
            this.$http.get(this.$api.category.catalogues)
                .then((res) => {
                    let data = res.data.data;
                    for (let i = 0; i < data.length; i++) {
                        data[i]['label'] = data[i].catalogueName;
                        data[i]['value'] = data[i].id;
                        data[i]['children'] = data[i].catalogueModelList;
                        if (data[i].children !== null) {
                            for (let j = 0; j < data[i].children.length; j++) {
                                data[i].children[j]['label'] = data[i].children[j].catalogueName;
                                data[i].children[j]['value'] = data[i].children[j].id;
                            }
                        } else {
                            data[i].children = [];
                        }
                    }
                    this.lmlists = data;
                }
                );
        },
        handleChange (value) {
            this.mycevalue = value[value.length - 1];
        },
        childSearchList2 () {
            this.$http.get(this.$api.category.categories)
                .then((res) => {
                    let data = res.data.data;
                    for (let i = 0; i < data.length; i++) {
                        data[i]['label'] = data[i].categoryName;
                        data[i]['value'] = data[i].id;
                        data[i]['children'] = data[i].categoryList;
                        if (data[i].children !== null) {
                            for (let j = 0; j < data[i].children.length; j++) {
                                data[i].children[j]['label'] = data[i].children[j].categoryName;
                                data[i].children[j]['value'] = data[i].children[j].id;
                            }
                        } else {
                            data[i].children = [];
                        }
                    }
                    this.lmlists2 = data;
                });
        },
        handleChange2 (value) {
            this.mycevalue22 = value[value.length - 1];
        },
        bigSearch () {
            this.bigsearchShow = (this.bigsearchShow !== true);
        },
        getList (k, n, s) {
            this.$http.post(this.$api.product.list, {data: k, pageNum: n, pageSize: s})
                .then((res) => {
                    this.productInfo = res.data.data;
                });
        },
        searchList () {
            this.keyObj.catalogueId = this.mycevalue;
            this.keyObj.categoryId = this.mycevalue22;
            this.getList(this.keyObj);
        },
        del () {
            this.verify(this, () => {
                this.$confirm('<span><i class="iconfont icon-message-error"></i>确认删除该条产品吗?</span>', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true
                }).then(() => {
                    this.$http.put(this.$api.product.del, [this.checkedList[0]])
                        .then((res) => {
                            if (res.data.code === 0) {
                                this.getList();
                            }
                        });
                }).catch(() => {
                });
            });
        },
        handleCurrentChange (r) {
            this.keyObj.catalogueId = this.mycevalue;
            this.keyObj.categoryId = this.mycevalue22;
            this.getList(this.keyObj, r, 10);
        },
        handleCheckChange (id) {
            let idx = this.checkedList.indexOf(id);
            idx >= 0 ? this.checkedList.splice(idx, 1) : this.checkedList.push(id);
        },
        verify (that, callback) {
            if (this.checkedList.length === 0) {
                this.$message.error('请选择一个产品', '提示');
                return;
            }
            if (this.checkedList.length > 1) {
                this.$message.error('只能选择一个产品', '提示');
                return;
            }
            typeof callback === 'function' && callback();
        },
        edit () {
            this.verify(this, () => {
                this.$router.push({path: 'add', query: {id: this.checkedList[0]}});
            });
        },
        param () {
            this.verify(this, () => {
                this.$router.push({path: 'parameter', query: {id: this.checkedList[0]}});
            });
        },
        attribute () {
            this.verify(this, () => {
                this.$router.push({path: 'attribute', query: {id: this.checkedList[0]}});
            });
        },
        view () {
            this.verify(this, () => {
                this.$router.push({path: 'view', query: {id: this.checkedList[0]}});
            });
        },
        view2 () {
            this.verify(this, () => {
                this.$router.push({path: 'productNew', query: {id: this.checkedList[0]}});
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import './../../../styles/module/CMList';
.gy-form-group {
  padding-left: 81px;
  .l {
    width: 71px;
  }
}
.gy-form-group:nth-child(odd) {
   padding-right: 30px;
}
.gy-form-group:nth-child(even) {
  padding-left: 111px;
  .l {
    width: 101px;
    padding-left: 30px;
  }
}
</style>
