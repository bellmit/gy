<template>
  <div class="commodity-main">
    <div class="list">
      <div class="operation-menu" style="margin-top: 10px">
        <button @click="view2" class="gy-button-extra">生成商品</button>
      </div>
      <table class="gy-table">
        <thead>
        <tr>
          <!--<th>选择</th>-->
          <td>商品名称</td>
          <td>商品编码</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in productInfo" :key="index">
          <!--<th><input type="checkbox" :checked="checkedList.indexOf(item.id) >= 0" @change="handleCheckChange(item.id)"></th>-->
          <td>{{item.goodsName}}</td>
          <td>{{item.goodsCode}}</td>
        </tr>
        </tbody>
      </table>
      <div class="pagination-wrapper" v-if="productInfo.total > productInfo.pageSize">
        <div class="pagination-total">共{{productInfo.total}}条</div>
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
export default {
    data () {
        return {
            productInfo: '',
            keyObj: {
                categoryName: '',
                categoryLevel: '',
                keywords: ''
            },
            checkedList: []
        };
    },
    created () {
        this.id = this.$route.query.id;
        this.getList();
    },
    methods: {
        getList (k, n, s) {
            this.$http.get(this.$api.product.productProductionGoods + '/' + this.id)
                .then((res) => {
                    this.productInfo = res.data.data;
                });
        },
        handleCurrentChange (r) {
            this.getList(this.keyObj, r, 10);
        },
        handleCheckChange (id) {
            let idx = this.checkedList.indexOf(id);
            idx >= 0 ? this.checkedList.splice(idx, 1) : this.checkedList.push(id);
        },
        verify (that, callback) {
            if (this.checkedList.length === 0) {
                this.$alert('请选择一个产品', '提示');
                return;
            }
            if (this.checkedList.length > 1) {
                this.$alert('只能选择一个产品', '提示');
                return;
            }
            typeof callback === 'function' && callback();
        },
        view2 () {
            this.$confirm('<span><i class="iconfont icon-message-warning"></i>生成商品功能会将原来的商品禁用，根据属性重新生成新的商品，是否继续</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.$http.post(this.$api.product.productProductionGoods + '/' + this.id)
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.$message.success('生成商品成功');
                            this.getList();
                        }
                    });
            });
        }
    }
};
</script>
<style lang="scss" scoped>
  .commodity-main{
    overflow: hidden;
    .newSearch{
      overflow: hidden;
      .right_div{
        float: right;
      }
    }
    .operation-menu{
      float: right;
    }
  }
</style>
