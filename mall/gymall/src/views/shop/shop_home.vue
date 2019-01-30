<template>
  <div class="mall-shop">
    <!--header-->
    <header class="shop-header">
      <el-carousel :interval="3000" trigger="click" height="500px" :initialIndex-index=initialIndex>
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
            <a target="_blank" class="carouselImgWrap" :href="item.redirectionTo">
                <img class="carouselImg" :src="item.absoluteUrl" alt="">
            </a>
        </el-carousel-item>
      </el-carousel>
    </header>
    <!--main-->
    <section class="shop-main">
      <!--热门促销-->
      <div class="shop-wrap shop-wrap-1">
        <div class="main-title gy-h1">
          <img src="../../assets/images/shop/icon-privilege.png" alt="">
          <span>热门促销</span>
        </div>
        <ul class="clearfix">
          <li v-for="(items,index) in hotList" :key="index">
               <!-- v-show="item.offerStatus === 0" -->
              <div class="product-item pointer" v-for="(item,idx) in items.offerModelList" :key="idx" :class="{oneFirstAct:items.promoType==4}" @click="gotoPage($event,'product-detail')" :item-id="item.id">
                    <img class="product-icon" v-if="items.promoType==4" src="../../assets/images/shop/icon-limit.png" alt="">
                    <img class="product-icon" v-if="items.promoType!==4" src="../../assets/images/shop/icon-hot.png" alt="">
                  <!--热销 1  -->
                  <!--推荐 2  -->
                  <!--降价 3  -->
                  <!--限时优惠preferential 4-->
                  <div class="item-wrap">
                    <div class="gy-h3 title">{{item.skuName}}</div>
                    <div class="preferentialInfo">
                      <div>数量: {{item.skuQuantity}} {{item.infUnitOfMeasureDisplayName}}</div>
                      <div>交割仓库: {{item.deliveryWarehouseName}}</div>
                      <div>交割日期: {{item.deliveryEndDate | date}}</div>
                    </div>
                      <span class="price">
                          <em v-if="item.skuPrice">￥{{item.skuPrice}}/{{item.infUnitOfMeasureDisplayName}}</em>
                          <em v-else>单价面议</em>
                      </span>
                  </div>
                  <img class="product-img" :class="{'first-img':items.promoType==4}" :src="item.skuPictureUrl" alt="">
              </div>
          </li>
        </ul>
      </div>
      <!--产品分类-->
      <div class="shop-wrap shop-wrap-2" v-if="vals.length > 0">
        <div class="main-title gy-h1">
          <span>产品分类</span>
        </div>
        <ul class="clearfix" v-for="(items, index) in vals" :key="index">
            <li>
              <div class="product-item firstActive" :style="{backgroundImage: 'url(' + items.absoluteUrl + ')', backgroundSize:'cover'}">
                <div class="product-info first-product">
                  <!--首个-->
                  <div class="gy-h3 product-clas">{{items.title}}</div>
                </div>
              </div>
            </li>
            <li v-for="(item, idx) in items.data" :key="idx">
              <div class="product-item pointer" @click="gotoPageCatalogue(item.id,'product-detail')">
                <div class="product-info">
                  <img class="product-img" :src="item.skuPictureUrl" alt="">
                  <div class="product-bottom">
                    <div class="gy-h3">{{item.skuName}}</div>
                    <div>数量:{{item.skuQuantity}} {{item.infUnitOfMeasureDisplayName}}</div>
                    <div>交割仓库:{{item.deliveryWarehouseName}}</div>
                    <div>交割日期:{{item.deliveryEndDate | date}}</div>
                    <span class="price gy-h5"><em v-if="item.skuPrice" class="gy-h3">￥{{item.skuPrice}}</em><em v-else>面议</em>/{{item.infUnitOfMeasureDisplayName}}</span>
                  </div>
                </div>
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
            j: {
                list: [],
                list2: []
            },
            hotList: [],
            bannerList: [],
            catalogueList: [],
            IDlist: [],
            companyId: this.$route.query.companyId,
            vals: [],
            initialIndex: 1
        };
    },
    mounted () {
        this.initHot();
        this.imgList();
    },
    methods: {
        gotoPage (event, componetName) {
            const itemId = event.currentTarget.getAttribute('item-id');
            if (componetName === 'product-detail') {
                this.$router.push({path: '/product', query: {resourcesListId: itemId}});
            }
        },
        gotoPageCatalogue (id, componetName) {
            if (componetName === 'product-detail') {
                this.$router.push({path: '/product', query: {resourcesListId: id}});
            }
        },
        // 热销商品
        initHot () {
            let that = this;
            that.$http.get(that.$api.shop.companys + '/' + this.companyId).then(function (res) {
                if (res.data.code === 0) {
                    that.hotList = res.data.data.list;
                }
            });
        },
        // 顶部轮播图
        imgList () {
            let that = this;
            that.$http.post(that.$api.shop.homeImg, {companyId: this.companyId}).then(function (res) {
                if (res.data.code === 0) {
                    that.bannerList = res.data.data.advertisementImgList;
                    that.catalogueList = res.data.data.productCategoryImgList;
                    that.catalogueList.forEach(function (v, idx, list) {
                        that.IDlist.push(v.catalogueId);
                    });
                }
            })

                .then((res) => {
                    let params = {
                        catalogueIdList: this.IDlist,
                        companyId: this.companyId
                    };
                    params.catalogueIdList = that.IDlist;
                    that.$http.post(that.$api.shop.productList, params).then(function (res) {
                        if (res.data.code === 0) {
                            let arr1 = res.data.data;
                            that.catalogueList.forEach(function (val, idx, list) {
                                if (arr1[idx] !== undefined) {
                                    // arr1
                                    val['data'] = arr1[idx].offerModelList;
                                    val['key'] = arr1[idx].catalogueId;
                                    that.vals.push(val);
                                }
                            });
                            console.log(that.vals);
                        }
                    });
                });
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
        height: 500px;
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
    width: 1200px;
    min-width: 1200px;
    margin: 30px auto;
    /*公用*/
    .shop-wrap {
      .main-title {
        margin: 10px 0 30px 1%;
        span {
          color: $color-black;
        }
      }
      .pointer {
        cursor: pointer;
      }
      .product-item {
        width: 32.33%;
        height: 300px;
        display: inline-block;
        margin-left: 1%;
        float: left;
        margin-bottom: 1%;
        background-color: $color-white;
        .product-icon {
          width: 30px;
          height: 42.7px;
        }
        .product-img {
            width: auto;
            height: 120px;
        }
        .price {
          font-size: 16px;
          em {
            color: $color-highlight;
          }
        }
        .gray-old {
          em {
            color: $color-light;
          }
        }
        .preferentialInfo {
            div {
              display: block;
              color: $color-main;
              line-height: 30px;
            }
        }
      }
      .oneFirstAct {
        width: 65.67%;
        position: relative;
        .product-icon {
          width: 70.5px;
          height: 28.8px;
          margin-top: 10px;
        }
        .product-bottom {
          margin-top: 40px;
        }
        .first-img {
          width: auto;
          height: 180px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(0,-50%);
        }
      }
      //产品分类
      .firstActive {
          .first-product {
                position: absolute;
                top: 10% !important;
                left: 10% !important;
                text-align: left !important;
                transform: none !important;
          }
          .product-clas {
                color: #000 !important;
                font-weight: 700 !important;
          }
      }
    }
    /*热门促销*/
    .shop-wrap-1 {
        .main-title {
            padding-top: 30px;
            img {
                width: 32.5px;
                height: 42px;
            }
        }
        .product-item {
            position: relative;
            .title {
                margin-bottom: 15px;
            }
            .product-img {
                position: absolute;
                right: 0px;
                bottom: 20px;
            }
            .item-wrap {
                margin: 0 0 15px 30px;
            }
            .product-img {
                margin-right: 30px;
                float: right;
            }
            .price {
                margin-top: 55px;
                display: block;
            }
        }
    }
    /*产品分类*/
    .shop-wrap-2 {
      .product-item {
        text-align: center;
        position: relative;
        .product-info {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
    }
  }
  .clearfix:after,.clearfix:before{
    content:"";
    display:table;
  }
  .clearfix:after{
    clear:both;
  }
  .clearfix{
    zoom:1;
  }
}
</style>
