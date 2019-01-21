// 合同
<template>
    <div>
        <div class="gy-form-group">
            <span class="l">合同状态</span>
            <span>{{procurementContract.approveStatus | orderState}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">产品名称</span>
            <span>{{procurementContract.prodName}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">数量(吨)</span>
            <span>{{procurementContract.skuQuantity}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">规格</span>
            <span></span>
        </div>
        <div class="gy-form-group">
            <span class="l">单价(含税)</span>
            <span>{{procurementContract.skuPrice}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">金额</span>
            <span></span>
        </div>
        <div class="gy-form-group">
            <span class="l">创建时间</span>
            <span>{{procurementContract.createdDate | date}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">创建人</span>
            <span>{{procurementContract.createdName}}</span>
        </div>
        <div class="pay-wrapper">
            <div>
                <h2>采购合同</h2>
                <div class="gy-form-group">
                    <span class="l">采购合同编号</span>
                    <span>{{procurementContract.id}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">上游公司</span>
                    <span>{{sellerInfoContract.sellerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">下游公司名</span>
                    <span>{{sellerInfoContract.buyerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">货源</span>
                    <span>{{sellerInfoContract.skuOrigin}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割库</span>
                    <span>{{sellerInfoContract.deliveryWarehouseName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割日期</span>
                    <span>{{procurementContract.planSaleDlvyDate}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">发票月份</span>
                    <span>{{sellerInfoContract.provideInvoiceType|invoiceMonthValue(sellerInfoContract)}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交易类型</span>
                    <span>{{sellerInfoContract.paymentType | paymentType}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交易对手评级</span>
                    <span></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">内部业务联系人</span>
                    <span>{{sellerInfoContract.odrContactName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">保证金</span>
                    <span></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">追保约定</span>
                    <span>{{sellerInfoContract.depositRatioAppend|guaranteeAgreementValue(sellerInfoContract.depositRatioSubtract)}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">免仓期</span>
                    <span>{{sellerInfoContract.warehouseFreeDays}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">电子合同</span>
                    <span></span>
                </div>
            </div>
            <div>
                <h2>销售合同</h2>
                <div class="gy-form-group">
                    <span class="l">采购合同编号</span>
                    <span>{{procurementContract.id}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">上游公司</span>
                    <span>{{buyerInfoContract.sellerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">下游公司名</span>
                    <span>{{buyerInfoContract.buyerCompanyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">货源</span>
                    <span>{{buyerInfoContract.skuOrigin}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割库</span>
                    <span>{{buyerInfoContract.deliveryWarehouseName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割日期</span>
                    <span>{{procurementContract.planSaleDlvyDate}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">发票月份</span>
                    <span>{{buyerInfoContract.provideInvoiceType|invoiceMonthValue(buyerInfoContract)}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交易类型</span>
                    <span>{{buyerInfoContract.paymentType | paymentType}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交易对手评级</span>
                    <span></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">内部业务联系人</span>
                    <span>{{buyerInfoContract.odrContactName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">保证金</span>
                    <span></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">追保约定</span>
                    <span>{{buyerInfoContract.depositRatioAppend|guaranteeAgreementValue(buyerInfoContract.depositRatioSubtract)}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">免仓期</span>
                    <span>{{buyerInfoContract.warehouseFreeDays}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">销售合同模板</span>
                    <span></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">电子合同</span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'contractAssembly',
    data () {
        return {
            id: 59,
            purchaseOrderId: 1219,
            saleOrderId: 1220,
            procurementContract: [], // 采购合同
            sellerInfoContract: [],
            buyerInfoContract: []
        };
    },
    mounted () {},
    methods: {
        // 采购合同
        contractDetail () {
            let that = this;
            that.$http.get(that.$api.order.orderDetail + '/' + that.id)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.procurementContract = res.data.data;
                        that.sellerInfoContract = res.data.data.sellerInfo;
                        that.buyerInfoContract = res.data.data.buyerInfo;
                    }
                });
        }
    }
};
</script>

<style scoped>

</style>
