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
        <!--热销产品-->
        <div class="shop-hot">
            <div class="shop-title">热销产品</div>
            <div>
                <ul class="clearfix bgHotP" style="background: #FFFFFF;" v-if="hotListOne.length>0">
                    <li class="li-left" :style='"background-image: url(" + productImg + ")"'>
                        <img class="hot-icon" src="../../assets/images/hot-icon.png" alt="">
                        <div class="li-left-list">
                            <p class="li-left-title">{{hotListOne[0].skuName}}</p>
                            <p class="li-left-sell">
                                <img :src="hotListOne[0].skuPictureUrl" alt="">
                                <span>热销钜惠</span>
                            </p>
                            <p class="li-left-center">{{hotListOne[0].productDescription}}</p>
                        </div>
                    </li>
                    <li
                     class="li-center">
                        <p class="li-title">{{hotListOne[0].skuName}}<img style="margin-left: 10px;" src="../../assets/images/hot-decorate.png" alt=""></p>
                        <p class="li-money">
                          <span class="price">
                              <em v-if="hotListOne[0].skuPrice">￥{{hotListOne[0].skuPrice}}/{{hotListOne[0].infUnitOfMeasureDisplayName}} {{hotListOne[0].skuPriceFlag == 1 ? "(可议价)" : ''}}</em>
                              <em v-else>单价面议</em>
                          </span>
                          <i class="gy-button-view">热销产品</i><i class="gy-button-view i-two">钜惠</i><i class="gy-button-view i-three">性价比高</i></p>
                        <p class="li-division"></p>
                        <p class="li-list">可供数量：{{hotListOne[0].skuQuantity}} {{hotListOne[0].infUnitOfMeasureDisplayName}}</p>
                        <p class="li-list">交割仓库：{{hotListOne[0].deliveryWarehouseName}}</p>
                        <div>交割日期:
                          <span v-if="hotListOne[0].deliveryDateFlag ===3">{{hotListOne[0].deliveryDateText}}</span>
                          <span v-else-if="hotListOne[0].deliveryDateFlag === 2" >{{hotListOne[0].deliveryBeginDate|date}}以前</span>
                          <span v-else>{{hotListOne[0].deliveryBeginDate|date}}到{{hotListOne[0].deliveryEndDate|date}}</span>
                        </div>
                        <p class="li-text">产品简介</p>
                        <p class="li-introduction">{{hotListOne[0].productDescription}}</p>
                        <p class="li-btn" @click="gotoPage($event,'product-detail', hotListOne[0].id)">点击查看详情</p>
                    </li>
                </ul>
                <ul class="clearfix bgHotList" style="margin-top: 32px;">
                  <li  v-for="(item, index) in hotListOther" :key="index" @click="gotoPage($event,'product-detail', item.id)">
                    <div :style='"background-image: url(" + hotProduct + ")"' class="hotProduct">
                      <img :src="item.skuPictureUrl" alt="">
                    </div>
                    <div class="preferentialOther" :style='"background-image: url(" + hotbackg + ")"'>
                      <p class="li-title">{{item.skuName}}<img style="margin-left: 10px;" src="../../assets/images/hot-decorate.png" alt=""></p>
                      <p class="li-division" style="margin: 10px 0;"></p>
                      <div class="clearfix">
                        <div class="inforight">
                          <p>可供数量：{{item.skuQuantity}} {{item.infUnitOfMeasureDisplayName}}</p>
                          <p class="hidden">交割仓库：{{item.deliveryWarehouseName}}</p>
                          <div>交割日期:
                            <span v-if="item.deliveryDateFlag ===3">{{item.deliveryDateText}}</span>
                            <span v-else-if="item.deliveryDateFlag === 2" >{{item.deliveryBeginDate|date}}以前</span>
                            <span v-else>{{item.deliveryBeginDate|date}}到{{item.deliveryEndDate|date}}</span>
                          </div>
                        </div>
                        <div class="infoleft">
                          <p>每吨价格</p>
                          <p><span class="price">
                              <em v-if="item.skuPrice">￥{{item.skuPrice}}/{{item.infUnitOfMeasureDisplayName}} {{item.skuPriceFlag == 1 ? "(可议价)" : ''}}</em>
                              <em v-else>单价面议</em>
                          </span></p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
            </div>
        </div>
        <div class="shop-wrap-2">
          <div class="shop-wrap clearfix" v-if="vals.length > 0">
            <div class="main-title gy-h1">
              <span>产品分类</span>
            </div>
            <ul class="clearfix" v-for="(items, index) in vals" :key="index">
                <li class="firstActive" :style="{backgroundImage: 'url(' + items.absoluteUrl + ')', backgroundSize:'cover'}">
                    <div class="gy-h3 product-clas">{{items.title}}</div>
                </li>
                <li class="item-wrap"  v-for="(item, idx) in items.data" :key="idx" @click="gotoPageCatalogue(item.id,'product-detail')">
                  <div :style='"background-image: url(" + product + ")"' class="proImgwarp">
                      <img class="product-img" :src="item.skuPictureUrl" alt="">
                  </div>
                  <div class="preferentialInfo" :style='"background-image: url(" + textBackg + ")"'>
                    <div class="gy-h1" :title="(item.skuName && item.skuName.replace(/[^x00-xff]/g, 'aa').length > 22)? item.skuName : ''">{{item.skuName}}</div>
                      <div class="price">
                        <span class="gy-h5"><em v-if="item.skuPrice" class="gy-h3">￥{{item.skuPrice}}</em><em v-else>面议</em>/{{item.infUnitOfMeasureDisplayName}}</span>
                      </div>
                      <div>数量：{{item.skuQuantity}} {{item.infUnitOfMeasureDisplayName}}</div>
                      <div>交割仓库：{{item.deliveryWarehouseName}}</div>
                      <!-- <div>交割日期：{{item.deliveryEndDate | date}}</div> -->
                      <div>交割日期:
                        <span v-if="item.deliveryDateFlag ===3">{{item.deliveryDateText}}</span>
                        <span v-else-if="item.deliveryDateFlag === 2" >{{item.deliveryBeginDate|date}}以前</span>
                        <span v-else>{{item.deliveryBeginDate|date}}到{{item.deliveryEndDate|date}}</span>
                      </div>
                  </div>
              </li>
                <!-- <li v-for="(item, idx) in items.data" :key="idx">
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
                </li> -->
            </ul>
          </div>
        </div>
        <div class="shop-wrap" style="margin-top: 30px;">
          <div class="shop-title" v-if="otherProduct">其他产品</div>
        </div>
        <div class="shop-wrap" ref="description"></div>
    </section>
  </div>
