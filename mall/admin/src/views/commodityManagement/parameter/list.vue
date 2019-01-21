<template>
  <div class="commodity-main">
    <div class="gy-h4">参数列表</div>
    <!-- @search="" -->
    <div class="newsearch">
      <div class="se">
        <commodity-search :keywords.sync="keyObj.keywords" @search="searchList"></commodity-search>
      </div>
    </div>
    <div class="list" style="overflow: hidden">
      <div class="operation-menu" style="float: right">
        <button type="button" @click="$router.push({ path: 'add' })" class="gy-button-extra">添加</button>
        <button type="button" @click="edit" class="gy-button-normal">编辑</button>
        <!--<button @click="del" class="gy-button-normal">删除</button>-->
        <button type="button" @click="view" class="gy-button-normal">查看</button>
      </div>
      <table class="gy-table">
        <thead>
        <tr>
          <!--<th><input type="checkbox" :checked="checkedList.length === parameterInfo.list.length" @change="handleCheckAllChange"> 全选</th>-->
          <th>选择</th>
          <td>参数名称</td>
          <td>参数描述</td>
          <td>状态</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in parameterInfo.list" :key="index">
          <th><input type="checkbox" :checked="checkedList.indexOf(item.id) >= 0" @change="handleCheckChange(item.id)">
          </th>
          <td>{{item.propertyName}}</td>
          <td>{{item.propertyDesc}}</td>
          <td>{{item.valid === 1 ? '可用' : '不可用'}}</td>
        </tr>
        </tbody>
      </table>
      <div class="pagination-wrapper" v-if="parameterInfo.total > parameterInfo.pageSize">
        <div class="pagination-total">共{{parameterInfo.total}}条</div>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="parameterInfo.pageNum"
          :page-size="parameterInfo.pageSize"
          :total="parameterInfo.total"
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
            parameterInfo: '',
            keyObj: {
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
    watch: {
        $route: 'getList'
    },
    methods: {
        getList (k, n, s) {
            this.$http.post(this.$api.parameter.list, {data: k, pageNum: n, pageSize: s})
                .then((res) => {
                    this.parameterInfo = res.data.data;
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
        // handleCheckAllChange () {
        //     this.checkAll = !this.checkAll;
        //     if (this.checkAll) {
        //         this.checkedList = [];
        //         this.categoryInfo.list.forEach((item) => {
        //             this.checkedList.push(item.id);
        //         }, this);
        //         return;
        //     }
        //     this.checkedList = [];
        // },
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
        del () {
            let valid;
            this.parameterInfo.list.forEach((item) => {
                item.id === this.checkedList[0] && (valid = item.propertyStatus);
            });
            this.verify(this, () => {
                this.$confirm('<span><i class="iconfont icon-message-error"></i>确认删除选择的参数吗?</span>', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true
                }).then(() => {
                    this.$http.put(this.$api.parameter.del, {
                        id: this.checkedList[0],
                        propertyStatus: Number(valid) === 1 ? 0 : 1
                    })
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
                this.$message.error('请选择一条参数');
                return;
            }
            if (this.checkedList.length > 1) {
                this.$message.error('只能选择一条参数');
                return;
            }
            typeof callback === 'function' && callback();
        }
    }
};
</script>
<style lang="scss" scoped>
  @import './../../../styles/module/CMList';
  .newsearch {
    overflow: hidden;
    .se {
      float: right;
    }
  }
</style>
