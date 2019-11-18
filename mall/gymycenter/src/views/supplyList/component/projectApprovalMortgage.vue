<template>
    <!--货压-->
    <div class="programme-content">
            <div class="gy-form-group1 gy-form-group2">
                <span class="l"><strong>*</strong>销售保证金(%)</span>
                <div class="c">
                <el-input-number v-model="appProviderModel.providerItem.saleContractAmount" :min="0" :step="1"></el-input-number></div>
            </div>
            <div class="gy-form-group1">
                <span class="l"><strong>*</strong>采购付款方式</span>
                <div class="c">
                <input type="text" v-model="appProviderModel.providerItem.buyPaymentType" class="gy-input" placeholder="请输入"></div>
            </div>
            <div class="gy-form-group1">
                <span class="l"><strong>*</strong>销售追保(%)</span>
                <div class="c">
                <div class="con-flex ipt-num">
                    <span class="t1">跌</span>
                    <el-input-number class="ipt" v-model="appProviderModel.providerItem.depositRatioSubtract" :min="0" :step="1"></el-input-number>
                    <span class="t2">补</span>
                    <el-input-number class="ipt" v-model="appProviderModel.providerItem.depositRatioAppend" :min="0" :step="1"></el-input-number>
                </div></div>
            </div>
            <div class="gy-form-group1">
                <span class="l"><strong>*</strong>采购期限</span>
                <div class="c">
                <div class="con-flex">
                    <input type="text" v-model="appProviderModel.providerItem.repoDays" class="gy-input ipt"><span class="t3">天内</span>
                </div></div>
            </div>
        </div>
</template>

<script>
export default {
    props: {
        appProviderModel: Object
    }
};
</script>

<style lang="scss" scoped>
    /deep/ .ipt-num{
        .el-input__inner {
            padding-left: 30px;
            padding-right: 30px;
        }
    }
</style>
