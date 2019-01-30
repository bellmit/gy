<template>
    <div class="shop-more">
        <div class="banner">
            <img src="../../assets/images/shop-more.jpg" alt="">
        </div>
        <div class="main">
            <h3>推荐店铺</h3>
            <div class="search">
                <input @keyup.enter="handleSearch" v-model="keyword" type="text" class="gy-input" placeholder="请输入店铺名、品名">
                <i class="iconfont icon-search" @click="handleSearch"></i>
            </div>
            <div class="list" v-if="shopList.length > 0">
                <div class="item" v-for="(item, index) in shopList" :key="index">
                    <div class="cover">
                        <router-link :to="{ name: 'shopHome', query: {companyId: item.companyId} }">
                            <img :src="item.homeFirstPicture" alt="">
                        </router-link>
                    </div>
                    <dl>
                        <dt><router-link :to="{ name: 'shopHome', query: {companyId: item.companyId} }">{{item.companyName}}</router-link></dt>
                        <dd>{{item.profile}}</dd>
                    </dl>
                </div>
            </div>
            <div class="list-nodata" v-else>
                <img src="../../assets/images/nodata.png" alt="">
                <span>很抱歉，没有找到您要的信息</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'shop-more',
    data () {
        return {
            shopList: [],
            keyword: ''
        };
    },
    created () {
        this.getShopList();
    },
    methods: {
        getShopList () {
            this.$http.post(this.$api.shop.search, {
                pageNo: 1,
                pageSize: 10000,
                keyword: this.keyword
            })
                .then(res => {
                    if (res.data.code === 0) {
                        this.shopList = res.data.data.shopList;
                    }
                });
        },
        handleSearch () {
            this.getShopList();
        }
    }
};
</script>
<style lang="scss" scoped>
    .shop-more{
        .banner{
            img{
                width: 100%;
                height: auto;
            }
        }
        .search{
            text-align: right;
            padding-bottom: 10px;
            input{
                width: 300px;
                background-color: transparent;
            }
        }
        .main{
            margin: 0 auto;
            width: 1200px;
            overflow: hidden;
            padding-bottom: 35px;
            h3{
                font-weight: normal;
                color: $color-title;
                margin: 35px 0 20px;
                font-size: 18px;
                line-height: 1;
            }
            .list{
                width: 1210px;
                overflow: hidden;
                .item{
                    float: left;
                    width: 393.333333333px;
                    border-radius: $border-radius-base;
                    background-color: #fff;
                    overflow: hidden;
                    margin: 0 10px 10px 0;
                    .cover{
                        position: relative;
                        height: 110px;
                        img{
                            height: 100%;
                            width: auto;
                            position: absolute;
                            top: 0;
                            left: 50%;
                            transform: translateX(-50%);
                        }
                    }
                    dl{
                        padding: 20px;
                        line-height: 1;
                    }
                    dt{
                        color: $color-title;
                        font-size: 16px;
                    }
                    dd{
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin-top: 15px;
                        color: $color-minor;
                    }
                }
            }
            .list-nodata{
                text-align: center;
                img{
                    width: 150px;
                    margin-bottom: 10px;
                }
                span{
                    display: block;
                }
            }
        }
    }
</style>
