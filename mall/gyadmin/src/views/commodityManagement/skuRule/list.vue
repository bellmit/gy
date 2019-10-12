<template>
  <div class="commodity-main">
    <div class="gy-h4">规则列表</div>
    <div class="newadd">
      <div class="div1">
        <commodity-search :keywords.sync="keyObj.keywords" @search="searchList"></commodity-search>
      </div>
    </div>
    <div class="list">
      <div class="operation-menu newR">
        <button type="button" @click="$router.push({ path: 'add' })" class="gy-button-extra">添加</button>
        <button type="button" @click="edit" class="gy-button-normal">编辑</button>
        <!--<button @click="del" class="gy-button-normal">删除</button>-->
        <button type="button" @click="view" class="gy-button-normal mr0">查看</button>
      </div>
      <table class="gy-table">
        <thead>
        <tr>
          <th>选择</th>
          <th>SKU规则名称</th>
          <th>SKU规则前缀</th>
          <th>SKU当前数</th>
          <th>SKU规则描述</th>
          <th>显示顺序</th>
          <th>状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in skuInfo.list" :key="index">
          <th><input type="checkbox" :checked="checkedList.indexOf(item.id) >= 0" @change="handleCheckChange(item.id)">
          </th>
          <td>{{item.skuNoRuleName}}</td>
          <td>{{item.skuNoPrefix}}</td>
          <td>{{item.skuNoCurrentNum}}</td>
          <td>{{item.skuNoRuleDescription}}</td>
          <td>{{item.skuNoOrder}}</td>
          <td v-if="item.valid === 0">不可用</td>
          <td v-if="item.valid === 1">可用</td>
          <td v-if="item.valid === 2">禁用</td>
        </tr>
        </tbody>
      </table>
      <div class="pagination-wrapper" v-if="skuInfo.total > skuInfo.pageSize">
        <div class="pagination-total">共{{skuInfo.total}}条</div>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="skuInfo.pageNum"
          :page-size="skuInfo.pageSize"
          :total="skuInfo.total"
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
            skuInfo: '',
            currentPage: 1,
            keyObj: {
                skuNoOrder: '',
                skuNoRuleName: '',
                keywords: ''
            },
            checkedList: []
        };
    },
    components: {
        commoditySearch
    },
    created () {
        this.getList();
    },
    methods: {
        getList (k, n, s) {
            this.$http.post(this.$api.sku.list, {data: k, pageNum: n, pageSize: s})
                .then((res) => {
                    this.skuInfo = res.data.data;
                    this.checkedList = [];
                });
        },
        searchList () {
            this.getList(this.keyObj);
        },
        handleCurrentChange (r) {
            this.getList(this.keyObj, r, 10);
        },
        handleCheckChange (id) {
            let idx = this.checkedList.indexOf(id);
            idx >= 0 ? this.checkedList.splice(idx, 1) : this.checkedList.push(id);
        },
        edit () {
            this.verify(this, () => {
                for (let i = 0; i < this.skuInfo.list.length; i++) {
                    if (this.skuInfo.list[i].id === this.checkedList[0]) {
                        if (this.skuInfo.list[i].valid === 2) {
                            this.$message.error('当前规则为禁用状态，无法编辑');
                            return;
                        }
                    }
                }
                this.$router.push({path: 'add', query: {id: this.checkedList[0]}});
            });
        },
        view () {
            this.verify(this, () => {
                this.$router.push({path: 'view', query: {id: this.checkedList[0]}});
            });
        },
        del () {
            let valid;
            this.verify(this, () => {
                this.skuInfo.list.forEach((item) => {
                    item.id === this.checkedList[0] && (valid = item.optionStatus);
                });
                this.$confirm('<span><i class="iconfont icon-message-error"></i>确认删除选择的规则吗?</span>', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true
                }).then(() => {
                    this.$http.put(this.$api.sku.add, {id: this.checkedList[0], valid: Number(valid) === 1 ? 0 : 1})
                        .then((res) => {
                            if (res.data.code === 0) {
                                this.getList();
                            }
                        });
                }).catch(() => {
                });
            });
        },
        verify (that, callback) {
            if (this.checkedList.length === 0) {
                this.$message.error('请选择一条规则');
                return;
            }
            if (this.checkedList.length > 1) {
                this.$message.error('只能选择一条规则');
                return;
            }
            typeof callback === 'function' && callback();
        }
    }
};
</script>
<style lang="scss" scoped>
@import './../../../styles/module/CMList';
.commodity-main .search {
   text-align: right;
}
</style>
