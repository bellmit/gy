<template>
    <div class="point-home">
        <!-- header -->
        <a class="kv" :href="obj.linkUrl" :style="'background-image: url(' + obj.imageUrl + ')'"></a>
        <!-- 选项卡 -->
        <div class="tabs">
            <ul>
                <li>
                    <router-link :to="{name: 'more', query: {'prdCategoryId': ids[0]}}">
                      <div class="item">
                          <i class="iconfont icon-phone"></i>
                          <div>手机及配件</div>
                      </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'more', query: {'prdCategoryId': ids[1]}}">
                      <div class="item">
                          <i class="iconfont icon-travel"></i>
                          <div>旅行服务</div>
                      </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'more', query: {'prdCategoryId': ids[2]}}">
                      <div class="item">
                          <i class="iconfont icon-gift"></i>
                          <div>礼品卡券</div>
                      </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 商品区域 -->
        <div class="goods">
            <!-- 手机及配件 -->
            <div class="goods-item" v-for="(item, index) in productsList" :key="index">
                <div class="t">
                    <div class="line"></div>
                    <div class="title">{{categoriesValue[index]}}</div>
                </div>
                <div class="c">
                    <span v-show="item.total > 10">
                      <router-link :to="{name: 'more', query: {'prdCategoryId': ids[index]}}">更多></router-link>
                    </span>
                </div>
                <div class="b">
                    <ul>
                        <li v-for="(pro, idx) in item.list" :key="idx" v-show="idx < 10">
                            <router-link :to="{name: 'detail', query: {id: pro.id}}">
                                <div class="img">
                                    <img class="goods-img" :src="pro.filePath" alt="">
                                    <img v-if="pro.inventory === 0" class="sell-out" src="../assets/images/sell-out-box.png" alt="">
                                </div>
                                <div class="name">{{pro.redemptionName}}</div>
                                <div class="integral"><em>{{pro.redemptionPrice}} </em> 积分</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            productsList: [],
            ids: [1, 2, 3],
            categoriesValue: ['手机及配件', '旅行服务', '礼品卡券'],
            obj: {
                imageUrl: null,
                linkUrl: null
            },
            adver: []
        };
    },
    created () {
        this.init();
    },
    mounted () {
    },
    methods: {
        init () {
            this.getProducts();
            this.advertisings();
        },
        getProducts () {
            this.$http.get(this.$api.category.categories)
                .then(res => {
                    if (res.data.code === 0) {
                        this.productsList = res.data.data;
                    } else {
                        this.$alert(res.data.message);
                    }
                });
        },
        // 广告位
        advertisings () {
            this.$http.post(this.$api.category.advertisings, {})
                .then(res => {
                    if (res.data.code === 0) {
                        this.obj = res.data.data[0];
                    } else {
                        this.$alert(res.data.message);
                    }
                });
        }
    }
};
</script>
