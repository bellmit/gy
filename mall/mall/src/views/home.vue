<template>
    <div class="mall-home-box">
        <div class="mall-home">
            <div class="mall-home-banner" :style="bannerStyle">
                <div class="mall-home-banner-content">
                    <!--banner-category start-->
                    <div class="banner-category" @mouseleave="hideItems">
                        <div class="banner-category-first">
                            <div class="first-tit mall-nav-tit">商品分类</div>
                            <div class="first-items" v-if="categories.first.length>1">
                                <div @mouseover.capture="showItems" class="first-item mg-top20" v-for="(item,index) in categories.first" :key="index"
                                     :myindex="index">
                                    <div class="first-item-category mall-nav-tit">{{item.category}}</div>
                                    <span class="first-item-content" v-for="(categ, secondindex) in item.catalogueNames" :key="secondindex">{{categ.catalogueName}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="category-second" v-show="myindex" v-if="categories.second.length>1">
                            <div class="category-second-item" v-for="(item,index) in categories.second" :key="index">
                                <div v-show="index == myindex">
                                    <div v-for="(categs, thirdindex) in item.items" :key="thirdindex" class="mg-top20">
                                        <div class="second-item-category mall-nav-tit">{{categs.catalogueName}}</div>
                                        <span class="second-item-content"
                                              :item-id="categ.productId"
                                              @click="gotoPage($event,'search-page-prod')"
                                              v-for="(categ, fourindex) in categs.productList" :key="fourindex">{{categ.productName}}</span>
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

            <div class="mall-home-body">
                <div class="clearfix mall-home-recommend">
                    <div class="home-recommend-item fl">
                        <div class="recommend-item-tit">推荐商品</div>
                        <div class="recommend-item-body">
                            <div class="block">
                                <el-carousel height="450px" arrow="never" indicator-position="outside">
                                    <el-carousel-item v-for="(item,index) in recommend" :key="index">
                                        <span class="clearfix recommend-item-body-item"
                                              :item-id="product.offerId"
                                              @click="gotoPage($event,'product-detail')"
                                              v-for="(product,index) in item.items" :key="index">
                                            <img class="fl recommend-item-body-item" :src="product.formulaImg"/>
                                            <div class="fl">
                                                <p class="recommend-item-body-item-name">{{product.prodName}}</p>
                                                <p>{{product.currencyMark}}{{product.price}}{{product.priceUnit}}</p>
                                            </div>
                                        </span>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </div>
                    <div class="home-recommend-item home-recommend-item-second fl">
                        <div class="recommend-item-tit">热门推荐</div>
                        <div class="recommend-item-body">
                            <div class="block">
                                <el-carousel height="450px" arrow="never" indicator-position="outside">
                                    <el-carousel-item v-for="(item,index) in hot" :key="index">
                                        <span class="clearfix recommend-item-body-item"
                                              :item-id="product.companyId"
                                              @click="gotoPage($event,'shop-home')"
                                              v-for="(product,index) in item.items" :key="index">
                                            <img :src="product.companyLogo" class="fl recommend-item-body-item" alt="" v-if="product.companyLogo != null"/>
                                            <img src="../assets/images/V_logo.jpg" class="fl recommend-item-body-item" alt="" v-if="product.companyLogo == null"/>
                                            <div class="fl">
                                                <p class="recommend-item-body-item-name">{{product.companyName}}</p>
                                                <p class="recommend-item-body-item-profile">{{product.profile}}</p>
                                            </div>
                                        </span>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </div>
                    <div class="home-recommend-item home-recommend-item-three fr">
                        <div class="recommend-item-tit">
                            <span>热门价格</span>
                            <div class="home-recommend-item-three-btns">
                                <button class="btn" @click="drawEchart('b')" :class="{'btn-active': btnStatus == 'b'||btnStatus==0}">{{mychat1[2]}}</button>
                                <button class="btn" @click="drawEchart('y')" :class="{'btn-active': btnStatus == 'y'}">{{mychat2[2]}}</button>
                            </div>
                        </div>
                        <div class="recommend-item-body">
                            <div class="recommend-item-body-top charts">
                                <div id="myChart" class="myChart"></div>
                            </div>
                            <div class="recommend-item-body-bottom">
                                <div class="recommend-item-tit">行业数据</div>
                                <div>
                                    <el-carousel height="210px">
                                        <el-carousel-item>
                                            <div class="mynewdiv" v-bind:key="index" v-if='index<6' v-for="(item,index) in hotIndex">{{item.indexName}} &nbsp;&nbsp;{{item.indexNum}}（{{item.unitValue}}）</div>
                                        </el-carousel-item>
                                        <el-carousel-item>
                                            <div class="mynewdiv" v-bind:key="index" v-if='index<13&&index>6' v-for="(item,index) in hotIndex">{{item.indexName}} &nbsp;&nbsp;{{item.indexNum}}（{{item.unitValue}}）</div>
                                        </el-carousel-item>
                                    </el-carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--recommend============== end-->

                <!--化工商城============== start-->
                <div class="common-mg">
                    <div class="common-banner">
                        <div class="common-banner-line"></div>
                        <div class="common-banner-content">
                            <h2 class="common-banner-content-tit">化工商城</h2>
                        </div>
                    </div>
                    <div class="more-box">
                        <a href="javascript:void(0);"
                           :item-id="chemicalId"
                           @click="gotoPage($event,'search-page-cata')"
                           class="more-box-link">更多></a>
                    </div>
                    <div class="mall-home-product clearfix">
                        <div class="mall-home-product-left fl">
                            <a class="mall-home-product-left-50 clearfix"
                               href="javascript:void(0);"
                               :item-id="mall1[0].offerId"
                               @click="gotoPage($event,'product-detail')"
                            >
                                <div class="mall-home-product-left-50-info fl">
                                    <div class="mall-home-product-left-50-info-name">{{mall1[0].prodName}}</div>
                                    <div class="mall-home-product-left-50-info-delivery">
                                        <p>可供量| {{mall1[0].supplies}}</p>
                                        <p>提货地| {{mall1[0].place}}</p>
                                        <p>交割日期| {{mall1[0].tradeDate}}</p>
                                    </div>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall1[0].currencyMark}}{{mall1[0].price}}</span>/{{mall1[0].priceUnit}}</p>
                                </div>
                                <img class="fr" :src="mall1[0].productImg"/>
                            </a>
                            <div class="clearfix">
                                <a class="mall-home-product-left-25 fl"
                                   href="javascript:void(0);"
                                   :item-id="mall1[1].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall1[1].productImg"/>
                                    <p>{{mall1[1].prodName}}</p>
                                    <p>可供量| {{mall1[1].supplies}}</p>
                                    <p>提货地| {{mall1[1].place}}</p>
                                    <p>交割日期| {{mall1[1].tradeDate}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall1[1].currencyMark}}{{mall1[1].price}}</span>/{{mall1[1].priceUnit}}</p>
                                </a>
                                <a class="mall-home-product-left-25 border-left fr"
                                   href="javascript:void(0);"
                                   :item-id="mall1[2].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall1[2].productImg"/>
                                    <p>{{mall1[2].prodName}}</p>
                                    <p>可供量| {{mall1[2].supplies}}</p>
                                    <p>提货地| {{mall1[2].place}}</p>
                                    <p>交割日期| {{mall1[2].tradeDate}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall1[2].currencyMark}}{{mall1[2].price}}</span>/{{mall1[2].priceUnit}}</p>
                                </a>
                            </div>
                        </div>
                        <div class="mall-home-product-right fr clearfix">
                            <div class="mall-home-product-right-left fl">
                                <a class="mall-home-product-left-25 border-bottom"
                                   href="javascript:void(0);"
                                   :item-id="mall1[3].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall1[3].productImg"/>
                                    <p>{{mall1[3].prodName}}</p>
                                    <p>可供量| {{mall1[3].supplies}}</p>
                                    <p>提货地| {{mall1[3].place}}</p>
                                    <p>交割日期| {{mall1[3].tradeDate}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall1[3].currencyMark}}{{mall1[3].price}}</span>/{{mall1[3].priceUnit}}</p>
                                </a>
                                <a class="mall-home-product-left-25 "
                                   href="javascript:void(0);"
                                   :item-id="mall1[4].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall1[4].productImg"/>
                                    <p>{{mall1[4].prodName}}</p>
                                    <p>可供量| {{mall1[4].supplies}}</p>
                                    <p>提货地| {{mall1[4].place}}</p>
                                    <p>交割日期| {{mall1[4].tradeDate}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall1[4].currencyMark}}{{mall1[4].price}}</span>/{{mall1[4].priceUnit}}</p>
                                </a>
                            </div>
                            <a class="mall-home-product-right-right fr border-left"
                               href="javascript:void(0);"
                               :item-id="mall1[5].offerId"
                               @click="gotoPage($event,'product-detail')"
                            >
                                <p>{{mall1[5].prodName}}</p>
                                <div class="mall-home-product-left-50-info-delivery">
                                    <p>可供量| {{mall1[5].supplies}}</p>
                                    <p>提货地| {{mall1[5].place}}</p>
                                    <p>交割日期| {{mall1[5].tradeDate}}</p>
                                </div>
                                <p><span class="mall-home-product-left-50-info-price">{{mall1[5].currencyMark}}{{mall1[5].price}}</span>/{{mall1[5].priceUnit}}</p>
                                <img :src="mall1[5].productImg"/>
                            </a>
                        </div>
                    </div>
                </div>
                <!--化工商城============== end-->

                <!--油品商城============== start-->
                <div class="common-mg">
                    <div class="common-banner">
                        <div class="common-banner-line"></div>
                        <div class="common-banner-content">
                            <h2 class="common-banner-content-tit">油品商城</h2>
                        </div>
                    </div>
                    <div class="more-box">
                        <a href="javascript:void(0);"
                           :item-id="oilId"
                           @click="gotoPage($event,'search-page-cata')"
                           class="more-box-link">更多></a>
                    </div>
                    <div class="mall-home-product clearfix">
                        <div class="mall-home-product-left fl">
                            <a class="mall-home-product-left-50 clearfix"
                               href="javascript:void(0);"
                               :item-id="mall2[0].offerId"
                               @click="gotoPage($event,'product-detail')"
                            >
                                <div class="mall-home-product-left-50-info fl">
                                    <div class="mall-home-product-left-50-info-name">{{mall2[0].prodName}}</div>
                                    <div class="mall-home-product-left-50-info-delivery">
                                        <p>可供量| {{mall2[0].supplies}}</p>
                                        <p>提货地| {{mall2[0].place}}</p>
                                        <p>交割日期| {{mall2[0].tradeDate}}</p>
                                    </div>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall2[0].currencyMark}}{{mall2[0].price}}</span>/{{mall2[0].priceUnit}}</p>
                                </div>
                                <img class="fr" :src="mall2[0].productImg"/>
                            </a>
                            <div class="clearfix">
                                <a class="mall-home-product-left-25 fl"
                                   href="javascript:void(0);"
                                   :item-id="mall2[1].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall2[1].productImg"/>
                                    <p>{{mall2[1].prodName}}</p>
                                    <p>可供量| {{mall2[1].supplies}}</p>
                                    <p>提货地| {{mall2[1].place}}</p>
                                    <p>交割日期| {{mall2[1].tradeDate}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall2[1].currencyMark}}{{mall2[1].price}}</span>/{{mall2[1].priceUnit}}</p>
                                </a>
                                <a class="mall-home-product-left-25 border-left fr"
                                   href="javascript:void(0);"
                                   :item-id="mall2[2].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall2[2].productImg"/>
                                    <p>{{mall2[2].prodName}}</p>
                                    <p>可供量| {{mall2[2].supplies}}</p>
                                    <p>提货地| {{mall2[2].place}}</p>
                                    <p>交割日期| {{mall2[2].tradeDate}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall2[2].currencyMark}}{{mall2[2].price}}</span>/{{mall2[2].priceUnit}}</p>
                                </a>
                            </div>
                        </div>
                        <div class="mall-home-product-right fr clearfix">
                            <div class="mall-home-product-right-left fl">
                                <a class="mall-home-product-left-25 border-bottom"
                                   href="javascript:void(0);"
                                   :item-id="mall2[3].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall2[3].productImg"/>
                                    <p>{{mall2[3].prodName}}</p>
                                    <p>可供量| {{mall2[3].supplies}}</p>
                                    <p>提货地| {{mall2[3].place}}</p>
                                    <p>交割日期| {{mall2[3].tradeDate}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall2[3].currencyMark}}{{mall2[3].price}}</span>/{{mall2[3].priceUnit}}</p>
                                </a>
                                <a class="mall-home-product-left-25 "
                                   href="javascript:void(0);"
                                   :item-id="mall2[4].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall2[4].productImg"/>
                                    <p>{{mall2[4].prodName}}</p>
                                    <p>可供量| {{mall2[4].supplies}}</p>
                                    <p>提货地| {{mall2[4].place}}</p>
                                    <p>交割日期| {{mall2[4].tradeDate}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall2[4].currencyMark}}{{mall2[4].price}}</span>/{{mall2[4].priceUnit}}</p>
                                </a>
                            </div>
                            <a class="mall-home-product-right-right fr border-left"
                               href="javascript:void(0);"
                               :item-id="mall2[5].offerId"
                               @click="gotoPage($event,'product-detail')"
                            >
                                <p>{{mall2[5].prodName}}</p>
                                <div class="mall-home-product-left-50-info-delivery">
                                    <p>可供量| {{mall2[5].supplies}}</p>
                                    <p>提货地| {{mall2[5].place}}</p>
                                    <p>交割日期| {{mall2[5].tradeDate}}</p>
                                </div>
                                <p><span class="mall-home-product-left-50-info-price">{{mall2[5].currencyMark}}{{mall2[5].price}}</span>/{{mall2[5].priceUnit}}</p>
                                <img :src="mall2[5].productImg"/>
                            </a>
                        </div>
                    </div>
                </div>
                <!--油品商城============== end-->
                <!--塑料商城============== start-->
                <div class="common-mg">
                    <div class="common-banner">
                        <div class="common-banner-line"></div>
                        <div class="common-banner-content">
                            <h2 class="common-banner-content-tit">塑料商城</h2>
                        </div>
                    </div>
                    <div class="more-box">
                        <a href="javascript:void(0);"
                           :item-id="plasticsId"
                           @click="gotoPage($event,'search-page-cata')"
                           class="more-box-link">更多></a>
                    </div>
                    <div class="mall-home-product clearfix">
                        <div class="mall-home-product-left fl">
                            <a class="mall-home-product-left-50 clearfix"
                               href="javascript:void(0);"
                               :item-id="mall3[0].offerId"
                               @click="gotoPage($event,'product-detail')"
                            >
                                <div class="mall-home-product-left-50-info fl">
                                    <div class="mall-home-product-left-50-info-name">{{mall3[0].prodName}}</div>
                                    <div class="mall-home-product-left-50-info-delivery">
                                        <p>可供量| {{mall3[0].supplies}}</p>
                                        <p>提货地| {{mall3[0].place}}</p>
                                        <p>交割日期| {{mall3[0].tradeDate}}</p>
                                    </div>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall3[0].currencyMark}}{{mall3[0].price}}</span>/{{mall3[0].priceUnit}}</p>
                                </div>
                                <img class="fr" :src="mall3[0].productImg"/>
                            </a>
                            <div class="clearfix">
                                <a class="mall-home-product-left-25 fl"
                                   href="javascript:void(0);"
                                   :item-id="mall3[1].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall3[1].productImg"/>
                                    <p>{{mall3[1].prodName}}</p>
                                    <p>可供量| {{mall3[1].supplies}}</p>
                                    <p>提货地| {{mall3[1].place}}</p>
                                    <p>交割日期| {{mall3[1].tradeDate}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall3[1].currencyMark}}{{mall3[1].price}}</span>/{{mall3[1].priceUnit}}</p>
                                </a>
                                <a class="mall-home-product-left-25 border-left fr"
                                   href="javascript:void(0);"
                                   :item-id="mall3[2].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall3[2].productImg"/>
                                    <p>{{mall3[2].prodName}}</p>
                                    <p>可供量| {{mall3[2].supplies}}</p>
                                    <p>提货地| {{mall3[2].place}}</p>
                                    <p>交割日期| {{mall3[2].tradeDate}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall3[2].currencyMark}}{{mall3[2].price}}</span>/{{mall3[2].priceUnit}}</p>
                                </a>
                            </div>
                        </div>
                        <div class="mall-home-product-right fr clearfix">
                            <div class="mall-home-product-right-left fl">
                                <a class="mall-home-product-left-25 border-bottom"
                                   href="javascript:void(0);"
                                   :item-id="mall3[3].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall3[3].productImg"/>
                                    <p>{{mall3[3].prodName}}</p>
                                    <p>可供量| {{mall3[3].supplies}}</p>
                                    <p>提货地| {{mall3[3].place}}</p>
                                    <p>交割日期| {{mall3[3].tradeDate}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall3[3].currencyMark}}{{mall3[3].price}}</span>/{{mall3[3].priceUnit}}</p>
                                </a>
                                <a class="mall-home-product-left-25 "
                                   href="javascript:void(0);"
                                   :item-id="mall3[4].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall3[4].productImg"/>
                                    <p>{{mall3[4].prodName}}</p>
                                    <p>可供量| {{mall3[4].supplies}}</p>
                                    <p>提货地| {{mall3[4].place}}</p>
                                    <p>交割日期| {{mall3[4].tradeDate}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall3[4].currencyMark}}{{mall3[4].price}}</span>/{{mall3[4].priceUnit}}</p>
                                </a>
                            </div>
                            <a class="mall-home-product-right-right fr border-left"
                               href="javascript:void(0);"
                               :item-id="mall3[5].offerId"
                               @click="gotoPage($event,'product-detail')"
                            >
                                <p>{{mall3[5].prodName}}</p>
                                <div class="mall-home-product-left-50-info-delivery">
                                    <p>可供量| {{mall3[5].supplies}}</p>
                                    <p>提货地| {{mall3[5].place}}</p>
                                    <p>交割日期| {{mall3[5].tradeDate}}</p>
                                </div>
                                <p><span class="mall-home-product-left-50-info-price">{{mall3[5].currencyMark}}{{mall3[5].price}}</span>/{{mall3[5].priceUnit}}</p>
                                <img :src="mall3[5].productImg"/>
                            </a>
                        </div>
                    </div>
                </div>
                <!--塑料商城============== end-->

                <!--其他============== start-->
                <div class="common-mg" style="display:none">
                    <div class="common-banner">
                        <div class="common-banner-line"></div>
                        <div class="common-banner-content">
                            <h2 class="common-banner-content-tit">其他</h2>
                        </div>
                    </div>
                    <div class="more-box">
                        <a href="javascript:void(0);"
                           :item-id="otherId"
                           @click="gotoPage($event,'search-page-cata')"
                           class="more-box-link">更多></a>
                    </div>
                    <div class="mall-home-product clearfix">
                        <div class="mall-home-product-left fl">
                            <a class="mall-home-product-left-50 clearfix"
                               href="javascript:void(0);"
                               :item-id="mall4[0].offerId"
                               @click="gotoPage($event,'product-detail')"
                            >
                                <div class="mall-home-product-left-50-info fl">
                                    <div class="mall-home-product-left-50-info-name">{{mall4[0].prodName}}</div>
                                    <div class="mall-home-product-left-50-info-delivery">
                                        <p>可供量| {{mall4[0].supplies}}</p>
                                        <p>提货地| {{mall4[0].place}}</p>
                                        <p>交割日期| {{mall4[0].tradeDate}}</p>
                                    </div>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall4[0].currencyMark}}{{mall4[0].price}}</span>/{{mall4[0].priceUnit}}</p>
                                </div>
                                <img class="fr" :src="mall4[0].productImg"/>
                            </a>
                            <div class="clearfix">
                                <a class="mall-home-product-left-25 fl"
                                   href="javascript:void(0);"
                                   :item-id="mall4[1].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall4[1].productImg"/>
                                    <p>{{mall4[1].prodName}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall4[1].currencyMark}}{{mall4[1].price}}</span>/{{mall4[1].priceUnit}}</p>
                                </a>
                                <a class="mall-home-product-left-25 border-left fr"
                                   href="javascript:void(0);"
                                   :item-id="mall4[2].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall4[2].productImg"/>
                                    <p>{{mall4[2].prodName}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall4[2].currencyMark}}{{mall4[2].price}}</span>/{{mall4[2].priceUnit}}</p>
                                </a>
                            </div>
                        </div>
                        <div class="mall-home-product-right fr clearfix">
                            <div class="mall-home-product-right-left fl">
                                <a class="mall-home-product-left-25 border-bottom"
                                   href="javascript:void(0);"
                                   :item-id="mall4[3].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall4[3].productImg"/>
                                    <p>{{mall4[3].prodName}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall4[3].currencyMark}}{{mall4[3].price}}</span>/{{mall4[3].priceUnit}}</p>
                                </a>
                                <a class="mall-home-product-left-25 "
                                   href="javascript:void(0);"
                                   :item-id="mall4[4].offerId"
                                   @click="gotoPage($event,'product-detail')"
                                >
                                    <img :src="mall4[4].productImg"/>
                                    <p>{{mall4[4].prodName}}</p>
                                    <p><span class="mall-home-product-left-50-info-price">{{mall4[4].currencyMark}}{{mall4[4].price}}</span>/{{mall4[4].priceUnit}}</p>
                                </a>
                            </div>
                            <a class="mall-home-product-right-right fr border-left"
                               href="javascript:void(0);"
                               :item-id="mall4[5].offerId"
                               @click="gotoPage($event,'product-detail')"
                            >
                                <p>{{mall4[5].name}}</p>
                                <div class="mall-home-product-left-50-info-delivery">
                                    <p>可供量| {{mall4[5].supplies}}</p>
                                    <p>提货地| {{mall4[5].place}}</p>
                                    <p>交割日期| {{mall4[5].tradeDate}}</p>
                                </div>
                                <p><span class="mall-home-product-left-50-info-price">{{mall4[5].currencyMark}}{{mall4[5].price}}</span>/{{mall4[5].priceUnit}}</p>
                                <img :src="mall4[5].productImg"/>
                            </a>
                        </div>
                    </div>
                </div>
                <!--其他============== end-->
                <!--START 推荐店铺-->
                <div class="main-title">
                    <h2>推荐店铺</h2>
                </div>
                <div class="shop">
                    <div class="gy-box"
                         v-for="(item,index) in shopList" :key="index"
                         :item-id="item.companyId"
                         @click="gotoPage($event,'shop-home')"
                    >
                        <span class="tag">主营业务</span>
                        <dl>
                            <dt class="clearfix">
                                <span class="fl" style="display: inline-block;width: 25px;height: 25px;background-size: cover;">
                                    <img :src="item.companyLogo" style="height:25px;width:25px" alt="" v-if="item.companyLogo != null"/>
                                    <img src="../assets/images/V_logo.jpg" style="height:25px;width:25px" alt="" v-if="item.companyLogo == null"/>
                                </span>
                                <div class="fl" style="width: 80%;margin-left: 10px;">
                                    <p class="company-name">{{item.companyName}}</p>
                                    <p class="products">{{item.profile}}</p>
                                </div>
                            </dt>
                        </dl>
                    </div>
                </div>
                <!--END 推荐店铺-->
                <div class="gy-ad" v-if="adImgUrl!=null">
                    <a :href="adLinkUrl" target="_blank" v-if="adLinkUrl!=null"><img :src="adImgUrl" alt=""></a>
                    <img :src="adImgUrl" alt="" v-if="adLinkUrl==null">
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
            const target = event.currentTarget;
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

        // 获取推荐商品
        me.$http.post(me.$api.mallHome.prodRecommend,
            {
                pageNo: 1,
                pageSize: 15
            }
        ).then(function (response) {
            if (response.data.code === 0) {
                const prodList = response.data.data.prodList;
                prodList.forEach((item, index) => {
                    if (item.formulaImg && item.formulaImg.startsWith('http')) {
                        return;
                    }
                    let timestmp = (new Date()).valueOf();
                    item.formulaImg = me.$api.payment.paymentImage + '?filePath=' + item.formulaImg + '&t=' + timestmp;
                });

                if (prodList.length > 5) {
                    me.recommend.push({'items': prodList.slice(0, 5)});
                    if (prodList.length > 10) {
                        me.recommend.push({'items': prodList.slice(5, 10)});
                        me.recommend.push({'items': prodList.slice(10, 15)});
                    } else {
                        me.recommend.push({'items': prodList.slice(5)});
                    }
                } else {
                    me.recommend.push({'items': prodList});
                }
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
                if (shopList.length > 5) {
                    me.hot.push({'items': shopList.slice(0, 5)});
                    if (shopList.length > 10) {
                        me.hot.push({'items': shopList.slice(5, 10)});
                        me.hot.push({'items': shopList.slice(10, 15)});
                    } else {
                        me.hot.push({'items': shopList.slice(5)});
                    }
                } else {
                    me.hot.push({'items': shopList});
                }
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
                pageSize: 6
            }
        ).then(function (response) {
            if (response.data.code === 0) {
                const respData = response.data.data;
                me.mall1 = respData.prodList1;
                me.mall1.forEach((item, index) => {
                    if (item.productImg && item.productImg.startsWith('http')) {
                        return;
                    }
                    let timestmp = (new Date()).valueOf();
                    item.productImg = me.$api.payment.paymentImage + '?filePath=' + item.productImg + '&t=' + timestmp;
                });
                let listLen = me.mall1.length;
                if (listLen < 6) {
                    for (var i = 0; i < 6 - listLen; i++) {
                        me.mall1.push({});
                    }
                }
                me.mall2 = respData.prodList2;
                me.mall2.forEach((item, index) => {
                    if (item.productImg && item.productImg.startsWith('http')) {
                        return;
                    }
                    let timestmp = (new Date()).valueOf();
                    item.productImg = me.$api.payment.paymentImage + '?filePath=' + item.productImg + '&t=' + timestmp;
                });
                listLen = me.mall2.length;
                if (listLen < 6) {
                    for (var j = 0; j < 6 - listLen; j++) {
                        me.mall2.push({});
                    }
                }
                me.mall3 = respData.prodList3;
                me.mall3.forEach((item, index) => {
                    if (item.productImg && item.productImg.startsWith('http')) {
                        return;
                    }
                    let timestmp = (new Date()).valueOf();
                    item.productImg = me.$api.payment.paymentImage + '?filePath=' + item.productImg + '&t=' + timestmp;
                });
                listLen = me.mall3.length;
                if (listLen < 6) {
                    for (var m = 0; m < 6 - listLen; m++) {
                        me.mall3.push({});
                    }
                }
                me.mall4 = respData.prodList4;
                me.mall4.forEach((item, index) => {
                    if (item.productImg && item.productImg.startsWith('http')) {
                        return;
                    }
                    let timestmp = (new Date()).valueOf();
                    item.productImg = me.$api.payment.paymentImage + '?filePath=' + item.productImg + '&t=' + timestmp;
                });
                listLen = me.mall4.length;
                if (listLen < 6) {
                    for (var n = 0; n < 6 - listLen; n++) {
                        me.mall4.push({});
                    }
                }
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
                }
            });
    }
};
</script>