</template>

<script>
export default {
    data: function () {
        return {
            disabled: false,
            j: {
                list: [],
                list2: []
            },
            otherProduct: false,
            hotListOne: [],
            hotListOther: [],
            bannerList: [],
            catalogueList: [],
            IDlist: [],
            companyId: this.$route.query.companyId,
            vals: [],
            initialIndex: 1,
            hotProduct: require('../../assets/images/shop/hotProduct.png'),
            hotbackg: require('../../assets/images/shop/hotbackg.png'),
            productImg: require('../../assets/images/product-img.jpg'),
            textBackg: require('../../assets/images/shop/textBackg.png'),
            product: require('../../assets/images/shop/product.png')
        };
    },
    created () {
        window.scrollTo(0, 0);
    },
    mounted () {
        this.initHot();
        this.imgList();
        this.getDescription();
    },
    methods: {
        // 其他产品
        getDescription () {
            let that = this;
            that.$http.get(that.$api.shop.description + this.companyId).then(function (res) {
                console.log(res.data.data);
                if (res.data.data.length !== 0) {
                    that.$refs.description.innerHTML = res.data.data[0].description;
                    that.otherProduct = true;
                }
            });
        },
        gotoPage (event, componetName, itemId) {
            if (componetName === 'product-detail') {
                let routeData = this.$router.resolve({
                    path: '/product',
                    query: {resourcesListId: itemId}
                });
                window.open(routeData.href, '_blank');
                // this.$router.push({path: '/product', query: {resourcesListId: itemId}});
            }
        },
        gotoPageCatalogue (itemId, componetName) {
            if (componetName === 'product-detail') {
                let routeData = this.$router.resolve({
                    path: '/product',
                    query: {resourcesListId: itemId}
                });
                window.open(routeData.href, '_blank');
                // this.$router.push({path: '/product', query: {resourcesListId: id}});
            }
        },
        // 热销商品
        initHot () {
            let that = this;
            that.$http.get(that.$api.shop.companys + '/' + this.companyId).then(function (res) {
                if (res.data.code === 0) {
                    if (res.data.data.list[0].promoType === 1) {
                        that.hotListOne = res.data.data.list[0].offerModelList;
                        that.hotListOther = res.data.data.list[0].offerModelList.slice(1, res.data.data.list[0].offerModelList.length);
                    }
                    console.log(that.hotListOne, that.hotListOther);
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
.el-carousel{
    width:100%!important;
}
.header {
    display: none!important;
}
.mall-shop {
  min-width: 1200px;
  background-color: #f8f8f8;
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
    /*公用*/
    .shop-wrap {
      width: 1200px;
      min-width: 1200px;
      margin: 10px auto;
      .main-title {
        padding: 30px 0 10px 1%;
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
        .gray-old {
          em {
            color: $color-light;
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
          .product-clas {
              padding:20px;
          }
      }
    }
    /*产品分类*/
    .shop-wrap-2 {
      margin-top: 40px;
      background: #fff;
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
            font-size: 16px;
            em {
              color: $color-highlight;
            }
          }
        }
      }
      li:hover {
          transition: all .5s;
          box-shadow: 0 10px 15px 0 rgba(0,0,0,.1);
      }
    }
      .shop-hot{
        width: 1200px;
        min-width: 1200px;
        margin: 30px auto;
        .li-division{
          width:20px;
          height:2px;
          background: #E0370F;
          margin:16px 0;
          }
        .preferentialOther {
            background: #fff;
            padding-left: 24px;
            width: 378px;
            height: 170px;
            .li-title{
              font-size: 20px;
              padding: 10px 0 0 0;
              img{
                height: 12px;
              }
            }
            .inforight{
              width: 50%;
              float: left;
              p{
                height: 24px;
              }
              .hidden{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
            .infoleft{
              padding-top: 16px;
              width: 50%;
              float: left;
              text-align: center;
              p:nth-child(2){
                color: #E0370F;
                font-weight: bold;
              }
            }
        }
        .bgHotList{
          .hotProduct{
            height: 204px;
            line-height: 204px;
            text-align: center;
            img{
              height: 100px;
              width: 100px;
            }
          }
          li{
            float: left;
            cursor: pointer;
            margin-right: 32px;
            margin-bottom: 20px;
            &:nth-child(3n){
              margin-right: 0;
            }
          }
        }
          .bgHotP{
              width:100%;
              height:450px;
              li{
                  width:50%;
                  height:100%;
                  float: left;
              }
              .li-left{
                  position: relative;
                  .hot-icon{
                    position: absolute;
                    top: -8px;;
                  }
                  .li-left-list{
                      padding-top:120px;
                      padding-left:58px;
                  }
                  .li-left-title{
                      font-size: 42px;
                      font-weight: bold;
                      color:#317bcf;
                  }
                  .li-left-sell{
                      margin:16px 0 30px;
                      font-size: 18px;
                      line-height: 22px;
                      color:#ffffff;
                      overflow: hidden;
                      height:45px;
                      text-align: center;
                      img{
                          display: block;
                          width:45px;
                          height: 45px;
                          float:left;
                      }
                      span{
                          width:45px;
                          height: 45px;
                          font-size: 18px;
                          background: #76B6FC;
                          float:left;
                      }
                  }
                  .li-left-center{
                      width:326px;
                      font-size: 12px;
                      color: #666666;
                      line-height: 18px;
                      word-break: break-all;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 3;
                      -webkit-box-orient: vertical;
                  }
              }
              .li-center{
                  padding:28px 52px;
              }
              .li-title{
                  font-size: 26px;
                  color: #333333;
                  line-height: 26px;
                  font-weight: bold;
                  margin-bottom:20px;
              }
              .li-money{
                  font-size: 24px;
                  line-height: 24px;
                  color: #333;
                  span{
                      font-size: 24px;
                      color: #E0370F;
                      font-weight: bold;
                      &:nth-child(2){
                        color: #333;
                        font-size: 12px;
                        margin: 0 8px;
                      }
                  }
                  i{
                      margin-left:8px;
                      border-radius:2px;
                  }
                  .i-two{
                      color: #E59640;
                      border: 1px solid #E59640;
                  }
                  .i-three{
                      color: #E0370F;
                      border: 1px solid #E0370F;
                  }
              }
              .li-list{
                  font-size: 14px;
                  color: #666666;
                  line-height: 14px;
                  margin-bottom: 16px;
              }
              .li-text{
                  font-size: 18px;
                  color: #333333;
                  line-height: 18px;
                  padding: 16px 0;
                  font-weight: 500;
              }
              .li-introduction{
                  height: 60px;
                  font-size: 14px;
                  color: #999999;
                  line-height: 20px;
                  word-break: break-all;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
              }
              .li-btn{
                  cursor: pointer;
                  width:114px;
                  height:40px;
                  font-size: 14px;
                  font-weight: bold;
                  color: #333333;
                  border: 2px solid #F41800;
                  margin-top:28px;
                  line-height: 36px;
                  text-align: center;
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
    .shop-title{
        font-size:24px;
        color: #333333;
        font-weight: 500;
        padding:30px 0 39px;
        line-height: 24px;
    }
    .classification{
        width: 100%;
        background: #ffffff;
        .product{
            width:1200px;
            min-width: 1200px;
            margin:0 auto;
            padding:30px 0;
        }
    }
}
</style>
