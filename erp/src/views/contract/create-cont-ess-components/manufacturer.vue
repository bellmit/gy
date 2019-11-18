<template>
    <div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span class="isMust" v-if="compData.isNecessary">*</span>生产商</div>
                <div class="essential-text">
                    <input class="gy-input" v-model="orderData.manufacturer" placeholder="请输入生产商">
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
    }
};
</script>
