<template><!-- 多选 -->
    <div class="essential-row">
        <div class="essential-item">
            <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>包装标准</div>
            <div class="essential-text">
                <el-checkbox-group v-model="packagingStandardMulti">
                    <el-checkbox
                    v-for="item in compData.compInfo.packagingStandards"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-checkbox>
                </el-checkbox-group>
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
            packagingStandardMulti: []
        };
    },
    watch: {
        'packagingStandardMulti' (newV, oldV) {
            this.$set(this.orderData, 'packagingStandardMulti', newV);
        }
    },
    mounted () {
        if (this.orderData.packagingStandardMulti == null || this.orderData.packagingStandardMulti === undefined || this.orderData.packagingStandardMulti === '' || !this.orderData.packagingStandardMulti) {
            this.orderData['packagingStandardMulti'] = [];
        } else {
            this.packagingStandardMulti = this.orderData.packagingStandardMulti;
        }
    },
    methods: {
    }
};
</script>
