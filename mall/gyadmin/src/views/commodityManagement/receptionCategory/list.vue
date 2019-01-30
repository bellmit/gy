<template>
  <div class="commodity-main">
    <div class="gy-h4">前台类目列表</div>
    <div class="newSearch">
      <div class="right_div">
        <div class="right_div1">
          <commodity-search ref="subKeywordscom" :keywords.sync="keyObj.keywords"
                            @search="searchList"></commodity-search>
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
        <div class="l">上级类目</div>
        <el-cascader style="width: 100%"
                     change-on-select
                     :options="lmlists"
                     v-model="lmlistsvalue"
                     @change="handleChange">
        </el-cascader>
      </div>
      <div class="gy-form-group">
        <div class="l">层级</div>
        <input type="text" v-model="keyObj.catalogueLevel" placeholder="请输入层级"/>
        <i class="iconfont icon-search" @click="bigSearchclick"></i>
      </div>
    </div>
    <div class="list">
      <div class="operation-menu">
        <button type="button" @click="$router.push({ path: 'add' })" class="gy-button-extra">添加</button>
        <button @click="edit" class="gy-button-normal">编辑</button>
        <!--<button @click="del" class="gy-button-normal">删除</button>-->
        <!--<button @click="attribute" class="gy-button-normal">属性</button>-->
        <!--<button @click="param" class="gy-button-normal">参数</button>-->
        <button @click="view" class="gy-button-normal">查看</button>
      </div>
      <table class="gy-table">
        <thead>
        <tr>
          <!--<th><input type="checkbox" :checked="checkedList.length === categoryInfo.list.length" @change="handleCheckAllChange"> 全选</th>-->
          <th>选择</th>
          <td>类目名称</td>
          <td>类目描述</td>
          <td>类目层级</td>
          <td>状态</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in reception.list" :key="index">
          <th><input type="checkbox" :checked="checkedList.indexOf(item.id) >= 0" @change="handleCheckChange(item.id)">
          </th>
          <th>{{item.catalogueName}}</th>
          <th>{{item.catalogueDescription}}</th>
          <th>{{item.catalogueLevel}}</th>
          <th>{{item.valid | valid}}</th>
        </tr>
        </tbody>
      </table>
      <div class="pagination-wrapper" v-if="reception.total > reception.pageSize">
        <div class="pagination-total">共{{reception.total}}条</div>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="reception.pageNum"
          :page-size="reception.pageSize"
          :total="reception.total"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import commoditySearch from '../../../components/commoditysearch.vue';

export default {
    name: 'list',
    data () {
        return {
            reception: {},
            checkedList: [],
            categoryw: [],
            keyObj: {
                catalogueName: '',
                catalogueLevel: '',
                valid: ''
            },
            bigsearchShow: false,
            lmlists: [],
            lmlistsvalue: [],
            mycevalue: '' // 高级搜索层级的id
        };
    },
    components: {
        commoditySearch
    },
    created () {
        this.receptionList();
        this.childSearchList();
    },
    methods: {
        // 查询类目以及子类目
        childSearchList () {
            this.$http.get(this.$api.receptionCategory.list + '?categoryId=' + '')
                .then(res => {
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
        bigSearchclick () {
            this.keyObj.keywords = this.$refs.subKeywordscom.subKeywords;
            this.keyObj.id = this.mycevalue;
            this.receptionList(this.keyObj);
        },
        bigSearch () {
            this.bigsearchShow = (this.bigsearchShow !== true);
        },
        receptionList (k, n, s) {
            this.$http.post(this.$api.receptionCategory.list, {data: k, pageNum: n, pageSize: s})
                .then((res) => {
                    if (res.data.code === 0) {
                        this.reception = res.data.data;
                        this.checkedList = [];
                    }
                });
        },
        handleCheckChange (id) {
            let idx = this.checkedList.indexOf(id);
            idx >= 0 ? this.checkedList.splice(idx, 1) : this.checkedList.push(id);
        },
        handleCurrentChange (r) {
            this.receptionList(this.keyObj, r, 10);
        },
        del () {
            this.verify(this, () => {
                this.$confirm('<span><i class="iconfont icon-message-error"></i>确认删除选择的类目吗?</span>', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true
                }).then(() => {
                    this.categoryw.id = this.checkedList[0];
                    for (let i = 0; i < this.reception.list.length; i++) {
                        if (this.reception.list[i].id === this.categoryw.id) {
                            this.reception.list[i].valid = 0;
                            this.categoryValid = this.reception.list[i].valid;
                        }
                    }
                    this.$http.put(this.$api.receptionCategory.add, {id: this.checkedList[0], valid: this.categoryValid})
                        .then((res) => {
                            if (res.data.code === 0) {
                                this.$message.success('删除成功');
                                this.receptionList();
                            }
                        });
                }).catch(() => {
                });
            });
        },
        edit () {
            this.verify(this, () => {
                this.$router.push({path: 'add', query: {id: this.checkedList[0]}});
            });
        },
        view () {
            this.verify(this, () => {
                this.$router.push({path: 'view', query: {id: this.checkedList[0]}});
            });
        },
        verify (that, callback) {
            if (this.checkedList.length === 0) {
                this.$message.error('请选择一条类目', '提示');
                return;
            }
            if (this.checkedList.length > 1) {
                this.$message.error('只能选择一条类目', '提示');
                return;
            }
            typeof callback === 'function' && callback();
        },
        searchList () {
            this.receptionList(this.keyObj);
        }
    }
};
</script>
<style lang="scss" scoped>
@import './../../../styles/module/CMList';
.gy-form-group {
  padding-left: 66px;
  .l {
    width: 56px;
  }
}
</style>
