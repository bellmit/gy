<template>
    <div class="product-detail-box">
        <div class="product-general commom-part">
            <div class="clearfix product-general-name-box">
                <span class="product-general-img">
                    <img :src="productInfo.skuPictureUrl" style="width: 60px;height: 60px;margin-top: -25px;">
                </span>
                <span class="product-general-name">{{productInfo.skuName}}</span>
            </div>
            <div class="product-general-price-time product-general-item-box clearfix" style="margin-top: 20px;">
                <div class="fl product-general-item">
                    <span class="product-detail-body-tit">单价</span>
                    <span
                      class="product-detail-body-content">
                        <template v-if="productInfo.skuPrice">
                              {{productInfo.intCurrencyMark}}{{productInfo.skuPrice}}
                            </template>
                            <template v-else>
                                面议
                            </template>
                       </span>
                </div>
                <div class="fl product-general-item">
                    <span class="product-detail-body-tit">交割库</span>
                    <span class="product-detail-body-content">{{productInfo.deliveryWarehouseName}}</span>
                </div>
            </div>
            <div class="product-general-price-time product-general-item-box clearfix">
                <div class="fl product-general-item">
                    <span class="product-detail-body-tit">可供量({{productInfo.infUnitOfMeasureDisplayName}})</span>
                    <span class="product-detail-body-content">{{productInfo.skuQuantity}}</span>
                </div>
                <div class="fl product-general-item">
                    <span class="product-detail-body-tit">交割时间</span>
                    <span class="product-detail-body-content" v-if="productInfo.deliveryDateFlag ===3">{{productInfo.deliveryDateText}}</span>
                    <span class="product-detail-body-content" v-else-if="productInfo.deliveryDateFlag === 2" >{{productInfo.deliveryBeginDate|date}}以前</span>
                    <span class="product-detail-body-content" v-else>{{productInfo.deliveryBeginDate|date}}到{{productInfo.deliveryEndDate|date}}</span>
                    <!--<span class="product-detail-body-content">{{productInfo.deliveryBeginDate | date}}至{{productInfo.deliveryEndDate | date}}</span>-->
                </div>
                <div class="fl product-general-item">
                    <span class="product-detail-body-tit">起订量({{productInfo.infUnitOfMeasureDisplayName}})</span>
                    <div class="product-detail-body-content">
                       <span>
                           <template v-if="productInfo.skuMinQuantity">
                             {{productInfo.skuMinQuantity |numToCash(3)}}
                            </template>
                            <template v-else>
                                -
                            </template>
                       </span>
                        <!--<span class="product-general-item-content-contact-us">我要询价<i-->
                          <!--class="iconfont icon-msg"></i></span>-->
                    </div>
                </div>
                <div class="product-general-right button-box">
                    <!--<a class="gy-button-normal gy-button-normal-inquiry" :href='"/im/index.html#username=" + userphone + "&touser=" + adminphone + "&offers=" + resourcesListId'>我要询价 <span class="icon-login"><i class="iconfont icon-login-im"></i></span></a>-->
                    <button class="gy-button-extra" @click="goNext(0)">我要询价<i class="iconfont icon-im"></i></button><button class="gy-button-normal" @click="goNext(1, productInfo.skuCode, productInfo.skuName)" v-if="companyTypeId !== 2">找物流</button>
                </div>
            </div>
            <!--<div class="product-general-price-time product-general-item-box clearfix" style="margin-top: 20px;">-->
                <!--<div class="fl product-general-item">-->
                    <!--<span class="product-detail-body-tit">单价</span>-->
                    <!--<span-->
                      <!--class="product-detail-body-content">{{productInfo.intCurrencyMark}}{{productInfo.skuPrice}}</span>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <div class="product-detail commom-part">
            <div class="product-detail-tit clearfix">
                <div class="product-detail-tit-left fl">
                    <i class="el-icon-tickets"></i>
                    <span class="createPayment-seller-tit">详细信息</span>
                </div>
                <!--<div class="product-detail-tit-right fr">-->
                    <!--<span>资源编号:</span>-->
                    <!--<span>{{productInfo.odrOfferSn}}</span>-->
                <!--</div>-->

            </div>
            <div class="product-detail-body-box">
                <div class="product-detail-body clearfix">
                    <div class="fl product-detail-body-item">
                        <span class="product-detail-body-tit">资源编号</span>
                        <span class="product-detail-body-content">{{productInfo.skuCode}}</span>
                    </div>
                    <div class="fl product-detail-body-item">
                        <span class="product-detail-body-tit">交割库地址</span>
                        <span class="product-detail-body-content">{{productInfo.deliveryDetailedAddress}}</span>
                    </div>
                </div>
                <div class="product-detail-body clearfix">
                    <div class="fl product-detail-body-item">
                        <span class="product-detail-body-tit">资源</span>
                        <span class="product-detail-body-content">{{productInfo.skuOrigin}}</span>
                    </div>
                    <div class="fl product-detail-body-item">
                        <span class="product-detail-body-tit">保证金</span>
                        <span class="product-detail-body-content">{{productInfo.depositRatio}}%</span>
                    </div>
                </div>
                <div class="product-detail-body clearfix">
                    <div class="fl product-detail-body-item">
                        <span class="product-detail-body-tit">交付方式</span>
                        <span class="product-detail-body-content">{{productInfo.deliveryType|deliveryType}}</span>
                    </div>
                    <div class="fl product-detail-body-item">
                        <span class="product-detail-body-tit">发票</span>
                        <span class="product-detail-body-content" v-if="productInfo.provideInvoiceType !== null">{{productInfo.provideInvoiceType?'交割次月发票':'交割当月发票'}}</span>
                        <span class="product-detail-body-content" v-if="productInfo.provideInvoiceType === null">{{productInfo.provideInvoiceText}}</span>
                    </div>
                </div>
                <div class="product-detail-body clearfix">
                    <div class="fl product-detail-body-item">
                        <span class="product-detail-body-tit">付款方式</span>
                        <span class="product-detail-body-content">{{productInfo.paymentType | payMentsType}}</span>
                    </div>
                </div>
            </div>
            <div class="product-detail-compony clearfix">
                <div class="product-detail-compony-img fl">
                    <img :src="companyModels.logoImage" v-if="companyModels.logoImage!=null">
                    <img src="../assets/images/kaiyue.png" v-if="companyModels.logoImage==null">
                </div>
                <div class="product-detail-compony-right fl">
                    <h5 class="product-detail-compony-right-name">
                        <router-link :to="{name: 'shop-home',query:{id:userModels.id}}">{{companyModels.name}}<span class="is-shop" v-if="prodectShop.shopsetup"><i class="iconfont icon-confirm"></i>已开通店铺</span></router-link>
                    </h5>
                    <div class="product-detail-body product-detail-compony-right-item clearfix">
                        <div class="fl product-detail-body-item">
                            <span class="product-detail-body-tits">联系人</span>
                            <span class="product-detail-body-content">{{userModels.username}}</span>
                        </div>
                        <div class="fl product-detail-body-item">
                            <span class="product-detail-body-tits">联系电话</span>
                            <span class="product-detail-body-content">{{userModels.phone}}</span>
                        </div>
                    </div>
                    <div class="product-detail-body clearfix product-detail-compony-right-item">
                        <div class="fl product-detail-body-item">
                            <span class="product-detail-body-tits">已有交易</span>
                            <span class="product-detail-body-content">{{prodectShop.tradeCount}}</span>
                        </div>
                        <div class="fl product-detail-body-item">
                            <span class="product-detail-body-tits">发布数量</span>
                            <span class="product-detail-body-content">{{prodectShop.publishCount}}</span>
                        </div>
                    </div>
                </div>
                <dl class="shop-note">
                    <dt><i class="iconfont icon-note">温馨提示：</i></dt>
                    <dd>只有与已开通店铺的卖家交易才能获得国烨平台积分</dd>
                </dl>
            </div>
            <div class="main-title-shop">
                <h2>本店其他商品</h2>
            </div>
            <div class="product-shop">
                <div class="item" v-for="(item, index) in offerModelLists" :key="index">
                    <div class="name">
                        <!--<span class="product-skuName">{{item.skuName}}</span>-->
                        <router-link class="product-skuName" :to="{name : 'product-detail',query:{resourcesListId: item.id}}">{{item.skuName}}</router-link>
                        <span>产地&nbsp;&nbsp;{{item.skuOrigin}}</span>
                    </div>
                    <dl>
                        <span>可供量</span>
                        <span>{{item.skuQuantity}}{{item.infUnitOfMeasureDisplayName}}</span>
                    </dl>
                    <dl>
                        <span>提货地</span>
                        <span>{{item.deliveryDetailedAddress}}</span>
                    </dl>
                    <dl>
                        <span>交割日</span>
                        <span v-if="item.deliveryDateFlag ===3">{{item.deliveryDateText}}</span>
                        <span v-else-if="item.deliveryDateFlag === 2" >{{item.deliveryBeginDate|date}}以前</span>
                        <span v-else>{{item.deliveryBeginDate|date}}到{{item.deliveryEndDate|date}}</span>
                    </dl>
                    <dl class="product-price">
                        <span v-if="item.skuPrice === 0">面议</span>
                        <span v-if="item.skuPrice !== 0">{{item.intCurrencyMark}}{{item.skuPrice}}</span>
                    </dl>
                    <dl>
                        <img class="productD product-general-img fl" :src = 'item.skuPictureUrl'>
                        <!--<span class="productD product-general-img fl"></span>-->
                    </dl>
                </div>
            </div>
        </div>
        <div class="product-others"></div>
    </div>
