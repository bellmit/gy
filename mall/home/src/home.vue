<template>
    <div class="container-fluid">
        <gy-header :page="currentPage"></gy-header>
        <div class="home">
            <!--START Kv-->
            <div class="kv">
                <el-carousel :interval="5000">
                    <el-carousel-item v-for="item in kvList" :key="item.id">
                        <div class="item bg-img home-carousel-img" :style='"background-image: url(" + item.src + ")"'>
                            <!--<span :style='"background-image: url(" + bgimgHolder.banner + ")"'></span>-->
                            <!--<span v-if="item.id === 0">-->
                                <!--<img :src = "bgimgHolder.banner">-->
                            <!--</span>-->
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!--END Kv-->
            <div class="wrap-main">
                <!--START 特色模式-->
                <div class="main-title">
                    <h2>特色模式</h2>
                </div>
                <div class="feature clearfix">
                    <div class="gyhome-box item bg-img" :style='"background-image: url(" + bgimgHolder.feature1 + ")"'>
                        <strong class="title">集采分销</strong>
                        <dl>
                            <dt>集采分销</dt>
                            <dd>为厂家及大宗贸易商致力打造的高效便捷的能源化工领域分销服务系统</dd>
                            <dd class="button"><a :href='"mall/#/search"'>马上交易</a></dd>
                        </dl>
                    </div>
                    <div class="gyhome-box item bg-img" :style='"background-image: url(" + bgimgHolder.feature4 + ")"'>
                        <strong class="title">名企专区</strong>
                        <dl>
                            <dt>名企专区</dt>
                            <dd>汇聚行业巨头，提供优质品牌货源，国烨名企专区欢迎您的入驻</dd>
                            <dd class="button"><a href="/mall/#/shop/more">立即前往</a></dd>
                        </dl>
                    </div>
                    <div class="gyhome-box item bg-img" :style='"background-image: url(" + bgimgHolder.feature2 + ")"'>
                        <strong class="title">供应链服务</strong>
                        <dl>
                            <dt>供应链服务</dt>
                            <dd>基于货权管理的，为大宗贸易各参与方的各交易环节提供服务的综合解决方案</dd>
                            <dd class="button"><a href="/supply">立即前往</a></dd>
                        </dl>
                    </div>
                    <!--<div class="gyhome-box item bg-img" :style='"background-image: url(" + bgimgHolder.feature3 + ")"'>-->
                        <!--<strong class="title">高效撮合</strong>-->
                        <!--<dl>-->
                            <!--<dt>高效撮合</dt>-->
                            <!--<dd>利用平台的数据优势和资源优势，为交易双方实现快速交易、高效撮合提供服务</dd>-->
                            <!--&lt;!&ndash;<dd class="button"><a href="">马上交易</a></dd>&ndash;&gt;-->
                        <!--</dl>-->
                    <!--</div>-->
                </div>
                <!--END 特色模式-->
                <!--START 热门推荐-->
                <div class="main-title">
                    <h2>热门推荐</h2>
                </div>
                <div class="hot clearfix">
                    <div class="gyhome-box item" v-for="(item, index) in hotProductList" :key="index" v-if="index < 5">
                        <h5><a :href='"mall/#/product?resourcesListId=" + item.offerId'>{{item.prodName}}</a></h5>
                        <span class="place">产地: {{item.origin}}</span>
                        <span>可供量 | {{item.supplies}}</span>
                        <span>提货地 |  {{item.place}}</span>
                        <span>交割日期 | {{item.tradeDate}}</span>
                        <span class="price"><strong>￥{{item.price}}</strong>/{{item.priceUnit}}</span>
                        <span class="company"><i class="bg-img" :style='"background-image: url(" + bgimgHolder.vip + ")"'></i><em>{{item.supplier}}</em></span>
                        <span class="tag">{{item.catalogueName}}</span>
                    </div>
                </div>
                <!--END 热门推荐-->
                <!--START Advertisement-->
                <div class="gy-ad" v-if="adImgUrl!=null">
                    <a :href="adLinkUrl" target="_blank" v-if="adLinkUrl!=null"><img :src="adImgUrl" alt=""></a>
                    <img :src="adImgUrl" alt="" v-if="adLinkUrl==null">
                </div>
                <!--END Advertisement-->
                <!--START 主打产品-->
                <div class="main-title">
                    <h2>主打产品</h2>
                </div>
                <div class="main-product clearfix">
                    <div class="item" :class="{'row-t': index < 2, 'row-b': index >1}" v-for="(item, index) in mainProductList" :key="index">
                        <dl class="name">
                            <dt><a :href='"mall/#/search?productId=" + item.productId'>{{item.productName}}</a></dt>
                            <dd class="img"><img :src="item.formulaImg" alt=""></dd>
                            <dd class="more">{{item.remark}}<a :href='"mall/#/search?productId=" + item.productId'>更多</a></dd>
                        </dl>
                        <div class="intro bg-img" :style='"background-image: url(" + mainImg[index] + ")"'>
                            <ul>
                                <li>CAS：{{item.cas}}</li>
                                <li>分子式：{{item.formula}}</li>
                                <li>中文别名： {{item.aliasNameCn}}</li>
                                <li>英文名称：{{item.nameEn}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--END 主打产品-->
                <!--START 交易撮合-->
                <div class="main-title">
                    <h2>交易撮合</h2>
                </div>
                <div class="trade">
                    <div class="trade-header">
                        <ul class="tab">
                            <li class="selected"><a href="javascript:;">供货</a></li>
                            <!--<li><a href="javascript:;">求购</a></li>-->
                        </ul>
                        <div class="search">
                            <i class="iconfont icon-search" @click="getDealList(1, 10)"></i>
                            <input type="text" class="gy-input" v-model="deatlFuzzyQuery" placeholder="请输入品名、厂家" @keyup.13="getDealList(1, 10)">
                        </div>
                        <div class="menu">
                            <button @click="sendOrder" class="gy-button-extra">我有货</button><!--<a href="javascript:;" class="gy-button-normal">我要货</a>-->
                        </div>
                    </div>
                    <table class="gy-table">
                        <thead>
                        <tr>
                            <td>品名</td>
                            <td>厂家</td>
                            <td>数量</td>
                            <td>价格</td>
                            <td>交割日期</td>
                            <td>提货地</td>
                            <td>发布日期</td>
                            <td class="option">操作</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in dealInfo.prodList" :key="index">
                            <td class="brand"><span>{{item.prodName}}</span></td>
                            <td class="factory"><span>{{item.supplier}}</span></td>
                            <td>{{item.supplies}}</td>
                            <td class="highlight">
                                <template v-if="item.price">
                                    {{item.currencyMark}}{{item.price}}元
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
                            <td class="option"><a :href='"mall/#/product?resourcesListId=" + item.offerId'>我要交易</a></td>
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
                <div class="main-title">
                    <h2>推荐店铺</h2>
                </div>
                <div class="shop">
                    <span class="more-link"><a href="/mall/#/shop/more">更多 &gt;</a></span>
                    <div class="gy-box" v-for="(item, index) in shopList" :key="index">
                        <span class="tag">主营业务</span>
                        <dl>
                            <dt><a :href='"mall/#/shop/index?companyId=" + item.companyId' style="margin-left: 6px;">{{item.companyName}}</a></dt>
                            <dd class="products clamp2" style="margin-left: 6px;">{{item.profile}}</dd>
                            <dd class="avatar bg-img"><img :src="item.companyLogo" style="height:30px;width:30px" alt=""/></dd>
                        </dl>
                    </div>
                </div>
                <!--END 推荐店铺-->
                <!--START 特色服务-->
                <div class="main-title">
                    <h2>特色服务</h2>
                </div>
                <div class="service" :style='"background-image: url(" + bgimgHolder.service + ")"'>
                    <div class="item">
                        <span class="icon-box"><i class="icon icon-logistic"></i></span>
                        <dl>
                            <dt>物流服务</dt>
                            <dd>为中小企业货物运输提供智能物流服务方案，提供全程 订单执行、结算支付等一系列服务，提高采购效率。</dd>
                        </dl>
                        <a href="/logistics" class="gy-button-normal">立即申请</a>
                    </div>
                    <div class="item">
                        <span class="icon-box"><i class="icon icon-map"></i></span>
                        <dl>
                            <dt>仓储地图</dt>
                            <dd>提供全国各主要石油化工密集区及主要港口城市的保税储罐仓、固体仓等多元化仓储服务：包括码头接卸、保税仓储和分拨转运服务等。满足大宗石油化工企业的货物存储需求。</dd>
                        </dl>
                        <a href="/warehouse" class="gy-button-normal">立即申请</a>
                    </div>
                    <div class="item">
                        <span class="icon-box"><i class="icon icon-consult"></i></span>
                        <dl>
                            <dt>资讯服务</dt>
                            <dd>国烨网凭借对大宗商品、信息资源、数据分析及仓储物流等全流程的了解，在确保风险可控的前提下，为大宗行业生产厂商、加工商、贸易商提供全面的资讯服务。</dd>
                        </dl>
                        <a href="http://info.chinayie.com" class="gy-button-normal">立即申请</a>
                    </div>
                    <div class="item">
                        <span class="icon-box"><i class="icon icon-data"></i></span>
                        <dl>
                            <dt>数据服务</dt>
                            <dd>数据服务是指用适当的统计分析方法对收集来的大量数据进行分析，提取有用信息和形成结论而对数据加以详细研究和概括总结的过程。</dd>
                        </dl>
                        <a href="/my#/building" class="gy-button-normal">立即申请</a>
                    </div>
                </div>
                <!--END 特色服务-->
                <!--START 最新资讯-->
                <div class="main-title">
                    <h2>最新资讯</h2>
                </div>
                <div class="news">
                    <div class="item">
                        <strong class="title" :style='"background-image: url(" + bgimgHolder.newsTitle + ")"'><span>行情速递</span></strong>
                        <div class="cover bg-img" :style='"background-image: url(" + bgimgHolder.news1 + ")"'></div>
                        <span class="hot-news"><!--<a href="">供应或持续增加-沥青上行动能减弱</a>--></span>
                        <ul>
                            <li v-for="(item, index) in newsList" :key="index" v-if="index < 3"><a :href="item.newsUrl">{{item.newsTitle}}</a>[{{item.createdDate | date}}]</li>
                        </ul>
                        <a href="http://news.chinayie.com/archives/category/1739" class="more">了解更多 &gt;</a>
                    </div>
                    <div class="item">
                        <strong class="title" :style='"background-image: url(" + bgimgHolder.newsTitle + ")"'><span>行业动态</span></strong>
                        <div class="cover bg-img" :style='"background-image: url(" + bgimgHolder.news2 + ")"'></div>
                        <span class="hot-news"><!--<a href="">供应或持续增加-沥青上行动能减弱</a>--></span>
                        <ul>
                            <li v-for="(item, index) in newsList" :key="index" v-if="index < 6 && index > 2"><a :href="item.newsUrl">{{item.newsTitle}}</a>[{{item.createdDate | date}}]</li>
                        </ul>
                        <a href="http://news.chinayie.com/archives/category/541" class="more">了解更多 &gt;</a>
                    </div>
                    <div class="item">
                        <strong class="title" :style='"background-image: url(" + bgimgHolder.newsTitle + ")"'><span>专题分析</span></strong>
                        <div class="cover bg-img" :style='"background-image: url(" + bgimgHolder.news3 + ")"'></div>
                        <span class="hot-news"><!--<a href="">供应或持续增加-沥青上行动能减弱</a>--></span>
                        <ul>
                            <li v-for="(item, index) in newsList" :key="index" v-if="index > 5"><a :href="item.newsUrl">{{item.newsTitle}}</a>[{{item.createdDate | date}}]</li>
                        </ul>
                        <a href="http://news.chinayie.com/archives/category/1740" class="more">了解更多 &gt;</a>
                    </div>
                </div>
                <!--END 最新资讯-->
                <!--START 合作伙伴-->
                <div class="main-title">
                    <h2>合作伙伴</h2>
                </div>
                <div class="partner">
                    <span class="bg-img"><a href="http://www.ccb.com" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd7cb5a3d92.png" alt=""></a></span>
                    <span class="bg-img"><a href="http://www.bankcomm.com" target="_blank"><img src="http://pic.chinayie.com/adv/20160923/adv57e49241575a6.jpg" alt=""></a></span>
                    <span class="bg-img"><a href="http://www.boc.cn" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd7cd3290f8.png" alt=""></a></span>
                    <span class="bg-img"><a href="http://www.cmbchina.com" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd7ce29fbff.png" alt=""></a></span>
                    <span class="bg-img"><a href="http://www.cpic.com.cn" target="_blank"><img src="http://pic.chinayie.com/adv/20160906/adv57cda32c40372.png" alt=""></a></span>
                    <span class="bg-img"><a href="http://www.hhqh.com.cn" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd7d0da64af.png" alt=""></a></span>
                    <span class="bg-img"><a href="http://www.czce.com.cn" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd7d1bee363.png" alt=""></a></span>
                    <span class="bg-img"><a href="https://www.fadada.com" target="_blank"><img src="http://pic.chinayie.com/adv/20160918/adv57ddf302e29dd.jpg" alt=""></a></span>

                    <span class="bg-img"><a href="http://www.cpcia.org.cn/department/gyxh/" target="_blank"><img src="http://pic.chinayie.com/adv/20160905/adv57cd8516bc708.png" alt=""></a></span>
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
        <gy-footer></gy-footer>
    </div>
</template>

<script>
import socket from '@/config/socket';
import gyHeader from '../../gypublic/src/components/gyheader.vue';
import gyFooter from '../../gypublic/src/components/gyfooter.vue';

export default {
    data () {
        return {
            currentPage: '首页',
            kvList: [
                {
                    id: 0,
                    src: require('./assets/images/banner-home.jpg')
                },
                {
                    id: 1,
                    src: require('./assets/images/kv-2.jpg')
                },
                {
                    id: 2,
                    src: require('./assets/images/kv-3.jpg')
                }
            ],
            mainImg: [
                require('./assets/images/main-product.jpg'),
                require('./assets/images/2.jpg'),
                require('./assets/images/3.jpg'),
                require('./assets/images/4.jpg')
            ],
            bgimgHolder: {
                kv: require('./assets/images/banner-home.jpg'),
                feature1: require('./assets/images/feature-1.jpg'),
                feature2: require('./assets/images/feature-2.jpg'),
                feature3: require('./assets/images/feature-3.jpg'),
                feature4: require('./assets/images/feature-4.jpg'),
                main: require('./assets/images/main-product.jpg'),
                service: require('./assets/images/bg-service.jpg'),
                news1: require('./assets/images/news-1.jpg'),
                vip: require('./assets/images/vip.png'),
                news2: require('./assets/images/news-2.jpg'),
                news3: require('./assets/images/news-3.jpg'),
                partner: require('./assets/images/partner.png'),
                newsTitle: require('./assets/images/bg-news-title.png'),
                banner: require('./assets/images/bannername.png')
            },
            hotProductList: [],
            mainProductList: [],
            dealInfo: [],
            deatlFuzzyQuery: null,
            shopList: [],
            adLinkUrl: '',
            adImgUrl: null,
            newsList: []
        };
    },
    components: {
        gyHeader,
        gyFooter
    },
    created () {
        if (localStorage.getItem('userInfo')) {
            let user = JSON.parse(localStorage.getItem('userInfo'));
            socket.init(user.id, user.companyId);
        }
        this.getHotList();
        this.getMainList();
        this.getDealList(1, 10);
        this.getShopList();
        this.getNewsList();
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
        // 热门推荐
        getHotList () {
            const me = this;
            this.$http.post(this.$api.hotProduct, {
                pageNo: 1,
                pageSize: 5
            })
                .then(res => {
                    if (res.data.code === 0) {
                        this.hotProductList = res.data.data.prodList;
                    }
                });

            me.$http.get(me.$api.adInfo + '?position=1')
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
        // 供求信息
        getDealList (num, size) {
            this.$http.post(this.$api.deal, {
                pageNo: num,
                pageSize: size,
                fuzzyQuery: this.deatlFuzzyQuery
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
            if (!localStorage.getItem('userInfo')) {
                this.$alert('请先登录后再继续', '提示');
                return;
            }
            location.href = '/my/#/resources/add';
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
</style>
