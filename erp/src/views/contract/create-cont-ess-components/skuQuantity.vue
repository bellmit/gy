<template>
    <div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span class="isMust" v-if="compData.isNecessary">*</span>合同数量</div>
                <div class="essential-text">
                    <input class="gy-input" @input="handleInput" v-model="orderData.skuQuantity" placeholder="请输入合同数量">
                    <span class="unit">吨</span>
                </div>
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
    methods: {
        handleInput (e) {
            // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,6})/g)[0]) || null;
            this.orderData.skuQuantity = e.target.value;
        }
    }
};
</script>
