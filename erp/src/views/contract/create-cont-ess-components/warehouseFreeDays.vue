<template>
    <div class="essential-row">
        <div class="essential-item">
            <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>免仓期</div>
            <div class="essential-text">
                <input type="number" class="gy-input" @input='input' v-model="orderData.warehouseFreeDays" placeholder="请输入天数">
                <span class="unit">天</span>
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
    },
    created () {
    },
    methods: {
        input (v) {
            if (v.target.value < 0) {
                this.orderData.warehouseFreeDays = 0;
            }
        }
    }
};
</script>
