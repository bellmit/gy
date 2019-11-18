<template>
    <div>
        <div class="essential-row" v-if="orderData.priceOfWeight">
            <div class="essential-item">
                <div class="essential-title"><span class="isMust">*</span>撮合公司</div>
                <div class="essential-text">
                    <input type="text" placeholder="请输入撮合公司" v-model="orderData.chattingCompanyName">
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
    watch: {
        'orderData.priceOfWeight' (newV, oldV) {
            !newV && (this.orderData.chattingCompanyName = '');
        }
    },
    methods: {
    }
};
</script>
