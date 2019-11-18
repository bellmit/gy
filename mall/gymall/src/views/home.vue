<template>
    <div class="mall-home-box">
        <div class="mall-home">
            <div class="mall-home-banner">
                <el-carousel :interval="5000">
                    <el-carousel-item v-for="item in kvList" :key="item.id">
                        <a class="item bg-img home-carousel-img" :style='"background-image: url(" + item.imageUrl + ")"' :href="item.linkUrl"></a>
                    </el-carousel-item>
                </el-carousel>
                <div class="mall-home-banner-content">
                    <!--banner-category start-->
                    <div class="banner-category" @mouseleave="hideItems">
                        <div class="banner-category-first">
                            <!-- <div class="first-tit mall-nav-tit title-pro-type">商品分类</div> -->
                            <div class="first-items" v-if="categories.first.length>1">
                                <div @mouseover.capture="showItems" class="first-item mg-top20" v-for="(item,index) in categories.first" :key="index"
                                     :myindex="index">
                                    <div class="first-item-category mall-nav-tit"><i class="iconfont first-item-icon"  :class = "{ 'icon-huagongiconx':index==0,'icon-youpinx':index==1, 'icon-suliaoiconx':index==2, 'icon-xiangjiaoiconx':index==3}"></i>{{item.category}}<i class="iconfont icon-arrow-down first-item-right"></i></div>
                                    <div class="first-item-list" style="-webkit-box-orient:vertical!important;">
                                        <span class="first-item-content" v-for="(categ, secondindex) in item.catalogueNames" :key="secondindex">{{categ.catalogueName}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div :class = "{ 'category-background-0':myindex==0,'category-background-1':myindex==1, 'category-background-2':myindex==2, 'category-background-3':myindex==3}" class="category-second" v-show="myindex" v-if="categories.second.length>1">
                            <div class="category-second-item" v-for="(item,index) in categories.second" :key="index" style="margin-left: 10px;">
                                <div class="category-second-width" v-show="index == myindex">
                                    <div v-for="(categs, thirdindex) in item.items" :key="thirdindex" class="mg-top20 mg-max mg-tops">
                                        <div class="second-item-category mall-nav-tit">{{categs.catalogueName}}</div>
                                        <p class="second-item-content"
                                           :item-id="categ.productId"
                                           @click="gotoPage($event,'search-page-prod')"
                                           v-for="(categ, fourindex) in categs.productList" :key="fourindex">
                                            <span class="second-item-content-span" :class="{'highlight': categ.count > 0}">{{categ.productName}}</span>
                                            <span class="second-item-content-spans">|</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--banner-category end-->

                    <!--banner-login start-->
                    <div class="banner-login" style="display:none">
                        <div class="banner-login-avatar" :style="loginStyle"></div>
                        <div class="banner-login-welcome">您好，欢迎来到国烨网！</div>
                        <div v-if="!isLogin">
                            <a class="btn-active" href="/my/#/login">登录</a>
                            <a class="btn" href="/my/#/register">注册</a>
                        </div>
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="公告" name="first">
                                <ul>
                                    <li class="three-dot" v-for="(item, index) in notice" :key="index">{{item}}</li>
                                </ul>
                                <a href="javascript:;" class="btn-active banner-login-link banner-login-link-publish" @click="quirey">
                                    快速发布需求
                                </a>
                                <router-link class="btn banner-login-link" to="#">帮我找</router-link>
                            </el-tab-pane>
                            <el-tab-pane label="常见问题" name="second">常见问题</el-tab-pane>
                            <el-tab-pane label="如何开户" name="third">如何开户</el-tab-pane>
                            <el-tab-pane label="交易入门" name="fourth">交易入门</el-tab-pane>
                        </el-tabs>
                    </div>
                    <!--banner-login end-->
                </div>
            </div>
            <!--banner============== end-->
             <div  class="mall-home-content">
             <!-- 热销榜单 -->
               <div class="home-hot">
                    <div class="home-hot-left">
                        <div class="bg-img"><img src="../assets/images/hot-item.png" alt=""></div>
                        <div class="hot-title">
                            <div>热推榜单</div>
                            <div>打榜优质商品</div>
                            <div>国烨商城推荐名企</div>
                        </div>
                    </div>
                    <div class="home-hot-center">
                          <el-carousel  :interval="0" arrow="never">
                            <el-carousel-item class="hot-center-con" v-for="(item,index) in recommend"
                             :key="index" v-if="index<recommend.length/4">
                                  <div class="hot-center-item"
                                        :item-id="recommend[4*index+ subIndex].offerId"
                                        @click="gotoPage($event,'product-detail')"
                                      v-for="(product,subIndex) in 4" :key="subIndex" v-if="4*index+ subIndex<recommend.length">
                                      <div class="item-name" :title="recommend[4*index+ subIndex].prodName">{{recommend[4*index+ subIndex].prodName}}</div>
                                      <div class="item-price"  v-if="recommend[4*index+ subIndex].skuPriceFlag == 2">面议</div>
                                       <div class="item-price"  v-else>
                                       {{recommend[4*index+ subIndex].currencyMark}}{{recommend[4*index+ subIndex].price}}
                                       <span>/{{recommend[4*index+ subIndex].priceUnit}} {{recommend[4*index+ subIndex].skuPriceFlag == 1 ? "(可议价)" : ''}}</span>
                                       </div>
                                      <div class="decorate"><img src="../assets/images/hot-decorate.png" alt=""></div>
                                      <div class="item-bg"><img   :src="recommend[4*index+ subIndex].formulaImg" /></div>
                                  </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="home-hot-right">
                        <div class="hot-right-top">
                            <el-carousel  class="right-top-swiper" :interval="0" arrow="never">
                                <el-carousel-item class="hot-right-top-con"  v-for="(item,index) in hot" :key="index"   v-if="index<hot.length/6">
                                    <div class="top-con-item"  :item-id="hot[6*index+ subIndex].companyId"    @click="gotoPage($event,'shop-home')"    v-for="(product,subIndex) in 6" :key="subIndex" v-if="6*index+ subIndex<hot.length">
                                        <div class="top-con-img" >
                                            <img :src="hot[6*index+ subIndex].companyLogo" alt=""  v-if="hot[6*index+ subIndex].companyLogo">
                                            <img src="../assets/images/V_logo.jpg" v-else/>
                                        </div>
                                        <div class="top-con-name">{{hot[6*index+ subIndex].companyName}}</div>
                                    </div>
                               </el-carousel-item>
                        </el-carousel>
                        </div>
                          <div class="hot-right-bottom" @click='gotoCompany'>
                              <div><img src="../assets/images/company-img.png" alt=""></div>
                              <div>前往名企专区</div>
                         </div>
                    </div>
               </div>

               <!-- 化工商城 -->
                <div class="home-common">
                    <div class="home-common-title">
                        <div>化工商城</div>
                        <div   :item-id="chemicalId"  @click="gotoPage($event,'search-page-cata')">更多></div>
                    </div>
                    <div class="home-common-content">
                       <div class="common-content-left">
                           <div class="bg-img"><img src="../assets/images/industry-item.png" alt=""></div>
                           <div class="conetnt-left-title">
                               <div>化工商城</div>
                               <div>汇聚行业正品</div>
                           </div>
                           <div :item-id="chemicalId"  @click="gotoPage($event,'search-page-cata')" class="common-icon"><i class="iconfont icon-jiantou"></i></div>
                       </div>
                       <div class="common-content-right">
                          <div class="common-content-right-item"  :item-id="item.offerId"
                               @click="gotoPage($event,'product-detail')"
                               v-for="(item,index) in mall1" :key="index"
                               v-if="index<8">
                              <div class="item-img-con" :style='"background-image:url("+item.productImg+")"'></div>
                              <div class="dec-con">
                                  <div class="product-name">{{item.prodName}}</div>
                                  <div>可供量：{{item.supplies}}</div>
                                  <div  class="product-price"  v-if="item.skuPriceFlag == 2">面议</div>
                                  <div  class="product-price" v-else>{{item.currencyMark}}{{item.price}}<span></span>/{{item.priceUnit}} {{item.skuPriceFlag == 1 ? "(可议价)" : ''}}</div>
                              </div>
                              <div class="pop">
                                  <ul>
                                      <li>货源：{{item.origin}}</li>
                                      <li>交割库：{{item.place}}</li>
                                      <li>交割时间：{{item.tradeDate}}</li>
                                      <li class="button-box"><a href="javascript:;" class="gy-button-extra">我要询价</a></li>
                                  </ul>
                                  <span class="mask"></span>
                              </div>
                          </div>
                       </div>
                    </div>
                </div>

                   <!-- 油品 -->
                <div class="home-common">
                    <div class="home-common-title">
                        <div>油品商城</div>
                        <div  :item-id="oilId" @click="gotoPage($event,'search-page-cata')">更多></div>
                    </div>
                    <div class="home-common-content">
                       <div class="common-content-left" style="color:#B27A31;">
                           <div class="bg-img"><img src="../assets/images/oil-item.png" alt=""></div>
                           <div class="conetnt-left-title">
                               <div>油品商城</div>
                               <div>精选低价资源</div>
                           </div>
                           <div :item-id="oilId" @click="gotoPage($event,'search-page-cata')" class="common-icon"><i class="iconfont icon-jiantou"></i></div>
                       </div>
                       <div class="common-content-right">
                          <div class="common-content-right-item"  :item-id="item.offerId"
                               @click="gotoPage($event,'product-detail')"
                               v-for="(item,index) in mall2" :key="index"
                               v-if="index<8">
                              <div class="item-img-con" :style='"background-image:url("+item.productImg+")"'></div>
                              <div class="dec-con">
                                  <div class="product-name">{{item.prodName}}</div>
                                  <div>可供量：{{item.supplies}}</div>
                                  <div  class="product-price"  v-if="item.skuPriceFlag == 2">面议</div>
                                  <div  class="product-price" v-else>{{item.currencyMark}}{{item.price}}<span></span>/{{item.priceUnit}} {{item.skuPriceFlag == 1 ? "(可议价)" : ''}}</div>
                              </div>
                              <div class="pop">
                                  <ul>
                                      <li>货源：{{item.origin}}</li>
                                      <li>交割库：{{item.place}}</li>
                                      <li>交割时间：{{item.tradeDate}}</li>
                                      <li class="button-box"><a href="javascript:;" class="gy-button-extra">我要询价</a></li>
                                  </ul>
                                  <span class="mask"></span>
                              </div>
                          </div>
                       </div>
                    </div>
                </div>

                     <!-- 塑料商城 -->
                <div class="home-common">
                    <div class="home-common-title">
                        <div>塑料商城</div>
                        <div  :item-id="plasticsId"  @click="gotoPage($event,'search-page-cata')">更多></div>
                    </div>
                    <div class="home-common-content">
                       <div class="common-content-left" style="color:#0E669E;">
                           <div class="bg-img"><img src="../assets/images/plastic-item.png" alt=""></div>
                           <div class="conetnt-left-title">
                               <div>塑料商城</div>
                               <div>塑料行货精品</div>
                           </div>
                           <div :item-id="plasticsId"  @click="gotoPage($event,'search-page-cata')" class="common-icon"><i class="iconfont icon-jiantou"></i></div>
                       </div>
                       <div class="common-content-right">
                          <div class="common-content-right-item"  :item-id="item.offerId"
                               @click="gotoPage($event,'product-detail')"
                               v-for="(item,index) in mall3" :key="index"
                               v-if="index<8">
                              <div class="item-img-con" :style='"background-image:url("+item.productImg+")"'></div>
                              <div class="dec-con">
                                  <div class="product-name">{{item.prodName}}</div>
                                  <div>可供量：{{item.supplies}}</div>
                                  <div  class="product-price"  v-if="item.skuPriceFlag == 2">面议</div>
                                  <div  class="product-price" v-else>{{item.currencyMark}}{{item.price}}<span></span>/{{item.priceUnit}} {{item.skuPriceFlag == 1 ? "(可议价)" : ''}}</div>
                              </div>
                              <div class="pop">
                                  <ul>
                                      <li>货源：{{item.origin}}</li>
                                      <li>交割库：{{item.place}}</li>
                                      <li>交割时间：{{item.tradeDate}}</li>
                                      <li class="button-box"><a href="javascript:;" class="gy-button-extra">我要询价</a></li>
                                  </ul>
                                  <span class="mask"></span>
                              </div>
                          </div>
                       </div>
                    </div>
                </div>

             <!-- 推荐营销 -->
               <div class="home-common">
                    <div class="home-common-title">
                        <div>推荐销售中心</div>
                        <div    @click="gotoCompany">更多></div>
                    </div>
                    <div class="home-common-shop">
                          <div class="home-item"   v-for="(item,index) in shopList.slice(0,4)" :key="index"
                         :item-id="item.companyId"
                         @click="gotoPage($event,'shop-home')">
                            <div class="company-img">
                                <img :src="item.homeFirstPicture" alt="">
                                <!-- <img src="../assets/images/V_logo.jpg" alt=""  v-else> -->
                            </div>
                            <div class="company-name">
                                <img :src="item.companyLogo" alt=""  v-if="item.companyLogo">
                                <img src="../assets/images/V_logo.jpg" alt=""  v-else>
                                <span>{{item.companyName}}</span>
                            </div>
                          </div>
                    </div>
                </div>

                  <!-- 行业数据 -->
               <div class="home-common">
                    <div class="home-common-title">
                        <div>行业数据</div>
                    </div>
                    <div class="home-common-industry">
                        <div class="industry-left">
                             <div class="industry-left-top">
                                 <img src="../assets/images/industry-bg.png" alt="">
                             </div>
                             <div  class="industry-left-bottom">
                                <el-carousel  :interval="3000">
                                    <el-carousel-item class="hot-center-con"  v-for="(item,index) in hotIndex"  :key="index" v-if="index<hotIndex.length/4">
                                        <div   v-for="(product,subIndex) in 2" :key="subIndex" v-if="2*index+ subIndex<hotIndex.length">
                                            {{hotIndex[4*index+ subIndex].indexName}} &nbsp;&nbsp;{{hotIndex[4*index+ subIndex].indexNum}}（{{hotIndex[4*index+ subIndex].unitValue}}）
                                        </div>
                                    </el-carousel-item>
                              </el-carousel>
                             </div>
                        </div>
                        <div class="industry-right">
                             <div class="industry-right-button">
                                <div class="chart-btn" @click="drawEchart('b')" :class="{'btn-active': btnStatus == 'b'||btnStatus==0}">{{mychat1[2]}}</div>
                                <div class="chart-btn" @click="drawEchart('y')" :class="{'btn-active': btnStatus == 'y'}">{{mychat2[2]}}</div>
                            </div>
                             <div class="recommend-item-body-top charts">
                                <div id="myChart" class="myChart"></div>
                            </div>
                        </div>
                    </div>
                </div>

             </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'mall-home',
    components: {echarts},
    data: function () {
        return {
            isActive: true,
            isLogin: false,
            kvList: [],
            bannerStyle: {
                backgroundImage: 'url(' + require('../assets/images/banner1.jpg') + ')'
            },
            bannerStyle1: [
                {
                    img: require('../assets/images/logo/logo-1.png'),
                    backgroundImage: 'url(' + require('../assets/images/logo/logo-1.png') + ')'
                }, {
                    img: require('../assets/images/logo/logo-2.png'),
                    backgroundImage: 'url(' + require('../assets/images/logo/logo-2.png') + ')'
                }, {
                    img: require('../assets/images/logo/logo-3.png'),
                    backgroundImage: 'url(' + require('../assets/images/logo/logo-3.png') + ')'
                }, {
                    img: require('../assets/images/logo/logo-1.png'),
                    backgroundImage: 'url(' + require('../assets/images/logo/logo-1.png') + ')'
                }, {
                    img: require('../assets/images/logo/logo-2.png'),
                    backgroundImage: 'url(' + require('../assets/images/logo/logo-2.png') + ')'
                }
            ],
            loginStyle: {
                backgroundImage: 'url(' + require('../assets/images/mall-logo.png') + ')'
            },
            myindex: '', // catergoy index
            activeName: 'first',
            categories: {
                first: [],
                second: []
            },
            notice: ['国烨跨境再次荣膺“中国最具影响力跨1111', '国烨跨境再次荣膺“中国最具影响力跨2222', '国烨跨境再次荣膺“中国最具影响力跨333'],
            recommend: [],
            hot: [],
            hotIndex: [
            ],
            mall1: [{}, {}, {}, {}, {}, {}],
            mall2: [{}, {}, {}, {}, {}, {}],
            mall3: [{}, {}, {}, {}, {}, {}],
            mall4: [{}, {}, {}, {}, {}, {}],
            chemicalId: 1,
            oilId: 2,
            plasticsId: 3,
            otherId: 4,
            shopList: [],
            adLinkUrl: '',
            adImgUrl: null,
            btnStatus: 0,
            mychat1: [],
            mychat2: []
        };
    },
    methods: {
        quirey () {
            if (!localStorage.getItem('userInfo')) {
                this.$alert('请先登录后再继续', '提示');
                return;
            }
            location.href = '/my/#/resources/add';
        },
        getCategories () {
            const that = this;
            that.$http.get(that.$api.mallHome.category)
                .then((response) => {
                    if (response.data.code === 0) {
                        that.setCategories(response.data.data);
                        return;
                    }
                    throw new Error(response.data.message());
                })
                .catch((e) => console.log(e));
        },
        setCategories (rawData) {
            const that = this;
            rawData.forEach((item, index) => {
                that.$set(that.categories.first, index, {category: item.catalogueName, catalogueNames: []});
                that.$set(that.categories.second, index, {items: []});
                if (item.catalogueModelList == null || item.catalogueModelList === undefined || item.catalogueModelList.length === 0) {
                    return;
                }
                item.catalogueModelList.forEach((catalogueMode, i) => {
                    that.$set(that.categories.first[index].catalogueNames, i, {catalogueName: catalogueMode.catalogueName});
                    that.$set(that.categories.second[index].items, i, {
                        catalogueName: catalogueMode.catalogueName,
                        productList: catalogueMode.productList
                    });
                });
            });
        },
        showItems (event) {
            console.log(event);
            const target = event.currentTarget;
            console.log(target);
            if (target.classList.contains('first-item')) {
                this.myindex = target.getAttribute('myindex');
                event.stopPropagation();
            }
        },
        hideItems () {
            this.myindex = '';
        },
        drawEchart (prodType) {
            //    指数列表 展示
            this.btnStatus = prodType;
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            if (prodType === 'b') {
                this.isActive = true;
                const options = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: this.mychat1[2] + ': {c}元'
                    },
                    grid: {
                        left: '0%',
                        right: '6%',
                        bottom: '3%',
                        top: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        data: this.mychat1[0]
                    },
                    yAxis: {
                        scale: true
                    },
                    legend: {
                        data: this.mychat1[2]
                    },
                    series: [{
                        data: this.mychat1[1],
                        type: 'line',
                        smooth: true

                    }]
                };
                myChart.setOption(options);
            } else if (prodType === 'y') {
                this.isActive = true;
                const options = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: this.mychat2[2] + ': {c}元'
                    },
                    grid: {
                        left: '0%',
                        right: '6%',
                        bottom: '3%',
                        top: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        data: this.mychat2[0]
                    },
                    yAxis: {
                        scale: true
                    },
                    legend: {
                        data: this.mychat2[2]
                    },
                    series: [{
                        data: this.mychat2[1],
                        type: 'line',
                        smooth: true

                    }]
                };
                myChart.setOption(options);
            }
        },
        gotoPage (event, componetName) {
            const itemId = event.currentTarget.getAttribute('item-id');
            if (componetName === 'shop-home') {
                this.$router.push({name: 'shopHome', query: { companyId: itemId }});
            } else if (componetName === 'product-detail') {
                this.$router.push({path: '/product', query: {resourcesListId: itemId}});
            } else if (componetName === 'search-page-prod') {
                this.$router.push({path: '/search', query: {productId: itemId}});
            } else if (componetName === 'search-page-cata') {
                this.$router.push({path: '/search', query: {catalogueId: itemId}});
            }
        },
        gotoCompany () {
            window.location.href = '/mall/#/shop/more';
        },
        getAdList () {
            this.$http.get(this.$api.mallHome.adList + '2')
                .then(res => {
                    if (res.data.code === 0) {
                        this.kvList = res.data.data;
                    }
                });
        }
    },
    mounted () {
        this.$http.get(this.$api.mallHome.mychart)
            .then(res => {
                if (res.data.code === 0) {
                    this.mychat1 = res.data.data[0];
                    this.mychat2 = res.data.data[1];
                    this.drawEchart('b');
                }
            });
    },
    created: function () {
        let user = localStorage.getItem('userInfo');
        if (user) {
            this.isLogin = true;
            this.userInfo = JSON.parse(user);
        }

        const me = this;
        this.getCategories();// 获取分类列表

        this.getAdList();

        // 获取推荐商品
        me.$http.post(me.$api.mallHome.prodRecommend,
            {
                pageNo: 1,
                pageSize: 15
            }
        ).then(function (response) {
            if (response.data.code === 0) {
                const prodList = response.data.data.prodList;
                me.recommend = prodList;
            } else {
                me.$alert(response.data.code + ' ' + response.data.message);
            }
        }).catch(function (error) {
            console.log(error);
        });

        // 获取推荐店铺（商城首页上部）
        me.$http.post(me.$api.mallHome.shopRecommend,
            {
                pageNo: 1,
                pageSize: 15,
                type: 40
            }
        ).then(function (response) {
            if (response.data.code === 0) {
                const shopList = response.data.data.shopList;
                // if (shopList.length > 5) {
                //     me.hot.push({'items': shopList.slice(0, 5)});
                //     if (shopList.length > 10) {
                //         me.hot.push({'items': shopList.slice(5, 10)});
                //         me.hot.push({'items': shopList.slice(10, 15)});
                //     } else {
                //         me.hot.push({'items': shopList.slice(5)});
                //     }
                // } else {
                //     me.hot.push({'items': shopList});
                // }
                me.hot = shopList;
                console.log(shopList);
            } else {
                me.$alert(response.data.code + ' ' + response.data.message);
            }
        }).catch(function (error) {
            console.log(error);
        });

        // 获取各商城主打商品
        me.$http.post(me.$api.mallHome.prodFeatured,
            {
                pageNo: 1,
                pageSize: 8
            }
        ).then(function (response) {
            if (response.data.code === 0) {
                const respData = response.data.data;
                me.mall1 = respData.prodList1;
                console.log(me.mall1);
                me.mall1.forEach((item, index) => {
                    if (item.productImg && item.productImg.startsWith('http')) {
                        return;
                    }
                    let timestmp = (new Date()).valueOf();
                    item.productImg = me.$api.payment.paymentImage + '?filePath=' + item.productImg + '&t=' + timestmp;
                });
                // let listLen = me.mall1.length;
                // if (listLen < 8) {
                //     for (var i = 0; i < 8 - listLen; i++) {
                //         me.mall1.push({});
                //     }
                // }
                me.mall2 = respData.prodList2;
                me.mall2.forEach((item, index) => {
                    if (item.productImg && item.productImg.startsWith('http')) {
                        return;
                    }
                    let timestmp = (new Date()).valueOf();
                    item.productImg = me.$api.payment.paymentImage + '?filePath=' + item.productImg + '&t=' + timestmp;
                });
                // listLen = me.mall2.length;
                // if (listLen < 8) {
                //     for (var j = 0; j < 8 - listLen; j++) {
                //         me.mall2.push({});
                //     }
                // }
                me.mall3 = respData.prodList3;
                me.mall3.forEach((item, index) => {
                    if (item.productImg && item.productImg.startsWith('http')) {
                        return;
                    }
                    let timestmp = (new Date()).valueOf();
                    item.productImg = me.$api.payment.paymentImage + '?filePath=' + item.productImg + '&t=' + timestmp;
                });
                // listLen = me.mall3.length;
                // if (listLen < 8) {
                //     for (var m = 0; m < 8 - listLen; m++) {
                //         me.mall3.push({});
                //     }
                // }
                me.mall4 = respData.prodList4;
                me.mall4.forEach((item, index) => {
                    if (item.productImg && item.productImg.startsWith('http')) {
                        return;
                    }
                    let timestmp = (new Date()).valueOf();
                    item.productImg = me.$api.payment.paymentImage + '?filePath=' + item.productImg + '&t=' + timestmp;
                });
                // listLen = me.mall4.length;
                // if (listLen < 8) {
                //     for (var n = 0; n < 8 - listLen; n++) {
                //         me.mall4.push({});
                //     }
                // }
            } else {
                me.$alert(response.data.code + ' ' + response.data.message);
            }
        }).catch(function (error) {
            console.log(error);
        });

        // 推荐店铺
        me.$http.post(me.$api.mallHome.shopRecommend, {
            pageNo: 1,
            pageSize: 5,
            type: 41
        })
            .then(res => {
                me.shopList = res.data.data.shopList;
            });

        me.$http.get(me.$api.mallHome.adInfo + '?position=2')
            .then(res => {
                if (res.data.code === 0) {
                    if (res.data.data.imgUrl) {
                        me.adImgUrl = res.data.data.imgUrl;
                    }
                    if (res.data.data.linkUrl) {
                        me.adLinkUrl = res.data.data.linkUrl;
                    }
                }
            });
        //    指数列表 展示
        me.$http.get(me.$api.mallHome.myindexday)
            .then(res => {
                if (res.data.code === 0) {
                    this.hotIndex = res.data.data;
                    // console.log(this.hotIndex);
                }
            });
    }
};
</script>

