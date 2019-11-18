<template>
    <div class="essential-row">
        <div class="essential-item">
            <div class="essential-title"><span class="isMust" v-if="compData.isNecessary">*</span>追保约定</div>
            <div class="essential-text cont-ess-zbyd">
                <div class="q" style="padding-left: 10px">跌</div>
                <div class="w"><input type="text" style="text-align: center" v-model="orderData.depositRatioSubtract"></div>
                <div class="e">%</div>
                <div class="r"><span style="padding-left: -2%;text-align: right">补</span></div>
                <div class="t"><input type="text" style="text-align: center" v-model="orderData.depositRatioAppend"></div>
                <div class="y">%</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        compData: Object,
        orderData: Object
    },
    data () {
        return {
        };
    }
};
</script>