</template>

<script>
export default {
    name: 'product-detail',
    data: function () {
        return {
            userphone: '',
            adminphone: '',
            productId: '',
            resourcesListId: '',
            productInfo: '',
            prodectShop: '',
            companyModels: '',
            userModels: '',
            offerModelLists: '',
            companyTypeId: ''
        };
    },
    created () {
        this.init();
    },
    watch: {
        $route: 'init'
    },
    methods: {
        init () {
            let that = this;
            that.resourcesListId = that.$route.query.resourcesListId;
            that.productId = that.$route.query.productId;
            if (localStorage.getItem('userInfo')) {
                this.userphone = JSON.parse(localStorage.getItem('userInfo')).phone;
                this.companyTypeId = JSON.parse(localStorage.getItem('userInfo')).companyTypeId;
            }
            this.getProductDetail();
        },
        getProductDetail () {
            // 查询该供应单信息，并查询其发布者信息
            let that = this;
            that.$http.get(that.$api.mallHome.offerInfo + '?offerId=' + that.resourcesListId)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.productInfo = res.data.data.offerInfo;
                        that.adminphone = res.data.data.companyInfo.userModel.phone;
                        // 发布者信息
                        that.prodectShop = res.data.data.companyInfo;
                        that.companyModels = that.prodectShop.companyModel;
                        if (that.companyModels.logoImage === undefined || that.companyModels.logoImage === '') {
                            that.companyModels.logoImage = null;
                        }
                        that.userModels = that.prodectShop.userModel;
                        that.offerModelLists = that.prodectShop.offerModelList;
                    }
                }).catch(() => {
                    console.log('出错了');
                });
        },
        goNext (type, code, name) {
            if (!localStorage.getItem('userInfo')) {
                this.$alert('请先登录后再继续', '提示');
                return;
            }
            if (type === 0) {
                window.open('/im/index.html#type=1&username=' + window.btoa(this.userphone) + '&touser=' + window.btoa(this.adminphone) + '&offers=' + this.resourcesListId, '_blank');
            } else {
                if (!code && !name) {
                    this.$message.error('查询不到资源信息!');
                    return;
                }
                location.href = '/my/#/transport/consign/find?trade=true&skuCode=' + code + '&skuName=' + name;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    .icon-im{
        margin-left: 5px;
        font-size: $small-font;
    }
    .product-detail-box {
        width: 1200px;
        margin: 10px auto;
        background-color: $color-white;
        .createPayment-seller-tit{
            font-size: 16px;
            color: $color-title;
            font-weight: bold;
        }
        .commom-part {
            background: $color-white;
            padding: 20px 30px 30px;
        }
        .product-general {
            padding: 20px 30px;
            border-bottom: 7px solid $color-body-bg;
        }
        .product-general-name-box {
            line-height: 80px;
        }
        .product-general-img {
            display: inline-block;
            width: 60px;
            height: 60px;
            background-size: cover;
            vertical-align: middle;
        }
        .gy-button-normal-inquiry{
            color: $color-input-focus;
        }
        .product-general-item-box {
            line-height: 30px;
            position: relative;
            .button-box{
                position: absolute;
                right: 0;
                bottom: 10px;
                button{
                    margin-left: 10px;
                }
            }
        }
        .product-detail-body-item{
            /*margin-top: 10px;*/
        }
        .product-general-name {
            margin-left: 20px;
            font-size: 20px;
            color: $color-title;
            display: inline-block;
            vertical-align: middle;
        }
        .product-general-item-tit {
            width: 100px;
            margin-left: 16px;
            display: inline-block;
        }
        .icon-login{
            background: $color-input-focus;
            width: 16px;
            height: 16px;
            display: inline-block;
            border-radius: 10px;
            text-align: center;
            line-height: 16px;
        }
        .icon-login-im{
            color: $color-white;
            width: 10px!important;
            height: 10px!important;
            font-size: $small-font!important;
        }
        .product-general-item-content {
            display: inline-block;
            min-width: 200px;
        }
        .product-general-item-content-contact-us {
            display: inline-block;
            margin-left: 20px;
            .icon-msg {
                margin-left: 6px;
            }
        }
        .product-detail-compony-right-name{
            padding: 10px 18px;
            margin: 0;
            line-height: 1;
            font-size: 16px;
            color: $color-title;
        }

        //detail
        .product-detail-tit {
            padding-bottom: 10px;
            position: relative;
            .el-icon-tickets{
                position:absolute;
                top: 7px;
                left: -18px;

            }
        }
        .product-detail-body-tit {
            display: inline-block;
            width: 80px;
            color: $color-title;
            line-height: 30px;
        }
        .product-detail-body-tits {
            display: inline-block;
            width: 66px;
            color: $color-title;
            line-height: 30px;
            /*font-weight: bold;*/
        }
        .product-detail-body-content {
            display: inline-block;
            width: 380px;
        }
        .product-detail-compony-img {
            height: 116px;
        }
        .product-detail-compony{
            padding-top: 20px;
            .is-shop{
                font-weight: normal;
                font-size: 14px;
                color: $color-main;
                margin-left: 10px;
                display: inline-block;
                i{
                    color: #2db171;
                    margin-right: 5px;
                }
            }
        }
        .product-detail-compony-img img{
            height: 100%;
            width: auto;
            border: 1px solid $color-border;
        }
        .product-detail-compony-right {
            margin-left: 20px;
        }
        .product-detail-compony-right-item {
            .product-detail-body-content {
                width: 150px;
            }
        }
        .clear{
            clear: both;
        }
        .main-title-shop{
            margin: 35px -40px;
            position: relative;
            text-align: center;
            h2{
                display: inline-block;
                font-weight: normal;
                line-height: 1;
                padding: 0 20px;
                color: $color-black;
                background-color: #fff;
                font-size: 24px;
                margin: 0;
                position: relative;
                z-index: 1;
            }
            &:after{
                content: '';
                overflow: hidden;
                background-color: $color-border;
                width: 94%;
                display: block;
                height: 1px;
                position: absolute;
                left: 0;
                top: 50%;
                margin: 0 40px;
            }
        }
        .product-shop {
            overflow: hidden;
            .item{
                width: 350px;
                height: 320px;
                float: left;
                border: 1px solid $color-border;
                margin-right: 37px;
                .product-price{
                    color: $color-highlight;
                    font-weight: bold;
                }
                .name{
                    margin-top: 30px;
                    padding-left: 20px;
                    .product-skuName{
                        color: $color-title;
                        font-weight: bold;
                    }
                }
                dl{
                    margin-top: 10px;
                    padding-left: 20px;
                    .productD{
                        float: right;
                        display: inline-block;
                        margin-right: 10px;
                        width: 100px;
                        height: 100px;
                    }
                }
                &:last-child{
                    margin-right: 0;
                }
            }
        }
    }
    .shop-note{
        overflow: hidden;
        clear: both;
        padding-top: 20px;
        .iconfont{
            font-size: 14px;
            font-weight: bold;
        }
        dt, dd{
            float: left;
        }
        dt{
            color: #faad14;
        }
        dd{
            line-height: 30px;
        }
    }
</style>
