<template>
    <div class="container-fluid">
        <gy-header :page="currentPage"></gy-header>
        <div class="home my-mall-home">
            <!--START Kv-->
            <div class="kv">
                <el-carousel :interval="5000">
                    <el-carousel-item v-for="item in kvList" :key="item.id">
                        <a :href='item.linkUrl ? item.linkUrl : "javascript:;"' class="carouselImg">
                            <div class="item bg-img home-carousel-img" :style='"background-image: url(" + item.imageUrl + ")"'></div>
                        </a>
                    </el-carousel-item>
                </el-carousel>
                <div class="search-wrap">
                    <transition name="fade">
                        <i class="icon icon-kvsearch" @click="showSearch = true" v-show="!showSearch"></i>
                    </transition>
                    <transition name="fade">
                        <div class="search-box" v-show="showSearch">
                            <span class="title">找货<i class="iconfont icon-close" @click="showSearch = false"></i></span>
                            <div class="gy-form">
                                <div class="gy-form-group single-row">
                                    <span class="l">品名</span>
                                    <product-search :selected.sync="selectedProduct" :defaultProduct="skuName"></product-search>
                                </div>
                                <div class="gy-form-group single-row">
                                    <span class="l">交割库</span>
                                    <input type="text" v-model="searchData.warehouse">
                                </div>
                                <div class="gy-form-group single-row">
                                    <span class="l">交割期</span>
                                    <div class="trade-date">
                                        <el-date-picker
                                          v-model="daterange"
                                          type="daterange"
                                          range-separator="至"
                                          start-placeholder="开始日期"
                                          end-placeholder="结束日期"></el-date-picker>
                                    </div>
                                </div>
                                <div class="gy-form-group single-row">
                                    <span class="l">交付方式</span>
                                    <div class="payway">
                                        <label><input type="radio" name="payway" v-model="searchData.payWay" value="0">全部支持</label>
                                        <label><input type="radio" name="payway" v-model="searchData.payWay" value="1">买家自提</label>
                                        <label><input type="radio" name="payway" v-model="searchData.payWay" value="2">卖家送货</label>
                                    </div>
                                </div>
                                <div class="buttons">
                                    <a href="javascript:;" class="gy-button-extra" @click="goSearchPage">查询</a>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div class="feature">
                    <div class="item">
                        <div class="img-holder">
                            <div class="bg-img" :style='"background-image: url(" + bgimgHolder.feature1 + ")"'></div>
                            <dl>
                                <dt>为您打造高效便捷的能源化工领域分销服务系统</dt>
                                <dd class="button"><a :href='"mall/#/search"'>马上交易</a></dd>
                            </dl>
                        </div>
                        <strong class="title">交易</strong>
                    </div>
                    <div class="item">
                        <div class="img-holder">
                            <div class="bg-img" :style='"background-image: url(" + bgimgHolder.feature3 + ")"'></div>
                            <dl>
                                <dt>为交易双方实现快速交易、高效撮合提供服务</dt>
                                <dd class="button"><a href="/supply/#/matchUp">马上撮合</a></dd>
                            </dl>
                        </div>
                        <strong class="title">免费撮合</strong>
                    </div>
                    <div class="item">
                        <div class="img-holder">
                            <div class="bg-img" :style='"background-image: url(" + bgimgHolder.feature4 + ")"'></div>
                            <dl>
                                <dt>汇聚行业巨头，国烨名企专区欢迎您的入驻</dt>
                                <dd class="button"><a href="/mall/#/shop/more">立即前往</a></dd>
                            </dl>
                        </div>
                        <strong class="title">名企专区</strong>
                    </div>
                    <div class="item">
                        <div class="img-holder">
                            <div class="bg-img" :style='"background-image: url(" + bgimgHolder.feature2 + ")"'></div>
                            <dl>
                                <dt>为大宗贸易各参与方的各交易环节提供服务的综合解决方案</dt>
                                <dd class="button"><a href="/supply">立即前往</a></dd>
                            </dl>
                        </div>
                        <strong class="title">供应链服务</strong>
                    </div>
                </div>
            </div>
            <!--END Kv-->
            <div class="wrap-body bg-body-img" :style='"background-image: url(" + bgimgHolder.bgBody + ")"'>
                <div class="wrap-main">
                    <!--START 热门推荐-->
                    <h2>热门推荐</h2>
                    <span class="more-link"><a href="/mall/#/hotCommodity">更多 &gt;</a></span>
                    <div class="hot clearfix">
                        <div class="gyhome-box item bg-img" :class="{'second': item.desc === '秒杀'}" v-for="(item, index) in hotProductList" :style='"background-image: url(" + hotProductBg[index] + ")"' :key="index" v-if="index < 5">
                            <a class="default-a" :href='"mall/#/product?resourcesListId=" + item.offerId'>
                                <span class="product-img"><img :src="item.productImg" alt=""></span>
                                <h5>{{item.prodName}}</h5>
                                <span class="price" v-if='item.price !== "0.00"'><strong>￥{{item.price}}</strong>/{{item.priceUnit}} {{item.skuPriceFlag == 1 ? "(可议价)" : ''}}</span>
                                <span class="price" v-else><strong>面议</strong></span>
                            </a>
                            <span class="company">
                                <a :href='"mall/#/shop/index?companyId=" + item.supplierId' class="company-a">
                                    <i class="bg-img" :style='"background-image: url(" + bgimgHolder.vip + ")"'></i>
                                    {{item.supplier}}
                                </a>
                            </span>
                            <span class="tag">{{item.catalogueName}}</span>
                            <img :src="bgimgHolder.second" class="icon-second" alt="">
                        </div>
                    </div>
                    <!--END 热门推荐-->
                    <!--START Advertisement-->
                    <div class="gy-ad" v-if="adList.length > 0">
                        <el-carousel :interval="5000">
                            <el-carousel-item v-for="item in adList" :key="item.id">
                                <a :href='item.linkUrl ? item.linkUrl : "javascript:;"' class="carouselImg">
                                    <div class="item bg-img home-carousel-img" :style='"background-image: url(" + item.imageUrl + ")"'></div>
                                </a>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--END Advertisement-->
                    <!--START 主打产品-->
                    <h2>主打产品</h2>
                    <div class="main-product clearfix">
                        <div class="item" :class="{'row-t': index < 2, 'row-b': index >1}" v-for="(item, index) in mainProductList" :key="index">
                            <a class="default-a" :href='"mall/#/search?productId=" + item.productId'>
                                <dl class="name">
                                    <dt class="hover-a">{{item.productName}}</dt>
                                    <dd class="img"><img :src="item.formulaImg" alt=""></dd>
                                    <dd class="more">{{item.remark}}<a :href='"mall/#/search?productId=" + item.productId'>更多</a></dd>
                                </dl>
                                <div class="intro bg-img is4n-bg" :style='"background-image: url(" + mainImg[index] + ")"'>
                                    <ul>
                                        <li>CAS：{{item.cas}}</li>
                                        <li>分子式：{{item.formula}}</li>
                                        <li>中文别名： {{item.aliasNameCn}}</li>
                                        <li>英文名称：{{item.nameEn}}</li>
                                    </ul>
                                </div>
                            </a>
                        </div>
                    </div>
                    <!--END 主打产品-->
                    <!--START 交易撮合-->
                    <h2>交易</h2>
                    <div class="trade">
                        <div class="trade-header">
                            <ul class="tab">
                                <li :class="{'selected': isSupply}"><a href="javascript:;" @click="dealTabChange(0)">供货</a></li>
                                <li :class="{'selected': !isSupply}"><a href="javascript:;" @click="dealTabChange(1)">求购</a></li>
                            </ul>
                            <div class="search">
                                <i class="iconfont icon-search" @click="getDealList(1, 10)"></i>
                                <input type="text" class="gy-input" v-model="deatlFuzzyQuery" placeholder="请输入品名、厂家" @keyup.13="getDealList(1, 10)">
                            </div>
                            <div class="menu">
                                <button @click="sendOrder" class="gy-button-normal" v-if="companyTypeId !== 2 && companyTypeId !== 3 && isSupply">我有货</button><!--<a href="javascript:;" class="gy-button-normal">我要货</a>-->
                                <button @click="sendDemand" class="gy-button-normal" v-if="companyTypeId !== 2 && companyTypeId !== 3 && !isSupply">我要货</button><!--<a href="javascript:;" class="gy-button-normal">我要货</a>-->
                            </div>
                        </div>
                        <table class="gy-table">
                            <thead>
                            <tr>
                                <td>品名</td>
                                <td v-if="isSupply">供应厂家</td>
                                <td v-else>需求厂家</td>
                                <td v-if="isSupply">供应数量(吨)</td>
                                <td v-else>需求数量(吨)</td>
                                <td>价格(元)</td>
                                <td>交割日期</td>
                                <td>提货地</td>
                                <td>发布时间</td>
                                <td class="option">操作</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in dealInfo.prodList" :key="index">
                                <td class="brand"><span>{{item.prodName}}</span></td>
                                <td class="factory"><span>{{item.supplier}}</span></td>
                                <td class="text-r">{{item.supplies}}</td>
                                <td class="highlight text-r" :class="{'price-down': isSupply && item.comparePriceFlag === -1, 'price-line': isSupply && item.comparePriceFlag === 0}">
                                    <template v-if="item.skuPrice">
                                        {{item.currencyMark}}{{item.skuPriceStr}}{{item.skuPriceFlag == 1 ? "(可议价)" : ''}}<i class="iconfont" :class='{"icon-price-up": item.comparePriceFlag === 1, "icon-price-down": item.comparePriceFlag === -1, "icon-price-line": item.comparePriceFlag === 0}' v-if="isSupply && (item.comparePriceFlag === 1 || item.comparePriceFlag === -1 || item.comparePriceFlag === 0)"></i>
                                    </template>
                                    <template v-else>
                                        面议
                                    </template>
                                </td>
                                <td>
                                    <span v-if="item.deliveryDateFlag ===3">{{item.deliveryDateText}}</span>
                                    <span v-else-if="item.deliveryDateFlag === 2" >{{item.staTradeDate}}以前</span>
                                    <span v-else>{{item.staTradeDate}}/{{item.endTradeDate}}</span>
                                </td>
                                <td>{{item.place}}</td>
                                <td>{{item.refreshDate}}</td>
                                <td class="option" v-if="isSupply"><a :href='"mall/#/product?type=0&resourcesListId=" + item.offerId'>我要交易</a></td>
                                <td class="option" v-else><a :href='"mall/#/product?type=1&resourcesListId=" + item.offerId'>我要交易</a></td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="pagination-box" v-if="dealInfo.prodCount > dealInfo.pageSize">
                            <el-pagination
                              background
                              layout="prev, pager, next"
                              :current-page.sync = "dealInfo.pageNo"
                              :page-size="dealInfo.pageSize"
                              :total="dealInfo.prodCount"
                              @current-change="handleCurrentChange">
                            </el-pagination>
                        </div>
                    </div>
                    <!--END 交易撮合-->
                    <!--START 推荐店铺-->
                    <h2>推荐销售中心</h2>
                    <div class="shop">
                        <span class="more-link"><a href="/mall/#/shop/more">更多 &gt;</a></span>
                        <div class="gy-box bg-img" v-for="(item, index) in shopList" :style='"background-image: url(" + shopBg[index] + ")"' :key="index">
                            <span class="company-logo bg-img" :style='"background-image: url(" + item.companyLogo + ")"'></span>
                            <dl>
                                <dt><a :href='"mall/#/shop/index?companyId=" + item.companyId'>{{item.companyName}}</a></dt>
                                <dd class="products">{{item.profile}}</dd>
                            </dl>
                        </div>
                    </div>
                    <!--END 推荐店铺-->
                    <!--START 特色服务-->
                    <h2>特色服务</h2>
                    <div class="service">
                        <div class="item bg-img" :style='"background-image: url(" + bgimgHolder.featureBtm1 + ")"'>
                            <dl>
                                <dt>物流服务</dt>
                                <dd>为中小企业货物运输提供智能物流服务方案，提供全程 订单执行、结算支付等一系列服务，提高采购效率。</dd>
                            </dl>
                            <a href="/logistics" class="gy-button-normal">立即前往</a>
                        </div>
                        <div class="item bg-img" :style='"background-image: url(" + bgimgHolder.featureBtm2 + ")"'>
                            <dl>
                                <dt>仓储地图</dt>
                                <dd>提供全国各主要石油化工密集区及主要港口城市的多元化仓储服务，满足大宗石油化工企业的货物存储需求。</dd>
                            </dl>
                            <a href="/warehouse" class="gy-button-normal">立即前往</a>
                        </div>
                        <div class="item bg-img" :style='"background-image: url(" + bgimgHolder.featureBtm3 + ")"'>
                            <dl>
                                <dt>资讯服务</dt>
                                <dd>凭借对大宗商品、信息资源、数据分析及仓储物流等全流程的了解，为大宗行业客户提供全面的资讯服务。</dd>
                            </dl>
                            <a href="http://info.chinayie.com" class="gy-button-normal">立即前往</a>
                        </div>
                        <div class="item bg-img" :style='"background-image: url(" + bgimgHolder.featureBtm4 + ")"'>
                            <dl>
                                <dt>供应链服务</dt>
                                <dd>为信誉和资质良好的企业提供代采、赊销、货押等服务，帮助客户扩大销售额赢得更大市场机会。</dd>
                            </dl>
                            <a href="/supply#/" class="gy-button-normal">立即前往</a>
                        </div>
                    </div>
                    <!--END 特色服务-->
                    <!--START 最新资讯-->
                    <h2>最新资讯</h2>
                    <div class="news">
                        <div class="item">
                            <div class="cover bg-img" :style='"background-image: url(" + bgimgHolder.news1 + ")"'></div>
                            <span class="hot-news"><!--<a href="">供应或持续增加-沥青上行动能减弱</a>--></span>
                            <ul>
                                <li v-for="(item, index) in newsList" :key="index" v-if="index < 3"><a :href="item.newsUrl">{{item.newsTitle}}</a>{{item.createdDate | date}}</li>
                            </ul>
                            <a href="http://news.chinayie.com/archives/category/1739" class="more">了解更多 &gt;</a>
                        </div>
                        <div class="item">
                            <div class="cover bg-img" :style='"background-image: url(" + bgimgHolder.news2 + ")"'></div>
                            <span class="hot-news"><!--<a href="">供应或持续增加-沥青上行动能减弱</a>--></span>
                            <ul>
                                <li v-for="(item, index) in newsList" :key="index" v-if="index < 6 && index > 2"><a :href="item.newsUrl">{{item.newsTitle}}</a>{{item.createdDate | date}}</li>
                            </ul>
                            <a href="http://news.chinayie.com/archives/category/541" class="more">了解更多 &gt;</a>
                        </div>
                        <div class="item">
                            <div class="cover bg-img" :style='"background-image: url(" + bgimgHolder.news3 + ")"'></div>
                            <span class="hot-news"><!--<a href="">供应或持续增加-沥青上行动能减弱</a>--></span>
                            <ul>
                                <li v-for="(item, index) in newsList" :key="index" v-if="index > 5"><a :href="item.newsUrl">{{item.newsTitle}}</a>{{item.createdDate | date}}</li>
                            </ul>
                            <a href="http://news.chinayie.com/archives/category/1740" class="more">了解更多 &gt;</a>
                        </div>
                    </div>
                    <!--END 最新资讯-->
                    <!--START 合作伙伴-->
                    <h2>合作伙伴</h2>
                    <div class="partner">
                        <span class="bg-img"><a href="http://www.ccb.com" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd7cb5a3d92.png" alt=""></a></span>
                        <span class="bg-img"><a href="http://www.bankcomm.com" target="_blank"><img src="http://pic.chinayie.com/adv/20160923/adv57e49241575a6.jpg" alt=""></a></span>
                        <span class="bg-img"><a href="http://www.boc.cn" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd7cd3290f8.png" alt=""></a></span>
                        <span class="bg-img"><a href="http://www.cmbchina.com" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd7ce29fbff.png" alt=""></a></span>
                        <span class="bg-img"><a href="http://www.cpic.com.cn" target="_blank"><img src="http://pic.chinayie.com/adv/20160906/adv57cda32c40372.png" alt=""></a></span>
                        <span class="bg-img"><a href="http://www.hhqh.com.cn" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd7d0da64af.png" alt=""></a></span>
                        <span class="bg-img"><a href="http://www.czce.com.cn" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd7d1bee363.png" alt=""></a></span>
                        <span class="bg-img"><a href="https://www.fadada.com" target="_blank"><img src="http://pic.chinayie.com/adv/20160918/adv57ddf302e29dd.jpg" alt=""></a></span>

                        <span class="bg-img"><a href="http://www.cpcia.org.cn" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd8516bc708.png" alt=""></a></span>
                        <span class="bg-img"><a href="http://www.ccema.org.cn" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd8531bbc3f.png" alt=""></a></span>
                        <!--<span class="bg-img"><a href="#" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd8561eb12d.png" alt=""></a></span>-->
                        <!--<span class="bg-img"><a href="#" target="_blank"><img src="http://pic.chinayie.com/adv/20160909/adv57d25bb62407f.jpg" alt=""></a></span>-->
                        <span class="bg-img"><a href="https://psi.ul.com/en/" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd6cd997293.jpg" alt=""></a></span>
                        <span class="bg-img"><a href="http://www.zhonghongpaint.com" target="_blank"><img src="http://pic.chinayie.com/adv/20160912/adv57d61399d0050.jpg" alt=""></a></span>
                        <!--<span class="bg-img"><a href="#" target="_blank"><img src="http://pic.chinayie.com/adv/20160907/adv57cf8f058b69d.png" alt=""></a></span>-->
                        <!--<span class="bg-img"><a href="#" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd7489b7ddf.jpg" alt=""></a></span>-->
                    </div>
                    <!--END 合作伙伴-->
                </div>
            </div>
        </div>
        <gy-footer></gy-footer>
    </div>
