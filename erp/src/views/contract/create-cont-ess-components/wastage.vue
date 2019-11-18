<template>
    <div class="essential-row">
        <div class="essential-item">
            <div class="essential-title"><span class="isMust" v-if="compData.isNecessary">*</span>损耗</div>
            <div class="essential-text">
                <el-input-number class="input-number" v-model="orderData.wastage" :min="0" :max="10"></el-input-number>
                <span class="spanBlock">‰</span>
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
    mounted () {
        this.orderData.wastage = this.orderData.wastage ? this.orderData.wastage : 0;
    },
    methods: {
    }
};
</script>
