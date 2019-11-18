<template>
    <div class="transport-wrap married-wrapper">
        <div class="main-title">
            <h2>订单信息</h2>
        </div>
        <div class="detail-box">
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">撮合订单号</span>
                    <span>{{detailInfo.dmkOrderSn}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">撮合订单时间</span>
                    <span>{{detailInfo.createdDateStr}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">撮合公司</span>
                    <span>{{detailInfo.dmkCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">状态</span>
                    <span>{{statusValue[detailInfo.dmkOrderStatus]}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">买方公司</span>
                    <span>{{detailInfo.buyerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">卖方公司</span>
                    <span>{{detailInfo.sellerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交易订单号</span>
                    <div>
                        <router-link :to="{ name: 'orderDetail', query: {orderId: detailInfo.odrOrderId} }" v-if="detailInfo.orderSn">{{detailInfo.orderSn}}</router-link>
                        <span v-else>-</span>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">产品</span>
                    <span>{{detailInfo.skuName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">重量</span>
                    <span v-if="detailInfo.dmkOrderQuantity">{{detailInfo.dmkOrderQuantityStr + '吨'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">价格</span>
                    <span v-if="detailInfo.dmkOrderPrice">{{detailInfo.dmkOrderPriceStr + '元/吨'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割时间段</span>
                    <span>{{detailInfo.deliveryDateStr}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割库</span>
                    <span>{{detailInfo.deliveryWarehouseName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">免仓期</span>
                    <span v-if="detailInfo">{{detailInfo.warehouseFreeDays}}天</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">保证金(%)</span>
                    <span>{{detailInfo.depositRatio}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">付款方式</span>
                    <span>{{paywayType[detailInfo.paymentType]}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">货源</span>
                    <span>{{detailInfo.skuOrigin}}</span>
                </div>
                <div class="gy-form-group" v-if="detailInfo.companyType !== 2">
                    <span class="l">买方撮合费</span>
                    <span v-if="detailInfo.dmkBuyerPayAmount || detailInfo.dmkSellerPayAmount === 0">{{detailInfo.dmkBuyerPayAmountStr + '元/吨'}}</span>
                </div>
                <div class="gy-form-group" v-if="detailInfo.companyType !== 1">
                    <span class="l">卖方撮合费</span>
                    <span v-if="detailInfo.dmkSellerPayAmount || detailInfo.dmkSellerPayAmount === 0">{{detailInfo.dmkSellerPayAmountStr + '元/吨'}}</span>
                </div>
                <!--撮合方操作-->
                <div class="gy-form-button" v-if="detailInfo.companyType === 3">
                    <router-link v-if="detailInfo.dmkOrderStatus !== 1 && detailInfo.dmkOrderStatus !== 3" :to="{ name: 'marriedDealOrderCreate', query: {id: detailInfo.id} }" class="gy-button-extra">编辑</router-link>
                </div>
                <!--买方操作-->
                <div class="gy-form-button" v-if="detailInfo.companyType === 1 && detailInfo.buyerStatus === 0">
                    <a href="javascript:;" class="gy-button-extra" @click="operateOrder(1)">确认订单</a><a href="javascript:;" class="gy-button-normal" @click="operateOrder(2)">驳回订单</a>
                </div>
                <!--卖方操作-->
                <div class="gy-form-button" v-if="detailInfo.companyType === 2">
                    <a href="javascript:;" class="gy-button-extra" @click="operateOrder(1)" v-if="detailInfo.sellerStatus === 0">确认订单</a>
                    <a href="javascript:;" class="gy-button-normal" @click="operateOrder(2)" v-if="detailInfo.sellerStatus === 0">驳回订单</a>
                    <router-link v-if="detailInfo.dmkOrderStatus === 1" :to="{ name: 'reAdd', query: {orderId: detailInfo.id, type: 4} }" class="gy-button-extra">发起订单</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data () {
        return {
            detailInfo: {},
            statusValue: ['待确认', '已确认', '已驳回', '已确认'],
            monthValue: ['现货', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            paywayType: ['全部支持', '先货后款', '先款后货']
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.getDetail();
        },
        getDetail () {
            this.$http.get(this.$api.dealMake.detail + this.$route.query.id)
                .then(res => {
                    this.detailInfo = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
        },
        operateOrder (t) {
            let message;
            message = t === 1 ? '确定确认该撮合订单吗？' : '确定驳回该撮合订单吗？';
            this.$confirm(message, '提示', {type: 'warning'})
                .then(() => {
                    this.$http.post(this.$api.marriedDeal.operate, {
                        statusType: t,
                        id: this.$route.query.id
                    })
                        .then(res => {
                            if (res.data.code === 0) {
                                this.getDetail();
                                return;
                            }
                            this.$alert(res.data.message, '出错了', {type: 'error'});
                        });
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .married-wrapper{
        .main-title{
            position: relative;
            .status{
                position: absolute;
                right: 16px;
                font-size: 12px;
                color: $color-minor;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
    .detail-box{
        h3{
            padding-bottom: 0;
        }
        .gy-form-group{
            line-height: 20px;
            min-height: 36px;
            .l{
                line-height: 20px;
                top: -8px;
            }
            a{
                color: #4a90e2;
            }
        }
        .gy-form-button{
            padding-top: 20px;
            .gy-button-extra, .gy-button-normal{
                margin-left: 10px;
            }
        }
    }
</style>
