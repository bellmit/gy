// 订单
<template>
    <div>
        <div class="gy-form-group">
            <span class="l">合同要素ID</span>
            <span>{{orderDetailList.id}}</span>
        </div>
        <div class="gy-form-group" v-if="orderDetailList.contractType !== 1">
            <span class="l">单边交易</span>
            <span>{{orderDetailList.contractType | contractType}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">业务类型</span>
            <span>{{orderDetailList.bizType | businessType}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">产品名称</span>
            <span>{{orderDetailList.prodName}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">业务操作人</span>
            <span>{{orderDetailList.businessManagerName}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">业务操作人所属业务组</span>
            <span></span>
        </div>
        <div class="gy-form-group">
            <span class="l">状态</span>
            <span>{{orderDetailList.approveStatus | orderState}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">创建人</span>
            <span>{{orderDetailList.createdName}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">创建时间</span>
            <span>{{orderDetailList.createdDate | date}}</span>
        </div>
        <div class="pay-wrapper">
            <div>
                <h2>上游公司信息</h2>
                <div class="gy-form-group">
                    <span class="l">下游公司名</span>
                    <span>{{sellerInfos.sellerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">货源</span>
                    <span>{{sellerInfos.skuOrigin}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割库</span>
                    <span>{{sellerInfos.deliveryWarehouseName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割日期</span>
                    <span>{{orderDetailList.planSaleDlvyDate}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">发票月份</span>
                    <span>{{sellerInfos.provideInvoiceType|invoiceMonthValue(sellerInfos)}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交易类型</span>
                    <span>{{sellerInfos.paymentType | paymentType}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交易对手评级</span>
                    <span></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">数量</span>
                    <span>{{sellerInfos.skuQuantity}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">包装标准</span>
                    <span>{{sellerInfos.packagingStandard | packagingStandard}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">单价(含税)</span>
                    <span>{{sellerInfos.skuPrice}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">内部业务联系人</span>
                    <span>{{sellerInfos.odrContactName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">保证金</span>
                    <span>{{sellerInfos.depositRatioSubtract}}{{sellerInfos.depositRatio}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">追保约定</span>
                    <span>{{sellerInfos.depositRatioAppend|guaranteeAgreementValue(sellerInfos.depositRatioSubtract)}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">免仓期</span>
                    <span>{{sellerInfos.warehouseFreeDays}}</span>
                </div>
            </div>
            <div>
                <h2>下游公司信息</h2>
                <div class="gy-form-group">
                    <span class="l">下游公司名</span>
                    <span>{{buyerInfos.buyerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">货源</span>
                    <span>{{buyerInfos.skuOrigin}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割库</span>
                    <span>{{buyerInfos.deliveryWarehouseName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割日期</span>
                    <span>{{orderDetailList.planBuyDlvyDat}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">发票月份</span>
                    <span>{{buyerInfos.provideInvoiceType|invoiceMonthValue(buyerInfos)}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交易类型</span>
                    <span>{{buyerInfos.paymentType | paymentType}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交易对手评级</span>
                    <span></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">数量</span>
                    <span>{{buyerInfos.skuQuantity}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">包装标准</span>
                    <span>{{buyerInfos.packagingStandard | packagingStandard}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">单价(含税)</span>
                    <span>{{buyerInfos.skuPrice}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">内部业务联系人</span>
                    <span>{{buyerInfos.odrContactName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">保证金</span>
                    <span>{{buyerInfos.depositRatioSubtract}}{{buyerInfos.depositRatio}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">追保约定</span>
                    <span>{{buyerInfos.depositRatioAppend|guaranteeAgreementValue(buyerInfos.depositRatioSubtract)}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">免仓期</span>
                    <span>{{buyerInfos.warehouseFreeDays}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">销售合同模板</span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderAssembly',
    data () {
        return {
            id: 59,
            purchaseOrderId: 1219,
            saleOrderId: 1220,
            orderDetailList: [], // 订单明细
            sellerInfos: [],
            buyerInfos: []
        };
    },
    mounted () {},
    methods: {
        // 订单明细
        orderDetail () {
            let that = this;
            that.$http.get(that.$api.order.orderDetail + '/' + that.id)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.orderDetailList = res.data.data;
                        that.sellerInfos = res.data.data.sellerInfo;
                        that.buyerInfos = res.data.data.buyerInfo;
                    }
                });
        }
    }
};
</script>

<style scoped>

</style>