<style lang="scss" scoped>
    .mall-home {
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
            height: 447px;
            background-size: cover;
        }
        .mg-top20 {
            margin-top: 20px;
        }
        .mall-nav-tit {
            font-size: 16px;
            color: $color-title;
            font-weight: bold;
        }
        .second-item-content,
        .first-item-content {
            display: inline-block;
            margin-right: 8px;
        }
        .mall-home-banner-content {
            width: 1200px;
            height: 100%;
            position: relative;
            margin: 0 auto;
        }
        .banner-category {
            display: inline-block;
            position: absolute;
            left: 0;
        }
        .banner-category-first {
            position: absolute;
            top: 1px;
            left: 0;
            width: 285px;
            height: 447px;
            background: #fff;
            overflow: auto;
        }
        .first-tit {
            padding: 20px 10px 0 22px;
        }
        .first-item {
            padding: 0 10px 0 22px;
            cursor: pointer;
            &:hover {
                background: #eee;
                color: #E03912;
                .first-item-category {
                    color: #E03912;
                }
            }
        }
        .category-second {
            width: 658px;
            position: absolute;
            left: 285px;
            border: 1px solid #979797;
            height: 447px;
            overflow-y: scroll;
            background: #fff;
            padding: 10px;
        }
        .second-item-content {
            cursor: pointer;
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
                padding: 15px;
                border: none;
            }
        }
        .recommend-item-body-item-name {
            margin-top: 20px;
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
            width: 385px;
            height: 186px;
            border-top: 1px solid #eee;
            padding-left: 20px;
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
            height: 100px;
        }
        .common-banner-line {
            border-bottom: 1px solid #E6EAEA;
            width: 100%;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate(0, -50%);
        }
        .common-banner-content {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translate(-50%, 0);
            background: #f5f5f5;
            width: 20%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .common-banner-content-tit {
            font-size: 24px;
            color: #000000;
            text-align: center;
            margin: 0;
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
            border-right: 1px solid #eee;
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
            height: 280px;
            width: 598px;
            border-bottom: 1px solid #eee;
            img {
                width: 200px;
                margin: 30px 20px 0 0;
            }
        }
        .mall-home-product-left-50-info {
            display: inline-block;
            width: 60%;
            padding: 20px 30px;
        }
        .mall-home-product-left-50-info-delivery {
            display: inline-block;
            margin: 30px 0;
        }
        .mall-home-product-left-25 {
            width: 298px;
            text-align: center;
            height: 280px;
            img {
                display: block;
                max-width: 100px;
                margin: 15px auto;
                height: 100px;
            }
        }
        .border-left {
            border-left: 1px solid #eee;
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
            width: 295px;
            height: 560px;
            padding: 20px 0 0 30px;
            img {
                max-width: 100px;
                display: block;
                margin: 30px auto;
            }
            > p:first-child{
                font-size: 18px;
                font-weight: bold;
            }
            &:hover{
                > p:first-child{
                    color: $color-highlight;
                }
            }
        }

        .shop {
            width: 1300px;
            overflow: hidden;
            margin: 0 auto 30px auto;
            .gy-box{
                height: 118px;
            }
            .company-name {
                color: #4a4a4a;
                line-height: 14px;
                opacity: 0.6;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 4px;
            }
            .products{
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
                color: $color-black;
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
</style>
<style lang="scss">
    .mall-home-box {
        .el-tabs__item {
            font-size: 12px !important;
            padding: 0 10px;
        }
        .el-tabs__active-bar {
            left: -6% !important;
            width: 26% !important;
        }
        .el-carousel__button {
            padding: 4px;
            border-radius: 100%;
            width: 10px;
            height: 10px;
            background: #333;
        }
    }
</style>