<style lang="scss" scoped>
    .mall-home {
        .type-1-img{
            margin: 60px 80px 0 0 !important;
        }
        .mall-home-product-left-50-info-price{
            color: $color-highlight;
        }
        .mall-home-product-left-25{
            p:nth-child(2){
                font-size: 18px;
            }
        }
        p {
            margin: 0;
        }
        .gy-ad{
            margin-top: 35px;
            margin-bottom: 30px;
            img{
                width: 100%;
                height: auto;
            }
        }
        /*banner start==========================================*/
        .mall-home-banner {
            position: relative;
            height: 400px;
            width: 100%;
            .carouselImg{
                display: block;
            }
            .bg-img{
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
            }
            .el-carousel{
                height: 100%;
            }
            .el-carousel__container{
                height: 100% !important;
            }
            .item{
                height: 100%;
                position: relative;
                display: block;
                z-index: 9;
            }
            .el-pagination{
                margin: 0 !important;
                .el-pager{
                    li:hover{
                        background-color: $color-extra;
                    }
                }
            }
            .mall-home-banner-content {
                width: 1200px;
                overflow: hidden;
                height: 100%;
                position: absolute;
                left: 50%;
                margin-left: -600px;
                top: 0;
            }
        }
        .mg-top20 {
            margin-top: 20px;
        }
        .mg-max {
            max-height:150px;
            overflow: hidden;
        }
        .second-item-content:last-child{
            .second-item-content-spans{
                display: none;
            }
        }
        .mall-nav-tit {
            font-size: 16px;
            color: $color-title;
            font-weight: bold;
        }
        .title-pro-type{
            font-size: 18px;
        }
        .first-item-list{
            width:100%;
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
        }
        .second-item-content,
        .first-item-content {
            display: inline-block;
            margin-right: 16px;
        }
        .first-item-content{
            color: #a2a2a2;
        }
        .first-item-content:hover{
            color: #E0370f;
        }
        .second-item-content-span:hover{
            color: #E0370f;
        }
        .second-item-content-spans{
            color: #F7B608;
        }
        .banner-category {
            display: inline-block;
            position: absolute;
            left: 0;
        }
        .banner-category-first {
            position: absolute;
            top: 0;
            left: 0;
            width: 285px;
            height: 400px;
            overflow: auto;
            background-color: rgba(0,0,0,0.8);
            color: #FFFFFF;
            z-index: 2;
        }
        .first-item {
            padding: 0 22px 0 22px;
            cursor: pointer;
            &:hover {
                background-color: rgba(255,255,255,200);
                color: #666666;
                .first-item-category {
                    color: #E03912;
                }
                .first-item-content{
                    color: #333333;
                }
                .icon-huagongiconx, .icon-youpinx, .icon-suliaoiconx, .icon-xiangjiaoiconx{
                    color:#E03912;
                }
            }
        }
        .banner-category-first::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
            background-color:#FFFFFF;
        }
        .banner-category-first::-webkit-scrollbar {//滚动条的宽度
            width:9px;
            height:9px;
        }
        .banner-category-first::-webkit-scrollbar-thumb {//滚动条的设置
            background-color:#dddddd;
            background-clip:padding-box;
            min-height:28px;
        }
        .banner-category-first::-webkit-scrollbar-thumb:hover {
            background-color:#bbb;
        }
        .first-item-category{
            color: #FFFFFF;
            position: relative;
            padding-left:23px;
        }
        .first-item-icon{
            font-weight: normal;
            position: absolute;
            top: 0;
            left: 0;
        }
        .icon-huagongiconx{
            color:#FA5A00;
        }
        .icon-youpinx{
            color:#E3B272;
        }
        .icon-suliaoiconx{
            color:#4CC3D2;
        }
        .icon-xiangjiaoiconx{
            color:#F38400;
        }
        .first-item-right{
            color:#a2a2a2;
            font-weight: normal;
            position: absolute;
            top: 0;
            right: 0;
            transform: rotateZ(-90deg);
        }
        .first-item-category:hover{
            color: #E03912;
        }
        .first-tit {
            color: #e0370f;
            padding: 20px 10px 0 22px;
        }
        .category-second {
            width: 816px;
            position: absolute;
            left: 285px;
            margin-top: 1px;
            height: 400px;
            overflow-y: scroll;
            padding: 10px;
            z-index: 2;
            background-color: #ffffff;
            background-repeat: no-repeat;
        }
        .category-background-0 {
            background-image: url('../assets/images/baseMap0.png');
            background-size: 224px 400px;
            background-position: 592px 0;
        }
        .category-background-1 {
            background-image: url('../assets/images/baseMap1.png');
            background-size: 199px 400px;
            background-position: 617px 0;
        }
        .category-background-2 {
            background-image: url('../assets/images/baseMap2.png');
            background-size: 182px 400px;
            background-position: 634px 0;
        }
        .category-background-3 {
            background-image: url('../assets/images/baseMap3.png');
            background-size: 235px 400px;
            background-position: 581px 0;
        }
        .category-second-width {
            width: 600px;
            position: relative;
        }
        .category-second-img{
            height:100%;
            position: absolute;
            top: 0;
            right: 0;
        }
        .second-item-content {
            cursor: pointer;
            display: inline-block;
        }
        .banner-login {
            width: 260px;
            height: 413px;
            background: #fff;
            position: absolute;
            right: 0;
            top: 18px;
            text-align: center;
            padding: 0 14px;
        }
        .banner-login-avatar {
            width: 60px;
            height: 60px;
            background-size: cover;
            margin: 15px auto;
        }
        .banner-login-welcome {
            margin: 10px 0;
        }
        .banner-login-link {
            display: block;
            margin: 10px 0 10px 0;
        }
        .banner-login-link-publish {
            margin-top: 30px;
        }
        /*banner end==========================================*/

        .mall-home-body {
            width: 1200px;
            margin: 0 auto;
        }
        /*recommend start==========================================*/
        .mall-home-recommend {
            margin-top: 60px;
        }
        .home-recommend-item {
            width: 385px;
            height: 558px;
            background: #fff;
        }
        .home-recommend-item-second {
            margin: 0 20px;
        }
        .recommend-item-body-item {
            height: 80px;
            width: 100%;
            border-top: 1px solid #eee;
            cursor: pointer;
            img {
                display: inline-block;
                max-width: 60px;
                max-height: 60px;
                margin: 6px;
                padding: 8px;
                border: none;
            }
        }
        .recommend-item-body-item-name {
            margin-top: 11px;
            z-index: 9999;
        }
        .recommend-item-body-item:last-child {
            border-bottom: 1px solid #eee;
        }
        .recommend-item-tit {
            font-size: 24px;
            height: 60px;
            line-height: 60px;
            color: #333;
            padding-left: 36px;
        }
        .home-recommend-item-three {
            background: #f5f5f5;
            .recommend-item-tit, .recommend-item-body-top {
                background: #fff;
            }
        }
        .myChart {
            width: 500px;
            height: 247px;
            padding-left: 20px;
            margin: 50px auto;
        }
        .home-recommend-item-three-btns {
            display: inline-block;
            margin-left: 30px;
        }
        .recommend-item-body-bottom {
            margin-top: 20px;
            background: #fff;
            height: 290px;
            .mynewdiv{
                font-size: 14px;
                height: 31px;
                line-height: 31px;
                padding-left: 30px;
            }
        }
        .recommend-item-body-bottom-item {
            display: inline-block;
            border-top: 1px solid #eee;
            padding-left: 20px;
        }
        .recommend-item-body-bottom-item:nth-child(odd) {
            width: 190px;
        }
        .recommend-item-body-bottom-item:nth-child(even) {
            width: 190px;
        }
        .recommend-item-body-bottom-up {
            color: #f00;
        }
        .recommend-item-body-bottom-down {
            color: #0dbb00;

        }
        /*recommend end==========================================*/

        //公共banner start
        .common-banner {
            position: relative;
            height: 127px;
        }
        .common-banner-line {
            border-bottom: 1px solid #E6EAEA;
            width: 100%;
            position: absolute;
            left: 0;
            top: 80px;
            transform: translate(0, -50%);
        }
        .common-banner-content {
            position: absolute;
            left: 50%;
            top: 16px;
            transform: translate(-50%, 0);
            background: #f5f5f5;
            padding:0 20px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        h2{
            padding:0;
        }
        .common-banner-content-tit {
            font-size: 24px;
            color: #333333;
            text-align: center;
            margin: 0;
            font-weight: normal;
        }
        .common-banner-content-subtit {
            opacity: 0.5;
            font-size: 14px;
            color: #000000;
            text-align: center;
            margin: 0;
        }
        //公共banner end
        .more-box {
            text-align: right;
            margin-bottom: 8px;
        }

        //商城
        .mall-home-product {
            background: #fff;
        }
        .mall-home-product-left {
            width: 50%;
            font-size: 0;
            .mall-home-product-left-50-info-name{
                font-size: 18px;
                font-weight: bold;
            }
            .mall-home-product-left-50-info-price{
                color: $color-highlight;
            }
            a {
                font-size: 14px;
                &:hover{
                    .mall-home-product-left-50-info-name{
                        color: $color-highlight;
                    }
                }
            }
        }
        .mall-home-product-left-50 {
            height: 281px;
            width: 600px;
            border-bottom: 1px solid #eee;
            border-right: 1px solid #eee;
            img {
                width: 160px;
                margin: 45px 20px 0 0;
            }
        }
        .headerName{
            padding: 0 30px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .mall-home-product-right-right{
            .headerName{
                padding-left: 0 !important;
            }
        }
        .mall-home-product-left-50-info-name.headerName{
            padding-left: 0 !important;
        }
        .mall-home-product-left-50:hover{
            box-shadow:0 9px 10px rgba(74, 74, 74, 0.2);
            border-left: none!important;
            color: #666;
            transition:all 0.5s;
            .headerName{
                color: $color-highlight;
            }
        }
        .headerName{
            font-weight: bold;
        }
        .mall-home-product-left-50-info {
            display: inline-block;
            width: 56%;
            padding: 20px 30px;
        }
        .mall-home-product-left-50-info-delivery {
            display: inline-block;
            margin: 30px 0;
        }
        .mall-home-product-left-25 {
            width: 299px;
            text-align: left;
            height: 281px;
            display: inline-block;
            border-right: 1px solid #eee;
            img {
                display: block;
                width: 100px;
                height: 100px;
                margin: 20px auto;
            }
            p{
                padding-left: 30px;
            }
        }
        .mall-home-product-left-25:hover{
            box-shadow:0 9px 10px rgba(74, 74, 74, 0.2);
            border-left: none!important;
            color: #666;
            transition:all 0.5s;
            .headerName{
                color: $color-highlight;
            }
        }
        .border-left {
            margin-left: 1px;
            /*border-left: 1px solid #eee;*/
        }
        .border-bottom {
            border-bottom: 1px solid #eee;
        }
        .mall-home-product-right {
            width: 50%;
        }
        .mall-home-product-right-left {
            width: 302px;
            .mall-home-product-left-25 {
                width: 302px;
            }
        }
        .mall-home-product-right-right {
            width: 297px;
            height: 561px;
            padding: 20px 0 0 30px;
            position: relative;
            img {
                width: 160px;
                height: 160px;
                position: absolute;
                margin-left: -80px;
                left: 50%;
                bottom: 96px;
            }
            > p:first-child{
                font-size: 18px;
                font-weight: bold;
            }
        }
        .mall-home-product-right-right:hover{
            box-shadow:0 9px 10px rgba(74, 74, 74, 0.2);
            border-left: none!important;
            color: #666;
            transition:all 0.5s;
            .headerName{
                color: $color-highlight;
            }
        }
        .shop {
            width: 1300px;
            overflow: hidden;
            margin: 0 auto 30px auto;
            .gy-box{
                height: 164px;
            }
            .company-name {
                color: #666666;
                line-height: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 12px;
            }
            .products{
                color: #333333;
                line-height: 18px;
                height: 36px;
                overflow: hidden;
            }
        }
        .gy-box {
            border-radius: 5px;
            margin-right: 20px;
            width: 224px;
            position: relative;
            padding: 60px 10px 20px;
            float: left;
            cursor: pointer;
        }
        .tag {
            color: #fff;
            line-height: 25px;
            position: absolute;
            padding: 0 12px;
            left: 0;
            top: 10px;
            background-color: #f7b608;
            font-size: 12px;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
        }
        .tag:after {
            position: absolute;
            width: 100%;
            height: 4px;
            left: 0;
            bottom: -4px;
            content: '';
            //background: url((unknown)) right top/cover no-repeat;
        }
        .main-title{
            margin: 35px 0;
            position: relative;
            text-align: center;
            h2{
                display: inline-block;
                font-weight: normal;
                background-color: $color-body-bg;
                line-height: 1;
                padding: 0 20px;
                color: #333333;
                font-size: 24px;
                margin: 0;
            }
            &:after{
                content: '';
                overflow: hidden;
                background-color: $color-border;
                width: 100%;
                display: block;
                height: 1px;
                position: absolute;
                left: 0;
                top: 50%;
                z-index: -1;
            }
        }
    }
    .recommend-item-body-item-profile{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 280px;
    }

    .mall-home-content {
        width: 1200px;
        margin:0 auto;
        box-sizing: border-box;
        font-size: 0;
        .home-hot {
             width: 100%;
             margin: 11px 0;
             height: 447px;
            background-color: #fff;
             &>div {
                height: 100%;
                vertical-align: middle;
                display: inline-block;
                font-size: 16px;
             }
            .el-carousel{
                height: 100%;
            }
            .el-carousel__container{
                height: 100% !important;
            }
            .home-hot-left {
                width: 232px;
                height:100%;
                position:relative;
                .bg-img  {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                // background: url('../assets/images/hot-item.png');
                // background-size: 100% 100%;
                .hot-title {
                   top: 42px;
                   text-align: center;
                   font-size: 16px;
                   color: #FFD4A0;
                   position:absolute;
                   margin: 0 auto;
                   width:100%;
                   &>div:nth-child(1) {
                        font-size: 34px;
                        color: #fff;
                        line-height: 53px;
                   }
                }
            }
            .home-hot-center {
                width: 488px;
                font-size: 16px;
                padding: 15px 0 0 6px;
                box-sizing: border-box;
                .el-carousel__item {
                    height: 93%!important;
                }

                .hot-center-con {
                    &>div {
                        width: 50%;
                        height: 50%;
                        float: left;
                        padding-left: 10px;
                        box-shadow: border-box;
                        border-right: 1px solid #E3E3E3;
                        border-bottom: 1px solid #E3E3E3;
                    }
                   div:nth-child(4n+3) {
                        border-bottom: none;
                    }
                    div:nth-child(4n+4) {
                            border-bottom: none;
                    }
                    .hot-center-item {
                            font-size: 16px;
                            // height: 95%;
                            cursor: pointer;
                            position: relative;
                        .item-name {
                            color: #000000;
                            width:100%;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .item-price {
                            color: #E03912;
                            span {
                                color: #ccc;
                            }
                        }
                        .decorate {
                             width: 52px;
                             line-height: 10px;
                             img {
                                width: 100%;
                             }
                        }
                        .item-bg {
                            width: 132px;
                            height: 132px;
                            position: absolute;
                            bottom: 15px;
                            right: 15px;
                            border-radius: 50%;
                            overflow: hidden;
                            background-color: #f9f9f9;
                            img {
                                width: 85%;
                                position: absolute;
                                left: 50%;
                                top :50%;
                                transform: translate(-50%,-50%);
                            }
                        }
                    }
                }
            }
            .home-hot-right {
                width: 477px;
                height: 100%;
                position: relative;
                .hot-right-top {
                    width: 100%;
                    height: 336px;
                    .right-top-swiper {
                        width: 100%;
                        height: 100%;
                        position: relative;
                    }
                    .hot-right-top-con {
                        width: 100%;
                        height: 100%;
                        display: inline-block;
                        padding-left: 20px;
                        .top-con-item {
                                width: 33.3%;
                                 padding-right: 20px;
                                cursor: pointer;
                                display: inline-block;
                                text-align: center;
                             .top-con-img {
                                width: 80px;
                                height: 80px;
                                border-radius: 50%;
                                overflow: hidden;
                                margin: 15px auto;
                                img {
                                    width: 100%;
                                }
                          }
                            .top-con-name {
                                font-size: 12px;
                                width: 100%;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                color: #4A4A4A;
                            }

                        }
                    }
                }
                .hot-right-bottom {
                    width: 100%;
                    height: 86px;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    &>div:nth-child(1) {
                        width: 309px;
                        height: 100%;
                        display: inline-block;
                        vertical-align: middle;
                        img {
                            width: 100%;
                            height: 100%;
                            cursor: pointer;
                        }
                    }
                     &>div:nth-child(2) {
                        width: 131px;
                        height: 40px;
                        line-height: 40px;
                        margin-left:10px ;
                        cursor: pointer;
                        display: inline-block;
                        text-align: center;
                        color: #fff;
                        background: #E03912;
                        vertical-align: middle;
                    }
                }
            }

        }
        .home-common {
            margin: 15px auto;
            min-height:200px ;
            .home-common-title {
                height: 50px;
                line-height: 50px;
                div:nth-child(1) {
                    font-size: 24px;
                    color: #000000;
                    float: left;
                }
                  div:nth-child(2) {
                    font-size: 14px;
                    color: #ccc;
                    float: right;
                    cursor: pointer;
                }
            }
            .home-common-content {
                width: 100%;
                height: 605px;
                 .common-content-left {
                    width: 232px;
                    height: 100%;
                    position: relative;
                    display: inline-block;
                    vertical-align: middle;
                    color: #9D5557;
                    .bg-img  {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .conetnt-left-title {
                        position: absolute;
                        width: 100%;
                        margin-top: 42px;
                        text-align: center;
                        font-size: 16px;
                        &>div:nth-child(1) {
                            font-size: 34px;
                            color: #fff;
                            line-height: 53px;
                        }
                    }
                }
                .common-content-right {
                    width: 966px;
                    height: 100%;
                    display: inline-block;
                    vertical-align: middle;
                    &>div {
                         width: 221px;
                         height: 296px;
                         background: #FFFFFF;
                         display: inline-block;
                         margin:0 0 15px 20px;
                    }
                    .common-content-right-item {
                        cursor: pointer;
                        position: relative;
                        .pop{
                            position: absolute;
                            left: 0;
                            top: 0;
                            height: 100%;
                            width: 100%;
                            color: #f00;
                            font-size: 14px;
                            opacity: 0;
                            transition: all 0.5s;
                            ul{
                                position: absolute;
                                z-index: 9;
                                color: #fff;
                                width: 100%;
                                left: 0;
                                top: 50%;
                                transform: translateY(-50%);
                                padding: 0 16px;
                                li.button-box{
                                    text-align: center;
                                    margin-top: 70px;
                                }
                            }
                            .mask{
                                position: absolute;
                                height: 100%;
                                width: 100%;
                                z-index: 1;
                                background-image: linear-gradient(#767676, #000);
                                left: 0;
                                top: 0;
                                opacity: 0.75;
                            }
                        }
                        &:hover{
                            .pop{
                                opacity: 1;
                            }
                        }
                        .item-img-con {
                            width: 170px;
                            height: 170px;
                            background-position: 50%;
                            background-size: cover;
                            background-repeat: no-repeat;
                            margin: 10px auto;
                            position: relative;
                            img {
                                width: 100%;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%,-50%);
                                vertical-align: middle;
                            }
                        }
                        .dec-con {
                            width: 100%;
                            text-indent: 10px;
                            font-size: 14px;
                            color: #9B9B9B;
                            margin-top:20px ;
                            .product-name {
                                font-size: 15px;
                                color: #4A4A4A;
                                width: 98%;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                            .product-price {
                                color: #E03912;
                                font-size: 16px;
                                span {
                                    font-size: 12px;
                                    color: #4A4A4A;
                                }
                            }
                        }
                    }
                     .common-content-right-item:hover{
                        box-shadow:0 9px 10px rgba(74, 74, 74, 0.2);
                        color: #666;
                        transition:all 0.5s;
                        .product-name {
                            color: $color-highlight!important;
                     }
                }
                }
            }
            .home-common-shop {
                width: 100%;
                height: 208px;
                .home-item {
                    width: 285px;
                    height: 100%;
                    display: inline-block;
                    background-color: #fff;
                    cursor: pointer;
                    &:nth-child(n+1) {
                        margin-right:20px;
                    }
                      &:nth-last-child(1){
                        margin-right:0;
                    }
                    .company-img {
                        width: 100%;
                        height: 145px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .company-name {
                        width: 100%;
                        text-align: center;
                        height: 60px;
                        line-height: 60px;
                        img {
                            width: 38px;
                            height: 38px;
                            border-radius:50%;
                            vertical-align: middle;
                            margin-right:5px ;
                        }
                        span {
                            display: inline-block;
                            font-size: 16px;
                            color: #4A4A4A;
                            vertical-align: middle;
                            max-width: 180px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow:ellipsis;
                        }
                    }
                }
            }
            .home-common-industry {
                width: 100%;
                height: 325px;
                margin-bottom:30px ;
                overflow: hidden;
                .industry-left {
                    width: 50%;
                    height: 100%;
                    display: inline-block;
                    vertical-align: middle;
                    .industry-left-top {
                         width: 100%;
                         height: 244px;
                         img {
                             width: 100%;
                             height: 100%;
                         }
                    }
                }
                .industry-left-bottom {
                    width: 100%;
                    height: 80px;
                    font-size: 14px;
                    color: #333333;
                    line-height: 30px;
                    text-align: center;
                    padding-top:10px;
                    box-sizing:border-box;
                    // div {
                    //     height:40px;
                    //     line-height: 40px;
                    // }
                      .el-carousel{
                        height: 100%;
                      }
                        .el-carousel__container{
                            height: 100% !important;
                        }
                        .el-carousel__indicators {
                            display: none!important;
                        }
                }
                .industry-right {
                    display: inline-block;
                    width: 50%;
                    height: 100%;
                    background-color: #fff;
                    vertical-align: middle;
                    position: relative;
                    .industry-right-button {
                        position: absolute;
                        left: 50px;
                        top: 10px;
                        color: #333;
                        .chart-btn:nth-child(2) {
                            margin-left:20px ;
                        }
                        .chart-btn {
                            cursor: pointer;
                            display: inline-block;
                            color: #333;
                            font-weight:800;
                            font-size: 12px;
                        }
                        .btn-active {
                            color: #E0370F;
                            border-bottom: 1px solid #E0370F;
                            background-color:transparent;
                        }
                    }
                }
            }
        }
        .common-icon {
            position: absolute;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 50px;
            line-height: 50px;
            border-radius: 50%;
            text-align: center;
            background-color: #fff;
            text-indent: 5px;
            i {
              font-size: 30px;
              color: #9E7A7B ;
              cursor: pointer;
            }
        }
    }
</style>
<style lang="scss">
    .mall-home-box {
        .isBlock {
            .el-carousel__indicators {
                display: none;
            }
        }
        .el-carousel__item{
            .recommend-item-body-item-total:hover{
                .recommend-item-body-item-name{
                    color: red;
                }
            }
        }
        .el-tabs__item {
            font-size: 12px !important;
            padding: 0 10px;
        }
        .el-tabs__active-bar {
            left: -6% !important;
            width: 26% !important;
        }
        .mall-home-content{
            .el-carousel__button {
                padding: 4px;
                border-radius: 100%;
                width: 10px;
                height: 10px;
                background: rgba(0,0,0,0.5);
            }
            // .el-carousel__indicators--horizontal {
            //     bottom: -15px;
            // }
        }
        .el-carousel__container{
            height: 100%;
        }
        .el-carousel__indicators{
            z-index: 5 !important;
        }
        .industry-left-bottom {
            .el-carousel__indicators {
                display: none !important;
            }
         }
    }
</style>
