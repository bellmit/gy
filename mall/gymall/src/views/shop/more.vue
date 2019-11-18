<template>
    <div class="shop-more">
        <div class="banner" :style='"background-image: url(" + imageUrl + ")"'>
            <!--<img src="../../assets/images/shop-more.jpg" alt="">-->
        </div>
        <div class="main">
            <div class="main-tj">
                <h3>推荐销售中心</h3>
                <div class="search">
                    <input @keyup.enter="handleSearch" v-model="keyword" type="text" class="gy-input" placeholder="请输入销售中心名、品名">
                    <i class="iconfont icon-search" @click="handleSearch"></i>
                </div>
            </div>
            <div class="list" v-if="shopList.length > 0">
                <div class="item" v-for="(item, index) in shopList" :key="index">
                    <div class="cover">
                        <router-link :to="{ name: 'shopHome', query: {companyId: item.companyId} }" target="_blank">
                            <img :src="item.homeFirstPicture" alt="">
                        </router-link>
                    </div>
                    <dl>
                        <dt class="remove-a">
                            <router-link class="clearfix" :to="{ name: 'shopHome', query: {companyId: item.companyId} }" target="_blank">
                                <span class="l">{{item.companyName}}</span>
                                <span class="r">
                                    <i class="iconfont icon-shop-company"></i> {{item.companyTypeName}}
                                </span>
                            </router-link>
                        </dt>
                        <dd :title="item.profile">
                            {{item.profile}}
                        </dd>
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
            keyword: '',
            imageUrl: require('../../assets/images/shop-more.jpg')
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
        .remove-a :hover{
            color: #666!important;
        }
        .banner{
            height:348px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 50%;
        }
        .main{
            margin: 0 auto;
            width: 1200px;
            overflow: hidden;
            padding-bottom: 35px;
            .main-tj{
                overflow: hidden;
                margin: 20px auto;
                h3{
                    margin:0;
                    color: $color-title;
                    font-size: 16px;
                    line-height: 1.8;
                    letter-spacing: 1px;
                    float: left;
                }
                .search{
                   float: right;
                    input{
                        width: 300px;
                        background-color: transparent;
                    }
                }
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
                        a {
                            display: block;
                        }
                        .l {
                            float: left;
                        }
                        .r {
                            float: right;
                            font-size: 14px;
                            color: #666666;
                            .iconfont {
                                color: #D2D2D2;
                                font-size: 14px;
                            }
                        }
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
