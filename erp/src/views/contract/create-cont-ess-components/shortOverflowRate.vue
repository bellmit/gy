<template>
    <div class="essential-row">
        <div class="essential-item">
            <div class="essential-title"><span class="isMust" v-if="compData.isNecessary">*</span>溢短装</div>
            <div class="essential-text">
                <!-- shortNum -->
                <el-input-number class="input-number" v-model="orderData.shortOverflowRate"
                :min="0" :max="20"></el-input-number>
                <span class="spanBlock">%</span>
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
            shortNum: null
        };
    },
    mounted () {
        this.orderData.shortOverflowRate = this.orderData.shortOverflowRate ? this.orderData.shortOverflowRate : 0;
    },
    methods: {
    }
};
</script>
