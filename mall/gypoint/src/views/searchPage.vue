<template>
    <div class="point-home goods-more">
      <div class="goods">
        <div class="crumbs">商城首页 > 搜索结果</div>
          <ul>
              <li v-for="(item, idx) in goods" :key="idx">
                <router-link :to="{name: 'detail', params:item, query: {'id':item.id}}">
                  <div class="img">
                    <img class="goods-img" :src="item.filePath" alt="">
                    <img v-if="item.soldOut" class="sell-out" src="../assets/images/sell-out-box.png" alt="">
                  </div>
                  <div class="name">{{item.redemptionName}}</div>
                  <div class="integral"><em>{{item.redemptionPrice}} </em> 积分</div>
                </router-link>
              </li>
          </ul>
      </div>
      <div class="block">
          <el-pagination
              background
              @current-change="sizeChange"
              :current-page.sync="pages.pageNum"
              :page-size="pages.pageSize"
              layout="prev, pager, next"
              :total="total">
          </el-pagination>
      </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            pages: {
                pageNum: 1,
                pageSize: 20,
                data: {
                    keywords: this.$route.query.keywords
                }
            },
            total: null,
            goods: []
        };
    },
    watch: {
        '$route.query.keywords' (to, from) {
            this.pages.data.keywords = to;
            this.search();
        }
    },
    created () {
        this.init();
    },
    mounted () {
    },
    methods: {
        init () {
            this.search();
        },
        sizeChange (v) {
            this.pages.pageNum = v;
            this.search();
        },
        search () {
            const me = this;
            me.$http.post(this.$api.category.search, me.pages)
                .then(res => {
                    if (res.data.code === 0) {
                        me.goods = res.data.data.list;
                        me.total = res.data.data.total;
                        if (me.total === 0) {
                            me.$router.push({path: '/search404'});
                        }
                    } else {
                        me.$alert(res.data.message);
                    }
                });
        }
    }
};
</script>
<style lang="scss" scoped>
.goods-more {
  // .crumbs {
  //   margin: 0 auto;
  // }
  .goods {
    margin-bottom: 31px;
  }
  .block {
    margin-bottom: 61px;
  }
}
</style>
