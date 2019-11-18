<template>
  <div class="mall-shop">
    <!--header-->
    <header class="shop-header">
      <el-carousel style="width: 100%" :interval="3000" trigger="click" height="348px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
            <a target="_blank" class="carouselImgWrap" :href="item.linkUrl">
                <img class="carouselImg" :src="item.imageUrl" alt="">
            </a>
        </el-carousel-item>
      </el-carousel>
    </header>
    <!--main-->
    <section class="shop-main">
      <!--推荐产品-->
      <div class="shop-wrap">
        <div class="main-title gy-h1">
          <span>推荐产品</span>
        </div>
        <ul class="clearfix" v-for="(item, index) in hotListKeys" :key="index" v-if="hotList[item].length>0">
          <li :style="{ 'background': 'url(' + require('../assets/images/shop/productSort' + item + '.png') + ') no-repeat center center', 'background-size': '100% 100%'}"  @click="jump(item)">
            <!-- <p :class='"lookMore" + item' class="lookMore" @click="jump(item)">查看更多&gt;&gt;</p> -->
          </li>
          <li class="item-wrap" v-for="(items, index) in hotList[item]" :key="index" @click="gotoPage(items.id)">
              <div :style='"background-image: url(" + product + ")"' class="proImgwarp">
                  <img class="product-img" :src="items.skuPictureUrl" alt="">
              </div>
              <div class="preferentialInfo" :style='"background-image: url(" + textBackg + ")"'>
                  <div class="gy-h1" :title="(items.skuName && items.skuName.replace(/[^x00-xff]/g, 'aa').length > 22)? items.skuName : ''">{{items.skuName}}</div>
                  <div class="price">
                    <!-- 价格：<span>￥{{items.skuPrice}}</span>/吨 -->
                    <span v-if='items.skuPrice !== "0.00"'><span class="yanse">￥{{items.skuPrice}}</span>/吨
                    <span>{{items.skuPriceFlag == 1 ? "(可议价)" : ''}}</span></span>
                    <span v-else>单价面议</span>
                  </div>
                  <div>数量：{{items.skuQuantity}}</div>
                  <div>交割仓库：{{items.deliveryWarehouseName}}</div>
                  <div>{{items.sellerCompanyName}}</div>
              </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
    data: function () {
        return {
            productImg: require('../assets/images/shop/productSort1.png'),
            textBackg: require('../assets/images/shop/textBackg.png'),
            product: require('../assets/images/shop/product.png'),
            total: 0,
            form: {
                pageNo: 1,
                pageSize: 10
            },
            hotListKeys: ['1', '93', '2', '59', '3', '309', '511', '284', '353', '352', '62', '95', '530'],
            hotList: {
                '1': [],
                '93': [],
                '2': [],
                '59': [],
                '3': [],
                '309': [],
                '511': [],
                '284': [],
                '353': [],
                '352': [],
                '62': [],
                '95': [],
                '530': []
            },
            prodList: {},
            bannerList: [],
            companyId: this.$route.query.companyId
        };
    },
    created () {
        this.initHot();
        this.imgList();
    },
    methods: {
        // 热门推荐
        initHot () {
            var that = this;
            that.$http.post(that.$api.shop.hotRecommendV2).then(res => {
                console.log(res.data.data);
                that.prodList = res.data.data;
                Object.keys(that.prodList).forEach(function (key) {
                    that.prodList[key] && (that.hotList[key] = that.prodList[key].slice(0, 3));
                });
                console.log(that.hotList);
                // if (res.data.code === 0) {
                //     res.data.data.prodList.map((val) => {
                //         this.hotList[val.prodName] && this.hotList[val.prodName].push(val);
                //     });
                //     // this.hotList = res.data.data.prodList;
                //     this.total = res.data.data.prodCount;
                // }
            });
        },
        // 顶部轮播图
        imgList () {
            this.$http.get(this.$api.shop.advertising).then(res => {
                if (res.data.code === 0) {
                    this.bannerList = res.data.data;
                }
            });
        },
        // 跳转至列表页
        jump (itemId) {
            console.log(itemId);
            let routeData = this.$router.resolve({
                path: '/search',
                query: {productId: itemId}
            });
            window.open(routeData.href, '_blank');
        },
        // 跳转至详情页
        gotoPage (itemId) {
            let routeData = this.$router.resolve({
                path: '/product',
                query: {resourcesListId: itemId}
            });
            window.open(routeData.href, '_blank');
        }
    }
};
</script>
<style lang="scss" scoped>
.header {
    display: none!important;
}
.mall-shop {
  min-width: 1200px;
  background-color: $color-body-bg;
  .shop-header {
    width: 100%;
    .carouselImgWrap {
        display: block;
        .carouselImg {
        width: 100%;
        height: 350px;
        }
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
  .shop-main {
    background: #fff;
    /*公用*/
    .shop-wrap {
      width: 1200px;
      min-width: 1200px;
      margin: 0 auto 30px;
      .main-title {
        padding: 20px 0 5px;
        span {
          font-size: 16px;
          color: #333333;
        }
      }
      .gy-h1{
          font-size: 24px;
          line-height: 1.8;
          letter-spacing: 1px;
          font-weight: bold;
      }
      li {
        width: 23%;
        height: 369px;
        margin-right: 27px;
        margin-bottom: 20px;
        float: left;
        background-color: $color-white;
        position: relative;
        cursor: pointer;
        &:nth-of-type(4n){
          margin-right: 0px;
        }
        .lookMore{
          position: absolute;
          bottom: 16px;
          left: 30%;
          width: 108px;
          border-radius: 2px;
          text-align: center;
          color: #fff;
          padding: 4px  0;
          font-size: 14px;
        }
        .lookMore1, .lookMore93, .lookMore59, .lookMore309{
          background: #F78646;
        }
        .lookMore2, .lookMore511, .lookMore284, .lookMore353{
          background: #FFB92D;
        }
        .lookMore3, .lookMore352, .lookMore62, .lookMore95, .lookMore530{
          background: #3B94FF;
        }
        .proImgwarp{
            height: 200px;
            text-align: center;
            line-height: 200px;
            .product-img {
                width: 100px;
                height: 100px;
                &:not([src]) {
                    opacity: 0;
                }
            }
        }
        .preferentialInfo {
          padding-left: 24px;
          height: 169px;
          .gy-h1{
            width: 100%;
            max-width: 230px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 18px;
            padding: 12px 0 4px 0;
          }
          .price{
            .yanse{
              color: #E0370F;
              font-size: 20px;
            }
          }
        }
      }
      li:hover {
          transition: all .5s;
          box-shadow: 0 10px 15px 0 rgba(0,0,0,.1);
      }
    }
  }
}
</style>