</template>

<script>
import socket from '@/config/socket';
import gyHeader from '../../gypublic/src/components/gyheader.vue';
import gyFooter from '../../gypublic/src/components/gyfooter.vue';
import productSearch from '@/components/productSearch';

export default {
    data () {
        return {
            currentPage: '首页',
            showSearch: false,
            kvList: [],
            mainImg: [
                require('./assets/images/main-product.jpg'),
                require('./assets/images/2.jpg'),
                require('./assets/images/3.jpg'),
                require('./assets/images/4.jpg')
            ],
            bgimgHolder: {
                kv: require('./assets/images/kv-1.jpg'),
                bgBody: require('./assets/images/bg-body.jpg'),
                feature1: require('./assets/images/feature-1.jpg'),
                feature2: require('./assets/images/feature-2.jpg'),
                feature3: require('./assets/images/feature-3.jpg'),
                feature4: require('./assets/images/feature-4.jpg'),
                main: require('./assets/images/main-product.jpg'),
                service: require('./assets/images/bg-service.jpg'),
                second: require('./assets/images/second.png'),
                news1: require('./assets/images/news-1.jpg'),
                vip: require('./assets/images/vip.png'),
                news2: require('./assets/images/news-2.jpg'),
                news3: require('./assets/images/news-3.jpg'),
                partner: require('./assets/images/partner.png'),
                newsTitle: require('./assets/images/bg-news-title.png'),
                banner: require('./assets/images/bannername.png'),
                featureBtm1: require('./assets/images/feature-bottom-1.jpg'),
                featureBtm2: require('./assets/images/feature-bottom-2.jpg'),
                featureBtm3: require('./assets/images/feature-bottom-3.jpg'),
                featureBtm4: require('./assets/images/feature-bottom-4.png')
            },
            hotProductBg: [require('./assets/images/recommend-bgcolor-1.jpg'), require('./assets/images/recommend-bgcolor-2.jpg'), require('./assets/images/recommend-bgcolor-3.jpg'), require('./assets/images/recommend-bgcolor-4.jpg'), require('./assets/images/recommend-bgcolor-5.jpg')],
            shopBg: ['', require('./assets/images/shop-bg-1.jpg'), '', require('./assets/images/shop-bg-2.jpg'), ''],
            hotProductList: [],
            mainProductList: [],
            dealInfo: [],
            deatlFuzzyQuery: null,
            shopList: [],
            adLinkUrl: '',
            adImgUrl: null,
            newsList: [],
            skuName: null,
            selectedProduct: {},
            searchData: {
                warehouse: '',
                startDate: '',
                endDate: '',
                goodsName: '',
                payWay: '0'
            },
            daterange: '',
            isSupply: true,
            adList: [],
            companyTypeId: null
        };
    },
    components: {
        gyHeader,
        gyFooter,
        productSearch
    },
    created () {
        if (localStorage.getItem('userInfo')) {
            let user = JSON.parse(localStorage.getItem('userInfo'));
            this.companyTypeId = user.companyTypeId;
            socket.init(user.id, user.companyId);
        }
        this.getKvList();
        this.getHotList();
        this.getMainList();
        this.getDealList(1, 10);
        this.getShopList();
        this.getNewsList();
    },
    mounted () {
        this.setUmeng();
    },
    watch: {
        '$route' () {
            if (window._czc) {
                let location = window.location;
                let contentUrl = location.pathname + location.hash;
                let refererUrl = '/';
                window._czc.push(['_trackPageview', contentUrl, refererUrl]);
            }
        }
    },
    filters: {
        date (time, hour) { // 把时间戳格式:若有参返回年-月-日时:分:秒 若无参返回 年-月-日
            if (!time) {
                return '';
            }
            let y, m, d, date, h, ms, s, data, hours;
            date = new Date(time);
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            h = date.getHours();
            ms = date.getMinutes();
            s = date.getSeconds();
            data = format(m) + '-' + format(d);
            hours = format(h) + ':' + format(ms) + ':' + format(s);
            if (hour) {
                return data + ' ' + hours;
            } else {
                return data;
            }
            function format (num) {
                if (parseInt(num) < 10) {
                    num = '0' + num;
                }
                return num;
            }
        }
    },
    methods: {
        setUmeng () {
            let script = document.createElement('script');
            script.src = 'https://s96.cnzz.com/z_stat.php?id=1276722763&web_id=1276722763';
            script.language = 'JavaScript';
            document.body.appendChild(script);
        },
        // 首页轮播
        getKvList () {
            this.$http.get(this.$api.getKvList)
                .then(res => {
                    if (res.data.code === 0) {
                        this.kvList = res.data.data;
                    }
                });
        },
        // 热门推荐
        getHotList () {
            this.$http.post(this.$api.hotProduct, {
                pageNo: 1,
                pageSize: 5
            })
                .then(res => {
                    if (res.data.code === 0) {
                        this.hotProductList = res.data.data.prodList;
                    }
                });

            this.$http.get(this.$api.adInfo + '?position=1')
                .then(res => {
                    if (res.data.code === 0) {
                        this.adList = res.data.data;
                    }
                });
        },
        // 主打产品
        getMainList () {
            this.$http.post(this.$api.mainProduct, {
                pageNo: 1,
                pageSize: 10
            })
                .then(res => {
                    if (res.data.code === 0) {
                        this.mainProductList = res.data.data.prodList;
                    }
                });
        },
        dealTabChange (t) {
            this.isSupply = t === 0;
            this.getDealList(1, 10);
        },
        // 供求信息
        getDealList (num, size) {
            this.$http.post(this.$api.deal, {
                pageNo: num,
                pageSize: size,
                fuzzyQuery: this.deatlFuzzyQuery,
                offerType: this.isSupply ? 1 : 2
            })
                .then(res => {
                    if (res.data.code === 0) {
                        this.dealInfo = res.data.data;
                    }
                });
        },
        // 推荐店铺
        getShopList () {
            this.$http.post(this.$api.shopRecommend, {
                pageNo: 1,
                pageSize: 5
            })
                .then(res => {
                    if (res.data.code === 0) {
                        this.shopList = res.data.data.shopList;
                    }
                });
        },
        // 推荐资讯
        getNewsList () {
            this.$http.get(this.$api.news)
                .then(res => {
                    if (res.data.code === 0) {
                        this.newsList = res.data.data.list;
                    }
                });
        },
        handleCurrentChange (r) {
            this.getDealList(r, 10);
        },
        sendOrder () {
            location.href = !localStorage.getItem('userInfo') ? '/my/#/login' : '/my/#/resources/add';
        },
        sendDemand () {
            location.href = !localStorage.getItem('userInfo') ? '/my/#/login' : '/my/#/order/addResource';
        },
        goSearchPage () {
            this.searchData.goodsName = this.selectedProduct.goodsName || '';
            if (this.daterange) {
                this.searchData.startDate = this.daterange[0].getTime();
                this.searchData.endDate = this.daterange[1].getTime();
            }
            let p;
            let arr = ['fromkv=true'];
            Object.keys(this.searchData).map(item => {
                this.searchData[item] && (arr.push(item + '=' + this.searchData[item]));
            });
            p = arr.join('&');
            location.href = `/mall/#/search?${p}`;
        },
        goIm () {
            if (localStorage.getItem('userInfo')) {
                let currentPhone = JSON.parse(localStorage.getItem('userInfo')).phone;
                window.open('/im/#type=3&username=' + window.btoa(currentPhone) + '&touser=' + window.btoa(1), '_blank');
            } else {
                location.href = '/my/#/login';
            }
        }
    }
};
</script>

<style lang="scss">
    @import './styles/app';
    .clamp2 {
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
    .my-mall-home {
         .el-date-editor.el-input__inner, .el-range-separator, .el-input__icon {
            height: 30px;
            line-height: 30px;
         }
     }
</style>
